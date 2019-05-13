The Software Delivery Machine, or SDM, is your interface for using
Atomist to deliver your software your way, but better. An SDM
automates all steps in the flow from project creation to production,
and many other actions, using the consistent model provided by the
Atomist *API for software*.

The heart of Atomist is its event handling. We're going to take a look
at some of the core concepts and functionality
that demonstrates the strengths of an SDM over traditional CI/CD pipelines.

## SDM process lifecycle

The SDM lifecycle should be a familiar flow if you've worked with persistent
applications before:

1.  **Authentication** - When the SDM starts up, it
    connects to the Atomist API and authenticates using the API key
    you have provided in your configuration file.

2.  **Registration** - Once your identity has been established, the
    client registers its automations, i.e., the bot commands it
    provides and the events it wants to receive, with the Atomist
    workspaces specified in your configuration.  If Atomist
    does not recognize your workspace ID or the provided API key is
    not connected to any member of that workspace, registration will
    fail and the SDM will exit with an unsuccessful status.

3.  **Listening** - After authentication and registration is completed
    successfully, the WebSocket connection is established and the
    client begins listening for incoming messages from the API: bot
    commands and events fired.

4.  **Shutdown** - When the client receives a shutdown signal,
    typically `SIGINT` delivered by the PaaS or `Ctrl-C`, it
    de-registers with the API and gracefully shuts down.

Of the four steps, **Registration** and **Listening** are largely
under your control. Let's take a closer at some of the nuances
of these steps.

## Authentication via websockets

An Atomist SDM must maintain
contact with the API server so that it can receive the events and
commands it's interested in as they occur.

SDMs access the Atomist automation API via
a [WebSocket][ws] connection.  WebSockets allow the API server to send
events and commands to the SDM without constant polling via HTTP
calls. The
WebSocket connection is initiated by the SDM when it
starts up, establishing a persistent two-way communication channel
between the SDM and API that is resilient to
interruptions in connectivity.

[ws]: https://en.wikipedia.org/wiki/WebSocket (WebSocket)

## Registration

An SDM, once registered, will continue to receive all the events it
has subscribed to until shuts down or one of the following scenarios
occurs.

### Multiple identical SDMs register

If another client with the same name and version (typically obtained
from the `package.json` "name" and "version" properties) registers,
then all of the registered identical SDMs will receive the events
in a round-robin fashion.  Each event will only be sent to one of the
identical SDMs.  This allows you to horizontally scale.

### A different version registers

If another SDM having the same name but different version
registers, it will begin receiving all of the events for the client
and any previously registered versions cease receiving events.  Note
that no version comparisons are done: the _last registration wins_.

If the new client has registered with a policy of "ephemeral" and the
prior client was registered with a policy of "durable", then when the
new client shuts down, events again be sent to the "durable"
registration clients.

The reason for this logic is to allow for production, testing, and
local use to all coexist without taking the same action multiple
times.  For example, if you are running an SDM in production but want
to test something, you can run it locally, steal events for a bit,
kill the local process, and then traffic will return to the production
instance.

If you want the same events to be sent to multiple SDMs, just make
sure the SDMs have different names.

!!! note "Custom Ingestion"
    Any custom ingestion types can only be registered once within an
    Atomist workspace.  Therefore it is recommended to register these
    in a dedicated API client.

## Event handling

As your code flows from commit through to deployment and beyond, Atomist receives events,
correlates the incoming data with its previous knowledge, and invokes
your event handlers with rich context. This enables your automations
to perform tasks such as:

* Scanning code for security or quality issues on every push
* Driving deployments and promotion between environments
* Performing custom actions on deployment, such as kicking off
    integration test suites.

The Atomist correlated event model also enables Atomist to provide you
with visibility throughout the commit to deployment flow, in Slack, Microsoft Teams or
through the Atomist web interface.

Some possible events include:

* Responding to pushes
* Notifying people when a new issue is created
* Responding to the creation of a new repository to notify people, provision infrastructure, or
tag it with GitHub topics based on its contents.

See [Event Listeners][events] for more
information on what sort of events an SDM can handle.

[events]: event.md (Atomist - Events)

## Responding to commands

In addition to events, Atomist register **command
handlers**, which can be invoked via Slack or HTTP. You can write
[commands](commands.md) to ensure that anything that needs to be repeated gets done
the right way each time, and that the solution isn't hidden on
someone's machine.

Some possible commands include:

* Project generators. Consistent project
creation is important to governance and provides a way of sharing
knowledge across a team. See the [Project Creation](create.md) page for more information
* Code transforms. This is a command
that transforms project content. Atomist infrastructure can help
persist such transformations through branch commits or pull requests,
with clean diffs. See the [Code Transform](transform.md) page for more information.

## Plugging in Third Party Tools

In addition to the core capabilities of the Atomist platform, an SDM
can integrate with third-party tools to execute goals and commands.

### Integrating CI tools

One of the tools you are most likely to integrate is Continuous Integration (CI). For example,
you can integrate Jenkins, Travis or Circle CI with Atomist so that
these tools are responsible for build. This has potential advantages
in terms of scheduling and repeatability of environments.

Integrating a CI tool with Atomist is simple. Simply invoke Atomist
hooks to send events around build and artifact creation.

If integrating CI tools, we recommend the following:

* CI tools are great for building and generating artifacts. They are
    often abused as a PaaS for `bash`. If you find your CI usage has
    you programming in `bash` or YML, consider whether invoking such
    operations from Atomist event handlers might be a better model.
* Use Atomist generators to create your CI files, and Atomist
    editors to keep them in synch, minimizing inconsistency.

<!--
### Integrating APM tools

-->

### Integrating with Static Analysis Tools

Any tool that runs on code, such as Checkstyle, can easily be
integrated.

If the tool doesn't have a Node API (which Checkstyle doesn't as it's written in Java), you can invoke it via Node `spawn`, as Node excels at working with child processes.
