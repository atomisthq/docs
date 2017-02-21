Right! You've seen some of the automation between issues, commits, builds that we provide out-of-the-box and now let's automate an action.

In Atomist that means writing a `handler` in TypeScript using the Atomist's [Rug](../reference-docs/rug) support. The `handler` will be triggered by a certain type of activity that Atomist can detect, in this example case you want to notify the team when an issue labeled 'bug' gets fixed.

### Create a new Rug archive project for your new automation

The first thing you need is a project for your code. Although you can add Atomist Rug code to any existing project by simply adding a `.atomist` directory, under which your Rug code will live, in this case we'll create a publish a new project for your first Atomist Rug development automation.

Ask the Bot to list out the project generator that you need by typing `@atomist generator rug` and select the `NewRugArchive` generator:

TBD Image showing this in the bot.

Run through the questions to create the new project called `my-custom-handlers` in the Slack thread as you did before to create a new Rug archive project in GitHub.

TBD Image of thread of interactions for this generator.

### Add a new `handler` to your Rug archive project

Atomist `handlers` are written in Rug's support for TypeScript and so the next thing we need to do is edit your `my-custom-handlers` project to introduce TypeScript support to it. Luckily, Atomist has an `editor` for that so we can do this directly in Slack also.

Change channel to the new `#my-custom-handlers` channel created by `@atomist` when you ran the `NewRugArchive` generator. Inside that channel ask `@atomist` to list the editors that you might want to apply to a Rug archive by typing `@atomist editor rug`.

TBD show output of @atomist editor command.

Select the `AddRugHandler` editor and click on the `Edit my project` button to start a new thread as `@atomist` will walk you through the information needed to run this editor.

TBD Image of thread showing this editor being run.

* Highlights to pull out of the code:
  - Path expression to match issue labeled as bug that gets closed
  - message builder code and send

Now that you've got a working `handler` in a Rug archive it's time to publish it into Atomist so it can be invoked.

### Publish your new `handler`

There, you did it! You just created a new automation, and taught the bot to listen for events and run that automation. Well done!

### Congratulations, you've completed the Getting Started guide for Atomist!

You've come a long way but to get even *more* out of your development automation here are some suggested next steps...

- Checking out the [Quick Starts](../quick-starts) for short introductions to a number of Atomist features.
- Get comfortable with writing and editing your development automation Rugs with the [Rug CLI](../reference-docs/rug/rug-cli).
- Take a deep-dive through Rug using `@atomist` in with the [Rug Koans]().
