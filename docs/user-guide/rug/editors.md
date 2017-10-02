The most common task performed on a daily basis is to change the code of a
project. Those updates can target a single file but can also refer to many
resources.

Rug editors automate updates, from the simplest to most complex.

<!--

## Anatomy of an Editor

Assume our team has an existing Spring Boot Rest project cloned or copied/pasted
from in other projects. These manual actions are brittle at best and usually
ends up with team members wondering what they did wrong.

Let's suppose however that project is already a Rug project, it would still
be a running Spring Boot project in its own right. Here is such a project:

```console
~/workspace/spring-boot-rest-basic
    ├── .atomist
    │   ├── editors
    │   │   └── NewSpringBootService.ts
    │   ├── .gitignore
    │   ├── package.json
    │   ├── tests
    │   │   ├── project
    │   │   │   ├── NewSpringBootService.feature
    │   │   └── └── Steps.ts
    │   └── tsconfig.json
    ├── .atomist.yml
    ├── .gitignore
    ├── pom.xml
    ├── .project
    ├── README.md
    ├── src
    │   ├── main
    │   │   ├── java
    │   │   │   └── com
    │   │   │       └── company
    │   │   │           ├── HomeController.java
    │   │   │           ├── MyRestServiceApplication.java
    │   │   │           └── MyRestServiceConfiguration.java
    │   │   └── resources
    │   │       ├── application.properties
    │   │       └── logback.xml
    │   └── test
    │       └── java
    │           └── com
    │               └── company
    │                   ├── MyRestServiceApplicationTests.java
    │                   ├── MyRestServiceOutOfContainerIntegrationTests.java
    │                   └── MyRestServiceWebIntegrationTests.java
    └── .travis.yml
```

However, rather than copying bits and pieces, the team could codify the
development automation tasks into Rug editors that could be tested and
evolved as the team would need it.

Editors live in the `.atomist/editors` directory and their tests in the
`.atomist/tests` directory. The `NewSpringBootService.ts` is the generator from
the [Rug generator section][gen], editors live alongside it deminstrating we can
codify not only the inception of a project but its evolution as well.

Let's go through one of those Rug editors in the next section.

[gen]: generators.md

## A Basic Editor

Let's suppose we need to automate the task of adding a controller to a Spring
Boot service. That controller will respond to requests for the `/calendar`
endpoint.

Before we can dive into the editor itself, let's review what's needed here:

* Add a new class under `src/main/java/com/company`
* Decorate that class with the `#!java @RestController` and
  `#!java @RequestMapping` decorators
* Indicate the endpoint at which this controller takes place: `/calendar`

These tasks are what we are going to encode in a Rug editor.

```typescript linenums="1"
import { EditProject } from '@atomist/rug/operations/ProjectEditor';
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators';
import { Pattern } from '@atomist/rug/operations/RugOperation';
import { Project } from '@atomist/rug/model/Project';

@Editor("AddSpringBootRestController", "adds a new REST controller to a Spring Boot project")
@Tags("spring", "spring boot", "rest")
export class AddSpringBootRestController implements EditProject {

    @Parameter({
        displayName: "Class Name",
        description: "name for the controller class",
        pattern: Pattern.java_class,
        validInput: "a valid Java class name",
        minLength: 1,
        maxLength: 50
    })
    controller_class_name: string;

    @Parameter({
        displayName: "Path at which the request will be served",
        description: "REST endpoint",
        pattern: Pattern.any,
        validInput: "a valid HTTP path",
        minLength: 1,
    })
    endpoint: string;

    edit(project: Project) {

        const rawJavaFileContent = `package com.company;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="${this.endpoint}")
public class ${this.controller_class_name}Controller {
}`;

        project.addFile(`src/main/java/com/company/${this.controller_class_name}Controller.java`, rawJavaFileContent);
    }
}
export const addSpringBootRestController = new AddSpringBootRestController();
```

The first few lines group the Rug typings our script will be using throughout
(lines 1&ndash;4). Next, we declare our editor through TypeScript [decorators][]
(line 6). The first argument of the `#!typescript @Editor` decorator is the name
of the editor. This the public visible and discoverable name of the Rug. This
name, along with the editors group and repository, form the fully-qualified name
of the editor. The second argument of the `#!typescript @Editor` decorator is a
short description of the editor. The following line uses the
`#!typescript @Tags` decorator to apply some tags to our editor so people can
search for it more easily. Using the `#!typescript @Tags` decorator is optional
but highly recommended.

[decorators]: https://www.typescriptlang.org/docs/handbook/decorators.html

