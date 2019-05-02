If you're working with microservices, at a sufficiently large organization, or just need some uniformity around the repositories your team creates, a [_project generator_](http://localhost:8000/developer/create/) can help you establish a consistent and reproducible framework for your projects.

A project generator is a type of [command](http://localhost:8000/developer/commands/) which takes a template repository and creates a brand new one from it. It's different from forking in that the generated repository shares no Git history with the original template: it's literally just a copy. These templates repositories are also called _seeds_.

In this example, we'll set up a project generator that takes a Java Spring project with some Maven dependencies configured. (You can generate a project from a seed in any language.)

## Prerequisites

We'll be using the [atomist-seeds/spring-rest](https://github.com/atomist-seeds/spring-rest) repository as our seed. Please don't use this seed for your own Spring projects, as this is just a demo app (and likely full of outdated packages!).
