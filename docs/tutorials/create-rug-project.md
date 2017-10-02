We provide a generator that can be run from your Slack team to create
a new Rug project using standard setup, sensible defaults, and starter
Rugs.

!!! missing "Prerequisites"
    Completing the [Getting Started Guide][getting-started] is a
    prerequisite for this tutorial.

[getting-started]: /getting-started/index.md

In `#general` or any channel in your Slack team that Atomist Bot has
been invited to, type this message:

```
@atomist new automation
```

The Atomist Bot will start a [thread][] off that message to
gather the information it needs to create the project.  Click now on
the "1 reply" link below the message to open up the thread in Slack.
You will see that the Atomist Bot has asked you a question in the
thread.

[thread]: https://get.slack.help/hc/en-us/articles/115000769927-Message-threads

<div class="ss-container">
  <img src="../images/rug-project-creation-thread-start.png" alt="Rug project creation thread with Atomist" class="ss-x-small">
</div>

Type in a name for your new project and press `Enter`.  A new
repository with this name will be created, so the project name must be
a valid GitHub repository name.

<div class="ss-container">
  <img src="../images/create-rug-project-parameters.png" alt="Rug project parameters all set" class="ss-x-small">
</div>

Now click on "Generate project" and the Atomist Bot will create the
project in a new GitHub repository, then confirm with a message
similar to the following.

<div class="ss-container">
  <img src="../images/rug-project-creation-response.png" alt="Rug project creation response from Atomist" class="ss-medium">
</div>

You now have a starter Rug project to write new Rugs in. Click on the project link
to see your project in GitHub.

You don't need to create a new automation project every time you want to write new Rugs. Often, you will add to an existing project.
