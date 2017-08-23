This document highlights the conventions of writing, testing and
publishing Rugs.  These are best-practices for a smoother experience
of writing, running, and using Rugs. The Rug toolchain will not, in
most cases, enforce any of those conventions.

## Rug project guidelines

Rug projects, i.e., projects containing Rugs in a `.atomist`
directory, should conform to the standard layout described on
[Rug project][project].

[project]: projects.md

### README

Rug projects ought to have a good `README.md` file, written using
the [Markdown][markdown] format, containing the following information:

-   A general description of the intent of the Rugs in the project,
    i.e., what ties them all together, at the top of the README.
-   A section named **Rugs** that has a subsection for each Rug that
    contains:
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

[markdown]: https://guides.github.com/features/mastering-markdown/

Public Rug repositories should be automatically built, tested and
deployed using a continuous integration service,
like [Travis CI][travis].  The CI build status badge should be placed
in the `README.md` between the page title and the general description.

[travis]: https://travis-ci.org/

### Change log

Rug repositories should have a change log in
the [`CHANGELOG.md` format][changelog].

[changelog]: http://keepachangelog.com/

### Project naming

A Rug project name should be hyphenated and start with the technology
stack being targeted, such as `spring-boot`, followed by what sort of
Rugs the project contains, e.g., `-editors` if this is a Rug project
with a collection of useful editors or reviewers.

If the main purpose of a Rug project is to be a generator, then ending
the name with the type of project it will generate would be most
appropriate.  For example if your Rug projects's main purpose was to be
a generator for a Spring Boot Rest Service then
`spring-boot-rest-service` or even `java-spring-boot-rest-service`
would be appropriate. If your Rug projects's main purpose was simply to
generate a valid Maven project then `maven-project` would be appropriate.

### Metadata

The Rug archive project metadata stored in the `.atomist/package.json`
file should conform to the following guidelines.

-   `name`: The name should be [scoped][scope] under the owner of the
    project's repository and the unqualified name should be the same
    as the repository name.  For example, for the GitHub repository
    `someone/something`, the name should be `@someone/something`.
-   `version`: The version should be a valid [Semantic version][semver].

[scope]: https://docs.npmjs.com/getting-started/scoped-packages (NPM Scopes)
[semver]: http://semver.org/ (Semantic Versioning)

<!-- Do we want to say something about appropriate version ranges to use for dependencies? -->

## Rugs

Rugs are defined by the source code under the various subdirectories
of the `.atomist` directory.

### Naming

Rugs should have their names formatted using [UpperCamelCase][ucc].
Following the rule of making implicit concepts explicit, the name of
your Rug should correspond to a complete and specific description of
the purpose of the Rug.  For example, `AddDocker` is a good name if
the Rug adds Docker to anything, but `AddDockerToMavenProjects` is
better if the intention of the Rug is to only work with projects that
follow Maven conventions.

[ucc]: http://wiki.c2.com/?UpperCamelCase

Rugs within the same file are conventionally understood to be
in support of the main and initial Rug in the file.

The name is set as the first argument of
the [TypeScript decorator][decorators] defining the Rug operation.
For instance, for an editor:

```typescript
@Editor("AddDockerToMavenProjects", "adds the docker files to a Maven project")
```

[decorators]: https://www.typescriptlang.org/docs/handbook/decorators.html

### Describing

A good Rug description states exactly what the purpose of the Rug is
*without capitalisation on the sentence* and *without a closing
period*.  The reason for avoiding sentence punctuation is that the
description is often used by the Atomist Bot and the grammar of its
usage is context-driven.  Ideally the description should be a sentence
fragment and as short as possible while still being uniquely
descriptive.

The description is set as the second argument of the [decorator][decorators]
defining the Rug operation. For instance, for an editor:

```typescript
@Editor("AddDockerToMavenProjects", "adds the docker files to a Maven project")
```

### Discoverability

{!decorators/tags.md!}

### Code style

We suggest you rely on a [TypeScript linter][tslint] and
[TypeScript format checker][tsfmt] to catch common pitfalls in your code and
keep it readable and well-formatted.

[tslint]: https://github.com/palantir/tslint
[tsfmt]: https://github.com/vvakame/typescript-formatter

### Parameters

Rug parameters should follow [TypeScript naming guidelines][ts-gl],
i.e., [lowerCamelCase][lowerCamelCase], and describe, as explicitly as
possible, what the parameter represents.

[ts-gl]: https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines
[lowerCamelCase]: https://en.wikipedia.org/wiki/Camel_case

Parameters are defined as instance variables of the class implementing
your Rug.  They are decorated with the `#!typescript @Parameter`
decorator to declare their metadata.  The `#!typescript @Parameter`
decorator takes a single argument, a JavaScript object with the
following properties:

```typescript
{
  displayName?: string
  description?: string
  pattern: string
  validInput?: string
  minLength?: number = -1
  maxLength?: number = -1
  required?: boolean = false
}
```

Only the `#!typescript pattern` property is required, but providing
good values for all properties is highly recommended.  If a property
has a default value, it is shown above to the right of the equal (`=`)
sign.

#### Description and display names

As Rug parameters are part of the public contract of Rugs it is
recommended that a human-readable description and display name always
be applied using the `#!typescript description` and `#!typescript
displayName` properties.  A good description and display name allows
the Atomist user interfaces to provide the user with the information
needed to provide proper values.  The `#!typescript displayName` field
value should be three words or less and use Title Case.

#### Validation

It is recommended that all parameters should be restricted using the
most explicit and constraining regular expression that is appropriate
for the corresponding parameter via the `#!typescript pattern`
property.  In addition, you should provide a meaningful value for the
`#!typescript validInput` field so, when people provide an invalid
value, they are provided with a useful error message.

The value of the `#!typescript pattern` property must be
an [anchored regular expression][anchoredregex], i.e., it must begin
with `^` and end with `$`.

[anchoredregex]: http://www.regular-expressions.info/anchors.html

!!! tip ""
    Atomist bundles a set of default anchored regular expression in the
    `#!typescript Pattern` object which can be imported as follows:

    ```typescript
    import { Pattern } from "@atomist/rug/operations/RugOperation";
    ```

#### Mandatory and optional

If a parameter is not required, i.e., the Rug can execute sensibly
without the user specifying it, set the `#!typescript required`
property to `#!typescript false`.  In that case, it is recommended to
supply a valid default value to the parameter variable so that there
is some predictability of how the Rug will function if no parameter is
supplied.
