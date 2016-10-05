## The Atomist `Rug` Domain Specific Language

The Rug DSL was designed to work unintrusively alongside your existing projects to automate all the slow, annoying tasks of working in a modern software development environment.

A key design goal was to respect your own tooling as much as possible so that ***every project should be a working Atomist project, and every Atomist project a working project***.

## Rug Artifacts in the `.atomist` directory

Atomist Rug artifacts need to work happily alongside whatever languages, frameworks or other artifacts may be present in your project. For this reason, Rug artifacts are safely contained in a .atomist directory that has the following general structure:


<!-- TBD generator that can create for you a new Blank Atomist project -->

## Key Concepts in Rug

Currently, `Rug` consists of 2 main concepts:

- [Tests](rug-tests.md) - TBD
- [Generators](rug-generators.md)
<!--- [Editors](rug-editors.md)
- [Reviewers](rug-reviewers.md)
- [Predicates](rug-predicates.md)-->
<!-- [Executors](rug-executors.md)-->
