We provide a generator that can be run from your Slack team to create a new Rug project using standard setup, sensible defaults, and starter Rugs.

In `#general` or any channel in your Slack team that Atomist Bot has been invited to, type this message:

```
@atomist generators
```

The Bot will respond with a list of project generators like following.

<div class="ss-container">
  <img src="../images/new-rug-generator.png" alt="List of project generators" class="ss-medium">
</div>

Click on the "Generate project" button for the `NewStarterRugProject` generator.

The Atomist Bot will respond with a message telling you what project
generator you created and then start a [thread][] off that message to
gather the information it needs to generate the project.  Click now on
the "1 reply" link below the message to open up the thread in Slack.
You will see that the Atomist Bot has asked you a question in the
thread.

[thread]: https://get.slack.help/hc/en-us/articles/115000769927-Message-threads

<div class="ss-container">
  <img src="../images/rug-project-creation-thread-start.png" alt="Rug project creation thread with Atomist" class="ss-small">
</div>

Type in a name for your new project and press `Enter`.  A new repository with this
name will be created, so the project name must be a valid GitHub repository name,
containing only letters, numbers, dashes (`-`), and underscores (`_`).  Since the project name
is the only required input parameter for the generator, the Atomist Bot will respond
with a message showing the project name you entered and the default
values for all the other input parameters.

<div class="ss-container">
  <img src="../images/create-rug-project-parameters.png" alt="Rug project parameters all set" class="ss-small">
</div>

Now click on "Generate project" and the Bot will create the project in a new GitHub repository, then confirm with a message similar to the following.

<div class="ss-container">
  <img src="../images/rug-project-creation-response.png" alt="Rug project creation response from Atomist" class="ss-medium">
</div>

Click on the project link to see your project in GitHub.

<div class="ss-container">
  <img src="../images/github-rug-project.png" alt="GitHub Project page" class="ss-medium">
</div>

You now have a starter Rug project to write new Rugs in. See other tutorials to create Rugs
inside your new Rug project.
