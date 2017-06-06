You can write custom commands that the Atomist Bot can run in your team. We
call these _skills_, and you can teach the Atomist Bot new skills to
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
which starts on line 46. This response handler merely formats the search results from
the StackOverflow API call for presentation as a Slack message.

!!! tip "Rug Command Handlers"
    See the [Rug command handler user-guide][rugcmd] for more information.

[rugcmd]: /user-guide/rug/command-handlers.md

## Get the Code Into Your Rug Project

Add the code example above into a new file called `SearchStackOverflow.ts` in the
`.atomist/handlers/command` directory of the local repo for your Rug project
like this:

```console
$ cd atomist-tutorials
$ curl -o .atomist/handlers/command/SearchStackOverflow.ts \
    https://raw.githubusercontent.com/atomist/end-user-documentation/master/.atomist/handlers/command/SearchStackOverflow.ts
```

This command handler uses the `http` function, so you need to add it
as an extension into the `manifest.yml` of your Rug project.

```yml hl_lines="5 6"
group: "atomist-contrib"
artifact: "atomist-tutorials"
version: "0.3.0"
requires: "[0.25.3,0.26.0)"
extensions:
  - "com.atomist.rug:rug-function-http:0.6.2"
```

Now commit these changes to your Rug project.

```console
$ git add .atomist/handlers/command/SearchStackOverflow.ts .atomist/manifest.yml
$ git commit -m 'Added StackOverflow command handler'
```

## Publish

Add this new Atomist Bot skill to your Slack team by publishing your Rug project
using the same team ID you used in the [Publish a Rug Project][publish] tutorial.

```console
$ rug publish -i <YOUR_TEAM_ID>
```

[publish]: /tutorials/publish-rug-project.md

## Make The New Skill Active In Slack

In `#general` or any channel in your Slack team that Atomist Bot has
been invited to, type this message, replacing `<group>` and
`<artifact>` with the values for `group` and `artifact` found in your
Rug project's `.atomist/manifest.yml`.

```
@atomist add skills <group>:<artifact>
```

<div class="ss-container">
  <img src="../images/add-skills.png" alt="Add Bot Skills" class="ss-medium">
</div>

Tell the Bot to load the new skills with this message:

```
@atomist refresh skills
```

<div class="ss-container">
  <img src="../images/refresh-skills.png" alt="Refresh Bot Skills" class="ss-medium">
</div>

## Running The Command In Slack

Once you've added the new command to your team, you can use it like this:

```
@atomist search SO
```

The Atomist Bot will open a thread and ask you to enter a
value for the query parameter.  Enter "python3 runtime error" and
submit.  The Atomist Bot will trigger the execution of your command
handler and return the results in the Slack channel.

<div class="ss-container">
  <img src="../images/search-so-results.png" alt="Search StackOverflow results" class="ss-large">
</div>
