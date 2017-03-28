Events are everywhere in the software development and operations processes.
Our source code repositories generate events. Our CI systems generate events.
Our runtime platforms generate events. Our services generate events. Our issue
tracking systems generate events. Everything seems to generate events.

Atomist believes that bringing all these events together so they can be
connected and acted upon provides tremendous value for shipping better code
faster. The mechanism for realizing this promise is to automate event responses
using Rug event handlers.

Event handlers define automated responses to events. Each event handler is a
program in a familiar <!-- @jessitron I want to say
"compiles-to-JavaScript" --> Turing-complete language. Based on the
characteristics of the event that occurred, the handler decides whether to act and
which actions to take.

A new issue was created? Post that in the repository's chat channel and also add
buttons to the message that let people apply labels or claim the issue without
leaving chat.

A developer submits a pull request in a library? Find out whether it will to
impact a service that uses the library: create a branch in the service, modify
the code to update the dependency.

The service build completes successfully?
Update the library's pull request (PR), and tell the developer all the news.

A person in chat asks Atomist "what did I do today?"? Respond by
listing the issues they updated, the PRs they reviewed, and the commits they
pushed.

Below is a basic Rug event handler which should make it clear how the above
behaviours could be achieved.

## A Basic Event Handler

The following event handler responds when a tag is added to or deleted from an
issue. When this event occurs, the Atomist Bot sends a message to the
repository's Slack channel informing people in the channel about the tagging
_event_.

```typescript linenums="1"
import { HandleEvent, Message } from '@atomist/rug/operations/Handlers'
import { GraphNode, Match, PathExpression } from '@atomist/rug/tree/PathExpression'
import { EventHandler, Tags } from '@atomist/rug/operations/Decorators'

@EventHandler("TagHandler", "Handles tag events", "/Tag")
@Tags("github", "tag")
export class TagHandler implements HandleEvent<GraphNode, GraphNode> {
    handle(event: Match<GraphNode, GraphNode>): Message {
        let message = new Message("Tag event!");
        return message.withNode(event.root());
    }
}
export const tagHandler = new TagHandler();
```

As you can see, Rug event handlers and Rug [command handlers][commands] are
 _very_ similar. In fact, the only significant difference is in the way they are
invoked; event handlers are invoked by the Rug runtime in response to _events_
ingested by Atomist, whereas command handlers are either invoked directly by
users via the Atomist bot, or via the running of a `#!typescript Plan` returned
by a `#!typescript CommandHandler`, `#!typescript EventHandler` or
`#!typescript ResponseHandler`.

Declaring an event handler is done using the `#!typescript @EventHandler` class
decorator, which like `#!typescript @CommandHandler`, requires name and
description. Additionally however, it requires a [Path Expression][pes], which
registers the handler as handling new new events resulting from the
expression execution.

[commands]: /user-guide/rug/commands.md
[pes]: /user-guide/rug/path-expressions.md
