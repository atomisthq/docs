## Authoring Editors and Reviewers with the Atomist DSL

Atomist provides an external DSL for authoring **project editors** and **project reviewers**, codenamed **Rug**, in honor of the Dude. Rug ties things together.

**Project editors** are named units of functionality that can be used to update one or more projects. The typical Atomist workflow is to create a project which contains static content as a starting point and a number of editors that can be used to create new projects from it and help users to evolve created projects.

**Project reviewers** are similar modules to project editors, but do not update projects, but report potential problems with them.

## Basic Concepts
Rug is a simple, English-like, DSL. It does not contain a full-blown set of control structures and this is not its purpose.

Rug exists to do these things well:

* **Iterate over files and AST nodes** in supported languages and enable easy modification. *Rug is designed to be extensible to allow further node types to be supported.*
* Use the same constructs to easily **extract values from files.**
* **Compose** operations to maximize reuse.
* **Declare parameters** to allow automated gathering of valid user input to drive operations.

## How Editors and Reviewers are Packaged

Editors are packaged in a fixed directory structure. Normally this is sourced from a GitHub. All editors must be in or under the `/.atomist/editors` directory the repo. Editors have access to template content in the same archive, packaged under `/.atomist/templates`.

>**Remember: All Atomist files should be under the `.atomist` directory in the root of a project.**

Editor files must have a `.rug` extension. A `.rug` file can contain one or more editors and reviewers. A `.rug` file must contain either:

* A single project operation with the same name as the project file, excluding the `.rug` extension. This corresponds to Java's enforcement of the packaging of public classes. *-or-*
* A single project operation with the same name as the project file, excluding the `.rug` extension, plus any number of other project operations that are used only by that project operation.

This convention is analogous to Java public class packaging.

Any number of Rug editors can be bundled in a repository.

## Generators from Editors
An editor annotated with the `@generator` annotation can be used as a **project generator**, acting on the content of the repo it is located in, excluding the `.atomist` directly. A single repo can contain multiple project generator editors.

Typically project generator editors do not contain logic of their own, but invoke a number of other editors. For example, here is a complete Spring Rest generator:

```
@tag "java"
@tag "spring"
@tag "spring-boot"
# @tags [ "java", "spring", ]
@description "Creates a new Spring Rest project"
@generator "Spring Rest"
editor NewSpringProject

# Pattern to replace in old class name.
old_class = "SpringRest"

# Root package of the old file
old_package = "com.atomist.springrest"

# Now we invoke generic editors that do the actual work
UpdateReadme
PomParameterizer
PackageMove
ClassRenamer

```
Note that it concludes by invoking four other editors. The parameters from these editors propagate to the calling context--typically an interaction with a user--except for `old_class` and `old_package` which are explicitly set.

This modular approach enables multiple project generator editors to share common functionality.

Project generator editors can also be used as regular editors and be invoked by other editors.

## Underpinnings
Rug editors are built on the same underpinnings as non-Rug editors. They share familiar concepts:

* **Parameters**: Editors and reviewers can expose any number of parameters, specifying a validation pattern.
* **Templates**: Editors can be packaged in archives including templates.

## A Quick Tour of Rug
Rug is an English-like DSL, designed to make the definition of project operations concise and readable.

White space is not significant. However we encourage sensible indentation.

Before we go into a more systematic presentation of Rug syntax, let's start by building up a simple program: a project editor that appends to a file:

```
editor AppendToFile

with file f
 when name contains ".txt"
do
 append "\nAnd this is a new line"
```
This means *for each file in the project if name contains ".txt" append the given string to the end of the file.* The code between `when` and `do` is a *predicate*, specifying which files to match.

Let's make this a little more sophisticated. Perhaps we'd like to decide what content we should append. This would be a natural parameter:

