In the last few years, code review has become a strong asset for any
team looking at producing high quality software and reducing
bugs. However, with the sheer size of projects, it can become highly
tedious to track all changes properly and a balance must be found
between thorough code reviews and the time they consume.

Rug reviewers allievate some of that burden by letting your team
codifying some of your peer reviews into automatable operations.

## A Basic Reviewer

The following reviewer ensures each Markdown file of a MkDocs (a
documentation builder tool) project do not override the top-level
header which is set by MkDocs from its settings.

```typescript linenums="1"
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
The responsibility of a reviewer is to return a `ReviewResult` containing zero or more `ReviewComment` instances. Reviewers use the same object model as other project operations, but cannot modify projects. (Any attempt to update a project will be ignored.) Review comments may contain the file path, line and column, of the problem.
## A Reviewer Focusing on AST Nodes
When you are working with AST nodes within a file produced by Antlr or another technologies (and typically returned by path expressions), there is a convenient method of adding a review comment, automatically capturing full positional information. The comments in the following listing explain:

```
import {Project} from '@atomist/rug/model/Core'
import {ProjectReviewer} from '@atomist/rug/operations/ProjectReviewer'
import {PathExpression,PathExpressionEngine} from '@atomist/rug/tree/PathExpression'
import {ReviewResult,ReviewComment,Severity} from '@atomist/rug/operations/RugOperation'

// We can use this to get additional information from path expression matches
import {DecoratingPathExpressionEngine} from '@atomist/rug/ast/DecoratingPathExpressionEngine'
import {RichTextTreeNode} from '@atomist/rug/ast/TextTreeNodeOps'
import {Parameter, Reviewer} from '@atomist/rug/operations/Decorators'

// Import Java types and helpers
import * as java from '@atomist/rug/ast/java/Types'

export class CatchThrowable implements ProjectReviewer {

    name = "CatchThrowable"
    description = "Look for particular throwables"

	// Note the use of the well-known validation pattern @java_identifier
    @Parameter({description: "Exception to look for", pattern: "@java_identifier"})
    exception: string

    review(project: Project) {
    	// Use a decorating PathExpressionEngine to get RichTextTreeNode
    	// mixin returned from path expression evaluation
      const eng = 
      new DecoratingPathExpressionEngine(project.context().pathExpressionEngine())

      const rr = ReviewResult.empty(this.name)

		// Uses well-known path expression.
		// Works with RichTextTreeNode
      eng.withExpression<RichTextTreeNode>(project, new java.Catch(this.exception), n => {   
      	// Because this comment concerns a node within the file's AST
      	// the commentConcerning function automatically takes care of finding th location: file path, line and column 
        rr.add(n.commentConcerning(
                    this.name,
                    Severity.Major)
        )
       })
       return rr
    }
}

export const editor = new CatchThrowable()
```
The well-known Java path expression `Catch` is as follows, and is a useful model for user-authored path expressions. It builds an interpolated string from its construtor parameters and passes the result to its superclass's constructor:

```
export class Catch extends PathExpression<Project,TextTreeNode> {

    constructor(exception: string) {
        super(`//JavaFile()//catchClause//catchType[@value='${exception}']`)
    }
}
```


