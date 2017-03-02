Rug extensions represent different types of source code, events, and
systems which Rug can understand and interact with.  Each Rug
extension defines a set of operations you can use to get and
modify the system or language it represents.

Rug has a number of in-built language extensions that understand
project concepts and make it *much* simpler to write your Rugs.

The following core Rug extensions are natively supported by Rug:

*   [CljProject](clj-project.md) - Clojure projects
*   [CSharpFile](c-sharp-file.md) - C# files
*   [DockerFile](docker-file.md) - Dockerfiles
*   [ElmModule](elm-module.md) - Elm Modules
*   [EveryPom](every-pom.md) - all Maven POM files in a project
*   [File](file.md) - manipulate simple text files
*   [JavaProject](java-project.md) - Java projects
*   [JavaSource](java-source.md) - Java source files
*   [JavaType](java-type.md) - Java classes
*   [Json](json.md) - JSON files
*   [Line](line.md) - manipulate specific lines in a project's files
*   [Pom](pom.md) - projects containing Maven POM files
*   [Project](project.md) - execute operations across a project
*   [Properties](properties.md) - Java properties files
*   [PythonFile](python-file.md) - Python source files
*   [PythonRequirementsTxt](python-requirements-txt.md) - Python `requirements.txt` files
*   [RugArchiveProject](rug-archive-project.md) - Rug projects
*   [RugFile](rug-file.md) - Rug DSL files
*   [ScalaFile](scala-file.md) - Scala files
*   [Services](services.md) - "services", used by executors
*   [SpringBootProject](spring-boot-project.md) - Spring Boot projects
*   [Xml](xml.md) - XML files
*   [Yml](yml.md) - YAML files

You can also write your own Rug extensions.
