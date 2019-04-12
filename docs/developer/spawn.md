From within your automations, every other tool is also at your disposal.
You can trigger any operating system command from within Node.js. Since this
is common and important, the Atomist SDM has wrapped other Node.js libraries
to make running commands and handling errors easier from within TypeScript,
in async functions.

This page describes how to run an external command

* [when you implement a goal](#in-a-goal)
* and [anywhere else](#anywhere-else) in an SDM

Any of the options below accepts an optional last argument for options that are
passed through to the underlying libraries. You can pass any of the options documented
in the [underlying Node library][apidoc-SpawnSyncOptions].

## In a goal

If you're implementing a custom [goal](goal.md), then you're writing a function of type [`ExecuteGoal`](https://atomist.github.io/sdm/modules/_lib_api_goal_goalinvocation_.html#executegoal), which receives a `GoalInvocation`.
To run external commands within your function, wrap it in `doWithProject`. Then your function can receive `ProjectAwareGoalInvocation`, which has convenience methods to run an external command in your project's directory.

### Send command output to the log

If you want the output of the command to go to the goal's [progress log](logging.md#goal-progress-logs),
then use `spawn`. It returns an object that includes information on whether the command succeeded, so check it.
This will send stderr and stdout to the goal's log.

Here is an example with error handling:

```typescript

export const executeMkdocsStrict: ExecuteGoal = doWithProject(async (inv: ProjectAwareGoalInvocation) => {

    const mkdocsResult = await inv.spawn("mkdocs", ["build", "--strict"]);
    if (mkdocsResult.code !== 0) {
        const message = mkdocsResult.error ? mkdocsResult.error.message : "See the log for output";
        return { code: mkdocsResult.status || 2, message };
    }

    return { code: 0 };
});
```

If the success of the command depends on its output, then consider providing an [`errorFinder`](https://atomist.github.io/sdm/interfaces/_lib_api_helper_misc_child_process_.spawnlogoptions.html#errorfinder)
 option to `spawn`.

### Get the command output back

If you want to analyze the command output instead of sending it to the log, then use `exec`.
It returns an object containing `stdout` and `stderr` strings. If the command fails, the returned Promise is rejected
with an `ExecPromiseError`.

Here is an example with error handling:

```typescript
export const executeMkdocsStrict: ExecuteGoal = doWithProject(async (inv: ProjectAwareGoalInvocation) => {
    try {
        const mkdocsResult = await inv.exec("mkdocs", ["build", "--strict"]);
        inv.progressLog.write(mkdocsResult.stdout);
        inv.progressLog.write(mkdocsResult.stderr);
        // do stuff with output
        return { code: 0 };
    } catch (e) {
        const epe = e as ExecPromiseError;
        inv.addressChannels(`mkdocs --strict failed on ${inv.id.sha} on ${inv.id.branch}: ${epe.message}`);
        return { code: epe.status || 1, message: epe.message };
    }
});
```

[apidoc-SpawnSyncOptions]: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback (Docs for options to spawn)

## Anywhere else

The simplest way to run an external command is with [execPromise][apidoc-execpromise].
Pass the command as a string and its parameters as an array of strings.
It returns a Promise of an object containing the output of the command in `stderr` and `stdout`.
If the command fails (including if it exits with an error code), the Promise is rejected.

Unless you provide a `cwd` option, this will run in the SDM's root directory.

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
        const description = `Exit code: ${epe.status}, stderr: ${epe.stderr}`;
    }
}
```

## A little more flexibility

You can also use [`spawnPromise`][apidoc-spawnpromise].
This function will always give you data back, and you can check it for errors. You can get the
output back in `stderr` and `stdout`, *or* you can pass a `log` in the options. Use a log when
the command might produce a lot of output.

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

## Running a command in a Project

Most of the time you'll want to run in the directory of your project. The trick is to add
`{ cwd: project.baseDir }` to any call to any of the above methods. When you write a function
to describe a custom [build](build.md) or [autofix](autofix.md), you'll have access to the Project.
When [creating a goal][create-goal], use [`doWithProject`](#in-a-goal) (easier!), or you can
clone the project explicitly using the SDM's configured ProjectLoader.

[create-goal]:../developer/goal.md#creating-a-goal (Creating a Goal)

Here is a full example.  In this code, `configuration` is the
second argument passed to your SDM configuration function, typically in `machine.ts`.

```typescript
    inv.configuration.sdm.projectLoader.doWithProject({
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
