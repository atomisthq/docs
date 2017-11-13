<img style="float:left; margin-top:7px; margin-right:10px; margin-bottom:10px; margin-left:0px;" src="img/atomist-logo.png" height="100px" width="100px" alt="Atomist logo"/>

**Option 1**: [Atomist][atomist] is a development automation platform
that brings event-driven automation to the process of software
development. Atomist correlates event streams from activity at the
various stages of development and represents them as a model of code,
people, and process in a graph database.

**Option 2** [Atomist][atomist] provides a powerful model for
automating software development and delivery, a _development
automation platform_.  More than continuous integration or
infrastructure-as-code, Atomist correlates events spanning your entire
development and delivery flow, providing them as a cohesive model of
code, people, and process for you to query and take action.  The
Atomist development automation platform provides the tools to make
_you_ a more productive developer by reducing busy work and codifying
standards.

[atomist]: https://www.atomist.com (Atomist)

## Using Atomist

Atomist helps you gain visibility and control over your software
delivery process by providing automations that respond to commands and
events.  You can use Atomist's out-of-the-box automations or you can
write your own.

### Atomist automations

Invite the Atomist bot into your Slack team and use the built-in
automations.  The bot sends you relevant, actionable messages that
enable you to control your development flow from Slack, from project
creation to deployment to monitoring.

### Custom automations

You can customize Atomist's built-in automations or write wholly new
ones.

Atomist provides an automation API with integrations for your
development tools and runtime platforms, native Slack notifications
and commands, and an open source client and command-line interface.

Custom automations can be used to further streamline development:

-   Notify team members about events such as pushes, pull requests,
    build failures, crash looping Kubernetes pods and more.
-   Create custom bot commands for fun and profit. Search
    StackOverflow from Slack or exchange banter with other teams -
    it's up to you.
-   Automate your release process - rather than delegating it to your
    build system - so you can release with a single button press in
    Slack.
-   Merge pull requests automatically as soon as the required checks
    and reviews pass.
-   Auto-close issues when a fix is deployed to production.
-   Roll back automatically: identify a commit that caused a
    regression in production, revert the commit, and release the "new"
    version

## Concepts

Atomist is all about making you more productive by helping you to
automate away all the things that slow you down.  The following
concepts describe the pieces Atomist provides to make it easy for you
to create automations that reduce repetitive work and distractions.

### Development automation platform

Atomist's development automation platform is powered by a service that
ingests and correlates events from your software development flow.  At
the heart of the service is a single coherent model: code, people, and
processes.  You query and mutate that model using [GraphQL][gql] when
you write your own automations.

[gql]: http://graphql.org/ (GraphQL)

### Automation client

Code in automations is written in
Atomist [automation clients][client], which interact with the Atomist
platform using primarily GraphQL.  Each client hosts automations that
can be invoked via the Atomist bot, Slack buttons, or when events
occur.  A client can host any number of automations, and can be hosted
wherever the author likes: locally during testing, inside a corporate
firewall, or on a public cloud or PaaS.

[client]: automations/client.md (Atomist Automation Client)

### Commands

[Commands][command] perform actions when invoked by users sending the
Atomist bot messages, clicking buttons in Slack, or using the Atomist
CLI.

Examples of commands include the bot command `create issue` and the
"merge pull request" command that users invoke by pressing a button in
Slack.

[command]: automations/commands.md (Commands)

### Events

[Events][event] can be source from anywhere: commits, pushes, CI
builds, deployments, stack traces in production logs, etc.  When an
event is ingested, Atomist relates it to other events to build up
contextual information: a push contains commits and triggers a CI
build creates an artifact that gets deployed.  Atomist is able to take
automated action on any and all of these events along the chain.

How does an automation know what event it should act on?  GraphQL
subscriptions are used to define the trigger criteria.  For example,
you can create a subscription to receive an event whenever a
Kubernetes deployment results in a pod crash looping, providing an
automation that automatically rolls that deployment back and notifies
the committers of the failure.

[event]: automations/events.md (Events)

### Integrations

Atomist receives events from and performs operations on many systems,
including version control, CI systems, Slack, and more.

Atomist uses the native integration technology for each platform or
tool.  For example, to integrate with GitHub and Travis CI, Atomist
uses webhooks; to integrate with Slack it uses their native real-time
messaging (RTM) API.  For each platform Atomist integrates with, it
asks for the minimal set of permissions required to perform its
duties.

If you use a system or tool Atomist does not natively support, you can
implement your own integrations.  You can use whatever tools and
libraries you want to communicate with your systems, and then register
these custom event types with Atomist so it can properly connect them
with other events.

---

## What's next?

If you're new to Atomist, go to the [setup][] page to get Atomist
installed in your Slack team, authorized in GitHub, and connected to
your continuous integration system.

If you already are using Atomist and are interested in writing your
own automations, go to the [automation overview][auto-over] to learn
how to create and run your own automations.

[setup]: setup/index.md (Atomist Setup)
[auto-over]: automations/index.md (Atomist Automations)
