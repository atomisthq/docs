#### Atomist
 1. the company that produces this spectacular glossary.
 2. a development automation platform, consisting of a service, a framework, and libraries to help you automate your software delivery, your way.

#### Atomist service
 the part of the Atomist platform that is operated by Atomist the company:
 the event hub, GraphQL endpoint, and web interface. [more info](developer/architecture.md)

#### autofix

a code transform that is applied every push. [more info](developer/autofix.md)

#### automations

in general, an automation is anything that a program does so that you don't have to. In this guide, an automation is something that Atomist runs for you. You can create automations (functions) and then have
Atomist run them when events happen or on demand.

#### channel link

inside a chat channel, you can link a repository to that channel. The Atomist bot will then send messages about
that repository to the channel. [more info](user/lifecycle.md#linked-channels)

#### code inspection

like an of automated code review; a function that looks at the code in a project and produces comments. Atomist can run them
after every push. [more info](developer/inspect.md)

#### code transform
 a function that operates on a project, changing the code inside it. [more info](developer/transform.md)

#### code transform

an automated code change. Write a function to change code, and apply it to one project or many projects, or after every commit. [more info](developer/transform.md)

#### command
 this is a thing that the Atomist bot (in team mode) or command line (in local mode) knows how to do. Each command has a phrase that triggers it, called an _intent_. As a person, send that intent to the `@atomist` bot in chat or to the `atomist` command line in the terminal. As an SDM developer, [register new commands](developer/commands.md) to teach Atomist how to respond to these.

#### command line utility (CLI)
 (or "atomist command line") a program that you install on your computer in order to run an SDM. It also does various other atomist-related things, especially in local mode. [more info](developer/cli.md)

#### command registration
 defines an intent and an implementation for a new command in an SDM. [more info](developer/commands.md)

#### community Slack
this Slack workspace is free for everyone to [join](https://join.atomist.com). Here, you can see Atomist in action
 on our own [open source projects](https://github.com/atomist). Ask us questions and discuss what you'd like to do
 or see with Atomist.

#### cortex

a database where Atomist stores correlated events

#### dashboard
 better known as the Atomist web interface, this lives at [app.atomist.com](https://app.atomist.com),
and it gives you access to some notifications and the settings for your Atomist workspace. [more info](user/dashboard.md)

#### delivery
 in this guide, delivery is about moving new code into production, through each of the fixes, checks, builds, publishments, deployments, and approvals that are necessary in your organization.

#### development automation
 programs that make the work of software development smoother. This includes delivery automation:
 getting new code through all its checkpoints and into production.
 Other examples include [project creation](developer/create.md), [issue creation](user/lifecycle.md,
  and code [maintenance](developer/transform.md).

#### durable

when an SDM is configured as durable, then when it is no longer connected, the Atomist event hub will queue events for it until it comes back up. [more info](developer/team.md#durable-subscriptions)

#### extension pack

a collection of integrations or useful functions that can be added to an SDM. [more info](pack/index.md)

#### feed
 (or "atomist feed" or "SDM feed") a place for a local-mode SDM to send you messages and updates, since it does not have access to chat. [more info](developer/cli.md#atomist-feed)

#### fingerprint

a distilled piece of important information about the code at a particular time. They can be compared to notice when a
change is significant in a particular way. [more info](developer/fingerprint.md)

#### generator
 a particular kind of [command](#command) that creates a new project. It starts from a seed, runs some [code transforms](#code-transform),
and puts the result in a new repository.

#### goal approval

goals can pause the work on a particular delivery flow, pending a human telling them to proceed.
A button appears on the push notification in chat.

#### goal preconditions

one goal can wait for another goal (or goals) to complete before starting. [more info](developer/set-goals.md#dependencies)

#### goal project listener
 A prerequisite to running a goal. This happens after a project is cloned and before the goal
 is executed. [see more](developer/goals-more.md#prepare-the-checked-out-code)

#### goals

steps to execute after a push. These are set by a software delivery machine. [more info](developer/goal.md)

#### intent
 (or "command intent") the phrase to type to trigger a command

#### lifecycle

in general, lifecycle means the stages in any process. In this guide, we talk about automations triggered in different parts of the software development lifecycle. _Lifecycle messages_ are the built-in notifications that the Atomist bot sends to chat
to describe issue, pull request, issue comment, and push events (along with build, goal, and other events correlated with the push). [more info](user/lifecycle.md)

#### listener

the SDM framework lets you register listeners to various useful events. [check the whole list](developer/event.md)

#### local mode
 when an SDM runs on your laptop, working only on code that's on your laptop, sending messages only to your laptop. [more info](developer/local.md)

#### project
 in this guide, "project" refers to a git repository with code in it.

#### project owner
 a grouping above projects. Projects are repositories, and they each belong to someone. On GitHub, the owner is a user or an organization. On BitBucket, the owner is a user or a BitBucket project.

#### projects directory
 (or "Atomist projects directory") this is a directory on your computer where local-mode SDMs will look for projects to work on. It defaults to $HOME/atomist/projects [more info](developer/local.md#directory-structure)

#### PushRule

Each argument to [`sdm.withPushRules`](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#withpushrules)
is a PushRule, contributing goals on a commit if a condition is met. That condition is a [PushTest](#pushtest).

#### push event

the most important event in delivery automation, a push represents new code arriving in a repository. Normally (in team mode) this is triggered when someone pushes commits to the central version control repository. In local mode, a push event is triggered on a commit.

#### push impact

a function that reacts to a change in code. It can do anything: send a message to chat, for instance. [more info](developer/goal.md#pushimpact)

#### push notification

the message that atomist bot sends to chat after each push event. It gets updated to include information about builds, goal, tags, deployments, and more. [more info](user/lifecycle.md#push)

#### PushTest

a function that decides whether a particular push is relevant. It can look at the code and return a boolean. [more info](developer/set-goals.md#pushtest)

#### registration

an object that provides instructions to an SDM or a goal. A registration includes a name (for diagnostics), and some specific action (a transform, an inspection, or a listener, depending on the built-in goal). Many registrations also include an optional PushTest, narrowing on particular pushes.

#### seed
 the starting point for a generator. A seed is a real project that serves as a model for new projects.

#### skills
 another name for commands. Skills are things Atomist knows how to do.

#### software delivery machine (SDM)
 a program that you run, which connects to the atomist service (in team mode) for triggering and chat integration. Your SDM runs your aspects, goals, and other development automations.

#### target
 1.  in project generation - (as in "target repository" or "target owner") when you run a generator, this is where Atomist will put the new project. See [project](#project) and [project owner](#project-owner)
 2.  in drift management - a value of an aspect that you want to move code to. When your organization has drift, then
 an aspect has multiple values across repositories. Choose one of these as a _target_ and set a policy for how to move
 toward it.

#### policy
Defines actions exercised automatically on your code in the service of furthering consistency and principles of 
soung governance.
In drift management, set a policy to have Atomist help you: for some aspect, set a target and 
choose a mechanism for automated change (such as pull requests).

#### drift report
a visualization of an aspect across your workspace

#### team
 in this guide, your team includes all the other people at your company who might interact with Atomist.

#### team mode
 an SDM running in team mode connects to the Atomist service. It might run on your laptop or in
a production environment within your network. [more info](developer/team.md)

#### version control
 in this guide, "version control" refers to the place where you push code to share it with your team
 like GitHub, GitLab, or BitBucket. Everyone uses git locally, right? (I know, not everyone does, but everyone who uses Atomist has to.)

#### web interface
 the Atomist web interface lives at [app.atomist.com](https://app.atomist.com),
and it gives you access to some notifications and the settings for your Atomist workspace. [more info](user/dashboard.md)

#### workspace
 many services have a concept of "workspace," and Atomist is one of them. An Atomist workspace represents your organization's account with Atomist.

#### drift
when code in various repositories becomes different in ways you care about. [more info](user/drift-report.md)

#### drift management
an approach for an organization to identify and fix issues in code and delivery process. This approach highlights the use of technology to identify when something changes, set policies, and monitor progress.

#### aspect

Some measure of code or process that you care about. View these in a [Drift Report](user/drift-report.md). 