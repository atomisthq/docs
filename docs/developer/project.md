The Project abstraction lets us write code to understand code, at a level above the filesystem.

See the [API Doc][apidoc-project] for details.

[apidoc-project](https://atomist.github.io/automation-client/interfaces/_lib_project_project_.project.html)

## Tips for working with Projects

{!tbd.md!}

## For Testing

To get a project for testing, use `[InMemoryProject][apidoc-imp]`. Its `of` factory method
accepts any number of objects. Each specifies the path and contents of a file in the project.

For example:

```typescript
const input = InMemoryProject.of({
            path: "README.me",
            content: `# Hello There

and some stuff
`,
}, { 
    path: "empty.md",
    content: "",
});
```

This example uses TypeScript's multiline strings (delimited with backtick).

[apidoc-imp]: https://atomist.github.io/automation-client/classes/_lib_project_mem_inmemoryproject_.inmemoryproject.html (API Doc for InMemoryProject)