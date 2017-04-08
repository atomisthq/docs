Development automation goes beyond creating new projects as demonstrated in 
the [generator tutorial][buildgen]. After all, you spend more time working
on an existing project. Atomist backs your needs for automating recurring tasks 
via its Rug editors.

At its core, an editor codifies changes to apply to an existing project. The 
editor model unifies modifications operated on the filesystem as well as
within project's source code. This tutorial will guide you through creating
such an editor and making it available to your whole team.

[buildgen]: build-generator.md

### Add an Editor to a Rug Project

Editors live in the `.atomist` directory along side generators or handlers.
We are going to assume in this tutorial that your editors should live in the 
same Rug project you started in the [generator tutorial][buildgen]. 

!!! tip
    It is a good idea to keep editors targetting the specifics of a project 
    along side that project, e.g. in an `.atomist` directory in that project
    repository. However, editors that are more generic can live in their own
    repository.

You are going to use the Atomist bot to add a new basic editor to your existing
project. 

Navigate to the channel associated with the project's repository and ask the bot
for editors that could perform that operation:

```
@atomist editors add
```

This asked the bot to list editors it knows about, in that team, that have the
string `add` in their description or tags. You should see a list like the next
one:

<div class="ss-container">
  <img src="../images/add-ts-editor-to-project.png" alt="Add Editor to Project" class="ss-small">
</div>

The editor we want to apply is `AddTypeScriptEditor` from 
the `atomist-rugs:rug-editors` Rug archive Atomist provides to all teams. Click
on the `Edit project` button. This will start a new thread where the bot will
ask you for information about the editor you want to add to your project.

!!! tip "It goes full circle"
    As you can see, you are relying on an editor to add a new editor. Indeed,
    this operation is considered as a project change and therefore flows under
    the concepts of an editor. Your own editors will obviously create new files
    that target the project kind, e.g. new Java classes or Python modules.

<div class="ss-container">
  <img src="../images/add-class-editor-to-project.png" alt="Add class editor to Project" class="ss-small">
</div>

As you can see, the bot asks for basic information about the editor you want
to add to your project. Those fields are parameters of the `AddTypeScriptEditor`
editor and have no default value set, that's why the bot has to explicitely
ask them.

The bot informs you now that the operation succeeded:

<div class="ss-container">
  <img src="../images/add-class-editor-to-project-confirmation.png" alt="Add class editor to Project confirmed" class="ss-small">
</div>

Go to your GitHub project and browse for pull-requests, you will see a new one 
for the edition the bot just performed on your behalf.

<div class="ss-container">
  <img src="../images/add-class-editor-to-project-PR.png" alt="Add class editor to Project PR" class="ss-small">
</div>

It is important to note that Atomist tries its best to follow collaborative best practices. A branch was created and a pull-request was submitted for review. You
remain in control of the final merge of the change proposed by the editor.

The changes contain an editor skeleton as well as a test for it. Moreoever,
Atomist keeps track of its changes in an `.atomist.yml` file that you may 
dismiss if you prefer not having it in your repository.

Go ahead and merge the pull-request in your master branch. Next delete the 
branch as it is not needed any longer.

!!! success
    Go back to the slack channel of that project and notice how Atomist informs
    you about this merge as well. This shows the power of event handlers 
    addressed in the [XYZ tutorial].

    <div class="ss-container">
    <img src="../images/add-class-editor-to-project-PR-merged-event.png" alt="Add class editor to Project merged" class="ss-small">
    </div>

Now, you are going to learn how to edit and test your new editor.

### Edit and Test Your Editor

Working on your editor is not done on the channel but on your local machine
in your good old terminal. To achieve this, you must have the [rug CLI][cli]
installed and ready to go.

[cli]: /user-guide/interfaces/cli/index.md

Update your project's local copy to fetch the changes you just merged into your
master branch. Before hacking away our editor, let's make sure the test that
was added does pass, by running the following command:

```
$ rug test
Resolving dependencies for atomist-project-templates:sylvaintest4 (0.1.0·local) completed
Invoking TypeScript Compiler on .ts files
  Compiled .atomist/tests/project/AddJavaClassSteps.ts succeeded
  Compiled .atomist/editors/AddJavaClass.ts succeeded    
Invoking compilers on project sources completed
Loading atomist-project-templates:sylvaintest4 (0.1.0·local) failed

Error during eval of: .atomist/editors/AddJavaClass.js
```

Shoot, it failed! What happened? Well, Rugs are implemented in [TypeScript][ts].
That language is strongly typed and requires to know about the types the
editors is using. To achieve this, you must first run the next commands:

