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
with file f
```

`file` here is not a function or a reserved word in Rug, but a `Rug
Type`. Types are an important extension point of Rug, enabling it to
expose a wide range of functionality in a native-seeming way. Types
support a range of methods, which can be used in `with` predicates or
`do` statements.

A number of types are shipped out of the box including:

*   [The project Type](rug-core-types-project.md) - execute operations across a project. Default starting point type passed to [Rug editors](../rug-editors.md).
*   [The java.project Type](rug-core-types-java-project.md) - work with Java projects.
*   [The spring.bootProject Type](rug-core-types-spring-boot-project.md) - work with Spring Boot projects.
*   [The clj.project Type](rug-core-types-clj-project.md) - work with Clojure projects.
*   [The line Type](rug-core-types-line.md) - manipulate specific lines in a project's files.
*   [The file Type](rug-core-types-file.md) - manipulate simple text files.
*   [The xml Type](rug-core-types-xml.md) - manipulate XML files.
*   [The pom Type](rug-core-types-pom.md) - work with projects containing Maven POM files.
*   [The yml Type](rug-core-types-yml.md) - work with YAML files.
*   [The properties Type](rug-core-types-properties.md) - work with Properties files.
*   [The package.json Type](rug-core-types-package-json.md) - work with projects containing package.json files.
*   [The java.source Type](rug-core-types-java-source.md) - work with Java source files.
*   [The java.class Type](rug-core-types-java-class.md) - work with Java classes.
*   [The elm.module Type](rug-core-types-elm-module.md) - work with Elm Modules.
*   [The docker Type](rug-core-types-docker.md) - work with Dockerfiles.
