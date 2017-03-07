This document highlights the conventions of writing, testing and publishing Rugs. These are best-practices for a smoother experience of writing, running and using Rugs. The rug toolchain will not, in most cases, enforce any of those conventions.

## Terminology

### &laquo; Rug &raquo; vs &laquo; rug &raquo;
The term &laquo; Rug &raquo; covers two sides of the same coin, a programming model and a rapid development environment. To differentiate the two, we use &laquo; Rug &raquo; with a capital  &laquo; R &raquo; for the former while the CLI is refered to as &laquo; rug &raquo; with a lower &laquo; r &raquo;. The term &laquo; Rug &raquo; can be plural whereas &laquo; rug &raquo; should not.

* The Rug programming model is the interface that supports the Atomist [capabilities][]
* The rug rapid development environment provides a toolchain consisting of a multi-platform CLI and shell as well as a runner to search, execute, test, install and publish Rugs from your local environment

[capabilities]: /capabilities.md

### Rug Operations

The Rug programming model declares the following Rug operations:

* [generator](generators.md)
* [editor](editors.md)
* [reviewer](reviewers.md)
* [command handler](commands.md)
* [event handler](handlers.md)
* response handler

Each operation targets a [capability][capabilities] of the Atomist platform. 

### Rug Project vs Rug Archive

A Rug project is a software project consisting of, at least, the `.atomist` directory as one of the top-level project sub-directories. Please refer to the  [according documentation][rugproj] to learn more about Rug projects.

[rugproj]: projects.md

A Rug archive is the bundle of published Rugs hosted in a repository and downloaded locally into the `$HOME/.atomist/repository` directory when needed.

## Rug Project Guidelines

### README

Rug projects ought to have a good `README.md` file, written using the [Markdown] format, containing the following information:

-   A general description of the intent of the Rugs in the project,
    i.e., what ties them all together, at the top of the README.
-   A section named **Rugs** that has a subsection for each Rug:
    -   An explanation of what the Rug does, e.g., how will the
        source code be changed after running the editor.
    -   A subsection named *Prerequisites* describing what must be in
        place before running the Rug.
    -   A subsection named *Parameters* describing the Rug's input
        parameters, including examples of valid input values.
    -   A subsection named *Running* describing how to run the Rug and
        providing examples of how to run the Rug.
-   A **Support** section providing information on how to get help
    with the Rugs in the project.
-   A **Development** section providing information on how one would
    modify and test the Rugs.

[markdown]: https://daringfireball.net/projects/markdown/syntax

Public Rug repositories should be automatically built, tested
and deployed using a continuous integration service, like [Travis CI][travis].  The CI build status badge and the Slack badge for the Atomist Community should be placed in the `README.md` between the page title and the general description.
Here is the Markdown text to add the Slack badge:

```md
[![Slack Status](https://join.atomist.com/badge.svg)](https://join.atomist.com)
```

[travis]: https://travis-ci.org/

Rug repositories should have a change log in
the [`CHANGELOG.md` format][changelog].

[changelog]: http://keepachangelog.com/

### Project Naming

A Rug project name should be hyphenated and start with the technology
stack being targeted, such as `spring-boot`, followed by `-editors` if
this is a Rug project with a collection of useful editors or reviewers.

If the main purpose of a Rug project is to be a generator, then ending
the name of the type of project it will generate would be most
appropriate.  For example if your Rug projects's main purpose was to be
a generator for a Spring Boot Rest Service then
`spring-boot-rest-service` or even `java-spring-boot-rest-service`
would be appropriate. If your Rug projects's main purpose was simply to
generate a valid Maven project then `maven-project` would be appropriate.

### Configuration File

Rug project configuration is stored in a file in the `.atomist/manifest.yml`
file. It describes the Rug project according to the following rules:

*   `#!yaml group`: The organisation behind this Rug project. Most commonly
    the GitHub organisation in which they reside.

*   `#!yaml artifact`: Name of the Rug archive (see next section)

*   `#!yaml version`: [Semantic version][semver] of this Rug project

[semver]: http://semver.org/

### Dependency Settings

#### Runtime dependency

