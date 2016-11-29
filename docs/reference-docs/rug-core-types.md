
## Core Rug Types

Rug has a number of in-built types that understand project concepts and make it *much* simpler to write your Rug [tests](rug-tests.md), [generators](rug-generators.md), [editors](rug-editors.md), reviewers (coming soon) and executors (coming soon).

Consider the following line:

```
with file f
```

`file` here is not a function or a reserved word in Rug, but a `Rug Type`. Types are an important extension point of Rug, enabling it to expose a wide range of functionality in a native-seeming way. Types support a range of methods, which can be used in `with` predicates or `do` statements.

A number of types are shipped out of the box including:

* [The project Type](rug-core-types-project.md) - useful for executing operations across a while project. Default starting point type passed to [Rug editors](rug-editors.md).
* [The java.project Type](rug-core-types-java-project.md) - useful for working specifically with Java projects.
* [The spring.bootProject Type](rug-core-types-spring-boot-project.md) - useful for working specifically with Spring Boot projects.
* [The clj.project Type](rug-core-types-clj-project.md) - useful for working with Clojure projects.
* [The line Type](rug-core-types-line.md) - useful for manipulating specific lines in a project's files.
* [The file Type](rug-core-types-file.md) - useful for manipulating simple text files.
* [The xml Type](rug-core-types-line.md) - useful for manipulating XML files.
* [The POM Type](rug-core-types-pom.md) - useful for working with projects containing Maven POM files.
* [The package.json Type](rug-core-types-package-json.md) - useful for working with projects containing package.json files.
* [The yml Type](rug-core-types-yml.md) - useful for working with YML files.
* [The properties Type](rug-core-types-properties.md) - useful for working with Properties files.
* [The java.source Type](rug-core-types-java-source.md) - useful for working with Java source files.
* [The java.class Type](rug-core-types-java-class.md) - useful for working with Java classes.
* [The elm.module Type](rug-core-types-elm-module.md) - useful for working with Elm Modules.
* [The docker Type](rug-core-types-docker.md) - useful for working with projects that are packaged and deployed using Docker.