```
$ cd .atomist
$ npm install
.atomist
└─┬ @atomist/rugs@0.21.0 
  ├── @atomist/cortex@0.24.0 
  ├── @atomist/rug@0.24.0 
  └── mustache@2.3.0 
```

This will pull the necessary dependencies under the `.atomist/node_modules` 
directory. Now, you go back to the top-level directory of your project and run
the test command again:

```
$ rug test
Resolving dependencies for atomist-project-templates:sylvaintest4 (0.1.0·local) completed
Invoking TypeScript Compiler on .ts files
  Compiled .atomist/tests/project/AddJavaClassSteps.ts succeeded
  Compiled .atomist/editors/AddJavaClass.ts succeeded
Invoking compilers on project sources completed
Loading atomist-project-templates:sylvaintest4 (0.1.0·local) completed
Running test feature Tests from AddJavaClass.rt   
  Running test scenario AddJavaClass is added to your project by AddAddJavaClass
  Completed test scenario AddJavaClass is added to your project by AddAddJavaClass passed
Completed test feature Tests from AddJavaClass.rt passed
Running tests in atomist-project-templates:sylvaintest4 (0.1.0·local) completed
Successfully executed 1 of 1 test: Test SUCCESS
```

This is much better! Now you know where you stand and you can start workin on
that editor.

The first thing you should probably do is to change the test, under 
`.atomist/tests/projects`. Atomist supports a BDD approach to testing and that
dierctory contains both a feature file, describing the test scenario with the
high-level Gherkin language, as well as the implementation of each step of that
scenario in a TypeScript file next to it.

Start by editing the feature file and replace its content with the following:

```gherkin
Feature: AddJavaClass feature
  Validate adding a java class to a Java project.

  Scenario: A Java class is added to a Java project
    Given the archive root
    When when the AddJavaClass editor is applied
    Then the class is added to the project in the expected package

  Scenario: A none Java project will not be modified
    Given an empty project
    When when the AddJavaClass editor is applied
    Then no class is added to the project
```

This defines two scenarios you proobably want to validate. First, that on a 
Java project, a Java class is indeed added in the right package. Secondly, you
should ensure your editor does not modify a non-Java project. You will see how
you can make that decision below.

Tunning the test again, you will notice they obviously faily since we have
not yet defined the steps themselves:

```console
$ rug test
Resolving dependencies for atomist-project-templates:sylvaintest4 (0.1.0·local) completed
Invoking TypeScript Compiler on .ts files
  Compiled .atomist/tests/project/AddJavaClassSteps.ts succeeded
  Compiled .atomist/editors/AddJavaClass.ts succeeded
Invoking compilers on project sources completed
Loading atomist-project-templates:sylvaintest4 (0.1.0·local) completed
Running test feature AddJavaClass feature
  Running test scenario A Java class is added to a Java project
  Completed test scenario A Java class is added to a Java project failed
  Running test scenario A none Java project will not be modified
  Completed test scenario A none Java project will not be modified failed
Completed test feature AddJavaClass feature failed
Running tests in atomist-project-templates:sylvaintest4 (0.1.0·local) completed

→ Test Report
  Not yet implemented
  └─┬ AddJavaClass feature
    ├─┬ A Java class is added to a Java project
    | └── the class is added to the project in the expected package: NotYetImplemented
    └─┬ A none Java project will not be modified
      └── no class is added to the project: NotYetImplemented

Unsuccessfully executed 0 of 1 test: Test FAILURE
```

To accomodate the modification of the feature, you must implement the steps as 
well now. Those steps belong to `.atomist/tests/project/AddJavaClassSteps.ts`.
Replace its content with the following:

```typescript
import { Project } from "@atomist/rug/model/Project";
import { Given, When, Then, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";

When("when the AddJavaClass editor is applied", (p: Project, world: ProjectScenarioWorld) => {
    let editor = world.editor("AddJavaClass");
    world.editWith(editor, {
        className: "Thinker",
        packageName: "com.mycompany.myapp"
    });
});

Then("the class is added to the project in the expected package", (p: Project, world: ProjectScenarioWorld) => {
    return p.fileExists("com/mycompany/myapp/Thinker.java");
});

Then("no class is added to the project", (p: Project, world: ProjectScenarioWorld) => {
    return p.fileExists("com/mycompany/myapp/Thinker.java") == false;
});
```

The general idea here is that you implement each step of the feature in this 
file. If you want to learn more on this subject, please read [our user-guide on
testing][ugtest].

[ugtest]: /user-guide/rug/tests.md

