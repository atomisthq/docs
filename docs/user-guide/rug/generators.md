# Rug Generators: Creating Projects

## Overview

### What are Rug Generators?

Rug generators create new projects from an existing source project, where the 
source project itself is a working project in its own right. 

#### A Basic Generator

The following generator creates a MkDocs (a documentation builder tool) project
initialized with default content and title, through an editor.

```typescript
import { PopulateProject } from "@atomist/rug/operations/ProjectGenerator"
import { Generator, Tags } from '@atomist/rug/operations/Decorators'
import { Pattern } from '@atomist/rug/operations/RugOperations'
import { Project } from '@atomist/rug/model/Project'

@Generator("NewMkDocsDocumentationProject", "creates a MkDocs project")
@Tags("markdown", "documentation", "mkdocs")
class NewMkDocsDocumentationProject implements PopulateProject {

    @Parameter({description: "name of the default page", pattern: Pattern.any})
    defaultdoc: string = "index.md"

    populate(project: Project) {
        // set the created project's name in the original source
        project.findFile("mkdocs.yml").replace("<NAME>", project.name())

        // create the docs directory
        project.addDirectory("docs")

        // call an editor to add a default document
        project.editWith("AddMarkdownDocumentToMkDocsProject", {
            "name": "docs/" + this.defaultdoc,
            "title": "My new project",
            "content": "Hi there!"
        })
    }
}
export let generator = new NewMkDocsDocumentationProject()
```

