The most common task performed on a daily basis is to change the code of a
project. Those updates can target a single file but can also refer to many
resources.

Rug editors automate updates, from the simplest to most complex.

## A Basic Editor

The following editor adds a Markdown document at the given path inside your
project.

```typescript linenums="1"
import { EditProject } from "@atomist/rug/operations/ProjectEditor"
import { Editor, Tags } from "@atomist/rug/operations/Decorators"
import { Pattern } from '@atomist/rug/operations/RugOperations'
import { Project } from '@atomist/rug/model/Core'

@Editor("AddMarkdownDocument", "adds a Markdown document with default content")
@Tags("markdown", "documentation")
class AddMarkdownDocument implements EditProject {

    @Parameter({description: "path of the new document in the project", pattern: Pattern.any})
    filepath: string

    @Parameter({description: "document's top-level title", pattern: Pattern.any})
    title: string

    @Parameter({description: "document's default content", pattern: Pattern.any})
    content: string

    edit(project: Project) {
        let data = `#${this.title}\n\n${this.content}`
        project.addFile(this.filepath, data)
    }
}
export const editor = new AddMarkdownDocument()
```

## Running Editors

Editors work in the given context of a project, starting at its top-level
directory. Usually, an editor looks for one or many resources to perform
changes.

!!! warning
    Editors are applied on a project without a confirmation from the operator.
    If your project is not tracked in a VCS, you may lose data.
