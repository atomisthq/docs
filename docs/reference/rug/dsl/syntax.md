!!! caution "The Rug DSL is deprecated"
    The primary supported language for developing Rugs is now TypeScript.

Below is a detailed tour of Rug syntax.

#### Case conventions

Rug identifiers must observe the following case conventions.

*   *Type names*, such as editors and reviewer names: Same convention
    as for valid Java identifiers, except that they must begin with a
    capital letter.
*   *Function names*, such as `append` in the earlier examples: Same
    convention as for valid Java identifiers, except that they must
    begin with a lower case letter.

#### Reserved words

Reserved words may not be used as identifiers. The following are Rug
reserved words:

|  Reserved word |  Purpose
|---|---|---|---|
| `editor`, `reviewer` | Identify program
`param` | Parameter declaration
`uses` | Identify imported editor or reviewer
`precondition` | Predicate that should hold for the editor be applicable or run
`postcondition` | Predicate that should hold after the editor has run. Including this makes an editor more robust, as it will fail rather than make any updates if the postcondition does not hold.
`with`  |  Specifies a with block |      |
|`do`   |   Begins an action within a with block|
| `run` | Specifies an action within a with block that executes another project operation.
| `begin` - `end`  | Group a sequence of actions within a with block. Actions can include `do`, a nested `with` block, or `run`. Each action will see the context in the state it was left in by the last action.

#### Rug Symbols

|  Symbol |  Purpose
|---|---|---|---|
| `@` | Prefixes an *annotation* or a pre-packaged Rug variable lookup when using on declared parameters. Annotations are used to describe program elements.
| `{}`  | Surrounds a JavaScript block. The JavaScript expression(s) in the block are evaluated, and the return value can be used as a function argument.
`=` | Equality test

#### String Literals

Rug supports three types of string literals:

| String type | Notes | Examples
|---|---|---
| Double quoted | As supported in Java, including escaping via `\` | `"Donny" "Walter\n" "Jeff Bridges is the \"Dude\""`
| Single quoted | As in Python or JavaScript. However, does not support escaping | `'This is a test'`
| Triple quoted | Can span linebreaks, as in Python or Scala. Unlike in Python, only double quotes are allowed | `"""This content could span many lines"""`

#### Annotations

*Annotations* are used to describe the following program elements:
editors, reviewers and parameters. For example:

```rug
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

```rug
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

#### Comments in Rug

Any content on a line after `#` is a comment. For example:

```rug
editor Foo

with File f # Do something with this file
  do
    # This is not something we'd want to do in real life
    setContent "Something else"
```

C style multi-line comments are supported:

```rug
/*
	This is a comment that goes on so long
	that we need line breaks.
*/
editor Sample ...
```
