This pack contains useful integrations with [Docker](https://docker.com).

[GitHub][]

[API Doc][api-doc]

[github]: https://github.com/atomist/sdm-pack-docker (GitHub Repository)
[api-doc]: https://atomist.github.io/sdm-pack-docker/ (API Docs)

# Building a Docker image

Atomist has support for building a Docker image. You need to add the following goal to your SDM definition:

```typescript
const dockerBuild = new DockerBuild().with({
        options: { push: false },
    })
```

And plan this goal in your SDM:

```typescript
sdm.withPushRules(whenPushSatisfies(HasDockerfile).setGoals(dockerBuild))
```

## Registratation parameters

The `DockerBuild` goal can accept the following parameters in the goal registration:

* `options`
  * `push`: whether a `docker push` needs to be performed
  * `registry`: whether a specific registry need to be used
  * `user`: the username when pushing to a registry
  * `password`: the password when pushing to a registry
  * `dockerfileFinder`: a function that determines where to find the `Dockerfile`. By default it expects the file to be in the root of the project
* `imageNameCreator`: define a custom image name creator (see `DockerImageNameCreator`) to determine the name of the resulting Docker image

# Triggering application build steps before a Docker build

A lot of times, before doing a Docker build, you need to perform a couple of actions in your codebase. Every goal in Atomist starts off from a clean codebase, so for example compiled sourcecode from a previous run of the `Build` goal is not known to the `DockerBuild` goal.


When using the `sdm-pack-spring` a couple of goal hooks, which trigger code before the execution of a goal, have been built with this functionality in mind.

``` typescript
const dockerBuild = new DockerBuild().with({
        options: { push: false },
    })
        .withProjectListener(MvnVersion)
        .withProjectListener(MvnPackage);
```

These listeners will:

* Perform an `mvn version:set`. The version will be derived from a previous `Version` goal run result.
* Perform an `mvn package` which will compile the code and build a JAR file that you can use in your docker file


For NodeJS application, you can create your own listener that calls for example an NPM task.

