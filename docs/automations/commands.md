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
your automation client will discover them on startup. (Or [specify them yourself](client.md#client-configuration).)

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
   You can send messages to particular [users](slack.md#user-and-channel-messages),
    particular [channels](slack.md#user-and-channel-messages),
    or to [whoever typed the command](slack.md#response-messages).
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

Some quick examples for common automations:

[Send an HTTP request](command-examples.md#send-an-http-request)

[Send a message to a particular channel](command-examples.md#send-a-message-to-a-particular-channel)

[Add a file to one repository](command-examples.md#add-a-file-to-a-single-repository) in a pull request

[Change the content of many repositories](command-examples.md#change-the-content-of-a-file-in-all-repositories)
 in many pull requests

[Inspect code in all repositories](command-examples.md#inspect-code-across-repositories) and report on it in Slack

[Send a direct message](command-examples.md#send-a-direct-message)

[Send a fancy formatted message](command-examples.md#send-a-message-thats-more-than-text)

## Parameters

You don't want your command handler to do the _same_ thing every
time. Gather more information from parameters!  By annotating your
command handler fields with @Parameter, @MappedParameter or @Secret,
you are instructing Atomist automation API to collect and provide
values for those parameters when your command is invoked.

You can get this information from the user or button definition (@Parameter),
from Atomist's understanding of where the command was invoked (@MappedParameter),
and from Atomist's vault (@Secret).

### Input Parameters

These are simple values that you need to be supplied in order to run
your command handler. For example, the issue number to close or the
build number to restart. When a user invokes your command in Slack,
atomist bot will prompt her in a thread to supply value for each
required parameter. The user will get to review provided parameter
values, change them if desired, and click or type Submit.

!!! tip
    You can supply parameters in one line with name-value pairs like: `@atomist do my thing buildId=42`.

!!! note
    If there are no required parameters to prompt for, your command will be invoked right away.

In Slack buttons, the automation creating
the [button](slack.md#adding-message-buttons) can supply as many
parameters as it knows. Whoever clicks the button will be prompted for
any other required parameters.

In a REST call, parameters come in with the request.

When you annotate a field with `@Parameter`,
you can pass the decorator an object describing the parameter.
Here are some examples:


A buildId is required, and it is a string of digits:

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
| pattern | If you want to validate values, pass a `RegExp`. It must start with `^` and end with `$` so that it covers the whole value. Default: `/^.*$/` for "anything" |
| required | set this to `false` if the parameter is optional. If you supply a default value for the field, we'll automatically set required to false! |
| description | the Slack or Dashboard user will see this when they're prompted for the parameter. [TODO | is that true about the dashboard?] |
| displayName | defaults to the name of the field you're annotating |
| validInput | if you supplied a pattern, you may also want to describe in words what input is valid. |
| displayable | If false, hide this parameter from the user before when prompting them to submit. For instance, sometimes buttons include cryptic internal identifiers. |
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

In Slack, if the value is ambiguous based on your team and channel, Atomist will ask the user.

In Slack buttons, the automation that defines the button can provide values for these.

In a REST call, the invocation has to supply these. All Mapped Parameters are required.

The available Mapped Parameters are:

| Constant | What you get |
| -------- | ------------ |
| MappedParameters.SlackUserName | Who invoked this command? This is the username, not the display name of the user. For instance: jessitron |
| MappedParameters.SlackUser | The ID of the slack user who invoked the command. For instance: U6L3BGG01; |
| MappedParameters.SlackChannelName | The name of the channel where the command was invoked. |
| MappedParameters.SlackChannel | The ID of the channel where the command was invoked. For instance: C3NGYQF6Y |
| MappedParameters.SlackTeam | The ID of your slack team. For instance: T6MFSPUDL |
| MappedParameters.GitHubRepository | If the command was invoked in a channel linked[LINK] to exactly one repository, this is the name of it. Otherwise, prompt for one of the repository names in your team. |
| MappedParameters.GitHubOwner | If your team has one linked organization[LINK], this is it. If the command was invoked in a channel linked[LINK] to exactly one repository, this is the owner of that repository. Otherwise, prompt for one of the organizations linked to your team. |
| MappedParameters.GitHubUrl | This is https://github.com unless you're on GitHub Enterprise. |
| MappedParameters.GitHubApiUrl | This is https://api.github.com unless you're on GitHub Enterprise. |
| MappedParameters.GitHubDefaultRepositoryVisibility | our best guess for whether you prefer to create new repositories as "public" or "private". |

!!! note
    Mapped Parameters are available in Command Handlers but _not_ Event Handlers.

### Secrets

These are secure values which Atomist stores and supplies to the automation client
 so that it can run commands as a particular user.

Fields decorated with @Secret are populated by Atomist before calling the `handle` method.
They're never printed to the log or stored to disk outside Vault.

When I invoke a command like `@atomist create issue title="Do another thing"`,
I want that issue to show up in GitHub created by me.
Built-in commands like this one receive a token collected from the invoking user.

Currently the only secret available to automation clients is a GitHub
token.  Currently custom automation clients will always receive the
GitHub token they configured, so all GitHub API calls will be
performed by the automator.
Please [tell us](https://atomist.zendesk.com) when this gets in your
way.

When I first invoke `create issue`, Atomist notices the scopes
required by that automation
(it's
[repo scope](https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-scopes-for-oauth-apps/).
It recognizes that I haven't authorized it for that scope, and prompts
me to authorize with GitHub right then.  It'll remember that token for
any future automations that require the same scope.

In a command handler, to get access to a GitHub token with
 [repo scope](https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-scopes-for-oauth-apps/): (read more about GitHub scopes here[LINK]):

```typescript
@Secret(Secrets.UserToken + `?scope=repo`)
public githubToken: string;
```

<!-- not implemented: When you run your automation client locally, and your teammates invoke your automation, the command handler won't get their tokens. It'll get yours. This is a security measure.
 When you deploy your client, supplying it with an authorized token[LINK] will give it access to everyone's tokens.
 -->

The only other Secret currently available is `Secrets.OrgToken`, the authorization supplied
when someone enrolled an organization with "@atomist enroll org".

Currently in custom automations, both of these will be populated by the GitHub token supplied in the automation client's
configuration. Your token will need to already have all the scopes your automations need.

<!-- not implemented: This provides the token collected when a GitHub organization was linked to the team.
Typically this belongs to the user who enrolled Atomist in your Slack team.
This secret is more useful in Event Handlers[LINK], which are not attributable to a particular user.
-->

## Testing

You can test command handlers by hand: run the client locally and then address Atomist in Slack DM or a channel.

You can [test command handlers automatically](command-examples.md#automated-tests-for-command-handlers) as well.

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
bad. Please contact us through any of our [support channels][support].
We care about your problems.

[support]: ../support.md
