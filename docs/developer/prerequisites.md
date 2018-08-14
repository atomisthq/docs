Before you begin developing and running your own software deliver
machine (SDM) or other Atomist API client, you need an [Atomist
account][getting-started] and several other prerequisites.

[getting-started]: ../user/index.md (Atomist - Getting Started)

## Atomist workspace

As part of creating an account with Atomist, you created an Atomist
workspace.  To run SDMs or other Atomist API clients, you will need
the ID of your Atomist workspace.  You can find your Atomist workspace
ID on your workspace's settings page in the [Atomist web
application][atomist-app].

[atomist-app]: https://app.atomist.com/ (Atomist Web App)

## Node.js

The reference implementation of the Atomist automation API client is
implemented in [TypeScript][ts], a superset of [JavaScript][js].  To
develop and run automations using the reference implementation of the
automation client, you must install Node.js.  The easiest way to
install Node.js is to go to the [Node.js web site][node] and follow
the installation instructions for your platform.  This makes the
`node` and `npm` programs available on your system.

Alternatively, macOS users with [Homebrew][brew] can install Node.js
with the following command:

```
brew install node
```

Once you have `node` and `npm` available, it is a good idea to update
to the latest version of NPM using the following command.

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

## Atomist API key

To start your own SDM or other automation client, you will need an
Atomist API key so the client can properly register with the API.  You
can generate an Atomist API key on the [API key page of the Atomist
web application][app-api-key].  You will need an Atomist API key in
the next section when running configure.

[app-api-key]: https://app.atomist.com/apiKeys (Atomist API Key)

## Configure

There are a few ways you can configure Atomist API clients.  While any
of the approaches below will work in any scenario, some approaches are
better for some use cases than others.  If you are developing an SDM
and running it locally on your workstation or laptop, [user
configuration](#user-configuration) is likely your best choice.  If
you are running an SDM or other automation client on a server in a
testing or production environment, you will likely want to use the
[environment variable](#environment-variable) approach.

Regardless of the approach you take, the minimum information required
to successfully start an API client is an [API key](#atomist-api-key)
and a [workspace ID](#atomist-workspace).  Depending on the SDM or
other client you are trying to run, you may need to provide more
configuration values.

### User configuration

If you have a user configuration file on your system, it will be read
and merged with any client-specific configuration whenever you start
an SDM or other API client.  In other words, it serves as a base
configuration for all API clients you run on your system.

Run the following command to create and persist a user configuration
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
and workspace ID, respectively.  If you are in multiple Atomist
workspaces and want to run your clients in all of them, simply add all
of their workspace IDs to the `workspaceIds` array in the user
configuration file.

### Environment variable

When running an SDM or other API client on a server, especially when
running in a containerized environment, it is typically better to
provide the necessary configuration using environment variables.  When
a client starts up, it will attempt to parse a JSON-formatted
configuration object from the `ATOMIST_CONFIG` environment variable
and from the file provided by the `ATOMIST_CONFIG_PATH` environment
variable.

For example, to use the `ATOMIST_CONFIG` environment variable to
provide the same configuration as that shown above in the user
configuration section, you could run the following commands to set the
environment variable and start the client.

```
export ATOMIST_CONFIG='{"apiKey":"API_KEY","workspaceIds":["WORKSPACE_ID"]}'
atomist start
```

Similarly, if you created a file with the same contents as that show
above in the user configuration section at `/opt/sdm/sdm-config.json`,
then you tell the API client to load that file by setting the
following environment variable prior to starting the client.

```
export ATOMIST_CONFIG_PATH=/opt/sdm/sdm-config.json
atomist start
```

If both environment variables are defined, their configuration values
are merged with values in the `ATOMIST_CONFIG` environment variable
taking precedence over those defined in the `ATOMIST_CONFIG_PATH`
file.  If the user configuration file also exists, its values are also
merged in with lower precedence than either environment variable.
