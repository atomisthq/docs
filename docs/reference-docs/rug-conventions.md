## Rug Conventions

Rug is its own [Domain Specific Language (DSL)][dsl] that is currently
used to define
project [generators](rug-generators.md), [editors](rug-editors.md),
reviewers (coming soon), [predicates](rug-predicates.md), executors
and [tests](rug-tests.md). In addition the Rug runtime exposes these
concepts so that they can can be used in a fuller language, when the
Rug DSL is too constraining, such as [TypeScript][ts].

[dsl]: https://en.wikipedia.org/wiki/Domain-specific_language
[ts]: https://www.typescriptlang.org/

As with any language and environment there is a set of idioms and
common practices that will turn your Rug from `nice` to `great` (and
in some contexts from ***not working*** to
***working***). Collectively these are the _Rug Conventions_.

### Rug DSL and TypeScript Files

Rug files should have the `.rug` extension and be found in the
following locations within a _Rug Archive_.

```
.atomist/
  /editors
  /reviewers
  /executors
```

A _Rug Archive_ is simply any project that contains a conforming
`.atomist` directory and subdirectories.

In addition, BDD-style tests for your Rugs are strongly recommended
and should be located within a `.atomist/tests` directory and have the
`.rt` extension.

If you choose to write your editors, reviewers or executors using
TypeScript then they should have the standard TypeScript `.ts` file
extension.

You can safely intermix Rug DSL and TypeScript Rugs in the same
archive.

### Rug Naming

Rug editors, reviewers, executors and predicates in Rug DSL or
TypeScript should have their names formatted
using [UpperCamelCase][ucc].

[ucc]: http://wiki.c2.com/?UpperCamelCase

Following the rule of making implicit concepts explicit, the name of
your Rug should correspond to a complete and specific description of
the purpose of the Rug.

For example, `AddDocker` is a good name if the Rug adds Docker to
anything, but `AddDockerToMavenProjects` is better if the intention of
the Rug is to only work with projects that follow Maven conventions.

While a Rug `.rug` file can contain many different editors, reviewers,
executors and predicates the Rug runtime enforces that the first Rug
definition in a `.rug` file should match the name of the file
itself. Therefore Rug files should be formatted using UpperCamelCase
to match the name of the first Rug definition in the file.

Further Rugs within the same file are conventionally understood to be
in support of the main and initial Rug in the file.

#### Rug Generator Naming

To indicate that an editor is also a Rug `generator` in Rug DSL or
TypeScript it is conventional to name the editor with `New` at the
beginning of the editor's name to indicate that it is used to
construct a project from scratch.

In Rug DSL you can also specify a human-readable name for the
generator after the `@generator` annotation, for example:

```
@generator "NewSpringBootRestMicroservice"
```

While there is no restriction on the whitespace or other characters
that can be used within these generator names, it is also recommended
that these human-readable names should be UpperCamelCase and not
include spaces to simplify usage from the Rug CLI.

#### Rug Predicate Naming

Rug predicates in Rug DSL need to be in their own `.rug` file if they
are to be reused by other Rugs or even external Rug Archives and are
formatted according to the same UpperCamelCase rules as editors,
reviewers and executors.

In addition a Rug predicate should be named according to what it
includes. For example, `IsMavenProject` would be a good name for a
predicate that will ensure, if applied to an editor, that the
corresponding editor could only be applied if the target met the
conditions to be considered a Maven project.

### Rug Archives

Rug Archive configuration is stored in a file in the `.atomist`
directory.  Rug Archives that contain Rug DSL Rugs have their
configuration stored in `.atomist/manifest.yml`.  Rug Archives using
TypeScript store their configuration in `.atomist/package.json`.  If
your archive has both Rug DSL and TypeScript Rugs, you must use the
`package.json` format.

If using the Rug DSL `manifest.yml` then it should name Rug archives
according to the following rules:

*   `group`: The organisation behind this Rug Archive. Most commonly
    the GitHub organisation in which they reside.

*   `artifact`: Name of the Rug Archive (see next section)

*   `version`: [Semantic version][semver] of this Rug Archive

*   `requires`: Specify the exact, or bounded, version of the Rug
    language that your Rug Archive has been tested against.

