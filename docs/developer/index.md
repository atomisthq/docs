Atomist is a flexible platform, enabling you to build your own
automations or use those provided by Atomist or third parties.  An
Atomist Software Delivery Machine (SDM) provides a high-level
interface for you to take action when things happen.  In much the same
way your CI build kicks off when you push to your repository, Atomist can
execute tasks like security scans, documentation publication, release
creation, and deployment when different events occur within your
development environment.  Because you're using a real programming
language, not YAML or Bash, and you have access to a real ecosystem,
Node.js, you can create a richer delivery experience than you've even
imagined.

A SDM demonstrates Atomist as the *API for software*, exposing:

-   *What we know*: The Atomist cortex, accessible through GraphQL
    queries and subscription joins
-   *What just happened*: An event, triggered by a GraphQL
    subscription, which is contextualized with the existing knowledge
-   *What you're working on*: A library that enables you to comprehend
    and manipulate the source code you're working on.

The Atomist development automation platform ingests events from your
software development systems:

-   Source code repositories like [GitHub.com][gh]
    and [GitHub Enterprise][ghe]
-   Issue tracking systems like [GitHub][gh-issues] and [Jira][jira]
-   Continuous integration platforms
    like [Travis CI][travis], [CircleCI][circle],
    and [Jenkins][jenkins]
-   Application frameworks like [Spring][spring]
-   Runtime platforms like [Kubernetes][k8] and [Cloud Foundry][cf]
-   Custom events from _any_ other system you use

and makes them available via the Atomist API for software.

As Atomist ingests events, typically via webhook JSON payloads, it
automatically correlates them to each other: commits to pushes to
builds to deployments to running containers. This results in a data
model that represents your development flow.  The Software Delivery Machine subscribes to the most important events,
like a push to source control and a completed build. You can subscribe to more
events and take action when they occur, with the data model providing
the necessary context so your automations can always do the right
thing. 

The development automation platform also provides a simple yet
powerful interface for implementing custom chat bot commands,
also executable from your command line.  Atomist
provides all the infrastructure needed to recognize commands, collect
parameters, execute the code, and respond.  This lets you focus on
writing your command code, not boilerplate code and ceremony
around running bots. Instead of shell scripts that are useful to you, write commands
that help your whole team.

The Atomist automation API can be accessed via any compliant client.
The reference implementation of the client is open source, written
in [TypeScript][ts], and available in
the [sdm-core][sdm-core] GitHub repository and
via [NPM][aac]. Start with our Software Delivery Machines for clean interfaces to
useful automations like delivery, maintaining code standards, and responding to builds.

[gh]: https://github.com (GitHub.com)
[ghe]: https://enterprise.github.com/home (GitHub Enterprise)
[gh-issues]: https://guides.github.com/features/issues/ (Mastering GitHub Issues)
[jira]: https://www.atlassian.com/software/jira (Jira)
[travis]: https://travis-ci.org (Travis CI)
[circle]: https://circleci.com (CircleCI)
[jenkins]: https://jenkins.io/ (Jenkins)
[spring]: https://spring.io/ (Spring)
[k8]: https://kubernetes.io/ (Kubernetes)
[cf]: https://www.cloudfoundry.org/ (Cloud Foundry)
[ts]: https://www.typescriptlang.org/ (TypeScript)
[sdm]: https://github.com/atomist/sdm (Atomist SDM - TypeScript)
[sdm-core]: https://github.com/atomist/sdm-core (Atomist SDM - TypeScript)
[aac]: https://www.npmjs.com/package/@atomist/sdm (Atomist SDM Node Module)

![Atomist Development Automation Platform Architecture](img/atomist-architecture.png)

## Local

While the SDM is most valuable when it is coordinating delivery and
performing commands for your whole team, you can also test and operate
an SDM in local mode, on your laptop, without connecting to the
Atomist API.  Check the [Developer Quick Start][quick-start] for
instructions to get started locally.

[quick-start]: ../quick-start.md (Atomist Developer Quick Start)

---

## Get started

-   [Setting up your system][prereq] to develop and run
    automations like SDMs
-   [Software Delivery Machine][sdm]
-   [Commands][command]
-   [Goals][goal]

## In-depth topics

-   Crafting sophisticated [Slack messages][slack]
-   Using [GraphQL with the automation API][graphql-api]

Once you've finished this section, you'll have everything
you need to eliminate the pain points in your development and delivery
processes.

[goal]: goal.md (Goals)
[prereq]: prerequisites.md (Atomist Automation Prerequisites)
[sdm]: sdm.md (Atomist Software Delivery Machine)
[command]: commands.md (Atomist Command Automations)
[event]: events.md (Atomist Event Automations)
[slack]: slack.md (Atomist Automation Slack Messages)
[graphql-api]: graphql.md (Atomist Automation GraphQL)
