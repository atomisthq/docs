## The Rug Reference Documentation

The Rug Reference Documentation provides detailed information on Rug,
the Rug Domain Specific Language (DSL), the Rug Command-Line Interface
(CLI), and Rug best practices.

### Kinds of Rugs

Each different kind of Rug provides a different way for you to
interact with a repository.  Rugs can be written using the Rug DSL and
TypeScript.

-   [Rug Editors](rug-editors.md): Add, remove, and edit files
-   [Rug Generators](rug-generators.md): Create new repositories
-   [Rug Predicates](rug-predicates.md): Determine whether a feature exists in a repository
-   Rug Reviewers (coming soon): Examine a repository for conformance to standards
-   Rug Executors (coming soon): Apply any of the above Rugs to multiple repositories at once

### Rug Core Types

[Rug Core Types](types/index.md) define a set of core file types that
Rug understands.  This understanding provides you with an API for
accessing and manipulating these files rather than having to do raw
file manipulation.  See the documentation for each of the core types
for details on what each API allows you to do.

### Beyond the Rug DSL

When writing Rugs using the Rug DSL, you can escape into other
languages if the Rug Core Types do not provide the functionality you
need.

-   [Javascript](escape/rug-javascript.md)
-   [Clojure](escape/rug-clojure.md)

### Rug CLI

The Rug CLI allows you to develop your own Rugs, test, and run them
locally.  The [Rug CLI Reference Documentation][cli] provides
information on each `rug` command.

[cli]: rug-cli-commands.md


### Rug Conventions

The [Rug Conventions][conventions] provide a set of best practices
when developing Rugs.

[conventions]: rug-conventions.md
