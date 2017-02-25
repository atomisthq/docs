## Rug Conventions & Best Practices

Rug *is* the Atomist API and is implemented in its own [Domain Specific Language (DSL)][dsl] as well as TypeScript variants. Rug is currently used to define
project [generators](generators.md), [editors](editors.md),
reviewers (coming soon), [predicates](predicates.md) and [tests](tests.md).
In addition, the Rug runtime exposes these concepts to JavaScript
(with first class support for [TypeScript][ts]) for those classes of problems
for which the DLS is too constraining.

[dsl]: https://en.wikipedia.org/wiki/Domain-specific_language
[ts]: https://www.typescriptlang.org/

As with any language and environment, there is a set of idioms and
common practices that will turn your Rug from `nice` to `great` (and
in some contexts from ***not working*** to
***working***). Collectively these are the _Rug Conventions_.

### Exemplar

The [atomist/travis-editors][travis-editors] Rug repository is
a good example repository.  We strive to keep that repository up to
date with these conventions.  It has good documentation and examples
of both a Rug DSL and TypeScript editors.  When going through the
conventions below, we encourage you to reference that repository for
concrete examples.

[travis-editors]: https://github.com/atomist-rugs/travis-editors

### Rug Projects

A _Rug project_ is simply any project that contains a conforming
`.atomist` directory and a `manifest.yml` description of the project. A minimal
 directory layout would only contain:

```
.atomist/
  manifest.yml
```

A fuller example directory layout for a larger collection of Rug artifacts would be:

```
.atomist/
  editors/
  handlers/
  reviewers/
  templates/
  tests/
  manifest.yml
```

The `manifest.yml` file should contain the following general information and formatting:

```yaml
group: atomist-rugs
artifact: travis-editors
version: "0.12.2"
requires: "[0.11.0,1.0.0)"
dependencies:
extensions:
```

