Rug generators create new projects from an existing source project,
where the source project itself is a working project in its own right.
A Rug generator has two major components: the "model" project and the
modifications needed to transform the model project into a new
project.  The model project can be any working project you want to use
to create new projects.  The transformations are encoded in the Rug
generator script located under the project's `.atomist` directory.
Using these components, a generator does the followings:

1.  Copy the content of its host project, `.atomist` directory
    excluded, into the new target directory
2.  Runs the generator's `populate` function against the contents of
    target directory

Let's look more closely at what makes a project a Rug generator.

## Anatomy of a Generator

Suppose we have a model project our team clones to quickly get the skeleton of a 
[Spring Bot Rest Service][springrest].  The contents of the model project are 
the following.

[springrest]: https://spring.io/guides/gs/rest-service/

```console
spring-boot-rest-basic
    ├── .gitignore
    ├── pom.xml
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

To turn our project into a [Rug project][rugproj], we can use the 
`ConvertExistingProjectToGenerator` Rug generator in [rug-editors][convert] to 
add all the necessary directories and files:

[rugproj]: projects.md
[convert]: https://github.com/atomist-rugs/rug-editors#convertexistingprojecttogenerator

```console
$ rug edit atomist-rugs:rug-editors:ConvertExistingProjectToGenerator \
    archive_name=spring-boot-service \
    group_id=com.company.rugs \
    version=0.13.0 \
    generator_name=NewSpringBootService \
    description="Rug project for Spring Rest Services"
Processing dependencies                                                                                                                                                                                          
  Downloading atomist-rugs/rug-editors/maven-metadata.xml ← rugs (740 bytes) succeeded                                                                                                                 
  Downloading atomist-rugs/rug-editors/maven-metadata.xml ← global (740 bytes) succeeded                                                                                                               
  Downloading atomist-rugs/rug-editors/0.14.0/rug-editors-0.14.0.pom ← rugs (635 bytes) succeeded                                                                                                      
  Downloading atomist-rugs/rug-editors/0.14.0/rug-editors-0.14.0-metadata.json ← rugs (14 kb) succeeded                                                                                                
  Downloading atomist-rugs/rug-editors/0.14.0/rug-editors-0.14.0.zip ← rugs (194 kb) succeeded                                                                                                         
Resolving dependencies for atomist-rugs:rug-editors:latest completed
Loading atomist-rugs:rug-editors:0.14.0 into runtime completed
  TypeScript files added, run `cd .atomist && npm install`                                                                                                                                                      
                                                                                                                                                                                                                
Running editor ConvertExistingProjectToGenerator of atomist-rugs:rug-editors:0.14.0 completed

→ Project
  ~/dev/oss/atomist-docs-samples/ (14 kb in 20 files)

→ Changes
  ├── .atomist/manifest.yml created (223 bytes)
  ├── .atomist/manifest.yml updated (227 bytes)
  ├── .atomist/manifest.yml updated (235 bytes)
  ├── .atomist/manifest.yml updated (235 bytes)
  ├── .atomist/manifest.yml updated (179 bytes)
  ├── .atomist/manifest.yml updated (128 bytes)
  ├── .atomist/manifest.yml updated (113 bytes)
  ├── .atomist/manifest.yml updated (105 bytes)
  ├── .atomist/manifest.yml updated (103 bytes)
  ├── .atomist/package.json created (57 bytes)
  ├── .atomist/tsconfig.json created (627 bytes)
  ├── .atomist/.gitignore created (27 bytes)
  ├── .atomist/editors/NewSpringBootService.ts created (602 bytes)
  ├── .atomist/tests/NewSpringBootService.rt created (153 bytes)
  ├── .atomist/editors/NewSpringBootService.ts updated (580 bytes)
  ├── .atomist/editors/NewSpringBootService.ts updated (583 bytes)
  ├── .atomist/editors/NewSpringBootService.ts updated (584 bytes)
  ├── .atomist/tests/NewSpringBootService.rt updated (155 bytes)
  ├── .atomist/tests/NewSpringBootService.rt updated (880 bytes)
  └── .atomist.yml created (2 kb)
```

The `group_id` and `archive_name` parameters, coupled with the name of the Rug 
generator, define the fully-qualified name of the [Rug archive][rugarch] (the 
published package of a Rug).

[rugarch]: archives.md

Once this is completed, the project should look like this:

```console hl_lines="2 3 4 5 6 7 8 9 10 11"
spring-boot-rest-basic
    ├── .atomist
    │   ├── editors
    │   │   └── NewSpringBootService.ts
    │   ├── .gitignore
    │   ├── manifest.yml
    │   ├── package.json
    │   ├── tests
    │   │   ├── NewSpringBootService.feature
    │   │   └── Steps.ts
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

