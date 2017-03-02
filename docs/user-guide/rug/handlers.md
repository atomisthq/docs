Events are everywhere in the software development and operation
process.  Our source code repositories generate events.  Our CI
systems generate events.  Our runtime platforms generate events.  Our
services generate events.  Our issue tracking systems generate events.

Atomist believes that bringing all these events together so they can
be connected and acted upon provides tremendous promise for shipping
better code faster.  The mechanism for realizing this promise is to
automate event responses using Rug event handlers.

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
