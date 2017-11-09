Creating bot commands and taking action when specific events occur is
easy with the Atomist development automation platform.  In the
following sections we will walk through simple examples of a bot
command and an event automation.

Before working through these examples, be sure you have completed
the [setup][] and satisfied the [prerequisites][prereq].
Specifically, be sure you have

-   [Added the Atomist Bot the your Slack team][add-slack]
-   [Authorized Atomist to access GitHub][auth-github]
-   [Installed Node.js][install-node]
-   [Installed the Atomist CLI][install-cli]
-   [Run `atomist config`][atomist-config]

[setup]: ../setup.md (Atomist Setup)
[prereq]: prerequisites.md (Atomist Automation Prerequisites)
[add-slack]: ../setup.md#slack (Add Atomist to Slack)
[auth-github]: ../setup.md#github (Authorize Atomist in GitHub)
[install-node]: prerequisite.md#nodejs (Install Node.js)
[install-cli]: prerequisite.md#atomist-cli (Install the Atomist CLI)
[atomist-config]: prerequisite.md#github-token (Configure Atomist)

## Bot Command

The Atomist development automation platform provides all the
infrastructure you need to create custom bot commands.  All you need
to provide are:

-   your command _intent_, i.e., the text users will type when they
    want to invoke the command
-   descriptions of your command's input parameters, and
-   the code implementing your command.

Atomist takes care of recognizing when someone invokes the bot command
by sending the intent to the Atomist Bot, collecting the required
parameters, and invoking the code implementing your command.  Plus,
the Atomist automation API provides methods for sending all manner
of [Slack messages][slack].

In this bot command example, we implement a command handler that
searches [Stack Overflow][so] and replies with the results.  Here is
the code implementing this bot command:

```typescript
@CommandHandler("Query Stack Overflow", "search so")
@Tags("stack-overflow")
export class SearchStackOverflow implements HandleCommand {

    @Parameter({description: "your search query", pattern: /^.*$/})
    public q: string;

    public handle(ctx: HandlerContext): Promise<HandlerResult> {
        return axios.get(`${apiSearchUrl}${encodeURIComponent(this.q)}`)
            .then(res => this.handleResult(res, this.q))
            .then(msg => ctx.messageClient.respond(msg))
            .then(() => Success, failure);
    }
}
```

The code that _handles_ this command is implemented as
a [TypeScript][ts] class that implements the `HandleCommand`
interface.  We call such a class a _command handler_.  The class is
decorated with information about the command handler using the
`@CommandHandler` decorator:

```typescript
@CommandHandler("Query Stack Overflow", "search so")
```

The first argument is a description of the command handler and the
second argument is the intent Atomist associates with your handler,
and the message users will send the Atomist Bot when they want to
invoke your command.  The intent for this command is "search so".

Command input parameters are class instance variables decorated using
the `@Parameter` decorator, whose argument is an object supplying
parameter metadata like a description and a regular expression used to
validate the input parameter values.  This example has one parameter,
`q`, we'll search Stack Overflow for its value.

The code implementing the bot command is in the `handle` method.  The
code in this example

-   Queries Stack Overflow search API (using the [axios][] HTTP client
    library for Node.js)
-   Creates a Slack message from the Stack Overflow results using the
    `handleResult` method (not shown)
-   Responds to the original Slack message
-   Indicates that we successfully responded with the results, or send
    an error message

Let's try it out.  First, let's clone the project containing the above
code and all the necessary project files.

```
git clone https://github.com/atomist-blogs/sof-command.git atomist/sof-command \
    && cd atomist/sof-command
```

Next we will install the project dependencies.

```
npm install
```

Then build the project

```
npm run build
```

Finally, we will start the client process on our local system.

```
npm start
```

This last command will start up the client, register the "search so"
bot command in your Slack team, and begin writing its logs to your
terminal.

Go ahead and test it by going to a channel in your Slack team that the
Atomist Bot has been invited to and send the bot the command intent.

```
@atomist search so q="spring 5"
```

If you do not provide a value for the query parameter, the Atomist Bot
will open a thread and ask you to enter it.

That's it!

[slack]: slack.md (Atomist Automation Slack Messages)
[so]: https://stackoverflow.com/ (Stack Overflow)
[ts]: https://www.typescriptlang.org/ (TypeScript)
[axios]: https://www.npmjs.com/package/axios (Axios HTTP Client)

## Events

A first Event Handler - bring in content from the blog
