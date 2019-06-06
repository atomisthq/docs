# Creating Docker Steps

An SDM is intended to be a configurable, programmable way to deliver your software, and in this tutorial, we'll take a look at how you can build your own pipeline for creating a [Docker](https://www.docker.com/) image.

We're going to perform two actions in this tutorial:

1.  First, we'll build a JAR artifact from a Java project, using a Docker image on the [Docker Image Registry](https://www.docker.com/products/image-registry); and
2.  We'll feed that JAR into [Kaniko](https://github.com/GoogleContainerTools/kaniko) in order to build the container image.

## Prerequisite

You should have a general idea of both how the SDM operates, and the steps involved in building a Docker image. You'll also need to make sure that your terminal has access to a Docker daemon; for example, if you have [minikube](https://github.com/kubernetes/minikube) installed, you can try running

```
eval $(minikube docker-env)
```

to ensure that Kubernetes is up locally.

You'll also need to be on a newer version of the Atomist CLI client. You can fetch an update by running

```
npm i -g @atomist/cli
```

## Building an artifact through a Docker image

To build our JAR file, we're going to use a new [`FulfillableGoalWithRegistrations`](https://atomist.github.io/sdm/classes/_lib_api_goal_goalwithfulfillment_.fulfillablegoalwithregistrations.html). What this class allows us to do is to perform an action through a goal that explicitly has a side-effect--in this case, mounting the resulting Docker image into Kubernetes. (All of this detail is abstracted away from the SDM implementation, and we're only mentioning it for the sake of completeness!)

Generally, the hardest part of performing an action through a container is identifying which Docker base image to use. In this case, we'll use `maven:3.3-jdk-8`, which will bring along JDK8 along with Maven 3.3 to install our dependencies.

Let's show the final code first and then break down what's happening line-by-line:

```typescript
const mvnBuildJdk8 = containerRun("Maven JDK8", {
        container: {
            name: "mvn",
            image: "maven:3.3-jdk-8",
            command: ["mvn"],
            args: ["clean", "install", "-B", "-DskipTests=true"],
        },
        output: ["target/*.jar"],
});
```

The first argument behaves similarly to the as [`displayName` for any Build action](https://docs.atomist.com/developer/build/#the-build-goal): it provides a more specific identifier for logs and such.

After that comes the `container` argument, which is where a bulk of the logic resides. The format of the resulting command is in the form of

```
 docker run IMAGE [COMMAND] [ARG...]
 ```

 The individual arguments are passed in as options that you provide:

* `name` is passed along through the command-line as `--name`
* `image` defines the base Docker image to use
* `command` is analogous to [`entrypoint`](https://docs.docker.com/search/?q=entrypoint), and configures the container to run as an executable
* `args` appends any arguments to `command`, which in this case, are what Maven needs to complete its task

Finally, `output` identifies where you'd like the resulting JAR to be located.

Next, we only want this logic to run on the Maven-configured projects our SDM is configured to listen to. To do that, we can configure a [push rule](https://docs.atomist.com/developer/set-goals/#set-goals-on-push-with-push-rules) that looks something like this:

```typescript
return [
    whenPushSatisfies(
        hasFile("pom.xml")).setGoals(
        goals("build").plan(mvnBuildJdk8),
    ),
];
```

On a push, if the repository has a `pom.xml` file, we'll set the `build` goal to our `mvnBuildJdk8` process. Otherwise, the SDM won't do anything.

## Building a Docker image

Now that we have a JAR, our next step will be to generate a container image from it. To do this, we'll use kaniko. kaniko doesn't require a Docker daemon to be running, so it can be idle for an environment such as an SDM.

As before, let's start with the code and work our way towards understanding what's going on:

```typescript
const kanikoBuild = containerRun("Kaniko", {
    container: {
        name: "kaniko",
        image: "gcr.io/kaniko-project/executor:latest",
        args: [
            "--dockerfile=Dockerfile",
            "--context=dir://atm/home",
            "--no-push",
            "--single-snapshot",
        ],
    },
    input: ["target/*.jar"],
});
```

The `Kaniko` and `kaniko` names provide human-readable strings for the SDM and the resulting image, respectively.

According to the documentation, kaniko is meant to be run as an image, so, just like above, we pass it the location of the container image we want to use as a base for this process.

You can learn more about the rest of the arguments and optional flags from [the kaniko documentation](https://github.com/GoogleContainerTools/kaniko#additional-flags). In this example, we're:

* passing the location of our Dockerfile (relative to the directory of the repository) (`--dockerfile`)
* providing the path to directory that contains the Dockerfile ([`--context`](https://github.com/GoogleContainerTools/kaniko#kaniko-build-contexts))
* indicating that we want to build the image _without_ pushing to a registry (`--no-push`)
* taking a snapshot at the end of the build (`--single-snapshot`)

And finally, since we require the artifact we built earlier to be include as part of this final image, we pass in our JAR that we create as an argument to `input`.

Just as we only want to build our JAR in the Maven repositories our SDM is listening to, we only want to build our Docker image in locations with a `Dockerfile`. We will once again configure a [push rule](https://docs.atomist.com/developer/set-goals/#set-goals-on-push-with-push-rules), with one additional step: we'll make sure to run this goal _after_ we build the JAR file.

```typescript
return [
    whenPushSatisfies(
        hasFile("pom.xml")).setGoals(
        goals("build").plan(mvnBuildJdk8),
    ),
    whenPushSatisfies(
        hasFile("Dockerfile")).setGoals(
        goals("docker build")
            .plan(kanikoBuild).after(mvnBuildJdk8),
    ),
];
```
