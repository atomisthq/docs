Rug extensions represent different types of source code, events, and
systems which Rug can understand and interact with.  Each Rug
extension defines a set of operations you can use to get and
modify the system or language it represents.

Rug ships with a number of extensions for basic concepts around
projects, file systems, and common languages, making it *much* simpler
to begin writing your Rugs.  More information on the various
extensions that ship with Rug and the methods they make available can
be found in the [extension reference documentation][typedoc].  Here
are some of the useful extensions that ship with Rug:

-   [CSharpFile][] - C# files
-   [File][] - text files
-   [JavaProject][] - Java projects
-   [JavaSource][] - Java source files
-   [JavaType][] - Java classes
-   [Line][] - manipulate specific lines in a project's files
-   [Pom][] - projects containing Maven POM files
-   [Project][] - execute operations across a project
-   [Properties][] - Java properties files
-   [PythonFile][] - Python source files
-   [PythonRequirementsTxt][] - Python `requirements.txt` files
-   [ScalaFile][] - Scala files
-   [SpringBootProject][] - Spring Boot projects
-   [Xml][] - XML files
-   [YamlFile][] - YAML files

[CSharpFile]: http://apidocs.atomist.com/typedoc/interfaces/csharpfile.html
[File]: http://apidocs.atomist.com/typedoc/interfaces/file.html
[JavaProject]: http://apidocs.atomist.com/typedoc/interfaces/javaproject.html
[JavaSource]: http://apidocs.atomist.com/typedoc/interfaces/javasource.html
[JavaType]: http://apidocs.atomist.com/typedoc/interfaces/javatype.html
[Line]: http://apidocs.atomist.com/typedoc/interfaces/line.html
[Pom]: http://apidocs.atomist.com/typedoc/interfaces/pom.html
[Project]: http://apidocs.atomist.com/typedoc/interfaces/project.html
[Properties]: http://apidocs.atomist.com/typedoc/interfaces/properties.html
[PythonFile]: http://apidocs.atomist.com/typedoc/interfaces/pythonfile.html
[PythonRequirementsTxt]: http://apidocs.atomist.com/typedoc/interfaces/pythonrequirementstxt.html
[ScalaFile]: http://apidocs.atomist.com/typedoc/interfaces/scalafile.html
[SpringBootProject]: http://apidocs.atomist.com/typedoc/interfaces/springbootproject.html
[Xml]: http://apidocs.atomist.com/typedoc/interfaces/xml.html
[YamlFile]: http://apidocs.atomist.com/typedoc/interfaces/yamlfile.html

The following links contain information on testing classes,
interfaces, and functions:

-   [CommandHandlerScenarioWorld][] - "world" in which command handler tests run
-   [EventHandlerScenarioWorld][] - "world" in which event handler tests run
-   [ProjectScenarioWorld][] - "world" in which editor and generator tests run
-   [Steps][] - [Gherkin][] steps
-   [Helper Functions][helpers] - debugging helper functions

[CommandHandlerScenarioWorld]: http://apidocs.atomist.com/typedoc/interfaces/commandhandlerscenarioworld.html
[EventHandlerScenarioWorld]: http://apidocs.atomist.com/typedoc/interfaces/eventhandlerscenarioworld.html
[ProjectScenarioWorld]: http://apidocs.atomist.com/typedoc/interfaces/projectscenarioworld.html
[Steps]: http://apidocs.atomist.com/typedoc/interfaces/definitions.html
[Gherkin]: https://github.com/cucumber/cucumber/wiki/Given-When-Then
[helpers]: http://apidocs.atomist.com/typedoc/globals.html#dump

You can also write your own Rug extensions.
