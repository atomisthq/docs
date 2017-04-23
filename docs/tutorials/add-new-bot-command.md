You can write custom commands that the Atomist Bot can run in your team. We
call these _skills_, and you can teach the bot new skills to
automate common tasks your team routinely performs. Those skills are
implemented inside Rug command handlers and this tutorial will show you
how to create a new one.

!!! tip ""
    Completing the [Getting Started][getting-started] steps, [Rug CLI setup][cli-setup], and having a
    [Rug project][create-rug] to publish are prerequisites for this tutorial.

[getting-started]: /getting-started
[cli-setup]: /tutorials/cli-quick-setup
[create-rug]: /tutorials/create-rug-project

[ugpj]: /user-guide/rug/projects.md
[rugcmd]: /user-guide/rug/commands.md
[rugeditor]: https://github.com/atomist/rug-editors#addtypescriptcommandhandler

## Search StackOverflow from Slack

In this example, we want to be able to query StackOverflow and see
the first few results right in Slack.

Here is the TypeScript code for a command that does this.

```typescript linenums="1" hl_lines="14 17"
{!../../.atomist/handlers/command/SearchStackOverflow.ts!}
```

The `@Intent` specified in line 14, `search SO` is the command that the
Atomist Bot will respond to and execute this script.

This command takes a single parameter called `query` (line 17), which is the query
that will be passed to the StackOverflow API. Unless you provide a query parameter
when calling this command, the Atomist Bot will always prompt for it.

Lines 24-30 tell Atomist to call the StackOverflow REST API URL and, on success,
use the `SendStackOverflowResults` response handler, defined on line 43. It
simply formats the search results from the StackOverflow API call.

!!! tip ""
    Please see the [Rug command handler user-guide][rugcmd] for more information.

## Get the Code Into Your Rug Project

Add the code example above into a new file called `SearchStackOverflow.ts` in the
`.atomist/handlers/command` directory of the local repo for your Rug project
like so:

```console
atomist-tutorials $ curl \
'https://raw.githubusercontent.com/atomist/end-user-documentation/master/.atomist/handlers/command/SearchStackOverflow.ts' \
-o .atomist/handlers/command/SearchStackOverflow.ts
```

This command uses the `http` function, so we need to add that into our
`manifest.yml` for our Rug project.

```yml hl_lines="5 6"
group: "atomist-contrib"
artifact: "atomist-tutorials"
version: "0.3.0"
requires: "[0.25.3,0.26.0)"
extensions:
  - "com.atomist.rug:rug-function-http:0.6.2"
```

## Publish

Now, publish your updated Rug project with the new command.

```console
$ rug publish
```

See [Publish a Rug Project][publish] if you need more information on this step.

[publish]: /tutorials/publish-rug-project

## Make it Active in Slack

In `#general` or any channel in your Slack team that Atomist Bot has been invited to, type this message:

```
@atomist refresh skills
```

<div class="ss-container">
  <img src="../images/refresh-skills.png" alt="Refresh Bot Skills" class="ss-medium">
</div>

## Running the command in slack

Once available in your team, you can use the new command:

```
@atomist search SO
```

Upon which the Atomist Bot would prompt your to input your query before going
querying StackOverflow and returning the results in the Slack channel.

<div class="ss-container">
  <img src="../images/search-so-results.png" alt="Search StackOverflow results" class="ss-large">
</div>
