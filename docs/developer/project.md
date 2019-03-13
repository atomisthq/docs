The Project abstraction lets us write code to understand and modify code, at a level above the filesystem. A Project represents the contents of a repository at a particular point in time.
For most SDM operations, it is [backed by a clone][apidoc-gcgp] of the repository on the filesystem.
For testing, you can use a project backed by a [local directory][apidoc-nflp] or stored [in memory][apidoc-imp].

[apidoc-nflp]: https://atomist.github.io/automation-client/classes/_lib_project_local_nodefslocalproject_.nodefslocalproject.html (API Doc for NodeFsLocalProject)
[apidoc-gcgp]: https://atomist.github.io/automation-client/classes/_lib_project_git_gitcommandgitproject_.gitcommandgitproject.html (API Doc for GitCommandGitProject)
[apidoc-project]: https://atomist.github.io/automation-client/interfaces/_lib_project_project_.project.html (API doc for Project)
[apidoc-pu]: https://atomist.github.io/automation-client/modules/_lib_project_util_projectutils_.html (API Doc for projectUtils)

See the [API Doc][apidoc-project] for the full interface, and the methods in [projectUtils][apidoc-pu]
for related helpers.

## Obtaining a Project

The SDM has many APIs where you define a function that receives a Project as an argument.
For instance, [code transforms](transform.md) and [code inspections](inspect.md) receive
already-cloned projects. A [push test](push-test.md) gets a Project to look at, which is cloned
lazily if the push test uses it.

If you're working in another goal, then you have access to a `GoalInvocation`, and you can
get request a clone and then do something with it. See an example under [running a command](spawn.md#running-a-command-in-a-project).

### For Testing

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

This example uses TypeScript's multiline strings (delimited with backtick) to specify the file content.

## Checking the content

There are many ways to look around the Project.

#### Does a particular file exist?

Call [hasFile](https://atomist.github.io/automation-client/interfaces/_lib_project_project_.project.html#hasfile) on the project.

```typescript
const hasMyFile = await project.hasFile("path/to/file");
```

There is also [hasDirectory](https://atomist.github.io/automation-client/interfaces/_lib_project_project_.project.html#hasdirectory) to check for directory existence.

#### What is in a file?

Call `getFile` and then `getContent`.

```typescript
const myFile = await project.getFile("path/to/file");
if (myFile) {
    const content: string = await myFile.getContent();
}
```

<!-- Do we want to document streamFiles? That's harder. -->

#### Does a file exist, for various conditions?

Use [projectUtils.fileExists](https://atomist.github.io/automation-client/modules/_lib_project_util_projectutils_.html#fileexists)
to look for files with a certain extension or property.
The second argument is a [glob](#file-globs), and the third is a function from [File](https://atomist.github.io/automation-client/interfaces/_lib_project_file_.file.html) to boolean.

```typescript
const result = await projectUtils.fileExists(project,
            "**/*",
            f => f.isExecutable()
        );
```

#### Extract information from files

Use [projectUtils.gatherFromFiles](https://atomist.github.io/automation-client/modules/_lib_project_util_projectutils_.html#gatherfromfiles)
to extract information from all the files with matching names.
Pass the project, a [glob](#file-globs), and a function from [File](https://atomist.github.io/automation-client/interfaces/_lib_project_file_.file.html) to whatever it is
you want to get back.

This example returns an array with the first line of every Java file:

```typescript
const firstLines = await gatherFromFiles<string>(project, "**/*.java", async f => {
            const lines = await f.getContent().then(c => c.split("\n"));
            return lines.length > 0 ? lines[0] : "";
        })
```

### File Globs

Serveral methods in [projectUtils][apidoc-pu] accept a `GlobOptions` as a parameter.
The GlobOptions is a string or an array of strings.

In a glob:

    * `*` stands for any string or part of a string in a filename
    * `**` stands for any number of directories, so matches recursively in a path
    * Pass any number of pattern strings to include, followed by any number of negative patterns to exclude
    * Start a pattern with `!` to make it a negation

For example, all TypeScript files that aren't tests:

`["**/*.ts", "!**/*.test.ts"]`

### Parse Code

Code is more than text. Express what you're looking for in terms of your programming language
using Atomist [Path Expressions](pxe.md).

## Modifying the content

Check the [Project][apidoc-project] API for methods like:

* addFile
* deleteFile
* deleteDirectory (and all its content)
* makeExecutable (give a file execute permissions)
* moveFile

### Update Code

Code is more than text. Change code in place based on contextual understanding. Use [Path Expressions](pxe.md).

## Saving modifications

If you're writing a [code transform](transform.md), your changes will be saved for you,
by a commit in an [autofix](autofix.md) or in a pull request in a [transform command](transform.md#creating-a-command-for-a-transform).

If you're writing a custom goal of some kind, and working with a clone that you requested,
then check the [GitProject][apidoc-gitproject] interface for methods like:

* commit
* createBranch
* push
* raisePullRequest
* checkout
* hasBranch

[apidoc-gitproject]: https://atomist.github.io/automation-client/interfaces/_lib_project_git_gitproject_.gitproject.html (API Doc for GitProject)

## Accessing the filesystem directly

If the Project is on the filesystem (usually a `GitProject`), then `project.baseDir` will give
you its path on the filesystem.

[apidoc-imp]: https://atomist.github.io/automation-client/classes/_lib_project_mem_inmemoryproject_.inmemoryproject.html (API Doc for InMemoryProject)
