## Core Rug Language Extensions

Rug has a number of in-built language extensions that understand
project concepts and make it *much* simpler to write your Rugs.

Consider the following line:

```rug
with File f
```

`File` here is not a function or a reserved word in Rug, but a `Rug
Language Extension`. Rug Language Extensions are an important part point of Rug, enabling it to
expose a wide range of functionality in a native-seeming way. Language Extensions
support a range of methods that can be used in `with` predicates or
`do` statements.

A number of Rug Language Extensions are currently shipped out of the box including:

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
