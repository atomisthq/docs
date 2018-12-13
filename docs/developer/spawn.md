From within your automations, every other tool is also at your disposal.
You can trigger any operating system command from within Node.js. Since this
is common and important, the Atomist SDM has wrapped other Node.js libraries
to make running commands and handling errors easier from within TypeScript, 
in async functions.

Any of the options below accepts an optional last argument for options that are 
passed through to the underlying libraries. You can pass any of the options documented
in the [underlying Node library][apidoc-SpawnSyncOptions]. The most important of these is `cwd`,
the directory to run the command in. See [running inside your Project](#running-a-command-in-a-project) below.

[apidoc-SpawnSyncOptions]: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback (Docs for options to spawn)

## Run a command

The simplest way to run an external command is with [execPromise][apidoc-execpromise].
Pass the command as a string and its parameters as an array of strings.
It returns a Promise of an object containing the output of the command in `stderr` and `stdout`.
If the command fails (including if it exits with an error code), the Promise is rejected.

```typescript
await execPromise("docker", ["push", "anImageTag"]);
```

Here's a full example with some error handling and some indication of what
is available in the result or the error:

```typescript
import { execPromise, ExecPromiseError } from "@atomist/sdm";

async function demoExecPromise() {
    try {
        const dockerPushResult = await execPromise("docker", ["push", "anImageTag"]);
        const description = `docker push completed successfully. 
            Stdout: ${dockerPushResult.stdout}
            Stderr: ${dockerPushResult.stderr}`;
    } catch (e) {
        const epe = e as ExecPromiseError;
        if (e.error) {
            // an exception happened starting it up
            throw e;
        }
        const description = `Exit code: ${e.status}, stderr: ${e.stderr}`;
    }
}
```

### Send command output to a log

If you're running the command as part of executing a goal, then you might want its output
to go to the goal's progressLog. Use [`spawnAndLog`][apidoc-spawnandlog] for this.

Pass the progress log, then the command as a string and its parameters as an array of strings. This function will not
reject its returned Promise even if the command fails, so check the result.

This example demonstrates error handling:

```typescript
import { spawnAndLog, GoalInvocation } from "@atomist/sdm";

async function demoSpawnAndLog(inv: GoalInvocation) {
    const dockerPushResult = await spawnAndLog(inv.progressLog, "docker", ["push", "anImageTag"]);
    if (dockerPushResult.error) {
        return {
            code: 1,
            message: dockerPushResult.error.message
        }
    }
    if (dockerPushResult.status !== 0) {
        return {
            code: dockerPushResult.status,
            message: "See the log for output",
        }
    }
}
```

## A little more flexibility

You can also use [`spawnPromise`][apidoc-spawnpromise].
This function will always give you data back, and you can check it for errors. You can get the
output back in `stderr` and `stdout`, *or* you can pass a `log` in the options. Use a log when
the command might produce a lot of output.

<!-- This many examples before the Project bit gets excessive
Here's an example with error handling, where we both write the (short) output to the log
and use it for error reporting. 

```typescript
import { spawnPromise, GoalInvocation } from "@atomist/sdm";

async function demoSpawnPromise(inv: GoalInvocation) {
    const dockerPushResult = await spawnPromise("docker", ["push", "anImageTag"]);
    if (dockerPushResult.error) {
        return { code: 1, message: dockerPushResult.error.message }
    }
    if (dockerPushResult.status !== 0) {
        inv.addressChannels(`docker push failed on ${inv.id.sha} on ${inv.id.branch}: ${dockerPushResult.stderr}`);
        return { code: dockerPushResult.status || 1, message: dockerPushResult.stderr }
    }
    const description = `docker push completed successfully. 
            Stdout: ${dockerPushResult.stdout}
            Stderr: ${dockerPushResult.stderr}`;
    // do stuff with output
}
```
-->

## Running a command in a Project

Most of the time you'll want to run in the directory of your project. The trick is to add
`{ cwd: project.baseDir }` to any call to any of the above methods. When you write a function
to describe a custom [build](build.md) or [autofix](autofix.md), you'll have access to the Project.
When [creating a goal](goal.md#custom-goals), clone the project explicitly using `inv.configuration.sdm.projectLoader.doWithProject`. Here is a full example:

```typescript

export const executeMkdocsStrict: ExecuteGoal = async (inv: GoalInvocation) => {
    return inv.configuration.sdm.projectLoader.doWithProject({
        credentials: inv.credentials,
        id: inv.id,
        readOnly: true, // tell it whether it can reuse this clone later
        cloneOptions: { detachHead: true },
    }, async project => {
        // run the command
        const mkdocsResult = await spawnPromise(
            "mkdocs", ["build", "--strict"], { cwd: project.baseDir });

        // the rest is logging and error handling
        inv.progressLog.write(mkdocsResult.stdout);
        inv.progressLog.write(mkdocsResult.stderr);
        if (mkdocsResult.error) {
            // this is an unexpected error
            return { code: mkdocsResult.status || 2, message: mkdocsResult.error.message }
        }
        if (mkdocsResult.status !== 0) {
            // this is an expected kind of error; it means the tests failed
            inv.addressChannels(`mkdocs --strict failed on ${inv.id.sha} on ${inv.id.branch}: ${mkdocsResult.stderr}`);
            return { code: mkdocsResult.status || 1, message: mkdocsResult.stderr }
        }
        return { code: 0 };
    });
}
```

[apidoc-execpromise]: https://atomist.github.io/automation-client/modules/_lib_util_child_process_.html#execpromise (API doc for execPromise) 

[apidoc-spawnpromise]: https://atomist.github.io/automation-client/modules/_lib_util_child_process_.html#spawnpromise (API doc for spawnPromise)

[apidoc-spawnandlog]: https://atomist.github.io/sdm/modules/_lib_api_helper_misc_child_process_.html#spawnandlog (API doc for spawnAndLog)
