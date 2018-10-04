The software delivery machine is a service that runs automations in response to events
like pushes and builds. See [architecture][] for a high-level view.

[architecture]: architecture.md (Atomist SDM Architecture)

This section documents creating, building, and running an SDM,
discusses each part of the SDM lifecycle, and details the
structure and organization of a typical SDM project.

Before you can build and run your own SDM,
be sure someone in your Slack workspace has completed
the [setup][prereq-setup] and you have satisfied
the [prerequisites][prereq-prereq].  Specifically, be sure you have

-   [Added the Atomist bot the your Slack workspace][prereq-add-slack]
-   [Authorized Atomist to access GitHub][prereq-auth-github]
-   [Installed Node.js][prereq-install-node]
-   [Installed the Atomist CLI][prereq-install-cli]
-   [Run `atomist config`][prereq-atomist-config]

[prereq-setup]: ../user/index.md (Atomist Setup)
[prereq-prereq]: ../developer/prerequisites.md (Atomist Automation Prerequisites)
[prereq-add-slack]: ../user/slack.md (Add Atomist to Slack)
[prereq-auth-github]: ../user/github.md (Authorize Atomist in GitHub)
[prereq-install-node]: ../developer/prerequisites.md#nodejs (Install Node.js)
[prereq-install-cli]: ../developer/prerequisites.md#atomist-cli (Install the Atomist CLI)
[prereq-atomist-config]: ../developer/prerequisites.md#configure (Configure Atomist)


## Creating an SDM project

There are a few ways to create a new SDM project.  We
suggest using the [blank-sdm][seed] project as a seed for
your project. You can do this locally with the Atomist CLI:

```
atomist create sdm
```

Choose "blank" to start with an empty SDM, or "spring" to start with
an SDM that does useful things for Java Spring services.

[sdm-core]: https://github.com/atomist/sdm-core (Atomist SDM - TypeScript)
[ts]: https://www.typescriptlang.org/ (TypeScript)
[gql]: http://graphql.org/ (GraphQL)
[seed]: https://github.com/atomist/blank-sdm-seed (Blank SDM Seed Project)

### Slack

If you use the Atomist service and Slack integration,
you can create your very own SDM project using the
Atomist bot. This will make a repository in your version control (GitHub, BitBucket, or GitLab).
 You can run this bot command with the following message to the
Atomist bot:

```
@atomist create sdm
```

The bot will ask you where you want to create it and what you want to
name it. Once creation is complete, the bot will tell you where you can find
it.

### GitHub

If you prefer the manual route, fixing up the project metadata
yourself, you can always just fork the [blank-sdm][seed]
project on GitHub.

## Building an SDM

SDM projects are written in [TypeScript][ts] and
run on [Node.js][node].  Building an SDM is the same as
any standard TypeScript or JavaScript project.  First you install the
project's dependencies:

```
npm install
```

then build the project, linting the TypeScript, compiling the
TypeScript into JavaScript, generating other required files, and
running tests:

```
npm run build
```

[node]: https://nodejs.org/en/ (Node.js)

## Starting an SDM

There are a few different ways to start the SDM,
depending on how you are running it.  If you are running the
SDM locally, you can use the standard NPM `start`
command.

```
npm start
```

If you are writing your own SDMs, you probably want a more
responsive testing environment, having the client restart any time you
make changes to the source code.  This fairly standard development
flow is available with the `autostart` command.

```
npm run autostart
```

When running in a production environment, you typically want to avoid
NPM and run Node.js directly to ensure signals get delivered properly
and you can provide guidance to Node.js's memory management subsystem.
Here's an example startup command for production environments:

```
node $NODE_DEBUG_OPTION --trace-warnings --expose_gc --optimize_for_size \
    --always_compact --max_old_space_size=384 node_modules/.bin/atomist start
```

See `node --help` and `node --v8-options` for more detail on these
options.

## SDM process lifecycle

The SDM lifecycle will be familiar to those developing
persistent applications.

1.  **Authentication** - When the SDM starts up, it
    connects to the Atomist API and authenticates using the API key
    you have provided in your configuration file.

