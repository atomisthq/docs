Below is information on writing Rug editors using the Rug DSL, which
is now deprecated.

## Rug DSL Editors (Deprecated)

Rug editors ***work at the level of a specific project***, for example
this is typically a particular ***repository on GitHub***.

Rug editors can be found in the `/.atomist/editors` directory of
a Rug project.

Editors also have access to template content in the same project,
packaged under `/.atomist/templates`.

>**NOTE: All Atomist files should be under the `.atomist` directory in the root of a project.**

Rug editor files must have a `.rug` extension.  A `.rug` file can
contain one or more editors and reviewers.  A `.rug` file must always contain
an editor with the same name as the source file (excluding the `.rug`
extension), and may contain additional editors that are visible only within
the scope of the source file.

For reference, this convention is analogous to Java public class
packaging.

Any number of Rug editors can be bundled together in a Rug project. A
good example of this is the open
source [Spring Boot Editors][boot-editors] Rug project.

[boot-editors]: https://github.com/atomist-rugs/spring-boot-editors

### Parameters and Templates

Rug editors are built on the same underpinnings as your usual non-Rug
editors. They share familiar concepts:

*   **Parameters**: Editors and reviewers can specify any number of
    mandatory or optional parameters with an accompanying validation
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

```
editor AppendToSpecificFile

with File f when name = "myfile.txt"
  do append "\nAnd this is a new line"
```

The `with` statement simply says *for each file in the project if name
is "myfile.txt" append the given string to the end of the file.* . The
`with` statement declared what we ***select*** and what type it is
expected to be. The Rug language extension in the example above is the
Rug [extension][] of File and this dictates what functions are exposed
what has been selected.

[extension]: /reference/rug/extensions.md

Let's make this a little more sophisticated. Perhaps we'd like to
decide what content we should append. This would be a natural
parameter:

```
editor AppendToFile

param to_append: ^.*$

with File f when name = "myfile.txt"
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

```
@description """Appends value of to_append parameter to
     the end of files called myfile.txt"""
editor AppendToFile

@description "Text to append to the file"
param to_append: ^.*$

with File f when name = "myfile.txt"
  do append to_append
```

Note the use of a triple-quoted string here. As in Scala,
triple-quoted strings may span lines and include double quotes without
escaping.

We can add multiple `with` blocks. So we could process another type of
file as follows:

```
editor AppendToFile

param to_append: ^.*$

with File f when name = "myfile.txt"
  do append to_append

with File f when name = "MyClass.java"
  do prepend "// Ha ha! This is a sneaky comment.\n"
```

Sometimes we need to compute additional values. We do this with the
`let` keyword as shown to populate the `x` value below:

```
editor AppendToFile

param to_append: ^.*$

let x = "This is a value"

with File f when name = "myfile.txt"
  begin
    do prepend x
    do append to_append
  end
```

Such computed values will be exposed to templates as well as the
remainder of the Rug program itself.

We can also perform multiple `do` steps as follows, enclosing them in
a `begin/end` block:

```
editor AppendToFile

param to_append: ^.*$

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

```
editor AppendToFile

param to_append: ^.*$

with File f when name = "myfile.txt"
  do append { to_append + " plus this from JavaScript" }
```

We can also use JavaScript expressions in predicates, like this:

```
editor AppendToFile

with File
  when name contains ".txt" and { 13 < 27 }
    do append "42"
```

### Editor Composition

Editors can be composed. For example, executing the `Foo` editor in
the following Rug script will result in `some` being replaced by `foo`
and then by `bar`, as the `Foo` editor invokes the `Bar` editor.

```
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
in separate files within the same project where we would use the `use`
statement to bring in the editor in a different file. We can also
refer to editors outside the current project by introducing a
dependency on the Rug project that those editors that we want to
import are located in to the `.atomist/manifest.yml` file.

When composing by calling an editor that accepts parameters, the
parameters are provided as a comma-separate list of
`param_name=param_value` tokens.

```
editor CallerEditor

CalledEditor first="some", second="thing"

editor CalledEditor

param first: ^.*$
param second: ^.*$

with File f
  begin
    do append first
    do append second
  end
```
