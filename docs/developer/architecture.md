# Architecture

It all starts with a software delivery machine of your very own. That can be for
your team or for you personally--one of each is good.

An Atomist Software Delivery Machine (SDM) provides a high-level interface for
you to take action when things happen. In much the same way your continuous
integration build kicks off when you push to your repository, Atomist can
execute tasks like security scans, documentation publication, release creation,
and deployment. Because you're using a real programming language, not YAML or
Bash, and because you have access to a real ecosystem, Node.js, you can create
the richest delivery experience you can imagine.

## API for Software

The SDM is a persistent process that runs in the background. An SDM links up to
the _API for software_, implemented by the Atomist service, exposing:

-   _What we know_: The Atomist cortex, accessible through GraphQL queries and
    subscription joins
-   _What just happened_: An event, triggered by a GraphQL subscription, which
    is contextualized with the existing knowledge
-   _What you're working on_: A library that enables you to comprehend and
    manipulate the source code you're working on.

When a push occurs, the SDM gets all this context and the code. It decides what
delivery actions to take, and sets [goals][] accordingly. Instead of a static
pipeline, you get to choose the delivery flow for each commit.

![SDM Receives a Push](img/sdm-reacts-to-push.png)

A push is not the only event that matters in our software development. The
Atomist development automation platform ingests events from your software
development systems:

-   Source code repositories like [GitHub.com][gh] and [GitHub Enterprise][ghe]
-   Issue tracking systems like [GitHub][gh-issues] and [Jira][jira]
-   Continuous integration platforms like [Travis CI][travis],
    [CircleCI][circle], and [Jenkins][jenkins]
-   Application frameworks like [Spring][spring]
-   Runtime platforms like [Kubernetes][k8s] and [Cloud Foundry][cf]
-   Custom events from _any_ other system you use

and makes them available via the Atomist API for software.

As Atomist ingests events, typically via webhook JSON payloads, it automatically
correlates them to each other: commits to pushes to builds to deployments to
running containers. This results in a data model that represents your
development flow. The Software Delivery Machine subscribes to the most important
events, like a push to source control and a completed build. You can subscribe
to more events and take action when they occur, with the data model providing
the necessary context so your automations can always do the right thing.

![SDM Receives Commands and Events](img/sdm-reacts-to-more.png)

The development automation platform also provides a simple yet powerful
interface for implementing custom chat bot commands, also executable from your
command line. Atomist provides all the infrastructure needed to recognize
commands, collect parameters, execute the code, and respond. This lets you focus
on writing your command code, not boilerplate code and ceremony around running
bots. Instead of shell scripts that are useful only to you, write commands that
help your whole team.

[gh]: https://github.com "GitHub.com"
[ghe]: https://enterprise.github.com/home "GitHub Enterprise"
[gh-issues]: https://guides.github.com/features/issues/ "Mastering GitHub Issues"
[jira]: https://www.atlassian.com/software/jira "Jira"
[travis]: https://travis-ci.org "Travis CI"
[circle]: https://circleci.com "CircleCI"
[jenkins]: https://jenkins.io/ "Jenkins"
[spring]: https://spring.io/ "Spring"
[k8s]: https://kubernetes.io/ "Kubernetes"
[cf]: https://www.cloudfoundry.org/ "Cloud Foundry"
[ts]: https://www.typescriptlang.org/ "TypeScript"
[sdm]: https://github.com/atomist/sdm "Atomist SDM - TypeScript"
[sdm-core]: https://github.com/atomist/sdm-core "Atomist SDM - TypeScript"
[aac]: https://www.npmjs.com/package/@atomist/sdm "Atomist SDM Node Module"
[goals]: goal.md "SDM Goals"
[sdm-api]: https://atomist.github.io/sdm "Atomist SDM Framework API Documentation"

## Coding your SDM

A software delivery machine uses the [@atomist/sdm][sdm] framework to specify
the code delivery process and other automations. You don't configure your SDM:
you code it, by combining or writing functions in TypeScript (or JavaScript).

## Connect your SDM

An SDM is most useful when running for your whole team, connected to the Atomist
API for software, Slack, and your version control. Run it on your laptop while
you're testing and modifying the SDM, then in your favorite production
environment (on-prem or in the cloud) for ongoing use.

![Atomist SDM in Team mode](img/sdm-team.png)