We then define the class which implements our editor (line 8). An editor
implements the `#!typescript EditProject` interface. That interface requires the
`#!typescript edit(Project)` method to be defined (line 28). It is convention
for the editor and the class that implements it to have the same name.

You will likely want to customize your Rugs' input to tune their output
according to user-supplied values. Such customization is achieved through
parameters that your editor must declare in the class via the
`#!typescript @Parameter` decorator. This decorator
provides all the metadata of the parameter whereas the decorated variable
declaration provides its name and default value, if any. The
`#!typescript @Parameter` decorator accepts a single argument, a JavaScript
object. That object accepts [properties][paramprops] documented in the Rug
conventions but, only the `pattern` property is required. A pattern
is an [anchored][] regular expression that validates the input. Here we rely on
the `#!typescript Pattern.any` and `#!typescript Pattern.java_class` patterns
bundled by Atomist in the TypeScript dependencies.

[paramprops]: /user-guide/rug/conventions.md#parameters
[anchored]: http://www.regular-expressions.info/anchors.html

The `#!typescript edit` method takes a single argument, a
`#!typescript Project` object. That object gives you access to the entire
structure and content of the project your editor is applied to. Use it to access
and update the content of any resource in that project according to the goal of
your editor. You have the full power of TypeScript and the Rug programming model
and [language extensions][langext] to achieve this.

As we can see, in this example, we simply create the content of the controller
class customizing it from the parameters before saving that content in the
appropriate file in the project.

!!! tip
    In a real Rug editor, you would want to also parameterize the package
    path as your users may have changed it in their own project.

A Rug should always be accompanied by one or more [tests][]. Here, this is what
a basic test could look like. First the feature descriving the test scenario
for that editor:

[tests]: tests.md

```gherkin
Feature: Add a new REST Controller to a Spring Boot project

Scenario: A new controller class should be added
 Given an empty project
 When adding a new controller
 Then the controller class should be created
 Then the controller class has the supplied name
 Then the controller class has the supplied endpoint
```

The implementation of such test goes into `.atomist/tests/Steps.ts`:

```typescript
import { Given, When, Then, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";
import { Result } from "@atomist/rug/test/Result";
import { Project } from "@atomist/rug/model/Project";

When("adding a new controller", (p: Project, world: ProjectScenarioWorld) => {
  let generator = world.generator("NewSpringBootService");
  world.generateWith(generator, {"service_class_name": "CalendarService"});

  let editor = world.editor("AddSpringBootRestController");
  world.editWith(editor, {'endpoint': '/calendar', 'controller_class_name': 'Calendar'})
});

Then("the controller class should be created", (p: Project) =>
    p.fileExists("src/main/java/com/company/CalendarController.java")
);
Then("the controller class has the supplied name", (p: Project) =>
    p.findFile("src/main/java/com/company/CalendarController.java").contains("CalendarController")
);
Then("the controller class has the supplied endpoint", (p: Project) =>
    p.findFile("src/main/java/com/company/CalendarController.java").contains("/calendar")
);
```

Such a test should pass when executed:

```console hl_lines="12 13"
$ rug test
Resolving dependencies for com.company.rugs:spring-boot-service:0.13.0:local completed
Invoking TypeScript Compiler on ts script sources
  Created .atomist/tests/Steps.js.map
  Created .atomist/tests/Steps.js
  Created .atomist/editors/AddSpringBootRestController.js
  Created .atomist/editors/AddSpringBootRestController.js.map
  Created .atomist/editors/NewSpringBootService.js
  Created .atomist/editors/NewSpringBootService.js.map
Processing script sources completed
Loading com.company.rugs:spring-boot-service:0.13.0:local completed
  Executing feature Add a new REST Controller to a Spring Boot project
    Executing test scenario A new controller class should be added
  Creating project_name
  Executing feature Creating new Spring Rest Service projects
    Executing test scenario A default Spring Rest project structure should be generated
  Creating project_name
Running tests in com.company.rugs:spring-boot-service:0.13.0:local completed

Successfully executed 2 of 2 tests: Test SUCCESS
```

Although this editor is useful, if we stopped there, its users would still
have to implement the REST endpoints in that controller by hand. As Atomist
can navigate code as we much as filesystem, we certainly can add a new editor
that does just that. Here such an editor:

