If you're working at a sufficiently large organization, architecting several microservices, or just need some uniformity around the repositories your team creates, a [_project generator_](/developer/create/) can help you establish a consistent and reproducible framework for your projects.

A project generator is a type of [command](/developer/commands/) which takes a template repository and creates a brand new one from it. It's different from forking in that the generated repository shares no Git history with the original template: it's literally just a copy. These templates repositories are also called _seeds_.

In this example, we'll set up a project generator that takes a Java Spring project with some Maven dependencies configured. (You can generate a project from a seed in any language.)

## Prerequisites

You should already have [a blank SDM](/developer/sdm/#creating-an-sdm-project), though you can also use an existing one if you'd like.

We'll be using the [atomist-seeds/spring-rest](https://github.com/atomist-seeds/spring-rest) repository as our seed. Please don't use this seed for your own Spring projects, as this is just a demo app (and likely full of outdated packages!).

## Registering a generator

Establishing a generator only requires two core arguments: the location of the seed repository, and the name of the command to run to initiate the project.

Open up your SDM, and add a new file called `lib/generator.ts`. Paste the following lines to get started with your generator:

```typescript
import { GitHubRepoRef } from "@atomist/automation-client";
import { GeneratorRegistration } from "@atomist/sdm";
```

The `GitHubRepoRef` function is going to grab a repository off of GitHub based on the parameters you provide it. This could also be in a location like [`GitLabRepoRef`](https://atomist.github.io/automation-client/modules/_operations_common_gitlabreporef_.html) or [`BitBucketRepoRef`](https://atomist.github.io/automation-client/modules/_operations_common_bitbucketreporef_.html) if the repository is hosted somewhere else. In any case, all of the following code will work the same, regardless of the seed's location.

`GeneratorRegistration` is the interface which will actually define the project generation command. Let's fill that out in this file next:

```typescript
export const JavaSpringGenerator: GeneratorRegistration = {
  name: "Java Spring Project",
  intent: "generate-java-spring-project",
  startingPoint: GitHubRepoRef.from({
      owner: "atomist-seeds",
      repo: "spring-rest",
  }),
  transform: [],
};
```

The arguments are somewhat self-explanatory:

* `name` of the generator. This can be any string.
* `intent` a string or array of strings; you'll type this to trigger the command.
* `startingPoint` provides the generator with the location for the seed repository. You can also specify specific SHAs or branches—see [RepoRef](reporef.md) for more details.
* `transform` is an array of zero or more [code transforms](transform.md) to apply. We won't get into that in this tutorial just yet!

## Adding the generator

Next, in your `machine.ts` file, add the following line to import the file you've just created:

```typescript
import {
    JavaSpringGenerator,
} from "./generator";
```

Within the SDM logic itself, you'll add the generator via the `addGeneratorCommand` method:

```typescript
sdm.addGeneratorCommand(JavaSpringGenerator);
```

That's all there is to it!

## Testing the generator

Let's see the command in action.

Start up your SDM in [Local Mode](/developer/local/):

```
$ atomist start --local
```

Amongst all the lines the scroll by, you should see one that identifies your command as having been registered:

```
> Commands
>   Java Spring Project (Java Spring Project) generate-java-spring-project
```

In fact, if you type `atomist -h`, you'll also see your command in the output. Try running `atomist generate-java-spring-project`; you'll be asked just for the name of the new repository, and the SDM will go ahead and clone it immediately:

```
$ atomist generate-java-spring-project
> Java Spring Project
> ? name of the new repository my-new-java-project
> # sdm 2019-05-03 14:37:22 Create Project
>   Cloning seed project from starting point atomist-seeds/spring-rest at https://github.com/atomist-seeds/spring-rest
> # sdm 2019-05-03 14:37:23 Create Project
>   Successfully created new project user/my-new-java-project at file://Users/user/atomist/projects/user/my-new-java-project
```

If you navigate to the `~/atomist/projects/user/my-new-java-project` directory, you'll see your brand new generated project!
