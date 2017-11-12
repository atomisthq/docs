<img style="float:left; margin-top:7px; margin-right:10px; margin-bottom:10px; margin-left:0px;" src="img/atomist-logo.png" height="100px" width="100px" alt="Atomist logo"/>

## What is Atomist?

Atomist is a development automation platform that brings event-driven automation to the process of software development. Atomist correlates event streams from activity at the various stages of development and represents them as a model of code, people, and process in a graph database. 

## Using Atomist
Atomist helps you gain visibility and control over your delivery process. You can use Atomist's development lifcycle automation out of the box or you can write your own automations.

### Development LIfecycle Automation

Invite the Atomist bot into your Slack team and use the built-in automations. The bot sends you relevant, actionable messages that enable you to control your development flow from Slack.

### Custom Automations

You can customize Atomist's built-in automations or write wholly new automations. 

Atomist provides an automation API and a programming model for your developer tools, with native Slack integration for notifications and commands, and an open source client and command-line interface. Develop automations, then deploy and run them in the cloud or host them where you choose.


Custom automations can be used to further streamline development:

- Notify team members about events such as pushes, pull requests, build failures, crash looping Kubernetes pods and more. 
- Create custom bot commands for fun and profit. Search StackOverflow from Slack or exchange banter with other teams - it’s up to you. 
- Automate your release process - rather than delegating it to your build system - so you can release with a single button press in Slack.
- Merge pull requests automatically as soon as the required checks and reviews pass.
- Auto-close issues when a fix is deployed to production.
- Roll back automatically: identify a commit that caused a regression in production, revert the commit, and release the “new” version

## Concepts

### Automations

Automations are combinations of one or more commands and event handlers in a development or operations workflow. 

#### Development Automation Platform

Atomist’s development automation platform is powered by a service that ingests and correlates events from your software development process. At the heart of the service is Cortex, a single coherent view of your development flow: code, people, and processes. You query and mutate that data model using GraphQL when you write your own automations.

#### Automation Clients

Code in automations is written in Atomist automation clients, which interact with the Atomist service primarily by [GraphQL][graphql]. Each client is itself a server which hosts automations that can be invoked via the Atomist bot or when events occur. A client can host any number of automations, and can be hosted wherever the author likes: locally during testing, inside a corporate firewall, or on a public cloud or PaaS.

[graphql]: http://graphql.org/ (GraphQL)

### Commands

Commands perform actions in response to events or when invoked by users through the bot or CLI. 
Their implementations are defined in [**command handlers**](automations/commands.md). 

Examples of commands include the bot command `create issue` and the `merge pull request` command that users invoke by pressing a button in Slack. 

### Events

Atomist events can be anything from commits to pushes to CI builds to deployments to stack traces in production logs. 
When an event is ingested, Atomist retes it to other events to build up necessary contextual information.
 Atomist may also take automated action. The response to an event is defined in an [**event handler**](automations/events.md).

How does a handler know what event it should act on? GraphQL queries are used in event subscriptions to match trigger criteria. For example, you can create a subscription to receive an event when a Slack user whose GitHub user authored a commit that was in a push that triggered a CI build that failed.

### Integrations

Atomist receives events from and performs operations on many systems, including  version control, CI systems, Slack, and more. 

Atomist uses the native integration technology for each platform or tool. For example, to integrate with GitHub.com and Travis CI Atomist uses webhooks; to integrate with Slack it uses their native real-time messaging (RTM) API. For each platform Atomist integrates with, it asks for the minimal set of permissions required to perform its duties.

If you use a system or tool Atomist does not natively support, you can implement your own integrations. Users can leverage native capabilities provided by Atomist to call a third-party service’s REST API and have the response ingested as a custom event in Atomist.


