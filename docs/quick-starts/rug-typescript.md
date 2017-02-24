[TypeScript][ts] is the primary language Atomist supports for writing
Rugs. TypeScript provides a complete programming language, type
safety, and great tooling support for features like code completion
and syntax checking.

[ts]: https://www.typescriptlang.org/

In this Quick Start you will set up your Rug project for writing and
testing Rugs written in TypeScript.

## Prerequisites

Before you begin this quick start, please go through
the [Rug CLI Quick Start](rug-cli.md) so you have the CLI installed
and are familiar with running basic commands.

## Getting set up for TypeScript Rugs

To get your Rug project ready for TypeScript Rugs, you will run the
Rug editor `AddTypeScript`.

```
$ cd rug/project/directory
$ rug edit atomist-rugs:rug-editors:AddTypeScript
```

Detailed instructions for running the `AddTypeScript` editor can be
found in the [rug-editors README][rug-editors].

[rug-editors]: https://github.com/atomist-rugs/rug-editors#addtypescript

The `AddTypeScript` editor will add the following files and directory
to the `.atomist` directory in the project.

-  `package.json`: a simple [Node.js][node]
   NPM [`package.json`][pkg-json] configuring the dependency on the
   Rug TypeScript typings
-  `tsconfig.json`:
   a [TypeScript compiler configuration file][tsconfig] used by
   development tools
-  `.gitignore`: a standard [gitignore][] file instructing Git to
   ignore files created by the TypeScript compiler and NPM
-  `node_modules`: this directory contains the Rug TypeScript typings

[node]: https://nodejs.org/
[pkg-json]: https://docs.npmjs.com/files/package.json
[tsconfig]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
[gitignore]: https://git-scm.com/docs/gitignore

## Creating a TypeScript Rug editor

To create your first TypeScript Rug editor and its associated test, we
will run the Rug editor `AddTypeScriptEditor`.  Run the following
command to create the editor and its test.

```
$ rug edit atomist-rugs:rug-editors:AddTypeScriptEditor \
    editor_name=MyNewEditor \
    description="This is my newest editor... in TypeScript!"
```

Detailed instructions for running the `AddTypeScriptEditor` can be
found in the [rug-editors README][ts-editor].

[ts-editor]: https://github.com/atomist-rugs/rug-editors#addtypescripteditor

Running the `AddTypeScriptEditor` editor as above will result your new
TypeScript Rug editor being created in
`.atomist/editors/MyNewEditor.ts` and its corresponding tests being
created in `.atomist/tests/MyNewEditor.rt`.  You can make sure
everything is working by running the tests using the CLI.

```
$ rug test
Resolving dependencies for mygroup:ts-qs:0.1.0 ← local completed
Invoking TypeScript Compiler on ts script sources
  Created .atomist/editors/MyNewEditor.js
  Created .atomist/editors/MyNewEditor.js.map
Processing script sources completed
Loading mygroup:ts-qs:0.1.0 ← local into runtime completed
Executing scenario MyNewEditor is added to your project by AddTypeScriptEditor...
  Testing assertion fileContains(SimpleLiteral(hello.txt),SimpleLiteral(Hello, World!))
Running test scenarios in mygroup:ts-qs:0.1.0 ← local completed

Successfully executed 1 of 1 scenarios: Test SUCCESS
```

!!! note ""
    Any changes made by Rugs in a test are performed completely in
    memory.  Tests do not alter actual project files on the file
    system.

## Writing your first TypeScript Rug editor

Now that we have a sample TypeScript Rug editor in our project, we can
change it to do something useful.  Before we go changing the editor,
we should change the test to check for our desired behavior and
establish it is failing prior to implementing the feature.

Here are the default contents for the test.

```rug
scenario MyNewEditor is added to your project by AddTypeScriptEditor

given
  ArchiveRoot

when
  MyNewEditor input_parameter="the input_parameter value"

then
  fileContains "hello.txt" "Hello, World!"
```

Let's personalize the editor a bit and have the message in the
`hello.txt` file address someone by name.  We will change the test to
check for this, and also update the test scenario description.  When
we are done, the test should look like this.

```rug
scenario MyNewEditor adds a personalized greeting file to a project

given
  ArchiveRoot

when
  MyNewEditor addressee="Mary"

then
  fileContains "hello.txt" "Hello, Mary!"
```