```
editor AppendToFile

param to_append: .*

with file f
 when name contains ".txt"
do
 append to_append
```
Now we will append the value of the parameter to the end of the file. Unlike our first, naive, editor, this editor can be used to modify files in ways determined by the caller. (Parameters are typically entered by a user, prompted by the Atomist bot or a web form.) Note that the parameter definition specifies a regular expression that will be used to validate it before it's passed to the editor. So the editor's implementation can assume that it's valid upon execution.

It would be good to describe this editor so that users see information beyond its name. We can do this with the `description` annotation. We can also describe the parameter:

```
@description """Appends value of to_append parameter to
     the end of files with a .txt extension"""
editor AppendToFile

@description "Text to append to the file"
param to_append: .*

with file f
 when name contains ".txt"
do
 append to_append
```
Note the use of a triple-quoted string here. As in Scala, triple-quoted strings may span lines and include double quotes without escaping.

We can add multiple `with` blocks. So we could process another type of file as follows:

```
editor AppendToFile

param to_append: .*

with file f
 when name contains ".txt"
do
 append to_append

with file f
 when name contains ".java"
do
 prepend "// Ha ha! This is a sneaky comment.\n"
```

Sometimes we need to compute additional values like `x` below:

```
editor AppendToFile

param to_append: .*

x = "This is a value"

with file f
 when name contains ".txt"
begin
 do prepend x
 do append to_append
end
```

Such computed values will be exposed to templates as well as the remainder of the Rug program itself.

We can compose predicates used with `with`. In the following example, we `and` two tests on a file to narrow matching:

```
editor AppendToFile

param to_append: .*

x = y

with file f
 when name contains ".txt" and under "/src/main/resources"
do
 append to_append
```

We can also perform multiple `do` steps as follows, enclosing them in a `begin/end` block:

```
editor AppendToFile

param to_append: .*

with file f
 when name contains ".txt"
 begin
	do append to_append
	do append "And now for something completely different"
end
```

We can escape to JavaScript to compute the value of any expression, or perform a do manipulation. A JavaScript expression is enclosed in curly braces. The following example builds the string to be appended using JavaScript:

```
editor AppendToFile

param to_append: .*

with file f
 when name contains ".txt"
do
 append { to_append + " plus this from JavaScript" }
```

We can also use JavaScript expressions in predicates, like this:

```
editor AppendToFile

with file f
 when name contains ".txt" and { 13 < 27 }
do
 append "42"
```

<!--
### Rug Samples
The best way to get started with Rug is to look at the ********
-->

## Editor and Reviewer Composition

Editors can be composed. For example, executing the `Foo` editor in the following Rug script will result in `some` being replaced by `foo` and then by `bar`, as the `Foo` editor invokes the `Bar` editor.

```
editor Foo

with file f
do
  replaceAll "some" "foo"
Bar

# ------
editor Bar

with file f
do replaceAll "foo" "bar"
```
In this case, `Foo` and `Bar` are in the same file, but they could be in separate files within the same archive. We could also refer to editors outside the current archive, depending on which project operations are loaded in the current context.

## Syntax Guide

Now, for a more detailed tour of Rug syntax.

### Case conventions

Rug identifiers must observe the following case conventions.

* *Type names*, such as editors and reviewer names: Same convention as for valid Java identifiers, except that they must begin with a capital letter.
* *Function names*, such as `append` in the earlier examples: Same convention as for valid Java identifiers, except that they must begin with a lower case letter.

#### Reserved words

Reserved words may not be used as identifiers. The following are Rug reserved words:

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

### Annotations

*Annotations* are used to describe the following program elements: editors, reviewers and parameters. For example:

```
@description "Takes EJBs and delivers a roundhouse kick to them"
editor RemoveEJB

@default 'This is a default value'
@description 'A magical parameter'
@validInput 'Valid input looks like this: Foo'
param name: .*

with file f
 when isJava and imports "javax.ejb"
do
 setContent "Now this won't compile, will it!"
```
The permitted values are consistent with parameter definitions used extensively in Atomist components.

