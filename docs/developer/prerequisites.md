You can run org-visualizer or another Software Delivery Machine (SDM) locally without any signup or authentication. Then you can connect it to the Atomist service to benefit your [whole team][team].

## Common Prerequisites

In the environment where your SDM runs, you need Node, git, and the Atomist CLI.
If your automations call out to any other tools (such as build tools or linters), install them too.

### Node.js

An Atomist SDM is
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

### Git

Atomist supports software development using Git and uses the Git
command-line tool to perform many of its actions.  You must have the
[Git CLI installed][git-download] for Atomist tools to function
properly.

[git-download]: https://git-scm.com/downloads

> Note: Atomist requires Git 2.x

### Atomist CLI

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

[team]: team.md (Atomist SDM Team Mode)
[quick-start]: ../quick-start.md (Developer Quick Start)
[getting-started]: ../user/index.md (Atomist - Getting Started)

### An SDM codebase

You can clone an existing SDM (if your team has one already) or create a new one.

#### Clone one

If you want to create aspects for investigating technology drift, clone [org-visualizer][org-viz-github].

To see a smattering of further things you can do with Atomist, try the [samples](https://github.com/atomist/samples).

[org-viz-github]: https://github.com/atomist/org-visualizer (Org Visualizer on GitHub)

#### Create a Software Delivery Machine

To start from scratch, try this:

```
$ atomist create sdm
```

This creates a new directory, populated with the code for an SDM. You can
start from scratch, or from a 'spring' SDM designed to deliver Spring web services.
We recommend 'blank'.

```
? Type of SDM to create
  blank
❯ spring
…
  Successfully created new project yourproject at file:~/atomist/projects/target-owner/yourproject
$ cd  ~/atomist/projects/target-owner/yourproject
```

When it prompts you for `(mapped parameter) target-owner`, enter your GitHub organization (or your GitHub username).
A new directory will be created for the SDM in `$ATOMIST_ROOT/<target-owner>/<target repository>`. This will not create
a repository on GitHub.

To start a new SDM and add your own automations, use:

`atomist create sdm`

This will generate a new SDM repository on your computer.

Most instructions in this documentation (such as `atomist start`) expect you to be in the root directory
of your SDM repository.

## Local Mode

You're ready to run your SDM locally, as described in the [local mode page][local].

Each individual SDM may have its own requirements, too. For instance, [org-visualizer][] needs Postgres to run
in local mode. An SDM for delivering Java projects may need a JDK and Maven or Gradle.
Check your SDM's README for special needs.

[local]: local.md (LocalMode)

## Team Mode Prerequisites

When you run in [team mode][team], you get chat integration and events from your real repositories. This
requires authenticating with the Atomist service.

### Atomist workspace

As part of creating an account with Atomist, you created an Atomist
workspace. (If you don't have one yet, go to [app.atomist.com](https://app.atomist.com).) To run SDMs, you will need
the ID of your Atomist workspace.  You can find your Atomist workspace
ID on your workspace's settings page in the [Atomist web
application][atomist-app].

[atomist-app]: https://app.atomist.com/ (Atomist Web App)

### Atomist API key

To start your own SDM, you will need an
Atomist API key so the client can properly register with the API.  You
can generate an Atomist API key on the [API key page of the Atomist
web application][app-api-key].  You will need an Atomist API key in
the next section when running configure.

[app-api-key]: https://app.atomist.com/apiKeys (Atomist API Key)

### Minimal Configuration

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

Now you're ready to try `atomist start`. Check the [team mode page][team] for more suggestions.

When configuring SDMs to run on a server, see [SDM Configuration](config.md) for more options.

