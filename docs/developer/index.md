# Developer Guide

When you're ready to craft your own delivery and development automation, this is the place to be.

## How to use this guide

With this guide, we aim to provide all the information you need to create and customize
a software delivery machine for your organization's needs. When the information here
is not clear or not sufficient, we appreciate your perspective. Ask us questions through the chat icon
in the lower-right of this page, or on the [Atomist community Slack][join]. You can also contribute
to this guide by creating issues or pull requests on [the docs repository][docs].

If you want to learn by doing, run through the [Developer Quick Start][quick-start] first.
If you want to start from higher-level concepts, begin reading [about the architecture][architecture].

## New superpowers

This guide should help you make your SDM:

* [Build your repositories][build], more flexibly than a pipeline
* [Deploy your code][deploy], with interactivity
* [Inspect your code][inspect], across projects and automatically on push
* [Transform your code][autofix], across projects and automatically on push
* [Respond to builds][build], from the SDM or external build systems
* Implement [custom commands][command]
* [Create new projects][create] according to your own standards

## Underlying concepts

To do all this, these higher-level concepts are relevant:

* [Setting up your system][prereq] to develop and run SDMs
* the `atomist` [command line tool][cli]
* your [Software Delivery Machine][sdm]
* [Commands][command]
* [Goals][goal]
* the [Project][project] interface

## Advanced topics

* Crafting sophisticated [Slack messages][slack]
* Using [GraphQL to subscribe to events][graphql-api]
* [Deploying your SDM][sdm-deploy]

Once you've finished this section, you'll have everything
you need to eliminate the pain points in your development and delivery
processes. Or if you don't, please let us know! We are available in the [Atomist community Slack][join], or through the chat icon at the bottom of this page.

[build]: build.md (Builds in the SDM)
[deploy]: deploy.md (Deploys in the SDM)
[inspect]: inspect.md (Code Inspections)
[autofix]: autofix.md (Transforms and Autofix)
[docs]: https://github.com/atomist/docs (Atomist Documentation Repository)
[goal]: goal.md (Goals)
[prereq]: prerequisites.md (Atomist Automation Prerequisites)
[sdm]: sdm.md (Atomist Software Delivery Machine)
[command]: commands.md (Atomist Command Automations)
[event]: event.md (Software Delivery Machine Events)
[slack]: slack.md (Atomist Automation Slack Messages)
[graphql-api]: graphql.md (Atomist Automation GraphQL)
[project]: project.md
[create]: create.md
[architecture]: architecture.md (Atomist SDM Architecture)
[quick-start]: ../quick-start.md (Atomist Developer Quick Start)
[cli]: cli.md (Atomist Command Line Interface)
[sdm-deploy]: sdm-deploy.md (Deploying the SDM)
[join]: https://join.atomist.com (Atomist Community Slack)
