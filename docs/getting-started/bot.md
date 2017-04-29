Atomist can now be put to work: reporting on events in your
development, creating projects, editing code, managing issues, and
generally tying your whole development process together.  Let's kick
things off by connecting some of your existing code repositories to
your chat channels.  After than, we'll use the Atomist Bot to create a
new project for us using a generator.

## Using Atomist on existing projects

You almost certainly have many existing projects that you would like
Atomist's help keeping track of.  To get Atomist's help with an
existing GitHub repository, simply invite the Atomist Bot to a channel
where you discuss that repository.  You can invite the Atomist Bot to
a channel just as you would invite any other user, e.g., by using the
`/invite @atomist` command.  Once the Atomist Bot is in the channel,
you can tell the Atomist Bot what repository to associate with the
channel using by sending it the `repo` message.  The `repo` command
takes a single argument, the name of the repository you want to
associate with the channel.  You supply just the name of the
repository, not including the repository owner since the Atomist Bot
already knows what GitHub organization is associated with your Slack
team.

```
@atomist repo REPOSITORY_NAME
```

!!! caution ""
    If you are working through these steps in
    the [Atomist Community Slack][community], associations can only be
    made with repositories in the `atomist` GitHub organization.

Once the association is made, the Atomist Bot will begin reporting on
activity in the associated repository and you can interact with the
repository, reporting on pushes, creating and assigning issues, etc.
If you have connected Atomist with your CI system, you will also see
builds as they start and are completed.

<div class="ss-container">
  <img src="../images/commit-build.gif" alt="Commits and builds in a chat channel" class="ss-medium">
</div>

At any time you can ask the Atomist Bot to tell you what repository is
associated with the current channel by sending it the `repos` message.

```
@atomist repos
```

The Atomist Bot will respond with the repositories linked to the
current channel, providing links to the repositories and buttons to
allow you to quickly un-link the channel and repository.

<div class="ss-container">
  <img src="../images/repos-linked.png" alt="Repositories linked to a channel" class="ss-medium">
</div>

## Create a new project

You can ask the Atomist Bot to create a new project for you either
through a direct message or by addressing the Bot in a channel it has
been invited to.  For our purposes, we will assume you are starting
the conversation in your Slack team's `#general` channel, which the
Atomist Bot joins when invited to your Slack team, and that the
Atomist Bot is named `@atomist`.  In the `#general` channel, type the
following message.

```
@atomist generators
```

The Atomist Bot will reply with a list of project generators that it
can use on your behalf to create a new project in GitHub.  The Atomist
Bot will respond with a list of project generators something like the
following.

<div class="ss-container">
  <img src="../images/project-generators-list.png" alt="List of project generators" class="ss-medium">
</div>

While the full list of project generators *can* be useful if you are
just browsing, we want to create a [Spring Boot][boot] REST service,
so we can narrow down the list by providing a search term, "spring" in
this case.

[boot]: https://projects.spring.io/spring-boot/

```
@atomist generators spring
```

This time the Atomist Bot will respond with a list of project
generators matching the search term, including the
*NewSpringBootRestService* generator.

<div class="ss-container">
  <img src="../images/spring-boot-rest-service-generator.png" alt="Entry for the NewSpringBootRestService" class="ss-medium">
</div>

Click on the "Generate project" button to begin the process of
creating your new project.

<div class="ss-container">
  <img src="../images/creating-a-new-project-start.png" alt="Starting a dialogue with Atomist to create a new project" class="ss-medium">
</div>

The Atomist Bot will respond with a message telling you what project
generator you created and then start a [thread][] off that message to
gather the information it needs to generate the project.  Click now on
the "1 reply" link below the message to open up the thread in Slack.
You will see that the Atomist Bot has asked you a question in the
thread.

[thread]: https://get.slack.help/hc/en-us/articles/115000769927-Message-threads

<div class="ss-container">
  <img src="../images/project-creation-thread-start.png" alt="Project creation thread with Atomist" class="ss-small">
</div>

