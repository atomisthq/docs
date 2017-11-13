Before you begin developing and running your own automations, you
need to have Atomist [set up in your team][setup] and know your Slack
team ID, which the Atomist bot is happy to tell you.  Just send the
`team` message to the Atomist bot (be sure the bot is already in the
channel!).

```
you> @atomist team
atomist> The Slack id for team your-slack-team is T1L0V3KJP
         16 of 24 users in this team have authorized themselves
```

The above response tells you the Slack team ID is `T1L0V3KJP`.

[setup]: ../setup/index.md (Atomist Setup)

## Node.js

The reference implementation of the Atomist automation API client is
implemented in [TypeScript][ts], a superset of [JavaScript][js].  To develop and
run automations using the reference implementation of the automation
client, you must install Node.js.  The easiest way to install
Node.js is to go to the [Node.js web site][node] and follow the
installation instructions for your platform.  This makes the
`node` and `npm` programs available on your system.

Alternatively, macOS users with [Homebrew][brew]
can install Node.js with the following command:

```
brew install node
```

[ts]: https://www.typescriptlang.org/ (TypeScript)
[js]: https://developer.mozilla.org/en-US/docs/Web/JavaScript (JavaScript)
[node]: https://nodejs.org/ (Node.js)
[brew]: https://brew.sh/ (Homebrew)

## Atomist CLI

The Atomist CLI performs several useful functions that are referred to
throughout this documentation.  Once you have Node.js installed,
install the CLI with the following command:

```
npm install -g @atomist/automation-client
```

## GitHub token

The Atomist automation API client uses
a [GitHub personal access token][token] to register with the Atomist
API.  The Atomist API uses the token to confirm you are in a
GitHub organization connected to the Slack team in which you are
running your automations.  The token needs [_read:org_ scope][scope]
to see what GitHub organizations your GitHub user is in.

[scope]: https://developer.github.com/changes/2014-02-25-organization-oauth-scopes/ (GitHub Token Scopes)

### The easy way

The easiest way to create the appropriate GitHub personal access token
is to use the Atomist CLI's `config` command.

```
atomist config
```

The `atomist config` command will prompt you for your Slack team ID
(see above) and your GitHub credentials.  Your GitHub credentials are
only used to authenticate to GitHub so the personal access token can
be created.  Atomist does not store your GitHub credentials and the
generated personal access token is only stored on your local system.

### The hard way

If you prefer to create the GitHub personal access token yourself, you
can do so on your GitHub.com [new personal access token][new-token]
page.  Give the token a descriptive name, like "My manually created
Atomist token", and ensure _read:org_ scope is selected before
clicking the "Generate token" button.  Copy the generated token.
Finally, manually create your local Atomist configuration file.

_On UNIX-like systems:_

```
( umask 077 && mkdir -p "$HOME/.atomist" && touch "$HOME/.atomist/client.config.json" )
```

_On MS Windows:_

```
md %USERPROFILE%\.atomist && type nul > %USERPROFILE%\.atomist\client.config.json
```

Open the `client.config.json` file you just created in your favorite
text editor and add the following contents, replacing `TEAM_ID` with
your Slack team ID (see above) and `GITHUB_TOKEN` with the GitHub
personal access token you just created.

```json
{
  "token": "GITHUB_TOKEN",
  "teamIds": [
    "TEAM_ID"
  ]
}
```

If you are in multiple Slack teams and want to run your automations in
all of them, simply add all of their team IDs to the `teamIds` array
in the client configuration file.

[token]: https://github.com/settings/tokens (GitHub Personal Access Tokens)
[new-token]: https://github.com/settings/tokens/new (GitHub New Personal Access Token)
