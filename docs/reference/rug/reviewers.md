# Rug Reviewers: Projects Compliance

## Overview

### What are Rug Reviewers?

In the last few years, code review has become a strong asset for any team
looking at producing high quality software and reducing bugs. However, with the
sheer size of projects, it can become highly tedious to track all changes
properly and a balance must be found between thorough code reviews and the time
they consume.

Rug reviewers allievate some of that burden by letting your team codifying 
some of peer reviews into automatable operations.

#### A Basic Reviewer

The following reviewer ensures each Markdown file of a MkDocs (a documentation
builder tool) project do not override the top-level header which is set by 
MkDocs from its settings.

```typescript
import { ReviewProject } from "@atomist/rug/operations/ProjectReviewer"
import { Reviewer, Tags } from "@atomist/rug/operations/Decorators"
import { ReviewResult, ReviewComment, Severity } from '@atomist/rug/operations/RugOperations'
import { PathExpressionEngine } from "@atomist/rug/tree/PathExpression"
import { Project } from '@atomist/rug/model/Project'
import { Line } from '@atomist/rug/model/Line'

@Reviewer("DoNotOverrideTopLevelHeaderInMkDocsProject", 
          "checks Markdown document do not have a top-level header")
@Tags("markdown", "documentation", "mkdocs")
class DoNotOverrideTopLevelHeaderInMkDocsProject implements ReviewProject {

    review(project: Project): ReviewResult {
        let eng: PathExpressionEngine = project.context().pathExpressionEngine()

        let review = ReviewResult.empty(this.name)

        eng.with<Line>(project, "/*[Directory()[@name="docs"]]//Line()", l => {
            let index = l.value().indexOf("# ")
            if (index == 0)
                review.add(new ReviewComment(
                    this.name,
                    Severity.Major,
                    l.file().path(),
                    l.numFrom1(),
                    index + 1
                )
            )
        })

        return review
    }
}
export let reviewer = new DoNotOverrideTopLevelHeaderInMkDocsProject()
```

!!! note
    Please see the [reference documentation][rugrewref] for detailed information 
    about the reviewer programming model.

[rugrewref]: /reference/rug/reviewers.md
