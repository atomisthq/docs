Rug generators create new projects from an existing source project,
where the source project itself is a working project in its own right.
A Rug generator has two major components: the "model" project and the
modifications needed to transform the model project into a new
project.  The model project can be any working project you want to use
to create new projects.  The transformations are encoded in the Rug
generator script located under the project's `.atomist` directory.
Using these components, a generator does the followings:

1.  Copy the content of its host project, `.atomist` directory
    excluded, into the new target directory
2.  Runs the generator's `populate` function against the contents of
    target directory

Let's look more closely at what makes a project a Rug generator.

## Anatomy of a Generator

Suppose we have a model project for creating new documentation
projects based on the [MkDocs][mkdocs] static site generator.  The
contents of the model project are the following.

[mkdocs]: http://www.mkdocs.org/

```console
mkdocs-project
    ├── README.md
    ├── docs
    │   └── index.md
    ├── mkdocs.yml
    └── requirements.txt
```

To enable this project as a Rug generator, we simply add a `.atomist`
directory to the root of the project.

```console
mkdocs-project
    ├── .atomist
    │   ├── manifest.yml
    │   ├── package.json
    │   ├── editors
    │   │   └── NewMkDocsDocumentationProject.ts
    │   └── tests
    │       └── NewMkDocsDocumentationProject.rt
    ├── README.md
    ├── docs
    │   └── index.md
    ├── mkdocs.yml
    └── requirements.txt
```

!!! tip "Don't add those files by hand!"
    You can use the `ConvertExistingProjectToGenerator`
    in [rug-editors][convert] to add all the files necessary to
    transform your model project into a Rug generator.

[convert]: https://github.com/atomist-rugs/rug-editors#convertexistingprojecttogenerator

The `.atomist` directory contains a manifest file,
declares [TypeScript][ts] dependencies in the `package.json` file, and
has the Rug generator script and its associated test in appropriate
subdirectories.

[ts]: https://www.typescriptlang.org/

!!! note ""
    Because all of the Atomist files are hidden under the `.atomist`
    directory, our generator project is still a fully functioning,
    perfectly valid MkDocs project.

Let's take a close look at the Rug generator script.

## A Basic Generator Script

The generator script's `#!typescript populate` method is invoked after
the model project's files have been copied to the target project.  A
possible generator script for the MkDocs generated discussed above
could look like this:

```typescript linenums="1"
import { PopulateProject } from "@atomist/rug/operations/ProjectGenerator";
import { Generator, Tags } from "@atomist/rug/operations/Decorators";
import { Pattern } from "@atomist/rug/operations/RugOperations";
import { Project } from "@atomist/rug/model/Project";

@Generator("NewMkDocsDocumentationProject", "creates a MkDocs project")
@Tags("markdown", "documentation", "mkdocs")
class NewMkDocsDocumentationProject implements PopulateProject {

    @Parameter({
        displayName: "Extra Page Name",
        description: "name of an extra page to add to project",
        pattern: Pattern.any,
        validInput: "free text",
        minLength: 1,
        maxLength: 100
    })
    extraDoc: string = "extra.md";

    populate(project: Project) {
        project.findFile("mkdocs.yml").replace("mkdocs-project", project.name());

        project.editWith("AddMarkdownDocumentToMkDocsProject", {
            "filepath": "docs/" + this.extraDoc,
            "title": "Extra Extra",
            "content": "Read all about it"
        });
    }
}
export const newMkDocsDocumentationProject = new NewMkDocsDocumentationProject();
```

After importing the TypeScript Rug typings for the elements we will be
using (lines 1&ndash;4), we use a [decorator][] to declare the
following class a generator (line 6).  The first argument to the
`#!typescript @Generator` decorator is the name of the generator.
This is the externally visible and discoverable name of the Rug.  This
name, along with the generators group and repository, form the
fully-qualified name of the generator.  The second argument to the
`#!typescript @Generator` decorator is a brief description of the
generator.  On line 5 we use the `#!typescript @Tags` decorator to
apply some tags to our generator so people can search for it more
easily.  Using the `#!typescript @Tags` decorator is optional but
highly recommended.

[decorator]: https://www.typescriptlang.org/docs/handbook/decorators.html

We define the class that will implement our generator on line 8.  A
generator implements the `#!typescript PopulateProject` interface.
This interface requires the `#!typescript populate(Project)` method to
be defined, which we do on line 20 (more on that below).  It is
convention for the generator and the class that implements it to have
the same name.

Rugs, like typical methods, often take parameters to customize their
behavior.  Generators have a required parameter: the name of the
project that will be generated.  The project name parameter is
automatically defined for a generate.  All other parameters used by
the generator must be declared.  Parameters are declared using the
`#!typescript @Parameter` decorator (line 10).  The `#!typescript
@Parameter` decorator provides the metadata for the parameter while
the subsequent instance variable declaration provides the name and
default value, if any.  The `#!typescript @Parameter` decorator
accepts a single argument, a JavaScript object.  The JavaScript object
passed to `#!typescript @Parameter` accepts all of the property names
shown above, but only `pattern` is mandatory.  The `pattern` property
provides an anchored regular expression used to validate user input.
Here we use one the Atomist pre-defined `#!typescript Pattern`s (line
13).  Despite the fact that the other `#!typescript @Parameter`
properties are option, it is highly recommended to provide them to
help consumers of your generator.

The `#!typescript populate` method takes a single argument, a
`#!typescript Project` object.  The `#!typescript Project` provided to
this method contains the contents of the generated project, i.e., all
the files copied from the generator project.  Using this object, you
can alter the exact copy of the original project as appropriate so the
result is the new project with the desired contents.  To effect your
desired changes, you have the power of TypeScript and the Rug
programming model.  In this example, we perform the following
operations:

*   We find the file `mkdocs.yml` and replace the name of the original
    project, `"mkdocs-project"`, with the name of the new project.
*   We create an extra file in the generated project whose name is
    provided by the value of the `#!typescript extraDoc` parameter.

!!! tip ""
    When creating a project, Rug automatically creates all needed
    directories.  For example, if the value for the `#! typescript
    extraDoc` parameter was `"a/nested/extra.md"`, the directories
    `docs/a` and `docs/a/nested` would be automatically created and
    the file `extra.md` would be put in `docs/a/nested`.

In the last line of the generator script we export an instance of that
generator to make it visible to the Rug runtime when it executed.
Like the generator class name, the name of the `#!typescript const`
does not matter, but it is convention to use the generator/class name,
lower-casing the first letter.
