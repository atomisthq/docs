Rug editors ***work at the level of a specific project***, for example
this is typically a particular ***repository on GitHub***.

Rug editors can be found in the `.atomist/editors` directory of
a [Rug project][archive]. They also have access to template content in
the same project, bundled under `/.atomist/templates`.

[archive]: archives.md

Rug editor files are [TypeScript][ts] files with a `.ts` extension.  A `.ts`
file can contain one or more editors but it's good practice to keep them
separated for modularity.

!!! tip "It's all TypeScript afterall"
    Rugs are TypeScript files and you can therefore benefit from the richness
    of that language as much as you need as long as you are respecting the
    Rug programming model.


Any number of Rug editors can be bundled together in
a [Rug project][archive]. A good example of this is the
open source [Spring Boot Editors][boot-editors] Rug project.

[ts]: https://www.typescriptlang.org/
[boot-editors]: https://github.com/atomist-rugs/spring-boot-editors

## A Basic Editor

Let's start by building up a simple program: a project editor that appends
to a specific file in a project:

```typescript
import { EditProject } from "@atomist/rug/operations/ProjectEditor"
import { Editor, Tags } from "@atomist/rug/operations/Decorators"
import { Project, File } from '@atomist/rug/model/Core'

@Editor("AppendToSpecificFile", "Append content to a text file")
@Tags("simple")
class AppendToSpecificFile implements EditProject {

    edit(project: Project) {
        let file: File = project.findFile("myfile.txt");
        if (file != null ) {
            file.append("\nAnd this is a new line")
        }
    }
}

export let simple = new AppendToSpecificFile()
```

This editor shows the general programming model for an editor. Initial import
statements for the TypeScript compiler (and a nicer experience in your IDE) of
the Rug programming model entities.

The `@Editor` [TypeScript decorator][tsdecorator] prepares the
`AppendToSpecificFile` for the Rug runtime as an editor.

[tsdecorator]: https://www.typescriptlang.org/docs/handbook/decorators.html

This decorator takes two values, the editor's name and its description which
should follow the [Rug convention in usage][rugconv].

[rugconv]: conventions.md

An editor is a class that implements the `EditProject`, meaning it must
implement the `edit(project: Project)` method. The project interface is
defined in the `@atomist/rug/operations/ProjectEditor` TypeScript module.

Notice the `export` line at the end of the editor definition. The name of the
variable doesn't matter and should only follow your conventions.

## Make Your Editor Discoverable

It is good manner to tag an editor so that it can be searched and discovered
more easily.

This is achieved through the `@Tags` [TypeScript decorator][tsdecorator] which
takes a variable amount of strings, each one being a tag for your editor.

## Parameterize Your Editor

Let's make the previous editor a little more sophisticated. Perhaps we'd like to
decide what content we should append. This would be a natural parameter:

```typescript
import { EditProject } from "@atomist/rug/operations/ProjectEditor"
import { Editor, Tags, Parameter } from "@atomist/rug/operations/Decorators"
import { Project, File } from '@atomist/rug/model/Core'

@Editor("AppendToFile", "Appends value of to_append parameter to the end of files called myfile.txt")
@Tags("simple")
class AppendToFile implements EditProject {

    @Parameter({pattern: "^.*$", description: "Text to append to the file"})
    to_append: string = ""

    edit(project: Project) {
        let file: File = project.findFile("myfile.txt");
        if (file != null ) {
            file.append(this.to_append)
        }
    }
}

export let simple = new AppendToFile()
```

This is achieved through the `@Parameter` [TypeScript decorator][tsdecorator]
on class attributes. The parameter's name and default values are infered from
the attribute's name and value's.

The decorator allows for the following fields, notice that `pattern` is
the only mandatory field:

```typescript
interface Parameter {
  pattern: string
  required?: boolean
  description?: string
  displayName?: string
  validInput?: string
  displayable?: boolean
  maxLength?: number
  minLength?: number
  tags?: string[]
}
```

!!! note
    The parameter definition specifies a regular expression that will be used to
    validate it before it's passed to the editor. So the editor's implementation
    can assume that it's valid upon execution.

## Composing Editors

Editors can be composed. You simply call them from another editor by their name
as follows:

```typescript
    edit(project: Project) {
        project.editWith("OtherEditor", {somekey: "some value"})
    }
```

Composed editors don't need to live in the same Rug file as their callers. The
given parameters must match the other editor's parameters signature.

## Next

*   [Rug Generators](generators.md)
*   [Rug Templates](templates.md)
*   [Core Rug Language Extensions](/reference/rug/extensions/index.md)
