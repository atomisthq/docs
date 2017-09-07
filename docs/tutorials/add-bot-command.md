You can write custom commands that the Atomist Bot can run in your team. We
call these _skills_, and you can teach the bot new skills to
automate common tasks your team routinely performs. Those skills are
implemented inside Rug command handlers and this tutorial will show you
how to create a new one.

!!! missing "Prerequisites"
    Completing the [Getting Started Guide][getting-started]
    and the [Rug CLI setup][cli-setup],
    [Rug project creation][create-rug], [TypeScript setup][ts],
    and [Rug archive publishing][publish] tutorials are prerequisites
    for this tutorial.

[getting-started]: /getting-started/index.md
[cli-setup]: setup-cli.md
[create-rug]: create-rug-project.md
[ts]: setup-typescript.md
[publish]: publish-rug-project.md

## Search StackOverflow from Slack

In this example, you will teach the Atomist Bot to search
StackOverflow and show you the first few results right in chat.

Here is the TypeScript code for a command that does this.

```typescript linenums="1" hl_lines="17 21"
{!doc-rugs/.atomist/handlers/command/SearchStackOverflow.ts!}
```

The `@Intent` specified in line 17, `search SO`, is the command that
the Atomist Bot will respond to by executing this _command handler_.

This command takes a single parameter called `query` (line 21), which
is the search term that will be passed to the StackOverflow
API. Unless you provide a query parameter when calling this command,
the Atomist Bot will always prompt for it.

Lines 26--40 tell Atomist to call the StackOverflow REST API URL and,
on success, use the `SendStackOverflowResults` response handler,
defined starting on line 46. It simply formats the search results from
the StackOverflow API call.

!!! tip "Rug Command Handlers"
    See the [Rug command handler user-guide][rugcmd] for more information.

[rugcmd]: /user-guide/rug/command-handlers.md

## Get the Code Into Your Rug Project

Add the code example above into a new file called `SearchStackOverflow.ts` in the
`.atomist/handlers/command` directory of the local repo for your Rug project
like so:

```console
$ cd atomist-tutorials
$ curl -o .atomist/handlers/command/SearchStackOverflow.ts \
    https://raw.githubusercontent.com/atomist/end-user-documentation/master/.atomist/handlers/command/SearchStackOverflow.ts
```

Your command handler uses the `http` function, so you need to add that
dependency as an extension into the `atomist` section of your Rug
project's `package.json`.

```json hl_lines="7 8"
{
  "name": "@atomist-contrib/atomist-tutorials",
  "version": "0.3.0",
  ...
  "atomist": {
    "requires": "[1.0.0-m.4,2.0.0)",
    "extensions": {
      "com.atomist.rug:rug-function-http": "[0.7.3,1.0.0)"
    }
  }
}
```

Now commit those changes to your Rug project.

```console
$ ( cd .atomist && npm install )
$ git add .atomist/handlers/command/SearchStackOverflow.ts .atomist/package*.json
$ git commit -m 'Added StackOverflow command handler'
```

## Publish

Now, publish your Rug project, which add your new Atomist Bot skill,
using the same team ID you determined in
the [Publish a Rug Project][publish] tutorial.

```console
$ rug publish -i <YOUR_TEAM_ID>
```

Once the Rug archive is successfully published, the Atomist bot will
be notified the new archive is available in your team and it should
become available to use within a few minutes.

## Running the command in slack

Once available in your team, you can use the new command:

```
@atomist search SO
```

Upon which the Atomist Bot will open a thread and ask you to enter a
value for the query parameter.  Enter "python3 runtime error" and
submit.  The Atomist Bot will trigger the execution of your command
handler and return the results in the Slack channel.

<div class="ss-container">
  <img src="../images/search-so-results.png" alt="Search StackOverflow results" class="ss-large">
</div>