We run the test and make sure it is failing.

```
$ rug test
Resolving dependencies for mygroup:ts-qs:0.1.0 ← local completed
Invoking TypeScript Compiler on ts script sources
  Created .atomist/editors/MyNewEditor.js
  Created .atomist/editors/MyNewEditor.js.map
Processing script sources completed
Loading mygroup:ts-qs:0.1.0 ← local into runtime completed
Executing scenario MyNewEditor adds a personalized greeting file to a project...
Running test scenarios in mygroup:ts-qs:0.1.0 ← local completed

→ Failed Scenarios
  MyNewEditor adds a personalized greeting file to a project (1 of 1 assertions failed)
    Failed Assertions
       Editor failed due to missing parameters: Missing parameters: [input_parameter]: Parameters: name=, values=[Buffer(SimpleParameterValue(addressee,Mary))]

Unsuccessfully executed 1 of 1 scenarios: Test FAILED
```

With our test *happily* failing, we can now update our editor to meet
the assertions of the test.  The original contents of the
`MyNewEditor.ts` file should look like this.

```typescript
import { EditProject } from '@atomist/rug/operations/ProjectEditor'
import { Project } from '@atomist/rug/model/Core'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators'

@Editor("MyNewEditor", "This is my newest editor... in TypeScript!")
@Tags("documentation")
class MyNewEditor implements EditProject {

    @Parameter({
        displayName: "Some Input",
        description: "example of how to specify a parameter using decorators",
        pattern: Pattern.any,
        validInput: "a description of the valid input",
        minLength: 1,
        maxLength: 100
    })
    input_parameter: string;

    edit(project: Project) {
        project.addFile("hello.txt", "Hello, World!\n" + this.input_parameter + "\n");
    }
}

export const myNewEditor = new MyNewEditor()
```

Walking through this editor the contents are:

-   Importing the Rug TypeScript typings
-   Declaring the editor using the `@Editor` decorator, passing in its name and description
-   Tagging the editor using the `@Tag` decorator to aid discoverability
-   Implementing the `EditProject` interface to enforce the `edit` function signature
-   Inside the class
    -   Declaring parameters using the `@Parameter` decorator
    -   Implementing the `edit` method
-   Finally, exporting an instance of your editor class

After making the edits to implement our desired functionality, our
editor should look something like this.

```typescript
import { EditProject } from '@atomist/rug/operations/ProjectEditor'
import { Project } from '@atomist/rug/model/Core'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators'

@Editor("MyNewEditor", "Adds a customized welcome file to a project")
@Tags("documentation")
class MyNewEditor implements EditProject {

    @Parameter({
        displayName: "Greeting Addressee",
        description: "name of person to whom the greeting should be addressed",
        pattern: Pattern.any,
        validInput: "any valid string",
        minLength: 1,
        maxLength: 100
    })
    addressee: string;

    edit(project: Project) {
        project.addFile("hello.txt", "Hello, " + this.addressee + "!\n");
    }
}

export const myNewEditor = new MyNewEditor()
```

We have updated the editor description, the parameter information, and
the content of the created `hello.txt` file.

We can now run our test to see if our changes produce the desired
result.

```
$ rug test
Resolving dependencies for mygroup:ts-qs:0.1.0 ← local completed
Invoking TypeScript Compiler on ts script sources
  Created .atomist/editors/MyNewEditor.js.map
  Created .atomist/editors/MyNewEditor.js
Processing script sources completed
Loading mygroup:ts-qs:0.1.0 ← local into runtime completed
Executing scenario MyNewEditor adds a personalized greeting file to a project...
  Testing assertion fileContains(SimpleLiteral(hello.txt),SimpleLiteral(Hello, Mary!))
Running test scenarios in mygroup:ts-qs:0.1.0 ← local completed

Successfully executed 1 of 1 scenarios: Test SUCCESS
```

Success!  Congratulations, you have created your first TypeScript Rug!

## More Information

That's it for our brief introduction to writing Rugs in TypeScript.
Please join our [Atomist Community Slack][slack] to ask questions, get
help, and discuss all things Rug.

[slack]: https://join.atomist.com/