Type in a name for your new project and press `Enter`.  The project
name must be a valid GitHub repository name, containing only letters,
numbers, dashes (`-`), and underscores (`_`).  Since the project name
is the only required input parameter for the
*NewSpringBootRestService* generator, the Atomist Bot will respond
with a message showing the project name you entered and the default
values for all the other input parameters.

<div class="ss-container">
  <img src="../images/create-project-parameters.png" alt="Project parameters all set" class="ss-small">
</div>

You can change the value for any of the parameters by typing in `set
<parameter> <value>` before you click on `Generate project`.

Now click on `Generate project` and you'll see several things happen:

-   In the thread, the Atomist Bot will announce "One moment while I
    run the generator."
-   Atomist will go and create the repository for you in the GitHub
    account you previously authorized.
-   The Atomist Bot will announce that it has "Successfully generated
    your project" back in the main channel where the project creation
    thread was started in, in our case that would be `#general`.  The
    announcement will contain a link to the newly generated project.
-   Atomist will create a new channel in your Slack team for the new
    project, that will also be associated with the project's
    repository so when you want to work on that project, you do it in
    that channel.

!!! caution ""
    If you are working through these steps in
    the [Atomist Community Slack][community], the new repository will
    be created under your personal GitHub account and the Atomist Bot
    will *not* create a Slack channel for the repository.

[community]: https://join.atomist.com/

!!! tip "Link existing channels and repositories"
    The Atomist Bot will automatically link repositories and channels
    it creates, but you can link existing repositories to channels
    too.  See [Using Atomist on existing projects][existing] below.

[existing]: #using-atomist-on-existing-projects (Getting Started - Use Atomist on Existing Projects)

Here's what the successful project creation message looks like:

<div class="ss-container">
  <img src="../images/project-creation-response.png" alt="Project creation response from Atomist" class="ss-medium">
</div>

Click on the project link to see your project in GitHub.

<div class="ss-container">
  <img src="../images/github-project.png" alt="GitHub Project page" class="ss-small">
</div>

Clone your new repository from GitHub and you will have a new, working
project courtesy of Atomist.

## GitHub and CI notifications

In addition to creating projects and Slack channels, Atomist can react
to events that occur on your repositories as well.  Still in Slack, go
to the new channel Atomist created for your new project.  The channel
will have the same name as the repository.

!!! attention ""
    If the name of the project you created is longer than 21
    characters, the channel name will be truncated to 21 characters,
    the maximum length channel name Slack allows.

!!! caution ""
    If you are working through these steps in
    the [Atomist Community Slack][community], a Slack channel will not
    be created.  You can see example GitHub and CI notifications in
    channels associated with the Atomist open source project
    repositories like `#rug` and `#rug-cli`.

Make sure your new repository is set up to automatically build on your
CI system.  Once the CI is configured for the project, let's make a
small change in project and commit it to see what the commit and build
messages look like.

<div class="ss-container">
  <img src="../images/sprockets-readme-edit.png" alt="Edit README" class="ss-small">
</div>

<div class="ss-container">
  <img src="../images/sprockets-readme-commit.png" alt="Commit README" class="ss-large">
</div>

In this example, the project is enabled in Travis CI, so our commit
triggers a Travis CI build.  Atomist, being connected to both GitHub
and Travis CI, receives information about the commit from GitHub and a
notifications from Travis CI about each step of the build process.
Below you see a message from the Atomist Bot correlating the commit
with the just-started build.

<!-- TODO this image has the wrong org -->
<div class="ss-container">
  <img src="../images/sprockets-commit-notification.png" alt="Commit Notification" class="ss-small">
</div>

## GitHub Issues and Pull Requests

Atomist can send messages when events occur on [issues][issue]
and [pull requests (PRs)][pr], for example when a PR is opened or
someone comments on an [issue][].  Here's an example of a message the
Atomist Bot sends when someone closes and issue.

[pr]: https://help.github.com/articles/about-pull-requests/ (GitHub Pull Requests)
[issue]: https://help.github.com/articles/about-issues/ (GitHub Issues)

<div class="ss-container">
  <img src="../images/github-close-issue.png" alt="GitHub Issue Close Message" class="ss-small">
</div>

## Changing GitHub from Slack

