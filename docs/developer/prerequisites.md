You can run a Software Delivery Machine (SDM) locally without any signup or authentication.
See the [Developer Quick Start][quick-start] to get started.

This document describes the prerequisites for running an SDM for your [whole team][team],
connecting to your source control manager, chat system, and continuous integration tools.

Before you begin developing and running your own software deliver
machine (SDM), you need an [Atomist
account][getting-started] and several other prerequisites.

[team]: team.md (Atomist SDM Team Mode)
[quick-start]: ../quick-start.md (Developer Quick Start)
[getting-started]: ../user/index.md (Atomist - Getting Started)

## Atomist workspace

As part of creating an account with Atomist, you created an Atomist
workspace.  To run SDMs, you will need
the ID of your Atomist workspace.  You can find your Atomist workspace
ID on your workspace's settings page in the [Atomist web
application][atomist-app].

[atomist-app]: https://app.atomist.com/ (Atomist Web App)

## Node.js

The reference implementation of the Atomist SDM is
implemented in [TypeScript][ts], a superset of [JavaScript][js].  To
develop and run it, you must install Node.js.  The easiest way to
install Node.js is to go to the [Node.js web site][node] and follow
the installation instructions for your platform.  This makes the
`node` and `npm` programs available on your system.

Alternatively, macOS users with [Homebrew][brew] can install Node.js
with the following command:

```
brew install node
```

Once you have `node` and `npm` available, it is a good idea to update
to the latest version of npm using the following command.

```
npm install -g npm
```

[ts]: https://www.typescriptlang.org/ (TypeScript)
[js]: https://developer.mozilla.org/en-US/docs/Web/JavaScript (JavaScript)
[node]: https://nodejs.org/ (Node.js)
[brew]: https://brew.sh/ (Homebrew)

## Git

Atomist supports software development using Git and uses the Git
command-line tool to perform many of its actions.  You must have the
[Git CLI installed][git-download] for Atomist tools to function
properly.

[git-download]: https://git-scm.com/downloads

## Atomist CLI

The Atomist CLI performs several useful functions that are referred to
throughout this documentation.  Once you have Node.js installed,
install the Atomist CLI with the following command:

```
npm install -g @atomist/cli
```

!!! note "Installation on GNU/Linux"
    On GNU/Linux systems, including when running in a Docker environment,
    you may need to add the `--unsafe-perm=true --allow-root` command-line
    options to the above command to avoid permission errors and
    successfully install.

If you are using [Homebrew][brew] on macOS, you can install the
Atomist CLI with the following command:

```
brew install atomist-cli
```

[brew]: https://brew.sh/ (Homebrew - The missing package manager for macOS)

## Atomist API key

To start your own SDM, you will need an
Atomist API key so the client can properly register with the API.  You
can generate an Atomist API key on the [API key page of the Atomist
web application][app-api-key].  You will need an Atomist API key in
the next section when running configure.

[app-api-key]: https://app.atomist.com/apiKeys (Atomist API Key)

## Minimal Configuration

To get started quickly, run the following command to create and persist a user configuration
on your local system.

```
atomist config
```

The above command will prompt you for your Atomist API key and
workspace ID.  The user configuration is a JSON-formatted object saved
in the file `$HOME/.atomist/client.config.json` on Unix-like operating
systems including macOS and
`%USERPROFILE%\.atomist\client.config.json` on MS Windows operating
systems.

After running the above command, the contents of the user
configuration file will look something like:

```json
{
  "apiKey": "API_KEY",
  "workspaceIds": [
    "WORKSPACE_ID"
  ]
}
```

with `API_KEY` and `WORKSPACE_ID` replaced with your Atomist API key
and workspace ID, respectively. 

For configuring SDMs to run on a server, see [SDM Configuration](config.md) for more options.

