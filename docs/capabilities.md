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

<!-- *That rug really tied the room together, did it not?* -->

!!! important "Rug ties everything together"

Rug is the programming model and runtime that ties everything
together.  Rug not only understands individual events, but can learn
relationships between events and respond to events with appropriate,
automated actions.

## Development lifecycle automation

Atomist helps you develop better software more quickly by greatly
enhancing your ability to automate your software development
lifecycle.  By intelligently linking your source code repository, your
CI system, your deployment platform, your logs, and your alerting
system, Atomist connects code changes to runtime changes and provides
that information back, with its full context, back to the appropriate
team member.  It can can even automate remediation, obviating the need
to alert anyone.

The Rug programming model was created to help you streamline and
better manage your software delivery lifecycle.  By writing Rugs,
i.e., programs that implement the Rug programming model, you are able
to automate code modifications and API calls up through complex
workflows and decision points.  There are several different types of
Rugs, each providing a different way to help you improve your
development and operations lifecycle.

Event-driven actions: <span class="rugs">[Event Handlers][handlers]</span>
:   Rug <span class="mid-text">*event handlers*</span> respond to
    events.  Event handlers can use the information on an event and
    its related events to message the right team members, take direct
    action, and/or create new events, which can trigger other event
    handlers.  Need to notify someone when their commit causes a stack
    trace in production?  Automate that with an event handler.

ChatDev and ChatOps: <span class="rugs">[Command Handlers][commands]</span>
:   Rug <span class="mid-text">*command handlers*</span> respond to
    messages in chat, allowing you quickly create bot commands to
    automate common tasks in software development and operation.  Want
    to automate the release of a new version of your service to
    production?  Write a command handler so you can initiate the
    release right from chat.

Project updates: <span class="rugs">[Editors][editors]</span>
:   Rug <span class="mid-text">*editors*</span> modify code directly and
    consistently.  They can modify any code, in any project,
    regardless of whether the project was created by Atomist or not.
    Need to add or update a dependency and add some boilerplate code
    for it?  Codify it in an editor.

Project creation: <span class="rugs">[Generators][generators]</span>
:   Rug <span class="mid-text">*generators*</span> create new projects
    from a model project.  More powerful than templating approaches,
    generators are real projects operating under native tooling.  Need
    to stamp out a bunch of new microservice projects?  Stop the
    copy/paste/find/replace cycle and use a generator.

<!--
Project compliance: <span class="rugs">[Reviewers][reviewers]</span>
:   Rug <span class="mid-text">*reviewers*</span> ensure a project
    conforms with your standards.  Because Rug understands your code,
    reviewers can check for conformance to coding standards,
    documentation, testing, etc.  Think of a reviewer as an editor,
    without the editing.  Want to check if every Java try/catch block
    falls through to a `#!java catch Throwable`?  Write a reviewer for
    that.
-->

[handlers]: /user-guide/rug/handlers.md
[commands]: /user-guide/rug/commands.md
[editors]: /user-guide/rug/editors.md
[generators]: /user-guide/rug/generators.md
<!-- [reviewers]: /user-guide/rug/reviewers.md -->

Individual Rugs can be composed.  For example, editors can be used by
Rug handlers, commands, and generators to modify code in a consistent
manner across many repositories.  Handlers can execute commands.
Events can fire reviewers, e.g., every PR can trigger a reviewer that
ensures it complies with your coding and submission standards.

## Events and code selection

How does a handler know what event it should act on?  How does an
editor know what part of what file to edit?  Atomist provides a
powerful mechanism for pinpoint selection of events and
code: [path expressions][path].  Inspired by [XPath][xpath], path
expressions provide a concise abstraction for navigating the various
elements in your code and development environment.  Path expressions
select related events satisfying specific criteria, e.g., a Slack user
whose GitHub user authored a commit that was in a push that triggered
a CI build that failed, and specific blocks of code in specific files,
e.g., all Scala methods that return `#!scala Boolean`.

[xpath]: https://en.wikipedia.org/wiki/XPath
[path]: /user-guide/rug/path-expressions.md

## Developing Rugs

Atomist is extensible.  Atomist ships with many useful capabilities,
but the ways in which Atomist can improve your development and
operations do not stop there.  The primary supported development
language for writing Rugs is [TypeScript][ts], although any language
that compiles to JavaScript can be used.  You can modify existing Rugs
or create your own Rugs to match your processes and workflows.

Atomist meets you where you are.  It doesn't make you change how your
team develops and ships code.  It improves your code and speeds the
shipping of great software.

[ts]: https://www.typescriptlang.org/
