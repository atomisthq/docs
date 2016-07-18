## Authoring Editors and Reviewers with the Atomist DSL

Atomist provides an external DSL for authoring editors, codenamed **Rug**, in honor of the Dude. Rug ties things together.

## How Editors and Reviewers are Packaged

Editors are packaged in GitHub repos. All editors must be in or under the `/editors` directory in the root of the repo. Editors have access to template content in the same archive, packaged under `/templates`. 

Editor files must have a `.rug` extension. A `.rug` file can contain one or more editors and reviewers.

Any number of Rug editors can be bundled in a template, and this is often done in order to help users evolve generated projects.

## Underpinnings
Editors are built on the same underpinnings as ProjectEditor and ProjectGenerator support. They share familiar concepts:

* **Parameters**: Editors and reviewers can expose any number of parameters, specifying a validation pattern.
* **Templates**: Editors can be shipped in archives including templates.

## A Quick Tour of Rug
Rug is an English-like DSL, designed to make the definition of project operations concise and readable. 

White space is not significant. However we encourage sensible indentation.

Before we go into a more systematic presentation of Rug syntax, let's start by building up a simple program.

Here is a basic Rug program:

```
editor AppendToFile

with file f
 when name contains ".txt"
do
 append "\nAnd this is a new line"
```
This means *for each file in the project if name contains ".txt" append the given string to the end of the file.*

Let's make this a little more sophisticated. Perhaps we'd like to decide what content we should append. This would be a natural parameter:

```
editor AppendToFile

param to_append: .*

with file f
 when name contains ".txt"
do
 append to_append
```
Now we will append the value of the parameter to the end of the file.

It would be good to describe this editor so that users see information beyond its name. We can do this with the `description` annotation:

```
@description """Appends value of to_append parameter to
     the end of the file"""
editor AppendToFile

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
 prepend "// Ha ha! This is a sneaky comment\n"
```

Sometimes we need to compute additional values, like `x` below:

```
editor AppendToFile

param to_append: .*

x = "This is a value"

with file f
 when name contains ".txt"
do
 append to_append
 
with file f
 when name contains ".java"
do
 prepend "// Ha ha! This is a sneaky comment\n"
```

Such values will be exposed to templates as well as the rest of the Rug program itself.

We can compose predicates. In the following example, we `and` two tests on a file to narrow matching:

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

x = y

with file f
 when name contains ".txt" 
 begin
	do append to_append
	do append "And now for something completely different"
end
```

We can escape to JavaScript to compute the value of any expression, or perform a do manipulation. A JavaScript expression is enclosed in curly braces. The following example builds the string to be prepended using JavaScript. 

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


### Rug Samples
The best way to get started with Rug is to look at the ********

## Editor and Reviewer Composition
Editors can be composed. For example, executing the `Foo` editor in the following Rug script will result in `some` being replaced by `foo` and then by `bar`, as the `Foo` editor invokes the `Bar` editor.

```
editor Foo

uses Bar

with file f
do
  replaceAll "some" "foo"
run Foo


editor Bar

with file f
do replaceAll "foo" "bar"
```

## Syntax Guide
Now, for a more detailed tour of Rug syntax.

### Case conventions
Rug identifiers must follow case conventions. 

* Types
* Functions

#### Reserved words
The following are Rug reserved words:

|  Reserved word |  Purpose
|---|---|---|---|
| `editor`, `reviewer` | Identify program
`param` | Parameter declaration
`uses` | Identify imported editor or reviewer
`precondition` | 
`postcondition` |
`with`  |   |      |
|`do`   |   |   |
|   |   |   |

Other words are reserved but not yet used:

#### Rug Symbols
|  Symbol |  Purpose
|---|---|---|---|
| `@` | Prefixes an *annotation*. Annotations are used to describe program elements.
| `{}`  | Surrounds a JavaScript block. The JavaScript expression(s) in the block are evaluated, and the return value can be used as a function argument.
`=` | Equality test

### Annotations
*Annotations* are used to describe elements such as editors and reviewers. For example: 

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
|  Annotation |  Applies to | Meaning
|---|---|---|---|
| description | editor, reviewer or parameter | Describes the parameter
| optional | parameter | Whether the parameter is required. Default is required.



### Comments
Any content on a line after # is a comment. For example:

```
editor Foo

with file f # Do something with this file
do
   # This is not something we'd want to do in real life
   setContent "Something else"
```

## Reviewers
**Reviewers** are programs with similar structure to editors. However, they cannot make changes to projects, but report any problems they find.

Simple example:

```
reviewer NoEjbs

with JavaClass c
when imports "javax.ejb" 
do
majorProblem "This file uses EJB"
```
## Preconditions and Postconditions
Reviewers are often used as editor **preconditions**. 

**Postconditions** can be used to verify the result of editing. An editor that fails to meet its postcondition will not make any changes, but throw an error message.

## Core types

### Project
One of the key operations on a project is a template merge. Rug editors can access all template languages supported by Atomist. There are two methods:

```
/**
* Merge the given template to the given output path
* @param template template to merge, within Rug archive
* @param path path of merged file within output project
*/
def merge(template: String, path: String)
```

And

```
/**
* Merge templates from the specified directory in the backing /templates
* directory to the specified direction in the output project
*
* @param templatesPath path under /templates in backing Rug archive
* @param outputPath    path under root in output file
*/
def mergeTemplates(templatesPath: String, outputPath: String, 
```
### File
File operations are not language specific. Replacement

## Language-specific Types
Rug ships with support for Java and JavaScript out of the box.

## Escaping into JavaScript
Rug is intentionally limited, aiming for readability rather than power. However, it makes it easy to escape to JavaScript at any time to perform more complex tasks.

Any expression
inspired by Scala

Where a return value isn't required--for example, when a JavaScript block manipulates the currently scoped variable--the special `eval` function can be used.

<!--
## Extending Rug
If JavaScript is not enough
"kinds" (rename)

## Rug Grammar
tbd

-->