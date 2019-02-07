You can debug your SDM on your laptop. Instead of `atomist start` at the command line, start it up in a debugger in your favorite tool.

## VSCode

In [VSCode][debug-vscode], the debug configuration looks like:

```
{
  "type": "node",
  "request": "launch",
  "name": "Launch SDM",
  "program": "${workspaceFolder}/node_modules/@atomist/automation-client/bin/start.js",
  "env": {
      "ATOMIST_MODE": ""
  },
  "outputCapture": "std",
}     
```

If you want the SDM to run in local mode, put "local" in the ATOMIST_MODE environment variable.

[debug-vscode]: https://code.visualstudio.com/docs/editor/debugging (Debugging in VSCode)

## IntelliJ IDEA

In [IntelliJ IDEA][debug-idea], perform the following steps:

* In the menu, click Run and go to Edit Configurations
* Click on the + sign in the top left corner to add a new configuration
* In the Name field, enter `Debug Atomist`
* In the JavaScript file field, enter `node_modules/@atomist/automation-client/bin/start.js`
* If you want run your SDM in local mode add an environment variable `ATOMIST_MODE` with value `local`
* Press `Ok`

Now in your run configurations in the top right corner, choose `Debug Atomist` and press the Debug icon.

[debug-idea]: https://www.jetbrains.com/help/idea/debugging-code.html (Debugging in IntelliJ IDEA)

## Debugging through logging

See also: [Logging in an SDM](logging.md)