```typescript linenums="1"
import { EditProject } from '@atomist/rug/operations/ProjectEditor';
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators';
import { Pattern } from '@atomist/rug/operations/RugOperation';
import { Project } from '@atomist/rug/model/Project';
import { PathExpressionEngine, TextTreeNode } from '@atomist/rug/tree/PathExpression';

@Editor("AddSpringBootRestControllerRequestMapping", "adds a new endpoint mapping to a REST controller")
@Tags("spring", "spring boot", "rest")
export class AddSpringBootRestControllerRequestMapping implements EditProject {

    @Parameter({
        displayName: "Controller Name",
        description: "name for the controller class",
        pattern: Pattern.java_class,
        validInput: "a valid Java class name",
        minLength: 1,
        maxLength: 50
    })
    controller_name: string;

    @Parameter({
        displayName: "Method Name",
        description: "name for the method to add",
        pattern: Pattern.java_identifier,
        validInput: "a valid Java method name",
        minLength: 1,
        maxLength: 50
    })
    method_name: string;

    @Parameter({
        displayName: "Path at which the request will be served under the controller's endpoint",
        description: "REST endpoint",
        pattern: Pattern.any,
        validInput: "a valid HTTP path",
        minLength: 1,
    })
    endpoint: string;

    edit(project: Project) {
        let eng: PathExpressionEngine = project.context().pathExpressionEngine();

        eng.with<TextTreeNode>(project, `/src//File()[@name="${this.controller_name}.java"]/JavaFile()//classDeclaration`, f => {
            f.update(`@RequestMapping(value="/${this.endpoint}", method=RequestMethod.GET)
    public String ${this.method_name}() {
        throw new UnsupportedOperationException("No implemented");
    }`);
        });
    }
}
export const addSpringBootRestControllerRequestMapping = new AddSpringBootRestControllerRequestMapping();
```

This editor follows the same structure as explained earlier, it's interesting
part is its body which demonstrates the power of [path expressions][pxe] to
query note the filesystem but code structures as well. Let's deconstruct the
path expression declared here:

[pxe]: path-expressions.md

```typescript
`/src//File()[@name="${this.controller_name}.java"]/JavaFile()//classDeclaration`
```

Starting from the `src` top-level directory of the project, we search for the
Java file the user targets via the editor's parameter
`#!typescript controller_name`. Once that file is found, we inform the Rug
runtime to switch to parsing that file, using the `JavaFile()` language
extension, so we can navigate its content through an AST-based tree model. The
`//classDeclaration` segment tells the expression engine to look for all classes
in that tree. Since we are in a Java file, we retrieve the only top-level class
it contains.

!!! tip "ANTLR to the rescue"
    The Rug runtime relies on well-known [ANTLR grammars][antlr] to parse
    languages like Java, C# or Python. The `//classDeclaration` segment is a
    direct rule of the [Java8 grammar][antlrjava8]. You do not need to install
    ANTLR as it is provided by the Rug runtime.

[antlr]: http://www.antlr.org/
[antlrjava8]: https://github.com/antlr/grammars-v4/blob/master/java8/Java8.g4

Once we have found the class we are interested in updating, we can indeed add
the method's definition as per the user-supplied parameters. This changes is
automatically saved to disk and our class is now updated with the appropriate
method.

We obviously tested that editor as explained above through a BDD feature and
scenario which steps are implemented in `.atomist/tests/Steps.ts`.

```gherkin
Feature: Add a new endpoint to a REST Controller in a Spring Boot project

Scenario: A new endpoint meyhod should be added
 Given an empty project
 When adding a new endpoint to a controller
 Then the endpoint method should be created in the controller class
```

```typescript
import { Given, When, Then, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";
import { Result } from "@atomist/rug/test/Result";
import { Project } from "@atomist/rug/model/Project";
import { File } from "@atomist/rug/model/File";

 When("adding a new endpoint to a controller", (p: Project, world: ProjectScenarioWorld) => {
  let generator = world.generator("NewSpringBootService");
  world.generateWith(generator, {"service_class_name": "CalendarService"});

  let controller = world.editor("AddSpringBootRestController");
  world.editWith(controller, {'endpoint': '/calendar', 'controller_class_name': 'Calendar'})

  let editor = world.editor("AddSpringBootRestControllerRequestMapping");
  world.editWith(editor, {
      'endpoint': '/today',
      'method_name': 'getToday',
      'controller_name': 'CalendarController'
    })
});

Then("the endpoint method should be created in the controller class", (p: Project) => {
    let f: File = p.findFile("src/main/java/com/company/CalendarController.java");
    return f.contains("/today") && f.contains("getToday");
});
```

!!! tip "Compose your Rugs!"
    Notice how we compose by using the generator we declared in the
    [generators][] section a well as our first editor described above. This is a
    well-known convention when writing Rugs that we encourage you to follow.

[generators]: generators.md

-->
