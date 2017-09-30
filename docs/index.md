<img style="float:left; margin-top:7px; margin-right:10px; margin-bottom:10px; margin-left:0px;" src="images/atomist-logo.png" height="100px" width="100px" alt="Atomist logo"/>

# Atomist Overview

Atomist enables you to ship software in less time and respond to
operational events more quickly.  By automating tasks, integrating
tools, and providing timely, correlated, and actionable information,
Atomist makes software delivery faster, more standardized, and more
fun.

Timely, correlated, and actionable information results from capturing
your processes and operations in code.  Atomist knows the platforms
and tools you already use: GitHub, Slack, Travis CI.  Atomist
helps you write code that understands your code: Java, C#, JavaScript, Scala, Python, Clojure,
even Dockerfiles and Maven POMs.  Most importantly, Atomist
understands the relationship between your code, your tools, your
environments, and your running services and brings this information to
where you live: chat.

If you spend time upgrading dependencies across multiple repositories,
integrating code repositories and CI, configuring and managing
deployment platforms, figuring out who to ask about an error in a log,
or switching from IDE to chat to web browser ad infinitum, let Atomist
remove the drudgery and reduce the context switching so your team can
focus on what matters: shipping great software.

## Atomist is a Service and an API

The Atomist service consumes events from your systems: source code
repositories, continuous integration servers, deployment platforms,
and chat.  The information from these systems is correlated together:
pushes with builds, artifacts with deployments, stack traces with
commits.  The correlation of these events is then used to
automatically respond: retry a build, start an integration test,
message a committer.

Atomist provides both out of the box automations like our [Slack lifecycle notifications](https://the-composition.com/move-fast-and-dont-break-things-run-development-from-slack-3e4de5318e3f) and an API that you can use to build automations benefiting from its correlated data model. 

The Atomist API is primarily exposed via [GraphQL](http://graphql.org), a sophisticated, standard way of working with connected data. This choice makes it easy to work with the Atomist data model from any popular tech stack, and to explore it via the [GraphiQL browser](https://github.com/graphql/graphiql).

To make working with our client API easy, we provide a `node` [client library](https://github.com/atomist/automation-client-ts) written in TypeScript. 
*We'll be providing other client libraries future.*

***The Atomist service provides:***

-   *the SaaS platform to ingest and correlate events*
-   *a GraphQL API to work with the resulting data model*
-   *a core set of integrations and event responses*
-   *the ability for teams to customize the events, correlation, and
    actions for their existing processes*

## Atomist is events

Within Atomist, all events are captured and actionable.  As events are
consumed from your systems, **event handlers** are triggered.  These
handlers respond to events, by taking action themselves and/or
creating new events, which can in turn trigger other handlers.  Event
handlers can do anything from trigger a deployment of a new version of
your service to page the developer whose commit led to a runtime error
in production to modify code directly to fix errors.

***Atomist events enable you to:***

-   *codify your workflow*
-   *capture best practices in code*
-   *reduce incident time-to-resolution*

## Atomist is code

We've all heard that [software is eating the world][eating].  Atomist
eats software.  Atomist consumes your code, understanding your files,
classes, variables, exceptions and more.  This understanding is used
to modify code directly and to connect code changes to runtime
changes.

[eating]: https://a16z.com/2016/08/20/why-software-is-eating-the-world/

***Atomist is code that:***

-   *understands <span class="highlight">your</span> code*
-   *understands your processes*
-   *understands your operations*
-   *can <span class="highlight">modify</span> your code*

## Atomist ties everything together

Atomist is the next phase in the evolution of software.
Infrastructure-as-code captures infrastructure architecture and
configuration in software.  DevOps automates IT operations with
software.  Atomist goes further, capturing how we develop and operate
software *in software*.  Atomist lets you say goodbye to the boring,
repetitive tasks surrounding software development by giving you the
tools to automate them away, once and for all.

!!! important ""
    <span class="major-point">In a world where everything is code,
    **Atomist** ties everything together.  By bringing software
    development processes, IT operations, and infrastructure-as-code
    together with a deep understanding of the code itself, **Atomist**
    is able to surface the right information to the right person at
    the right time in the right place to speed software delivery and
    stabilize IT operations.</span>

To help you learn more about Atomist, this documentation contains

-   The rest of this overview: Atomist [concepts][]
    and [capabilities][]
-   [Getting Started][getting-started] instructions
-   Learn how to customize Atomist by working through
    our [Tutorials][tutorials]
-   The Atomist [User Guide][user-guide] explaining each part of
    Atomist and how it is used
-   Detailed [Reference Documentation][refdoc]

If you are new to Atomist, we recommend working through
the [Getting Started][getting-started] instructions to get Atomist set
up.  Once you are set up, you can get more information on using
Atomist in the [User Guide][user-guide].  If you are developing new
Atomist functionality and need to answer a technical question,
the [Reference Documentation][refdoc] is probably the best place to
look.

[concepts]: concepts.md (Overview - Atomist Concepts)
[capabilities]: capabilities.md (Overview - Atomist Capabilities)
[getting-started]: getting-started/index.md (Atomist Getting Started)
[tutorials]: tutorials/index.md (Atomist Tutorials)
[user-guide]: user-guide/index.md (Atomist User Guide)
[refdoc]: reference/index.md (Atomist Reference Documentation)

To stay up to date with Atomist, get announcements on new features,
and interact with the Atomist team, please

-   Join the [Atomist Community Slack][slack]
-   Follow our blog, [The Composition][composition]
-   Follow [@atomist][twitter] on Twitter

[slack]: https://join.atomist.com/ (Atomist Community Slack)
[composition]: https://the-composition.com/ (Atomist Blog)
[twitter]: https://twitter.com/atomist (@atomist on Twitter)

We sincerely hope you enjoy using Atomist!
