Atomist can now be put to work, creating projects, editing code,
managing issues, and generally tying your whole development process
together.  Let's kick things off by having the Atomist Bot create a
new project for us.

### Use Atomist to create a new project

You can ask the Atomist Bot to create a new project for you either
through a direct message or by addressing the Bot in a channel it has
been invited to.  For our purposes, we will assume you are starting
the conversation in your Slack team's `#general` channel.  In the
`#general` channel, type the following message.

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

!!! note ""
    You can create your own generators.  Creating your own generators
    will soon be added as a [Quick Start](../guides/).

While the full list of project generators *can* be useful if you are
just browsing, we want to create a [Spring Boot][boot] REST service, so we can
narrow down the list by providing a search term, `spring` in this
case.

[boot]: https://projects.spring.io/spring-boot/

```
@atomist generators spring
```

This time the Atomist Bot should respond with a list of project
generators that includes the *NewSpringBootRestService* generator.

<div class="ss-container">
  <img src="../images/spring-boot-rest-service-generator-button.png" alt="Entry for the NewSpringBootRestService" class="ss-medium">
</div>

Click on the "Generate project" button to begin the process of
creating your new project.

<div class="ss-container">
  <img src="../images/creating-a-new-project-start.png" alt="Starting a dialogue with Atomist to create a new project" class="ss-medium">
</div>

The Atomist Bot will respond with a message telling you what project
generator you created and then create a [thread][] off that message to
gather the information it needs to create the project.  Click now on
the "1 reply" link below the message to open up the thread in Slack.
You will see that the Atomist Bot has asked you a question in the
thread.

[thread]: https://get.slack.help/hc/en-us/articles/115000769927-Message-threads

<div class="ss-container">
  <img src="../images/project-creation-thread-start.png" alt="Project creation thread with Atomist" class="ss-small">
</div>

Type in a name for your new project and press <Enter>.  The project
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
    announcement will contain a link to the newly created project.
-   Atomist will create a new channel in your Slack team for the new
    project, that will also be associated with the project's
    repository so when you want to work on that project, you do it in
    that channel.

<div class="ss-container">
  <img src="../images/project-creation-response.png" alt="Project creation response from Atomist" class="ss-medium">
</div>

Click on the project link to see your project in GitHub.

<div class="ss-container">
  <img src="../images/github-project.png" alt="GitHub Project page" class="ss-small">
</div>

Clone your new repository from GitHub and you will have a new, working
project courtesy of Atomist.

### Connecting Atomist to GitHub

In addition to creating and editing projects, Atomist can react to
events that occur on your repositories as well.  For example, Atomist
can send messages when [pull requests][pr] are created or assign
someone to an [issue][].

[issue]: https://help.github.com/articles/about-issues/
[pr]: https://help.github.com/articles/about-pull-requests/

GitHub notifies external systems like Atomist about repository and
organization events using [webhooks][].  To enable GitHub events to
promulgate into Atomist you need to add the Atomist webhook URL in the
settings of
the [GitHub account you previously authorized][account-auth].  The
next two sections provide instructions for each of the GitHub account
authorization options: organization and individual.  You should only
work through the instructions for the account authorization option

[webhooks]: https://help.github.com/articles/about-webhooks/
[account-auth]: connect-atomist-to-github.md#github-account-authorization

#### Add the Atomist webhook to your GitHub organization

If you added Atomist to a GitHub organization when you performed the
account authorization, navigate to that GitHub organization's page,
click on "Settings", and select "Webhooks" from the left menu.

<div class="ss-container">
  <img src="../images/gh-org-settings-for-atomist-webhook.png" alt="Settings page for GitHub organization webhooks" class="ss-large">
</div>

Click the "Add webhook" button and fill in the details as shown below.

<div class="ss-container">
  <img src="../images/add-atomist-gh-webhook.png" alt="Filled form for adding the Atomist webhook to your organization" class="ss-medium">
</div>

When you have filled in the webhook form, click the "Add webhook"
button at the bottom of the form.  You should then see that the
webhook has been added to the list of webhooks for your organization.

<div class="ss-container">
  <img src="../images/atomist-webhook-added.png" alt="Atomist Webhook successfully added!" class="ss-medium">
</div>

#### Add the Atomist webhook to your individual repositories

