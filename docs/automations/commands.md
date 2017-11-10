# Command Handlers

Trigger your automations from the web or Slack! 
Command handlers respond to requests -- 
like `@atomist do my thing` or a button press. Each command handler also responds over REST or on the dashboard. You can create your own command handlers to make the Atomist bot do what you want.

For the fastest path to a command handler, 
follow [this quick-start blog post](https://the-composition.com/extending-your-slack-bot-part-1-commands-aaa4dbd47933).

If you already have an automation client, 
this page will help you add a command handler to it.

You'll need

-   an [automation client](client.md) of your own
-   a task you want to automate (even if it's just saying "hi")
-   a phrase that people can say in Slack to trigger it
-   a name for the command handler

For the purposes of this guide, we'll create MyCommandHandler, which responds to "do my thing".

## Create the command handler

Command handlers are classes with a `handle` method
 and some decorators that supply metadata.
They can live anywhere in the `src` directory; 
your automation client will discover them on startup. (Or [specify them yourself](client/#register-handlers).)

You can add a class to any file, 
or make a new TypeScript file anywhere in the `src` directory, 
like `src/commands/MyCommandHandler.ts`.

I like to copy the content of 
[the HelloWorld sample](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/simple/HelloWorld.ts) 
into my new file to start with.

## Command Handler class with decorators
A command handler class implements `HandleCommand`, 
with a `handle` method, and is decorated with `@CommandHandler`.
 It can also contain [parameter specifications](#parameters)
  to gather additional information.

The `@CommandHandler(description: string, intent: string)` decorator on the class adds the top-level metadata that Atomist needs to run your command handler.
The `intent` parameter is important: it's the phrase people type in Slack to trigger this handler. Your `description` will show up in help messages.

Implement your automation in the `handle` method.

The simplest command handler:

```typescript
import {
    CommandHandler,
    HandleCommand,
    HandlerContext,
    HandlerResult,
    Success,
} from "@atomist/automation-client";

@CommandHandler("The pirate command handler", "do my thing")
export class MyCommandHandler implements HandleCommand {

    public handle(context: HandlerContext): Promise<HandlerResult> {
        return Promise.resolve(Success);
    }
}
```

### What do you get?
The `handle` method receives a `HandlerContext` [LINK to API docs if we have those?)]. It contains the following super-useful members:

   * `messageClient: MessageClient` lets you send Slack messages from the Atomist bot. 
   You can send messages to particular [users](slack/#user-and-channel-messages),
    particular [channels](http://127.0.0.1:8000/automations/slack/#user-and-channel-messages), 
    or to [whoever typed the command](slack/#response-messages).
   * `graphClient: GraphClient` lets you run queries against the 
   Atomist [GraphQL API](graphql.md), where you can discover things like which builds
    failed on which commits, and who made those commits, and what their 
    Slack username is.

When you need more information, define [parameters](#parameters) 
in your command handler. 

### What do you give back?

A `HandlerResult` is an object containing a return code
 (0 for success, anything else for error). 
 You can add other properties to the object for debugging; 
 they'll show up in your automation client's log.
  Return this HandlerResult after doing whatever it is you'd like 
  your automation to accomplish.

The do-nothing `handle` method creates a Promise from a successful HandlerResult:

`return Promise.resolve({ code: 0 })`

There's a `Success` object in `@atomist/automation-client/HandlerResult`
 that you can substitute for `{ code: 0 }` to be extra expressive, or a 
 `success` function for when you need `() => { code: 0 }` like when
  translating a Promise of something else into a HandlerResult: `promise.then(success)`.

The `handle` method returns a Promise because usually you'll want to do something
 fun asynchronously, like respond in Slack. 
The `messageClient.respond` method returns a Promise, 
so you can return success after the message is sent:

```typescript
return context.messageClient.respond("That sounds like a great idea!")
    .then(success)
```

## Things to do in command handlers

Here are some quick examples for common automations:

### Send an HTTP request

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

### Send a message to a particular channel

Sometimes you know where you want the message to go. 
For instance, I like to create an informal audit log of automation runs in #team-stream.
The `addressChannels` method on messageClient takes a message plus a second argument, which is a channel name (or channel ID). 
Or pass an array of channel names to send the message to all of them.

```
return context.messageClient.addressChannels("I did the thing","random")
           .then(() => Succcess)
```

### Make a code change

Atomist lets developers automate our work, and that includes changing code.
 The `@atomist/automation-client` module (it's in your automation client) has tools for editing projects. Here are some examples to get you started:

#### Add a file to a single repository

Maybe we want to add a CONTRIBUTING.md file to one repository, with organization-standard content.

To edit one project, we specify:

-  GitHub credentials: see [Secrets](#secrets) for how to do this operation as the user who invoked the command,
-  How to edit the project: Atomist uses a [Project](https://atomist.github.io/automation-client-ts/modules/_project_project_.html) 
object to model operations on a repository; pass a function that changes it.
-  How to save your work: make a [Pull Request](https://atomist.github.io/automation-client-ts/classes/_operations_edit_editmodes_.pullrequest.html) 
or [commit to a branch](https://atomist.github.io/automation-client-ts/interfaces/_operations_edit_editmodes_.branchcommit.html). 
-  which repository to edit: see [Mapped Parameters](#mapped-parameters) 
for how to guess this from the channel where the command is invoked,

[Here is a command handler](https://github.com/atomist/automation-client-samples-ts/tree/nortissej/simple-editor/src/commands/editor/AddContributing.ts) 
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

Check [the complete source](https://github.com/atomist/automation-client-samples-ts/tree/nortissej/simple-editor/src/commands/editor/AddContributing.ts) for the necessary imports.

#### Change the content of a file in all repositories

Why stop at just one repository? This is automation! We can change them all!

Let's update the Copyright year in all the READMEs in all our repositories. [Full command handler is here.](https://github.com/atomist/automation-client-samples-ts/tree/nortissej/simple-editor/src/commands/editor/UpdateCopyright.ts)

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
With [this handler](https://github.com/atomist/automation-client-samples-ts/tree/nortissej/simple-editor/src/commands/editor/UpdateCopyright.ts) running
in our automation client, we can initiate PRs on all repositories that have an out-of-date Copyright notice with one `@atomist update README copyright year` in Slack, or one invocation from the client dashboard[LINK].

### Inspect code across repositories

Which repositories are up to current coding standards? We can write an automation to check for us.

For a quick example, let's check which repositories have a current copyright notice in the README. I want to report on every repository: Does it have a copyright notice? If so, is it up-to-date?

Here is [that reviewer](https://github.com/atomist/automation-client-samples-ts/tree/nortissej/simple-editor/src/commands/reviewer/ReviewCopyright.ts). Take it and modify it for your purposes.

<!-- TODO: when it works (which will require some fixes to cloning), put output here -->

### Make a new repository

When you want to make a new service or library, it's common to start by copying an old one. With Atomist, you can automate the copy
and modify the starting point to be your new service.


### Send a direct message

Perhaps you'd like to DM yourself whenever someone runs your automation. 
The `addressUsers` method on the messageClient has a second argument: a Slack username or an array of Slack usernames.

```typescript
return context.messageClient.addressUsers("ping","jessitron")
           .then(() => Succcess)
```

### Send a message that's more than text.

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

Find full information about all the options here [LINK], including how to add buttons [LINK].

## Parameters

You don't want your command handler to do the _same_ thing every time. Gather more information from parameters!
Parameters are annotated fields on your command handler class. The automation client populates them before
calling your `handle` method.

You can get this information from the user or button definition (@Parameter), 
from Atomist's understanding of where the command was invoked (@MappedParameter),
and from Atomist's vault (@Secret).

### @Parameter

Annotate a field from this when you want whoever triggers this command handler to supply the information. 
Perhaps it's the build number for the build whose log you want, or the issue number to close.

#### How they're populated

In Slack, when someone types "@atomist do my thing" (or whatever intent you defined in the @CommandHandler annotation), they'll be prompted in a thread 
to supply a value for each required parameter. Then they get to review all the parameter values and click or type Submit. If there are no required parameters, your command will be invoked right away.

TODO: picture of parameter thread

callout: You can supply parameters in one line with name-value pairs like: `@atomist do my thing buildId=42`. If you supply all the required parameters,
the command will be invoked right away.

In Slack buttons, the automation creating the button can supply as many parameters as it knows[LINK]. Whoever clicks the button will be prompted for any required parameters that weren't part of the button definition.

In the dashboard, each parameter is a form field. [TODO: picture]

In a REST call, parameters come in with the request. [LINK]

#### How they're specified

When you annotate a field with `@Parameter`, you can pass the decorator an object describing the parameter. Here are some examples:


A buildId is required, and it is a string of digits:
```
@Parameter({ pattern: /^[0-9]+$/ })
public buildId: string;
```

An animal can be specified, or it'll default to armadillo:
```
@Parameter({})
public animal: string = "armadillo";
```

You can define:

[TODO: make a table]
pattern: If you want to validate values, pass a `RegExp`. It must start with `^` and end with `$` so that it covers the whole value. Default: `/^.*$/` for "anything"

required: set this to `false` if the parameter is optional. If you supply a default value for the field, we'll automatically set required to false!

description: the Slack or Dashboard user will see this when they're prompted for the parameter. [TODO: is that true about the dashboard?]

displayName: defaults to the name of the field you're annotating

validInput: if you supplied a pattern, you may also want to describe in words what input is valid.

displayable: [TODO: what does this accomplish]

maxLength: if you want to limit the length of a parameter, supply a number here.

minLength: if you want at least so many characters, supply a number here.

type: `string` or `boolean` or `number`, although we'll figure that out from the type of the field if we can.

### @MappedParameter

There are a few things Atomist can infer from who invoked this command, or what channel they invoked it in.
You can request this information by decorating fields with `@MappedParameter`. 
Supply one argument to that decorator to tell it which of the MappedParameters you want.

In Slack, if the value is ambiguous based on your team and channel, Atomist will ask the user.

In Slack buttons, the automation that defines the button can provide values for these.

In the dashboard or a REST call, the invocation has to supply these. All Mapped Parameters are required.

#### Available Mapped Parameters

callout: these are available in Command Handlers but _not_ Event Handlers.

[TODO: table]

MappedParameters.SlackUserName: Who invoked this command? This is the username, not the display name of the user. For instance: jessitron

MappedParameters.SlackUser = The ID of the slack user who invoked the command. For instance: U6L3BGG01;

MappedParameters.SlackChannelName = The name of the channel where the command was invoked.

MappedParameters.SlackChannel = The ID of the channel where the command was invoked. For instance: C3NGYQF6Y

MappedParameters.SlackTeam = The ID of your slack team. For instance: T6MFSPUDL

MappedParameters.GitHubRepository = If the command was invoked in a channel linked[LINK] to exactly one repository, this is the name of it. Otherwise, prompt for one of the repository names in your team.

MappedParameters.GitHubOwner: If your team has one linked organization[LINK], this is it. If the command was invoked in a channel linked[LINK] to exactly one repository, this is the owner of that repository. Otherwise, prompt for one of the organizations linked to your team.

MappedParameters.GitHubUrl = This is https://github.com unless you're on GitHub Enterprise.

MappedParameters.GitHubApiUrl = This is https://api.github.com unless you're on GitHub Enterprise.

MappedParameters.GitHubDefaultRepositoryVisibility = our best guess for whether you prefer to create new repositories as "public" or "private".

### @Secret

These are secure values which Atomist stores and supplies to the automation client so that it can run commands as a particular user.

When I invoke a command like `@atomist create issue title="Do another thing"`, I want that issue to show up in GitHub created by me.
That means the automation needs to use a GitHub token supplied by the invoking user.

### How they're collected

When I first invoke `create issue`, Atomist notices the scopes required by that automation (it's repo scope [LINK]).
It recognizes that I haven't authorized it for that scope, and prompts me to authorize with GitHub right then, with repo scope plus any
I've already authorized. It'll remember that token for any future automations that require the same scope.

### How they're supplied

In a command handler, to get access to common GitHub operations (read more about GitHub scopes here[LINK]):

```
@Secret(Secrets.UserToken + `?scope=repo) [TODO: how do they specify scope?]
public githubToken: string;
```

When you run your automation client locally, and your teammates invoke your automation, the command handler won't get their tokens. It'll get yours. This is a security measure. When you deploy your client, supplying it with an authorized token[LINK] will give it access to everyone's tokens.

The only other Secret currently available is `Secrets.OrgToken`. This provides the token collected when a GitHub organization was linked to the team. Typically this belongs to the user who enrolled Atomist in your Slack team.
This secret is more useful in Event Handlers[LINK], which are not attributable to a particular user.

## Troubleshooting

Anything you print with console.log() in your command handler will show up in the logs of your automation-client.
If you're running locally, these logs go to stdout.

### My intent was not recognized

When you tell Atomist to do the thing, and it responds with

```Hmm, I don't understand 'do my thing'. How about: ...```

It'll guess at nearby commands. This means it didn't find your intent.

To see everything available, try `@atomist show skills`. This lists commands registered by automation client. Is your automation client listed?
If not, perhaps it is not running.

If you can't tell, consider changing the name of your automation client (in package.json) to something you'll recognize.

If your client is listed but your automation is not, perhaps it is not included in `atomist.config.ts`. See command discovery [LINK].

### Command was invoked unsuccessfully

When your handler returns a failure status, you'll see a message in Slack:

```
Unable to run command
Unsuccessfully invoked command-handler MyCommandHandler of my-automation@0.1.0
```

Check the logs of your automation client to figure out what went wrong.

### Something went wrong

If the bot tells you "Oops, something went wrong" ... that's our bad. Please contact us in the #support channel at atomist-community.slack.com, or email support@atomist.com[LINK]. We care about your problems.
