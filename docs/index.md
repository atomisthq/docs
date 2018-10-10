# Atomist - How Teams Deliver Software

<img style="float:left; margin-top:7px; margin-right:10px; margin-bottom:10px; margin-left:0px;" src="img/atomist-logo.png" height="100px" width="100px" alt="Atomist logo"/>

[Atomist][www] is a platform for delivering software, _your way_.
Atomist unifies activity across your software development and delivery
tools into a cohesive model of code, people, and process.  Atomist
empowers your team to gain visibility and control over your software
delivery flow with your own Software Delivery Machine (SDM).

!!! tldr "Escape Bash and YAML!!!"
    Tired of managing CI/CD Bash scripts and YAML config across dozens
    of repositories?  Use Atomist to tame the complexity and execute
    your best delivery process across all your repositories.

[www]: https://atomist.com/ (Atomist - How Teams Deliver Software)

## What is a Software Delivery Machine?

A **software delivery machine** (SDM) is a development process in a
box.  Rather than using YAML and Bash scripts to manage your builds,
static analysis checks, testing, and deployments, an SDM, connected to
the Atomist platform, gives you the ability to codify and execute your
entire delivery flow using real, testable code.  Working with and
augmenting your existing development and delivery tools and platforms
like version control and continuous integration, an SDM automates 
all steps in the flow from commit to
production, and many other actions, using the consistent model
provided by the Atomist *API for software*.

!!! important "Realize your delivery blueprint"
    Many teams have a blueprint in their mind for how they'd like to
    deliver software and ease their day to day work, but find it hard to
    realize.  A Software Delivery Machine makes it possible.

These concepts are explained in detail in Rod Johnson's blog [Why you
need a Software Delivery Machine][sdm-blog]. This [video][sdm-video]
shows an SDM in action:

<iframe src="https://player.vimeo.com/video/260496136" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/260496136">Atomist: How Teams Deliver Software</a> from <a href="https://vimeo.com/atomist">Atomist</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

!!! important "Use code to deliver code"
    Atomist is about developing your development experience by using
    your coding skills.  Change the code, restart, and see your new
    automations and changed behavior across all your projects, within
    seconds.

[sdm-blog]: https://the-composition.com/why-you-need-a-software-delivery-machine-85e8399cdfc0 (Why you need a Software Delivery Machine - The Composition)
[sdm-video]: https://vimeo.com/260496136

## Concepts

Atomist is all about making you more productive by helping you to go
from idea to production as quickly as possible.  The following
concepts describe the pieces Atomist provides so that you can
use your software development skills to improve how you manage your
software delivery, from project creation to build to test to
deployment to runtime.

### Software Delivery Machine

The Software Delivery Machine, or SDM, is your interface for using
Atomist to deliver your software your way, but better.  The SDM
TypeScript package provides a high-level API for automating
development and delivery tasks in response to typical software
development events like creating a new repository, pushing commits,
creating/commenting/closing issues and pull requests, deploying
services, releasing artifacts, etc.  Want to run a security scanning
tool on every push of every project in your organization?  Want to
change the Docker registry for all your projects?  Re-platforming from
WebLogic to Kubernetes?  It's all possible with an SDM.

Your software delivery machine runs on your infrastructure. Keep your code inside your network, and call internal APIs as part of your delivery.

### Development automation platform

Atomist's development automation platform is powered by a service that
ingests and correlates events from your software development flow.  At
the heart of the service is a single coherent model: code, people, and
processes.  Your SDM queries that model, Atomist's API for software, using
[GraphQL][gql].

The Atomist service also provides interactive chat integration. For instance, send messages to the developer who pushed the commit
when a build failed, including action buttons that tell your SDM what to do.

[gql]: http://graphql.org/ (GraphQL)

### Software Delivery Machine

Automations are written and run within an Atomist [Software Delivery
Machine (SDM)][sdm], which interacts with the Atomist platform using
primarily GraphQL.  Each SDM hosts automations that can be invoked
via the Atomist bot, Slack buttons, or when events occur.  An SDM can
host any number of automations, and can be hosted wherever the author
likes: locally during testing, inside a corporate firewall, or on a
public cloud or PaaS.

[sdm]: developer/sdm.md (Atomist SDM)

### Commands

[Commands][command] perform actions when invoked by users sending the
Atomist bot messages, clicking buttons in Slack, or running the
Atomist CLI.

Examples of commands include the bot command `create issue` and the
"merge pull request" command that users invoke by pressing a button in
Slack.

[command]: developer/commands.md (Atomist - Commands)

### Events

[Events][event] can be sourced from anywhere: commits, pushes, CI
builds, deployments, stack traces in production logs, etc.  When an
event is ingested, Atomist relates it to other events to build up
contextual information: a push containing commits triggers a CI build,
creating an artifact that gets deployed.  Atomist is able to take
automated action on any and all of these events along the chain.

How does an automation know what event it should act on?  GraphQL
subscriptions are used to define the trigger criteria.  For example,
you can create a subscription to receive an event whenever a
Kubernetes deployment results in a pod crash looping, providing an
automation that automatically rolls that deployment back and notifies
the committers of the failure.

[event]: developer/events.md (Atomist - Events)

### Integrations

Atomist receives events from and performs operations on many systems,
including version control, CI systems, Slack, and more.

Atomist uses the native integration technology for each platform or
tool.  For example, to integrate with GitHub and Travis CI, Atomist
uses webhooks; to integrate with Slack it uses their native real-time
messaging (RTM) API.  For each platform Atomist integrates with, it
requests the minimal set of permissions required.

If you use a system or tool Atomist does not natively support, you can
implement your own integrations.  You can use whatever tools and
libraries you want to communicate with your systems, and then register
these custom event types with Atomist so it can properly connect them
with other events.

---

## What next?

-   If you're new to Atomist, visit the [Atomist web site][www] to
    learn more about Atomist and how we can help you and your team
    deliver better software faster.

-   If you want to get started using Atomist, go to the [Using
    Atomist][user] page to get Atomist installed in your Slack
    workspace, authorized in GitHub, and connected to your continuous
    integration system.

-   If you already are using Atomist and are interested in writing
    your own SDM, you can go to the [Developer
    Guide][dev-guide] to learn how to create and run your own
    SDM.

[user]: user/index.md (Atomist User Guide)
[quick-start]: quick-start.md (Atomist Developer Quick Start)
[dev-guide]: developer/sdm.md (Atomist Automations Developer Guide)
