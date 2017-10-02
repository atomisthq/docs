Atomist is all about helping you ship high-quality software in less
time.  Whether you are working with large legacy codebases, your own
"majestic monoliths", or aiming for "zero-overhead microservices",
Atomist provides you with the tools to speed development, smooth
operations, and close the code/runtime feedback loop.

## Bringing everything together

Atomist consumes events from the platforms and tools you use every day.
By linking related events from source code repositories, continuous
integration, testing, and runtime environments, Atomist can present
them in a unified manner to appropriate team members via direct or
group messages.  The result is massive reductions in context-switching
costs and and shorter incident time-to-resolution.

!!! important "Atomist ties everything together"

The Atomist API and Cortex model tie all your data and events
together.  Cortex not only understands individual events, but can
learn relationships between events, triggering action only when
complex interrelationships exist.

## Development lifecycle automation

Atomist helps you develop better software more quickly by greatly
enhancing your ability to automate your software development
lifecycle.  By intelligently linking your source code repository, your
CI system, your deployment platform, your logs, and your alerting
system, Atomist connects code changes to runtime changes and provides
that information back, with its full context, back to the appropriate
team member(s).  It can can even automate remediation, obviating the
need to alert anyone.

Atomist automations and the Cortex model was created to help you
streamline and better manage your software delivery lifecycle.  By
writing Atomist automations, you are able to automate code
modifications and API calls up through complex workflows and decision
points.  There are several different types of automations, each
providing a different way to help you improve your development and
operations lifecycle.

Event-driven actions: <span class="rugs">[Event Handlers][handlers]</span>
:   *Event handlers* respond to events.  Event handlers can use the
    information on an event and its related events and objects to
    message the right team members, take direct action, and/or create
    new events, which can trigger other event handlers.  Need to
    notify someone when their commit causes a stack trace in
    production?  Automate that with an event handler.

ChatDev and ChatOps: <span class="rugs">[Command Handlers][commands]</span>
:   *Command handlers* respond to messages in chat, allowing you quickly
    create bot commands to automate common tasks in software
    development and operation.  Want to automate the release of a new
    version of your service to production?  Write a command handler so
    you can initiate the release right from chat while ensuring the
    requester has appropriate permissions to do so.

Within these two categories, there are two more key concepts in our client library.

Project updates: <span class="rugs">[Editors][editors]</span>
:   *Editors* modify code directly and consistently.  They can
    modify any code, in any project, regardless of whether the project
    was created by Atomist or not.  Need to add or update a dependency
    and add some boilerplate code for it?  Codify it in an editor.

Project creation: <span class="rugs">[Generators][generators]</span>
:   *Generators* create new projects from a model project.  More
    powerful than templating approaches, generators are real projects
    operating under native tooling.  Need to stamp out a bunch of new
    microservice projects?  Stop the copy/paste/find/replace cycle and
    use a generator.

<!--
Project compliance: <span class="rugs">[Reviewers][reviewers]</span>
:   Rug *reviewers* ensure a project conforms with your standards.
    Because Rug understands your code, reviewers can check for
    conformance to coding standards, documentation, testing, etc.
    Think of a reviewer as an editor, without the editing.  Want to
    check if every Java try/catch block falls through to a `#!java
    catch Throwable`?  Write a reviewer for that.
-->

[handlers]: /user-guide/rug/event-handlers.md
[commands]: /user-guide/rug/command-handlers.md
[editors]: /user-guide/rug/editors.md
[generators]: /user-guide/rug/generators.md
<!-- [reviewers]: /user-guide/rug/reviewers.md -->

Individual automations can be composed.  For example, editors can be
used by event & command handlers and generators to modify code in a
consistent manner across many repositories.  Event handlers can
execute command handlers.

## Events and code selection

How does a handler know what event it should act on? GraphQL queries
are used in event subscriptions to match trigger criteria.  For
example, you can create a subscription to receive an event when a
Slack user whose GitHub user authored a commit that was in a push that
triggered a CI build that failed.

Atomist's navigation capability extends to the code inside
repositories itself.  You can easily get from a repository and SHA
returned via a GraphQL subscription or query to the code within it,
and drill into using [glob patterns][glob] and
Atomist [microgrammars][].  Microgrammars occupy a spot between
regular expressions and full-blown grammars, making it easy to
pinpoint code or configuration elements you want to change, and change
them with clean diffs.

[glob]: https://en.wikipedia.org/wiki/Glob_(programming) (Glob - Programming)
[microgrammars]: https://github.com/atomist/microgrammar (Microgrammar)

## Developing Rugs

Atomist is extensible.  Atomist ships with many useful capabilities,
but the ways in which Atomist can improve your development and
operations do not stop there.  The primary supported development
language for writing automations is [TypeScript][ts] using
the [automation client][client], although any language that can
connect to the Atomist API via a websocket can be used.  You can
modify existing automations or create your own to match your processes
and workflows.

Atomist meets you where you are.  It doesn't make you change how your
team develops and ships code.  It improves your code and speeds the
shipping of great software.

[ts]: https://www.typescriptlang.org/
[client]: https://github.com/atomist/automation-client-ts (Atomist Automation Client)
