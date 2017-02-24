<img style="float:left; margin-top:7px; margin-right:10px; margin-bottom:10px; margin-left:0px;" src="images/atomist-logo.png" height="100px" width="100px">

# Atomist Overview

Atomist enables you to ship software in less time and respond to
operational events more quickly.  By automating tasks, integrating
tools, and providing timely, correlated, and actionable information,
Atomist makes software delivery faster, more standardized, and more
fun.

Timely, correlated, and actionable information results from capturing
your processes and operations in code.  Atomist knows the platforms
and tools you already use: GitHub, Slack, Travis CI.  Atomist
understands your code: Java, C#, JavaScript, Scala, Python, Clojure,
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

## Atomist is SaaS

The Atomist service consumes events from your systems: source code
repositories, continuous integration servers, deployment platforms,
and chat.  The information from these systems is correlated together:
pushes with builds, artifacts with deployments, stack traces with
commits.  The correlation of these events is then used to
automatically respond: retry a build, start an integration test,
message a committer.

***The Atomist service provides:***

-   *the SaaS platform to ingest and correlate events*
-   *a core set of integrations and event responses*
-   *the ability for teams to customize the events, correlation, and
    actions for their existing processes*

## Atomist is events

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

-   A [Getting Started guide][getting-started]
-   Several [Quick Start guides][quick]
-   Detailed [Reference Documentation][refdoc]

[getting-started]: getting-started/index.md
[quick]: quick-starts/index.md
[refdoc]: reference-docs/index.md

To stay up to date with Atomist, get announcements on new features,
and interact with the Atomist team, please

-   Join the [Atomist Community Slack][slack]
-   Following our blog, [The Composition][composition]
-   Follow [@atomist][twitter] on Twitter

[slack]: https://join.atomist.com/
[composition]: https://the-composition.com/
[twitter]: https://twitter.com/atomist

We sincerely hope you enjoy using Atomist!
