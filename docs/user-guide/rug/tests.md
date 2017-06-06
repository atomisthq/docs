Rug provides a testing framework based
on [Behavior-Driven Development (BDD)][bdd] concepts.  This allows
rapid, in-memory testing of Rugs.

[bdd]: https://en.wikipedia.org/wiki/Behavior-driven_development (Behavior-Driven Development)

The framework is based on the well known [Gherkin BDD DSL][gherkin]
and inspired by solutions built on it, such
as [cucumber-js][cucumber].  All logic is coded in TypeScript or
JavaScript. If you are familiar with Cucumber (versions of which exist
for many languages), you should find the Rug test framework
particularly easy to learn; if not, it should still be intuitive.

[gherkin]: https://cucumber.io/docs/reference (Gherkin BDD)
[cucumber]: https://github.com/cucumber/cucumber-js (Cucumber.js)

## Approach

Rug is designed to support [Test Driven Development][tdd] using unit
tests and BDD.  We recommend following the "red &rarr; green &rarr;
refactor" approach.

!!! missing "Prerequisites"
    You will need the [Rug CLI][cli-install] and [Node.js][node]
    installed to run tests.

[tdd]: https://en.wikipedia.org/wiki/Test-driven_development (Test-Driven Development)
[cli-install]: /user-guide/interfaces/cli/install.md (Rug CLI Installation)
[node]: https://nodejs.org/ (Node.js)

For unit testing, we recommend using the [Mocha][mocha] framework with
either [Power Assert][power-assert].  You should put your Mocha unit
tests in the `.atomist/mocha` directory to avoid conflicts with where
the Rug CLI looks for the BDD tests.  With this setup and using Power
Assert, your `.atomist/package.json` would look something like this:

```json
{
  "dependencies": {
    "@atomist/rugs": "^1.0.0-m.4"
  },
  "devDependencies": {
    "@types/mocha": "^2.2.40",
    "@types/power-assert": "^1.4.29",
    "espower-typescript": "^8.0.0",
    "mocha": "^3.2.0",
    "power-assert": "^1.4.2",
    "tslint": "^5.0.0",
    "typescript": "2.3.2"
  },
  "directories": {
    "test": "mocha"
  },
  "scripts": {
    "lint": "tslint '**/*.ts' --exclude 'node_modules/**' -t verbose",
    "mocha": "mocha --compilers ts:espower-typescript/guess 'mocha/**/*.ts'",
    "test": "npm run mocha && rug test"
  }
}
```

and you can run your unit tests with the following command:

```console
$ ( cd .atomist && npm run mocha )
```

or run both the unit and BDD tests with this command:

```console
$ ( cd .atomist && npm test )
```

The documentation for [Mocha][mocha] and [Power Assert][power-assert]
can help you get started with unit testing in TypeScript/JavaScript.
The rest of this document focuses on Rug BDD testing.

[mocha]: https://mochajs.org/ (Mocha.js)
[power-assert]: https://github.com/power-assert-js/power-assert (JavaScript Power Assert)

## Quick overview

