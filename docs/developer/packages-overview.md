# Packages Overview

In order to extend Atomist to listen to and respond to events that you care about, you'll need to [develop your own automation strategies](/developer/) on top of the Node packages which Atomist itself uses and has open sourced.

The left sidebar contains links to the API Reference for these packages, detailing all of the functions available to you. Here, we'll briefly summarize the contents of these packages, and when you should use them.

## `@atomist/automation-client`

The `@atomist/automation-client` package handles a number of base features for an SDM. These include:

* Creating generators
* Handling commands from a chat bot or HTTP interface
* Iterating over Git repositories, projects, and files
* GraphQL subscriptions on events
* Logging
* Adding message buttons for chat integrations
* Spawning external commands
* Interface for pull requests and code review

## `@atomist/sdm`

`@atomist/sdm` is often responsible for managing your custom code's relationship with the rest of the SDM. This includes:

* Registering generators and code transforms
* Implementing push, event, and command listeners
* Defining and invoking goals and goal sets
