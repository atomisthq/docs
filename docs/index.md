<img style="float:left; margin-top:7px; margin-right:10px; margin-bottom:10px; margin-left:0px;" src="img/atomist-logo.png" height="100px" width="100px" alt="Atomist logo"/>

## What is Atomist?

Atomist is a development automation platform that brings event-driven automation to the process of software development. Atomist correlates event streams from activity at the various stages of development and represents them as a model of code, people, and process in a graph database. 

## Using Atomist
Atomist helps you gain visibility and control over your delivery process. You can use Atomist's development lifcycle automation out of the box or you can write your own automations.

### Development LIfecycle Automation

Invite the Atomist bot into your Slack team and use the built-in automations for the systems you rely on. The bot sends you relevant, actionable messages that enable you to control your development flow from Slack, right where you work with your team. The Atomist bot sends far fewer messages than most Slack integrations because it combines related events from multiple systems and formats them succinctly. 

### Custom Automations

You can customize Atomist's built-in automations by modifying how events get handled or formatting notifications, or writing wholly new automations that support your unique development flow. 

Develop automations, then deploy and run them in the cloud or host them where you choose. Atomist provides an automation API and a programming model for your developer tools, with native Slack integration for notifications and commands, and an open source client and command-line interface.

### Automation Use Cases

There are many automations you might choose to create:


- Notify the right people about events such as pushes, pull requests, build failures, crash looping Kubernetes pods and more. 
- Create custom bot commands for fun and profit. Search StackOverflow from Slack or exchange banter with other teams - it’s up to you. 
- Automate your release process - rather than delegating it to your build system - so you can release with a single button press in Slack.
- Merge pull requests automatically as soon as the required checks and reviews pass.
- Auto-close issues when a fix is deployed to production.
- Roll back automatically: identify a commit that caused a regression in production, revert the commit, and release the “new” version
And many more

## Concepts

### Automations

Automations are combinations of one or more commands and event handlers in a development or operations workflow. 

Atomist ships with a core set of automations. Anyone using Atomist can implement additional automations for their team. These custom automations register themselves with the Atomist API and are sent the events and data they need to execute their automations.

#### Development Automation Platform

Atomist’s development automation platform is powered by a service that ingests and correlates events that are relevant to your software development process. At the heart of the service is Cortex, a single coherent view of your development flow: code, people, and processes. You query and mutate that data model using GraphQL when you write your own automations.

#### Automation Clients

Code in automations is written in Atomist automation clients, which interact with the Atomist service primarily by [GraphQL][graphql]. Each client is itself a server which hosts automations that can be invoked via the Atomist bot or when events occur. A client can host any number of automations, and can be hosted wherever the author likes: locally during testing, inside a corporate firewall, or on a public cloud or PaaS.

[graphql]: http://graphql.org/ (GraphQL)

### Commands

Commands define behavior that you want to perform, either in response to an event or when a user invokes it through the bot or CLI. Examples of commands include the bot command `create issue` and the `merge pull request` command that users invoke by pressing a button in Slack. 

#### Command Handlers

Command handlers respond to messages in chat or CLI, allowing you quickly automate common tasks in software development and operation. Want to automate the release of a new version of your service to production? Write a command handler so you can initiate the release right from chat while ensuring the requester has appropriate permissions to do so.

### Events

Atomist events can be everything from commits to pushes to CI builds to deployments to stack traces in production logs. Atomist responds to events in two ways: it learns about relationships and takes automated action. For instance, a commit event teaches Atomist who changed code on a branch; a failed build event for that branch results in the action of messaging that committer. Recognizing each crucial event lets Atomist:

* Orchestrate delivery flow across multiple projects and systems
* Implement workflows that CI can’t model
* Replace manual pieces of your development process
* Send in-context, actionable notifications to the right people

More than just ingesting and understanding events, Atomist remembers key contextual information about the events it sees, and bases future responses on it. Atomist understands the relationships between events: how a user changes a line of code, that is part of a commit, that is part of a push, that triggers a CI build, that creates a Docker image, that gets deployed to a staging environment, that creates a Kubernetes pod, that generates a error-level log message. This allows you to create event responses that, for example, message the author of the code change that led to an error in your staging environment but only if that commit was made within the last 24 hours and it is normal working hours for the author.

#### Event Handlers

Event handlers respond to events. Event handlers can use the information on an event and its related events and objects to message the right team members, take direct action, and/or create new events, which can trigger other event handlers. Need to notify someone when their commit causes a stack trace in production? Automate that with an event handler.

How does a handler know what event it should act on? GraphQL queries are used in event subscriptions to match trigger criteria. For example, you can create a subscription to receive an event when a Slack user whose GitHub user authored a commit that was in a push that triggered a CI build that failed.

### Integrations

Atomist integrates with version control, CI systems, Slack, and more. Atomist integrations with a system can receive events from and perform operations on that system.

Atomist uses the native integration technology for each platform or tool. For example, to integrate with GitHub.com and Travis CI Atomist uses webhooks; to integrate with Slack it uses their native real-time messaging (RTM) API. For each platform Atomist integrates with, it asks for the minimal set of permissions required to perform its duties.

If you use a system or tool Atomist does not natively support, you can implement your own integrations to unleash Atomist’s integrative power across all your systems and processes. Users can leverage native capabilities provided by Atomist to call a third-party service’s REST API and have the response ingested as a custom event in Atomist.


