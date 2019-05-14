As we mentioned elsewhere, [setting up a generator](/developer/setting-up-generator/) is a great way to establish a repository template from which all of your newer projects can derive. There's one more powerful function you can apply when generating a project, and that's a _code transform_.

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

As a more advanced task, let's rename the `"key"` value in the package.json file to match the name of our new project. In order to accomplish this, we will write our own custom code transform function, and pass it into the `transform` array.

At the top of the file, import the `CodeTransform` function:

```typescript
import { CodeTransform, GeneratorRegistration } from "@atomist/sdm";
```

Now, let's write out what the basics for our custom transform will look like:

```typescript
const renamePackage: CodeTransform = (p: Project) => {

};
```

The `Project` type represents the seed we are copying from, and it's the first argument passed to a code transform function. In our case, we want to find the package.json file, read its contents, and replace a string. Fortunately, there's a single method that will do the first two tasks for us called [`doWithFiles`](https://atomist.github.io/automation-client/modules/_lib_project_util_projectutils_.html#dowithfiles). `doWithFiles` accepts a project, a glob pattern string, and calls a provided function on every matched filename.

Import `doWithFiles` at the top of your code:

```typescript
import { doWithFiles } from "@atomist/automation-client/lib/project/util/projectUtils";
```

An initial outline of incorporating `doWithFiles` into the code transform function might look like this:

```typescript
const renamePackage: CodeTransform = (p: Project) => {
  return doWithFiles(p, "package.json", async f => {

  });
};
```

Generally speaking, you could also pass an array of patterns into this method, if you had more than one file to change. In this case, though, we know that the package.json is right at the root of the directory. The `f` argument is of the type [`File`](https://atomist.github.io/automation-client/interfaces/_lib_project_file_.file.html). This means that you can call methods returning more information, such as `f.isBinary`, but it also provides convenience methods that modify its contents, such as `setContent`. In other words, you don't get a file handler, you get an abstracted object which you can query and maniulate.

Since we need to replace a string, let's use the `replace` method here:

```typescript
return doWithFiles(p, "package.json", async f => {
  return f.replace(/"name": "express-es6-rest-api"/, `"name": "dynamic-name"`);
});
```

The final step is to remember to include this function in the `transform` array:

```typescript
transform: [
  updateTitle("README.md", "dynamic name"),
  renamePackage,
],
```

It's important to note that code transforms are processed in sequential order, so the README.md changes before the package.json file. In this case, it doesn't matter, but keep it in mind if you have multiple transforms that depend on one another.

## Adding the generator

Next, in your `machine.ts` file, add the following line to import the file you've just created:

```typescript
import {
    NodeExpressGenerator,
} from "./node_generator";
```

Within the SDM logic itself, you'll add the generator via the `addGeneratorCommand` method:

```typescript
sdm.addGeneratorCommand(NodeExpressGenerator);
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
