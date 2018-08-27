When running a Software Delivery Machine (SDM) or lower-level Atomist
API client, you interact with the Atomist API for Software
via a [WebSocket][ws] connection.  WebSocket connections are
persistent, providing bidirectional communication between the client
and the API. The SDM subscribes to events published by the API.
 As such, the SDM is a persistent process with
a lifecycle that is more like a traditional _server_ process.  This
section documents creating, building, and running an SDM,
discusses each part of the SDM lifecycle, and details the
structure and organization of a typical SDM project.

Before you can build and run your own SDM,
{!prereq-items.md!}

[ws]: https://en.wikipedia.org/wiki/WebSocket (WebSocket)

## Creating an SDM project

An Atomist API client project is any project that connects to the
Atomist API for Software.  The reference implementation is the [sdm-core][sdm-core]
library, which is written in [TypeScript][ts]. Any SDM
depends on the @atomist/automation-client library and uses its
interface to connect to the Atomist API.  The combination of
TypeScript and [GraphQL][gql] provides a development
experience with excellent tooling and debugging support.

There are a few ways to create a new SDM project.  We
suggest using the [blank-sdm-seed][seed] project as a seed for
your project. You can do this locally with the Atomist CLI:

```
atomist create sdm
```

[sdm-core]: https://github.com/atomist/sdm-core (Atomist SDM - TypeScript)
[ts]: https://www.typescriptlang.org/ (TypeScript)
[gql]: http://graphql.org/ (GraphQL)
[seed]: https://github.com/atomist/blank-sdm-seed (Blank SDM Seed Project)

### Slack

If you use the Atomist service and Slack integration,
you can create your very own SDM project using the
Atomist bot. This will make a repository in your SCM (GitHub, BitBucket, or GitLab).
 You can run this bot command, which itself is
implemented as a command handler, with the following message to the
Atomist bot:

```
@atomist create sdm
```

The bot will ask you where you want to create it and what you want to
name it. Once creation is complete, the bot will tell you where you can find
it.

### GitHub

If you prefer the manual route, fixing up the project metadata
yourself, you can always just fork the [blank-sdm-seed][seed]
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

## SDM configuration

The SDM will use the configuration you created when you
ran `atomist config` as part of the [prerequisites][prereq].  The
configuration file, typically located under your home/user profile
directory at `.atomist/client.config.json`.  It is a standard JSON
file that will look something like:

```json
{
  "apiKey": "ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789",
  "workspaceIds": [
    "A0421WAYA",
  ]
}
```

The `apiKey` is your Atomist API key and `workspaceIds` are the
Atomist IDs of the workspaces where you want to run your team SDMs.
If you want to change the API key or add/remove workspaces, you can edit this file directly.

If you are managing several SDMs for different
teams, you can override your user-level configuration using the
project-level configuration in each project, typically located at
`src/atomist.config.ts`.  A typical project configuration file will
look like this:

```typescript
import { Configuration } from "@atomist/automation-client/configuration";

export const configuration: Configuration = {
    // configuration you want to override
};
```

The configuration values in the `atomist.config.ts` file will override
those from your user configuration.

[prereq]: prerequisites.md (Atomist SDM Prerequisites)
[config]: https://www.npmjs.com/package/config (config Node.js package)
[lifecycle]: #client-lifecycle (Atomist SDM Lifecycle)

## Starting a client

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
what this SDM might do.  See [SDM Configuration][sdm-config] for more
details.

[sdm-config]: #sdm-configuration (Atomist SDM Configuration)


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
