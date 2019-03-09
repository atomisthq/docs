This pack provides SDM functionality for Java.

[GitHub][]

[API Doc][api-doc]

`npm install @atomist/sdm-pack-spring`

[github]: https://github.com/atomist/sdm-pack-spring (GitHub Repository)
[api-doc]: https://atomist.github.io/sdm-pack-spring/ (API Docs)

# Building Java software

The Spring pack provides a way to build Java software, handling the CI part of a CI/CD lifecycle. This functionality depends on the presence of the `@atomist/sdm-pack-build` extension pack, so add that
to your dependencies as well.

## Building using Maven

To build your application using Maven, create a goal that kicks off a build using Maven:

```typescript
const mavenBuild = new Build().with({builder: mavenBuilder()})
```

When scheduling this goal, you can use the `IsMaven` push predicate to check whether this goal needs to be scheduled.

```typescript
sdm.withPushRules(
    whenPushSatisfies(IsMaven).setGoals(mavenBuild)
)
```

## Building using Gradle

Building your application using Gradle requires you to create a goal that kicks off a build using Gradle:

```typescript
const mavenBuild = new Build().with({builder: gradleSingleModuleBuilder()})
```

When scheduling this goal, you can use the `IsGradle` push predicate to check whether this goal needs to be scheduled.

```typescript
sdm.withPushRules(
    whenPushSatisfies(IsGradle).setGoals(mavenBuild)
)
```

# Generating Java applications

Atomist can be used to create brand new projects as well, and the Spring pack provides specific functionality to generate new Java (or Kotlin) applications. Take
for example the following generator command as defined within an SDM:

```typescript
sdm.addGeneratorCommand<SpringProjectCreationParameters>({
        name: "create-spring",
        intent: "create spring",
        description: "Create a new Java Spring Boot REST service",
        parameters: SpringProjectCreationParameterDefinitions,
        startingPoint: GitHubRepoRef.from({ owner: "atomist-seeds", repo: "spring-rest", branch: "master" }),
        transform: [
            ReplaceReadmeTitle,
            SetAtomistTeamInApplicationYml,
            TransformSeedToCustomProject,
        ],
    });
```

This will allow you to issue a `create spring` command to Atomist which creates a new project based on a specific seed project (in this case, a Github project) and will issue a couple of transforms in order to customize the project. In this case, the transforms will:

* Change the title of the README to reflect the new name
* Add the correct configuration in the Spring Boot property to have Atomist integration configured
* Transform the project based on the parameters you entered. This transform, which is Spring Boot specific, will:
    * Change the POM
    * Change the package to the package defined by the parameters
    * Rename the application class name to reflect the project name as defined in the parameters

These transforms use the parameters defined in `SpringProjectCreationParameterDefinitions` which requires your to enter:

* A project name
* A Maven group id
* A new root package

# Maven specific features

## Fingerprinting

The `MavenFingerprinter` can be used in the `Fingerprint` goal in order to create a defining fingerprint for a build. In the case of the `MavenFingerprinter`,
it will use the dependency information in the POM to create a dependency fingerprint. This way you can easily detect whether dependencies have changed between builds and act accordingly.

## Review usage of provided dependency

The `ProvidedDependencyReviewer` will check whether your project is using provided dependencies and generate reveiw comments for each of those dependencies.
You can then configure your `AutoCodeInspection` goal to use this reviewer.

## Transforms

### Add a dependency to a project

You can use Atomist to add a dependency to a project, where it will add that dependency in the POM.

``` typescript
sdm.addCodeTransformCommand(AddMavenDependency)
```

This command will allow you to enter dependency information, and Atomist will edit the POM for you and add the dependency accordingly.

# Spring support

## Adding Spring support

Spring support is added through an extension. Adding this extension to your SDM is done like this:

```
sdm.addExtensionPacks(
    springSupport({
        inspectGoal: inspect,
        autofixGoal: autofix,
        review: {
            cloudNative: true,
            springStyle: true,
        },
        autofix: {},
        reviewListeners: isInLocalMode() ? [] : [
            singleIssuePerCategoryManaging("sdm-pack-spring"),
        ],
    }),
);
```

This support pack will add the following:

* Code inspections for certain known Spring issues:
    * Violations common to cloud native application
    * Violations common to modern Spring usage (usage of `RequestMapping` for example)
* An inspection listener that will put review comments into an issue, one per branch. The pack will automatically manage/update that issue and close it when the inspection is clean for the branch.

## Specific push tests

The Spring support also provides a couple of [push tests](../developer/push-test.md), like `IsMaven`, to support Spring-specific applications. These are:

* `HasSpringBootPom`: whether the POM of the project has a dependency to Spring Boot
* `HasSpringBootApplicationClass`: whether the project has a class that is annotated with `@SpringBootApplication`

