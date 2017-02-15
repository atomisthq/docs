# Quick Start

So you want to get started streamlining your development with Atomist. You're in the right place. This guide is a companion to guide you through enrolling and getting started. In this Quick Start, you will:

- Set up the `@atomist` bot in your Slack team to get notifications and be able to take actions across GitHub and CI
- Authorize Atomist on your GitHub Organization or user account so that we can show notifications in Slack and automate actions in GitHub for you
- Optionally, configure Atomist to listen for your CI events (currently Travis CI or Jenkins)
- Set up automated event handling for common development flow activities
- Create your first custom automation

## Before you get started

You'll want these in place before we get going:

* A Slack team where you can authorize the `@atomist` bot
* A GitHub org or user account to authorize the Atomist OAuth app

Okay, let's get started!

## Set up Atomist in Slack

Authorize the [Atomist Slack App](). You'll be asked to sign into your team if you're not already signed in.

![Authorize](images/authorize.png)

Once you have completed the authorization, you will be redirected to your Slack team where you should see a direct message from `@atomist` saying hello.

[screen shot for DM confirmation]

To be really useful, `@atomist` needs to be invited to the channels where you want it. Try inviting `@atomist` to

> [In `#general` channel]:

> `/invite @atomist`

[screen shot - @atomist joined channel]

## Next Up: GitHub Authorization

To get started helping streamline your development process, we start with GitHub. Specifically, you'll want to authorize the Atomist OAuth app.

Just summon `@atomist` to authorize GitHub.

> `@atomist github`

> screen shots of the org auth _and_ user auth
> show flow of authorizing org
> show flow of authorizing user (this is the user commands are run as when you as `@atomist` to e.g. list issues)

Whew! Now that's done, let's do something with GitHub. Let's create a new issue. [Note: the channel/repo mapping needs to be set]

> screen shot of  `@atomist create issue` sequence
> my first atomist issue ...

And because `@atomist` is also listening for GitHub activity, it gets the new issue event, and notifies in the channel.

> screen shot of bot message on issue creation, showing buttons

Notice that the notification about the new issue comes with some buttons to take actions, like `Assign` or `Bug` to label as a bug. Go ahead and label it as a bug by clicking on the bug button.

> screen shot of bot message attachment update that reflects a label was added

## Configure CI

### Travis CI

* Travis uses your GH user access token, so no need for a separate auth
* Need to configure projects by adding travis.yml to them
  - either ask for a repo with travis.yml
  - or run an editor to create one
* Create a simple commit, commit, watch notifications
* buttons in notification?

### Jenkins

* the setup steps
* make a commit to trigger a build, see notifications (make sure its working)
* buttons in notification?

### Build your first automation

Right! You've seen some of the automation between issues, commits, builds that we provide in the Rug catalog. Now, let's automate an action. In Atomist, that means writing a `handler` to be triggered by a certain type of activity. For example, perhaps you want to notify the team when an issue labeled 'bug' gets fixed.

* Run generator to create handler, or provide the code example
* Highlights:
  - Path expression to match issue labeled as bug that gets closed
  - message builder code and send

There, you did it! You just created a new automation, and taught the bot to listen for events and run that automation. Well done!
