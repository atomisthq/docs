## The Rug Reference Documentation

The Rug Reference Documentation provides detailed information on Rug,
the Rug Domain Specific Language (DSL), the Rug Command-Line Interface
(CLI), and Rug best practices.

### Kinds of Rugs

Each different kind of Rug provides a different way for you to
interact with a repository.  Rugs can be written using the Rug DSL and
TypeScript.

-   [Handlers](handlers.md): Respond to events
-   [Commands](commands.md): Take action
-   [Editors](editors.md): Add, remove, and edit files
-   [Generators](generators.md): Create new repositories
-   [Reviewers](reviewers.md): Examine a repository for conformance to standards
-   [Path Expressions](path-expressions.md): Select specific elements of projects, files, and code
-   [Microgrammars](microgrammars.md): Specify and work with a custom microgrammar to work effectively with files
-   [Tests](tests.md): BDD test framework for Rugs

### Rug Language Extensions

[Core Rug Language Extensions](extensions/index.md) define a set of core concepts that
Rug understands.  This understanding provides you with an API for
accessing and manipulating these files rather than having to do raw
file manipulation.  See the documentation for each of the [Core Rug Language Extensions](extensions/index.md)
for details on what each API allows you to do.

### Beyond the Rug DSL

When writing Rugs using the Rug DSL you can escape into other
languages if the Core Rug Language Extensions do not provide the functionality you
need.

-   [JavaScript](dsl/javascript.md)

### Rug CLI

The Rug CLI allows you to develop your own Rugs, test, and run them
locally.  The [Rug CLI Reference Documentation][cli] provides
information on each `rug` command.

[cli]: ../rug-cli/index.md


### Rug Conventions

The [Rug Conventions][conventions] provide a set of best practices
when developing Rugs.

[conventions]: /user-guide/rug/conventions.md
