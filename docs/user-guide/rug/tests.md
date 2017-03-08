Rug provides a testing framework based on [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) concepts. This allows rapid, in-memory testing of Rug generators, reviewers and editors.

The framework is based on the well known [Gherkin BDD DSL](https://cucumber.io/docs/reference) and inspired by solutions built on it, such as [cucumber-js](https://github.com/cucumber/cucumber-js). All logic is coded in TypeScript or JavaScript. If you are familiar with Cucumber (versions of which exist for many languages), you should find the Rug test framework particularly easy to learn; if not, it should still be intuitive.

!!! note ""
    Rug is designed to support Test Driven Development using the BDD style, and we've seen the greatest productivity in its early use from those that create test scenarios and then follow the `red` -> `green` -> `refactor` approach.

### A Quick Overview of a Rug Test

Before taking a deeper dive, let's look at an example.

Consider the following simple editor that will rename a Java file (imports omitted):

```typescript
@Editor("Renamer", "Renames Java class")
export class Renamer {

    edit(project: Project) {
    	let eng = project.context().pathExpressionEngine();
        eng.with<JavaClass>(project, "//JavaClass()[@name='Dog']", jc => {
        	jc.rename("Cat");
    });
}
```

We want to test that the editor works as intended. First, we write a Gherkin `.feature` file that is an easily readable description of the behaviors we expect. We'll call it `Renaming.feature` and place it under `.atomist/tests`. 

```gherkin
Feature: Renaming a Java file
 Three lines of indented content
 to describe the meaning of this feature,
 followed by one or more Scenario definitions.
 
Scenario: Dogs can be turned into cats
 Given a file named src/main/java/Dog.java 
 When edit with Renamer
 Then there should be one file
 Then the file is now src/main/java/Cat.java
```

Walking through this definition:

* The syntax is standard Gherkin. It is human-readable and contains a specification of the desired behavior, but not how that behavior is to be verified. 
* A Gherkin **feature** can contain one or more **scenarios**. You can include as many feature files in the `.atomist/tests` directory as you like.
* Each **scenario** is typically broken down into three blocks of `given`, `when`, `then`, following the BDD style. Each of these is called a **step**. Typically there is a single `when` step--the execution of an editor. There are often multiple `given` and `then` steps. `then` steps are assertions, and it is good practice to break them up for clarity, so failures are specific.

We now have a clear specification of the desired behavior. How does the test infrastructure know how to execute these steps?

As in *cucumber-js*, we delegate to JavaScript or TypeScript to execute these steps. In keeping with our general preference for TypeScript, let's see the TypeScript steps corresponding to the above feature:

```typescript
import { Project } from "@atomist/rug/model/Core";
import { ProjectEditor } from "@atomist/rug/operations/ProjectEditor";
import { Given, When, Then, Result } from "@atomist/rug/test/Core";

Given("a file named src/main/java/Dog.java", p => {
  p.addFile("src/main/java/Dog.java", "public class Dog {}");
});
When("edit with Renamer", p => {
  p.editWith("Renamer");
});
Then("there should be one file", p => {
	  p.totalFileCount() == 1;
});
Then("the file is now src/main/java/Cat.java", p => {
    p.fileExists("src/main/java/Cat.java");
});

```
All steps are expressed in terms of the `Project` type. 

We start by importing `#!typescript Project`, and the core test module and its exported `#!typescript Given`, `#!typescript When` and `#!typescript Then` functions.

Step definitions are linked to the steps in the feature via strings, such as `#!typescript "a file named src/main/java/Dog.java"`.

Step definitions may be provided in any TypeScript or JavaScript file under `.atomist/tests`. They will be loaded automatically by the test infrastructure.

Different scenarios and even different features may share step definitions. This is particularly beneficial in the case of common definitions such as Given "an empty archive," which can be shared for all users, across an organization or team or across an archive. We'll look at those Atomist provides later in this document.

### `#!typescript When`: Running operations

Typically there is one `when` step, invoking a single editor or reviewer is invoked. We'll explain how to do this once we've covered the important **world** concept.

### `#!typescript Then` Assertions

The `#!typescript then` block then consists of one or more assertions about the final state of the project. It is good practice for these to be fine-grained so that reports are maximally informative about what succeeded and failed. The code of each failed assertion will be available in the test report.

### Worlds
Each scenario has a "world" associated with it, avaiable to all steps. A world is an isolated context for each scenario execution, which allows:

- The binding and retrieval of arbitrary objects
- Additional context-specific operations provided in the world's implementation

Currently `rug` supports only BDD-based tests for generators, editors and reviewers. These use the `#!typescript ProjectWorld` type, defined in `Core.ts`. `#!typescript ProjectWorld` allows `#!typescript then` blocks to query the number of modifications made, whether or not edit attempts succeeded, and the number of editors run.

The scenario world is an optional second parameter in all step definitions. For example:

```typescript
export function Given(s: string, f: (Project, ScenarioWorld?) => void);
```

While our examples have used only the project, the world can be used as follows:

```typescript
Then("I'm happy with both project and world", (p, world) => {
		// Assertion that may reference the world
});
```
### Validating Parameters Passed to Operations
To pass parameters to operations and have them validated, use the `ProjectWorld.editWith` function:

```
When("politics takes its course", (p, w) => {
  let world = w as ProjectScenarioWorld
  world.editWith(world.editor("AlpEditor"), {heir: "Paul"})
})
```
Parameters are provided in a map (or object).

In future versions of Rug Test, validation may be possible via instantiating an operation and injecting its properties before invoking its `edit` or equivalent method. You can do this already if you don't care about validation (because you know the injected properties are valid), and if the operation uses `@Parameter` injected properties. In this style, the above example would look like this:

```
When("politics takes its course", (p, w) => {
  let e = new AlpEditor()
  e.heir = "Paul"
  e.edit()
})
```
For this to work, the `AlpEditor` would need to have been imported like any other TypeScript class.

### Well-Known Steps

Certain well-known steps--most notably, `then` statements--can be used in features without the need to define. A full list can be found in `@atomist/rug/test/WellKnownSteps.ts`. You can use these as a guide to defining your own well-known assertions and steps. The following excerpt from `WellKnownSteps.ts` includes the most important, and shows how easy such steps are to implement:

```
Given("an empty project", p => {
    // Nothing to do
})

Then("changes were made", (p, world) => {
    return world.modificationsMade()
})

Then("no changes were made", (p, world) => {
    return !world.modificationsMade()
})

Then("parameters were invalid", 
    (p, world) => world.invalidParameters() != null)
```
Gherkin usage of these steps would be as follows:

```gherkin
Scenario: Some scenario
 Given an empty project
 ... 
 Then changes were made
```

>**Note**: If you want your own common steps to be automatically registered, put them in a module and import it, or import a JavaScript file containing them directly. This is necessary as your code does not directly reference them.

In the unlikely event you want to override a common step definition  provided by Atomist or yourself, you can define the same step in your step definitions. Your local definition will take precedence. 

### Debugging Hints

To see the contents of a file in the output, simply get hold of the file in the project and use `console.log`. For example:

```typescript
Then("the file has the right stuff", p => {
	let filename = "my/path/to/File.txt";
	let f = p.findFile(filename);
	if (f) {
		console.log(`Contents of ${filename} are \n${f.content()}\n`);
		return f.content().indexOf("stuff i care about") > -1;
	}
	else {
		console.log(`${filename} not found in archive`);
		return false;
	}
});
```

To dump the entire archive at any point, use the `#!typescript Helpers` module as follows:

```typescript
import * as helpers from "@atomist/rug/test/Helpers"
...
helpers.prettyListFiles(project)
```

To dump the tree in a particular file:

TODO

### Gaps
Rug Test does not yet support the full range of Gherkin functionality. The following features are missing: 

- Doc strings
- Data tables
- Tags

These may be supported in a future version of `rug`.

### Future Directions

- The need for more than one source file for each feature is both a strength and weakness of Gherkin. It's a strength because each file is in a single, logical, toolable language; it's a weakness because of the level of ceremony required and because of the brittle linkage by a string value. We intend to provide editors that helps with this, automatically creating feature files for editors, and TypeScript files implementing the steps in feature files.
- In a future release, BDD testing support will be extended beyond project operations to event handlers.



