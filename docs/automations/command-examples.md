# Command Handler Examples

Command handlers are described on [this page](commands.md).

Here are some quick examples for common automations:

## Send an HTTP request

The `axios` library in TypeScript is great for HTTP requests. It returns a Promise of a response.
Axios parses JSON (or XML) into JavaScript objects into the `data` field on the response.

Here's a quick-start for your `handle` method:

```typescript
import axios from "axios";
return axios.get("http://icanhazip.com/")
              .then(response => context.messageClient.respond("My IP is: " + response.data))
              .then(() => Success)
```

For a fuller example, try [a query to Stack Overflow](https://github.com/atomist-blogs/sof-command/blob/master/src/commands/SearchStackOverflow.ts).
This example is available in the very quick start described in this [Command Handler blog post](https://the-composition.com/extending-your-slack-bot-part-1-commands-aaa4dbd47933).

## Send a message to a particular channel

Sometimes you know where you want the message to go.
For instance, I like to create an informal audit log of automation runs in #team-stream.
The `addressChannels` method on messageClient takes a message plus a second argument, which is a channel name (or channel ID).
Or pass an array of channel names to send the message to all of them.

```typescript
return context.messageClient.addressChannels("I did the thing","random")
           .then(() => Success)
```

## Make a code change

Atomist lets developers automate our work, and that includes changing code.
 The `@atomist/automation-client` module (it's in your automation client) has tools for editing projects. Here are some examples to get you started:

### Add a file to a single repository

Maybe we want to add a CONTRIBUTING.md file to one repository, with organization-standard content.

To edit one project, we specify:

-  GitHub credentials: see [Secrets](commands.md#secrets) for how to do this operation as the user who invoked the command,
-  How to edit the project: Atomist uses a [Project](https://atomist.github.io/automation-client-ts/modules/_project_project_.html)
object to model operations on a repository; pass a function that changes it.
-  How to save your work: make a [Pull Request](https://atomist.github.io/automation-client-ts/classes/_operations_edit_editmodes_.pullrequest.html)
or [commit to a branch](https://atomist.github.io/automation-client-ts/interfaces/_operations_edit_editmodes_.branchcommit.html).
-  which repository to edit: see [Mapped Parameters](commands/#mapped-parameters)
for how to guess this from the channel where the command is invoked,

[Here is a command handler](https://github.com/atomist/automation-client-samples-ts/tree/master/src/commands/editor/AddContributing.ts)
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

Why stop at just one repository? This is automation! We can change them all!

Let's update the Copyright year in all the READMEs in all our repositories. [Full command handler is here.](https://github.com/atomist/automation-client-samples-ts/tree/master/src/commands/editor/UpdateCopyright.ts)

For that, we'll need a function to edit the project. This one gets the project, the HandlerContext and some extra parameters.
It returns an EditResult.

```typescript
export function editProject(p: Project, context: HandlerContext, params: { newYear: string }): Promise<EditResult> {
    return p.findFile("README.md")
        .then(file => file.replace(/(Copyright.*\s)[0-9]+(\s+Atomist)/, `$1${params.newYear}$2`))
        .then(() => successfulEdit(p), (err) => failedEdit(p, err));
}
```

Then in the handle method, use `editAll` to run on all the projects that we can find:

```typescript
        return editAll(context,
            { token: this.githubToken }, // GitHub credentials
            editProject, // how to change the project
            new PullRequest("update-copyright-year", "Update the copyright to " + this.newYear), // how to save the edit
            { newYear: this.newYear }) // parameters to pass on to the edit function
            .then(() => Success, failure);
```
With [this handler](https://github.com/atomist/automation-client-samples-ts/tree/master/src/commands/editor/UpdateCopyright.ts) running
in our automation client, we can initiate PRs on all repositories that have an out-of-date Copyright 
notice with one `@atomist update README copyright year` in Slack.

## Inspect code across repositories

Which repositories are up to current coding standards? We can write an automation to check for us.

For a quick example, let's check which repositories have a current copyright notice in the README. I want to report on every repository: Does it have a copyright notice? If so, is it up-to-date?

Here is [that reviewer](https://github.com/atomist/automation-client-samples-ts/tree/master/src/commands/reviewer/ReviewCopyright.ts). Take it and modify it for your purposes.

<!-- TODO: when it works (which will require some fixes to cloning), put output here -->

## Make a new repository

When you want to make a new service or library, it's common to start by copying an old one. With Atomist, 
you can automate the copy,
and modify the starting point to be your new service.

Check out an 
[example](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/generator/NewAutomation.ts)
that copies a sample automation client into your own repository.

Once the repository is created, you can do things like add collaborators, teams, or labels to bring the
GitHub repository to your standards. For examples, the Atomist 
[Spring Initializr generator](https://github.com/atomist/initializr-atomist/blob/master/src/commands/generator/initializr/RepoCreator.ts) 
adds a collaborator
(and accepts the invitation) as part of project creation.


## Send a direct message

Perhaps you'd like to DM yourself whenever someone runs your automation.
The `addressUsers` method on the messageClient has a second argument: a Slack username or an array of Slack usernames.

```typescript
return context.messageClient.addressUsers("ping","jessitron")
           .then(() => Succcess)
```

## Send a message that's more than text

All of the messageClient methods (`respond`, `addressChannels`, `addressUsers`) accept either a string or JSON for a Slack message.
Learn about formatting options on [Slack's lovely message builder page](https://api.slack.com/docs/messages/builder).

```typescript
   import * as slack from "@atomist/slack-messages/SlackMessages";
   const message: slack.SlackMessage: {
       text: "This message is simple; you could have passed a string."
   };
   return context.messageClient.respond(message)
              .then(() => Success)
```

Find full information about all the options under [Slack Messages](slack.md), including how to add buttons.

## Command handlers in the wild

There's a repository full of sample automations [here][samples-ts].

My favorite automation runs tslint in a Docker container, in the [docker samples][docker-samples].

The built-in GitHub and build notifications, along with commands like `create issue`, 
live in our [lifecycle-automations][lifecycle].

[Tell us](https://join.atomist.com) about yours!

[samples-ts](https://github.com/atomist/automation-client-samples-ts)
[docker-samples](https://github.com/atomist/automation-client-samples-ts-docker)
[lifecycle](https://github.com/atomist/lifecycle-automation)
