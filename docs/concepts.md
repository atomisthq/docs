Atomist is a new approach to software development that pushes the
limits of automation and blurs the boundaries between projects, code,
tooling, and operations.  Pushing boundaries means extending some
well-known concepts and introducing some new ideas.  In this section,
we present overarching concepts integral to Atomist and how it
helps you ship better software faster.

<img style="float:right; margin-top:0px; margin-left:0px; margin-right:10px; margin-bottom:10px;" src="/images/atomist-bot-color.jpg" width="150px" height="150px" alt="Your friendly, neighborhood Atomist Bot"/>

At its core, Atomist is partner that improves your development process
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

Events are first-class entities in the Atomist system.  Everything
from commits to pushes to CI builds to deployments to stack traces in
production logs are captured as events.  Handlers can be registered
for any type of event, or even multiple, related events.  These
handlers can execute arbitrary operations and even create new events
which, in turn, may be routed to other handlers.

Our event-drive approach allows processes and workflows of arbitrary
complexity to be encoded in Atomist.  Would you like a delivery
workflow to span across multiple systems?  Do you have a workflow that
is difficult to model in your CI solution?  Would you prefer that
certain parts of your development flow that are currently manual be
automated?  Do certain steps in your release process take too long
because requests end up in the dead letter office?  Atomist can
address these, and many other, process and workflow challenges.

## Rug

<!-- *That rug really tied the room together, did it not?* -->

Rug is the runtime for Atomist.  As events flow into Atomist, Rug ties
them all together and performs all the appropriate operations.  Rug
code, called Rugs, provide two fundamental pieces of information to
Rug: what they respond to and how they respond to it.  The "what" they
respond to can be arbitrarily complex event hierarchies.  The "how"
they respond is implemented in a Turing complete programming language.

!!! note "What do we mean by 'arbitrarily complex event hierarchies'?"
    Atomist understands the relationships between events: how a user
    changes a line of code, that is part of a commit, that is part of
    a push, that triggers a CI build, that creates a Docker image,
    that gets deployed to a staging environment, that creates a
    Kubernetes pod, that generates a error-level log message.  This
    allows you to create handlers that, for example, message the
    author of the code change that led to an error in your staging
    environment and is preventing the changes from being promoted into
    production but only if that commit was made within the last 24
    hours and it is normal working hours for the author.

Rugs can automate and codify all manner of steps in a development or
operations workflow.  For example, Rugs can

-   Alert the author whose changed caused an error at runtime (see
    above note)
-   Automate deployment by linking your CI system, your integration
    tests, and your runtime platform
-   Identify a commit leading to a regression in production, revert
    the commit, and release the "new" version!

Atomist ships with a core set of Rugs.  Additional Rugs can be
implemented by anyone using Atomist.  These custom Rugs are
dynamically discovered by the Atomist service and used when processing
all future input to Atomist.

## Integrations

Integrations with other systems and tools are how Atomist acquires
events from those systems and tools.  To integrate with various
platforms and tools, we prefer to use the native integration
technology for that platform or tool.  For example, to integrate with
GitHub.com and Travis CI we use webhooks, to integrate with Slack we
use their native real-time messaging (RTM) API.  For each platform we
integrate with, we ask only for the minimal set of permissions
required to provide the service we provide.

Do you use a system or tool Atomist does not natively support?  We
also provide our users with the ability to implement their own
integrations, empowering them to unleash Atomist's integrative power
across all their systems and processes.  Users can use native
capabilities provided by Atomist to call a third-party service's REST
API and have the response ingested as an event in Atomist.

## Interfaces

**Bot** - Atomist strongly believes in the power of ChatOps.
Specifically, we believe chat *can* be a driving force for shipping
better software faster.  For ChatOps to achieve these goals, it must
be backed by an intelligent system that integrates all relevant
information and delivers it to the appropriate users in actionable
ways.  The Atomist Bot provides this exact interface for everyone
working in and around software development and delivery.

**CLI** - Many developers prefer working on the command line,
prototyping and hacking together clever solutions to vexing problems.
Atomist provides a powerful Rug CLI that not only supports running
Rugs, but also a provides immediate feedback when developing and
testing Rugs.

**None** - The real power of Atomist is achieved when no interface is
necessary.  Put another way, Atomist is about driving to *complete*
automation.  When every aspect of your workflow has been fully
automated, both its "happy path" and remediations for all possible
error modes, you can focus on what matters: writing great code.
