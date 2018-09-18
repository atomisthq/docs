Evaluate all your code according to your own standards. Code inspections let you locate problems and
measure how closely standards are followed. Run them on one repository or all repositories. Run them after every commit, so that developers are notified of the status of the code whenever they work in a repository.

## Installing an inspection from a Pack

Some code inspections are available as part of published SDM functionality.

## Adding an inspection to an SDM

An inspection is a function a project (and the inspection's parameters) to an inspection result. You decide what is in an inspection result, and you react to these results in a separate function.

To start with, create your inspection and a command to run it on demand in any project or projects. Then you can add it as an automatic inspection to every commit, if you like.

### Declare a result type

For instance, your inspection might look for files with too many lines. 
Your result might contain the paths of files that have too many lines in them.
Here, the type is defined as a string array.

```typescript
export type FilesWithTooManyLines = string[];
```

### Create an inspection function

The CodeInspection is a function from a project (and optionally, inspection parameters) 
to an inspection result. For instance:

```typescript
const InspectFileLengths: CodeInspection<FilesWithTooManyLines, NoParameters> =
    async (p: Project) => {
        // this sample code returns the paths to files with over 1000 lines
        const longFiles = await gatherFromFiles(p, "**/*.ts", async f => {
            const c = await f.getContent();
            const lineCount = c.split("\n").length;
            if (lineCount > 1000)) {
                return f.path;
            } else {
                return undefined;
            }
        });
        return longFiles.filter(path => path !== undefined);
    }
```

### Create a function to react to this result

Usually when you run a code inspection, you want to report back to yourself or your team what the results were. Since your inspection returns a custom type, you have to define what to do with it.

We need a function that reacts to the inspection results. It takes an input an array of CodeInspectionResult which includes information about the repository that was inspected and the results of the inspection.

For instance, the following reaction function sends a message containing the identifying information of the project and a summary of the results:

```typescript
async function onInspectionResults(
    results: CodeInspectionResult<FilesWithTooManyLines>[],
    inv: CommandListenerInvocation) {
    const message = results.map(r =>
        `${r.repoId.owner}/${r.repoId.repo}@${r.repoId.sha} ${summarizeResult(r.result)}`).join("\n");
    return inv.addressChannels(message);
}

function summarizeResult(r: FilesWithTooManyLines): string {
    return `There are ${r.length} files with too many lines`;
}
```

### Create a command to run the inspection and react to it

Combine the inspection and the reaction into an object, a command registration. The `intent` is what you'll type to get Atomist to run the inspection.

```typescript
export const InspectFileLengthsCommand: CodeInspectionRegistration<NoAxiosForYouInspectionResult, NoParameters> = {
    name: "Files should be under 1000 lines",
    intent: "inspect file lengths",
    inspection: InspectFileLengths,
    onInspectionResults,
}
```

### Register the command on your SDM

Finally, teach the SDM about your command. In `machine.ts`, or 
wherever you configure your SDM, add 

```typescript
sdm.addCodeInspectionCommand(InspectFileLengths);
```

### Run the inspection

Recompile and restart your SDM. Depending on the context where you run `@atomist inspect file lengths`, you'll receive a response for one or many projects.

For local mode: run it within a repository directory to inspect one project, or one directory up (within an owner directory) to inspect all repositories under that owner, or anywhere else to inspect all repositories.

For team mode, in Slack: address Atomist in a channel linked to a repository to inspect that repository, or anywhere else to run for all repositories.
