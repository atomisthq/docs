Development stuff

## Parameters

#### Annotations

*Annotations* are used to describe the following program elements:
editors, reviewers and parameters. For example:

```
@description "Takes EJBs and delivers a roundhouse kick to them"
editor RemoveEJB

@default 'This is a default value'
@description 'A magical parameter'
@validInput 'Valid input looks like this: Foo'
param name: ^.*$

with File f when isJava and imports "javax.ejb"
  do setContent "Now this won't compile, will it!"
```

The permitted values are consistent with parameter definitions used
extensively in Atomist components.

|  Annotation |  Applies to | Argument Type | Meaning |
|---|---|---|---|
| `@description` | editor, reviewer or parameter | String | Describes the parameter
| `@optional` | parameter | None | Whether the parameter is required. Default is required.
| `@default` | parameter | String | Default value for parameter.
| `@validInput` | parameter | String | Description of valid input, such as "A valid email address" or "3-10 alphanumeric characters"
| `@hide` | parameter | None | Indicates that this parameter is only for use by programs and should not be displayed to users.
| `@displayName` | parameter | String | UI friendly name for parameter.
| `@maxLength` | parameter | Integer | Maximum length of a parameter's string value.
| `@minLength` | parameter | Integer | Minimum length of a parameter's string value.

String arguments to annotations, like other strings in Rug, are either
double-quoted strings or triple double-quoted strings.  Triple
double-quoted strings can include special characters like newlines.

`@` Annotations are also used to look up pre-packaged variables that
are supplied to your script for use when declaring editor parameter
patterns, for example:

```
editor ClassRenamer

param old_class: @java_class
param new_class: @java_class
```

Currently pre-packaged variables that can be looked up in this manner
for parameter pattern declarations specifically include the following:

| Annotation | Type | Description |
|---|---|---|
| `@artifact_id`      | Regular Expression | Maven artifact identifier
| `@group_name`       | Regular Expression | Maven group name
| `@java_class`       | Regular Expression | Java class name
| `@java_identifier`  | Regular Expression | Java identifier
| `@java_package`     | Regular Expression | Java package name
| `@project_name`     | Regular Expression | GitHub repository name
| `@port`             | Regular Expression | IP port
| `@ruby_class`       | Regular Expression | Ruby class name
| `@ruby_identifier`  | Regular Expression | Ruby identifier
| `@semantic_version` | Regular Expression | [Semantic version][semver]
| `@url`              | Regular Expression | URL
| `@uuid`             | Regular Expression | UUID

[semver]: http://semver.org

## Develop Generators

### A Rug Generator is a Rug project

As said previously, generators are actual running projects with the addition of
the `.atomist` directory. Once that directory is added, we call those projects
Rug Generator projects.

There are two paths to bootstrap a generator. Either you have an existing
template project your team usually clones and manually updates or you want to
start from scratch.

#### Convert your template project into a Rug generator project

If you have an existing template project, you can convert it to a Rug
generator using a few editors in [Rug editors][rugeditors].

First, turn your project into a Rug project:

```console
$ cd ~/workspace/your/template/project
$ rug edit atomist-rugs:rug-editors:ConvertExistingProjectToRugArchive \
    archive_name=my-new-generator \
    group_id=my-rugs \
    version=0.13.0
```

Next, make it support TypeScript, which is the language used to develop Rugs:

```console
$ rug edit atomist-rugs:rug-editors:AddTypeScript
```

Finally, add a generator stub:

```console
$ rug edit atomist-rugs:rug-editors:AddTypeScriptGenerator \
    generator_name=MyNewGenerator \
    description="This is my newest generator."
```

#### Create a generator from scratch

You can start a new Rug generator project from nothing using the
[rug-project][rugproj] Rug editors. For instance:

```console
$ cd ~/workspace
$ rug generate atomist-rugs:rug-archive:NewStarterRugProject my-new-generator
```

This will provide you with a sane default to start from. Add now your own
project content and start editing the default generator.
