## What goes in an Atomist Archive?

A key design goal was to respect your own tooling as much as possible so that ***every project should be a working Atomist project, and every Atomist project is a working project***.

The Atomist Rug DSL was designed to work unintrusively alongside your existing projects to automate all the slow, annoying tasks of working in a modern software development environment.

Atomist's Rug DSL can be expressed and packaged alongside your existing projects. A project that has a `.atomist` directory, along with some other artifacts that we'll explain here, is referred to as a `Rug Archive`.

### Exploring a very basic Rug Archive

A very basic `Rug Archive`, along with some example `Rug` scripts and other bits and pieces, is provided by creating a new project based on the Rug Archive project template.

<!-- You can use the following link to create your own Rug-based project with Atomist: -->

<!--After using the previous button to create a new project based on the `[Rug Archive project template]`(https://github.com/atomist-project-templates/rug-archive) and you should see something like the following in your own new project:-->

To save time we've already used this project template to create a basic [Rug Archive sample project](https://github.com/atomist-project-templates/rug-archive-sample) with the following contents:

```
mvnw
README.md
mvnw.cmd
  /.atomist
    pom.xml
    assembly.xml
    /tests
    /editors
    /reviewers
    /executors
    /templates
 /.mvn
```

### The `.atomist` directory

Atomist Rug artifacts need to work happily alongside whatever languages, frameworks or other artifacts may be present in your project. For this reason, Rug artifacts are safely contained in a `.atomist` directory that has the following general structure:

```
mvnw <-- Packaged Maven script
README.md <-- README for your
mvnw.cmd <-- Packaged Maven script for those working on Windows
  /.atomist
    pom.xml <-- Pom that describes dependencies for the scripts in the Rug Archive itself, including the version of the Rug language itself!
    assembly.xml
    /tests <-- Contains BDD-style tests for your Rug Scripts, with extensions of `rt`
    /editors  <-- Contains Rug scripts and associated conditional Predicates that will edit projects, or generate new ones
    /reviewers < Contains Rug scripts that will provide feedback on existing projects
    /executors <-- Contains Rug scripts that will work across multiple repositories
    /templates <-- Velocity or Mustache (TBD links) templates that are used by editors
 /.mvn <-- More packaged maven infrastructure (TBD maven link)
```

### Next steps

* [Explore the syntax of Rug tests](rug-tests.md)
* [Explore the syntax of Rug editors](rug-editors.md)
* [Explore the syntax of Rug generators](rug-generators.md)