Getting well-formatted message in Slack about what is happening to
your project on GitHub is nice, but it only scratches the surface of
what Atomist can do.  In addition to passively receiving and then
displaying GitHub events, Atomist can generate and modify code and
open issues and PRs, all without you ever having to leave Slack.
Let's use the Atomist Bot to create a GitHub Issue for us.

We can open GitHub Issues without leaving Slack by sending a `create
issue` message to the Atomist Bot.  When running commands like this,
the Atomist Bot is aware of the context in which it is asked to run
the skill.  This allows the Atomist Bot to collect less information in
certain situations.  As an example, let's run the `create issue`
command in the `#general` channel of your Slack team.

```
@atomist create issue
```

The Atomist Bot responds in a thread, collecting the information it
needs to send to the command handler.

<div class="ss-container">
  <img src="../images/create-issue-flow-general.png" alt="Creating a GitHub Issue in #general" class="ss-small">
</div>

Since the `#general` channel is not linked to a specific GitHub
repository, the Atomist Bot must ask you in what repository you
want to create the issue.

Compare this to sending the same `create issue` message sent to the
Atomist Bot in the `#sprocket` channel it created earlier when it
generated the sprocket project for us.  When the Atomist Bot created
the project and channel, it linked them together.  This linking
becomes part of the context when the Atomist Bot responds to messages
in that channel.  In this case, this means that when you run commands
that require a GitHub repository as input in the `#sprocket` channel,
the Atomist Bot does not need to ask you for the repository name, it
already knows and supplies that information to the command handler
automatically.

As usual, your Atomist Bot will start a thread to collect all the
information necessary it needs to complete the request, creating a new
issue on the `sprocket` project.

<div class="ss-container">
  <img src="../images/create-issue-flow.png" alt="Creating an Issue" class="ss-small">
</div>

Once you have entered all the needed information, your Atomist Bot
will respond with a summary and the option to submit or cancel.

<div class="ss-container">
  <img src="../images/create-issue-dialog.png" alt="Issue Summary" class="ss-small">
</div>

Click the "Submit" button and Atomist will create the issue and then
respond back in the main `#sprocket` channel.

<div class="ss-container">
  <img src="../images/successfully-created-issue-response.png" alt="Issue Created" class="ss-medium">
</div>

But that's not where the interaction stops.  The Atomist Bot will also
post a message in the `#sprocket` channel containing a summary of the
newly created issue *and* some buttons for common actions taken on
issues: assign it someone, add a label, add a comment, etc.

<div class="ss-container">
  <img src="../images/new-issue-follow-on-buttons.png" alt="Issue Created" class="ss-medium">
</div>

Go ahead and click on the link to see the issue on GitHub.

<div class="ss-container">
  <img src="../images/new-issue-in-github.png" alt="Issue in GitHub" class="ss-large">
</div>

Now head back to the `#sprocket` channel in Slack and click on the
"Bug" button to add the "bug" label to the issue:

<div class="ss-container">
  <img src="../images/issue-labelled-as-bug-response.png" alt="Issue labelled as a Bug" class="ss-medium">
</div>

We see the Atomist Bot responding that it has successfully edited the
issue.  Let's make sure.  Click on the link to open up the issue in
GitHub.

<div class="ss-container">
  <img src="../images/issue-in-github.png" alt="Issue in GitHub" class="ss-large">
</div>

We can see that Atomist, as us, has labeled the issue a bug, just as
we asked.

Now imagine that you are another team member who has noticed this new
issue and wants to add a comment from inside GitHub.  Using the GitHub
web interface, add a comment and click the "Comment" button.

<div class="ss-container">
  <img src="../images/new-issue-comment-in-github.png" alt="New comment on issue in GitHub" class="ss-large">
</div>

You will see a new message in the `#sprocket` channel from the Atomist
Bot notifying you that the issue has been updated.

<div class="ss-container">
  <img src="../images/new-comment-notification-in-slack.png" alt="New comment notification in Slack" class="ss-medium">
</div>

The circle is complete!  After connecting Atomist and GitHub, we can
see GitHub events in Slack, take action on them, and see the result in
GitHub and Slack.
