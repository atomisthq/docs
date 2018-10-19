You can debug your SDM on your laptop.

Instead of `atomist start` at the command line, start it up in a debugger.
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
}     
```

If you want the SDM to run in local mode, put "local" in the ATOMIST_MODE environment variable.

[debug-vscode]: https://code.visualstudio.com/docs/editor/debugging (Debugging in VSCode)
