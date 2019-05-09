As we mentioned elsewhere, [setting up a generator](/developer/setting-up-a-generator/) is a great way to establish a repository template from which all of your newer projects can derive. There's one more powerful function you can apply when generating a project, and that's a _code transform_.

A code transform allows you to change any of the files in a seed repository at the time of a project's generation. You can use it to do anything from changing the copyright year in source code header licenses to manipulating the AST of the files entirely.

In this example, we'll apply a code transform that does two things to a Node project: first, it'll update the README.md to note the project's name, and second, it'll also update the package.json file to use the project's name, too.

## Prerequisites

You should already have [a blank SDM](/developer/sdm/#creating-an-sdm-project), though you can also use an existing one if you'd like.

We'll be using the [atomist-seeds/express-es6-rest-api](https://github.com/atomist-seeds/express-es6-rest-api) repository as our seed. Please don't use this seed for your own Express projects, as this is just a demo app (and likely full of outdated packages!).

## Registering a generator

Since we've already gone through this before, we'll simply provide the generic generator boilerplate to get started.  Open up your SDM, and add a new file called `lib/node_generator.ts`. Paste the following lines to get started with your generator:

```typescript
import { GitHubRepoRef } from "@atomist/automation-client";
import { GeneratorRegistration } from "@atomist/sdm";

export const NodeExpressGenerator: GeneratorRegistration = {
  name: "Node Express Project",
  intent: "generate-node-express-project",
  startingPoint: GitHubRepoRef.from({
      owner: "atomist-seeds",
      repo: "express-es6-rest-api",
  }),
  transform: []
};
```

## Changing a Markdown file

Most README.md files start with a heading that plainly state the name of the project:

```
# Express & ES6 REST API Boilerplate
```

When we create a new repository through the project generator, we want to be able to have this header reflect the name of the project dynamically.

Atomist provides a number of extensions for common tasks, and in this case, [the Markdown extension](https://docs.atomist.com/pack/markdown/) has everything we need to get the job done. First, install the package in your SDM through npm:

```
npm i @atomist/sdm-pack-markdown
```

Next, we'll import the method called `updateTitle` from this package

```typescript
import { updateTitle } from "@atomist/sdm-pack-markdown";
```

And finally, we'll put this function as the first element in the `transform` argument, passing in the name of the file to modify and the value we want the title to become:

```typescript
transform: [
  updateTitle("README.md", "dynamic name"),
],
```

## Renaming a package.json file

For a more complicated task, let's next

```typescript
import { CodeTransform, GeneratorRegistration } from "@atomist/sdm";
```

```typescript
const renamePackage: CodeTransform = (p: Project, inv) => {
```

https://atomist.github.io/automation-client/modules/_lib_project_util_projectutils_.html#dowithfiles


```typescript
import { doWithFiles } from "@atomist/automation-client/lib/project/util/projectUtils";
```

```typescript
const renamePackage: CodeTransform = (p: Project, inv) => {
  return doWithFiles(p, "*.json", async f => {

  });
};
```

```typescript
return doWithFiles(p, "*.json", async f => {
    return f .replace(/"name": "express-es6-rest-api"/, `"name": "dynamic-name"`);
});
```

```typescript
transform: [
  updateTitle("README.md", "dynamic name"),
  renamePackage,
],
```

## Testing the generator

Let's see the command in action.

Start up your SDM in [Local Mode](/developer/local/):

```
$ atomist start --local
```

Amongst all the lines the scroll by, you should see one that identifies your command as having been registered:

```
> Commands
>   Node Express Project (Node Express Project) generate-node-express-project
```

In fact, if you type `atomist -h`, you'll also see your command in the output. Try running `atomist generate-node-express-project`; you'll be asked just for the name of the new repository, and the SDM will go ahead and clone it immediately:

```
$ atomist generate-java-spring-project
> Node Express Project
> ? name of the new repository my-new-node-project
> # sdm 2019-05-03 14:37:22 Create Project
>   Cloning seed project from starting point atomist-seeds/express-es6-rest-api at https://github.com/atomist-seeds/express-es6-rest-api
> # sdm 2019-05-03 14:37:23 Create Project
>   Successfully created new project user/my-new-node-project at file://Users/gjtorikian/atomist/projects/user/my-new-node-project
```

If you peruse that directory, you'll notice that the values we expected to change in both the README.md and package.json were applied!
