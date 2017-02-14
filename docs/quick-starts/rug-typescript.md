## Rug TypeScript Quick Start

Rugs can be written in [TypeScript](https://www.typescriptlang.org/)
or the [Rug DSL][dsl]. The TypeScript approach is usually preferable
over the [Rug DSL][dsl] when you have some real programmatic work to
do in your Rugs where the DSL is too constraining. Also using
TypeScript has the significant added bonuses of being type-safe and
having great existing tooling support for features like
code-completion.

[dsl]: ../reference-docs/rug/index.md

In this Quick Start you're going to set up your Rug archive for
writing and testing Rugs written in TypeScript and using
the [Rug CLI](rug-cli.md).

### Getting set up for TypeScript Rugs

To enable your Rug archive for TypeScript all you need to do is:

-   Add a [standard `package.json` file](https://docs.npmjs.com/files/package.json) into the `.atomist` directory, amending for your own Rug archive's project settings.
-   Install `node` and `npm` for local TypeScript development and, specifically, to install any dependencies your Rug TypeScript sources may have.

You can have both Rug DSL and Rug TypeScript files in the *same* Rug archive. A good example of this is available in the [`travis-editors` Rug archive](https://github.com/atomist-rugs/travis-editors).

> ***NOTE:*** A Rug editor and generator for this work is being produced and will reside in the [`rug-editors` Rug archive](https://github.com/atomist-rugs/rug-editors).

#### Adding a `package.json` file

As a starting point, simply add a [standard `package.json` file](https://docs.npmjs.com/files/package.json) to your `.atomist` directory that contains the following:

```
{
  "dependencies": {
    "@atomist/rug": "0.10.0"
  }
}
```

All you need as a minimum in the `package.json` file is the dependency on the version of Rug that matches what is specified in your `.atomist/manifest.yml` file.

#### Install Node and NPM and run `npm install`

To get any dependencies that your Rug TypeScript code may need you should now install [node.js](https://nodejs.org/), which will install the Node Package Manager (npm) at the same time.

Once you have these two installed on your machine you should be able to successfully execute `npm install` in your `.atomist` directory to see the following:

```shell
$ npm install
@russmiles/scattered-rugs@0.8.0 ...scattered-rugs/.atomist
└── @atomist/rug@0.10.0
```

This will create a `node_modules` directory which can be ignored, using something like `.gitignore` if you're using [git](https://git-scm.com/), and not checked into source control as it is only needed for local development.

### Writing your first TypeScript Rug editor

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

```shell
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

export let editor: ProjectEditor = {
    tags: ["simple"],
    name: "SimpleSampleEditor",
    description: "A simple sample Rug TypeScript editor",
    parameters: params,
    edit(project: Project, {description } : {description: string}) {

        project.addFile("README.md", description);

        return new Result(Status.Success, "README.md added to project")
    }
}
```

Walking through this editor the contents are:

-   Importing the TypeScript types for working with Rug.
-   Declaring a single, mandatory parameter `description` to this editor.
-   Tagging and exporting a `ProjectEditor` implementation that contains the `edit` function implementation for the project-editing logic.

You should now be able to execute `rug test` from your project's root directory and get a similar output to the following:

```shell
$ rug test
Resolving dependencies for russmiles:scattered-rugs:0.1.0 ← local completed
Loading russmiles:scattered-rugs:0.1.0 ← local into runtime completed
Executing scenario SimpleSampleEditor should just add a file called "README.md" to the target project...
  Testing assertion fileExists(SimpleLiteral(README.md))
  Testing assertion fileContains(SimpleLiteral(README.md),SimpleLiteral(Hello, Rug TypeScript World!))
Running test scenarios in russmiles:scattered-rugs:0.1.0 ← local completed

Successfully executed 1 of 1 scenarios: Test SUCCESS
```

### More Information

That's it for our brief introduction to Rug
TypeScript.  Please join our [Atomist Community Slack][slack] to ask
questions, get help, and discuss all things Rug.

[slack]: https://join.atomist.com/
