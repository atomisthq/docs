Events are everywhere in the software development and operation
process.  Our source code repositories generate events.  Our CI
systems generate events.  Our runtime platforms generate events.  Our
services generate events.  Our issue tracking systems generate events.

Atomist believes that bringing all these events together so they can
be connected and acted upon provides tremendous promise for shipping
better code faster.  The mechanism for realizing this promise is to
automate event responses using Rug event handlers.

Handlers define automated responses to events. Each handler is a
program in a familiar <!-- @jessitron I want to say
"compiles-to-JavaScript" --> Turing-complete language.  Based on the
characteristics of the event that occurred, the handler decides
whether and what action to take.

A new issue was created?  Post that in the repository's chat channel
and add buttons to the message that let people apply labels or claim
the issue without leaving chat.

A developer submits a pull request in a library?  Find out whether it
will to impact a service that uses the library: create a branch in the
service, modify the code to update the dependency. The service build
completes successfully?  Update the library's pull request, and tell
the developer all the news.

A person in chat asks Atomist "what did I do today?"  Respond by
listing the issues they updated, the PRs they reviewed, and the
commits they pushed.

## A Basic Event Handler

The following event handler responds when a tag is added to or deleted
from an issue.  When this event occurs, the Atomist Bot sends a
message to the repository's Slack channel informing people in the
channel about the tag.

```typescript linenums="1"
import {Atomist} from '@atomist/rug/operations/Handler'
import {TreeNode} from '@atomist/rug/tree/PathExpression'
declare var atomist: Atomist

atomist.on<TreeNode, TreeNode>("/Tag()", m => {
   let tag = m.root()
   atomist.messageBuilder().regarding(tag).send()
})
```
