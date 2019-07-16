# Creating Container Goals

An SDM is intended to be a programmable way to deliver your software, no matter how it's architected. In this tutorial, we'll take a look at how you can build your own pipeline for creating [Docker](https://www.docker.com/) images, once new code is pushed to a repository.

Container goals allow you to specify outputs and inputs to connect goal results together. We're going to perform two steps in this tutorial:

1.  We'll build a JAR artifact from a Java project via a Docker image from the [Docker Image Registry](https://www.docker.com/products/image-registry); then
2.  We'll feed that JAR into [Kaniko](https://github.com/GoogleContainerTools/kaniko) in order to build our application's container image.

## Prerequisite

You should have a general idea of both how the SDM operates, and the steps involved in building a Docker image. You'll also need to make sure that your local terminal has access to a Docker daemon; for example, if you have [minikube](https://github.com/kubernetes/minikube) installed, you can try running:

```
eval $(minikube docker-env)
```

to ensure that Kubernetes is up locally.

You'll also need to be on a newer version of the Atomist CLI client. You can fetch that by running:

```
npm i -g @atomist/cli
```

## Building an artifact through a Docker image

To build our JAR file, we're going to define a new _container goal_. This allows us to perform an action through a goal that makes use of a container image, ensuring a consistent environment. This can be anything, from running a test suite, training a machine learning classification, or, in this case, building a library.

### Setting up the container goal

Generally, the step in performing an action through a container is identifying which Docker base image to use. In this case, we'll use `maven:3.3-jdk-8`, which will bring along JDK8 along with Maven 3.3 to install our dependencies.

Since the goal of this tutorial is to introduce container goals (and not necessarily [what a goal _is_](/developer/first_delivery/)), let's show some starting code first and then break down what's happening line-by-line:

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
              args: ["clean", "install", "-B", "-DskipTests=true"],
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

A container goal consists of a function, `container`, that takes two arguments. The first is a string, `build-jar`, and it behaves similarly to the [`displayName` for any Build action](https://docs.atomist.com/developer/build/#the-build-goal): it provides a more specific identifier for logs and output.

After that comes the `containers` argument, which is where a bulk of the logic resides. A container goal executes a [`docker run`](https://docs.docker.com/engine/reference/commandline/run/) command, which is roughly format of the resulting command is in the form of

```
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

The individual arguments in each array element passed in as options that you provide:

- `image` defines the base Docker image to use
- `command` is analogous to [`entrypoint`](https://docs.docker.com/search/?q=entrypoint), and configures the container to run as an executable
- `args` appends any arguments to `command`, which in this case, are what Maven needs to complete its task
- `name` is passed along through the command-line as `--name`

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

Now that we can build a JAR through a predefined image, we'll need to store that output somewhere for use in our second step to build our application image.

Before we define our container goal, we'll enable SDM caching to allow this:

```typescript
sdm.configuration.sdm.cache = {
  enabled: true,
  path: path.join(os.homedir(), ".atomist", "cache", "container"),
  store: new CompressingGoalCache()
};
```

Next, within our container goal, we'll define an output configuration that identifies where we'd like the resulting JAR to be located:

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

`classifier` is the name of blob we are caching, while `pattern` defines what we're interested in caching.

## Building the application image

Now that we have a JAR, our next step will be to generate a container image from it. We'll use kaniko to build this.

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
      test: hasFile("Dockerfile"),
      dependsOn: ["jvm"]
    }
  };
});
```

Much of this should seem familiar to the code we used to build the JVM.

Since this container goal also require the artifact we built earlier to be include as part of this final image, we pass in our JAR classifier, `target-jar`, that we already created, as an argument to `input`.

According to the documentation, kaniko is meant to be run as an image. You can learn more about the rest of the arguments and optional flags from [the kaniko documentation](https://github.com/GoogleContainerTools/kaniko#additional-flags). In this example, we're:

- passing the location of our Dockerfile (relative to the directory of the repository) (`--dockerfile`)
- providing the path to directory that contains the Dockerfile ([`--context`](https://github.com/GoogleContainerTools/kaniko#kaniko-build-contexts))
- indicating that we want to build the image _without_ pushing to a registry (`--no-push`)
- taking a snapshot at the end of the build (`--single-snapshot`)
- setting a destination directory for the resulting image (`--destination`)

And finally, just as we only want to build our JAR in the Maven repositories our SDM is listening to, we only want to build our Docker image in locations with a `Dockerfile`. We will once again configure a push test, with one additional step: we'll make sure to run this goal _after_ we build the JAR file. You'll notice that we added a new step, `dependsOn`, which means that this goal executes serially, after the `jvm` container goal.

### Dynamic destination

You'll notice that the destination of the resulting Docker image is a static location, which is less than ideal, because it means that you can't (easily) store multiple versions of the images. To alleviate this, container goals also have a `callback` property, which are executed right before the container goal. You can use this function to fetch information about the project that the SDM is operating within:

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

`reg`refers to the container goal registrations which are defined as the second argument to the`container`function, while`proj`is the project the SDM is running against. From the`proj`, it's possible to get the name of the underlying repository, which we can use to define a more unique resulting image, based on the SHA of the last pushed commit.

## Complete sample

```typescript
import { hasFile } from "@atomist/sdm";
import { CompressingGoalCache, configure, container } from "@atomist/sdm-core";
import * as os from "os";
import * as path from "path";

export const configuration = configure(async sdm => {
  sdm.configuration.sdm.cache = {
    enabled: true,
    path: path.join(os.homedir(), ".atomist", "cache", "container"),
    store: new CompressingGoalCache()
  };

  return {
    jvm: {
      goals: [
        container("build-jar", {
          containers: [
            {
              image: "maven:3.3-jdk-8",
              command: ["mvn"],
              args: ["clean", "install", "-B", "-DskipTests=true"],
              name: "maven"
            }
          ],
          output: [
            {
              classifier: "target-jar",
              pattern: { directory: "target/*.jar" }
            }
          ]
        })
      ],
      test: hasFile("pom.xml")
    },
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
      test: hasFile("Dockerfile"),
      dependsOn: ["jvm"]
    }
  };
});
```
