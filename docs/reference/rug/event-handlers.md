Events are everywhere in software development and operations processes.
Your source code repositories generate events. Your CI systems generate events.
Your runtime platforms generate events. Your services generate events. Your issue
tracking systems generate events. Everything seems to generate events.

Atomist believes that bringing all these events together so they can be
connected and acted upon provides tremendous value for shipping better code
faster. The mechanism for realizing this promise is to automate event responses
using Rug event handlers.

Event handlers define automated responses to events. Each event handler is a
program in a compiles-to-JavaScript, Turing-complete language. Based on the
characteristics of the event that occurred, the handler decides whether to act and
which actions to take.

!!! hint "Why not try..."
    A new issue was created? Post that in the repository's chat channel and also add
    buttons to the message that let people apply labels or claim the issue without
    leaving chat.

    A developer submits a pull request in a library? Find out whether it will
    impact a service that uses the library: create a branch in the service, modify
    the code to update the dependency.

    The service build completes successfully? Update the library's pull request
    (PR), and tell the developer all the news.

    A person in chat asks Atomist "what did I do today?"? Respond by
    listing the issues they updated, the PRs they reviewed, and the commits they
    pushed.

## Anatomy of an Event Handler

Rug event handlers are where you define how Atomist responds to the events that
matter in your system.

Depending on their goal, Event Handler implementations are stored either along
side the project they target or in different projects altogether.

{!handler-layout.md!}

### Example Event Handler

The following event handler responds to GitHub issue `closed` events. When this
event occurs, the Atomist Bot sends a message to the repository's Slack channel
informing people in the channel about the closing _event_, whilst also providing
a button, that when clicked, will reopen it.

```typescript linenums="1"
import { EventHandler, Tags } from "@atomist/rug/operations/Decorators";
import { HandleEvent, LifecycleMessage, Plan } from "@atomist/rug/operations/Handlers";
import { GraphNode, Match, PathExpression } from "@atomist/rug/tree/PathExpression";

import { Comment } from "@atomist/cortex/Comment";
import { Issue } from "@atomist/cortex/Issue";

@EventHandler("ClosedGitHubIssues", "Handles closed issue events",
    new PathExpression<Issue, Issue>(
        `/Issue()[@state='closed']
            [/resolvingCommits::Commit()/author::GitHubId()
                [/person::Person()/chatId::ChatId()]?]?
            [/openedBy::GitHubId()
                [/person::Person()/chatId::ChatId()]?]
            [/closedBy::GitHubId()
                [/person::Person()/chatId::ChatId()]?]?
            [/repo::Repo()/channels::ChatChannel()]
            [/labels::Label()]?`))
@Tags("github", "issue")
class ClosedIssue implements HandleEvent<Issue, Issue> {
    handle(event: Match<Issue, Issue>): Plan {
        const issue = event.root();

        const lifecycleId = "issue/" + issue.repo.owner + "/" + issue.repo.name + "/" + issue.number;
        const message = new LifecycleMessage(issue, lifecycleId);

        message.addAction({
            label: "Reopen",
            instruction: {
                kind: "command",
                name: "ReopenGitHubIssue",
                parameters: {
                    issue: issue.number,
                    owner: issue.repo.owner,
                    repo: issue.repo.name,
                },
            },
        });

        return Plan.ofMessage(message);
    }
}
export const closedIssue = new ClosedIssue();
```

This event handler follows the same programming model as other Rugs, so it 
should look familiar. It gets triggered for each GitHub repository `Commit` event
in the team and responds by sending a [Lifecycle Message](#messages) to the Atomist
Bot.

### Declaration

Declaring an event handler is done using the `#!typescript @EventHandler` class
decorator which requires a name and a description. Additionally, it requires a 
[Path Expression][pes], which registers the types of events for which the handler
should be triggered.

### Implementation

Rug event handlers must implemente the `#!typescript HandleEvent<R,M>` interface, 
where the `R` and `M` type parameters refer to the expected root node and match
types resulting from the execution of a [Path Expression][pes] respectively.

### Discovery

{!decorators/tags.md!}

### EventPlans

An `#!typescript EventPlan` describes the actions to be taken by the Rug runtime
on behalf of the handler. EventPlans are composed of [Messages](#messages) and/or 
[respondables](#respondables). Respondables instruct the rug runtime to automatically
perform ordinary Rug operations, whereas messages are sent to chat by the Atomist
Bot.

### Messages

A `Message` represents presentable content and/or deferable actions displayed
to the user in response to returning an `#!typescript EventPlan` from an event
handler. Every message will end up being sent to a chat channel or user by the
Atomist bot. However, each of the two available message types achieve this in 
different ways.

#### Directed Messages

{!directed-message.md!}

#### Lifecycle Messages

{!lifecycle-message.md!}

### Respondables

An `#!typescript EventRespondable` is really just a container for an instruction and
some optional `onError` and `onSuccess` capabilities. The `onError` and `onSuccess`
properties of an `#!typescript EventRespondable` can be [messages](#messages), 
[EventPlans](#eventplans) or [response handlers](#response-handlers).

```typescript
const plan = new EventPlan();
plan.add(
    {
        instruction: {
            kind: "edit",
            project: "rugs",
            name: "UpdateReadme",
            parameters: {
                newContent: "Rugs really tie the room together"
            }
        },
        onSuccess: new DirectedMessage("woot", new ChannelAddress("#random")),
        onError: {
            kind: "respond",
            name: "HandleReadmeUpdateErrors"
        }
    }
)

```

The example above shows how to send `woot` to the `#random` channel using a
[Directed Message](#messages) if the `edit` Instruction completes successfully,
and invoke the `HandleReadmeUpdateErros` [Response Handler](#response-handlers)
if it fails.

### Instructions

Instructions in an `#!typescript EventRespondable` have the following properties:

*   `#!typescript kind: "generate" | "edit" | "execute"`: the kind of instruction 
*   `#!typescript name: string`: the name of the operation to apply
*   `#!typescript parameters: {}`: key/value pairs passed to the operation
*   `#!typescript project?: string`: Project name (only for generators & editors)

Instructions can be used to have the rug runtime run Rugs, such as invoking
a generator (`#!typescript "generate"`), an editor (`#!typescript "edit"`), or
a [Rug Funtion](#rug-functions) (`#!typescript "execute"`).

### Rug Functions

{!rug-functions.md!}

!!! missing
    Although it's possible to invoke Rug Functions from Event Handlers, there is
    currently no mechanism to populate Secrets (tokens, passwords etc.) as there
    is for Command Handlers. We are currently working on support for this.

### Response Handlers

{!response-handlers.md!}

[commands]: command-handlers.md
[pes]: path-expressions.md
