## Core Rug Types

Rug has a number of in-built language extensions that understand project concepts
and make it *much* simpler to write your
Rug [tests][], [generators][], [editors][], reviewers (coming soon)
and executors (coming soon).

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

*   [Project](rug-core-types-project.md) - execute operations across a project.
*   [JavaProject](rug-core-types-java-project.md) - work with Java projects.
*   [SpringBootProject](rug-core-types-spring-boot-project.md) - work with Spring Boot projects.
*   [CljProject](rug-core-types-clj-project.md) - work with Clojure projects.
*   [RugArchiveProject](rug-core-types-rug-archive-project.md) - work with Rug archive projects.
*   [Line](rug-core-types-line.md) - manipulate specific lines in a project's files.
*   [File](rug-core-types-file.md) - manipulate simple text files.
*   [Xml](rug-core-types-xml.md) - manipulate XML files.
*   [Pom](rug-core-types-pom.md) - work with projects containing Maven POM files.
*   [Yml](rug-core-types-yml.md) - work with YAML files.
*   [Properties](rug-core-types-properties.md) - work with Java properties files.
*   [Json](rug-core-types-json.md) - work with JSON files.
*   [PackageJson](rug-core-types-package-json.md) - work with projects containing package.json files.
*   [JavaSource](rug-core-types-java-source.md) - work with Java source files.
*   [JavaType](rug-core-types-java-type.md) - work with Java classes.
*   [ElmModule](rug-core-types-elm-module.md) - work with Elm Modules.
*   [DockerFile](rug-core-types-docker-file.md) - work with Dockerfiles.
*   [PythonFile](rug-core-types-python-file.md) - work with Python source files.
*   [PythonRequirementsTxt](rug-core-types-python-requirements-txt.md) - work with Python `requirements.txt` files.
*   [Services](rug-core-types-services.md) - work with "services", used by executors.
