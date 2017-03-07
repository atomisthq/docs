Rug provides a testing framework based on [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) concepts. This allows rapid, in-memory testing of Rug generators, reviewers and editors.

The framework is based on the well-known [Gherkin BDD DSL](https://cucumber.io/docs/reference) and inspired by solutions built on it, such as [cucumber-js](https://github.com/cucumber/cucumber-js). All logic is coded in TypeScript or JavaScript. If you are familiar with Cucumber (versions of which exist for many languages), you should find the Rug test framework particularly easy to learn; if not, it should still be intuitive.

!!! note ""
    Rug is designed to support Test Driven Development using the BDD style, and we've seen the greatest productivity in its early use from those that create test scenarios and then follow the `red` -> `green` -> `refactor` approach.

### A Quick Overview of a Rug Test

Before taking a deeper dive, let's look at an example.

Consider the following simple editor that will rename a Java file (imports omitted):

```
@Editor("Renamer", "Renames Java class")
export class Renamer {

    edit(project: Project) {
    	let eng = project.context().pathExpressionEngine()
        eng.with<JavaClass>(project, "//JavaClass()[@name='Dog']", jc => {
        	jc.rename("Cat")
    })
}
```

We want to test that the editor works as intended. First, we write a Gherkin `.feature` file that is an easily readable description of the behaviors we expect. We'll call it `Renaming.feature` and place it under `.atomist/test`. 

```
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
* A Gherkin **feature** can contain one or more **scenarios**. You can include as many feature files in the `.atomist/test` directory as you like.
* Each **scenario** is typically broken down into three blocks of `given`, `when`, `then`, following the BDD style. Each of these is called a **step**. Typically there is a single `when` step--the execution of an editor. There are often multiple `given` and `then` steps. `then` steps are assertions, and it is good practice to break them up for clarity, so failures are specific.

We now have a clear specification of the desired behavior. How does the test infrastructure know how to execute these steps?

As in *cucumber-js*, we delegate to JavaScript or TypeScript to execute these steps. In keeping with our general preference for TypeScript, let's see the TypeScript steps corresponding to the above feature:

```
import {Project} from "@atomist/rug/model/Core"
import {ProjectEditor} from "@atomist/rug/operations/ProjectEditor"
import {Given,When,Then,Result} from "@atomist/rug/test/Core"

Given("a file named src/main/java/Dog.java", p => {
 p.addFile("src/main/java/Dog.java", "public class Dog {}")
})
When("edit with Renamer", p => {
 p.editWith("Renamer")
})
Then("there should be one file", p => 
	p.totalFileCount() == 1)
Then("the file is now src/main/java/Cat.java", 
	p => p.fileExists("src/main/java/Cat.java"))

```
All steps are expressed in terms of the `Project` type. 

We start by importing `Project`, and the core test module and its exported `Given`, `When` and `Then` functions.

Step definitions are linked to the steps in the feature via strings, such as `"a file named src/main/java/Dog.java"`.

Step definitions may be provided in any TypeScript or JavaScript file under `.atomist/test`. They will be loaded automatically by the test infrastructure.

Different scenarios and even different features may share step definitions. This is particularly beneficial in the case of common definitions such as Given "an empty archive," which can be shared for all users, across an organization or team or across an archive.

### Given Steps

TODO archive root

### `When` You Run Your tests

Typically this is where the actual editor itself is invoked.

### `Then` Assertions

The `then` block then consists of one or more assertions about the final state of the project. It is good practice for these to be fine-grained so that reports are maximally informative about what succeeded and failed. The code of each failed assertion will be available in the test report.

#### Some `Well-Known` Assertions

Certain well-known assertions can be used alone. These are indicated in the following keywords:

TODO NEED TO MIGRATE THE FOLLOWING FUNCTIONALITY ****

* `NoChange`: The scenario passes if the editor does not change the input.
* `NotApplicable`: The scenario passes if the editor is not applied due to a precondition not being met.
* `ShouldFail`: The scenario passes if the editor fails.
* `MissingParameters`: The scenario passes if the editor fails due to missing parameters. Used to test parameter validation.
* `InvalidParameters`: The scenario passes if the editor fails due to invalid parameters. Used to test parameter validation.

### Passing Parameters to Operations
TODO: cover editWith

### Worlds
Each scenario can have a "world" associated with it. A world is an isolated context for each scenario execution, which allows:

- The binding and retrieval of arbitrary objects
- Additional context-specific operations provided in the world's implementation

Currently `rug` supports only BDD-based tests for generators, editors and reviewers. These use the `ProjectWorld` type, defined in `Core.ts`. `ProjectWorld` allows `then` blocks to query the number of modifications made, whether or not edit attempts succeeded, and the number of editors run.

The scenario world is an optional second parameter in all step definitions. For example:

```
export function Given(s: string, f: (Project, ScenarioWorld?) => void)
```

While our examples have used only the project, the world can be used as follows:

```
Then("I'm happy with both project and world", (p, world) => {
		// Assertion that may reference the world
})
```

### Debugging Hints

To see the contents of a file in the output, simply get hold of the file in the project and use `console.log`. For example:

```
Then("the file has the right stuff", p => {
	let filename = "my/path/to/File.txt"
	let f = p.findFile(filename)
	if (f) {
		console.log(`Contents of ${filename} are \n${f.content()}\n`)
		return f.content().indexOf("stuff i care about") > -1
	}
	else {
		console.log(`${filename} not found in archive`)
		return false
	}
})
```

To dump the entire archive at any point, use the `Helpers` module as follows:

```
import * as helpers from "@atomist/rug/test/Helpers"
...
helpers.prettyListFiles(project)
```

To dump the tree in a particular file:

TODO

### Gaps
Please note the following gaps from the full range of Gherkin functionality:

- Doc strings
- Data tables
- Tags

These may be supported in a future version of `rug`.

### Future Directions

- The need for more than one source file for each feature is both a strength and weakness of Gherkin. It's a strength because each file is in a single, logical, toolable language; it's a weakness because of the level of ceremony required and because of the brittle linkage by a string value. We intend to provide editors that helps with this, automatically creating feature files for editors, and TypeScript files implementing the steps in feature files.
- In future release, BDD testing support should be extended beyond project operations to event handlers.



