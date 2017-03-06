Rug editors automate the changes you and your team perform on a daily basis
against your project's code base. A Rug editor takes an existing project and
applies changes encoded as a set of instructions to perform against the
project's content.

## Anatomy of an Editor

An editor follows the [conventions][rugconv] of a Rug project. An empty Rug
editor project looks like this.

[rugconv]: conventions.md

```console
some-project
    └── .atomist
        ├── editors
        ├── manifest.yml
        ├── package.json
        └── tests
```

Empty refers to the fact this project doesn't declare any editor file under
the `.atomist/editors` directory.

Imagine that we have an existing documentation project using the [MkDocs][mkdocs] toolkit. We often add a new page to that project and it always has
the same core structure. This is where we want to benefit from the automation provided by Rugs. 

[mkdocs]: http://www.mkdocs.org/

Your editor could look like this:

```console
mkdocs-rugs
    └── .atomist
        ├── editors
        │   └── AddMarkdownDocumentToMkDocsProject.ts
        ├── manifest.yml
        ├── package.json
        └── tests
            └── AddMarkdownDocumentToMkDocsProject.ts
```

Notice that we gave a more meaningful name to the project. We also added two
files, one containing the editor's script and the other one the test script
for that editor. As per the [conventions][rugconv], they share the same name.

!!! tip "Don't add those files by hand!"
    You can use the `AddTypeScriptEditor` in [rug-editors][rugeditor] to add all the files necessary to bootstrap a new editor.

[rugeditor]: https://github.com/atomist-rugs/rug-editors#addtypescripteditor

Let's now inspect what the `AddMarkdownDocumentToMkDocsProject.ts` editor script may look like.

## A Basic Editor Script

Whenever an editor script is applied against a project, its `#!typescript edit` method is invoked with the project as argument. A possible editor script for a MkDocs project discussed above could look like this:

```typescript linenums="1"
import { EditProject } from "@atomist/rug/operations/ProjectEditor";
import { Editor, Tags } from "@atomist/rug/operations/Decorators";
import { Pattern } from "@atomist/rug/operations/RugOperations";
import { Project } from "@atomist/rug/model/Project";

@Editor("AddMarkdownDocumentToMkDocsProject", "adds a Markdown document to a MkDocs project")
@Tags("markdown", "documentation", "mkdocs")
class AddMarkdownDocumentToMkDocsProject implements EditProject {

    @Parameter({
        description: "path of the new document in the project", 
        pattern: Pattern.any
    })
    filepath: string

    @Parameter({
        description: "document's top-level title", 
        pattern: Pattern.any
    })
    title: string

    @Parameter({
        description: "document's default content", 
        pattern: Pattern.any
    })
    content: string

    edit(project: Project) {
        let data = `#${this.title}\n\n${this.content}`;
        project.addFile(this.filepath, data);
    }
}
export const addMarkdownDocumentToMkDocsProject = new AddMarkdownDocumentToMkDocsProject();
```

The first few lines group the Rug typings our script will be using throughout (lines 1&ndash;4). Next, we declare our editor through TypeScript [decorators][] (line 6). The first argument of the `#!typescript @Editor` decorator is the name of the editor. This the public visible and discoverable name of the Rug. This name, along with the editors group and repository, form the
fully-qualified name of the generator. The second argument of the `#!typescript @Editor` decorator is a short description of the editor. The following line uses the `#!typescript @Tags` decorator to
apply some tags to our generator so people can search for it more
easily. Using the `#!typescript @Tags` decorator is optional but
highly recommended.

[decorators]: https://www.typescriptlang.org/docs/handbook/decorators.html

We then define the class which implements our editor (line 8). An editor implements the `#!typescript EditProject` interface. That interface requires the `#!typescript edit(Project)` method to be defined (line 28). It is
convention for the editor and the class that implements it to have
the same name.

You will likely want to customize your Rugs' input to tune their output according to runtime variables. Such customization is achieved through parameters that your editor must declare as such in the class via the `#!typescript @Parameter` decorator (lines 10, 16 and 22). This decorator provides all the metadata of the parameter whereas the decorated variable declaration provides its name and default value, if any. The `#!typescript @Parameter` decorator accepts a single argument, a JavaScript object. That object accepts [properties][paramprops] documented in the [conventions][rugconv] but, only the `pattern` property is required. A pattern is an [anchored][] regular expression that validates the input. Here we rely on the `#!typescript Pattern.any` pattern bundled by Atomist. 

[paramprops]: /user-guide/rug/conventions/#typescript-decorators
[anchored]: http://www.regular-expressions.info/anchors.html

The `#!typescript edit` method takes a single argument, a
`#!typescript Project` object. That object gives you access to the entire structure and content of the project your editor is applied to. Use it to access and update the content of any resource in that project according to the goal of your editor. You have the full power of TypeScript and the Rug programming model and [language extensions][langext] to achieve this.

[langext]: /reference/rug/extensions/

Here, our editor performs the following operations:

* Create the Markdown content of document based on the given parameters
* Add a Markdown file at the given path with the built content


In the last line of the editor script we export an instance of that
editor to make it visible to the Rug runtime when it executed.
Like the editor class name, the name of the `#!typescript const`
does not matter, but it is convention to use the editor/class name,
lower-casing the first letter.

At this stage, your editor script can be executed against an existing [MkDocs] project. However, editors can also be considered modular bricks and composed from other Rugs.