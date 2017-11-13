You interact with the Atomist development automation API via a
client [WebSocket][ws] connection.  WebSocket connections are
persistent, providing bidirectional communication between the client
and the API.  As such, the client process is a persistent process with
a lifecycle that is more like a traditional _server_ process.  This
section documents building and running an automation client and
discusses each part of the client lifecycle.

Before you can build and run your own automation client,
{!prereq-items.md!}

[ws]: https://en.wikipedia.org/wiki/WebSocket (WebSocket)

## Building a client

Most automation client projects are written in [TypeScript][ts] and
run on [Node.js][node].  Building an automation client is the same as
any standard TypeScript or JavaScript project.  First you install the
project's dependencies

```
npm install
```

then build the project, linting the TypeScript, compiling the
TypeScript into JavaScript, generating other required files, and
running tests.

```
npm run build
```

[ts]: https://www.typescriptlang.org/ (TypeScript)
[node]: https://nodejs.org/en/ (Node.js)

## Client configuration

The automation client will use the configuration you created when you
ran `atomist config` as part of the [prerequisites][atomist-config].
The configuration file, typically located under your home/user profile
directory at `.atomist/client.config.json`.  It is a standard JSON
file that will look something like:

```json
{
  "token": "abcdef0123456789abcdef0123456789abcdef01",
  "teamIds": [
    "TK421WAYA",
  ]
}
```

The `token` is your GitHub personal access token and the `teamIds` are
the Slack teams where you want to run your automations.  If you want
to change the token or add/remove teams, you can just edit this file
directly.  Remember, whatever token you use, it must have at
least [_read:org_ scope][scope].

If you are managing several automation client projects for different
teams, you can override your user-level configuration using the
project-level configuration in each project, typically located at
`src/atomist.config.ts`.  A typical project configuration file will
look like this:

```typescript
import { Configuration } from "@atomist/automation-client/configuration";
import * as appRoot from "app-root-path";

// tslint:disable-next-line:no-var-requires
const pj = require(`${appRoot}/package.json`);

const token = process.env.GITHUB_TOKEN;

export const configuration: Configuration = {
    name: pj.name,
    version: pj.version,
    teamIds: [],
    token,
};
```

If the `teamIds` array exists and its length is greater than zero (0),
the value in the project configuration will be used.  If the
environment variable `GITHUB_TOKEN` exists and has non-zero length, it
will be used.  For more complex configurations, e.g., different teams
and tokens for different environments, you can use the [config][]
Node.js package to supply values for `teamIds` and `token`.

By default, all automations in your project will be registered with
the automation API when the client starts up
(see [lifecycle][lifecycle]).  If you only want a subset of your
automations active, you can explicitly list them using the `commands`
and `events` arrays in the `configuration` object:

```typescript
import { HelloWorld } from "./commands/HelloWorld";
import { NotifyOnPush } from "./events/NotifyOnPush";

export const configuration: Configuration = {
    name: pj.name,
    version: pj.version,
    teamIds: [],
    token,
    commands: [
        HelloWorld,
    ],
    events: [
        NotifyOnPush,
    ],
};
```

[scope]: https://developer.github.com/changes/2014-02-25-organization-oauth-scopes/ (GitHub Token Scopes)
[config]: https://www.npmjs.com/package/config (config Node.js package)
[lifecycle]: #client-lifecycle (Atomist Automation Client Lifecycle)

## Starting a client

There are a few different ways to start the automation client,
depending on how you are running it.  If you are running the
automation client locally, you can use the standard NPM `start`
command.

```
npm start
```

If you are writing your own automations, you probably want a more
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
    --always_compact --max_old_space_size=384 node_modules/.bin/atomist-client
```

See `node --help` and `node --v8-options` for more detail on these
options.

## Client lifecycle

The automation client lifecycle will be familiar to those developing
persistent applications.

1.  **Authentication** - When the automation client starts up, it
    connects to the automation API and authenticates using
    the [GitHub personal access token][token] you have provided in
    your client configuration file.  This token has _read:org_ scope,
    allowing the automation API to establish who you are and your
    GitHub organization memberships.

2.  **Registration** - Once your identity has been established, the
    client registers its automations, i.e., the bot commands it
    provides and the events it wants to receive, with the Slack teams
    specified in your client configuration.  If Atomist does not
    recognize your Slack team or your GitHub identity is not connected
    to any member of that Slack team, registration will fail and the
    client will exit with an unsuccessful status.

3.  **Listening** - After authentication and registration is completed
    successfully, the WebSocket connection is established and the
    client begins listening for incoming messages from the API: bot
    commands and events fired.

4.  **Shutdown** - When the client receives a shutdown signal,
    typically `SIGINT` delivered by the PaaS or `Ctrl-C`, it
    de-registers with the API and gracefully shuts down.

[token]: prerequisites.md#github-token