If you added Atomist to an individual account when you performed the
account authorization, adding webhooks is not as convenient.  GitHub
does not support webhooks on an individual account.  Therefore, you
need to add the Atomist webhook to every repository you want Atomist
to receive events from.  Fortunately, the process of adding the
webhook is the same for each repository.  For each repository, go to
the repository's GitHub page, click on "Settings", and select
"Webhooks" from the left menu.

<div class="ss-container">
  <img src="../images/gh-repo-settings-webhooks.png" alt="Settings page for GitHub repository webhooks" class="ss-large">
</div>

From here, the process for adding each repository webhook is identical
to adding an organization webhook.  Fill out the webhook form just as
we showed above and click the "Add webhook" button at the bottom of
the form.

<div class="ss-container">
  <img src="../images/add-atomist-gh-webhook.png" alt="Filled form for adding the Atomist webhook to your organization" class="ss-medium">
</div>

### Seeing GitHub events in Slack

Now that you have added the Atomist webhook to your GitHub
configuration and events are flowing from GitHub into Atomist, these
events will begin to show up in Slack.  To see your new webhook in
action, and how those events get interpreted in `@atomist`, make a
small edit to one of the files in your repository (the `README.md` is
usually a good candidate to make a small, inconseqential edit) either
through the GitHub user interface or through a commit/push from a
local edit.

When you have done the commit/push to master you should see those
events happily appearing in your project's channel, `#sprockets` in
our example here:

<div class="ss-container">
  <img src="../images/push-event-appearing-in-repo-channel.png" alt="Push event appearing in your project's channel" class="ss-large">
</div>

### Using GitHub in Slack

Getting well-formatted message in Slack about what is happening to
your project on GitHub is nice, but it only scratches the surface of
what Atomist can do.  In addition to passively receiving and then
displaying GitHub events, Atomist can create and modify code, issues,
and PRs on GitHub, all without you ever having to leave Slack.  Let's
use the Atomist Bot to create a GitHub Issues for us.

Before we can create GitHub issues in Slack, we have to enable the
functionality in the Atomist Bot.  We do this by registering the
appropriate command, `CreateIssue` in this case, with the Atomist Bot
in your Slack.  In other words, we are going to teach *your* Atomist
Bot a new trick.  Send the following message to your Atomist Bot.

```
@atomist register command
```

Your Atomist Bot will respond by creating a thread and ask you some
questions about the command you want to register.

<div class="ss-container">
  <img src="../images/start-to-register-a-command.png" alt="Registering a Command with Atomist" class="ss-small">
</div>

After you answer all the questions, you will see a summary of the
command registration information.

<div class="ss-container">
  <img src="../images/command-registration-summary.png" alt="Summary of new Command registration" class="ss-small">
</div>

Click the "Submit" button and your Atomist Bot will respond back in
the original channel, saying it has successfully registered a new
command.

<div class="ss-container">
  <img src="../images/command-registered-successfully.png" alt="Registering a Command with Atomist" class="ss-medium">
</div>

Your Atomist Bot will now be able to create new issues for you in
GitHub.  Let's try it out.  Send the following message in the
`#sprocket` channel that's associated with the `sprocket` project on
GitHub.

```
@atomist create issue
```

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

But that's not where the interaction stops. You Atomist Bot will also
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

You will see a new message in the `#sprocket` channel from your
Atomist Bot notifying you that the issue has been updated.

<div class="ss-container">
  <img src="../images/new-comment-notification-in-slack.png" alt="New comment notification in Slack" class="ss-medium">
</div>

The circle is complete!  After connecting Atomist and GitHub, we can
see GitHub events in Slack, take action on them, and see the result in
GitHub and Slack.

### Using Atomist on an existing project

You almost certainly have many existing projects that you would like
Atomist's help keeping track of.  To get Atomist's help with existing
GitHub repositories, simply invite the Atomist Bot to a channel with
the same name as the repository.  You can invite the Atomist Bot to a
channel just as you would invite any other user, e.g., by using the
`/invite @atomist` command.  Once the Atomist Bot is in the channel,
it will begin reporting on activity in the associated repository and
you can interact with the repository, creating and assigning issues,
etc., just as you do with channels the Atomist Bot creates when it
creates the repositories.

<!--

If you prefer not to have the channel and repository have the same
name, you can tell the Atomist Bot what repository to associate with a
channel by sending the message `repo` to the Atomist Bot in that
channel.

```
@atomist repo REPOSITORY_NAME
```

Replace `REPOSITORY_NAME` in the above command with the name of the
repository you want the Atomist Bot to associate with the current
channel.

-->
