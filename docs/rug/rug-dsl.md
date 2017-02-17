## Rug Language

In a nutshell, Rug is an
[External Domain Specific Language](http://martinfowler.com/books/dsl.html).

The Rug DSL was designed to work alongside your existing projects in
as unintrusive a fashion as possible to automate all the slow,
annoying tasks of working in a modern software development
environment.

A key design goal was to respect your own tooling as much as possible
so that ***every project should be a working Atomist project, and
every Atomist project a working project***.

### Why a New Language?

Writing a language is hard, and there are already a *lot* of languages
out there! So why do we need yet another one? Well the fact is that
originally we didn't actually start out to create one. At Atomist we
had a simple mission to:

> ***Simplify*** your Software Development Life by ***removing the
> annoyances*** of ***Creating***, ***Maintaining*** and ***Running***
> your software.

It turns out there are a ***lot of annoyances***, which was great as
there was so much we could help with!

From the delay between deciding to create a project and getting
everything all set up so you can get creating, through to helping
teams adopt best practices. It became very obvious to us that
***nothing so far had hit these full-development-cycle problems*** and
so that's what we wanted to do.

And then there was the ***microservices architectural style*** that
***took these annoyances and turned them up to 11!***

We worked our way through these annoyances, examining them every step,
created tools where we needed, created languages as well, and the
result so far is ***Rug.***

> ***Rug ties your software development room together.***

### What Rug is, and is not

Rug is a **simple**, English-like, **DSL** that provides a way to...

*   **Select and manipulate** files, projects and even
    multiple-projects.
*   **Compose** operations to maximize reuse.
*   **Declare parameters** to allow automated gathering of valid user
    input to drive operations.

Quite simply, Rug and its supporting systems are ***"Software that
Writes and Evolves Software".***

Rug is not a full-blown language with a complete set of control
structures as this is not its purpose.

### Key Rug Concepts

To keep Rug focussed and simple, there are only 7 concepts in Rug
itself:

*   [Generators](/reference-docs/rug/rug-generators.md), which can be used to
    create new projects from an existing model project.
*   [Editors](/reference-docs/rug/rug-editors.md), which are used to make
    principled changes to a single project
*   Templates, content used by
    [generators](/reference-docs/rug/rug-generators.md)
    and [editors](/reference-docs/rug/rug-editors.md))
*   Reviewers (coming soon), which can inspect projects and match on
    patterns, but can't change them
*   Executors (coming soon), which enable you to take coordinated actions
    across multiple projects
*   Handlers (coming soon), which are triggered by events in your software
    development lifecycle
*   [Tests](/reference-docs/rug/rug-tests.md) (and a simple but powerful
    test-driven environment so that you can have real confidence in
    your Rug scripts)

### Rug and the Atomist (Ro)Bot

With Rug we wanted a way to create a system that actually helped you
create and evolve your software projects as quickly, and as correctly
as possible. We assumed from the get-go that you were developing in a
polyglot environment, and so anything we created had to be open to
working with whatever artifacts you needed to create.

To this end we created a Bot and a collection of services that allow
you to run Rug in a number of different useful settings.

### Rug is Evolving *Fast*, but that's *OK*

We're developing the Rug language to be as powerful, simple
and consistent as possible. Normally languages cannot evolve
particularly quickly as they need to be updated in lock-step with the
community that is using them. When you create
a [Rug project](rug-archive.md) and write your Rug generators, editors
etc. within it you tie the version of the language to the project
you're creating.

This gives you the power to select the version of the Rug language you
depend upon, safe in the knowledge that if you can run your Rug build
your Rug scripts locally with the version of Rug you wrote them to,
they can be run anywhere Rug can be.

You also of course have the power to decide when you upgrade to a
newer version of Rug for particular language features that may have
come to light after you originally created your Rug project. As we
 evolve the languages, we'll create Rug editors to do this upgrade programatically!

### Rug can be Extended with Rug Language Extensions

There is already a *lot* of power in
the [Core Rug Language Extensions](/reference-docs/rug/extensions/index.md) that are built
into the Rug language but the intention is not for this to be the
only, exhaustive set of types you can use.

Rug itself can be extended with new language extensions for new languages,
frameworks or even systems.

> NOTE: More complete documentation on how to extend, package and
> distribute Rug Language Extensions is coming soon.

If you want to see some Rugs, check out the rug projects in [atomist-rugs](https://github.com/atomist-rugs).
