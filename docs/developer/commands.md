Trigger your automations from the web or Slack!  Commands respond to
requests -- like `@atomist do my thing` or a button press.  You can
create your own commands to make the Atomist bot do what you want.

For the fastest path to a command handler,
follow [this quick-start blog post](https://the-composition.com/extending-your-slack-bot-part-1-commands-aaa4dbd47933).

If you already have an automation client,
this page will help you add a command handler to it.

You'll need

-   An [automation client](client.md) of your own
-   A task you want to automate, even if it's just saying "Hello, World!"
-   A phrase that people can say in Slack to trigger it, i.e., the commands _intent_
-   A name for the command handler

In this guide you'll create MyCommandHandler, which responds to "do my thing".

## Command handler

Command handlers are classes with a `handle` method
 and some decorators that supply metadata.
Store them anywhere in the `src` directory;
your automation client discovers them on startup. (Or [specify them yourself](client.md#client-configuration).)

You can add a class to any file,
or make a new TypeScript file anywhere in the `src` directory,
like `src/commands/MyCommandHandler.ts`.

Start by copying the content of
[the HelloWorld sample](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/simple/HelloWorld.ts)
into a new file to start with.

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

@CommandHandler("My sample command handler", "do my thing")
export class MyCommandHandler implements HandleCommand {

    public handle(context: HandlerContext): Promise<HandlerResult> {
        return Promise.resolve(Success);
    }
}
```

### Handler arguments

The `handle` method receives a `HandlerContext` [LINK to API docs if we have those?)]. It contains the following useful members:

-   `messageClient: MessageClient` lets you send Slack messages from
    the Atomist bot.  You can send messages to
    particular [users](slack.md#user-and-channel-messages),
    particular [channels](slack.md#user-and-channel-messages), or
    to [whoever typed the command](slack.md#response-messages).
-   `graphClient: GraphClient` lets you run queries against the
    Atomist [GraphQL API](graphql.md), where you can discover things
    like which builds failed on which commits, who made those commits,
    and what their Slack username is.

When you need more information, define [parameters](#parameters)
in your command handler.

### Handler return

A `HandlerResult` is an object containing a return code (0 for
success, anything else for error).  You can add other properties to
the object for debugging; they'll show up in your automation client's
log.  Return this `HandlerResult` after doing whatever it is you'd
like your automation to accomplish.

The do-nothing `handle` method creates a Promise from a successful
`HandlerResult`:

```typescript
return Promise.resolve({ code: 0 })
```

There's a `Success` object in `@atomist/automation-client/HandlerResult`
that you can substitute for `{ code: 0 }` to be extra expressive, or a
`success` function for when you need `() => { code: 0 }` like when
translating a Promise of something else into a `HandlerResult`: `promise.then(success)`.

The `handle` method returns a Promise because usually you'll want to do something
fun asynchronously, like respond in Slack.
The `messageClient.respond` method returns a Promise,
so you can return success after the message is sent:

```typescript
return context.messageClient.respond("That sounds like a great idea!")
    .then(success)
```

<!--
## Command examples

Some quick examples for common automations:

-   [Send an HTTP request](command-examples.md#send-an-http-request)
-   [Send a message to a particular channel](command-examples.md#send-a-message-to-a-particular-channel)
-   [Add a file to one repository](command-examples.md#add-a-file-to-a-single-repository) in a pull request
-   [Change the content of many repositories](command-examples.md#change-the-content-of-a-file-in-all-repositories)
 in many pull requests
-   [Inspect code in all repositories](command-examples.md#inspect-code-across-repositories) and report on it in Slack
-   [Send a direct message](command-examples.md#send-a-direct-message)
-   [Send a fancy formatted message](command-examples.md#send-a-message-thats-more-than-text)
-->

## Parameters

You don't want your command handler to do the _same_ thing every
time. Gather more information from parameters!  By annotating your
command handler fields with `@Parameter`, `@MappedParameter`, or
`@Secret`, you are instructing Atomist automation API to collect and
provide values for those parameters when your command is invoked.

You can get this information from the user or button definition
(`@Parameter`) or from Atomist's understanding of where the command
was invoked (`@MappedParameter`).

### Input Parameters

These may be simple values that need to be supplied to run your
command handler. For example, the issue number to close or the build
number to restart. When a user invokes your command in Slack, the
Atomist bot will prompt her in a thread to supply value for each
required parameter. The user will get to review the provided parameter
values, change them if desired, and click or type Submit.

!!! tip
    You can supply parameters in one line with `name=value` pairs like: `@atomist do my thing buildId=42`.

!!! note
    If there are no required parameters, your command will be invoked right away.

In Slack buttons, the automation creating
the [button](slack.md#adding-message-buttons) can supply as many
parameters as it knows. Whoever clicks the button will be prompted for
any other required parameters.

When you decorate a field with `@Parameter`,
you can pass the decorator an object describing the parameter.
Here are some examples:

A `buildId` is required, and it is a `string` of digits:

```typescript
@Parameter({ pattern: /^[0-9]+$/ })
public buildId: string;
```

An animal can be specified, or it'll default to armadillo:

```typescript
@Parameter({})
public animal: string = "armadillo";
```

You can define:

| field | meaning |
| ----- | ------- |
| pattern | If you want to validate values, pass a `RegExp`. It must start with `^` and end with `$` so that it covers the whole value. Default: `/^[\S\s]*$/` for "anything" |
| required | set this to `false` if the parameter is optional. If you supply a default value for the field, we'll automatically set required to `false`! |
| description | the Slack or Dashboard user will see this when they're prompted for the parameter. [TODO | is that true about the dashboard?] |
| displayName | defaults to the name of the field you're decorating |
| validInput | if you supplied a pattern, you may also want to describe in words what input is valid. |
| displayable | If `false`, hide this parameter from the user before when prompting them to submit. For instance, sometimes buttons include cryptic internal identifiers. |
| maxLength | if you want to limit the length of a parameter, supply a number here. |
| minLength | if you want at least so many characters, supply a number here. |
| type | `string` or `boolean` or `number`, although we'll figure that out from the type of the field if we can. |

### Mapped Parameters

There are a few things Atomist can infer from who invoked this command, or what channel they invoked it in.
You can request this information by decorating fields with `@MappedParameter`.
Supply one argument to that decorator to tell it which of the MappedParameters you want.

```typescript
@MappedParameter(MappedParameters.SlackUserName)
public slackUserName: string;
```

In Slack, if the value is ambiguous based on your team and channel, Atomist asks the user.

In Slack buttons, the automation that defines the button can provide values for these.

The available Mapped Parameters are:

| Constant | What you get |
| -------- | ------------ |
| MappedParameters.SlackUserName | Who invoked this command? This is the username, not the display name of the user. For instance: jessitron |
| MappedParameters.SlackUser | The ID of the Slack user who invoked the command. For instance: U6L3BGG01; |
| MappedParameters.SlackChannelName | The name of the channel where the command was invoked. |
| MappedParameters.SlackChannel | The ID of the channel where the command was invoked. For instance: C3NGYQF6Y |
| MappedParameters.SlackTeam | The ID of your Slack team. For instance: T6MFSPUDL |
| MappedParameters.GitHubRepository | If the command was invoked in a channel linked[LINK] to exactly one repository, this is the name of it. Otherwise, prompt for one of the repository names in your team. |
| MappedParameters.GitHubOwner | If your team has one linked organization[LINK], this is it. If the command was invoked in a channel linked[LINK] to exactly one repository, this is the owner of that repository. Otherwise, prompt for one of the organizations linked to your team. |
| MappedParameters.GitHubUrl | This is https://github.com unless you're on GitHub Enterprise. |
| MappedParameters.GitHubApiUrl | This is https://api.github.com unless you're on GitHub Enterprise. |
| MappedParameters.GitHubDefaultRepositoryVisibility | our best guess for whether you prefer to create new repositories as "public" or "private". |

!!! note
    Mapped Parameters are available in Command Handlers but _not_ Event Handlers.

## Examples

Here are some examples of simple [commands](commands.md).

### Send an HTTP request

Call endpoints on the internet or in your internal network, anywhere accessible where your own automation client is running.

Check out a
[very simple HTTP example](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/simple/HelloHttp.ts),
 or a more complicated one that
 [Searches Stack Overflow](https://github.com/atomist-blogs/sof-command/blob/master/src/commands/SearchStackOverflow.ts).

### Respond

This `respond` message posts to Slack in the same
channel where the command was invoked.

```typescript
return context.messageClient.respond("I hear you.")
           .then(success);
```

### Send a message to a Slack channel

Send a message to the channel you specify.
[Here's a simple handler](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/simple/HelloChannel.ts).

I use to send messages from automations under development to a particular Slack channel
that serves as an informal audit log.

### Send a direct message

Perhaps you'd like to DM yourself whenever someone runs your automation.
The `addressUsers` method on the messageClient has a second argument: a Slack username or an array of Slack usernames.

```typescript
return context.messageClient.addressUsers("ping","jessitron")
           .then(success)
```

### Send a formatted message

All of the messageClient methods (`respond`, `addressChannels`,
`addressUsers`) accept either a string or Slack message object.  Learn
about formatting options
on [Slack's message builder page][slack-query].

[slack-query]: https://api.slack.com/docs/messages/builder?msg=%7B%22text%22%3A%22These%20are%20a%20few%20of%20my%20favorite%20things%3A%22%2C%22attachments%22%3A%5B%7B%22fallback%22%3A%22my%20favorite%20vegetable%20is%20carrots%22%2C%22title%22%3A%22Vegetable%22%2C%22color%22%3A%22%23ffa500%22%2C%22text%22%3A%22carrots%22%7D%2C%7B%22fallback%22%3A%22my%20favorite%20coffee%22%2C%22title%22%3A%22Coffee%20Drink%22%2C%22title_link%22%3A%22https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCappuccino%22%2C%22color%22%3A%226f4e37%22%2C%22text%22%3A%22cappuccino%20%3Acoffee%3A%22%7D%5D%7D (Slack API Message Builder)

Find full information about all the options
under [Slack Messages](slack.md), including how to add buttons.

<!-- TODO: describe a command that queries the graph. -->

### Make a code change

Atomist lets developers automate their work, and that includes
changing code.  The `@atomist/automation-client` module that you can
find in your automation client has tools for creating and editing
projects.

For instance, you might want to:

#### Add a file to a repository

[This example][ex-add-file] adds a `CONTRIBUTING.md` file to one
repository, with organization-standard content.

[ex-add-file]: https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/editor/AddContributing.ts (Command - Add File)

#### Change the content of a file in all repositories

Why stop at just one repository? This is automation! You can change them all!

A command can [update the copyright year in all the READMEs in all your repositories](https://github.com/atomist/automation-client-samples-ts/tree/master/src/commands/editor/UpdateCopyright.ts).

With this handler running
in your automation client, you can initiate PRs on all out-of-date repositories with a single invocation of
 `@atomist update README copyright year` in Slack.

### Inspect code across repositories

Checks which repositories are up to current coding standards.

[This example](https://github.com/atomist/automation-client-samples-ts/tree/master/src/commands/reviewer/ReviewCopyright.ts)
checks which repositories have a current copyright notice in the README. It then reports on every repository: Does it have a copyright notice? If so, is it up-to-date?

### Make a new repository

When you want to make a new service or library, it's common to start by copying an old one. With Atomist,
you can automate the copy, and modify the starting point to be your new service.

Check out this
[example](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/generator/NewAutomation.ts)
that copies a sample automation client into your own repository.

Once the repository is created, you can do things like add collaborators, teams, or labels to bring the
GitHub repository to your standards. For examples, the Atomist
[Spring generator](https://github.com/atomist/initializr-atomist/blob/1b90f78f31ec157489f6e6d53a0ccb7372e0e53d/src/commands/generator/initializr/SpringRepoCreator.ts#L56)
adds a collaborator
(and accepts the invitation) as part of project creation.

### Commands in the wild

There's a [repository full of sample automations][samples-ts] with
example commands, including editors and generators.

The built-in GitHub and build notifications, along with commands like
`create issue`, live in [lifecycle-automation][lifecycle].

One handy command for automation developers runs tslint in a Docker
container for every push to a TypeScript repository.  You'll find it
in the [docker samples][docker-samples].

[Tell us](https://join.atomist.com) about yours!

[samples-ts]: https://github.com/atomist/automation-client-samples-ts (Atomist Automation Client Sample Automations)
[lifecycle]: https://github.com/atomist/lifecycle-automation (Atomist's Built-In Lifecycle Automations)
[docker-samples]: https://github.com/atomist/automation-client-samples-ts-docker (Atomist Docker Automation Client Samples)

## Testing

You can test command handlers the same way you test any TypeScript
class.
[A client doc](https://github.com/atomist/automation-client-ts/blob/master/docs/CommandTesting.md) describes the Atomist team's testing style for commands, but there are many ways to test.
If you already have a favorite TypeScript or JavaScript testing style and framework, use that.

You can also test command handlers by hand: run the client locally and
then address Atomist in a Slack DM or a channel.

<!--
You can [test command handlers automatically](command-examples.md#automated-tests-for-command-handlers) as well.
-->

## Troubleshooting

Anything you print with console.log() in your command handler will show up in the logs of your automation-client.
If you're running locally, these logs go to stdout.

### My intent was not recognized

When you tell Atomist to do the thing, and it responds with

```Hmm, I don't understand 'do my thing'. How about: ...```

It'll guess at nearby commands. This means it didn't find your intent.

To see everything available, try `@atomist show skills`.
This lists commands registered by automation client.
 Is your automation client listed?
If not, perhaps it is not running.

If you can't tell, consider changing the name of your automation client
(in package.json) to something you'll recognize.

If your automation client is listed but your automation is not,
perhaps it is not included in `atomist.config.ts`.
See command discovery [LINK].

### Command was invoked unsuccessfully

When your handler returns a failure status, you'll see a message in Slack:

```
Unable to run command
Unsuccessfully invoked command-handler MyCommandHandler of my-automation@0.1.0
```

Check the logs of your automation client to figure out what went wrong.

### Something went wrong

If the bot tells you "Oops, something went wrong"&hellip;  that's our
bad.  Please contact us through any of our [support channels][support].
We want to help!

[support]: ../support.md
