## Introduction to Atomist Project Editors

Atomist Project Editors act against a project repository, known to Atomist, in order to create a Pull Request to update and evolve the project in some useful way.

Some project editors are generic and unrelated to any specific technology: For example, superfork, which is used to convert a repository into an Atomist Project Template.

Others are technology specific, such as Spring "starter" editors, which apply Spring boot starters to projects.

Still further, many Atomist Project Templates and repositories come with [packaged `rug` DSL project editors](/reference-docs/rug.md) also.

### Invoking an Atomist Project Editor

Editors are normally invoked using the Atomist bot. For example, in the appropriate project channel:

```
@atomist edit project Hystrix
```

In this case, `Hystrix` is the name of the editor.

> ***NOTE:***: Atomist will support recognition of editor tags in the future, making it possible to invoke an editor without knowing its name.

### Generic Editors

These editors are not specific to any technology:

* ***superfork***: Turns an existing project into a template, converting the project's directory structure to that required for a template in which all project content is static content under the /project directory. A basic /meta/info.yml file is also created containing a name parameter.

### Spring Starter Editors

Atomist supports all [Spring starters](http://start.spring.io) out of the box. This can only be applied to detected Spring Boot projects.

### Java Project Editors

* ***Java-superfork***: Extends the behavior of a superfork to parameterize the base package, if a single base package is found.
* ***Extract Microservice (Feign Proxify)***: When pointed at an existing Java interface will convert to a Feign Proxy, introduce the requisite dependencies, and then generate a new project to implement that interface as a separate, extracted, microservice.

### You might also be interested in...

* [Authoring Editors and Reviewers with the Atomist DSL](/reference-docs/rug.md)