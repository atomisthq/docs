# Rug Editors: Updating Projects

## Overview

### What are Rug Editors?

Rug editors automate the changes you and your team perform on a daily basis
against your project's code base.

## A Basic Editor

The following editor adds a Markdown document at the given path inside your
project.

```typescript
import { EditProject } from "@atomist/rug/operations/ProjectEditor"
import { Editor, Tags } from "@atomist/rug/operations/Decorators"
import { Pattern } from '@atomist/rug/operations/RugOperations'
import { Project } from '@atomist/rug/model/Project'

@Editor("AddMarkdownDocumentToMkDocsProject", "adds a Markdown document to a MkDocs project")
@Tags("markdown", "documentation", "mkdocs")
class AddMarkdownDocumentToMkDocsProject implements EditProject {

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
export const editor = new AddMarkdownDocumentToMkDocsProject()
```

Please see below for a [detailed description](#what-is-a-editor-made-of)
of this editor's structure.

### What do Rug Editors do?

Editors perform a set of changes against your project's code base so 
you can automate repetitive tasks in a programmable manner.

This spans from adding, moving or deleting a single file or complete
directory structures to performing surgical updates of code. All of this with
a concrete knowledge of the resource being updated.

This means  that Rug editors have a deep understanding of the structure you are
working against.

## Search for Editors

### Using the Atomist bot

To see the list of available editors to your team, ask the bot for them:

```
@atomist editors
```

This will return a short list of editors, you can refine your search by
specifying filter words to the command. For instance, to search for editors
for Java and Spring:

```
@atomist editors java spring
```

### Using the CLI

To find available editors with the CLI, run the following command:

```console
$ rug search --operations --type editor
Resolving dependencies for atomist:end-user-documentation:0.1.0 ← local completed
  Searching https://api.atomist.com/catalog/operation/search
Searching catalogs completed

→ Remote Archives (27 archives found)
  atomist-rugs:flask-service [public] (0.1.2)
    Editors
    ├── atomist-rugs.flask-service.AddDockerfile
    ├── atomist-rugs.flask-service.AddTravisCI
    ├── atomist-rugs.flask-service.NewFlaskMicroserviceProject
    └── atomist-rugs.flask-service.SetProjectReadme
  atomist-rugs:rug-editors [public] (0.12.0)
    Editors
    ├── AddManifestYml
    ├── AddTypeScript
    ├── AddTypeScriptEditor
    ├── AddTypeScriptExecutor
    ├── AddTypeScriptGenerator
    ├── AddTypeScriptHandler
    ├── ConvertExistingProjectToRugArchive
    ├── TypeScriptEditor
    └── UpdateRugVersion
  atomist-rugs:spring-boot-editors [public] (0.5.3)
    Editors
    ├── AddDockerMavenBuild
    ├── AddDockerMavenDependencyPlugin
    ├── AddDockerMavenPlugin
    ├── AddDockerfile
    ├── AddGitMavenPlugin
    ├── AddReadmeDocumentation
    ├── AddSpringBootProjectToExistingProject
    ├── SetSpringBootParentVersion
    └── UpdateServicePort
...
```

The output informs you about the name of the Rug editor and which Rug archive
it lives in.

## Run Editors

### Using the Atomist bot

In a channel, search for the editor you are interested in running and click
on its `Edit` button. 

The bot will start a thread discussion with you asking for this editor's
parameters until you complete the exchange. Once edited, the bot will
inform you with a success or any potential failure.

### Using the CLI

You can edit projects on your local machine using the CLI. For instance,
assuming you are running a Spring Boot project, you can add the Docker plugin to
maven as follows:

```
$ cd ~/workspace/my/project
$ rug edit atomist-rugs:spring-boot-editors:AddDockerMavenBuild \
    base_docker_repository=http://example.com/docker/registry \
```

!!! tip
    Whenever you run a Rug Editor, the `rug CLI` downloads the archive on the 
    fly before applying it. There is no specific `download` command.

## Develop Editors

### A Rug Editor is a Rug project

Rug Editors are projects with an `.atomist` directory. Unlike Rug Generators,
those projects don't have to be fully working project. However, it sometimes
make their testing simpler so it is recommended to associate editors to an
executable project.

#### Convert your project to a Rug editor project

If you have an existing template project, you can convert it to a Rug
Editor using a few editors in [Rug editors][rugeditors].

First, turn your project into a Rug project:

```console
$ cd ~/workspace/your/template/project
$ rug edit atomist-rugs:rug-editors:ConvertExistingProjectToRugArchive \
    archive_name=my-new-editor \
    group_id=my-rugs \
    version=0.13.0
```

Next, make it support TypeScript, which is the language used to develop Rugs:

```console
$ rug edit atomist-rugs:rug-editors:AddTypeScript
```

Finally, add an editor stub:

```console
$ rug edit atomist-rugs:rug-editors:AddTypeScriptEditor \
    editor_name=MyNewEditor \
    description="This is my newest editor."
```

#### Create a Rug Editor project from scratch

You can start a new Rug editor project from nothing using the
[rug-project][rugproj] Rug editors. For instance:

```console
$ cd ~/workspace
$ rug generate atomist-rugs:rug-archive:NewStarterRugProject my-new-editor
```

This will create a sane base to start writing new editors.

### What is a Generator made of?

Let's review in more details the generator from the beginning of this page:

```typescript linenums="1"
import { EditProject } from "@atomist/rug/operations/ProjectEditor"
import { Editor, Tags } from "@atomist/rug/operations/Decorators"
import { Pattern } from '@atomist/rug/operations/RugOperations'
import { Project } from '@atomist/rug/model/Project'

@Editor("AddMarkdownDocumentToMkDocsProject", "adds a Markdown document to a MkDocs project")
@Tags("markdown", "documentation", "mkdocs")
class AddMarkdownDocumentToMkDocsProject implements EditProject {

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
export const editor = new AddMarkdownDocumentToMkDocsProject()
```

#### Rug Editor declaration

[TypeScript][ts] is a statically typed, through [type annotations][tsannot], 
high-level language. Thus, the first thing we do here is importing the
Atomist dependencies for Rugs (lines 1 to 4). They define the various 
interfaces, decorators and core features you need to develop Rugs.

[tsannot]: https://medium.com/@gaperton/typescript-static-or-dynamic-64bceb50b93e

!!! note
    The Rug runtime itself executes ECMAScript 5 code which it transpiled from 
    the TypeScript code. All the types notions are lost at runtime and 
    the need for them is for a nicer developer experience when writing Rugs.

An editor implements the `#!typescript EditProject` interface (line 8) which 
expects  the `#!typescript edit(project: Project)` (line 19) method to be
defined. This method takes a single argument which is the 
[Project](/reference-docs/rug/extensions/rug-extension-project/) 
object. This is provided at runtime and, since it's an editor, represents the 
project against which the editor is applied. You can consider this is the 
top-level directory structure of this target project. 

The `#!typescript @Editor` [decorator][tsdecorator] (line 6) wraps the 
editor definition with expected information like the name and description of 
that editor. This is a mandatory decorator. Note that, the name of the class
itself doesn't have to match the `name` passed to that decorator. Only that
latter one will be visible and discoverable.

On the other hand, the `#!typescript @Tags` decorator (line 7) is not compulsory 
but  nonetheless highly recommended as it adds metadata that help the discovery 
of a Rug. It takes any number of relevant strings.

Rugs usually take parameters, the `#!typescript @Parameter` decorators
(lines 10, 13 and 16) declare variables as parameters. The name of the variables 
are the name of the parameter when calling that editor. Parameters take a list 
of arguments but only `pattern` is mandatory as it tells the Rug runtime how to 
validate the user input on such paramater. Note how we use one the the Atomist 
pre-defined `#!typescript Pattern` to help you with common use-cases.

It is recommended to provide at least a description to guide users. 

Finally, we export an instance of that editor (line 24) to make it visible to 
the Rug runtime when it executed. The name of the variable usually doesn't 
matter.

[tsdecorator]: https://www.typescriptlang.org/docs/handbook/decorators.html

#### Rug Editor body

The body of your Rug editor (lines 20 and 21) is up to you. It is the meat
of your editor and depends entirely on its goals.

In that body you can fully benefit from all the features, even the most 
advanced ones, of the Rug programming model. Here, we perform the following 
operations:

* Create the Markdown content of document based on the given parameters
* Add a Markdown file at the given path with the built content

### Advanced features

The previous section described the basics of a Rug edior. However, you can
benefit from the most advanced features Atomist offers to make your editor
rich yet comprehensible.

#### Path Expression: Surgical selections
#### Microgrammars: A structure-aware pattern matching
#### Bundle external dependencies

node modules...

## Test Editors

Rug editors are project like any other and they should be tested accordingly.
Rug supports a BDD approach to validate Rugs themselves.

### TODO when the Gherkin support is completed

## Release and Distribute Editors

Editors are released and distributed as any other Rug projects, please
refer to the dedicated documentation on this topic.

## Next

[cli]: /user-guide/interfaces/cli/index.md
[rugeditors]: https://github.com/atomist-rugs/rug-editors#convertexistingprojecttorugarchive
[rugproj]: https://github.com/atomist-rugs/rug-project
[mkdocs]: http://www.mkdocs.org/
[ts]: https://www.typescriptlang.org/