|  Annotation |  Applies to | Meaning
|---|---|---|---|
| description | editor, reviewer or parameter | Describes the parameter
| optional | parameter | Whether the parameter is required. Default is required.
| validInput | parameter | Description of valid input, such as "A valid email address" or "3-10 alphanumeric characters"
| hide | parameter | Indicates that this parameter is only for use by programs and should not be displayed to users.

`@` Annotations are also used to look up pre-packaged variables that are supplied to your script for use when declaring editor parameter patterns, for example:

```
editor ClassRenamer

param old_class: @java_class
param new_class: @java_class
```

Currently pre-packaged variables that can be looked up in this manner for parameter pattern declarations specifically include the following:

| Identifier | Type |
|---|---|---|---|
| artifact_id | RegEx Pattern |
| group_id | RegEx Pattern |
| java_class | RegEx Pattern |
| java_package | RegEx Pattern |
| project_name | RegEx Pattern |
| port | RegEx Pattern |
| semantic_version | RegEx Pattern |
| url | RegEx Pattern |

### Comments

Any content on a line after `#` is a comment. For example:

```
editor Foo

with file f # Do something with this file
do
   # This is not something we'd want to do in real life
   setContent "Something else"
```
C style multi-line comments are supported:

```
/*
	This is a comment that goes on so long
	that we need line breaks.
*/
editor Sample ...
```

## Reviewers
**Reviewers** are programs with similar structure to editors. They also use parameters, computed values, `with` blocks with predicates and `do` blocks. However, they cannot make changes to projects, but report any problems they find.

A simple example:

```
reviewer NoEjbs

with JavaClass c
when imports "javax.ejb"
do
majorProblem "This file uses EJB"
```
## Preconditions and Postconditions
Reviewers are often used as editor **preconditions**.

**Postconditions** can be used to verify the result of editing. An editor that fails to meet its postcondition will not make any changes, but throw an error message. Thus including postconditions makes an editor more robust as well as self-documenting.

## Core Types
Consider the following line:

```
with file f
```
`file` here is not a function or a reserved word in Rug, but a **type**. Types are an important extension point of Rug, enabling it to expose a wide range of functionality in a native-seeming way. Types support a range of methods, which can be used in `with` predicates or `do` statements.

A number of types are shipped out of the box. The most important are:

* project
* file
* java.source, java.class/java.method
* docker

See reference documentation HERE

## Language-specific Types
Rug ships with support for Java out of the box, defining `class` and `method` types. For example, this editor adds an annotation to classes whose name contain a given pattern:

```
@description "Annotate dogs"
editor Annotator

param name_match: .*
param annotation_package: .*
param annotation: .*

with class c when { c.name().contains(name_match) }
do
  addAnnotation annotation_package annotation
```

## Custom Grammars with BNF

Out of the box Rug supports many different kinds of files, projects, languages and useful manipulations on those concepts. However there are always other cases where you might want to manipulate a custom file, or even programming language, that Rug does not (yet) support natively.

That's where the custom [BNF](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_Form) support in Rug comes in.

A simple example of using the custom grammar support would be:

```
editor Turn21

let ageGrammar = <
   name → \\w+
   age → \\d+
   expr ::= <name> was aged <age>
>

with file f when name = "$filename"
	with grammar(ageGrammar) g begin
   do set "age" "21"
   do set "name" { g.valueOf("name").toUpperCase() }
end
```

Here we've defined a custom grammar where can now easily edit the document according to the identified structure, rather than having to attempt to edit the document in a textual and potentially error prone way.

## Escaping into JavaScript

Rug is intentionally limited, aiming for readability rather than power. However, it makes it easy to escape to JavaScript at any time to perform more complex tasks. Currently there are two places where you can escape into JavaScript:

* JavaScript Expressions
* JavaScript Blocks

### Escaping into JavaScript Expressions