The `.atomist` directory contains a manifest file,
declares [TypeScript][ts] dependencies in the `package.json` file, and
has the Rug generator script and its associated test in appropriate
subdirectories.

[ts]: https://www.typescriptlang.org/

!!! note ""
    Because all of the Atomist files are hidden under the `.atomist`
    directory, our generator project is still a fully functioning,
    perfectly valid Spring Boot project.

Let's take a close look at the Rug generator script.

## A Basic Generator Script

The generator script's `#!typescript populate` method is invoked after
the model project's files have been copied to the target project.  A
possible generator script for the project discussed above could look like this:

```typescript linenums="1"
import { PopulateProject } from '@atomist/rug/operations/ProjectGenerator'
import { Project } from '@atomist/rug/model/Project'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { Generator, Parameter, Tags } from '@atomist/rug/operations/Decorators'

@Generator("NewSpringBootService", "Rug project for Spring Rest Services")
@Tags("documentation")
class NewSpringBootService implements PopulateProject {

    populate(project: Project) {
        console.log(`Creating ${project.name()}`);
    }
}

export const newSpringBootService = new NewSpringBootService();
```

After importing the TypeScript Rug typings for the elements we will be
using (lines 1&ndash;4), we use a [decorator][] to declare the
following class a generator (line 6).  The first argument to the
`#!typescript @Generator` decorator is the name of the generator.
This is the externally visible and discoverable name of the Rug.  This
name, along with the generators group and repository, form the
fully-qualified name of the generator.  The second argument to the
`#!typescript @Generator` decorator is a brief description of the
generator.  On line 5 we use the `#!typescript @Tags` decorator to
apply some tags to our generator so people can search for it more
easily.  Using the `#!typescript @Tags` decorator is optional but
highly recommended.

[decorator]: https://www.typescriptlang.org/docs/handbook/decorators.html

We define the class that will implement our generator on line 8.  A
generator implements the `#!typescript PopulateProject` interface.
This interface requires the `#!typescript populate(Project)` method to
be defined, which we do on line 10 (more on that below).  It is
convention for the generator and the class that implements it to have
the same name.

In the last line of the generator script we export an instance of that
generator to make it visible to the Rug runtime when it executed (line 15).
Like the generator class name, the name of the `#!typescript const`
does not matter, but it is convention to use the generator/class name,
lower-casing the first letter.

At this stage, the generator does not do anything useful. As explained earlier,
a generator copies the content of the project where it lives into a target 
directory before applying changes. Let's now amend the generator to change the 
name of the copied class. An action users would likely do manually.

```typescript linenums="1"
import { PopulateProject } from '@atomist/rug/operations/ProjectGenerator'
import { Project } from '@atomist/rug/model/Project'
import { File } from '@atomist/rug/model/File'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { Generator, Parameter, Tags } from '@atomist/rug/operations/Decorators'

@Generator("NewSpringBootService", "Rug project for Spring Rest Services")
@Tags("documentation")
class NewSpringBootService implements PopulateProject {

    @Parameter({
        displayName: "Class Name",
        description: "name for the service class",
        pattern: Pattern.java_class,
        validInput: "a valid Java class name, which contains only alphanumeric characters, $ and _ and does not start with a number",
        minLength: 1,
        maxLength: 50,
        required: false
    })
    service_class_name: string;

    populate(project: Project) {
        console.log(`Creating ${project.name()}`);

        project.findFile("src/main/java/com/company/MyRestServiceApplication.java").replace("MyRestService", this.service_class_name)
        project.findFile("src/main/java/com/company/MyRestServiceConfiguration.java").replace("MyRestService", this.service_class_name)
        project.findFile("src/test/java/com/company/MyRestServiceApplicationTests.java").replace("MyRestService", this.service_class_name)
        project.findFile("src/test/java/com/company/MyRestServiceOutOfContainerIntegrationTests.java").replace("MyRestService", this.service_class_name)
        project.findFile("src/test/java/com/company/MyRestServiceWebIntegrationTests.java").replace("MyRestService", this.service_class_name)

        project.replaceInPath("MyRestService", this.service_class_name)
    }
}

export const newSpringBootService = new NewSpringBootService();
```

Rugs, like typical methods, often take parameters to customize their
behavior.  Generators have a required parameter: the name of the
project that will be generated.  The project name parameter is
automatically defined for a generate.  All other parameters used by
the generator must be declared.  Parameters are declared using the
`#!typescript @Parameter` decorator (line 10).  The `#!typescript
@Parameter` decorator provides the metadata for the parameter while
the subsequent instance variable declaration provides the name and
default value, if any.  The `#!typescript @Parameter` decorator
accepts a single argument, a JavaScript object.  The JavaScript object
passed to `#!typescript @Parameter` accepts all of the property names
shown above, but only `pattern` is mandatory.  The `pattern` property
provides an anchored regular expression used to validate user input.
Here we use one the Atomist pre-defined `#!typescript Pattern`s (line
13).  Despite the fact that the other `#!typescript @Parameter`
properties are option, it is highly recommended to provide them to
help consumers of your generator.

