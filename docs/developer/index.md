# Developing your Software Delivery Machine

When you're ready to craft your own delivery and development automation, this is the place to be.

## Getting Started

Get your own Software Delivery Machine (SDM) by following the steps in [Developer Quick Start](../quick-start.md).

## Tutorials

Once you have a local SDM up and running, here are some things you can do with it:

* Add a [chat command](commands.md)
* Add an [autofix](autofix.md)
* Add a [code inspection](inspect.md)
* Add a [custom goal](goal.md) for your team's specific need

## Concepts

In your own SDM, you have many tools available to automate your organization or team's software development (including delivery). To provide all the options, while making the common work easier, we give you a few layers of abstraction.

![Layers of libraries: Atomist Service talks to automation-client, which underlies SDM, which
underlies all the packs](img/layers-of-libs.png)

The Atomist service provides triggering, [chat integration](../user/slack.md), and a [GraphQL interface](graphql.md) to events and the context around them. Your software delivery machine connects to that service. This connection is handled in the `@atomist/automation-client` [library][npm-automationclient]. That library works in terms of commands (which people trigger from chat) and events. It also interfaces with source control; it clones repositories, makes commits, pushes them, etc.

[npm-automationclient]: https://npmjs.com/@atomist/automation-client (Automation Client library)
[npm-sdm]: https://npmjs.com/@atomist/sdm (SDM library)

On top of that, the `@atomist/sdm` [library][npm-sdm] provides a domain model for software delivery. This library understands many of the events that people want to react to, including new [issues](event.md#issues), [new repositories](event.md#repository-creation), and the all-important push. The push triggers [PushRules](set-goals.md), which result in [Goals](goal.md), which the SDM knows how to execute. The Goals include familiar activities like Build and Deploy, plus
activities that you won't see in older build tools: [AutoCodeInspect](inspect.md), [Autofix](autofix.md), and [Fingerprint](fingerprint.md), for instance.

In addition, there are extension packs that build on the abstractions in the SDM. There is a pack for [build](../pack/build.md) functionality. There are packs to help with languages like [Java](../pack/spring.md) or [Node](../pack/node.md). There are packs specific to deployment targets like [Kubernetes](../pack/kubernetes/index.md) or [Cloud Foundry](../pack/pcf.md). You can create packs and share them with the community.

One interesting pack is the [Analysis pack](../pack/analysis.md). This one is used by the [Uhura SDM](https://github.com/atomist/uhura). It separates understanding a project's language and technologies from choosing what to do about it.
This lets you create analyzers that identify technologies like Node or Spring, and also supply goals or autofixes or other functionality that gets applied dynamically and universally. This is useful
when you have lots of combinations of technologies across your organization, and you want an SDM
that can figure out what to do on all of the projects.

Learn more about the high-level concepts in [Architecture](architecture.md).

## Questions?

We are available in the [Atomist community Slack][join], or through the chat icon at the bottom of this page. If you have requests or suggestions for this documentation, find me in the #docs channel.

[join]: https://join.atomist.com/ (Atomist community Slack)
