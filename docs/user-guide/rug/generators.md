# Rug Generators: Creating Projects

Rug generators create new projects from an existing source project. This means
that the source project itself is a working project in its own right. The phases
of a generator are as follows:

* copy the sources from the Rug generator project into a target directory
* run the Rug generator against that target directory to tune the final content
  (change some directory names, add the name of the project to the README...)

The interesting aspect here is that any project your team may be already cloning 
manually could be turned into a Rug generator in itself.
 
As a convention, Rug generators often do not contain logic of their own, 
but invoke a number of other editors in order to manipulate the files copied 
from the generator project. 

!!! note "See also"
    Please see the [reference documentation][ruggenref] for detailed information 
    about the generator programming model.

## A Basic Generator

The following generator creates a MkDocs (a documentation builder tool) project
initialized with default content and title, through an editor.

```typescript
import { PopulateProject } from "@atomist/rug/operations/ProjectGenerator"
import { Generator, Tags } from '@atomist/rug/operations/Decorators'
import { Pattern } from '@atomist/rug/operations/RugOperations'
import { Project } from '@atomist/rug/model/Core'

@Generator("NewMkDocsDocumentationProject", "creates a MkDocs project")
@Tags("markdown", "documentation", "mkdocs")
class NewMkDocsDocumentationProject implements PopulateProject {

    @Parameter({description: "name of the default document", pattern: Pattern.any})
    defaultdoc: string = "index.md"

    populate(project: Project) {
        // set the created project's name in the original source
        project.findFile("mkdocs.yml").replace("<NAME>", project.name())

        // call an editor to add a default document
        project.editWith("AddMarkdownDocument", {
            "name": "docs/" + this.defaultdoc,
            "title": "My new project",
            "content": "Hi there!"
        })
    }
}
export let generator = new NewMkDocsDocumentationProject()
```

## Run Generators

When applied, a generator follows the next steps:

1. Copy the content of the [Rug project][rugproj] into a target directory
2. Applies the generator's function against the filled target directory to 
   tune its content

Let's assume the following Rug generator project which 

```
mkdocs-generator \
    .atomist \
        generators \
            NewMkDocsDocumentationProject.ts
        tests
    docs
    mkdocs.yml
    requirements.txt
    README.md
```

That project itself is a valid [MkDocs][mkdocs] (a documentation builder tool) 
project that can be run in its own right.

To create a project from this Rug generator, you could run the following 
[rug][cli] command:

```shell
$ cd ~/workspace
$ rug generate NewMkDocsDocumentationProject my-project-doc
```

This results in the following directory structure:

```
my-project-doc \
    docs\
        index.md
    mkdocs.yml
    requirements.txt
    README.md
```

The generator copied the whole content of its source and then added an 
`index.md` file as per its `populate(project)` function. It also amended the
file `mkdocs.yml` with the generated project's name.

## Develop Generators

As said previously, generators are actual running projects with the addition of 
the `.atomist` directory. Once that directory is added, we call those projects
Rug Generator projects.

There are two paths to bootstrap a generator. Either you have an existing
template project your team usually clones and manually updates or you want to 
start from scratch.

### Convert your template project into a Rug generator project

If you have an existing template project, you can convert it by using
[Rug editors][rugeditors].

First, turn your project into a Rug project:

```shell
$ cd ~/workspace
$ rug edit atomist-rugs:rug-editors:ConvertExistingProjectToRugArchive \
    archive_name=my-new-generator \
    group_id=my-rugs \
    version=0.13.0
```

Next, make it support TypeScript, which is the language used to develop Rugs:

```shell
$ rug edit atomist-rugs:rug-editors:AddTypeScript
```

Finally, add a generator stub:

```shell
$ rug edit atomist-rugs:rug-editors:AddTypeScriptGenerator \
    generator_name=MyNewGenerator \
    description="This is my newest generator."
```

### Create a generator from scratch

You can start a new Rug generator project from nothing using the 
[rug-project][rugproj] Rug editors. For instance:

```shell
$ cd parent/directory
$ rug generate atomist-rugs:rug-archive:NewStarterRugProject my-new-generator
```

This will provide you with a sane default to start from. Add now your own
project content and start editing the default generator.

## Test Generators

Rug generators are project like any other and they should be tested accordingly.
Rug supports a BDD approach to validate Rugs themselves.

### TODO when the Gherkin support is completed 

## Release and Distribute Generators 

Generators are released and distributed as any other Rug projects, please 
refer to the dedicated documentation on this topic.

[ruggenref]: /reference/rug/generators.md
[rugproj]: /reference/rug/archives.md
[cli]: /guides/rug-cli.md
[rugeditors]: https://github.com/atomist-rugs/rug-editors
[rugproj]: https://github.com/atomist-rugs/rug-project
[mkdocs]: http://www.mkdocs.org/