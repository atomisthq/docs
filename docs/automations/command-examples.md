# Command Examples

Here are some examples of simple [commands](commands.md).

## Send an HTTP request

Call endpoints on the internet or in your internal network, anywhere accessible where your own automation client is running.

Check out a 
[very simple HTTP example](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/simple/HelloHttp.ts),
 or a more complicated one that 
 [Searches Stack Overflow](https://github.com/atomist-blogs/sof-command/blob/master/src/commands/SearchStackOverflow.ts).

## Respond

This `respond` message posts to Slack in the same
channel where the command was invoked.

```typescript
return context.messageClient.respond("I hear you.")
           .then(success);
```

## Send a message to a Slack channel

Send a message to the channel you specify.

One common use for this command is to send messages from automations under development to a particular Slack channel 
that serves as an informal audit log.

The `addressChannels` method on messageClient takes a message plus a second argument, 
which is a channel name (or channel ID).
Or pass an array of channel names to send the message to all of them.

```typescript
return context.messageClient.addressChannels("I did the thing","random")
           .then(success);
```

## Send a direct message

Perhaps you'd like to DM yourself whenever someone runs your automation.
The `addressUsers` method on the messageClient has a second argument: a Slack username or an array of Slack usernames.

```typescript
return context.messageClient.addressUsers("ping","jessitron")
           .then(success)
```

## Send a message that's more than text

All of the messageClient methods (`respond`, `addressChannels`, `addressUsers`) 
accept either a string or Slack message object.
Learn about formatting options on [Slack's message builder page](https://api.slack.com/docs/messages/builder?msg=%7B%22text%22%3A%22These%20are%20a%20few%20of%20my%20favorite%20things%3A%22%2C%22attachments%22%3A%5B%7B%22fallback%22%3A%22my%20favorite%20vegetable%20is%20carrots%22%2C%22title%22%3A%22Vegetable%22%2C%22color%22%3A%22%23ffa500%22%2C%22text%22%3A%22carrots%22%7D%2C%7B%22fallback%22%3A%22my%20favorite%20coffee%22%2C%22title%22%3A%22Coffee%20Drink%22%2C%22title_link%22%3A%22https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCappuccino%22%2C%22color%22%3A%226f4e37%22%2C%22text%22%3A%22cappuccino%20%3Acoffee%3A%22%7D%5D%7D).

```typescript
   import { SlackMessage } from "@atomist/slack-messages/SlackMessages";
   const message: SlackMessage = {
             text: "These are a few of my favorite things:",
             attachments: [{
                 fallback: "my favorite vegetable is carrots",
                 title: "Vegetable",
                 color: "#ffa500",
                 text: "carrots"
             },
             {
                 fallback: "my favorite coffee drink is cappuccino",
                 title: "Coffee Drink",
                 title_link:"https://en.wikipedia.org/wiki/Cappuccino",
                 color: "6f4e37",
                 text: "cappuccino :coffee:"
             }]
         };
   return context.messageClient.respond(message)
              .then(success)
```

Find full information about all the options under [Slack Messages](slack.md), including how to add buttons.

<!-- TODO: describe a command that queries the graph. -->

## Make a code change

Atomist lets developers automate their work, and that includes changing code.
 The `@atomist/automation-client` module that you can find in your automation client has tools for editing projects. Here are some examples to get you started:

### Add a file to a single repository

This example adds a CONTRIBUTING.md file to one repository, with organization-standard content.

To edit one project, specify:

-  GitHub credentials: see [Secrets](commands.md#secrets) for how to do this operation as the user who invoked the command,
-  How to edit the project: Atomist uses a [Project](https://atomist.github.io/automation-client-ts/modules/_project_project_.html)
object to model operations on a repository; pass a function that changes it.
-  How to save your work: make a [Pull Request](https://atomist.github.io/automation-client-ts/classes/_operations_edit_editmodes_.pullrequest.html)
or [commit to a branch](https://atomist.github.io/automation-client-ts/interfaces/_operations_edit_editmodes_.branchcommit.html).
-  which repository to edit: see [Mapped Parameters](commands/#mapped-parameters)
for how to guess this from the channel where the command is invoked,

[Here is a command](https://github.com/atomist/automation-client-samples-ts/tree/master/src/cs/editor/AddContributing.ts)
that does this. The `handle` method contains

```typescript
function editProject(p: Project) {
    return p.addFile("CONTRIBUTING.md", `Yes! Contributions are welcome`)
}

const pullRequest = new PullRequest("contributing", "Add CONTRIBUTING.md");

const gitHubRepo = new GitHubRepoRef(this.owner, this.repository);

return editOne(context,
    { token: this.githubToken }, // GitHub credentials
    editProject, // a function to change the project
    pullRequest, // how to save the edit
    gitHubRepo) // where to find the project
    .then(() => Success, failure);
```

Check [the complete source](https://github.com/atomist/automation-client-samples-ts/tree/master/src/commands/editor/AddContributing.ts) for the necessary imports.

### Change the content of a file in all repositories

Why stop at just one repository? This is automation! You can change them all!

Let's update the copyright year in all the READMEs in all your repositories. [Full command is here.](https://github.com/atomist/automation-client-samples-ts/tree/master/src/commands/editor/UpdateCopyright.ts)

For that, you need a function to edit the project. This one gets the project, the HandlerContext and some additional parameters.
It returns an EditResult.

```typescript
export function editProject(p: Project, context: HandlerContext, params: { newYear: string }): Promise<EditResult> {
    return p.findFile("README.md")
        .then(file => file.replace(/(Copyright.*\s)[0-9]+(\s+Atomist)/, `$1${params.newYear}$2`))
        .then(() => successfulEdit(p), (err) => failedEdit(p, err));
}
```

Then in the handle method, use `editAll` to run on all the projects that Atomist can find:

```typescript
        return editAll(context,
            { token: this.githubToken }, // GitHub credentials
            editProject, // how to change the project
            new PullRequest("update-copyright-year", "Update the copyright to " + this.newYear), // how to save the edit
            { newYear: this.newYear }) // parameters to pass on to the edit function
            .then(() => Success, failure);
```
With [this handler](https://github.com/atomist/automation-client-samples-ts/tree/master/src/commands/editor/UpdateCopyright.ts) running
in your automation client, you can initiate PRs on all repositories that have an out-of-date copyright
notice with a single invocation of `@atomist update README copyright year` in Slack.

## Inspect code across repositories

This command checks which repositories are up to current coding standards.

For the sake of clarity, this example checks which repositories have a current copyright notice in the README. It then reports on every repository: Does it have a copyright notice? If so, is it up-to-date?

Here is [the code](https://github.com/atomist/automation-client-samples-ts/tree/master/src/commands/reviewer/ReviewCopyright.ts), take it and modify it for your purposes.

<!-- TODO: when it works (which will require some fixes to cloning), put output here -->

## Make a new repository

When you want to make a new service or library, it's common to start by copying an old one. With Atomist,
you can automate the copy, and modify the starting point to be your new service.

Check out this
[example](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/generator/NewAutomation.ts)
that copies a sample automation client into your own repository.

Once the repository is created, you can do things like add collaborators, teams, or labels to bring the
GitHub repository to your standards. For examples, the Atomist
[Spring Initializr generator](https://github.com/atomist/initializr-atomist/blob/master/src/commands/generator/initializr/RepoCreator.ts)
adds a collaborator
(and accepts the invitation) as part of project creation.



## Commands in the wild

There's a repository full of sample automations [here][samples-ts].

The built-in GitHub and build notifications, along with commands like `create issue`,
live in [lifecycle-automations][lifecycle].

One handy command for automation developers runs tslint in a Docker container. You'll find it in the [docker samples][docker-samples].

[Tell us](https://join.atomist.com) about yours!

*  [samples-ts](https://github.com/atomist/automation-client-samples-ts) has commands and events, including editors and generators.
*  [docker-samples](https://github.com/atomist/automation-client-samples-ts-docker) runs tslint on every commit, and is set up for Docker
*  [lifecycle](https://github.com/atomist/lifecycle-automation) has Atomist's built-in automations around commits, builds, issues, etc.

# Automated tests for commands

Test commands by testing the `handle` method. This section describes the Atomist team's testing style for commands, but there are many ways to test. If you already have a favorite TypeScript or JavaScript testing style and framework, use that.

We use [Mocha](https://mochajs.org/) for unit tests in our automation clients, with [power-assert](https://github.com/power-assert-js/power-assert) for enhanced failure messages.

Tests live in the `test/` directory. Run them with `npm run test`.

Commands usually produce side-effects, so we test by passing fake
objects to substitute for `messageClient`, `graphClient`,
etc. Creating fakes is easy in a language like JavaScript or
TypeScript.

For instance, to test
[a command](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/simple/HelloChannel.ts)
that sends a message to a Slack channel, make a fake `messageClient` that only
has one function:

```typescript
// create a fake message client.
const fakeMessageClient = {
   addressChannels(message, channel) {
       this.channelThatWasSent = channel; // store what you care about
       return Promise.resolve(); // fake a return value
   },
};

// cast the context to the type we need
const fakeContext = { messageClient: fakeMessageClient } as any as HandlerContext;
```

Check out the
[full test](https://github.com/atomist/automation-client-samples-ts/blob/master/test/commands/simple/HelloChannelTest.ts)
for a full description.

### Testing editors and generators

For commands that use automation-client functions to [create or change code](#make-a-code-change), we typically test
only the project-editing function. There is an implementation of `Project` that is all in-memory, for easy testing.
For example:

```typescript
// describe each pretend file in the input project
const project = InMemoryProject.of({ path: "README.md", content: "# This is the README" },
                                   { path: "package.json", content: `{ "name": "my-project" }`});

const result = editProject(project,
                           null, // context is not used
                           { newYear: "2222" }); // parameters
```

Check out the
[whole example](https://github.com/atomist/automation-client-samples-ts/blob/master/test/commands/editor/UpdateCopyrightEditorTest.ts)
in the samples.
