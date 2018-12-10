
This page describes creating a generic builder for your [Build Goal][build-goal].

You can construct a Builder around any shell command that can run in whatever environment your SDM runs in.
This uses the Node `child_process` library to spawn another process for each command you supply.

For instance, this documentation site uses a builder that runs these commands:

``` typescript
[
    "pip install -r requirements.txt",
    "mkdocs build",
]
```

## spawnBuilder

To turn a set of operating system commands into a Builder, use the`spawnBuilder` function in the Build pack. 
It accepts a [SpawnBuilderOptions][sbo-apidoc] object,
with the following necessary properties:

* name: a string that helps you identify the builder
* commands: an array of SpawnCommands to run as child processes. 
* logInterpreter: a function to pull out the interesting bit of the log
* projectToAppInfo: determine a name and version based on the code.

## SpawnCommand

The `commands` property contains a list of SpawnCommands to run, sequentially, in a separate process in the project directory.

Create a [SpawnCommand][sc-apidoc] object for each command, with a single-word `command` and the arguments separated:

``` typescript
{ 
    command: "pip", 
    argument: ["install", "-r", "requirements.txt"],
}
```

You can add `options` to the SpawnCommand, and they'll be passed on to the `child_process` npm package.

## LogInterpreter

The logInterpreter is a function that extracts the interesting bit from the build log. You can customize this function
    to highlight the particular errors that you see in your own builds, and put exactly what you want to see into chat messages.

A good default is a log interpreter that pulls out the last few lines of the log. There's a convenience function for that:

`lastLinesLogInterpreter("Tail of the log:", 10);`

If you provide your own function, make it take a string(the contents of the log) and return an [InterpretedLog][il-apidoc]:

``` typescript
{
    message: "Here is what you need to know:",
    relevantPart: usefulBitOfLog,
}
```

## projectToAppInfo

Look at the content of your project and determine the name and version.Here's one implementation:


``` typescript
async (p: Project) => {
        return {
            name: p.id.repo,
            version: p.id.sha,
            id: p.id as RemoteRepoRef,
        };
    },
```

<!-- TODO please can we make that last one very optional -->

## Put it together

Assemble these properties into a SpawnBuilderObject and get a Builder:

``` typescript
const mkdocsBuilder = spawnBuilder({
    name: "mkdocs spawn builder",
    logInterpreter,
    projectToAppInfo,
    commands: [
        "pip install -r requirements.txt",
        "mkdocs build",
    ].map(m => asSpawnCommand(m)),
});
```

Use the Builder in your BuilderRegistration that you register with a [Build Goal][build-goal].

[build-goal]: build.md
[sbo-apidoc]: https://atomist.github.io/sdm-pack-build/interfaces/_lib_support_build_spawnbuilder_.spawnbuilderoptions.html (API doc for SpawnBuilderOptions)
[il-apidoc]: https://atomist.github.io/sdm/interfaces/_lib_spi_log_interpretedlog_.interpretedlog.html (API doc for InterpretedLog)
[sc-apidoc]: https://atomist.github.io/automation-client/interfaces/_lib_util_spawn_.spawncommand.html (API doc for SpawnCommand)