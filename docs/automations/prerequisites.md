Before you begin developing and running your own automations, you will
need to have Atomist [set up in your team][setup] and know your Slack
team ID, which the Atomist Bot is happy to tell you.  Just send the
`team` message to the Atomist Bot (be sure the bot is already in the
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
in [TypeScript][ts], a superset of [JavaScript][js].  To develop and
run automations using the reference implementation of the automation
client, you will need to install Node.js.  The easiest way to install
Node.js is to go to the [Node.js web site][node] and follow the
instructions for installing on your platform.  This will make the
`node` and `npm` programs available on your system.

Alternatively, if you are on macOS you and use [Homebrew][brew], you
can install Node.js with the following command:

```console
brew install node
```

[ts]: https://www.typescriptlang.org/ (TypeScript)
[js]: https://developer.mozilla.org/en-US/docs/Web/JavaScript (JavaScript)
[node]: https://nodejs.org/ (Node.js)
[brew]: https://brew.sh/ (Homebrew)

## Atomist CLI

The Atomist CLI performs several useful functions that are used
throughout this documentation.  Please install the CLI using the
following command:

```console
npm install -g @atomist/automation-client
```

Note that this step requires the successful installation of Node.js
mentioned above.

## GitHub Token

The Atomist automation API client uses
a [GitHub personal access token][token] to register with the Atomist
API.  The Atomist API will use the token to confirm you are in a
GitHub organization connected to the Slack team in which you are
running your automations.  The token needs _read:org_ scope to see
what GitHub organizations your GitHub user is in.  In addition, the
Atomist API only allows members of the GitHub team
`atomist-automation` to authenticate and register a new client.  You
will have to create a team in your GitHub organization named
`atomist-automation` and add the users who want to create and register
automations to it.

### The Easy Way

The easiest way to create the appropriate GitHub personal access is to
use the Atomist CLI's `config` command.

```console
atomist config
```

The `atomist config` command will prompt you for your Slack team ID
(see above) and your GitHub credentials.  Your GitHub credentials are
only used to authenticate to GitHub so the personal access token can
be created.  Atomist does not store your GitHub credentials and the
generated personal access token is only stored on your local system.

### The Hard Way

If you prefer to create the GitHub personal access token yourself, you
can do so on your GitHub.com [new personal access token][new-token]
page.  Give the token a description name, like "My manually created
Atomist token", and ensure _read:org_ scope is selected before
clicking the "Generate token" button.  Copy the generated token.
Finally, manually create your local Atomist configuration file.

_On UNIX-like systems:_

```console
( umask 077 && mkdir -p "$HOME/.atomist" && touch "$HOME/.atomist/client.config.json" )
```

_On MS Windows:_

```doscon
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

[token]: https://github.com/settings/tokens (GitHub Personal Access Tokens)
[new-token]: https://github.com/settings/tokens/new (GitHub New Personal Access Token)