The `#!typescript populate` method takes a single argument, a
`#!typescript Project` object.  The `#!typescript Project` provided to
this method contains the contents of the generated project, i.e., all
the files copied from the generator project.  Using this object, you
can alter the exact copy of the original project as appropriate so the
result is the new project with the desired contents.  To effect your
desired changes, you have the power of TypeScript and the Rug
programming model.  

In that regards, as Atomist comprehends filesystem and code structure, the Rug
programming model offers a powerful mechanism to make the above example a lot
less brittle through [path expression][pxe]. By using a path expression to 
navigate the project structure, looking for files, we can tighten the example
as follows:

[pxe]: path-expressions.md

```typescript linenums="1" hl_lines="3 6 26 27 28 29 30"
import { PopulateProject } from '@atomist/rug/operations/ProjectGenerator'
import { Project } from '@atomist/rug/model/Project'
import { File } from '@atomist/rug/model/File'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { Generator, Parameter, Tags } from '@atomist/rug/operations/Decorators'
import { PathExpressionEngine } from '@atomist/rug/tree/PathExpression'

@Generator("NewSpringBootService", "Rug project for Spring Rest Services")
@Tags("documentation")
class NewSpringBootService implements PopulateProject {

    @Parameter({
        displayName: "Class Name",
        description: "name for the service class",
        pattern: Pattern.java_class,
        validInput: "a valid Java class name, which contains only alphanumeric characters, $ and _ and does not start with a number",
        minLength: 1,
        maxLength: 50,
        required: false
    })
    service_class_name: string;

    populate(project: Project) {
        console.log(`Creating ${project.name()}`);

        let eng: PathExpressionEngine = project.context().pathExpressionEngine()
        eng.with<File>(project, '/src//File()[contains(@name, "MyRestService")]', f => {
            f.replace("MyRestService", this.service_class_name)
            f.setPath(f.path().replace("MyRestService", this.service_class_name))
        })
    }
}

export const newSpringBootService = new NewSpringBootService();
``` 

In this example, rather than searching for files, we query the filesystem for
all files containing a specific token in their names (line 27). Then for each 
one of these files, we replace its content (line 28) and move it to different 
path (line 29). 

Rugs should be tested as any other pieces of software, Rug and its runtime 
natively supports a [BDD-centric testing approach][rugtest], based on the 
Gherkin DSL.

[rugtest]: tests.md

The test for our generator could be described as follows in 
`.atomist/tests/NewSpringBootService.feature`:

```gherkin
Feature: Creating new Spring Rest Service projects

Scenario: A default Spring Rest project structure should be generated
 Given an empty project
 
 When running the Spring Boot Service generator
 
 Then the name of the application file is changed
 Then the name of the configuration file is changed
 Then the name of the application tests file is changed
 Then the name of the integration tests file is changed
 Then the name of the web integration tests file is changed

 Then the name of the class in the application file is changed
 Then the name of the class in the configuration file is changed
 Then the name of the class in the application tests file is changed
 Then the name of the class in the integration tests file is changed
 Then the name of the class in the web integration tests is changed
```

Implemented by the steps in `.atomist/tests/Steps.ts` file:

```typescript linenums="1"
import { Given, When, Then, Result, ProjectScenarioWorld } from "@atomist/rug/test/Core";
import { Project } from "@atomist/rug/model/Project";

Given("an empty project", p => {})

When("running the Spring Boot Service generator", (p: Project, world: ProjectScenarioWorld) => {
  let generator = world.generator("NewSpringBootService");
  world.generateWith(generator, {"service_class_name": "CalendarService"});
})

Then("the name of the application file is changed", (p: Project) => 
    p.fileExists("src/main/java/com/company/CalendarServiceApplication.java")
)
Then("the name of the configuration file is changed", (p: Project) => 
    p.fileExists("src/main/java/com/company/CalendarServiceConfiguration.java")
)
Then("the name of the application tests file is changed", (p: Project) => 
    p.fileExists("src/test/java/com/company/CalendarServiceApplicationTests.java")
)
Then("the name of the integration tests file is changed", (p: Project) => 
    p.fileExists("src/test/java/com/company/CalendarServiceOutOfContainerIntegrationTests.java")
)
Then("the name of the web integration tests file is changed", (p: Project) => 
    p.fileExists("src/test/java/com/company/CalendarServiceWebIntegrationTests.java")
)

Then("the name of the class in the application file is changed", (p: Project) => 
    p.findFile("src/main/java/com/company/CalendarServiceApplication.java").contains("CalendarServiceApplication")
)
Then("the name of the class in the configuration file is changed", (p: Project) => 
    p.findFile("src/main/java/com/company/CalendarServiceConfiguration.java").contains("CalendarServiceConfiguration")
)
Then("the name of the class in the application tests file is changed", (p: Project) => 
    p.findFile("src/test/java/com/company/CalendarServiceApplicationTests.java").contains("CalendarServiceApplicationTests")
)
Then("the name of the class in the integration tests file is changed", (p: Project) => 
    p.findFile("src/test/java/com/company/CalendarServiceOutOfContainerIntegrationTests.java").contains("CalendarServiceOutOfContainerIntegrationTests")
)
Then("the name of the class in the web integration tests is changed", (p: Project) => 
    p.findFile("src/test/java/com/company/CalendarServiceWebIntegrationTests.java").contains("CalendarServiceWebIntegrationTests")
)
```

