## Core Rug Types

Rug has a number of in-built types that understand project concepts
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
Type`. Types are an important extension point of Rug, enabling it to
expose a wide range of functionality in a native-seeming way. Types
support a range of methods, which can be used in `with` predicates or
`do` statements.

A number of types are shipped out of the box including:

*   [The Project Type](rug-core-types-project.md) - execute operations across a project. Default starting point type passed to [Rug editors](../rug-editors.md).
*   [The JavaProject Type](rug-core-types-java-project.md) - work with Java projects.
*   [The SpringBootProject Type](rug-core-types-spring-boot-project.md) - work with Spring Boot projects.
*   [The CljProject Type](rug-core-types-clj-project.md) - work with Clojure projects.
*   [The Line Type](rug-core-types-line.md) - manipulate specific lines in a project's files.
*   [The File Type](rug-core-types-file.md) - manipulate simple text files.
*   [The Xml Type](rug-core-types-xml.md) - manipulate XML files.
*   [The Pom Type](rug-core-types-pom.md) - work with projects containing Maven POM files.
*   [The Yml Type](rug-core-types-yml.md) - work with YAML files.
*   [The Properties Type](rug-core-types-properties.md) - work with Properties files.
*   [The PackageJson Type](rug-core-types-package-json.md) - work with projects containing package.json files.
*   [The JavaSource Type](rug-core-types-java-source.md) - work with Java source files.
*   [The JavaClass Type](rug-core-types-java-class.md) - work with Java classes.
*   [The ElmModule Type](rug-core-types-elm-module.md) - work with Elm Modules.
*   [The Docker Type](rug-core-types-docker.md) - work with Dockerfiles.
