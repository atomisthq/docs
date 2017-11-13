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
[Here's a simple handler](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/simple/HelloChannel.ts).

I use to send messages from automations under development to a particular Slack channel 
that serves as an informal audit log.

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

Find full information about all the options under [Slack Messages](slack.md), including how to add buttons.

<!-- TODO: describe a command that queries the graph. -->

## Make a code change

Atomist lets developers automate their work, and that includes changing code.
 The `@atomist/automation-client` module that you can find in your automation client has tools for 
 creating and editing projects.

For instance, you might want to:

### Add a file to a repository

[This example](https://github.com/atomist/automation-client-samples-ts/tree/master/src/cs/editor/AddContributing.ts) adds a CONTRIBUTING.md file to one repository, with organization-standard content.

### Change the content of a file in all repositories

Why stop at just one repository? This is automation! You can change them all!

A command can [update the copyright year in all the READMEs in all your repositories](https://github.com/atomist/automation-client-samples-ts/tree/master/src/commands/editor/UpdateCopyright.ts).

With this handler running
in your automation client, you can initiate PRs on all out-of-date repositories with a single invocation of
 `@atomist update README copyright year` in Slack.

## Inspect code across repositories

Checks which repositories are up to current coding standards.

[This example](https://github.com/atomist/automation-client-samples-ts/tree/master/src/commands/reviewer/ReviewCopyright.ts)
checks which repositories have a current copyright notice in the README. It then reports on every repository: Does it have a copyright notice? If so, is it up-to-date?

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

Test commands by testing the `handle` method. 
[A client doc](https://github.com/atomist/automation-client/samples/blob/master/docs/CommandTesting.md) describes the Atomist team's testing style for commands, but there are many ways to test. 
If you already have a favorite TypeScript or JavaScript testing style and framework, use that.