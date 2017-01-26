## Rug TypeScript Quick Start

Rugs can be written in TypeScript (TBD link) or the [Rug DSL](../refence-docs/rug/index.md). The TypeScript approach is usually preferable over the [Rug DSL](../refence-docs/rug/index.md) when you have some real programmatic work to do in your Rugs where the DSL is too constraining.

In this Quick Start you're going to set up your Rug archive for writing and testing Rugs written in TypeScript and using the [Rug CLI](rug-cli.md).

### Getting set up for TypeScript Rugs

To enable your Rug archive for TypeScript all you need to do is:

-   Add a `package.json` file into the `.atomist` directory, amending for your own Rug archive's project settings
-   Add a `tsconfig.json` file into your `.atomist` directory
-   Install `node` and `npm` for local TypeScript development and, specifically, to install any dependencies your Rug TypeScript sources may have.

You can have both Rug DSL and Rug TypeScript files in the *same* Rug archive. A good example of this is available in the [`travis-editors` Rug archive](https://github.com/atomist-rugs/travis-editors).

> ***NOTE:*** A Rug editor and generator for this work is being produced and will reside in the `rug-editors` Rug archive.

#### Adding a `package.json` file

As a starting point, simply add a `package.json` file to your `.atomist` directory that contains the following:

```
{
  "name": "@atomist-rugs/travis-editors",
  "version": "0.8.0",
  "description": "Editors for enabling Travis CI",
  "keywords": [
    "Atomist",
    "Rug",
    "Travis"
  ],
  "author": "Atomist, Inc",
  "license": "Apache-2.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/atomist-rugs/travis-editors.git"
  },
  "bugs": {
    "url": "https://github.com/atomist-rugs/travis-editors/issues"
  },
  "homepage": "https://github.com/atomist-rugs/travis-editors#readme",
  "dependencies": {
    "@atomist/travis": "0.5.1",
    "@atomist/rug": "0.10.0"
  },
  "scripts": {
    "rug-install": "rug install -urX",
    "rug-test": "rug test -urX",
    "rug-publish": "rug publish -urX"
  }

```

Amend the following in this `package.json` file according to your own Rug archive project's settings in your `.atomist/manifest.yml` file.

#### Adding a `tsconfig.json` file

The `tsconfig.json` (TBD link) file contains the settings for the TypeScript transpiler (TBD link). A generally suitable starting point is to add a `tsconfig.json` to your `.atomist` directory that contains the following:

```
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "moduleResolution": "node",
        "isolatedModules": false,
        "jsx": "react",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "declaration": false,
        "noImplicitAny": false,
        "noImplicitUseStrict": false,
        "removeComments": true,
        "noLib": false,
        "preserveConstEnums": true,
        "suppressImplicitAnyIndexErrors": true
    },
    "exclude": [
        "node_modules",
        "typings/browser",
        "typings/browser.d.ts"
    ],
    "compileOnSave": true,
    "buildOnSave": false,
    "atom": {
        "rewriteTsconfig": false
    }
}
```

#### Install Node and NPM and run `npm install`

To get any dependencies that your Rug TypeScript code may need you should now install [node.js](https://nodejs.org/), which will install the Node Package Manager (npm) at the same time.

Once you have these two installed on your machine you should be able to successfully execute `npm install` in your `.atomist` directory to see the following:

```
$ npm install
@russmiles/scattered-rugs@0.8.0 ...scattered-rugs/.atomist
└── @atomist/rug@0.10.0
```

This will create a `node_modules` directory which can be ignored, using something like `.gitignore` if you're using [git](https://git-scm.com/), and not checked into source control as it is only needed for local development.

### Writing your first TypeScript Rug Editor

Now you are set up for working with Rug in TypeScript, let's write a simple editor. As usual, we start by constructing a test for our future editor and we can do this using the convenience of a Rug DSL BDD test:

```
scenario SimpleSampleEditor should just add a file called "README.md" to the target project

given
  Empty

when
  SimpleSampleEditor

then
  fileExists "README.md"
    and fileContains "README.md" "Hello, Rug TypeScript World!"
```

Drop this test into a file called `.atomist/tests/MyFirstEditor.rt` and then execute `rug test` using the Rug CLI (link) and you should see something like the following:

```
$ rug test
Resolving dependencies for russmiles:scattered-rugs:0.1.0 ← local completed
Loading russmiles:scattered-rugs:0.1.0 ← local into runtime completed
Running test scenarios in russmiles:scattered-rugs:0.1.0 ← local completed

→ Failed Scenarios
  SimpleSampleEditor should just add a file called "README.md" to the target project (1 of 1 assertions failed)
    Failed Assertions
       Scenario 'SimpleSampleEditor should just add a file called "README.md" to the target project' tests editor 'SimpleSampleEditor', which was not found.
Known operations are []
```

With our test *happily* failing you can now write the following Rug TypeScript editor to meet the assertions of the test. Create a file called `SimpleSampleEditor.ts` in the `.atomist/editors` directory that contains the following:

```
import { ProjectEditor } from "@atomist/rug/operations/ProjectEditor"
import { Status, Result, Parameter } from "@atomist/rug/operations/RugOperation"
import { Project, Pair, File } from '@atomist/rug/model/Core'
import { PathExpression, PathExpressionEngine, TreeNode, Match } from '@atomist/rug/tree/PathExpression'


let params: Parameter[] = [
    {
        name: "description",
        displayName: "Description",
        description: "Text to be added to the README.md",
        validInput: "Any valid text",
        minLength: 1,
        pattern: "@any",
    }
]

interface Parameters {
    description: string
}

export let editor: ProjectEditor = {
    tags: ["simple"],
    name: "SimpleSampleEditor",
    description: "A simple sample TypeScript editor",
    parameters: params,
    edit(project: Project, p: Parameters): Result {

        project.addFile("README.md", p.description);

        return new Result(Status.Success, "README.md added to project")
    }
}
```

Walking through this editor the contents are:

-   TBD

### More Information

That's it for our brief introduction to Rug
TypeScript.  Please join our [Atomist Community Slack][slack] to ask
questions, get help, and discuss all things Rug.

[slack]: https://join.atomist.com/
