# Rug Event Handlers: Event-driven Actions

"It works on my machine!" is saying we often hear. In recent years, the devops
trend has shown us that software does not stop once it has been delivered.
A software exists thanks to those who designed and developed it but thrive
thanks to those who operate it. Atomist believe those two sides live in the
same world and there should not be divided.

A common setup today is as follows:

*   a project's source code lives in a VCS somewhere, like GitHub, GitLab or
    BitBucket
*   a project is automatically built and tested in a CI service
*   a project is usually automatically delivered in a forge somewhere
*   a project may even be deployed automatically in an environment
*   a project is then operated, monitored and cared for in that environment for
    users to enjoy
*   maybe issues are created for developers to look at

During all those phases, a massive amount of events were triggered: a commit
was pushed, a build succeeded or failed, the project was deployed, the service
failed in production...

Atomist believes that all these events bring all the team members as one.
However, not all events may not be able relevant to a team at a given time,
moreover, it seems appropriate to think that we should also automate the
response to some of those events.

## A Basic Event Handler

The following event handler responds to events triggered by your system. In this
example, whenever a new Markdown document is added to the project, an event
is sent out and this handler runs our [reviewer](reviewers.md) against that
document.

```typescript
import { HandleEvent, Plan } from '@atomist/rug/operations/Handlers'
import { EventHandler, Parameter, Tags } from '@atomist/rug/operations/Decorators'
import { Project } from '@atomist/rug/model/Core'

@EventHandler("MarkdownDocumentChanged", "Reviews Markdown document changes",  "/issue")
@Tags("markdown", "documentation")
class MarkdownDocumentCreated implements HandleEvent<Issue, Issue> {
  handle(match: Match<Issue,Issue>): Plan {
    let issue = match.root()
    let reopen = issue.reopen
    reopen.onSuccess = {body: ""}
    return new Plan().add(reopen)
  }
}
export let event = new MarkdownDocumentChanged();
```

!!! note
    Please see the [reference documentation][rugevhdlref] for detailed 
    information about the event handler programming model.

[rugevhdlref]: /reference/rug/handler.md
