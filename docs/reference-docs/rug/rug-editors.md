## Rug Editors

Rug editors ***work at the level of a specific project***, for example
this is typically a particular ***repository on GitHub***.

Rug editors can be found in the `/.atomist/editors` directory of
a [Rug archive](/rug/rug-archive.md).

Editors also have access to template content in the same archive,
packaged under `/.atomist/templates`.

>**NOTE: All Atomist files should be under the `.atomist` directory in the root of a project.**

Rug editor files must have a `.rug` extension.  A `.rug` file can
contain one or more editors and reviewers.  A `.rug` file must contain
either:

*   A single editor with the same name as the project file, excluding
    the `.rug` extension. This corresponds to Java's enforcement of
    the packaging of public classes.
*or*
*   A single editor with the same name as the project file, excluding
    the `.rug` extension, plus any number of other editors that are
    used only by that editor.

For reference, this convention is analogous to Java public class
packaging.

Any number of Rug editors can be bundled together in
a [Rug archive](/rug/rug-archive.md). A good example of this is the
open source [Spring Boot Editors][boot-editors] Rug archive.

[boot-editors]: https://github.com/atomist-rugs/spring-boot-editors

### Parameters and Templates

Rug editors are built on the same underpinnings as your usual non-Rug
editors. They share familiar concepts:

*   **Parameters**: Editors and reviewers can specify (mandatory or
    optional) any number of parameters with an accompanying validation
    pattern.
*   **Templates**: Editors can be packaged in archives including
    templates that are written
    in [Velocity](https://velocity.apache.org/)
    or [Mustache](https://mustache.github.io/).

### A Quick Tour of Rug Editor Syntax

The Rug editor syntax can be summarised as a collection of
***Selectors*** and then ***Actions*** on what is selected.

White space is not significant. However we encourage sensible
indentation.

Before we go into a more systematic presentation of Rug syntax, let's
start by building up a simple program: a project editor that appends
to a file:

```rug
editor AppendToFile

with File f when name contains ".txt"
  do append "\nAnd this is a new line"
```

The `with` statement simply says *for each file in the project if name
contains ".txt" append the given string to the end of the file.* . The
`with` statement declared what we ***select*** and what type it is
expected to be. The Rug language extension in the example above is
the [Core Rug Language Extension](extensions/index.md)
of [File](extensions/rug-core-types-file.md) and this dictates what
functions are exposed what has been selected.

The code between `when` and `do` is
a [Rug Predicate](rug-predicates.md), specifying which files to match.

Let's make this a little more sophisticated. Perhaps we'd like to
decide what content we should append. This would be a natural
parameter:

```rug
editor AppendToFile

param to_append: .*

with File f when name contains ".txt"
  do append to_append
```

Now we will append the value of the parameter to the end of the
file. Unlike our first, naive, editor, this editor can be used to
modify files in ways determined by the caller.

> ***Note:*** The parameter definition specifies a regular expression
> that will be used to validate it before it's passed to the
> editor. So the editor's implementation can assume that it's valid
> upon execution.

It would be good to describe this editor so that users see information
beyond its name. We can do this with the `description` annotation. We
can also describe the parameter:

```rug
@description """Appends value of to_append parameter to
     the end of files with a .txt extension"""
editor AppendToFile

@description "Text to append to the file"
param to_append: .*

with File f when name contains ".txt"
  do append to_append
```

Note the use of a triple-quoted string here. As in Scala,
triple-quoted strings may span lines and include double quotes without
escaping.

We can add multiple `with` blocks. So we could process another type of
file as follows:

```rug
editor AppendToFile

param to_append: .*

with File f when name contains ".txt"
  do append to_append

with File f when name contains ".java"
  do prepend "// Ha ha! This is a sneaky comment.\n"
```

Sometimes we need to compute additional values. We do this with the
`let` keyword as shown to populate the `x` value below:

```rug
editor AppendToFile

param to_append: .*

let x = "This is a value"

with File f when name contains ".txt"
  begin
    do prepend x
    do append to_append
  end
```

Such computed values will be exposed to templates as well as the
remainder of the Rug program itself.

We can compose [predicates](rug-predicates.md) used with `with`. In
the following example, we `and` two tests on a file to narrow
matching:

```rug
editor AppendToFile

param to_append: .*

with File f
  when name contains ".txt" and under "/src/main/resources"
  do append to_append
```

We can also perform multiple `do` steps as follows, enclosing them in
a `begin/end` block:

```rug
editor AppendToFile

param to_append: .*

with File f when name contains ".txt"
  begin
    do append to_append
    do append "And now for something completely different"
  end
```

We can escape to JavaScript to compute the value of any expression, or
perform a do manipulation. A JavaScript expression is enclosed in
curly braces. The following example builds the string to be appended
using JavaScript:

```rug
editor AppendToFile

param to_append: .*

with File f when name contains ".txt"
  do append { to_append + " plus this from JavaScript" }
```

We can also use JavaScript expressions in predicates, like this:

```rug
editor AppendToFile

with File f
  when name contains ".txt" and { 13 < 27 }
  do append "42"
```

### Editor Composition

Editors can be composed. For example, executing the `Foo` editor in
the following Rug script will result in `some` being replaced by `foo`
and then by `bar`, as the `Foo` editor invokes the `Bar` editor.

```rug
editor Foo

with File f
  do replaceAll "some" "foo"
Bar

# ------
editor Bar

with File f
  do replaceAll "foo" "bar"
```

In this case, `Foo` and `Bar` are in the same file, but they could be
in separate files within the same archive where we would use the `use`
statement to bring in the editor in a different file. We can also
refer to editors outside the current archive by introducing a
dependency on the [Rug archive](/rug/rug-archive.md) that those
editors that we want to import are located in to the
`.atomist/manifest.yml` file.

When composing by calling an editor that accepts parameters, the
parameters are provided as a comma-separate list of
`param_name=param_value` tokens.

```rug
editor CallerEditor

CalledEditor first="some", second="thing"

editor CalledEditor

param first: .*
param second: .*

with File f
  begin
    do append first
    do append second
  end
```

### Syntax Guide

Now for a more detailed tour of Rug syntax...

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
param name: .*

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

### Next

*   [Rug Generators](rug-generators.md)
*   [Rug Templates](rug-templates.md)
*   [Escaping Rug into JavaScript](escape/rug-javascript.md)
*   [Core Rug Language Extensions](extensions/index.md)