Before taking a deeper dive into the Rug BDD approach, let's look at
an example.

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
    	const eng = project.context.pathExpressionEngine;
        eng.with<JavaClass>(project, "//JavaClass()[@name='Dog']", jc => {
        	jc.rename("Cat");
        });
    }
}
```

We want to test that the editor works as intended.  First, we write a
Gherkin `.feature` file that is an easily readable description of the
behaviors we expect.  We'll name the file `Renaming.feature` and place it
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

Given("a file named src/main/java/Dog.java", (p: Project) => {
    p.addFile("src/main/java/Dog.java", "public class Dog {}");
});

When("edit with Renamer", (p: Project, w: ProjectScenarioWorld) => {
    const editor = w.editor("Renamer");
    w.editWith(editor, {});
});

Then("there should be one file", (p: Project) => {
    return p.totalFileCount() === 1;
});

Then("the file is now src/main/java/Cat.java", (p: Project) => {
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
argument is a `#!typescript ProjectScenarioWorld`.  You can see only
the `#!typescript When` step uses the optional second argument, so it
is the only one that declares it (see below for more details
on [worlds](#worlds)).  Step definitions may be provided in any
TypeScript or JavaScript file under `.atomist/tests/project`. They
will be loaded automatically by the test infrastructure.

Different scenarios and even different features may share step
definitions.  This is beneficial in the case of common steps, e.g.,
`#!gherkin Given an empty archive`, which can be shared across many
features and scenarios.

## Worlds

As mentioned briefly above, each scenario has a *world* in which it
executes.  A *world* is an isolated context for each scenario
execution that allows you to control how your Rug is being tested and
how the results of the tests are evaluated.  The scenario's world is
encapsulated in the TypeScript `#!typescript ScenarioWorld` interface
and made available to the functions implementing each step in the
scenario.  The modifications made to the scenario's world in each step
is visible to all subsequent steps in the scenario.  So the scenario's
world is, more or less, the *state* of the scenario at each step.

The type of world made available to each scenario depends on what is
being tested.  When testing handlers, the world provided to the
functions implementing the steps is a derivative of `#!typescript
HandlerScenarioWorld`.  `#!typescript HandlerScenarioWorld` extends
`#!typescript ScenarioWorld`, adding handler-specific methods such as
the ability to verify created plans.  The handler scenario world is
the first argument to all the functions implementing the handler
scenario steps.  For example, the declaration for the `#!typescript
When` function is effectively:

```typescript
import { HandlerScenarioWorld } from "@atomist/rug/test/handler/Core";
export function When(s: string, f: (HandlerScenarioWorld) => void);
```

When testing Rugs that deal with projects, e.g., generators and
editors, the world provided to the function implementing the scenario
steps is a `#!typescript ProjectScenarioWorld`.  The `#!typescript
ProjectScenarioWorld` interface extends `#!typescript ScenarioWorld`,
adding functions to find and execute editors and generators, query the
number of modifications made, and see if editing succeeded.  The
scenario world is an optional second parameter to the function that
implements each scenario step.  For example, the declaration of the
`#!typescript Given` function is effectively:

```typescript
import { ProjectScenarioWorld } from "@atomist/rug/test/project/Core";
export function Given(s: string, f: (Project, ProjectScenarioWorld?) => void);
```

In practice, what you do with the scenario's world depends on what
*phase* of the scenario you are in.  Each BDD testing scenario has
three phases, mapping directly to the different types of Gherkin
steps:

1.  [Setup](#setup): the `#!gherkin Given` steps are used to set up
    testing prerequisites within the world
2.  [Execution](#execution): the action being tested is executed on
    the world in the `#!gherkin When` step
3.  [Assertions](#assertions): the state of the scenario's world is
    interrogated in the `#!gherkin Then` steps

In the following sections, we will delve into each of these phases and
describe in detail how the scenario's world can be used in each phase
to enable testing.

## Setup

The `#!gherkin Given` step is used to set up a world for a testing
scenario.  Many testing scenarios can be entirely setup using
a ["well-known step"][well-known], but sometimes you need to customize
for your particular scenario.

[well-known]: #well-known-steps (Well-Known BDD Steps)

### Handler setup

When testing command handlers, you almost always use the "nothing"
well-known step that, as you might expect, does nothing.

```gherkin
Given nothing
```

As with all well-known steps, you do not need to supply an
implementation, one is already available to the BDD tests by Rug.

To avoid unwanted side effects during testing, the testing framework
will only consider executing event handlers that are explicitly
registered within a scenario.  Thus, the setup for event handler
testing typically involves registering the event handler being tested
in the `#!gherkin Given` step.  The following Gherkin step:

```gherkin
Given HandlerToTest is registered
```

could be implemented using the following TypeScript function:

```typescript
import { Given, EventHandlerScenarioWorld } from "@atomist/rug/test/handler/Core";

Given("HandlerToTest is registered", (w: EventHandlerScenarioWorld) => {
	w.registerHandler("HandlerToTest");
});
```

The event handler is looked up by name using the `#!typescript
registerHandler` method of `#!typescript EventHandlerScenarioWorld`,
which extends `#!typescript HandlerScenarioWorld` with event handler
specific methods.  The name used should be the same as the first
argument to the `#!typescript @EventHandler` decorator.  If the
handler cannot be found in the current archive, the test scenario will
fail.

Since this is so common, there is a well-known step for it.

```gherkin
Given HandlerToTest handler
```

The above step in a feature file will register the "HandlerToTest"
event handler for a scenario.  You do not need to supply an
implementation.

### Project setup

When testing generators you typically start with an empty project,
which is provided as a well-known step.

```gherkin
Given an empty project
```

Customizations when testing editors typically involve a series of
steps, each creating a file to populate the project for testing.  As
an example, consider the `#!gherkin Given` steps below.

```gherkin
Given a project POM
Given a Java source file
```

These steps could be implemented with the following TypeScript
functions.

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

There are also well-known steps for populating the project to be
tested with the contents of the Rug project itself.  The first copies
the entire contents of the Rug project, including the `.atomist`
directory, into the project being used in the test.

```gherkin
Given the archive root
```

The second form copies everything *but* the `.atomist` directory into
the project being used in the test.

```gherkin
Given archive non Atomist content
```

## Execution

For each scenario there is typically one `#!gherkin When` step
triggering a single action, sending an event or invoking a command
handler, editor, or generator.

### Triggering command handlers

A command handler is typically triggered from within chat by someone
sending the Atomist Bot a message with the command handler's intent.
To simulate this action in the testing framework, you use the
`#!typescript invokeHandler` method.

```typescript
import { CommandHandlerScenarioWorld, When } from "@atomist/rug/test/handler/Core";

When("the TestCommandHandler is invoked", (w: CommandHandlerScenarioWorld) => {
    const handler = w.commandHandler("TestCommandHandler");
    w.invokeHandler(handler, {});
});
```

The `#!typescript CommandHandlerScenarioWorld` interface used above
inherits from `#!typescript HandlerScenarioWorld`, adding methods
specific to command handlers.  Before invoking the command handler,
you use the `#!typescript CommandHandlerScenarioWorld` object to
lookup the handler by name using the `#!typescript commandHandler`
method.  The name you provide is the same as the name used in the
`#!typescript @CommandHandler` decorator.

### Sending events

To simulate an event occurring when testing an event handler, you
first create the appropriate [event object][cortex] from the classes
in the `cortex/stub` directory.  Then, you use the `sendEvent` method
of `#!typescript EventHandlerScenarioWorld` to trigger the receipt of
that event.

[cortex]: /user-guide/rug/path-expressions.md#cortex-graph

```typescript
import * as stub from "@atomist/cortex/stub/Types";
import { When, EventHandlerScenarioWorld } from "@atomist/rug/test/handler/Core";

When("a new Tag is received", (w: EventHandlerScenarioWorld) => {
    const event = new stub.Tag();
    w.sendEvent(event);
});
```

Remember that you must have registered an event handler that responds
to that exact kind of event.  You can create arbitrarily complex
events using the "stub" objects.

```typescript
import * as stub from "@atomist/cortex/stub/Types";
import { When, EventHandlerScenarioWorld } from "@atomist/rug/test/handler/Core";

When("an initial commit is received", (w: EventHandlerScenarioWorld) => {
    const event = new stub.Push()
        .addCommits(new stub.Commit().withMessage("initial commit by Atomist"))
        .withRepo(new stub.Repo().withName(repoName).withOwner(orgName)
            .withOrg(new stub.Org().withOwner(orgName)
                .withChatTeam(new stub.ChatTeam().withId("NONESUCH").withName("chatter").withProvider("Slack"))));
    w.sendEvent(event);
});
```

### Modifying projects

The "Quick Overview" example above showed how the `#!typescript
ProjectScenarioWorld` is used to look up and execute an editor.  The
approach is similar for generators.

```typescript
import { Project } from "@atomist/rug/model/Project";
import { When, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";

When("project generated", (p: Project, w: ProjectScenarioWorld) => {
    const generator = w.generator("SomeGenerator");
    w.generateWith(generator, "new-project", { param1: "value1" });
});
```

The generator is looked up by name using the `generator` method on
`#!typescript ProjectScenarioWorld`, providing the same name used as
the first argument to the `#!typescript @Generator` decorator.  The
generator is executed using the `generateWith` method.  The
`generateWith` method takes three arguments: the generator, the name
of the project to be generated, and a JavaScript object whose keys are
the names of the generator parameters and whose values are the values
of those parameters.

### Failure

If you want to simulate failure or discover in your `#!gherkin Where`
step that your world is in an invalid state, the `#!typescript
ScenarioWorld` interface provides a method to abort the scenario.  If
you are testing handlers, using the `#!typescript abort` method would
look like this:

```typescript
import { ScenarioWorld } from "@atomist/rug/test/ScenarioWorld";
import { When } from "@atomist/rug/test/handler/Core";

When("the scenario aborts", (w: ScenarioWorld) => {
    w.abort();
});
```

If you are testing editors and generators, it would look like this:

```typescript
import { Project } from "@atomist/rug/model/Project";
import { ScenarioWorld } from "@atomist/rug/test/ScenarioWorld";
import { When } from "@atomist/rug/test/project/Core";

When("the scenario aborts", (p: Project, w: ScenarioWorld) => {
    w.abort();
});
```

The result of the above steps would be that the scenario is marked as
aborted, meaning that subsequent steps, aside from a test to see if
the scenario aborted, will not be attempted and marked as failed.

## Assertions

The `#!gherkin Then` steps consist of one or more assertions about the
final state of the scenario world.  The `#!typescript Then`
implementation should return either `#!typescript boolean` or
`#!typescript void`.  It is good practice for each step to be
fine-grained, containing only a single assertion, so that reports are
maximally informative about what succeeded and failed.  The code of
each failed assertion will be available in the test report provided by
the Rug CLI.

The `#!typescript ScenarioWorld` interface provides methods for
checking if parameters passed to a Rug were valid and checking if a
scenario aborted, e.g., if a Rug throws an `#!javascript Error`.  The
example below shows how to use each of these methods in a handler
scenario `#!gherkin Then` step.

```typescript
import { ScenarioWorld } from "@atomist/rug/test/ScenarioWorld";
import { Then } from "@atomist/rug/test/handler/Core";

Then("the parameters were valid", (w: ScenarioWorld) => {
    return w.invalidParameters() == null;
});

Then("it aborted", (w: ScenarioWorld) => {
    return w.aborted();
});
```

The code would look similar for editor and generator scenario
`#!gherkin Then` steps, except that you would import `#!typescript
Then` from `@atomist/rug/test/project/Core` and each callback would
accept the arguments `#!typescript (p: Project, w: ScenarioWorld)`.
But it is probably easier to use the well-known steps when testing
editors and generators.

```gherkin
Then parameters were valid
Then parameters were invalid
Then the scenario aborted
```

### Handler assertions

Handlers return a `#!typescript Plan` object, which is simply a data
structure.  You can easily examine them, checking messages and
instructions as appropriate.  For messages, you can check their
content and addressing.  For instructions, you can check if they are
of the right kind, are calling the right Rug, and have the proper
response handlers.  A JavaScript assertion framework such
as [Chai][chai] can help.  You can get the plan returned by a handler
using the `plan` method on `#!typescript HandlerScenarioWorld`.

[chai]: http://chaijs.com/ (Chai.js)

```typescript
import { DirectedMessage } from "@atomist/rug/operations/Handlers";
import { Then, EventHandlerScenarioWorld } from "@atomist/rug/test/handler/Core";

Then("the event handler should respond with the correct message",
    (w: EventHandlerScenarioWorld) => {
        const expected = "the message";
        const message = w.plan().messages[0] as DirectedMessage;
        return message.body === expected
            && message.channelNames.length === 1
            && message.channelNames[0] === "#some-channel";
    },
);
```

The above example is for an event handler and uses `#!typescript
EventHandlerScenarioWorld`, which extends `#!typescript
HandlerScenarioWorld`, as the callback argument type.

### Project assertions

When testing editors and generators, the callback provided as the
second argument to the `#!typescript Then` accepts a `#!typescript
Project` and optional `#!typescript ProjectScenarioWorld`.  A typical
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
    const className = "Sugar";
    return p.fileContains("src/main/java/Sugar.java", `class ${className}`);
});
```

Testing that a file exists and that a file has certain contents are so
common that well-known steps are provided for these assertions.

```gherkin
Then file at some/path/to/file.txt should exist
Then file at some/path/to/file.txt should contain something of interest
```

The first step asserts that the file `some/path/to/file.txt` exists
while the second asserts that the file contains the literal string
`something of interest`.

The `#!typescript ProjectScenarioWorld` interface provides the
following methods to test the outcome of running an *editor*.

```typescript
import { Project } from "@atomist/rug/model/Project";
import { Then, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";

Then("some changes were made", (p: Project, w: ProjectScenarioWorld) => {
    return w.modificationsMade();
});

Then("the editor failed", (p: Project, w: ProjectScenarioWorld) => {
    return w.failed();
});
```

!!! caution "For editors only"
    The `#!typescript modificationsMade` and `#!typescript failed`
    methods only consider editor operations.  They do not return
    meaningful results when testing generators.

There are well-known steps to make using the above methods easier.

```gherkin
Then changes were made
Then it should fail
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

When("politics takes its course", (p: Project, w: ProjectScenarioWorld) => {
    w.editWith(w.editor("AlpEditor"), {heir: "Paul"});
});
```

## Well-known steps

A "well-known step" is a named step that the Rug testing framework
defines for you.  You can refer to the step in the
feature file but do not have to define it in the steps file. Here are the
well-known steps available in handler scenarios.

Step Type | Name | Meaning
----------|------|--------
Given | `nothing` | A cold, empty world
Given | `SomeHandler handler` | The event handler `SomeHandler` is registered
Then | `no handler fired` | The `#!typescript Plan` is `#!typescript null`
Then | `handler parameters were valid` | The parameters passed to the Rug were valid
Then | `handler parameters were invalid` | The parameters passed to the Rug were not valid
Then | `plan has no messages` | The `#!typescript Plan` has no messages (it could still have instructions)

Here are the well-known steps available in project scenarios.

Step Type | Name | Meaning
----------|------|--------
Given | `an empty project` | An empty project, useful for generators
Given | `the archive root` | The entire contents of the Rug archive providing the Rug being tested, including the `.atomist` directory
Given | `archive non Atomist content` | The contents of the Rug archive providing the Rug being tested, excluding the `.atomist` directory
Given | `github someone/somerepo` | The `#!typescript Project` object made available to test steps will be the contents of the master branch of the GitHub.com `someone/somerepo` repository
Given | `github someone/somerepo/somebranch` | The `#!typescript Project` object made available to test steps will be the contents of the `somebranch` branch of the GitHub.com `someone/somerepo` repository
Then | `changes were made` | The *editor* made changes to the project
Then | `no changes were made` | The *editor* made no changes to the project
Then | `parameters were valid` | The parameters passed to the Rug were valid
Then | `parameters were invalid` | The parameters passed to the Rug were not valid
Then | `file at a/path/to/file should exist` | The file `a/path/to/file` exists in the resulting `#!typescript Project`
Then | `file at a/path/to/file should contain blah blah` | The file `a/path/to/file` exists in the resulting `#!typescript Project` and contains the literal string `blah blah`
Then | `it should fail` | The Rug runtime was unable to complete executing the Rug
Then | `the scenario aborted` | The Rug being executed aborted, typically by throwing an exception

In the unlikely event you want to override a common step definition
provided by Atomist or yourself, you can define the same step in your
step definitions.  Your local definition will take precedence.

## Debugging hints

Sometimes when testing, it is helpful to print out the contents of a
file to help you diagnose why a test is failing.  The Rug testing
framework provides a few helper functions to provide insight to what
changes were made.

To print the entire contents of a project in the test output, use the
`#!typescript Helpers.prettyListFiles` function as follows:

```typescript
import { Project } from "@atomist/rug/model/Project";
import { Then } from "@atomist/rug/test/project/Core";
import * as helpers from "@atomist/rug/test/project/Helpers";

Then("the README exists", (p: Project) => {
    console.log(helpers.prettyListFiles(p));
    return p.fileExists("README.md");
});

```

To see the contents of a file in the test output, use the
`#!typescript Helpers.dump` function.

```typescript
import { Project } from "@atomist/rug/model/Project";
import { Then } from "@atomist/rug/test/project/Core";
import * as helpers from "@atomist/rug/test/project/Helpers";

Then("the README exists", (p: Project) => {
    console.log(helpers.dump(p, "README.md"));
    return p.fileExists("README.md");
});

```

## Not currently supported

Rug Test does not yet support the full range of Gherkin functionality.
The following features are missing:

-   Doc strings
-   Data tables
-   Tags

These may be supported in a future version of Rug.

## Future directions

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
