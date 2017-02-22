<img style="float:left; padding-top:7px; padding-right:10px; padding-bottom:15px;" src="images/atomist-logo.png">

# Atomist Overview

Atomist enables you to ship software in less time and respond to
operational events more quickly.  By automating tasks, integrating
tools, and putting timely, correlated, and actionable information in
front of your team, Atomist makes software development and operational
response faster, more standardized, and more fun.

Timely, correlated, and actionable information results from capturing
your processes and operations in code.  Atomist knows the platforms
and tools you already use: from GitHub to BitBucket, from Trello to
Jira, from Travis CI to Jenkins, from Kubernetes to Spinnaker.
Atomist understands your code: Java, C#, JavaScript, Scala, Python,
Clojure, even Dockerfiles and POMs.  Most importantly, Atomist
understands the relationship between your code, your tools, your
environments, and your running services and brings this information to
your team members where they live: chat.

If your team spends time upgrading dependencies across multiple
repositories, integrating code repositories and CI, configuring and
managing deployment platforms, figuring out who to ask about an error
in a log, or switching from IDE to chat to web browser ad infinitum,
let Atomist remove the drudgery and reduce the context switching so
your team can focus on what matters: shipping great software.

## Atomist Is SaaS

The Atomist managed service consumes events from your systems: source
code repositories, continuous integration servers, deployment
platforms, and chat.  The information from these systems is correlated
together: pushes with builds, artifacts with deployments, stack traces
with commits.  The correlation of these events is then used to
automatically respond: retry a build, start an integration test,
message a committer.

***The Atomist managed service provides:***

-   *the SaaS platform to ingest and correlate events*
-   *a core set of integrations and event responses*
-   *the ability for teams to customize the events, correlation, and
    actions for their existing processes*

## Atomist Is Events

Within Atomist, all events are captured and actionable.  As events are
consumed from your systems, event handlers are triggered.  These
handlers respond to events, by taking action themselves and/or
creating new events, which can in turn trigger other handlers.  Event
handlers can do anything from trigger a deployment of a new version of
your service to page the developer whose commit led to a runtime error
in production to modify code directly to fix errors.

***Atomist events enable you to:***

-   *codify your workflow*
-   *capture best practices in code*
-   *reduce incident time-to-resolution*

## Atomist Is Code

We've all heard that [software is eating the world][eating].  Atomist
eats software.  Atomist consumes your code, understanding your files,
classes, variables, exceptions and more.  This understanding is used
to modify code directly and to connect code changes to runtime
changes.

Atomist is the next step in the evolution of software.
Infrastructure-as-code captures infrastructure architecture and
configuration in software.  DevOps automates IT operations with
software.  Atomist goes further, capturing how we develop and operate
software *in software*.  Atomist lets you say goodbye to the boring,
repetitive tasks surrounding software development by giving you the
tools to automate them away, once and for all.

[eating]: https://a16z.com/2016/08/20/why-software-is-eating-the-world/

***Atomist is code that:***

-   *understands <span class="highlight">your</span> code*
-   *understands your processes*
-   *understands your operations*
-   *can <span class="highlight">modify</span> your code*

----

!!! important ""
    <span class="major-point">In a world where everything is code,
    **Atomist** ties everything together.  By bringing software
    development processes, IT operations, and infrastructure-as-code
    together with a deep understanding of the code itself, **Atomist**
    is able to surface the right information to the right person at
    the right time in the right place to increase the reliability of
    your software and reduce the frequency and duration of service
    interruptions.</span>

To help you learn more about Atomist, this documentation contains

-   A [Getting Started guide][getting-started]
-   Several [Quick Start guides][quick]
-   Detailed [Reference Documentation][refdoc]

[getting-started]: getting-started/index.md
[quick]: quick-starts/index.md
[refdoc]: reference-docs/index.md

You can also stay up to date with Atomist by following our
blog, [The Composition][composition].

[composition]: https://medium.com/the-composition

<!--
## Rug is the runtime
### Events flow in and out
### Operations respond to events
#### Alerting developers
#### Releasing software
#### Modifying code
#### Testing integrations
## Integrations (get events, call APIs/commands)
## Cortex
## Bot, button and CLI interfaces - but the real power is when no interface is needed, i.e., full automation of responses to events
## CLI for building and testing Rugs


Atomist is all about high quality productivity for your software.
Whether it be working with large legacy codebases, your own "majestic
monoliths" or aiming for "zero overhead microservices", Atomist
provides the tools that allow you to turn your development speed up as
high as it can go.

Atomist helps you develop better software more quickly by automating
common tasks in software development and operation.  This automation
takes several forms:

-   Creating a RESTful microservice with a single click using an
    Atomist Button.
-   Using Rug editors to perform common tasks on your source code
    repository, e.g., configuring and enabling a [Travis CI][travis]
    build or updating a [Docker][docker] base image to the desired
    version.
-   Ensuring a project conforms with your standards using a Rug
    reviewer.
-   Managing a service life cycle, from commits to CI builds to
    deployments and releases to alerts and corrective action with the
    Atomist bot.

[travis]: https://travis-ci.org/
[docker]: https://www.docker.com/

You can find more detail on what Atomist can do by following our
Medium Publication: [The Composition][composition].  In
particular, [Software That Writes And Evolves Software][evolve]
provides a more detailed introduction to our thinking around
development automation and a video showing an application of the
approach to the [Elm][elm]
language.  [Understand, Automate, Collaborate][collab] provides more
detail on how our approach can greatly increase a team's productivity.

[evolve]: https://medium.com/the-composition/software-that-writes-and-evolves-software-953578a6fc36#.yw7mkg6sy
[elm]: http://elm-lang.org/
[collab]: https://medium.com/the-composition/understand-automate-collaborate-1b5695ecb724#.u3df7vvjc

While often our Atomist bot can guide you through the proper workflow,
perhaps you are interested in working with the Rug CLI, looking for a
little more help to get started with Atomist, or doing something more
advanced like writing your own editor.  If that is what you're looking
for, you're in the right place.

## Just get me going *right now*: Quick Starts

The following are quick recipes that you can use to navigate the most
common activites through Atomist.

[Go to the Quick Starts...](quick-starts/index.md)

## I want to know more: Reference Documentation

The reference documentation aims to help you get a deeper dive through
the tools, techniques and stucture of Atomist:

[Go to the Reference Documentation...](reference-docs/index.md)

-->
