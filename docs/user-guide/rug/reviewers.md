In the last few years, code review has become a strong asset for any team
looking at producing high quality software and reducing bugs. However, with the
sheer size of projects, it can become highly tedious to track all changes
properly and a balance must be found between thorough code reviews and the time
they consume.

Rug reviewers allievate some of that burden by letting your team codifying
some of your peer reviews into automatable operations.

## A Basic Reviewer

```typescript
import { ReviewProject } from "@atomist/rug/operations/ProjectReviewer"
import { Reviewer, Tags } from "@atomist/rug/operations/Decorators"
import { ReviewResult, ReviewComment } from '@atomist/rug/operations/RugOperations'
import { File, Project } from '@atomist/rug/model/Core'

@Reviewer("MarkdownHeaderStyle", "reviews Markdown document use proper header style")
@Tags("markdown", "documentation")
class MarkdownHeaderStyle implements ReviewProject {

    review(project: Project): ReviewResult
        let comments = project.files().filter(f => f.endsWith('.md')).forEach(m => {
            if (m.contains("===")) {
                return ReviewComment(comment="not using correct header style",
                                     filename=m.name())
            }
        })

        return ReviewResult("markdown header style review", comments)
    }
}
export let reviewer = new MarkdownHeaderStyle()
```
