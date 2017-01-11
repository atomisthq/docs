## What goes in an Atomist Archive?

A key design goal was to respect your own tooling as much as possible
so that ***every project should be a working Atomist project, and
every Atomist project is a working project***.

The Atomist Rug DSL was designed to work unintrusively alongside your
existing projects to automate all the slow, annoying tasks of working
in a modern software development environment.

Atomist's Rug DSL can be expressed and packaged alongside your
existing projects. A project that has a `.atomist` directory, along
with some other artifacts that we'll explain here, is referred to as a
*Rug archive*.

### Exploring a very basic Rug Archive

A very basic Rug archive, along with some example Rug scripts and
other bits and pieces, is provided by creating a new project using
the [Rug archive project generator][rug-generator].  You can run this
generator using the Atomist Button below.

[rug-generator]: https://github.com/atomist-rugs/rug-editors

[<img src="https://images.atomist.com/button/create-project.png" width="267" alt="Get Started with Atomist"/>](https://api.atomist.com/v1/projects/generators/99515d85-80ad-4e97-bf26-ed5a5406da05)

The resulting project will have the following contents:

```
README.md
.atomist/
  pom.xml
  assembly.xml
  tests/
  editors/
  reviewers/
  executors/
  templates/
.atomist.yml
```

The `README.md` is a standard project README file.  The
`atomist.yml` file provides information on what Rugs have operated
on the repo.  The contents of the `.atomist` directory are described
in the next section.

### The `.atomist` directory

Atomist Rug artifacts need to work happily alongside whatever
languages, frameworks or other artifacts may be present in your
project. For this reason, Rug artifacts are safely contained in a
`.atomist` directory that has the following general structure:

```
.atomist/
  manifest.yml <= Metadata for the Rug archive
  editors/     <= Rugs providing editors, generators, and conditional predicates
  executors/   <= Rugs that will work across multiple repositories
  reviewers/   <= Rugs that will provide feedback
  templates/   <= Templates  used by Rugs
  tests/       <= BDD-style tests for your Rugs
```

Files in the `editors`, `executors`, and `reviewers` directory use the
`.rug` extension if they are using the Rug DSL or the `.ts` extension
if they are written in TypeScript.

The templates in the `templates` directory can be
either [Velocity][velocity] templates with a `.vm` extension
or [Mustache][mustache] templates with a `.mustache` extension.

[velocity]: http://velocity.apache.org/
[mustache]: https://mustache.github.io/

Rug tests use the `.rt` extension.

### Next steps

*   [Explore the syntax of Rug tests](/reference-docs/rug/rug-tests.md)
*   [Explore the syntax of Rug editors](/reference-docs/rug/rug-editors.md)
*   [Explore the syntax of Rug generators](/reference-docs/rug/rug-generators.md)
