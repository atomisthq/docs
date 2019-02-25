The Node SDM pack provides various tools for JavaScript and TypeScript
projects. It includes full
support for building using npm scripts. There are also code inspections,
reviewers, and more. You can use all or part of this support.

Find the full [API Doc here][apidoc].

[github]: https://github.com/atomist/sdm-pack-node (GitHub Repository)
[apidoc]: https://atomist.github.io/sdm-pack-node/ (SDM Node Pack API Doc)

## Bundled automations

You can install a chunk of node support by installing the pack with:

```typescript
sdm.addExtensionPack(nodeSupport({
    inspectGoal,
    autofixGoal,
    review: { typescriptErrors: true },
    autofix: { typescriptErrors: true },
}))
```

This will get you the [autofixes](#autofixes) and [code inspections](#code-inspections) listed below.

## Autofixes

Let Atomist correct some common nitpicks in code.

Add these autofixes to your [autofix goal](../developer/goal.md#autofix), or let the [pack installation](#bundled-automations) do it for you.

### tslint

If a project is TypeScript, is Node, and has `tslint.json`, the [tslintFix](https://atomist.github.io/sdm-pack-node/modules/_lib_autofix_tslintfix_.html#tslintfix) will run
`npm run lint:fix` and commit the results for you.

You need to define a "lint:fix" npm script in `package.json` for this to work. This lets you pass
additional options. We have the following in our package.json:

```
  "scripts": {
      ...
    "lint": "tslint --format verbose --project . --exclude \"{build,node_modules}/**\" --exclude \"**/*.d.ts\" \"**/*.ts\"",
    "lint:fix": "npm run lint -- --fix",
    ...
  }
```

### Add Build Script

Our node build goals expect every project to have a "build" script in package.json. The
 [AddBuildScript](https://atomist.github.io/sdm-pack-node/modules/_lib_autofix_addbuildscript_.html#addbuildscript)
 autofix adds one if you don't have it.

The build script will echo something about "build goes here," 
giving you a placeholder.

## Code Inspections

Notice problems in TypeScript code.

Add this to your [autoinspect goal](../developer/goal.md#autoinspect), or let the [pack installation](#bundled-automations) do it for you.

### DontImportOwnIndex

We like to re-export the definitions that compose our external API from `index.ts`.
Sometimes the IDE tries to import from `index.ts` even within the project, which creates
circular imports and causes problems.

This inspection makes that an error.

## PushTests

[Push Tests][push-test] measure qualities of a project or push, 
so that you can
decide whether goals or operations apply to them. This pack includes:
[push-test]: ../developer/push-test.md (Push Tests)

-  [IsTypeScript](https://atomist.github.io/sdm-pack-node/modules/_lib_pushtest_tspushtests_.html#istypescript) checks for any TypeScript files.
-  [IsNode](https://atomist.github.io/sdm-pack-node/modules/_lib_pushtest_nodepushtests_.html#isnode) checks for a package.json, which indicates a Node project.
-  [IsAtomistAutomationClient](https://atomist.github.io/sdm-pack-node/modules/_lib_pushtest_nodepushtests_.html#isatomistautomationclient)
recognizes SDM projects.

## Code Transforms

[Code transforms](../developer/transform.md) operate on the code inside a project,
 performing well-defined modifications in place. This pack includes two that are used
 in generating new Node projects:

### Update Package Identification

[UpdatePackageJsonIdentification](https://atomist.github.io/sdm-pack-node/modules/_lib_transform_updatepackagejsonidentification_.html#updatepackagejsonidentification)
 helps transform a seed into a new Node project. It sets the app name, description, version, author, repository, homepage, and bugs URL in `package.json`.

### Update README Title

[UpdateReadmeTitle](https://atomist.github.io/sdm-pack-node/modules/_lib_transform_updatereadmetitle_.html#updatereadmetitle) helps transform a seed into a new Node project.

## Fingerprinters

[Fingerprinters](../developer/fingerprint.md) identify significant bits of a project so that we can react when they change.

### package-lock.json Fingerprinter

This computes a SHA of the package-lock.json, which changes whenever dependencies are updated.

## Goals

This pack includes some useful parts to build your own goals. I recommend looking at the code for these when you decide whether to use them (or copy them).

### nodeBuilder

Supply a list of commands to run your build. This builder adds 

-  error finding: if the log includes "ERR!" or "[error]" the build fails
-  log interpretation: pulls out the relevant bits of the log for some npm errors and mocha test failures
-  app info extraction: pulls the project version name and out of package.json

Register this builder on a [build goal](../developer/goal.md#build) to use it:

```typescript
import { Build } from "@atomist/sdm-pack-build";

const build = new Build().with({
    name: "npm-build",
    builder: nodeBuilder("npm run compile", "npm test"),
    pushTest: IsNode,
});
```

### npm publish

[executePublish](https://atomist.github.io/sdm-pack-node/modules/_lib_build_executepublish_.html#executepublish) as a GoalExecutor; you can use it to create a custom goal that publishes to npm. 

## Examples of this pack in action

Within Atomist, we use this pack extensively in the [node support](https://github.com/atomist/atomist-sdm/blob/master/lib/machine/nodeSupport.ts) within our [own SDM][atomist-sdm]. 

[atomist-sdm]: https://github.com/atomist/atomist-sdm
