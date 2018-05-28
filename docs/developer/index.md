Atomist is a flexible platform, enabling you to build your own
automations or use those provided by Atomist or third parties.  An
Atomist Software Delivery Machine (SDM) provides a high-level
interface for you to take action when things happen.  In much the same
way your CI build kicks off when you push to your SCM, Atomist can
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
model that represents your development flow.  You can subscribe to
events and take action when they occur, with the data model providing
the necessary context so your automations can always do the right
thing.

The development automation platform also provides a simple yet
powerful interface for implementing custom chat bot commands.  Atomist
provides all the infrastructure needed to recognize commands, collect
parameters, execute the code, and respond.  This lets you focus on
writing your bot command code, not boilerplate code and ceremony
around running bots.

The Atomist automation API can be accessed via any compliant client.
The reference implementation of the client is open source, written
in [TypeScript][ts], and available in
the [automation-client-ts][client-ts] GitHub repository and
via [NPM][aac].  The reference client provides local testing tools, a
CLI, interactive querying of the data model, and interfaces for
implementing your own automations.

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
[client-ts]: https://github.com/atomist/automation-client-ts (Atomist Automation Client - TypeScript)
[aac]: https://www.npmjs.com/package/@atomist/automation-client (Atomist Automation Client Node Module)

![Atomist Development Automation Platform Architecture](img/atomist-architecture.png)

## GraphQL

The Atomist automation API provides you access to the events and data
from your development platforms using [GraphQL][graphql], a
widely-used query language and runtime for APIs.

You can use GraphQL with the Atomist automation API for:

1.  Queries that fetch data directly
2.  Subscriptions to register the types of events you want to receive
3.  Mutations to change data and make connections

[graphql]: http://graphql.org/ (GraphQL)

## WebSockets

Unlike most API clients, an Atomist automation client must maintain
contact with the API server so that it can receive the events and
commands it's interested in as they occur.

Automation clients access the Atomist automation API via
a [WebSocket][ws] connection.  WebSockets allow the API server to send
events and commands to the client without constant polling via HTTP
calls and without requiring clients to open up firewall holes. The
WebSocket connection is initiated by the automation client when it
starts up, establishing a persistent two-way communication channel
between the automation client and API that is resilient to
interruptions in connectivity.

[ws]: https://en.wikipedia.org/wiki/WebSocket (WebSocket)

---

## Get started

-   [Setting up your system][prereq] to develop and run
    automations like SDMs
-   [Software Delivery Machine][sdm]
-   [Commands][command]
-   [Events][event]

## In-depth topics

-   Crafting sophisticated [Slack messages][slack]
-   Using [GraphQL with the automation API][graphql-api]
-   Creating, building, and starting an [automation client][client]
-   [Running an automation client][run].

Once you've finished this section, you'll have everything
you need to eliminate the pain points in your development and delivery
processes.

[prereq]: prerequisites.md (Atomist Automation Prerequisites)
[sdm]: sdm.md (Atomist Software Delivery Machine)
[command]: commands.md (Atomist Command Automations)
[event]: events.md (Atomist Event Automations)
[slack]: slack.md (Atomist Automation Slack Messages)
[graphql-api]: graphql.md (Atomist Automation GraphQL)
[client]: client.md (Atomist Automation Client)
[run]: run.md (Running an Atomist Automation Client)
