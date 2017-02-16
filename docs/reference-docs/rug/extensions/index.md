## Core Rug Languge Extensions

Rug has a number of in-built language extensions that understand
project concepts and make it *much* simpler to write your
Rug [tests][], [generators][], [editors][], and reviewers (coming
soon).

[tests]: ../rug-tests.md
[generators]: ../rug-generators.md
[editors]: ../rug-editors.md

Consider the following line:

```
with File f
```

`File` here is not a function or a reserved word in Rug, but a `Rug
Language Extension`. Rug Language Extensions are an important part point of Rug, enabling it to
expose a wide range of functionality in a native-seeming way. Language Extensions
support a range of methods that can be used in `with` predicates or
`do` statements.

A number of Rug Language Extensions are currently shipped out of the box including:

*   [CljProject](rug-extension-clj-project.md) - Clojure projects
*   [CSharpFile](rug-extension-c-sharp-file.md) - C# files
*   [DockerFile](rug-extension-docker-file.md) - Dockerfiles
*   [ElmModule](rug-extension-elm-module.md) - Elm Modules
*   [EveryPom](rug-extension-every-pom.md) - all Maven POM files in a project
*   [File](rug-extension-file.md) - manipulate simple text files
*   [JavaProject](rug-extension-java-project.md) - Java projects
*   [JavaSource](rug-extension-java-source.md) - Java source files
*   [JavaType](rug-extension-java-type.md) - Java classes
*   [Json](rug-extension-json.md) - JSON files
*   [Line](rug-extension-line.md) - manipulate specific lines in a project's files
*   [Pom](rug-extension-pom.md) - projects containing Maven POM files
*   [Project](rug-extension-project.md) - execute operations across a project
*   [Properties](rug-extension-properties.md) - Java properties files
*   [PythonFile](rug-extension-python-file.md) - Python source files
*   [PythonRequirementsTxt](rug-extension-python-requirements-txt.md) - Python `requirements.txt` files
*   [RugArchiveProject](rug-extension-rug-archive-project.md) - Rug projects
*   [RugFile](rug-extension-rug-file.md) - Rug DSL files
*   [ScalaFile](rug-extension-scala-file.md) - Scala files
*   [Services](rug-extension-services.md) - "services", used by executors
*   [SpringBootProject](rug-extension-spring-boot-project.md) - Spring Boot projects
*   [Xml](rug-extension-xml.md) - XML files
*   [Yml](rug-extension-yml.md) - YAML files
