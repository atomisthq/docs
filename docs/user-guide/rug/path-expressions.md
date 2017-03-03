Rug path expressions, inspired by [XPath][xpath], provide a means to
navigate entities in Rug with high precision.  From selecting events
with highly-specific criteria to matching only certain `catch` blocks,
path expressions from a powerful and flexible way to select code and
events to operate on.

[xpath]: https://www.w3.org/TR/xpath/

## Surgical selections

When running a Rug against a `Project`, you can locate a file with a
known name with some code like the following line.  string like this:

```typescript
project.findFile("mkdocs.yml").replace("<NAME>", project.name())
```

This approach provides a simple mechanism for finding a file within a
project if you know its path.  But what if you want to select a file
based on something other than its path?  What if you want to select
several files that all satisfy common criteria?  What if you want to
select just a part of a file?  To allow users to select elements with
such flexibility and specificity, Atomist provides a powerful tool
called *path expressions*.

### Query the File System

The above code selecting a file by path can be written as a path
expression.  First, we must import the `#!typescript
PathExpressionEngine`

```typescript
import { PathExpressionEngine } from "@atomist/rug/tree/PathExpression";
```

and fetch the `#!typescript PathExpressionEngine` from the
`#!typescript Project` context.

```typescript
let eng: PathExpressionEngine = project.context().pathExpressionEngine();
```

We then rewrite the `#!typescript findFile()` function call using the
`#!typescript PathExpressionEngine` method `#!typescript with()`,
supplying the appropriate path expression to select the file based on
name.

```typescript
eng.with<File>(project, "/*[@name='mkdocs.yml']", f => {
    f.replace("<NAME>", project.name())
})
```

The final argument of of the `#!typescript with()` method is a
function which receives as its argument all `#!typescript File`s that
satisfy the path expression, one at a time, and can then operate on
each match in turn.  Here we call the `#!typescript replace()` method
just as we did before.  For this simple case, using path expressions
may is a bit more involved, but it demonstrates the concepts well.

### Query the Code


While querying a project for files using path expressions allow for
greater flexibility than the other means of navigating files in a
project, a more powerful way is to query the content of that file to
manipulate directly. This file is a YAML structure, we therefore use a
specific path expression engine that knows how to navigate this kind
of structure.

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

First we create a specific YAML-aware path expression engine, this
will offer us appropriate methods to work on a YAML structure.  The
path expression we provide begins with the familiar file system query,
identifying a file named `mkdocs.yml`.  The next step in the path
expression, `YamlFile()` is something new.  The `YamlFile()` step to
tells Rug to address the file(s) it has found using the preceding
criteria as not just a generic `#!typescript File`, but a more
specific `#!typescript YamlFile`.  The `#!typescript YamlFile` type
has the ability to enter into the YAML syntax tree, allowing you to
query and select individual elements of the YAML document.  Here,
`/*[@name='site_name']` tells Rug that we want fields named
`site_name` in the parsed YAML document.  Each such field in the YAML
document is passed to the function defined in the third argument to
`#!typescript with()`.  This function replaces the original value of
that field using the method `#!typescript
field.updateText(project.name())`, a method defined specifically on
the `yaml.YamlString` type.