2.  **Registration** - Once your identity has been established, the
    client registers its automations, i.e., the bot commands it
    provides and the events it wants to receive, with the Atomist
    workspaces specified in your configuration.  If Atomist
    does not recognize your workspace ID or the provided API key is
    not connected to any member of that workspace, registration will
    fail and the SDM will exit with an unsuccessful status.

3.  **Listening** - After authentication and registration is completed
    successfully, the WebSocket connection is established and the
    client begins listening for incoming messages from the API: bot
    commands and events fired.

4.  **Shutdown** - When the client receives a shutdown signal,
    typically `SIGINT` delivered by the PaaS or `Ctrl-C`, it
    de-registers with the API and gracefully shuts down.

## SDM state

An SDM, once registered, will continue to receive all the events it
has subscribed to until shuts down or one of the following scenarios
occurs.

### Multiple identical SDMs register

If another client with the same name and version (typically obtained
from the `package.json` "name" and "version" properties) registers,
then all of the registered identical SDMs will receive the events
in a round-robin fashion.  Each event will only be sent to one of the
identical SDMs.  This allows you to horizontally scale.

### A different version registers

If another SDM having the same name but different version
registers, it will begin receiving all of the events for the client
and any previously registered versions cease receiving events.  Note
that no version comparisons are done: the _last registration wins_.

If the new client has registered with a policy of "ephemeral" and the
prior client was registered with a policy of "durable", then when the
new client shuts down, events again be sent to the "durable"
registration clients.

The reason for this logic is to allow for production, testing, and
local use to all coexist without taking the same action multiple
times.  For example, if you are running an SDM in production but want
to test something, you can run it locally, steal events for a bit,
kill the local process, and then traffic will return to the production
instance.

If you want the same events to be sent to multiple SDMs, just make
sure the SDMs have different names.

!!! note "Custom Ingestion"
    Any custom ingestion types can only be registered once within an
    Atomist workspace.  Therefore it is recommended to register these
    in a dedicated API client.

## Project structure

SDM projects are organized and behave like any standard
TypeScript project.

### package.json

The `package.json` file defines the metadata and dependencies for the
project.  In addition, this file defines the standard "NPM package
scripts", i.e., `npm run` commands, typically available in Node.js
projects.  Here's a summary of the NPM package scripts available in
most SDM projects.

Command | Description
------- | ------
`npm install` | install all the required packages
`npm run autostart` | run, refreshing when files change
`npm run autotest` | run tests every time files change
`npm run build` | lint, compile, and test
`npm run clean` | remove stray compiled JavaScript files and build directory
`npm run compile` | compile all TypeScript into JavaScript
`npm run lint` | run tslint against the TypeScript
`npm run lint:fix` | run `tslint --fix` against the TypeScript
`npm start` | start the SDM
`npm test` | run tests

### lib

The `lib` directory contains the TypeScript source code.

#### atomist.config.ts

The `lib/atomist.config.ts` file contains project-specific
configuration. This is the starting point when you want to look at
what this SDM might do. 

### lib/graphql

The `graphql` directory contains `.graphql` files defining
your [GraphQL][gql] queries, subscriptions, and mutations.  This
directory is optional, as you can define your GraphQL in strings
within the source code.  That said, it is recommended that you define
your GraphQL in `.graphql` files so you can realize the full benefit
of its type bindings in TypeScript.

#### lib/typings

The `lib/typings` directory contains the auto-generated TypeScript
types for your GraphQL queries, subscriptions, and mutations.

### node_modules

The `node_modules` directory contains all the project dependencies, as
defined in the `package.json` and installed by NPM.

### scripts

The `scripts` directory contains various ancillary scripts.  For
example, this directory might have scripts for building the project on
CI, publishing the project as an Node.js package, and publishing the
project's [TypeDoc][typedoc].

[typedoc]: http://typedoc.org/ (TypeDoc)

### test

The `test` directory contains the automated tests for the project.
Typically these are unit tests written using [mocha][]
and [power-assert][].

[mocha]: https://mochajs.org/ (Mocha)
[power-assert]: https://github.com/power-assert-js/power-assert#readme (power-assert)

<!--
## Debugging with Visual Studio Code
-->

## Stop

Control-C will stop the client.  Restart it after code changes with
`atomist start` again.
