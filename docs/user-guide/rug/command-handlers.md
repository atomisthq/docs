Lowering the barrier for communication and information flow makes
teams more productive. Open Source projects have long relied on chat
to help them operate and coordinate contributors and project lifecycle.
Modern chat solutions such as Slack, which can integrate deeply in your ecosystem,
have improved on those foundations and have proven to be fantastic hubs for teams
to drive automation with simple chat commands.

Common scenarios, for instance cutting a new release, or rolling back a broken
deployment. Additionally, like other Rugs,  command handlers can also dive into
the code of project as a result of a bot interaction. In other words, not only
can you use Rug commands to list open issues on a project but the team can also
query the project's code or even run other Rugs against the project, all of this
from the project's chat channel.

## Anatomy of a Command Handler

Rug commands handlers are the interface to add new skills to the [Atomist bot][bot].
These handlers are appropriate when you want to either query your project
or perform an action where your team communicates about the project.

Chat commands are declared in Rug command handlers. Command handlers handle
commands coming from users via the Atomist bot.

[bot]: /user-guide/interfaces/bot.md

Depending on their goal, Rug command handler implementations are stored either alongside
the project they target or in different projects altogether.

{!handler-layout.md!}

## Example Command Handler

Suppose we want to open a new GitHub issue:

TODO FIX THIS

```typescript linenums="1"
{!doc-rugs/.atomist/handlers/command/CreateIssue.ts!}
```

This command handler follows the same programming model as other Rugs, so it
should look familiar.

### Declaration

The first lines group the Rug typing imports which, provide interfaces and
decorators to implement and declare your handlers. The  `#!typescript CreateIssueCommand`
class expresses how the command is invoked, as well as how to handle the error
scenario. `#!typescript GenericErrorHandler` is a  [Response Handlers](#response-handlers)
to handle the failure case of the `create-github-issue` `execute` [instruction](#instructions).


We declare our handler through [decorators][decorators]. The first argument
of the `#!typescript @CommandHandler` decorator is the name of the command,
the second is its description. These make the handlers visible and discoverable.

[decorators]: https://www.typescriptlang.org/docs/handbook/decorators.html

### Intent

A Rug command handler can have associated intent that users can send when talking
with the Atomist bot. The intent is described using the `#!typescript @Intent`
decorator (line 20). Whenever a user sends the `@atomist create issue` message
to the Atomist bot, the Rug runtime runs the `#!typescript CreateGitHubIssue`
command handler. Declaring Intent is the way we declare the commands that are
made availble to users in chat.

!!! note "Command Handlers invoking Command Handlers"
    Most of the time, it makes sense to add the `#!typescript @Intent` decorator.
    However, it's also possible to invoke Command Handlers from Command Handlers, so for these handlers, it
    might not make sense to expose them directly to chat users as commands.

### Discovery

{!decorators/tags.md!}

### Implementation

You define the class which implements your command handler (line 21). A command handler implements
the `#!typescript HandleCommand` interface. This interface requires the
`#!typescript handle(command: HandlerContext): Promise<HandlerResult>` method to be
implemented. It is a convention for the command handler and the class that defines
it to have the same name.

The `#!typescript handle` method takes a single argument, a
`#!typescript HandlerContext` instance. This gives you access to a
[path expression engine][pxe] to query your organization's projects. The method
must return a `#!typescript CommandPlan`.

[pxe]: path-expressions.md

### Parameters

Rug command handlers can take parameters like other Rugs. {!decorators/parameters.md!}

[rugconv]: conventions.md

### Mapped Parameters

Rug command handlers can define what are called Mapped Parameters to receive
relevant contextual information when invoked via the Atomist bot. {!decorators/mapped-parameters.md!}

### CommandPlans

A `#!typescript CommandPlan` describes the actions to be taken by the Rug runtime
on behalf of the handler. CommandPlans are composed of [Messages](#messages) and/or
[respondables](#respondables). Respondables instruct the rug runtime to immediately
perform ordinary rug operations, whereas messages are sent to the Atomist Bot for
display to the user.

### Messages

A `Message` represents presentable content to be rendered in chat by the Atomist
Bot to a chat channel or user. However, each of the two available message types
achieve this in different ways.

#### Directed Messages

{!directed-message.md!}

#### Response Messages

{!response-message.md!}

### Respondables

An `#!typescript CommandRespondable` is really just a container for an instruction and
some optional `onError` and `onSuccess` capabilities. The `onError` and `onSuccess`
properties of an `#!typescript CommandRespondable` can be [messages](#messages),
[CommandPlans](#commandplans) or [response handlers](#response-handlers).

```typescript
const plan = new CommandPlan();
plan.add(
    {
        instruction: {
            kind: "execute",
            name: "create-github-issue",
            parameters: this
        },
        onError: {
            kind: "respond",
            name: "GenericErrorHandler",
            parameters: this
        },
        onSuccess: new ResponseMesssage("Successfully created issue")
    }
)
plan.add(handleErrors(exec, this))
return plan;

```

The example above shows how send a message back to the user or channel that invoked
the command `onSuccess` or to invoke the `GenericErrorHandler` [Response Handler](#response-handlers)
if creation fails.

### Instructions

Instructions in an `#!typescript CommandRespondable` have the following properties:

*   `#!typescript kind: "generate" | "edit" | "execute" | "command"`: the kind of instruction
*   `#!typescript name: string`: the name of the operation to apply
*   `#!typescript parameters: {}`: key/value pairs passed to the operation
*   `#!typescript project?: string`: Project name (only for generators & editors)

Instructions can be used to have the rug runtime run Rugs, such as invoking
a Generator (`#!typescript "generate"`), an Editor (`#!typescript "edit"`),
a [Rug Funtion](#rug-functions) (`#!typescript "execute"`) or even another Command
Handler.

### Rug Functions

{!rug-functions.md!}

### Response Handlers

{!response-handlers.md!}