Please see below for a [detailed description](#what-is-a-generator-made-of)
of this generator's structure.

### What do Rug Generators do?

A generator does the followings:

1. Copy the content of the [Rug project][rugproj] into a target directory
2. Applies the generator's function against the filled target directory to
   tune its content

Let's assume the following Rug generator project:

```console
mkdocs-generator
    ├── .atomist
    │   ├── manifest.yml
    │   ├── package.json
    │   ├── editors
    │   │   └── NewMkDocsDocumentationProject.ts
    │   └── tests
    │       └── NewMkDocsDocumentationProject.rt
    ├── mkdocs.yml
    ├── README.md
    └── requirements.txt
```

That project itself is a valid [MkDocs][mkdocs] (a documentation builder tool)
project that can be run in its own right.

To create a project from this Rug generator, run the following [rug][cli] 
command:

```console
$ cd ~/workspace
$ rug generate NewMkDocsDocumentationProject my-project-docs
```

This will result in the following directory structure:

```console
my-project-docs
    ├── docs
    │   └── index.md
    ├── mkdocs.yml
    ├── README.md
    └── requirements.txt
```

The generator copied the whole content of its source and then added an
`docs/index.md` file as per its `populate(project)` function. It also amended
the file `mkdocs.yml` with the generated project's name.

## Search for Generators

### Using the Atomist bot

To see the list of available generators to your team, ask the bot for them:

```
@atomist generators
```

This will return a short list of generators, you can refine your search by
specifying filter words to the command. For instance, to search for generators
for Java and Spring:

```
@atomist java spring
```

### Using the CLI

To find available generators with the CLI, run the following command:

```console
$ rug search --operations --type generator
Resolving version range for com.atomist:rug:(0.12.9,0.13.1) completed
Resolving dependencies for com.atomist:rug:0.13.0-SNAPSHOT completed
  Searching https://api.atomist.com/catalog/operation/search                                                                                                                                                     
Searching catalogs completed

→ Remote Archives (18 archives found)
  atomist-rugs:flask-service [public] (0.1.2)
    Generators
    └── NewFlaskMicroserviceProject  
  atomist-rugs:rug-project [public] (0.2.0)
    Generators
    ├── NewRugProject
    └── NewStarterRugProject
  atomist-rugs:spring-boot-rest-service [public] (0.7.1)
    Generators
    └── NewSpringBootRestService
...
```

The output informs you about the name of the Rug generator and which Rug archive
it lives in.

## Run Generators

### Using the Atomist bot

In a channel, ask the bot to create a new project based on an existing 
generator. For instance, assuming you want to run a generator 
named `NewStarterRugProject`, command the bot as follows:

```console
@atomist generate NewStarterRugProject
```

The bot will start a thread discussion with you asking for this generator's
parameters until you complete the exchange. Once generated, the bot will
inform you of the URL where to find your new project.

### Using the CLI

You can create new projects on your local machine using the CLI, for instance:

```
$ cd ~/workspace
$ rug generate atomist-rugs:rug-project:NewStarterRugProject my-new-generator
```

The first argument is always the project name. 

!!! tip
    Whenever you run a Rug Generator, the `rug CLI` downloads the archive on the 
    fly before applying it. There is no specific `download` command.


## Develop Generators

### A Rug Generator is a Rug project

As said previously, generators are actual running projects with the addition of
the `.atomist` directory. Once that directory is added, we call those projects
Rug Generator projects.

There are two paths to bootstrap a generator. Either you have an existing
template project your team usually clones and manually updates or you want to
start from scratch.

#### Convert your template project into a Rug generator project

If you have an existing template project, you can convert it to a Rug
generator using a few editors in [Rug editors][rugeditors].

First, turn your project into a Rug project:

```console
$ cd ~/workspace/your/template/project
$ rug edit atomist-rugs:rug-editors:ConvertExistingProjectToRugArchive \
    archive_name=my-new-generator \
    group_id=my-rugs \
    version=0.13.0
```

Next, make it support TypeScript, which is the language used to develop Rugs:

```console
$ rug edit atomist-rugs:rug-editors:AddTypeScript
```

Finally, add a generator stub:

```console
$ rug edit atomist-rugs:rug-editors:AddTypeScriptGenerator \
    generator_name=MyNewGenerator \
    description="This is my newest generator."
```

#### Create a generator from scratch

You can start a new Rug generator project from nothing using the
[rug-project][rugproj] Rug editors. For instance:

```console
$ cd ~/workspace
$ rug generate atomist-rugs:rug-archive:NewStarterRugProject my-new-generator
```

This will provide you with a sane default to start from. Add now your own
project content and start editing the default generator.

### What is a Generator made of?

Let's review in more details the generator from the beginning of this page:

```typescript linenums="1"
import { PopulateProject } from "@atomist/rug/operations/ProjectGenerator"
import { Generator, Tags } from '@atomist/rug/operations/Decorators'
import { Pattern } from '@atomist/rug/operations/RugOperations'
import { Project } from '@atomist/rug/model/Project'

@Generator("NewMkDocsDocumentationProject", "creates a MkDocs project")
@Tags("markdown", "documentation", "mkdocs")
class NewMkDocsDocumentationProject implements PopulateProject {

    @Parameter({description: "name of the default page", pattern: Pattern.any})
    defaultdoc: string = "index.md"

    populate(project: Project) {
        // set the created project's name in the original source
        project.findFile("mkdocs.yml").replace("<NAME>", project.name())

        // create the docs directory
        project.addDirectory("docs")

        // call an editor to add a default document
        project.editWith("AddMarkdownDocumentToMkDocsProject", {
            "name": "docs/" + this.defaultdoc,
            "title": "My new project",
            "content": "Hi there!"
        })
    }
}
export let generator = new NewMkDocsDocumentationProject()
```

#### Rug Generator declaration

[TypeScript][ts] is a statically typed, through [type annotations][tsannot], 
high-level language. Thus, the first thing we do here is importing the
Atomist dependencies for Rugs (lines 1 to 4). They define the various 
interfaces, decorators and core features you need to develop Rugs.

[tsannot]: https://medium.com/@gaperton/typescript-static-or-dynamic-64bceb50b93e

!!! note
    The Rug runtime itself executes ECMAScript 5 code which it transpiled from 
    the TypeScript code. All the types notions are lost at runtime and 
    the need for them is for a nicer developer experience when writing Rugs.

A generator implements the `#!typescript PopulateProject` (line 8) which expects 
the `#!typescript populate(project: Project)` (line 13) method to be defined. 
This method takes a single argument which is the 
[Project](/reference-docs/rug/extensions/rug-extension-project/) 
object. This is provided at runtime and, since it's a generator, represents an 
empty project. You can consider this is the top-level directory structure of 
your project. 

The `#!typescript @Generator` [decorator][tsdecorator] (line 6) wraps the 
generator definition with expected information like the name and description of 
that generator. This is a mandatory decorator. Note that, the name of the class
itself doesn't have to match the `name` passed to that decorator. Only that
latter one will be visible and discoverable.

On the other hand, the `#!typescript @Tags` decorator (line 7) is not compulsory 
but  nonetheless highly recommended as it adds metadata that help the discovery 
of a Rug. It takes any number of relevant strings.

Rugs usually take parameters, the `#!typescript @Parameter` decorator (line 10) 
declares a property as such. The name of the field is the name of the parameter
when calling that generator. Parameters take a list of arguments but only
`pattern` is mandatory as it tells the Rug runtime how to validate the user
input on such paramater. Note how we use one the the Atomist pre-defined 
`#!typescript Pattern` to help you with common use-cases.

It is recommended to provide at least a description to guide users. 

Finally, we export an instance of that generator (line 28) to make it visible to 
the Rug runtime when it executed. The name of the variable usually doesn't 
matter.

[tsdecorator]: https://www.typescriptlang.org/docs/handbook/decorators.html

#### Rug Generator body

The body of your Rug generator (lines 14 to 26) is up to you. It is the meat
of your generator and depends entirely on its goals.

In that body you can fully benefit from all the features, even the most 
advanced ones, of the Rug programming model. In this example, we perform the
following operations:

* We look for the file `mkdocs.yml` and we set the project's name where it
  belongs. In this case, we perform a rather simple search and replace of
  a string
* We create the initial `docs` directory that will contain all the pages
* Finally, we delegate the actual first page creation to an editor that 
  performs that operation. It is indeed a good convention to compose your
  generator from editors for better modularity 

It's interesting to decompose the first operation:

```typescript
project.findFile("mkdocs.yml").replace("<NAME>", project.name())
```

This could be also written as follows:


```typescript
let settings: File = project.findFile("mkdocs.yml")
settings.replace("<NAME>", project.name())
```

As you can see, the `#!typescript findFile("mkdocs.yml")` method returns a 
[File](/reference-docs/rug/extensions/rug-extension-file/) object. To be able
to explicitely use the `#!typescript File` type, we must import it as follows:

```typescript
import { File } from '@atomist/rug/model/File'
```

This goes on with all supported 
[language extensions](/reference-docs/rug/extensions/).

### Advanced features

The previous section described the basics of a Rug generator. However, you can
benefit from the most advanced features Atomist offers to make your generator
rich yet comprehensible.

#### Path Expression: Surgical selections

In the example above, the generator performed a rather naive search and replace
string like this:

```typescript
project.findFile("mkdocs.yml").replace("<NAME>", project.name())
```

Atomist provides powerful mechanism to query not only your filesystem for 
directories or files but also dive into each file to navigate the code its 
contains. This feature is called [path expression][pxe]. 

##### Query the filesystem

The above snippet could be written as follows. First the necessary import 
statement:

```typescript
import { PathExpressionEngine } from "@atomist/rug/tree/PathExpression";
```

Now the actual code that replaces what we had before:

```typescript
let eng: PathExpressionEngine = project.context().pathExpressionEngine()

eng.with<File>(project, "/*[@name='mkdocs.yml']", f => {
    f.replace("<NAME>", project.name())
})
```

In this simple case, this may look more involved but it demonstrates the 
concepts well. You instanciate a `#!typescript PathExpressionEngine` and
you use it to evaluate the given path expression to locate all files named
`mkdocs.yml`. For each file, you perform the body of that function.

##### Query the code

A much more powerful way is to query the content of that file to manipulate 
directly. This file is a YAML structure, we therefore use a specific path
expression engine that knows how to navigate this kind of structure.

First the expected import statements:

```typescript
import * as yaml from "@atomist/rug/ast/yaml/Types"
import { YamlPathExpressionEngine } from "@atomist/rug/ast/yaml/YamlPathExpressionEngine"
```

Let's amend our previous example:

```typescript
let eng: PathExpressionEngine = new YamlPathExpressionEngine(project.context().pathExpressionEngine())

eng.with<yaml.YamlString>(project, "/*[@name='mkdocs.yml']/YamlFile()/*[@name='site_name']", field => {
    field.updateText(project.name())
})
```

First we create a specific YAML-aware path expression engine, this will offer
us appropriate methods to work on a YAML structure whereas a basic path
expression engine would not provide us with such a rich set of helpers.

Then we query the project for the usual YAML document and we then use 
`YamlFile()` to tell the Rug runtime it should now consider the remaining 
of the path expression from a standpoint of a YAML-aware expression. Indeed,
`/*[@name='site_name']` tells the runtime that we search of fields named 
`site_name` in the parsed YAML structure. Finally, we replace the value of that
field with the call to `#!typescript field.updateText(project.name())`
which only exists in the `yaml.YamlString` type.

#### Microgrammars: A structure-aware pattern matching

## Test Generators

Rug generators are project like any other and they should be tested accordingly.
Rug supports a BDD approach to validate Rugs themselves.

### TODO when the Gherkin support is completed

## Release and Distribute Generators

Generators are released and distributed as any other Rug projects, please
refer to the dedicated documentation on this topic.

## Next

[cli]: /user-guide/interfaces/cli/index.md
[rugeditors]: https://github.com/atomist-rugs/rug-editors#convertexistingprojecttorugarchive
[rugproj]: https://github.com/atomist-rugs/rug-project
[mkdocs]: http://www.mkdocs.org/
[ts]: https://www.typescriptlang.org/