Anywhere an expression value is required, curly braces can be used to enclose a JavaScript statement or statements. As in Scala, the last statement in the expression will be used as the value of the expression. In the following example, the value of the JavaScript statement is passed to the `setContent` method on the `file` type.

```
with file f when name = "thing.txt"
do setContent { f.content() + "\nAppend stuff" }
```

Where a return value isn't required--for example, when a JavaScript block manipulates the currently scoped variable--the special `eval` function can be used, as follows:

```
with file f when name = "thing.txt"
do eval { f.setContent(f.content() + "\nAppend stuff") }
```
JavaScript expressions are also commonly used in predicates, like this:

```
with file f when { f.name().toLowerCase().contains("xyz") }
do eval { f.setContent(f.content() + "\nAppend stuff") }
```
A JavaScript expression block has a context that is automatically propagated by Rug. This includes:

* All parameters to the Rug script. These can be accessed by name or via the `params` map.
* All computed parameters.
* The current context object, which is accessed via the alias declared in the `with` statement (`f` in the example above.)
* The parent of the current context, accessible via the `parent` method on the context object.

JavaScript execution is performed using Java Nashorn, with the Rug runtime creating a synthetic function to enclose the block.

	All invocations on context objects must use
	parentheses or a reference error will occur.

In the case of multiple statements, a `return` statement should be used for the last expression:

```
do myFunction {
   var x = "y"
   var y = x
   return y;
}
```

Finally a JavaScript expression can be used to compute a Rug computed value, like this:


```
editor Test

param name: .*

lowerized = { name.toLowerCase() }

```

### Escaping into JavaScript Blocks

While Rug itself is usually an excellent choice for implementing your editors, reviewers and generators, you can write whole parts of your editors, reviewers and generators using JavaScript using a JavaScript block demarcated with `{}`:

```
editor Walter

param text: .*
param message: .*

{
var allFiles = project.files();

for (i = 0; i < allFiles.length; i++) {
    var currentFile = allFiles.get(i);
    if (currentFile.isJava()) {
        currentFile.append(identifiers.get("text").get());
    }
}
}
```

## Escaping into Clojure through Clojure Blocks

In addition to JavaScript, it is also possible to use Clojure for parts of your editors, reviewers and generators by implementing a Clojure Script block that is naturally demarcated with `()`. A Clojure Script block also requires a function to be defined that takes two parameters that are the `project` and additional `identifiers`:

```
editor Walter

param text: .*
param message: .*

((defn workOn [project, identifiers]
   (doseq [file (.files project)]
        (if (.isJava file)
            (.append file (.get (.get identifiers "text")))))))
```

## Extending Rug
Rug can be extended by via new **types**, which expose an element of the target project structure to convenient manipulation.

The `com.atomist.rug.spi` package provides interfaces to be extended to create user extensions.

To implement a type, you need to extend the `com.atomist.rug.spi.Type` trait to provide:

* the alias for your new type
* a method enabling Rug to find your new type from its parent element type
* Methods that can be invoked in Rug programs to conveniently obtain information and update an instance of your type
* code to update the parent context when your type has changed

Type instances are mutable. They should maintain a backing model, which knows how to write itself back out to a string or other permanent representation. For example, the Java type support uses `GitHubJavaParser` to parse Java source and write it back out, exposes the AST, and write it back out after changes.
>Well-behaved type instances will preserve comments and formatting from the input.

Type extensions are found from the classpath using Spring classpath scanning. To enable your own types to be found, place a custom `type-registrations.xml` on your classpath. The default scans for Atomist implementations of the `Type` trait, as follows:

```xml
<context:component-scan base-package="com.atomist.rug.kind">
        <context:include-filter type="assignable" expression="com.atomist.rug.spi.Type"/>
</context:component-scan>

```
You can modify the base package, and also define beans that can be injected into any type implementation using autowiring.
## Rug Grammar
tbd