Notice that you do not need to implement the two `#!gherkin Given` steps because
they are so common that Atomist provides them for you in its `@atomist/rug`
[node module][rugnpm].

[rugnpm]: https://www.npmjs.com/package/@atomist/rug 

The `#!gherkin When` and `#!gherkin Then` steps take two arguments,
the project against which the test runs, as provided by the `#!gherkin Given`
steps, and a scenario world which is just the test's context where you inject
the editors you need during the test run.

!!! note
    Tests are executed with projects living in memory. In the case of 
    `#!gherkin Given an empty project` the project is indeed empty, e.g. it represents an in-memory empty directory. In the case of 
    `#!gherkin Given the archive root`, your test runs a copy of the local Rug
    project's content itself, in memory.

The `#!gherkin Then` steps are your test assertions and return a boolean value
that will stop the current test when return a falsey value.

!!! note
    If you are familiar with the Gherkin syntax, you will notice the lack of the
    `#!gherkin And` step. In Rug, just use as many `#!gherkin Then` step as you
    need instead.

Running tests again, you should see something like the following:

```console
$ rug test
Resolving dependencies for atomist-project-templates:sylvaintest4 (0.1.0·local) completed
Invoking TypeScript Compiler on .ts files
  Compiled .atomist/tests/project/AddJavaClassSteps.ts succeeded
  Compiled .atomist/editors/AddJavaClass.ts succeeded
Invoking compilers on project sources completed
Loading atomist-project-templates:sylvaintest4 (0.1.0·local) completed
Running test feature AddJavaClass feature
  Running test scenario A Java class is added to a Java project
    Step when the AddJavaClass editor is applied failed:
Missing parameters: [inputParameter]: Parameters: name=AddJavaClass, values=[Buffer(SimpleParameterValue(className,Thinker), SimpleParameterValue(packageName,com.mycompany.myapp))]
  Completed test scenario A Java class is added to a Java project failed
  Running test scenario A none Java project will not be modified
    Step when the AddJavaClass editor is applied failed:
Missing parameters: [inputParameter]: Parameters: name=AddJavaClass, values=[Buffer(SimpleParameterValue(className,Thinker), SimpleParameterValue(packageName,com.mycompany.myapp))]
  Completed test scenario A none Java project will not be modified passed
Completed test feature AddJavaClass feature failed
Running tests in atomist-project-templates:sylvaintest4 (0.1.0·local) completed

→ Test Report
  Failures
  └─┬ AddJavaClass feature
    ├─┬ A Java class is added to a Java project
    | └─┬ the class is added to the project in the expected package: Failed
    |   └── function (p, world) {
    |           return p.fileExists("com/mycompany/myapp/Thinker.java");
    |       }
    └─┬ A none Java project will not be modified
      └── no class is added to the project: Passed

Unsuccessfully executed 1 of 1 test: Test FAILURE
```

The report looks different. No more `NotYetImplemented` messages. One test
failed as it should since you haven't yet implemented your editor. The other
test succeeded however and you may find that strange. If you look closely at 
what that test asserts on, it does make sense it passes. Indeed, it checks that
the class file does not exist which is the case. You could argue this assertion
is too weak and come up with a more specific check, we will leave this case up
to you.

Let's move on to the actual editor. Edit the file 
`.atomist/editors/AddJavaClass.ts` and replace its content with the following:

```typescript
import { EditProject } from '@atomist/rug/operations/ProjectEditor';
import { Project } from '@atomist/rug/model/Project';
import { Pattern } from '@atomist/rug/operations/RugOperation';
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators';

@Editor("AddJavaClass", "adds a new class to a Java project")
@Tags("java")
export class AddJavaClass implements EditProject {

    @Parameter({
        displayName: "ClassName",
        description: "name of the class",
        pattern: Pattern.java_class,
        validInput: "a valid Java class name"
    })
    className: string;

    @Parameter({
        displayName: "PackageName",
        description: "name of the package holding the class",
        pattern: Pattern.java_package,
        validInput: "a valid Java package name"
    })
    packageName: string;

    edit(project: Project) {
        // let's predicate that a java project has that directory structure
        if (!project.directoryExists("src/main/java")) {
            return
        }

        const packageDir: string = this.packageName.replace(/\./g, "/");
        const content: string = `package ${this.packageName};

public class ${this.className} {
}`;

        project.addFile(`${packageDir}/${this.className}.java`, content);
    }
}

export const addJavaClass = new AddJavaClass();
```

This editor is rather simple, it takes two parameters to name both the
package and the class to add. Notice how the `#!typescript edit` method takes
the project as sole argument, this is given by Atomist when the editor is
applied.

