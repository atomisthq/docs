Rug generators are used to create new projects from an existing model
project.  Generators are created using the `@Generator`
[TypeScript decorator][tsdecorator].

[tsdecorator]: https://www.typescriptlang.org/docs/handbook/decorators.html

When a generator creates a new project, it starts by copying all the
files in the project in which it resides, excluding the `.atomist`
directory, to the new project being created.

As a convention, Rug generators do not contain logic of their own, but invoke
a number of other editors in order to manipulate the files copied from
the generator project.

## A Basic Generator

The following generator creates a project with a Markdown text file
initialized with default content and title.

```typescript
import { PopulateProject } from "@atomist/rug/operations/ProjectGenerator"
import { Generator, Tags } from '@atomist/rug/operations/Decorators'
import { Project } from '@atomist/rug/model/Core'

@Generator("NewMarkdownProject", "creates a markdown project")
@Tags("markdown")
class NewMarkdownProject implements PopulateProject {

    populate(emptyProject: Project, params?: {}) {
        project.editWith("AddMarkdownDocument", {
            "title": "My new project",
            "content": "Hi there!"
        })
    }
}
export let generator = new NewMarkdownProject()
```

This example shows the general programming model for a generator.
Initial import statements for the TypeScript compiler
(and a nicer experience in your IDE) of the Rug programming model entities.

The `@generator` [TypeScript decorator][tsdecorator] prepares the
`NewMarkdownProject` for the Rug runtime as an generator.

[tsdecorator]: https://www.typescriptlang.org/docs/handbook/decorators.html

This decorator takes two values, the generator's name and its description which
should follow the [Rug convention in usage][rugconv].

[rugconv]: conventions.md

A generator is a class that implements the `PopulateProject`, meaning it must
implement the `populate(emptyProject: Project, params?: {})` method. The project
interface is defined in the `@atomist/rug/operations/ProjectGenerator`
TypeScript module.

Notice the `export` line at the end of the generator definition. The name of the
variable doesn't matter and should only follow your conventions.

## Make Your Generator Discoverable

It is good manner to tag a generator so that it can be searched and discovered
more easily.

This is achieved through the `@Tags` [TypeScript decorator][tsdecorator] which
takes a variable amount of strings, each one being a tag for your generator.

## Parameterize Your Generator

Let's make the previous generator a little more sophisticated. Perhaps we'd like
to decide what title and content we should initialize the project with. This
is done as follows:

```typescript
import { PopulateProject } from "@atomist/rug/operations/ProjectGenerator"
import { Generator, Tags } from '@atomist/rug/operations/Decorators'
import { Project } from '@atomist/rug/model/Core'

@Generator("NewMarkdownProject", "creates a markdown project")
@Tags("markdown")
class NewMarkdownProject implements PopulateProject {

    @Parameter({description: "Document title", displayName: "title", pattern: "@any"})
    title: string = "Some initial content"

    @Parameter({description: "Initial markdown content", displayName: "content", pattern: "@any"})
    content: string = "Some initial content"

    populate(emptyProject: Project, params?: {}) {
        project.editWith("AddMarkdownDocument", {
            "title": "My new project",
            "content": "Hi there!"
        })
    }
}
export let generator = new NewMarkdownProject()
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
    validate it before it's passed to the generator.
    So the generator's implementation can assume that it's valid upon execution.
