Atomist is about automating more of our own work, and that includes
the work of writing code.  Not all code, of course, but the repetitive
parts of coding, or the code that you want to change across many
projects.  If the change would be so tedious to do by hand that you
wouldn't even bother, consider automating it.

Atomist provides tools that make automating writing code feasible.
Powerful file and code parsing and editing primitives can easily be
wrapped in [command automations][commands], allowing you and your team
to apply your transforms to one or all of your projects to update code
and create pull requests.

[commands]: commands.md (Atomist Command Automations)

## Code Transform

## Running a transform as a command

### Parameters

Transforms all need to know which repository or repositories to work on. You can get additional parameters in the invocation as well, by creating your own Parameters class that extends BaseTransformOrReviewerParameters. The same ProjectTransform function works for both.

### Pull requests or commits

The `editMode` passed in the details to `transformHandler` determines how to save the changes. Pass an instance of [PullRequest](https://atomist.github.io/automation-client/classes/_lib_operations_edit_editmodes_.pullrequest.html), or an implementation of [BranchCommit](https://atomist.github.io/automation-client/interfaces/_lib_operations_edit_editmodes_.branchcommit.html). You can also supply a function from parameters to one of these EditModes, in case you want the branch name or commit message to vary by invocation.

## Testing a project transform

ProjectTransform is a function, so it's testable. Unit testing at this level is quick and powerful.

### InMemoryProject

Construct a project as input to your ProjectTransform. The simplest way is to list all the files and their content:

```typescript
import { InMemoryProject } from "@atomist/automation-client/project/mem/InMemoryProject";

const startingProject = InMemoryProject.of({ path: "src/file1.ts", "All the stuff in file1"},
                                           { path: "test/file2.ts", "All the stuff in file2"});
```

If your transform uses the `id` property on the Project, populate that too, using `InMemoryProject.from`:

```typescript
import { InMemoryProject } from "@atomist/automation-client/project/mem/InMemoryProject";

const startingProject = InMemoryProject.from({ owner: "atomist", repo: "end-user-documentation", sha: "my-branch" },
                                             { path: "src/file1.ts", "All the stuff in file1"},
                                             { path: "test/file2.ts", "All the stuff in file2"});
```

Here is an example of a mocha test for the addMyFile project transform:

```typescript
it("adds the file", async () => {
    const p = InMemoryProject.of({ path: "existingFile.txt", content: "Hi\n" });
    await addMyFile(p);
    assert(p.findFileSync("myFile.txt").getContentSync().includes("I was here");
});
```

## Working with projects

The [Project](https://atomist.github.io/automation-client/interfaces/_lib_project_project_.project.html) abstraction aims to provide both synchronous and asynchronous ways of changing projects. The synchronous methods simplify testing,
while the asynchronous ones will give better performance in your automations.

If you want to modify the filesystem directly in your ProjectTransform function, do what you like; find the underlying directory in `project.baseDir`.

### Accessing files

If you know the path to the file you want to change, get to it with `findFile`, and dig around in it with `getContents`:

```typescript
import { HandlerContext } from "@atomist/automation-client";
import { SimpleProjectTransform } from "@atomist/automation-client/operations/edit/projectTransform";
import { Project } from "@atomist/automation-client/project/Project";

export const changeMyFile: SimpleProjectTransform = (p: Project, ctx: HandlerContext) =>
        p.findFile("myFile.txt")
            .then(f => f.getContent()
                .then(content => f.setContent(
                    arbitraryManipulation(content))))
            .then(() => p);
}

function arbitraryManipulation(oldContent: string): string {
    return oldContent + " because I said so.\n";
}
```

There are many more methods on Project to help manipulate one or more files.

## Changing code

How do we change code in code? There are the tools you're used to, and then the tools Atomist provides.

### Search and replace

Often, a simple search and replace is enough. Perhaps you want to change a version of a dependency. If you know the file you want to change, and the change you want to make to it: find the file, and then use `replace`. (It's the same as JavaScript's `replace`.)

The following ProjectTransform finds package.json, finds a declaration about library-of-interest, and replaces the version with `3.4.6`.

```typescript
import Project from ...
import File from ...

function upgradeLibrary(project: Project): Promise<Project> {
    return project.findFile("package.json").then((file: File) =>
       file.replace(/"library-of-interest": ".*?"/,
                    `"library-of-interest": "3.4.6"`);
    )
}
```

!!! tip ""
Please import File from "@atomist/automation-client/project/File", because TypeScript has a built-in File type that's different.

### Navigating language ASTs

You can navigate the code in your Project based on your programming language's abstract syntax tree (AST). We include parsers for Java, Kotlin, and TypeScript; any language with an ANTLR grammar is supported.

For instance, [this transform](https://github.com/atomist/spring-automation/blob/8894dcb49bb1ed180beb98a57be5bf4aab908d4c/src/commands/transform/spring/removeUnnecessaryAutowiredAnnotations.ts#L20) discovers and manipulates constructors in Java code:

```typescript
const Constructors = `//classBodyDeclaration[//constructorDeclaration]`;

export const removeAutowiredOnSoleConstructor: SimpleProjectTransform = p => {
    return findMatches(p, JavaFileParser, JavaSourceFiles, Constructors)
        .then(constructors => {
            if (constructors.length === 1 && constructors[0].$value.includes("@Autowired")) {
                constructors[0].$value = constructors[0].$value.replace(/@Autowired[\s]+/, "");
            }
            return p.flush();
        });
};
```

## More to come

This page describes only some of the ProjectTransform functionality. There's additional information about project transforms in [@atomist/automation-client](https://github.com/atomist/automation-client/blob/master/docs/ProjectTransforms.md) and its [TypeDoc](https://atomist.github.io/automation-client/index.html). Please come with further questions to [Slack](https://join.atomist.com); we'll be happy to answer them.
