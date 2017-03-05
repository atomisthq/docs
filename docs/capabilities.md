Atomist is all about helping you ship high-quality software in less
time.  Whether you are working with large legacy codebases, your own
"majestic monoliths", or aiming for "zero-overhead microservices",
Atomist provides you with the tools to speed development, smooth
operations, and close the code/runtime feedback loop.

## Bringing everything together

Atomist consumes events from the platforms and tools you use everyday.
By linking related events from source code repositories, continuous
integration, testing, and runtime environments, Atomist can present
them in a unified manner to appropriate team members via direct or
group messages.  The result is massive reductions in context-switching
costs and and shorter incident time-to-resolution.

<!-- *That rug really tied the room together, did it not?* -->

Rug is the eventing runtime that ties everything together.  Rug not
only understands events, but can respond to events with appropriate,
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

The Rug programming model provides several different types of Rugs to
help you manage your development and operations lifecycle.

<!-- can we improve the layout of the items below? -->

**Event-driven actions: <span class="rugs">[Handlers][handlers]</span>** - Rug
handlers respond to events.  Handlers can use the information on an
event and its related events to message the right team members, take
direct action, and/or create new events, which can trigger other
handlers.

**ChatDev and ChatOps: <span class="rugs">[Commands][commands]</span>** - Rug
commands are tasks you can execute within chat, automating common
tasks in software development and operation.  Want to release a new
version of your service to production?  Do it right in chat with a
command.

**Project updates: <span class="rugs">[Editors][editors]</span>** - Rug editors
modify code directly and consistently.  Need to add or update a
dependency and boilerplate code?  Codify it in an editor.

**Project creation: <span class="rugs">[Generators][generators]</span>** - Rug
generators create new projects from a model project.  More powerful
than templating approaches, generators are real projects operating
under native tooling.

**Project compliance: <span class="rugs">[Reviewers][reviewers]</span>** - Rug
reviewers ensure a project conforms with your standards.  Like an
editor, without the editing.

Individual Rugs can be composed.  For example, editors can be used by
Rug handlers, commands, and generators to modify code in a consistent
manner across many repositories.  Handlers can execute commands.
Events can fire reviewers, e.g., check every PR for the required

[handlers]: /user-guide/rug/handlers.md
[commands]: /user-guide/rug/commands.md
[editors]: /user-guide/rug/editors.md
[generators]: /user-guide/rug/generators.md
[reviewers]: /user-guide/rug/reviewers.md

## Events and code selection

How does a handler know what event it should act on?  How does an
editor know what part of what file to edit?  Atomist provides a
powerful mechanism for pinpoint selection of events and
code: [path expressions][path].  Inspired by [XPath][xpath], path
expressions provide a concise abstraction for navigating Rug entities.
Path expressions select related events satisfying specific criteria,
e.g., a Slack user whose GitHub user authored a commit that was in a
push that triggered a CI build that failed.  Path expressions are also
used to identify specific blocks of code in specific files to operate
on.

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
team develops and ships code, it improves and speeds shipping great
software.

[ts]: https://www.typescriptlang.org/
