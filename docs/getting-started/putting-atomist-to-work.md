Atomist can now be put to work to create a new project to work upon, or to work on an existing project.

### Use Atomist to Create a New Project

You can ask `@atomist` to create a new project for you either through a direct message or by addressing the bot on a channel it has been invited to. For our purposes here we'll assume you're starting the conversation in your Slack team's `#general` channel.

In the `#general` channel type:

```shell
@atomist generators
```

This will result in a list of project generators that `@atomist` can use on your behalf to create a new project in GitHub:

<div class="ss-container">
  <img src="../images/project-generators-list.png" alt="List of project generators" class="ss-small">
</div>

> ***NOTE***: You can create your own generators, amongst other customisations to Atomist using our Rug language and support. Creating and publishing your own generators will be a [Quick Start](../quick-starts) of its own soon.

While the full list *can* be useful if you're just browsing, for our purposes here we know we want to create a Spring Boot REST service and so we can narrow down the list by specifying some criteria:

```shell
@atomist generators spring
```

This time you should see an entry for the `NewSpringBootRestService` generator:

<div class="ss-container">
  <img src="../images/spring-boot-rest-service-generator-button.png" alt="Entry for the NewSpringBootRestService" class="ss-small">
</div>

Click on the `Generate project` button and you'll begin the process of interacting with `@atomist` to create your new project.

<div class="ss-container">
  <img src="../images/creating-a-new-project-start.png" alt="Starting a dialogue with Atomist to create a new project" class="ss-small">
</div>

The response from `@atomist` is to create a new [Slack thread](https://get.slack.help/hc/en-us/articles/115000769927-Message-threads) for this conversation. Click now on the `1 reply` link to open up the thread in Slack:

<div class="ss-container">
  <img src="../images/project-creation-thread-start.png" alt="Project creation thread with Atomist" class="ss-small">
</div>

Now run through the questions from Atomist until you see a submission panel with a `Generate project` button. This the case of `NewSpringBootRestService` this should only be entering the `project_name` parameter for your new project:

<div class="ss-container">
  <img src="../images/create-project-parameters.png" alt="Project parameters all set" class="ss-small">
</div>

You can set any of the default parameters by typing in `set <parameter> <value>` before you click on `Generate project`.

Now click on `Generate project` and you'll see several things happen:

- In the thread `@atomist` will announce `One moment while I run the generator`.
- `@atomist` will go and create the repository for you in your GitHub organization.
- `@atomist` will announce that it has `Successfully generated your project` in the main channel that the project creation thread was started in, in our case that would be `#general`. The announcement will also contain a link to the newly created project.
- `@atomist` will create a new channel in your Slack team for the new project, that will also be associated with the project's repository so when you want to work on that project, you do it in that channel.

Click on the project link to see your project in GitHub:

<div class="ss-container">
  <img src="../images/project-creation-response.png" alt="Project creation response from Atomist" class="ss-small">
</div>

Clone from GitHub and you will have a working starting project, courtesy of Atomist.

### Plugging Atomist into events from your Project Repository

With `@atomist` now successfully authorized you can use the bot to manipulate your repositories on GitHub. However another responsibility of Atomist is to be able to react to events that occur on your repositories as well.

To enable those repository events to promulgate into Atomist you need to configure a webhook from your GitHub organization. Navigate to your organizations GitHub page and then click on `Settings` and, from the menu, `Webhooks`:

<div class="ss-container">
  <img src="../images/gh-org-settings-for-atomist-webhook.png" alt="Settings page for GitHub webhooks" class="ss-small">
</div>

Click on `Add webhook` and then fill in the details shown below:

<div class="ss-container">
  <img src="../images/add-atomist-gh-webhook.png" alt="Filled form for adding the Atomist webhook to your organization" class="ss-small">
</div>

When you're done click on `Add webhook` and you should see the webhook added to the list for your organization:

<div class="ss-container">
  <img src="../images/atomist-webhook-added.png" alt="Atomist Webhook successfully added!" class="ss-small">
</div>

To see you new webhook in action, and how those events get interpreted in `@atomist`, make a small edit to one of the files in your repository (the `README.md` is usually a good candidate to make a small, inconseqential edit) either through the GitHub user interface or through a commit/push from a local edit.

When you have done the commit/push to master you should see those events happily appearing in your project's channel, `#sprockets` in our example here:

<div class="ss-container">
  <img src="../images/push-event-appearing-in-repo-channel.png" alt="Push event appearing in your project's channel" class="ss-large">
</div>

### Teaching Atomist a new Skill and Interacting with GitHub

Now let's do something else with GitHub. Let's create a new issue using `@atomist`. First we need to teach the Bot a new skill by registering a new `command`. Execute the following in your project's channel:

```shell
@atomist register command
```

You'll then be walked through an interaction with `@atomist` in a new thread to add a new command to Atomist's repertoire:

<div class="ss-container">
  <img src="../images/start-to-register-a-command.png" alt="Registering a Command with Atomist" class="ss-small">
</div>

When you complete this set of interactions you'll see a summary of the new command registration:

<div class="ss-container">
  <img src="../images/command-registration-summary.png" alt="Summary of new Command registration" class="ss-small">
</div>

Once you click the `Submit` button you will receive a message back in the original channel that `@atomist` has successfully registered a new command:

<div class="ss-container">
  <img src="../images/command-registered-successfully.png" alt="Registering a Command with Atomist" class="ss-small">
</div>

Registering a new command is like teaching `@atomist` a new skill. You've now enabled `@atomist` to be able to create a new issue for you on a repository in your GitHub organization, so let's give that a spin by entering the following in the `sprocket` channel that's associated with the `sprocket` project on GitHub:

```
@atomist create issue
```


> screen shot of  `@atomist create issue` sequence
> my first atomist issue ...

And because `@atomist` is also listening for GitHub activity, it gets the new issue event, and notifies in the channel.

> screen shot of bot message on issue creation, showing buttons

Notice that the notification about the new issue comes with some buttons to take actions, like `Assign` or `Bug` to label as a bug. Go ahead and label it as a bug by clicking on the bug button.

> screen shot of bot message attachment update that reflects a label was added

### Use Atomist on an Existing Project by inviting it to an Existing Channel

To be really useful, `@atomist` needs to be invited to the channels where you want it. Try inviting `@atomist`, using `/invite @atomist`, to a channel of your choosing. We suggest choosing a channel where you would like to receive notifications from a specific GitHub repo.

> [In `#sprockets` channel]:

> `/invite @atomist`

>[screen shot this ^ and - @atomist joined channel] - TBD got here to do screenshot.

`@atomist` listens for GitHub activity on a particular repo and notifies in its associated slack channel. In order to have `@atomist` listen to a specific repo and notify in the channel you just invited it to it needs to know which repo to listen to. If one is not already set when you invite `@atomist` to the channel, it will ask you for a repo name.

> screen shot

> @atomist: which repo ?

> @jryanday: sprockets

> @atomist: Sweet! All set to go now.

Now Atomist can talk to GitHub, listen for activity in a specific repo, and notify in the Slack channel we just invited it to.

### Next Step...

That's a rapid tour of using Atomist to work with your projects done, now it's time to enable Atomist to be able to [work with your Continuous Integration and Delivery pipelines...](configure-atomist-with-ci.md).