There is a [Rug generator available](https://github.com/atomist-rugs/rug-archive) that will create a minimal Rug project for you.

### Rug Project Repositories

Rug project source code repositories should have a good `README.md`
containing the following information at minimum:

-   A general description of the intent of the Rugs in the project,
    i.e., what ties them all together, at the top of the README.
-   A section named **Rugs** that has a subsection for each Rug.
-   A section for each Rug in the project with
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

Public Rug repositories should be automatically built, tested
and deployed using [Travis CI][travis].  The Travis CI build status
badge and the Slack badge for the Atomist Community should be placed
in the `README.md` between the page title and the general description.
Here is the Markdown text to add the Slack badge:

```
[![Slack Status](https://join.atomist.com/badge.svg)](https://join.atomist.com)
```

[travis]: https://travis-ci.org/

Rug repositories should have a change log in
the [`CHANGELOG.md` format][changelog].

[changelog]: http://keepachangelog.com/

### Rug DSL and TypeScript Files

Rug files should have the `.rug` extension when written using the
DSL and the standard TypeScript `.ts` extension when written in
TypeScript.  You can safely intermix Rug DSL and TypeScript Rugs in
the same project.  Rug files should placed in the following locations
within a _Rug project_.  Rug editors and generators should be in
`.atomist/editors` and Rug reviewers should be in `.atomist/reviewers`.

BDD-style tests for your Rugs are strongly recommended and should be
located within a `.atomist/tests` directory and have the `.rt`
extension.

If your Rugs, typically editors, use any templates, they are placed in
the `.atomist/templates` directory.

### Rug Naming

Rug editors, generators, reviewers, predicates should have their names
formatted using [UpperCamelCase][ucc].

[ucc]: http://wiki.c2.com/?UpperCamelCase

Following the rule of making implicit concepts explicit, the name of
your Rug should correspond to a complete and specific description of
the purpose of the Rug.

For example, `AddDocker` is a good name if the Rug adds Docker to
anything, but `AddDockerToMavenProjects` is better if the intention of
the Rug is to only work with projects that follow Maven conventions.

While a Rug `.rug` file can contain many different editors,
generators, reviewers and predicates, the Rug runtime
enforces that the first Rug definition in a `.rug` file should match
the name of the file itself. Therefore Rug files should be formatted
using UpperCamelCase to match the name of the first Rug definition in
the file.

Further, Rugs within the same file are conventionally understood to be
in support of the main and initial Rug in the file.

#### Rug Predicate Naming

Rug predicates in Rug DSL need to be in their own `.rug` file if they
are to be reused by other Rugs or even external Rug projects and are
formatted according to the same UpperCamelCase rules as editors,
generators and reviewers.

In addition, a Rug predicate should be named according to what it
includes. For example, `IsMavenProject` would be a good name for a
predicate that will ensure, if applied to an editor, that the
corresponding editor could only be applied if the target met the
conditions to be considered a Maven project.

### Rug Project Configuration

Rug project configuration is stored in a file in the `.atomist`
directory.  Rug projects that contain Rug DSL Rugs have their
configuration stored in `.atomist/manifest.yml`.  Rug projects using
TypeScript should also include a `.atomist/package.json` describing
any dependencies

The Rug `.atomist/manifest.yml` should describe the Rug project
according to the following rules:

*   `group`: The organisation behind this Rug project. Most commonly
    the GitHub organisation in which they reside.

*   `artifact`: Name of the Rug archive (see next section)

*   `version`: [Semantic version][semver] of this Rug project

*   `requires`: Specify the exact, or bounded, version of the Rug
    language that your Rug project has been tested against.

If you are using the Rug TypeScript approach, then the corresponding
`package.json` in the `.atomist` is only used for dependencies and any other
metadata require by the TypeScript compiler. The Atomist typings are added as
follows:

*   `dependencies`: At a minimum specifies the version of the Rug
    typings module that your Rug project has been tested against in the form
    `{ "@atomist/rug": "<rug-version>" }`

*NOTE: Adding the typings above does _not_ control the version of Rug itself. The manifest.yml file does this*

[semver]: http://semver.org/

#### Rug Project Naming

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


### Rug DSL `tag` Annotations

Your Rugs should be annotated with a collection of `tag` annotations
to optimise their discoverability. For example if you were to
create an editor that affected the `readme` `documentation` then the
following `tag` annotations would be applicable.

```rug
@tag "readme"
@tag "documentation"
```

Tag values should consist of only lower case letters, numbers, and
dashes (`-`).

Please try to make sure at least one of the tags on your Rug maps to
an image.  The following tags currently have images: `docker`,
`github`, `travis-ci`, `apache`, `git`, `spring-boot`, `spring`,
`clojure`, `go`, `java`, `python`, `scala`, and `documentation`.

### Rug DSL `description` Annotations

Rug editors, generators, reviewers, predicates, and parameters can have an
accompanying `description` annotation such as:

```rug
@description "adds a project specific README"
```

A good description states exactly what the purpose of the Rug is
***without capitalisation on the sentence*** and ***without a closing
period***. The reason for avoiding sentence punctuation is that the
description is often used by the Atomist Bot and the grammar of its
usage is context-driven at that point.  Ideally the `description`
should be a sentence fragment and as short as possible.

### Parameters

Rug parameters are part of the public contract for invoking that
Rug. They should follow [snake_case][snake] rules and describe, as
explicitly as possible, what the parameter is to contain.

[snake]: https://en.wikipedia.org/wiki/Snake_case

#### The Mandatory `project_name` Parameter in Rug Generators

The `project_name` parameter is special when declared inside a
`generator` and so must be included otherwise your Rug will likely
fail to run.

It is recommended that you limit the `project_name` parameter to 21
characters in length as the new project name will often be used by
Atomist to construct a corresponding Slack channel and if the project
name is longer than 21 characters then some character-loss will occur.

#### Parameter Descriptions and Display Names

As Rug parameters are part of the public contract to the editor,
generator, reviewers, executor or predicate it is recommended that a
human-readable description and display name always be applied using
the `@description` and `@displayName` annotations.

See the [description annotation](#rug-description-annotations) section
above for information on the content of the parameter `@description`
annotation.  The `@displayName` annotation value should be three words
or less and use Title Case.

#### Parameter Validation

It is recommended that all parameters should be restricted using the
most explicit and constraining regular expression that is appropriate
for the corresponding parameter.  In addition, you should provide a
meaningful value for the `@validInput` parameter annotation so, when
people provide an invalid value, they are provided with a useful error
message.

#### Mandatory and Optional Parameters

If a parameter is optionally provided on invocation, using the
`@optional` annotation, then it is recommended to supply a valid
`@default` annotation also so that there is some predictability of how
the Rug will function if no parameter is supplied.

### TypeScript Decorators

There are TypeScript equivalents to the Rug DSL annotations described above, and
they follow the same conventions:

```TypeScript
...
@Editor("Simple", "My simple editor")
@Tags("simple", "decorators")
class SimpleEditor {
    @Parameter({description: "The name", pattern: "^.*$$"})
    name: string = "Not reserved"
...
```
The `@Editir` decorator labels the class as an `editor`, with `name` and `description`
as its two parameters respectively. `@Generator` and `@Reviewer` are the TypeScript
decorator equivalents of the `generator` and `reviewer` DSL keywords. The `@Tags` decorator takes a variable number of strings and `@Parameter` is used to declare parameters. TypeScript parameter declarations support the equivalent fields as Rug DSL and conform to the following
interface:

```TypeScript
interface Parameter {
  pattern: string
  required?: boolean
  description?: string
  displayName?: string
  validInput?: string
  displayable?: boolean
  maxLength?: number
  minLength?: number
  tags?: string[]
}
```
The name and default value of a parameter are taken from the code itself.

### Rug DSL: `let` Declarations

Rug DSL `let` declarations can be used to initialise some labels with
a corresponding value. It is recommended that these labels should be
formatted according
to [snake_case](https://en.wikipedia.org/wiki/Snake_case) rules
similarly to Rug parameters.

### Rug DSL: Avoiding `Begin` and `End` when there is only a Single `do` Action

If your `with` statement only has a single corresponding `do` action
then you should omit the `begin` and `end` block demarcations.

For example the following is legal but the `begin` and `end`
statements are not required:

```rug
with file when path = "README.md"
  begin
    do replace "{{creation_date}}" { new Date().toISOString().split('T')[0] }
  end
```

It is preferable to omit the `begin` and `end` statements entirely
when there is only a single associated `do` action:

```
with file when path = "README.md"
  do replace "{{creation_date}}" { new Date().toISOString().split('T')[0] }
```

### Rug DSL: Indenting Blocks with `Begin` and `End`

When multiple actions are being applied it is important to nest those
`do` actions within a `begin` and `end` block.  It is conventional to
place the `begin` indented two spaces on the next line and then to
indent the `do` statements two more spaces before a closing `end`
statement indented at the same level as the `begin`:

```rug
with pom p when path = "pom.xml"
  begin
    do setArtifactId  artifact_id
    do setGroupId group_id
    do setVersion version
    do setProjectName name
    do setDescription description
  end
```

### Rug DSL: Labelling Selections Only When They Are Used

Sometimes when selecting a particular Rug Type, such as `pom` or
`file`, it is important to expose what has been selected using a
label, such as `p`. For example:

```rug
with file f when path = "README.md"
  do replace "{{creation_date}}" { f.name() + " created on " + new Date().toISOString().split('T')[0] }
```

However if the selected type is not being used then the label should
be omitted as it will not be used, for example:

```rug
with file when path = "README.md"
  do replace "{{creation_date}}" { new Date().toISOString().split('T')[0] }
```

In the above example you can see that the `f` label for the selected
file is not required as it is never used.s

### Rug DSL: Comments

Comments should be used only when they add something that the Rug code
itself doesn't state.  Self-documenting code is preferable over
separate documentation if the code can be better made to express what
would have been put in the documentation anyway.