!!! seealso
    Read the [user-guide on editors][ugedit] for a deep dive of the editor
    programming model.

[ugedit]: /user-guide/rug/editors.md

The first thing the editor does is to ensure it acts against a Java project, no
need to pollute other kind of projects. You can decide what constitutes a 
Java project obviously, here let's assume it's a project with a `src/main/java`
directory.

When in a Java project, your editor simply adds a file in the appropriate 
sub-directory (using the package name) and stores a basi class definition into
that file.

!!! tip "Compose your editors"
    Atomist promotes composability of editors, e.g. editors can call other
    editors. Here we create the package directory at the same
    time we add the class file, you could instead have another editor that only
    takes care of that simple operation and compose the `AddJavaClass` with a
    `AddJavaPackage` editor for example.

    Such an editor could be called from yours as follows for example:

    ```typescript
    project.editWith("AddJavaPackage", {
        packageName: this.packageName
    });
    ```

    The first argument is the name of the editor to call, if that editor lives
    in a different Rug project, the name should fully qualified, e.g.
    `"group-id:artifact-id:name"`. The second argument is a parameter mapping
    what the other editor expects.

Run your tests once again:

```console
$ rug test
Resolving dependencies for atomist-project-templates:sylvaintest4 (0.1.0·local) completed
Invoking TypeScript Compiler on .ts files
  Compiled .atomist/tests/project/AddJavaClassSteps.ts succeeded
  Compiled .atomist/editors/AddJavaClass.ts succeeded
Invoking compilers on project sources completed
Loading atomist-project-templates:sylvaintest4 (0.1.0·local) completed
Running test feature AddJavaClass feature
  Running test scenario A Java class is added to a Java project
  Completed test scenario A Java class is added to a Java project passed
  Running test scenario A none Java project will not be modified
  Completed test scenario A none Java project will not be modified passed
Completed test feature AddJavaClass feature passed
Running tests in atomist-project-templates:sylvaintest4 (0.1.0·local) completed

Successfully executed 1 of 1 test: Test SUCCESS
```

It's a win! Now, you can iterate and add more editors or extend you existing
editor with the same approach. For now, let's see how you publish that 
editor for others to use.

### Publish your Editor

You have now a working, well tested, editor on your local machine. Your next
step is to publish it to make it avaiilable to your team. This is performed
via the following command:

```console
$ rug publish
Resolving dependencies for atomist-project-templates:sylvaintest4 (0.1.0·local) completed
Invoking TypeScript Compiler on .ts files 
  Compiled .atomist/tests/project/AddJavaClassSteps.ts succeeded
  Compiled .atomist/editors/AddJavaClass.ts succeeded
Invoking compilers on project sources completed
Loading atomist-project-templates:sylvaintest4 (0.1.0·local) completed
  Created META-INF/maven/atomist-project-templates/sylvaintest4/pom.xml  
  Created .atomist/manifest.yml            
  Created .atomist/metadata.json             
Generating archive metadata completed
  Uploading atomist-project-templates/sylvaintest4/0.1.0/sylvaintest4-0.1.0.zip → t1fbr1ctw (568 kb) succeeded  
  Uploading atomist-project-templates/sylvaintest4/0.1.0/sylvaintest4-0.1.0.pom → t1fbr1ctw (641 bytes) succeeded    
  Uploading atomist-project-templates/sylvaintest4/0.1.0/sylvaintest4-0.1.0-metadata.json → t1fbr1ctw (1 kb) succeeded
  Downloading atomist-project-templates/sylvaintest4/maven-metadata.xml ← t1fbr1ctw (392 bytes) succeeded            
  Uploading atomist-project-templates/sylvaintest4/maven-metadata.xml → t1fbr1ctw (344 bytes) succeeded              
Publishing archive into remote repository completed

→ Archive
  ~/dev/atomist/alpha/sylvaintest4/.atomist/target/sylvaintest4-0.1.0.zip (568 kb in 355 files)

→ URL
  https://atomist.jfrog.io/atomist/T1FBR1CTW/atomist-project-templates/sylvaintest4/0.1.0/sylvaintest4-0.1.0.zip

Successfully published archive for atomist-project-templates:sylvaintest4 (0.1.0)
```

The publish command packages the whole Rug project into an archive and uploads
it to a remote repository tied to your team. 

Shortly after your editor is now visible to your team and can be invoked via
the Atomist bot:

<div class="ss-container">
  <img src="../images/add-class-editor-to-project-published.png" alt="Add class editor to Project PR" class="ss-small">
</div>

That's it! You know now how to add powerful automation to your team at the tip
of a bot command.