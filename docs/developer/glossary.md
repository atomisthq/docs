#### seed
 the starting point for a generator. A seed is a real project that serves as a model for new projects.

#### generator
 a particular kind of [command](#command) that creates a new project. It starts from a seed, runs some [code transforms](#code-transform),
and puts the result in a new repository.

#### code transform
 a function that operates on a project, changing the code inside it. [more info](transform.md)

#### software delivery machine (SDM)
 a program that you run, which connects to the atomist service (in team mode) for triggering and chat integration. Your SDM runs your software delivery flow and other development automations.

#### team mode
 an SDM running in team mode connects to the Atomist service. It might run on your laptop or in 
a production environment within your network. [more info](team.md)

#### atomist command line utility (CLI)
 a program that you install on your computer in order to run an SDM. It also does various other atomist-related things, especially in local mode. [more info](cli.md)

#### delivery
 in this guide, delivery is about moving new code into production, through each of the fixes, checks, builds, publishments, deployments, and approvals that are necessary in your organization.

#### development automation
 programs that make the work of software development smoother. 
#### This includes delivery automation
 getting new code through all its checkpoints and into production. 
Other examples include [project creation](create.md), [issue creation](../user/lifecycle.md#issue), and code [maintenance](transform.md).

#### Atomist
 1. the company that produces this spectacular glossary. 
 2. a development automation platform, consisting of a service, a framework, and libraries to help you automate your software delivery (among other things)

#### Atomist service
 the part of the Atomist platform that is operated by Atomist the company
 the event hub, GraphQL endpoint, and dashboard. Check [architecture]() page for more information.

#### team
 in this guide, your team includes all the other people at your company who might interact with Atomist.

#### workspace
 many services have a concept of "workspace," and Atomist is one of them. An Atomist workspace represents your organization's account with Atomist. [more info](../user/dashboard.md#workspace)

#### version control
 in this guide, "version control" refers to the place where you push code to share it with your team
 like GitHub, GitLab, or BitBucket. Everyone uses git locally, right? (I know, not everyone does, but everyone who uses Atomist has to.)

#### local mode
 when an SDM runs on your laptop, working only on code that's on your laptop, sending messages only to your laptop. [more info](local.md)

#### project
 in this guide, "project" refers to a git repository with code in it.

#### target
 (as in "target repository" or "target owner") when you run a generator, this is where Atomist will put the new project. See [project](#project) and [project owner](#project-owner)

#### Atomist projects directory
 this is a directory on your computer where local-mode SDMs will look for projects to work on. It defaults to $HOME/atomist/projects [more info](local.md#directory-structure)

#### dashboard
 there are many dashboards in the world. This one lives at [app.atomist.com](https://app.atomist.com), 
and it gives you access to some notifications and the settings for your Atomist workspace. [more info](../user/dashboard.md)

#### skills
 another name for commands. Skills are things Atomist knows how to do.

#### intent
 (or "command intent") the phrase to type to trigger a command

#### command registration
 defines an intent and an implementation for a new command in an SDM. [more info](commands.md)

#### command
 this is a thing that the Atomist bot (in team mode) or command line (in local mode) knows how to do. Each command has a phrase that triggers it, called an _intent_. As a person, send that intent to the `@atomist` bot in chat or to the `atomist` command line in the terminal. As an SDM developer, [register new commands](commands.md) to teach Atomist how to respond to these.

#### feed
 (or "atomist feed" or "SDM feed") a place for a local-mode SDM to send you messages and updates, since it does not have access to chat. [more info](cli.md#atomist-feed)

#### project owner
 a grouping above projects. Projects are repositories, and they each belong to someone. On GitHub, the owner is a user or an organization. On BitBucket, the owner is a user or a BitBucket project.

#### push event

{!tbd.md!}

