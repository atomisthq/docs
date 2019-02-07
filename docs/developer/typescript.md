TypeScript is a great language, but if you're coming from another language ecosystem,
the toolchain can be confusing. Here are some of our learnings, in hopes they of use
to you.

We use:
   * for an editor or IDE, [VSCode](#vscode) or [IntelliJ](#intellij)
   * [Mocha](#mocha) for unit tests
   * npm for dependencies and command-line utilities and running builds
   * tslint for finding some errors and formatting nitpicks

## VSCode
We use [VSCode](https://code.visualstudio.com/), which is an excellent free IDE from Microsoft. It's highly
configurable. By default it is set up to not surprise you much, so there are a lot
of plugins to add and settings to configure.

First thing to know: push Cmd-Shift-P (Mac, or Ctrl-Shift-P) and then type what you want to do. The "command palette" that comes up is searchable. This is useful for everything.

For instance, Cmd-shift-P to open the command palette and type "commands" and then choose the option for "Shell command: install 'code' command in PATH". From now on, you can type `code .` in a (bash-like) terminal to open the current directory in VSCode.

### VSCode Settings

Open the settings with `Cmd-,` on Mac, or Cmd-shift-P and type "Settings" in the command palette. You can choose "Open Settings (JSON)" to edit the JSON instead of a GUI. Note that there are user settings and workspace settings; the latter are local to the directory you have opened.

User settings I always change:

   * Autosave: set to onFocusChange; default is off.
   * Format on save: I turn this on.
   * exclude files: these are the files to not-show in the explorer. I set them to exclude anything in .git, all the TypeScript compilation output (any .js file that has a .ts or .tsx next to it; any .d.ts that has a .ts; and all .d.ts.map and .js.map files), and those darn .DS_Store files that Apple creates:

```json
   "files.exclude": {
        "**/.git": true,
        "**/*.js": {
            "when": "$(basename).ts"
        },
        "**/**.js": {
            "when": "$(basename).tsx"
        },
        "**/*.d.ts": {
            "when": "$(basename).ts"
        },
        "**/*.d.ts.map": true,
        "**/*.js.map": true,
        "**/.DS_Store": true
    }
```

   * I like the window title to show the whole path to the file, not just its name. `"window.title": "${rootName}${separator}${activeEditorMedium}"`
   * Remember more lines the terminal log (useful while debugging): `"terminal.integrated.scrollback": 10000`

### VSCode Plugins

TSLint: I like to set `"tslint.alwaysShowRuleFailuresAsWarnings": true` so that tslint errors show in green, while
real compile errors show in red.

Mocha Sidebar: it is not spectacular with TypeScript. I can't get it to run tests in a way that shows me the output.
I have in my settings: 
```json
    "mocha.options": {
        "compilers": {
            "ts": "ts-node/register"
        }
    },
    "mocha.coverage": {
        "enable": false,
    },
    "mocha.requires": [
        "ts-node/register",
    ],
    "mocha.files.glob": "test/**/*.test.ts",
```

### Debugging

For debugging a running SDM, check the [SDM Debugging](#sdm-debug.md) page.

For debugging tests, [this post](https://medium.com/@FizzyInTheHall/run-typescript-mocha-tests-in-visual-studio-code-58e62a173575) is super useful.
In particular, I use this launch configuration in the debugger:

```json
{
            "type": "node",
            "request": "launch",
            "name": "Mocha All",
            "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
            "args": [
                "-r",
                "ts-node/register",
                "--timeout",
                "999999",
                "--colors",
                "${workspaceFolder}/test/**/*.test.ts",
            ],
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "protocol": "inspector"
        }
```

When I want to debug a particular test, I change `*.test.ts` to the name of my test file, and then launch it. Not ideal, but it works.

## IntelliJ

Also called WebStorm, many of us who also work on Java use [IntelliJ](https://www.jetbrains.com/idea/) Ultimate
for TypeScript development. It is generally better at refactoring than VSCode. It also works better for running individual tests or test suites.

## Mocha

[Mocha](https://mochajs.org/) is a JavaScript testing framework that can work for TypeScript too. 

To run Mocha on TypeScript tests, you need to pass it an argument that lets it compile TypeScript on the fly. If you like extra detailed failure messages that give you a breakdown of the discrepancy between actual and expected output, use espower:

`mocha --require espower-typescript/guess path/to/test/files/*`

If you don't like the espower magic, you can `--require ts-node/register` instead, which does TS compilation but nothing else fancy.

Something to watch out for: Sometimes it runs the tests on old code. The mocha command won't necessarily compile .ts when it finds a .js file next to it, and VSCode doesn't automatically compile .ts files on save. When in doubt, do an explicit compile before running tests.

## Contributions

Please share your questions, frustrations, etc. in the #typescript channel in [Atomist community slack](https://join.atomist.com);