Getting your projects built is one of the most important parts of a CI lifecycle. 
As a full-featured CI solution, Atomist provides the functionality needed to perform builds.
Or, integrate with your existing build tools. With Atomist, you can start where you are and then have the flexibility to move where you want to go.

This page shows how to

* Run builds in your SDM
* Set a goal to represent builds that happen in your CI tool

## The Build goal

Atomist provides a goal that is designed to handle building software: the `Build` goal. 

It lives in the [Build Pack][build-pack], so run `npm install @atomist/sdm-pack-build` to get it.

The build goal does a couple things:

* Invoke a builder that builds your project
* Link the built artifact

Configuring the `BuildGoal` looks like this

``` typescript
const build = new Build().with({
    name: "maven",
    builder: mavenBuilder(),
});
```

This goal defines a build that will be handled by Maven.
Be sure to add the goal to your [goal set](set-goals.md)

[build-pack]: ../pack/build.md

## Builders

Builders implement the logic that is needed to build your software. Out of the box, Atomist provides a couple of builders for:

* [Maven](#maven)
* [Gradle](#gradle)
* NodeJS using [NPM](#npm)
* Generic builder that calls a terminal script

<!-- TODO: link to pages that detail each -->

You can also create your own.
A builder is a function that gets a `GoalInvocation` and a build number and return a `Promise<BuildInProgress>`

``` typescript
(goalInvocation: GoalInvocation, buildNo: string) => Promise<BuildInProgress>
```

## Builds handled by external systems

In addition to handling the CI lifecycle itself, Atomist can also defer the build to external systems like your existing CI lifecycle. To achieve this, you need to define your build goal like this:

``` typescript
const build = new Build().with({
    name: "maven",
    externalTool: "travis"
});
```

You can find more detailed information on how to hook up existing CI systems on the [integrations page](../user/ci.md).


## Atomist builders

### Maven

Maven builds are supported out of the box through the `mavenBuilder` found in `sdm-pack-spring`.  The builder is defined as such

``` typescript
export function mavenBuilder(args: Array<{ name: string, value?: string }> = [],
                             deploymentUnitFileLocator: (p: LocalProject, mpi: VersionedArtifact) => string =
                                 (p, mpi) => `${p.baseDir}/target/${mpi.artifact}-${mpi.version}.jar`): Builder
```

The Maven builder will issue a `mvn package` (or use `mvnw` if that's available in the project) command to build your project. The first argument of the builder allows you to add extra `-D` arguments to the Maven build command, if a value is defined it will add `-Dname=value`, otherwise it will add `-Dname`.  The second argument will indicate where the build goal can find the artifact produced by the build. This is the artifact that for example can be used in other goals like deployment. By default, it will look in the default location as defined by Maven conventions, i.e. `target/artifact-version.jar`, but you can
change this if you like.

Aside from an in-process Maven build, Atomist also provides a dockerized Maven builder, which is defined as such

``` typescript
export function dockerizedMavenBuilder(version: string = DefaultMavenDockerVersion,
                                       args: Array<{ name: string, value?: string }> = [],
                                       deploymentUnitFileLocator: (p: LocalProject, mpi: VersionedArtifact) => string =
                                        (p, mpi) => `${p.baseDir}/target/${mpi.artifact}-${mpi.version}.jar`): Builder
```

In addition to the same options as the in-process Maven builder, the dockerized version also allows you to define a version. Upon goal execution, this builder will use a `docker run` command to invoke Maven. In other words, you don't need to have a Maven installation on the SDM or have your project configured to use the Maven wrapper.

!!! danger
    If you're running your SDM in Docker, please take care to take into account the Docker-in-Docker or the Docker-outside-of-Docker guidelines if you use the dockerized Maven builder

### Gradle

Atomist also provide support for building projects using Gradle. At the moment, only single module projects are supported. To use the Gradle integration, configure your `Build` goal like this using the `gradleSingleModuleBuilder` in `sdm-pack-spring`:

``` typescript
const build = new Build().with({
    name: "maven",
    builder: gradleSingleModuleBuilder(),
});
```

The Maven builder will issue a `gradle clean build` (or use `gradlew` if that's available in the project) command to build your project.

### NPM

If you want to build NodeJS projects using NPM, Atomist can certainly help you with that. In order to do so, define your `Build` goal like this, using the `nodeBuilder` available in `@atomist/sdm-pack-node`:

``` typescript
const build = new Build().with({
    name: "maven",
    builder: nodeBuilder("run", "build"),
});
```

In this case the builder will execute an `npm run build` command in the root of your project.

### Generic builder that calls a terminal script

{!tbd.md!}

## Linking the artifact produced by the build

In order to capture the output deliverable of a build you can use the `Artifact` goal.
 When added to a goalset, it will be fulfilled by the `Build` goal after successful completion of a build and is able to store the artifact in a more permanent store. 
The `Artifact` goal will also contain a link to the deliverable, which will be displayed next to the goal indicator in the messaging channel.
