Atomist is a new approach to software development that pushes the
limits of automation and blurs the boundaries between projects, code,
tooling, and operations.  It extends some well-known concepts and
introduces some new ideas.  In this section, we present overarching
concepts integral to Atomist and how it helps you ship better software
faster.

<!-- @jessitron we should have each section mirror "extends known concepts and introduces new ones" -->

<img style="float:right; margin-top:0px; margin-left:0px; margin-right:10px; margin-bottom:10px;" src="/images/atomist-bot-color.jpg" width="150px" height="150px" alt="Your friendly, neighborhood Atomist Bot"/>

At its core, Atomist is a partner that improves your development process
through automation.  The automation we are talking about goes well
beyond what traditionally comes to mind when talking about IT
automation.  Atomist is not a configuration management system.
Atomist is not a templating system.  Atomist is not
infrastructure-as-code.  Atomist is not a DevOps platform.  Atomist is
not a ChatOps platform.  Atomist brings all of those things
together&hellip; and more.  Bringing the events and information from
the systems and tools you already use together in one place, providing
insight into what is happening in your day-to-day development flow, is
just the beginning.  Once the information is collected, it can be
correlated and contextualized, providing a coherent view of your
development landscape.  Even more importantly, Atomist provides the
ability to take action on information and events, both automatically
and by prompting the appropriate users.  In short, Atomist provides
you with the information, context, and tooling to help you make better
decision more quickly.

## Software as a Service

Atomist is offered as a service, ingesting events from various sources
and correlating them for our users.  Atomist manages infrastructure to
support the ingestion and storage of events from external sources.
Atomist provides and runs the software to process these events,
perform the appropriate operations, and respond, e.g., via the Atomist
Bot.

## Events

Atomist takes [event-driven programming][edp] and applies it to
programming itself.  Everything from commits to pushes to CI builds to
deployments to stack traces in production logs&mdash;these are
captured as events.  Atomist responds to events in two ways: it learns
about relationships and takes automated action.  For instance, a
commit event *teaches* Atomist who changed code on a branch; a failed
build event for that branch results in the *action* of messaging that
committer.  Recognizing each crucial event lets Atomist

-   Orchestrate a delivery flow across multiple projects and systems
-   Implement workflow that CI can't model
-   Replace manual pieces of your development process
-   Send in-context, actionable notifications to the right people

[edp]: http://wiki.c2.com/?EventDrivenProgramming

<!-- ## Event graph -->

<!-- @jessitron the model seems to be missing from this page -->

More than just ingesting and understanding events, Atomist remembers
key contextual information about the events it sees, and bases future
responses on it.  Atomist understands the relationships between
events: how a user changes a line of code, that is part of a commit,
that is part of a push, that triggers a CI build, that creates a
Docker image, that gets deployed to a staging environment, that
creates a Kubernetes pod, that generates a error-level log message.
This allows you to create event responses that, for example, message
the author of the code change that led to an error in your staging
environment but only if that commit was made within the last 24 hours
and it is normal working hours for the author.

## Automations

Atomist automations define "What events am I interested in?" and "How
do I respond to each event?".  Automations can codify all manner of
steps in a development or operations workflow.  For example, they can

-   Alert the author whose change caused an error at runtime
-   Automate deployment by linking your CI system, your integration
    tests, and your runtime platform
-   Identify a commit leading to a regression in production, revert
    the commit, and release the "new" version!

These are just a few ways automations are able to tie all the events
of a team together into a coherent model.

Atomist ships with a core set of automations.  Anyone using Atomist
can implement additional automations for their team.  These custom
automations register themselves with the Atomist API and are sent the
events and data they need to execute their automations.

## Integrations

Atomist integrates with chat, with version control, with CI systems,
and more.  Atomist integrations with a system can receive events from
and perform operations on that system.

Atomist uses the native integration technology for each platform or
tool.  For example, to integrate with GitHub.com and Travis CI we use
webhooks; to integrate with Slack we use their native real-time
messaging (RTM) API.  For each platform we integrate with, we ask for
the minimal set of permissions required for the operations Atomist
supplies.

Do you use a system or tool Atomist does not natively support?  We
also provide our users with the ability to implement their own
integrations, empowering them to unleash Atomist's integrative power
across all their systems and processes.  Users can use native
capabilities provided by Atomist to call a third-party service's REST
API and have the response ingested as a custom event in Atomist.

## Interfaces

Atomist interfaces with people.  It brings information to you, and
receives orders from you, where you are.

**Bot** - Atomist strongly believes in the power of ChatOps.
Specifically, we believe chat *can* be a driving force for shipping
better software faster.  For ChatOps to achieve these goals, it must
be backed by an intelligent system that integrates all relevant
information and delivers it to the appropriate users in actionable
ways.  The Atomist Bot provides this exact interface for everyone
working in and around software development and delivery.

**None** - The real power of Atomist is achieved when no interface is
necessary.  Put another way, Atomist is about driving to *complete*
automation.  When every aspect of your workflow has been fully
automated, both its "happy path" and remediations for
error modes, you can focus on what matters: writing great code.
