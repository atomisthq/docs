Rug is a medium for code that modifies code. Rug helps developers
automate development.  When a coding task is common, tedious,
nitpicky, or hard to remember how to do correctly, there's value in
encoding how it's done, instead of performing the typing every time.

The Rug ecosystem includes a language, runtime, test runner, and
package manager.  The Rug language is optional; there's also
a [TypeScript module][ts], so you can combine a general-purpose
language with the tooling of Rug.  The Rug runtime runs as a service,
accessible from any Slack that has invited the Atomist Bot (try it
in [Atomist Community slack][slack]).  There's also the [Rug CLI][cli]
for local use, essential for Rug development.

[ts]: https://the-composition.com/atomist-meet-typescript-2f2e16251d4f#.nmxmjfg6q
[slack]: https://join.atomist.com/
[cli]: /user-guide/interfaces/cli/index.md

### Some Use Cases for Rug

We are constantly finding new uses for Rug and here are a sample of
the cases that we, and others, have used Rug for so far:

*   Helping technical leads to guide development teams in best
    practices on various technologies from initial project creation
    through to the full lifecycle of a project
*   Safely applying and evaluating new technologies to existing
    projects
*   Helping open source project owners to guide their users on how to
    start out with, and continuously update and evolve, the software
    based on their work.
*   Helping to apply best-practice tools and techniques from the
    microservices toolbox

## Learn more

* [What goes in a Rug project?](archives.md)
* [A day in the life of a Rug project](lifecycle.md)
* [Rug CLI][cli]

----

Rug is the backbone of Atomist's features.

The Programming Model behind Rug supports the concepts exposed by Atomist to
help you automate common tasks and react to your ecosystem's live nature.

The high-level concepts are described in this page, please refer to
the [references][rugref] for more details on actually using this
model.

[rugref]: /reference/rug/index.md

## Automating your development tasks

It is said that good developers are lazy and like to automate their work.
However, the tools to drive that automation have been somewhat sparse and crude
when we consider the sheer complexity of projects nowadays.

Atomist acknwoledges the following typical use cases common to all teams:

*   Keeping track of and responding to what is going
*   Creating new projects
*   Editing existing projects
*   Reviewing changes

## Event-driven automation

"It works on my machine!" is saying we often hear. In recent years, the devops
trend has shown us that software does not stop once it has been delivered.
A software exists thanks to those who designed and developed it but thrive
thanks to those who operate it. Atomist believe those two sides live in the
same world and there should not be divided.

A common setup today is as follows:

*   a project's source code lives in a VCS somewhere, like GitHub, GitLab or
    BitBucket
*   a project is automatically built and tested in a CI service
*   a project is usually automatically delivered in a forge somewhere
*   a project may even be deployed automatically in an environment
*   a project is then operated, monitored and cared for in that environment for
    users to enjoy
*   maybe issues are created for developers to look at

During all those phases, a massive amount of events were triggered: a commit
was pushed, a build succeeded or failed, the project was deployed, the service
failed in production...

Atomist believes that all these events bring all the team members as one.
However, not all events may not be able relevant to a team at a given time,
moreover, it seems appropriate to think that we should also automate the
response to some of those events.

This is why Atomist extends the Rug programming model with:

*   Triggering a human decision
*   Triggering an automated response

### Triggering a human decision

Automation is fantastic but humans are the sole judges. Atomist gives you the
power to implement new skills that can be triggered by a team member at when
needed.

In Rug, this is achieved through Command Handlers (soon available).

### Triggering an automated response

In some cases, a response to a system event should be automated so the team
can focus on the things that require human attention.

In Rug, this is achieved through Event Handlers (soon available).

### Creating new projects

In a world of rapidly evolving software, creating new projects has become a
task performed much more often than in the past. Meanwhile, the complexity of
projects has grown dramatically with configuration required for logging, CI,
dependency management...

It appears clear that automating the generation of projects is a prime for any
team willing to move fast but with repeatable quality.

In Rug, this is achieved through [Generators][ruggen].

[ruggen]: generators.md

### Editing projects

Automating the creation of projects is a great step forward but it cannot stop
there. There are tasks that are repeated on a daily basis and doing them
manually can be error prone, not to mention rather boring. Let's not forget that
code quickly becomes legacy that nobody knows really about any longer.

Automating those changes is an asset for any developer who wishes to focus on
delivering great software without wasting time in mundane tasks.

In Rug, this is achieved through [Editors][rugedit].

[rugedit]: editors.md

### Reviewing changes

In the last few years, code review has become a strong asset for any team
looking at producing high quality software and reducing bugs. However, with the
sheer size of projects, it can become highly tedious to track all changes
properly. Atomist believes some changes can be reviewed automatically. The
developer is still the one judging of the relevancy of what Atomist could
suggest of course but, at least, the initial tedious task of gathering
impacts of a change should be automated.

In Rug, this is achieved through Reviewers (soon available).
