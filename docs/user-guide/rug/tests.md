Rug provides a testing framework based
on [Behavior-Driven Development (BDD)][bdd] concepts.  This allows
rapid, in-memory testing of Rugs.

[bdd]: https://en.wikipedia.org/wiki/Behavior-driven_development (Behavior-Driven Development)

The framework is based on the well
known [Gherkin BDD DSL](https://cucumber.io/docs/reference) and
inspired by solutions built on it, such
as [cucumber-js](https://github.com/cucumber/cucumber-js).  All logic
is coded in TypeScript or JavaScript. If you are familiar with
Cucumber (versions of which exist for many languages), you should find
the Rug test framework particularly easy to learn; if not, it should
still be intuitive.

!!! note ""
    Rug is designed to support Test Driven Development using the BDD
    style, and we've seen the greatest productivity in its early use
    from those that create test scenarios and then follow the `red`
    &rarr; `green` &rarr; `refactor` approach.

## Quick overview

Before taking a deeper dive, let's look at an example.

Consider the following simple editor that will rename a Java file.

```typescript
import { EditProject } from '@atomist/rug/operations/ProjectEditor';
import { Editor } from '@atomist/rug/operations/Decorators';
import { Project } from '@atomist/rug/model/Core';
import { PathExpressionEngine } from '@atomist/rug/tree/PathExpression';
import { JavaClass } from '@atomist/rug/model/JavaClass';

@Editor("Renamer", "Renames Java class")
export class Renamer {

    edit(project: Project) {
    	let eng = project.context().pathExpressionEngine();
        eng.with<JavaClass>(project, "//JavaClass()[@name='Dog']", jc => {
        	jc.rename("Cat");
        });
    }
}
```

We want to test that the editor works as intended.  First, we write a
Gherkin `.feature` file that is an easily readable description of the
behaviors we expect.  We'll call it `Renaming.feature` and place it
under `.atomist/tests/project`.

```gherkin
Feature: Renaming a Java file
  We should be able to rename Java files.
  Specifically, we should be able to rename
  dog files into cat files.

  Scenario: Dogs can be turned into cats
    Given a file named src/main/java/Dog.java
    When edit with Renamer
    Then there should be one file
    Then the file is now src/main/java/Cat.java
```

Walking through this definition:

*   The syntax is standard Gherkin.  It is human-readable and contains
    a specification of the desired behavior, but not how that behavior
    is to be verified.
*   A Gherkin *feature* can contain one or more *scenarios*. You can
    include as many feature files in the `.atomist/tests/project`
    directory as you like.
*   Each scenario is typically broken down into three blocks of
    *given*, *when*, and *then* steps, following the BDD style.
    Typically there is a single *when* step--the execution of a Rug.
    There are often multiple *given* and *then* steps.  *Then* steps
    are assertions, and it is good practice to break them up for
    clarity, so failures are specific.

!!! danger ""
    The Rug Gherkin parser does not support the `And` keyword.  Just
    use the appropriate step keyword multiple times.

We now have a clear specification of the desired behavior.  How does
the test infrastructure know how to execute these steps?

As in *cucumber-js*, we delegate to JavaScript or TypeScript to
execute these steps.  In keeping with our general preference for
TypeScript, let's see the TypeScript steps corresponding to the above
feature:

```typescript
import { Project } from "@atomist/rug/model/Project";
import { Given, When, Then, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";

Given("a file named src/main/java/Dog.java", p => {
    p.addFile("src/main/java/Dog.java", "public class Dog {}");
});

When("edit with Renamer", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("Renamer");
    psworld.editWith(editor, {});
});

Then("there should be one file", p => {
    return p.totalFileCount() == 1;
});

Then("the file is now src/main/java/Cat.java", p => {
    return p.fileExists("src/main/java/Cat.java");
});
```

We start by importing Rug modules needed for testing, namely
`#!typescript Project`, the core test functions `#!typescript Given`,
`#!typescript When`, and `#!typescript Then`, and the testing module
`#!typescript ProjectScenarioWorld`, which provides the context in
which each scenario runs.

Step definitions are linked to the steps in the feature via strings,
such as `#!typescript "a file named src/main/java/Dog.java"`.  The
first argument for each type of step is a string that should match the
string after the same step type in the feature file.  The second
argument is a function, i.e., callback, that implements the step.
This step-implementing function takes two arguments.  The first
argument is a `#!typescript Project` object and the second optional
argument is a `#!typescript ScenarioWorld`.  You can see only the
`#!typescript When` step uses the optional second argument, so it is
the only one that declares it (see below for more details
on [worlds](#worlds)).  Step definitions may be provided in any
TypeScript or JavaScript file under `.atomist/tests/project`. They
will be loaded automatically by the test infrastructure.

Different scenarios and even different features may share step
definitions.  This is beneficial in the case of common steps, e.g.,
`#!gherkin Given an empty archive`, which can be shared across many
features and scenarios.

## Worlds

As mentioned briefly above, each scenario has a *world* in which it
exists that is available to all functions implementing steps.  A
*world* is an isolated context for each scenario execution that
allows:

-   The binding and retrieval of arbitrary objects
-   Additional context-specific operations provided in the world's
    implementation

When testing Rugs that deal with projects, e.g., generators and
editors, the world provided to the function implementing the step is a
`#!typescript ProjectScenarioWorld`.  A `#!typescript
ProjectScenarioWorld` extends `#!typescript ScenarioWorld`, adding
functions to find editors and generators, query the number of
modifications made, check if the parameters passed in were valid, see
if the executing a Rug succeeded, etc.

The scenario world is an optional second parameter in the function
that implements all steps.  For example, the declaration of the
`#!typescript Given` function looks like this:

```typescript
export function Given(s: string, f: (Project, ScenarioWorld?) => void);
```

## Setup

The `#!gherkin Given` step is used to set up a project and world for
testing.  Often the setup involves either using
a ["well-known step"](#well-known-steps) or a series of steps each
creating a file to populate the project for testing.  As an example,
consider the `#!gherkin Given` steps below.

```gherkin
Given a project POM
Given a Java source file
```

These steps would be implemented with the following TypeScript.

```typescript
import { Project } from "@atomist/rug/model/Project";
import { Given } from "@atomist/rug/test/project/Core";

Given("a project POM", (p: Project) => {
    p.addFile("pom.xml", `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>atomist</groupId>
    <artifactId>ruggery</artifactId>
    <version>0.1.0-SNAPSHOT</version>
</project>
`);
});

Given("a Java source file", (p: Project) => {
    p.addFile("src/main/java/Some.java", `public class Some {}`);
});
```

## Running Rugs

For each scenario there is typically one `#!gherkin When` step,
invoking a single Rug, although you can have multiple if you wish.
The typical approach in a `#!gherkin When` step is to use the
`#!typescript ProjectScenarioWorld` to look up the Rug you want to run
and run it.  A previous example shows how to look up an editor and run
it.  Here's an example of using a generator.

```typescript
import { Project } from "@atomist/rug/model/Project";
import { Given, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";

When("a generator is run", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let generator = psworld.generator("TypeScriptGenerator");
    psworld.generateWith(generator, "new-test-project", {});
});
```

The `#!typescript generateWith()` method on `#!typescript
ProjectScenarioWorld` takes three arguments.  The first is the
generator to run, which is the valued returned from the `#!typescript
ProjectScenarioWorld.generator()` method, which finds generators by
name.  The second argument is the name of the project to be created.
The third argument is a JSON representation of the generator
parameters.  In the above example, the generator requires no
parameters so an empty object is provided.

## Assertions

The `#!gherkin Then` steps consist of one or more assertions about the
final state of the project.  It is good practice for each step to be
fine-grained, i.e., contain only a single assertion, so that reports
are maximally informative about what succeeded and failed.  The code
of each failed assertion will be available in the test report provided
by the Rug CLI.

The callback provided as the second argument to the `#!typescript
Then` accepts the `#!typescript Project` and optional `#!typescript
ScenarioWorld` as arguments and returns a `#!typescript boolean`.
Often the assertions use the `#!typescript Project.fileExists()` and
`#!typescript Project.fileContains()` methods.  For example, a typical
assertion for a generator will assert that files will be created and
have the appropriate content.  The feature file might look like

```gherkin
Then the README exists
Then the README contains the project name
Then the class source file exists
Then the class source file contains the class name
```

and those steps would be implemented

```typescript
import { Project } from "@atomist/rug/model/Project";
import { Then } from "@atomist/rug/test/project/Core";

Then("the README exists", (p: Project) => {
    return p.fileExists("README.md");
});

Then("the README contains the project name", (p: Project) => {
    return p.fileContains("README.md", p.name());
});

Then("the class source file exists", (p: Project) => {
    return p.fileExists("src/main/java/Sugar.java");
});

Then("the class source file contains the class name", (p: Project) => {
    let className = "Sugar";
    return p.fileContains("src/main/java/Sugar.java", `class ${className}`);
});
```

## Rug parameters

If the Rug you are testing takes parameters, you pass them in as an
object whose property names are the parameter names.  For example,
with the `#!typescript ProjectWorld.editWith` function the parameter
object is passed as the second argument.  If the `AlpEditor` being
tested below takes a single parameter named `heir`, you would set its
value to `#!typescript "Paul"` like this:

```typescript
import { Project } from "@atomist/rug/model/Project";
import { When, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";

When("politics takes its course", (p, w) => {
    let world = w as ProjectScenarioWorld;
    world.editWith(world.editor("AlpEditor"), {heir: "Paul"});
})
```

## Well-known steps

A "well-known step" is a named step that the Rug testing framework
defines for you.  In other words, you can refer to the step in the
feature file but do not have to define it in the steps file.  The
well-known steps available for you are below.

Step Type | Name | Meaning
----------|------|--------
Given | an empty project | An empty project, useful for generators
Given | the archive root | The contents of the Rug archive providing the Rug being test
Then | changes were made | The editor made changes to the project
Then | no changes were made | The editor made no changes to the project
Then | parameters were valid | The parameters passed to the Rug were valid
Then | parameters were invalid | The parameters passed to the Rug were not valid
Then | it should fail | The Rug runtime was unable to complete executing the Rug

In the unlikely event you want to override a common step definition
provided by Atomist or yourself, you can define the same step in your
step definitions.  Your local definition will take precedence.

## Debugging Hints

Sometimes when testing, it is helpful to print out the contents of a
file to help you diagnose why a test is failing.  The Rug testing
framework provides a few helper functions to provide insight to what
changes were made.

To print the entire contents of a project in the test output, use the
`#!typescript Helpers.prettyListFiles` function as follows:

```typescript
import { Project } from "@atomist/rug/model/Project";
import { Then } from "@atomist/rug/test/project/Core";
import * as helpers from "@atomist/rug/test/Helpers"

Then("the README exists", (p: Project) => {
    helpers.prettyListFiles(p);
    return true;
});

```

To see the contents of a file in the test output, use the
`#!typescript Helpers.dump` function.

```typescript
import { Project } from "@atomist/rug/model/Project";
import { Then } from "@atomist/rug/test/project/Core";
import * as helpers from "@atomist/rug/test/Helpers"

Then("the README exists", (p: Project) => {
    helpers.dump(p, "src/main/java/Command.java);
    return true;
});

```

## Gaps

Rug Test does not yet support the full range of Gherkin functionality.
The following features are missing:

-   Doc strings
-   Data tables
-   Tags

These may be supported in a future version of Rug.

## Future Directions

-   The need for more than one source file for each feature is both a
    strength and weakness of Gherkin.  It's a strength because each
    file is in a single, logical, toolable language.  It's a weakness
    because of the level of ceremony required and because of the
    brittle linkage by a string value.  We intend to provide editors
    that helps with this, automatically creating feature files for
    editors, and TypeScript files implementing the steps in feature
    files.
-   In a future release, BDD testing support will be extended beyond
    project operations to event handlers.