A Rug project has two dependency management sources. First, in the `.atomist/manifest.yml` file, the `requires` section specifies the exact, or bounded, version of the Rug language that your Rug project has been tested against. For instance, for a strict version:

```yaml
requires: "0.13.0"
``` 

For a range of versions:

```yaml
requires: "[0.13.0, 1.0.0)"
``` 

In that case, the runtime will search for the highest released version in that range.

#### Development dependency

While developing Rugs, and to fully benefit from the static typing support of the TypeScript language, your project should define its development dependency in the `.atomist/package.json` [file][npmpackage]. Set the `dependencies` section to the minimum released version of the Rug language your project targets. For instance:

```json
    { "@atomist/rug": "0.13.0" }
``` 
[npmpackage]: https://docs.npmjs.com/files/package.json

!!! note
    The `.atomist/package.json` file does not impact the runtime of your Rug, which is driven by the `.atomist/manifest.yml` file's content. The former only exists to support a nice development experience from your favourite IDE. 

    In addition, your project may contain an `.atomist/tsconfig.json` file describing the [options of the TypeScript compiler][tsconfig]. This file is not used by the runtime either but may be useful in your development environment.

### Rug Files

Rug files should have the `.ts` extension when written using the TypeScript language.  Rug files should placed in the following locations
within a _Rug project_.  Rug editors and generators should be in
`.atomist/editors` and Rug reviewers should be in `.atomist/reviewers`.

BDD-style tests for your Rugs are strongly recommended and should be
located within a `.atomist/tests` directory and have the `.ts`
extension.

If your Rugs, typically editors, use any [templates][], they are placed in
the `.atomist/templates` directory.

[templates]: templates.md

## Rugs Guidelines

### Naming

Rug editors, generators, reviewers should have their names formatted using [UpperCamelCase][ucc].

[ucc]: http://wiki.c2.com/?UpperCamelCase

Following the rule of making implicit concepts explicit, the name of
your Rug should correspond to a complete and specific description of
the purpose of the Rug.

For example, `AddDocker` is a good name if the Rug adds Docker to
anything, but `AddDockerToMavenProjects` is better if the intention of
the Rug is to only work with projects that follow Maven conventions.

Rugs within the same file are conventionally understood to be
in support of the main and initial Rug in the file.

The name is set as the first argument of the [decorator][decorators] defining the Rug operation. For instance, for an editor:

```typescript hl_lines="2"
@Editor(
    "AddDockerToMavenProjects", 
    "adds the docker files to a Maven project"
)
```

### Describing

A good Rug description states exactly what the purpose of the Rug is
***without capitalisation on the sentence*** and ***without a closing
period***. The reason for avoiding sentence punctuation is that the
description is often used by the Atomist Bot and the grammar of its
usage is context-driven at that point.  Ideally the description
should be a sentence fragment and as short as possible.

The description is set as the second argument of the [decorator][decorators] defining the Rug operation. For instance, for an editor:

```typescript hl_lines="3"
@Editor(
    "AddDockerToMavenProjects", 
    "adds the docker files to a Maven project"
)
```

### Discoverability 

Your Rugs should be annotated with a collection of `#!typescript @Tags` TypeScript [decorators][] to optimise their discoverability. For example if you were to create an editor that affected the `readme` `documentation` then the following `@Tags` annotations would be applicable:

```typescript
@Tags("readme", "documentation")
```

Tag values should consist of only lower case letters, numbers, and
dashes (`-`).

You may want to make sure at least one of the tags on your Rug maps to
an image for a nicer rendring by Atomist bot.  The following tags currently have images: `docker`,`github`, `travis-ci`, `apache`, `git`, `spring-boot`, `spring`, `clojure`, `go`, `java`, `python`, `scala`, and `documentation`.

### Code Structure

As seen previously, the Rug programming model defines six operations: generator, editor, reviewer, command handler and event handlers. Atomist values consistency and the principle of least surprise so all those operations share a very similar model and structure:

