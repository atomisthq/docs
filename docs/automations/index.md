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

and makes them available via an automation API.

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
parameters, execute the code, and respond. This lets you focus on
writing your bot command code rather than the ceremony around it.

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

## Automations

The rest of this section describes how to develop and run your own
automations.

### Get started

-   [Setting up your system][prereq] to develop and run
    automations
-   Getting your [first automations running][quick]

### Write your own automations

-   [Commands][command]
-   [Events][event]

### In-depth topics

-   Crafting sophisticated [Slack messages][slack]
-   Using [GraphQL with the automation API][graphql-api]
-   Building and starting an [automation client][client]
-   Understanding the anatomy of an [automation client project][project]
-   [Running an automation client][run].

Once you've finished this section, you'll have everything
you need to eliminate the pain points in your development and delivery
processes.

[prereq]: prerequisites.md (Atomist Automation Prerequisites)
[quick]: quick-start.md (Atomist Automation Quick Start)
[command]: commands.md (Atomist Command Automations)
[event]: events.md (Atomist Event Automations)
[slack]: slack.md (Atomist Automation Slack Messages)
[graphql-api]: graphql.md (Atomist Automation GraphQL)
[client]: client.md (Atomist Automation Client)
[project]: project.md (Atomist Automation Client Project)
[run]: run.md (Running an Atomist Automation Client)
