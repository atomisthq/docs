# Creating Container Goals

An SDM is intended to be a programmable way to deliver your software, no matter how it's architected. In this tutorial, we'll create a delivery flow that creates a [Docker](https://www.docker.com/) image for a Java project every time new code is pushed to a repository.

Container goals allow you to specify outputs and inputs to connect goal results together. We're going to perform two steps in this tutorial:

1.  We'll build a JAR artifact for a Java project using an official Docker image from [Docker Hub](https://www.docker.com/products/docker-hub); then
2.  We'll feed that JAR into [Kaniko](https://github.com/GoogleContainerTools/kaniko) in order to build our application's container image.

## Prerequisite

You should have a general idea of both how the SDM operates, and the steps involved in building a Docker image. The SDM needs to also either be running in Kubernetes, or have access to a Docker daemon; for example, if you have [minikube](https://github.com/kubernetes/minikube) installed, you can try running:

```
eval $(minikube docker-env)
```

to ensure that Kubernetes is up locally.

You'll also need to be on a newer version of the Atomist CLI client. You can fetch that by running:

```
npm i -g @atomist/cli
```

## Building an artifact using a Docker image

Container goals allow us to use any Docker image available to execute the actions of a goal. Examples of Docker images useful for various delivery goals are using the official Node.js image to run a JavaScript project's test suite, using the official Snyk image to scan a project for security vulnerabilities, or, in this case, to build a Java project and a Docker image using the official maven and kaniko images, respectively.

### Setting up the container goal

The key step in writing a container goal is identifying which Docker image to use. In this case, we'll use `maven:3.3-jdk-8`, which will provide JDK8 and Maven 3.3 for us to use to build our project.

Since the goal of this tutorial is to introduce container goals (and not necessarily [what a goal _is_](/developer/first_delivery/)), let's start by showing the code and then we'll break down what's happening line by line:

```typescript
import { hasFile } from "@atomist/sdm";
import { configure, container } from "@atomist/sdm-core";

export const configuration = configure(async sdm => {
  return {
    jvm: {
      goals: [
        container("build-jar", {
          containers: [
            {
              image: "maven:3.3-jdk-8",
              command: ["mvn"],
              args: ["clean", "install", "-B"],
              name: "maven"
            }
          ]
        })
      ]
    }
  };
});
```

What's going on? First, we've defined our JVM goal set:

```typescript
return {
  jvm: {
    goals: ...
  }
}
```

`goals` is an array of the actions to perform. In this case, we're only building our JAR, but we could perform anything else here, such as code autolinting.

Creating a container goal consists of calling a function, `container`, that takes two arguments. The first is a string, `build-jar`, provides a more specific identifier for logs and output. Following that is the `containers` argument, which is where a bulk of the logic resides. A container goal executes a [`docker run`](https://docs.docker.com/engine/reference/commandline/run/) command, which is roughly format of the resulting command is in the form of

```
docker run [--entrypoint FIRST_ELEMENT_OF_COMMAND_ARRAY] OPTIONS_THE_SDM_FRAMEWORK_SETS [OPTIONS_YOU_PROVIDE] IMAGE [REST_OF_COMMAND_ARRAY...] [ARG...]
```

The individual arguments in each array element passed in as options that you provide:

- `image` defines the Docker image to use
- `command` is analogous to [`entrypoint`](https://docs.docker.com/search/?q=entrypoint), and configures the container to run as an executable
- `args` appends any arguments to `command`, which in this case are the Maven command-line arguments
- `name` is passed along through the command-line as `--name` to set a network alias for the container

### Defining a push test

Next, we only want this logic to run on the Maven-configured projects our SDM is configured to listen to. To do that, we can configure a [push test](/developer/set-goals/#set-goals-on-push-with-push-rules) that looks something like this:

```typescript
import { hasFile } from "@atomist/sdm";

return {
  jvm: {
    goals: ...,
    test: hasFile("pom.xml")
  }
}
```

On a push, if the repository has a `pom.xml` file, we'll execute the container goals defined in `goals`. Otherwise, the SDM won't do anything.

### Storing the JAR

Now that we can build a JAR using the Maven Docker image, we'll need to store that JAR file somewhere so it will be available when we build the Docker image for our application.

Before we define our container goal, we'll enable SDM caching to allow this:

```typescript
sdm.configuration.sdm.cache = {
  enabled: true,
  path: path.join(os.homedir(), ".atomist", "cache", "container"),
  store: new CompressingGoalCache()
};
```

Next, we'll provide an output configuration that defines what files we'd like captured for subsequent goals—all files matching the target/*.jar glob pattern, in this case:

```typescript
import { hasFile } from "@atomist/sdm";

return {
  jvm: {
    goals: [
      container("build-jar", {
        containers: [
          ...
        ],
        output: [{
            classifier: "target-jar",
            pattern: { directory: "target/*.jar" },
        }],
      })
    ],
    test: ...
  }
}
```

`classifier` is the unique identifier we give to these cache items; subsequent goals that want these cache items restored before they are run will request these cache items by their classifier. `pattern` defines what we're interested in caching.

## Building the application image

Now that we have a JAR, our next step will be to generate a Docker image from it. We'll use kaniko to build this.

As before, let's start with the code and work our way towards understanding what's going on:

```typescript
import { hasFile } from "@atomist/sdm";
import { configure, container } from "@atomist/sdm-core";

export const configuration = configure(async sdm => {
  return {
    jvm: { ... },
    docker: {
      goals: [
        container("kaniko", {
          input: ["target-jar"],
          containers: [{
            name: "kaniko",
            image: "gcr.io/kaniko-project/executor:v0.10.0",
            args: [
                "--dockerfile=Dockerfile",
                "--context=dir://atm/home",
                "--no-push",
                "--single-snapshot",
                "--destination=atomist/samples:0.1.0",
            ],
          }],
        }),
      ],
      test: [hasFile("pom.xml"), hasFile("Dockerfile")],
      dependsOn: ["jvm"]
    }
  };
});
```

Much of this should seem similar to the code we used to build the JVM.

Since this container requires the artifact we built in the previous goal to be available, we pass in our JAR cache classifier, `target-jar`, as an argument to input.

According to the documentation, kaniko is meant to be run as an image. You can learn more about the rest of the arguments and optional flags from [the kaniko documentation](https://github.com/GoogleContainerTools/kaniko#additional-flags). In this example, we're:

- passing the location of our Dockerfile (relative to the directory of the repository) (`--dockerfile`)
- providing the path to directory that contains the Dockerfile ([`--context`](https://github.com/GoogleContainerTools/kaniko#kaniko-build-contexts))
- indicating that we want to build the image _without_ pushing to a registry (`--no-push`)
- taking a snapshot at the end of the build (`--single-snapshot`)
- setting the resulting Docker image name and tag (`--destination`)

And finally, just as we only want to build our JAR in the Maven repositories our SDM is listening to, we only want to build our Docker image in locations with a `Dockerfile`. We will once again configure a push test, with one additional step: we'll make sure to run this goal _after_ we build the JAR file. You'll notice we added a new property, `dependsOn`, which ensures this goal executes serially after the `jvm` goal set.

### Providing dynamic arguments

You'll notice that the destination of the resulting Docker image is a static location, which is less than ideal, because it means that you can't (easily) store multiple versions of the images. To alleviate this, container goals also have a `callback` property, which are executed right before the container goal. A `callback` function receives information about the project the goal is executing on, and can modify either the `containers` or `volumes` keys. For example, if we wanted to create a dynamic `--destination` value, based on the project, we could do it like this:

```typescript
  return {
    jvm: { ... },
    docker: {
      goals: [
        callback: async (reg, proj) => {
            // remove non-alphanumeric characters
            const safeOwner = proj.id.owner.replace(/[^a-z0-9]+/g, "");
            const dest = `${safeOwner}/${proj.id.repo}:${proj.id.sha}`;
            reg.containers[0].args.push(`--destination=${dest}`);
            return reg;
        },
        container("kaniko", {
          input: ["target-jar"],
          containers: [{
            name: "kaniko",
            image: "gcr.io/kaniko-project/executor:v0.10.0",
            args: [
                "--dockerfile=Dockerfile",
                "--context=dir://atm/home",
                "--no-push",
                "--single-snapshot"
            ],
          }],
        }),
      ],
      test: ...,
      dependsOn: ...
    }
  };
```

`reg` refers to the container goal registrations which are defined as the second argument to the `container` function, while `proj` is the project the SDM is running against. From the `proj`, it's possible to get the name of the underlying repository, which we can use to define a more unique resulting image, based on the SHA of the last pushed commit.

## Complete sample
<!-- atomist:code-snippet:start=lib/sdm/container/jarContainerGoal.ts#completeSample -->
```typescript
import { hasFile } from "@atomist/sdm";
import {
    CompressingGoalCache,
    configure,
    container,
} from "@atomist/sdm-core";
import * as os from "os";
import * as path from "path";

export const configuration = configure(async sdm => {
  sdm.configuration.sdm.cache = {
    enabled: true,
    path: path.join(os.homedir(), ".atomist", "cache", "container"),
    store: new CompressingGoalCache(),
  };

  const buildJar = container("build-jar", {
    containers: [
      {
        image: "maven:3.3-jdk-8",
        command: ["mvn"],
        args: ["clean", "install", "-B"],
        name: "maven",
      },
    ],
    output: [
      {
        classifier: "target-jar",
        pattern: { directory: "target/*.jar" },
      },
    ],
  });

  const buildImage = container("kaniko", {
    callback: async (reg, proj) => {
      // calculate image name from project information, removing non-alphanumeric characters
      const safeOwner = proj.id.owner.replace(/[^a-z0-9]+/g, "");
      const dest = `${safeOwner}/${proj.id.repo}:${proj.id.sha}`;
      reg.containers[0].args.push(`--destination=${dest}`);
      return reg;
    },
    input: ["target-jar"],
    containers: [{
      name: "kaniko",
      image: "gcr.io/kaniko-project/executor:v0.10.0",
      args: [
        "--dockerfile=Dockerfile",
        "--context=dir://atm/home",
        "--no-push",
        "--single-snapshot",
      ],
    }],
  });

  return {
    jvm: {
      goals: [
        buildJar,
      ],
      test: hasFile("pom.xml"),
    },
    docker: {
      goals: [
        buildImage,
      ],
      test: [hasFile("pom.xml"), hasFile("Dockerfile")],
      dependsOn: ["jvm"],
    },
  };

}, { name: "jarContainerGoal" });
```
<!-- atomist:docs-sdm:codeSnippetInline: Snippet 'completeSample' found in https://raw.githubusercontent.com/atomist/samples/master/lib/sdm/container/jarContainerGoal.ts -->
<div class="sample-code"><a href="https://github.com/atomist/samples/tree/master/lib/sdm/container/jarContainerGoal.ts#L18-L88" target="_blank">Source</a></div>
<!-- atomist:code-snippet:end -->
