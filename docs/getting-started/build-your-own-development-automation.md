Right! You've seen some of the automation between issues, commits, builds that we provide out-of-the-box and now let's automate an action.

In Atomist that means writing a `handler` in TypeScript using the Atomist's [Rug](../reference-docs/rug) support. The `handler` will be triggered by a certain type of activity that Atomist can detect, in this example case you want to notify the team when an issue labeled 'bug' gets fixed.

### Create a new Rug Handlers project for your new automation

The first thing you need is a project for your code. Although you can add Atomist Rug code to any existing project by simply adding a `.atomist` directory along with a few support files in this case we'll create and publish a new project for your first Atomist Rug development automation.

Ask the Bot to list out the project generator that you need by typing `@atomist generator rug` and select the `NewHandlersProject` generator:

<div class="ss-container">
  <img src="../images/new-rug-handlers-project-button.png" alt="NewHandlersProject generator" class="ss-small">
</div>

Click on the `Create project` button and enter the following information to create your new project:

<div class="ss-container">
  <img src="../images/create-handlers-project-flow.png" alt="Creating the handlers project" class="ss-small">
</div>

Once done you can click on `Generate project` in the project generation summary:

<div class="ss-container">
  <img src="../images/create-handlers-project-summary.png" alt="New handlers project summary" class="ss-small">
</div>

Then `@atomist` will create the new project in your GitHub organization:

<div class="ss-container">
  <img src="../images/new-handlers-project-created.png" alt="New handlers project created message" class="ss-small">
</div>

Also `@atomist` will have created a new `#handlers` channel in Slack that's tied to that project that shows some initial setup commits made by the project generator:

<div class="ss-container">
  <img src="../images/handlers-slack-channel-created.png" alt="Handlers slack channel initialised" class="ss-small">
</div>

Clone the new `handlers` project locally and, because we're using TypeScript, change directory into the `.atomist` directory of the local `handlers` project and enter `npm install` to get the TypeScript library dependencies installed:

```shell
> npm install
/.../handlers/.atomist
├─┬ @atomist/github@0.2.0
│ └── @atomist/rug@0.10.0
├── @atomist/rug@0.12.0
└─┬ @atomist/travis@0.6.1
  └── @atomist/rug@0.10.0
```

> ***NOTE***: To develop your rugs in TypeScript you will need [`node.js` and `npm`](https://nodejs.org) installed locally.

Now it's time to write your new handler.

### Writing your new `handler`

The `handlers` project you have just generated contains a number of pre-existing handlers that you can take inspiration from. For our purposes we only want one new handler and the closest example in the `handlers` project is the TBD.

### Publish your new `handler`

To make Atomist aware of your new `handler` you need to publish the project. This can be done via continuous integration but for our purposes here you're going to see how it's done manually using the [Rug CLI](../rug/rug-cli).

#### Installing and Configuring the Rug CLI

Highlights:
- repositories configure - login first
- repositories login
- Use GitHub user and password
- Generate and use GitHub token for CLI with read/org scope
- run repositories configure again to see what's been set up.

#### Publishing your `handlers` project using the Rug CLI

### Seeing your new `handler` in action

There, you did it! You just created a new automation, and taught the bot to listen for events and run that automation!

### Congratulations, you've completed the Getting Started guide for Atomist!

You've come a long way but to get even *more* out of your development automation here are some suggested next steps...

- Checking out the [Quick Starts](../quick-starts) for short introductions to a number of Atomist features.
- Get comfortable with writing and editing your development automation Rugs with the [Rug CLI](../reference-docs/rug/rug-cli).
- Take a deep-dive through Rug using `@atomist` in with the [Rug Koans]().
