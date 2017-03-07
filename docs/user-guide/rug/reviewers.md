In the last few years, code review has become a strong asset for any
team looking at producing high quality software and reducing
bugs. However, with the sheer size of projects, it can become highly
tedious to track all changes properly and a balance must be found
between thorough code reviews and the time they consume.

Rug reviewers allievate some of that burden by letting your team
codifying some of your peer reviews into automatable operations.

## Anatomy of a Reviewer

Suppose we have a running [MkDocs][mkdocs] project for documenting our software. A typical structure for such a project could be:

[mkdocs]: http://www.mkdocs.org/

```console
mkdocs-project
    ├── README.md
    ├── docs
    │   └── index.md
    │   └── tutorial.md
    │   └── reference.md
    ├── mkdocs.yml
    └── requirements.txt
```

Whenever a change is performed against that project, we wish to automate certain code reviews to detect non-complying modifications and warn about them as early as possible.

Let's extend the Rug project described in the Rug editor page:

```console hl_lines="7 8 11"
mkdocs-rugs
    └── .atomist
        ├── editors
        │   └── AddMarkdownDocumentToMkDocsProject.ts
        ├── manifest.yml
        ├── package.json
        ├── reviewers
        │   └── DoNotOverrideTopLevelHeaderInMkDocsProject.ts
        └── tests
            ├── AddMarkdownDocumentToMkDocsProject.ts
            └── DoNotOverrideTopLevelHeaderInMkDocsProject.ts
```

The `.atomist` directory has the Rug reviewer script and its associated test in appropriate subdirectories.

Let's take a close look at the Rug editor script.

## A Basic Reviewer Script

The following reviewer ensures each Markdown file of a MkDocs (a
documentation builder tool) project do not override the top-level
header which is set by MkDocs from its settings.

The reviewer script's  `#!typescript review` method is invoked against a project and returns the `#!typescript ReviewResult` object with any potential 
`#!typescript ReviewComment` to consider.

```typescript linenums="1"
import { ReviewProject } from "@atomist/rug/operations/ProjectReviewer";
import { Reviewer, Tags } from "@atomist/rug/operations/Decorators";
import { ReviewResult, ReviewComment, Severity } from "@atomist/rug/operations/RugOperations";
import { PathExpressionEngine } from "@atomist/rug/tree/PathExpression";
import { Project } from "@atomist/rug/model/Project";
import { Line } from "@atomist/rug/model/Line";

@Reviewer("DoNotOverrideTopLevelHeaderInMkDocsProject",
          "checks Markdown document do not have a top-level header")
@Tags("markdown", "documentation", "mkdocs")
class DoNotOverrideTopLevelHeaderInMkDocsProject implements ReviewProject {

    review(project: Project): ReviewResult {
        let eng: PathExpressionEngine = project.context().pathExpressionEngine();

        let review = ReviewResult.empty(this.name);

        eng.with<Line>(project, "/*[Directory()[@name="docs"]]//Line()", l => {
            let index = l.value().indexOf("# ");
            if (index == 0)
                review.add(new ReviewComment(
                    this.name,
                    Severity.Major,
                    l.file().path(),
                    l.numFrom1(),
                    index + 1
                )
            )
        });

        return review;
    }
}
export const let doNotOverrideTopLevelHeaderInMkDocsProject = new DoNotOverrideTopLevelHeaderInMkDocsProject();
```

At the top of a reviewer script, we find the typical import statements of Rug typings needed by the script (lines 1&ndash;6). We then use a [decorator][] to declare reviewer itself (line 8). The first argument of the `#!typescript @Reviewer` decorator is the name of the reviewer. That name is externally visible and discoverable. This name, along with the reviewers group and repository, form the fully-qualified name of the reviewer. The following argument of the `#!typescript @Reviewer` decorator is a short description of the reviewer. Next, we use the `#!typescript @Tags` decorator to tag the reviewer for increasing its discoverability. It allows people to search for this reviewer more easily. Using the `#!typescript @Tags` decorator is optional but highly recommended.

[decorator]: https://www.typescriptlang.org/docs/handbook/decorators.html

We define the class implementing the reviewer (line 11). A reviewer implements the `#!typescript ReviewProject` interface which dictates to define the `#!typescript review(Project): ReviewResult` method (line 13). It is
convention for the reviewer and the class that implements it to have
the same name.

The `#!typescript review` method takes a single argument, a `#!typescript Project` object.  The `#!typescript Project` provided to this method allows accessing the content of the project the reviewer is applied to. Using this object, you can navigate filesystem resources as well as the content of each file in a structure-aware manner. Your reviewer can inspect and make decision regarding the compliance of aspects such as names, content, indentation, conventions, etc. In the reviewer above, we perform the following operations:

* We start with an empty review, in other words, a compliant project
* For each file of the `docs` directory of the target project, we analyze each   line and check if it starts with a `# ` which is indicative of a top-level     header in the Markdown's syntax
* If a line does start with such a header syntax, we report a review comment     with a severity of `#!typescript Severity.Major` level (line 23), the path     of the file (line 24) and the line at which we triggered our reviewer (line    25)
* Finally, we return the list of faults our reviewers found

!!! success "Rely on path expressions"
    To fully benefit from reviewers, it is recommended to rely on [path expressions][pxe] to navigate your project's structure as this example performs line 18. They are aware of the kind of resources they address, providing a much richer experience when navigating your project's content.

[pxe]: path-expressions.md

In the last line of the reviewer script we export an instance of that
reviewer to make it visible to the Rug runtime when it executed.
Like the reviewer class name, the name of the `#!typescript const`
does not matter, but it is convention to use the reviewer/class name,
lower-casing the first letter.