* [Import statements][moduleres] of Rug entities so that you can benefit from a rich development experience
* The class declaration of Rug operations, decorated with the according Rug [decorator][decorators]: `#!typescript @Generator`, `#!typescript @Editor`, `#!typescript @Reviewer`, `#!typescript @CommandHandler`, `#!typescript @EventHandler` and `#!typescript @ResponseHandler`. The class should also likely be decorated with the `#!typescript @Tags` decorator as explained above
* The class definition should implement the appropriate [interface] for the operation: `#!typescript PopulateProject`, `#!typescript EditProject`, `#!typescript ReviewProject`, `#!typescript HandleCommand`, `#!typescript HandleEvent` and `#!typescript HandleResponse`
* If the Rug takes any parameters, they should be defined inside the class definition through the `#!typescript @Parameter` decorator
* Finally, both the class definition and an instance of that class should be [exported at the module level][module]

Here is a representative example of a Rug implemented in TypeScript following the above points:

```typescript
import { EditProject } from "@atomist/rug/operations/ProjectEditor";
import { Project } from "@atomist/rug/model/Project";
import { Pattern } from "@atomist/rug/operations/RugOperation";
import { Editor, Parameter, Tags } from "@atomist/rug/operations/Decorators";

@Editor("MyFirstEditor", "A sample Rug TypeScript editor to start playing with.")
@Tags("documentation")
export class MyFirstEditor implements EditProject {

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

export const myFirstEditor = new MyFirstEditor();
```

!!! tip
    We do not issue specific conventions regarding TypeScript code but it is certainly a good idea to rely on a [TypeScript linter][tslint] to catch common pitfalls in your code.

### Parameterizing

Rug parameters are part of the public contract for invoking that Rug. They should follow [snake_case][snake] rules and describe, as explicitly as possible, what the parameter is to contain.

[snake]: https://en.wikipedia.org/wiki/Snake_case

#### Declaration

Parameters are defined as instance-level variables of the class implementing your Rug. They are decorated with the `#!typescript @Parameter` [decorator][decorators] to declare their metadata. 

That parameter takes a list of properties among the followings:

```typescript
displayName: string
description: string
pattern: string
validInput: string
minLength: number = -1
maxLength: number = -1
required: boolean = false
```

!!! note
    Of the given properties, only the `#!typescript pattern` property is mandatory. 

The `#!typescript @Parameter` decorator must be imported into your Rug like this:

```typescript
import { Parameter } from "@atomist/rug/operations/Decorators";
```

A canonical parameter looks like this:

```typescript
@Parameter({
    displayName: "",
    description: "",
    pattern: "",
    validInput: "",
    minLength: 1,
    maxLength: 100,
    required: true|false
})
readme_path: string = "README.md";
```

#### Descriptions and Display Names

As Rug parameters are part of the public contract to the editor,
generator, reviewers, executor or predicate it is recommended that a
human-readable description and display name always be applied using
the `#!typescript description` and `#!typescript displayName` properties. The `#!typescript displayName` field value should be three words or less and use Title Case.

#### Validation

It is recommended that all parameters should be restricted using the
most explicit and constraining regular expression that is appropriate
for the corresponding parameter, through the `#!typescript pattern` property. In addition, you should provide a meaningful value for the `#!typescript validInput` field so, when people provide an invalid value, they are provided with a useful error message.

The value of the `#!typescript pattern` property must be an [anchored regular expression][anchoredregex]. 

!!! tip
    Atomist bundles a set of default anchored regular expression in the `#!typescript Pattern` object which can be imported as follows:

    ```typescript
    import { Pattern } from "@atomist/rug/operations/RugOperation";
    ```

#### Mandatory and Optional

If a parameter is not required on invocation, set
`#!typescript required` property to `#!typescript false`. In that case, it is recommended to supply a valid default value to the parameter variable so that there is some predictability of how the Rug will function if no parameter is supplied.


[decorators]: https://www.typescriptlang.org/docs/handbook/decorators.html
[interface]: https://www.typescriptlang.org/docs/handbook/interfaces.html
[module]: https://www.typescriptlang.org/docs/handbook/modules.html
[moduleres]: https://www.typescriptlang.org/docs/handbook/module-resolution.html
[anchoredregex]: http://www.regular-expressions.info/anchors.html
[tsconfig]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
[tslint]: https://github.com/palantir/tslint