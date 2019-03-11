Code inspections and transforms work with the code inside repositories.
You can use the [Project](project.md) API for simple actions like adding or removing
a file. When you want to work on multiple files, Atomist project utils can help.

[API Doc](https://atomist.github.io/automation-client/modules/_lib_project_util_projectutils_.html)

## gathering information from files

In a [code inspection](inspect.md), you might want to look at every file and
put some information together. Try [`gatherFromFiles`][apidoc-gatherfromfiles].

For example, this gathers the path and number of lines in every YAML file:

```typescript
import { projectUtils } from "@atomist/automation-client";

const fileAndLineCount =
    await projectUtils.gatherFromFiles(p, ["**/*.yml", "**/*.yaml"], async file => (
        {
            path: file.path,
            lines: (await file.getContent()).split("\n").length,
        }));
```

[apidoc-gatherfromfiles]: https://atomist.github.io/automation-client/modules/_lib_project_util_projectutils_.html#gatherfromfiles (API Doc for gatherFromFiles)

## running an action on files

In a [code transform](transform.md), you might want to change the contents of many files.
Use [`doWithFiles`][apidoc-dowithfiles] for this.

For example, if you want to mix up the word Atomist everywhere it appears in every Java file:

```typescript
await projectUtils.doWithFiles(project, "**/*.java",
        f => f.replaceAll("atomist", _.shuffle("atomist".split("")).join("")));
```

[apidoc-dowithfiles]: https://atomist.github.io/automation-client/modules/_lib_project_util_projectutils_.html#dowithfiles (API Doc for doWithFiles)

## See also

* the [Project API](project.md)
* get at the relevant parts of files with microgrammars and [parseUtils](parseutils.md)
* dig into the abstract syntax tree (AST) of your programming language with [astUtils](astutils.md)

