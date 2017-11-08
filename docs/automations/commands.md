# Command Handlers

Trigger your automations from your dashboard[LINK] or Slack! Command handlers respond to requests in Slack -- like `@atomist do my thing` or a button press[LINK to button instructions]. Each command handler also responds over REST or on the dashboard. You can create your own command handlers to make the Atomist bot do what you want.

To create your own command handlers, you'll need
[ ] an automation client of your own [LINK to quick start]
[ ] a task you want to automate (even if it's just saying "hi")
[ ] a phrase that people can say in Slack
[ ] a name for the command handler

For the purposes of this guide, we'll create MyCommandHandler, which responds to "do my thing".

## Create the command handler

Command handlers are classes with a `handle` method and some metadata.
They can live anywhere in the `src` directory; your automation client will [discover them] on startup.

You can add a class to any file, or make a new TypeScript file anywhere in the `src` directory, like `src/commands/YourCommandHandler.ts`.

I like to copy the content of [the HelloWorld sample](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/simple/HelloWorld.ts) into my new file to start with.

## Command Handler class with decorators
A command handler class implements `HandleCommand`, with a `handle` method, and is decorated with `@CommandHandler`. It can also contain [parameter specifications](#parameters) for additional information.

[CD: does the "Tags" decorator do anything useful? Can we leave it out?]

The `@CommandHandler(description: string, intent: string)` decorator on the class adds the top-level metadata that Atomist needs to run your command handler.
The `intent` parameter is important: it's the phrase people type in Slack to trigger this handler. Your `description` will show up in help messages.

Implement your automation in the `handle` method.

`public handle(context: HandlerContext): Promise<HandlerResult>`

### What do you get?
The `handle` method receives a `HandlerContext` [LINK to API docs if we have those?)]. It contains the following super-useful members:

   * `messageClient: MessageClient` lets you send Slack messages from the Atomist bot. You can send messages to particular users[LINK], particular channels [LINK], or to whoever typed the command [LINK to section in here].
   * `graphClient: GraphClient` lets you run queries against the Atomist GraphQL API, where you can discover things like which builds failed on which commits, and who made those commits, and what their Slack username is.

When you need more information, define [parameters](#parameters) in your command handler. 

### What do you give back?

A `HandlerResult` is an object containing a return code (0 for success, anything else for error). You can add other properties to the object for debugging; they'll show up in your automation client's log. Return this after doing whatever it is you'd like your automation to accomplish.

The do-nothing `handle` method creates a Promise from a successful HandlerResult:

`return Promise.resolve({ code: 0 })`

There's a `Success` object in `@atomist/automation-client/HandlerResult` that you can substitute for `{ code: 0 }` to be extra expressive.

This method returns a Promise because usually you'll want to do something fun asynchronously, like respond in Slack. 
The `messageClient.respond` method returns a Promise, so you can return success after the message is sent:

`return context.messageClient.respond("That sounds like a great idea!").then(() => Success)`

## Things to do in command handlers

Here are some quick examples for common automations:

### Send an HTTP request

### Send a message to a particular channel

### Make a code change

### Inspect code across repositories

### Make a new repository

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

### My intent was not recognized

### Command was invoked unsuccessfully

### Something went wrong
