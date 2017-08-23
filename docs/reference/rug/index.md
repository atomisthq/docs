Rug is the backbone of Atomist's features.  Atomist is about
automating away all the distractions from writing and operating great
software.  Rug provides the tools and infrastructure to make complete
automation a reality.  The model that underpins Rug helps you automate
common tasks and react to changes in your development ecosystem.

The Rug ecosystem includes a programming model, runtime, test runner,
and package manager.  The Rug programming model is expressed
as [TypeScript module][ts] interfaces and classes.  The Rug runtime
runs as a service, accessible from any Slack that has invited the
Atomist Bot (try it in [Atomist Community Slack][slack]).  There's
also the [Rug CLI][cli] for local use, essential for Rug development.

[ts]: https://www.typescriptlang.org/
[slack]: https://join.atomist.com/
[cli]: /user-guide/interfaces/cli/index.md

Rug is a medium for code that modifies code.  Rug helps developers
automate development.  When a coding task is common, tedious,
nit picky, or hard to remember how to do correctly, there is value in
encoding how it's done, instead of performing the typing every time.
Not only does the automation reduce mistakes, it serves as
documentation for the process.

## Automating your development tasks

It is said that good developers are lazy and like to automate their
work.  However, the tools to drive that automation have been somewhat
sparse and crude when we consider the sheer complexity of projects
nowadays.

### Triggering an automated response

In some cases, a response to a system event should be automated so the
team can focus on the things that require human attention.

In Rug, this is achieved through [event handlers][handlers].

[handlers]: event-handlers.md

### Triggering a human decision

Automation is fantastic but humans are the sole judges.  Atomist gives
you the power to implement new skills that can be triggered by a team
member at when needed.

In Rug, this is achieved through [command handlers][commands].

[commands]: command-handlers.md

### Creating new projects

In a world of rapidly evolving software, creating new projects has
become a task performed much more often than in the past. Meanwhile,
the complexity of projects has grown dramatically with configuration
required for logging, CI, dependency management...

It appears clear that automating the generation of projects is a prime
for any team willing to move fast but with repeatable quality.

In Rug, this is achieved through [generators][].

[generators]: generators.md

### Editing projects

Automating the creation of projects is a great step forward but it
cannot stop there. There are tasks that are repeated on a daily basis
and doing them manually can be error prone, not to mention rather
boring. Let's not forget that code quickly becomes legacy that nobody
knows really about any longer.

Automating those changes is an asset for any developer who wishes to
focus on delivering great software without wasting time in mundane
tasks.

In Rug, this is achieved through [editors][].

[editors]: editors.md

<!--
### Reviewing changes

In the last few years, code review has become a strong asset for any
team looking at producing high quality software and reducing
bugs. However, with the sheer size of projects, it can become highly
tedious to track all changes properly. Atomist believes some changes
can be reviewed automatically. The developer is still the one judging
of the relevancy of what Atomist could suggest of course but, at
least, the initial tedious task of gathering impacts of a change
should be automated.

In Rug, this is achieved through [reviewers][].

[reviewers]: reviewers.md
-->

## Examples

What does using Rug in your team look like in practice?  Here are just
a few examples.

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

In recent years, the DevOps trend has shown us that concerns about
software does not stop once it has been delivered.  Software exists
thanks to those who designed and developed it but thrives thanks to
those who operate it.  At Atomist, we believe those two sides live in
the same world and more must be done to unite them.  Atomist brings
everything together through *event-driven development*.

A common setup today is as follows:

*   A project's source code lives in GitHub
*   A project is automatically built and tested in a CI service
*   A project is usually automatically delivered in a forge somewhere
*   A project may even be deployed automatically in an environment
*   A project is then operated, monitored, and cared for in that
    environment for users to enjoy
*   Issues are created

During all those phases, a massive amount of events were triggered: a
commit was pushed, a build succeeded or failed, the project was
deployed, the service failed in production...

Atomist believes that all these events bring all the team members as
one.  However, not all events may not be able relevant to a team at a
given time.  Moreover, it seems appropriate to think that we should
also automate the response to some of those events.  This is why the
Rug programming model has a holistic view of development and
operation, allowing automation or user intervention at every step.
