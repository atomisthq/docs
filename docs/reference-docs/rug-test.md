# Rug Test
Rug provides a testing framework, based on [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) concepts. 

This takes the form of a test DSL that reuses features and types from Rug, to ensure it is easy for Rug authors to adopt.

## Structure of a Rug Test

## Quick Tour
Before a more systematic presentation of Rug Test, let's look at some samples.

Let's consider the following simple editor that will rename a Java file:

```
editor Rename
with java.class c when name = "Dog"
	do rename "Cat"
```
We want to test that it achieves a result:

```
scenario Dogs can be turned into cats

given
   src/main/java/Dog.java = "class Dog {}"

Rename old_class="Dog", new_class = "Cat"

then
  fileCount = 1
  and fileContains "src/main/java/Cat.java" "class Cat"
```
Note that scenario name can be free text till the end of the line with the `scenario` token, so long
as it doesn't contain `#`, which will cause the rest of the line to be discarded as a comment.

## Given
The given block specifies the input to the editor invocation in the form of multiple *file specs*. There are several choices for file specs:

|  File spec |  Sample | Meaning
|---|---|---|---|
| inline file | `dir/foo.txt = "bar"` | Populates the file | 
loaded file | `dir/foo.txt from "/some/path/file.txt"` | Load the file content from the archive.
| archive root | `ArchiveRoot` | With all the files in the archive this editor is in, excluding the content of the `.atomist` directory. This is useful and convenient when building templates, as it enables verification that the contents of the template are a valid starting point for the editor being tested. 
## Run block
Pass named args as in Rug itself.

## Assertions
Then `then` block consists of one or more assertions about the final state of the project.
### Well-Known Assertions
Certainly well-known assertions can be used alone. These are indicated in the following keywords:

* `NoChange`: The scenario passes if the editor does not change the input.
* `ShouldFail`: The scenario passes if the editor fails.
* `MissingParameters`: The scenario passes if the editor fails due to missing parameters. Used to test parameter validation.
* `InvalidParameters`: The scenario passes if the editor fails due to invalid parameters. Used to test parameter validation.

### Predicate Assertions
Most often, assertions are Rug predicates, chained with `and`. 

Unlike in Rug programs, using `and` does not create a single composed predicate, but chains separate predicates, allowing the test runtime to produce more informative error messages.

## Rug Test Grammar

```
<test> ::= <given> <run> <then>
  
<given> ::= <filespec> { <filespec> }

TODO FILESPEC

<run> ::= run <editorname> <namedargs>

<namedargs> :: = <namedarg> { namedarg }

<namedarg> :: <argname> = <argvalue>

<then> ::= <assertion> { <assertion> }

<assertion> ::= <function> <arg>

```
## Advanced Usage
### No Change
When there's no change

```
scenario Foobar

given
   "src/main/java/Squirrel" = "class Squirrel {}"

run
 Rename old_class="Dog", new_class = "Cat"

then
  NoChange
```
This scenario will pass only if there's no change in the input artifact source.
### Input Ranges