If you're not familiar with this approach, the 
`.atomist/tests/NewSpringBootService.feature` describes our tests in a set of
hypothesis and expectations. All those steps are implemented in the 
`.atomist/tests/Steps.ts` file which is executed when the test is run:

```console
$ rug test
Resolving dependencies for com.company.rugs:spring-boot-service:0.13.0:local completed
OpenJDK 64-Bit Server VM warning: You have loaded library /home/sylvain/libj2v8_linux_x86_64.so which might have disabled stack guard. The VM will try to fix the stack guard now.
It's highly recommended that you fix the library with 'execstack -c <libfile>', or link it with '-z noexecstack'.
Invoking TypeScript Compiler on ts script sources                                                                                                                                                                
  Created .atomist/tests/Steps.js.map                                                                                                                                                                            
  Created .atomist/tests/Steps.js                                                                                                                                                                                
  Created .atomist/editors/NewSpringBootService.js.map                                                                                                                                                           
  Created .atomist/editors/NewSpringBootService.js                                                                                                                                                               
Processing script sources completed
Loading com.company.rugs:spring-boot-service:0.13.0:local completed
  Executing feature Creating new Spring Rest Service projects                                                                                                                                                   
    Executing test scenario A default Spring Rest project structure should be generated                                                                                                                         
  Creating project_name                                                                                                                                                                                         
Running tests in com.company.rugs:spring-boot-service:0.13.0:local completed

Successfully executed 1 of 1 test: Test SUCCESS
```

Assuming we change one the hypothesis to make it fail, `rug` would notify us
with a relevant error message:

```console
$ rug test
Resolving dependencies for com.company.rugs:spring-boot-service:0.13.0:local completed
OpenJDK 64-Bit Server VM warning: You have loaded library /home/sylvain/libj2v8_linux_x86_64.so which might have disabled stack guard. The VM will try to fix the stack guard now.
It's highly recommended that you fix the library with 'execstack -c <libfile>', or link it with '-z noexecstack'.
Invoking TypeScript Compiler on ts script sources                                                                                                                                                                
  Created .atomist/tests/Steps.js.map                                                                                                                                                                            
  Created .atomist/tests/Steps.js                                                                                                                                                                                
  Created .atomist/editors/NewSpringBootService.js                                                                                                                                                               
  Created .atomist/editors/NewSpringBootService.js.map                                                                                                                                                           
Processing script sources completed
Loading com.company.rugs:spring-boot-service:0.13.0:local completed
  Executing feature Creating new Spring Rest Service projects                                                                                                                                                   
    Executing test scenario A default Spring Rest project structure should be generated                                                                                                                         
  Creating project_name                                                                                                                                                                                         
Running tests in com.company.rugs:spring-boot-service:0.13.0:local completed

→ Test Report
  Failures
  └─┬ Creating new Spring Rest Service projects
    └─┬ A default Spring Rest project structure should be generated
      ├─┬ the name of the application file is changed: Failed
      | └── function (p) {
    return p.fileExists("src/main/java/com/company/CalndarServiceApplication.java");
}
      ├── the name of the application tests file is changed: Passed
      ├── the name of the class in the application file is changed: Passed
      ├── the name of the class in the application tests file is changed: Passed
      ├── the name of the class in the configuration file is changed: Passed
      ├── the name of the class in the integration tests file is changed: Passed
      ├── the name of the class in the web integration tests is changed: Passed
      ├── the name of the configuration file is changed: Passed
      ├── the name of the integration tests file is changed: Passed
      └── the name of the web integration tests file is changed: Passed

Unsuccessfully executed 1 of 1 test: Test FAILURE
```

As you can see, Rug generator scripts are simple functions that apply
changes against a freshly copy of your its content. This changes may be 
parametarized to tailor the result to the user's expectations. Finally, 
following a test-driven approach, generators can be quickly validated before
being released.