If alternatively you are using the Rug TypeScript approach, then the
corresponding `package.json` in the `.atomist` directory should name
the Rug Archive according to the following rules:

*   `name`: Contains the org and name of the archive in the form
    `@<org>/<rug-archive-name>`

*   `version`: [Semantic version][semver] of this Rug Archive

*   `dependencies`: At a minimum specifies the version of the Rug
    language that your Rug Archive has been tested against in the form
    `{ "@atomist/rug": "<rug-version>" }`

[semver]: http://semver.org/

#### Rug Archive Naming

A Rug Archive name should be hyphenated and start with the technology
stack being targeted, such as `spring-boot`, followed by `-editors` if
this is a Rug Archive with a collection of useful editors, reviewers
or executors.

If the main purpose of a Rug Archive is to be a generator then ending
the name of the type of project it will generate would be most
appropriate.

For example if your Rug Archive's main purpose was to be a generator
for a Spring Boot Rest Service then `spring-boot-rest-service` or even
`java-spring-boot-rest-service` would be appropriate. If your Rug
Archive's main purpose was simply to generate a valid Maven project
then `maven-project` would be appropriate.


### Rug `tag` Annotations

Your Rugs should be annotated with a collection of `tag` annotations
to optimise their search-ability relevance. For example if you were to
create an editor that affected the `readme` `documentation` then the
following `tag` annotations would be applicable.

```
@tag "readme"
@tag "documentation"
```
or in TypeScript:

```
@tag("readme")
@tag("documentation")
class AddReadme implements ProjectEditor<ContentInfo> {
...
```

Please try to make sure at least one of the tags on your Rug maps to
an image.  The following tags currently have images: `docker`,
`github`, `travis-ci`, `apache`, `git`, `spring-boot`, `spring`,
`clojure`, `go`, `java`, `python`, `scala`, and `documentation`.

### Rug `description` Annotations

Rug editors, reviewers, predicates and executors can have an
accompanying `description` annotation such as:

```
@description "adds a project specific README"
```

or in TypeScript:

```
@description("adds a project specific README")
class AddReadme implements ProjectEditor<ContentInfo> {
...
```

A good description states exactly what the purpose of the Rug is
***without capitalisation on the sentence*** and ***without a closing
period***. The reason for avoiding sentence punctuation is that the
description is often used by the Atomist Bot and the grammar of its
usage is context-driven at that point.

Ideally the `description` should be as short as possible and limited
to one sentence.

### Parameters

Rug parameters are part of the public contract for invoking that
Rug. They should follow [snake_case][snake] rules and describe, as
explicitly as possible, what the parameter is to contain.

[snake]: https://en.wikipedia.org/wiki/Snake_case

#### The "mandatory" `project_name` parameter in Rug Generators

The `project_name` parameter is special when declared inside a
`generator` and so must be included otherwise your Rug will likely
fail to run.

It is recommended that you limit the `project_name` parameter to 21
characters in length as the new project name will often be used by
Atomist to construct a corresponding Slack channel and if the project
name is longer than 21 characters then some character-loss will occur.

#### Parameter Descriptions and Display Names

As Rug parameters are part of the public contract to the editor,
reviewers, executor or predicate it is recommended that a
human-readable description and Display Name always be applied using
the `@description` and `@displayName` annotations.

#### Parameter Validation using Regular expressions

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

```
with file when path = "README.md" begin
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
`do` actions within a `begin` and `end` block. It is conventional to
place the `begin` hanging on the end of the selecting statement and
then to indent the `do` statements before a closing `end` statement:

```
with pom p when path = "pom.xml" begin
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

```
with file f when path = "README.md"
  do replace "{{creation_date}}" { f.name() + " created on " + new Date().toISOString().split('T')[0] }
```

However if the selected type is not being used then the label should
be omitted as it will not be used, for example:

```
with file when path = "README.md"
  do replace "{{creation_date}}" { new Date().toISOString().split('T')[0] }
```

In the above example you can see that the `f` label for the selected
file is not required as it is never used.s

### Rug DSL: Comments

Comments should be used only when they add something that the Rug code
itself doesn't state. Self-documenting code is preferable over
separate documentation if the code can be better made to express what
would have been put in the documentation anyway.
