Your software delivery machine is a service that runs automations in response to events
like pushes and builds. See [architecture][] for a high-level view.

The SDM:

* is **event driven**: the SDM performs actions in response to events. The most significant event
is a code push. The response to this event is defined by [goals](goal.md). The response to
other events (repository or issue creation, for instance) is defined by [listeners](event.md).
* uses **common APIs** across different automation scenarios. These let you write the important code
specifying what you want to do, while calling APIs for the common work. For instance, the [Project](project.md) API lets
you inspect and update the repository contents.

Your SDM is in TypeScript.
Start with our code and add what you choose.

[architecture]: architecture.md (Atomist SDM Architecture)
[local]: local.md (Atomist SDM Local Mode)
[team]: team.md (Atomist SDM Team Mode)

This section documents creating, building, and running an SDM,
and details the
structure and organization of a typical SDM project.

To get started in [local mode][local], make sure you have:

* [Git][]
* [Node.js][prereq-install-node]
* [the Atomist CLI][prereq-install-cli]

Before you run in [team mode][team], you'll need the [prerequisites][prereq-prereq] page.

This page will help you:

* create an SDM project
* spin up your SDM
* know where to add functionality to your SDM

[git]: https://git-scm.com/downloads  (Install Git)
[prereq-prereq]: ../developer/prerequisites.md (Atomist Automation Prerequisites)
[prereq-install-node]: ../developer/prerequisites.md#nodejs (Install Node.js)
[prereq-install-cli]: ../developer/prerequisites.md#atomist-cli (Install the Atomist CLI)
[quick-start]: ../quick-start.md (Developer Quick Start)

For the quickest path to seeing an SDM do something, use the [Quick Start][quick-start] instead.

## Creating an SDM project

The [Atomist CLI][cli] will generate a starter SDM for you.

```
atomist create sdm
```

For "Type of SDM to create, "Choose "blank" to start with an empty SDM, or "spring" to start with
an SDM that does useful things for Java Spring services.

For "name of the target repository" enter a name for your SDM.

For "target-owner" enter a name for the owner of your project. This corresponds to the
GitHub/GitLab organization or BitBucket project you would put the repository under.

The "create sdm" [generator](create.md#generator) will transform the [seed][] according
to your answers. Because this generator operates in local mode, it will create a project on your
filesystem.

Look in $HOME/atomist/_target-owner_/_name_ for the new SDM.

[sdm-core]: https://github.com/atomist/sdm-core (Atomist SDM - TypeScript)
[ts]: https://www.typescriptlang.org/ (TypeScript)
[gql]: http://graphql.org/ (GraphQL)
[seed]: https://github.com/atomist-seeds/empty-sdm (Blank SDM Seed Project)

### GitHub

If you prefer the manual route, you can always fork the [empty-sdm][seed]
project on GitHub.

## Looking at the code

You can use whatever editor or IDE you like. We recommend [VSCode][] because
it is built for TypeScript (among other languages), it's a good IDE, and it's free.
With TypeScript and an IDE like VSCode, you get autocompletion that helps you discover
functionality in the SDM framework.

Run `npm install` first so that your IDE will see library code. In Node, all dependencies
are stored within the project, under the directory `node_modules`. `npm` is the dependency manager
that gets them there. The node_modules directory is listed in `.gitignore`, so it won't be committed.

### index.ts

Start your inquiry in `index.ts`.  When an SDM starts up, it looks here to find its configuration.
The `configuration` object has opportunities for many, many configuration options. Click into the Configuration type
or check the [API Docs][configuration-api-doc] if you're curious.

The important part, where you're going to add to your personal SDM, is the function passed to `configureSdm` in `configuration.postProcessors`.
Unless you change it, that function is called `machine`.

## machine.ts

Click into the `machine` function in your IDE, or open `lib/machine/machine.ts` to find it.
This function instantiates
and then returns a SoftwareDeliveryMachine([API docs][sdm-api-doc]).

Inside this function, add functionality to your SDM. You can:

* Add [Goals](goal.md) to choose a flow to respond to code push
* Add listeners to various other [events](event.md)
* Add [commands](commands.md)
* Add [project generators](create.md)
* Bring in [extension packs](../pack/index.md)

[sdm-api-doc]: https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html (API Docs for SoftwareDeliveryMachine)
[configuration-api-doc]: https://atomist.github.io/automation-client/interfaces/_lib_configuration_.configuration.html (API Docs for Configuration type)
[vscode]: https://code.visualstudio.com/ (VS Code IDE)

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
SDM locally, you can use the standard npm `start`
command.

```
npm start
```

If you are writing your own SDMs, you probably want a more
responsive testing environment, having the client restart any time you
make changes to the source code.  This development
flow is available with the `autostart` command.

```
npm run autostart
```

When you deploy your SDM to production, check the recommendations under [Deploying your SDM][prod].

[prod]: sdm-deploy.md#production (SDM Production Deployment Considerations)

## Stop

Control-C will stop the client.  Restart it after code changes with
`atomist start` again.

## Project structure

SDM projects are organized and behave like any standard
TypeScript project.

### package.json

The `package.json` file defines the metadata and dependencies for the
project.  In addition, this file defines the standard "npm package
scripts", i.e., `npm run` commands, typically available in Node.js
projects.  Here's a summary of the npm package scripts available in
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

#### index.ts

This is the starting point when you want to look at
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
defined in the `package.json` and installed by npm.

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

<!--
## Next steps

Proceed to [add some functionality][add-functionality] to your SDM.

[add-functionality]: where??
-->

[mocha]: https://mochajs.org/ (Mocha)
[power-assert]: https://github.com/power-assert-js/power-assert#readme (power-assert)
[cli]: cli.md (Atomist command-line utility)
