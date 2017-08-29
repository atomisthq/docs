As implied by the name, a `#!typescript LifecycleMessage` refers to some
pre-defined system lifecycle, such as the flow of a commit from Git,
through CI to deployment, monitoring and the like.

Lifecycle messages are automatically routed to appropriate chat channel by
the Atomist Bot. Typically, this is the channel associated with the GitHub
repository associated with the activity initiating the lifecycle message.

Message styling is also currently performed by the Atomist Bot, though we are
working to allow customization in the handlers themselves.

The Atomist Bot needs two pieces of information in order to correctly route and
render a lifecycle message, a [GraphNode][graphnode] and
a `lifecycle-id`. The GraphNode contains all the data required to render actionable
messages in chat, and the lifecycle-id ties associates related messages to
one-another. In a Slack context, this means a Commit message could have its
associated CI build status updated as the build progresses from say `started`
through `succeeded` or `failed`.

[graphnode]: /reference/rug/path-expressions.md

So the main responsibility of lifecycle messages is to create associations between
related messages using the lifecycle-id.

Messages would not be actionable without some way for the user to initiate related
acitivites. Lifecyce messages achieve this by allowing `actions` in the form of a
`#!typescript Presentable` to be added to the message before dispatch:

```typescript
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
```

Here we are saying: render a button with label `Reopen`, which when clicked, will
dispatch a [Command Handler][commands] (`#!typescript "command"`)
called `ReopenGithubIssue`, which will execute a [Rug Function][functions]
which attempt to re-open the issue.

The term `action` here refers to the actions associated with [Slack buttons][buttons].
So by adding actions to a message, we are dispatching optional deferred Rug
executions. In this instance a Command Handler bound to a specific GitHub issue,
but it could just as easily have been an [editor][editors] or [generator][generators].

[commands]: /reference/rug/command-handlers.md
[functions]: /reference/rug/rug-functions.md
[editors]: /reference/rug/editors.md
[generators]: /reference/rug/generators.md
[buttons]: https://api.slack.com/docs/message-buttons
