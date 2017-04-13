Atomist uses Rug event handlers to listen to changes in your
development systems and respond to them.  Each handler is associated
with specific events and when a matching event occurs, Atomist
executes the event handler on that event.  A single event can trigger
many event handlers.  In this example, you will create an event
handler that sends a message to a GitHub repository's Slack channel
when an issue in that repository is closed.

## Create a Rug project

The first thing you need is a project for your Rug event handler code.
Although you can add Atomist Rug code to any existing project by
simply adding a `.atomist` directory and a few supporting files, here
you'll use the preferred, faster, and less error prone method: using a
generator.

Ask the Atomist Bot to list the Rug generators by sending it the
following message.

```
@atomist generators rug
```

You will see the following generators.

<div class="ss-container">
  <img src="../images/rug-generators.png" alt="Rug generators" class="ss-medium">
</div>

Select the "NewStarterRugProject" generator by clicking its "Create
project" button and enter a name for the project when prompted by the
Atomist Bot in the thread.

<div class="ss-container">
  <img src="../images/generate-starter-rug-project-thread.png" alt="Generate starter Rug project thread" class="ss-small">
</div>

After entering the name for the project, click on "Generate project"
in the project generation summary:

<div class="ss-container">
  <img src="../images/generate-starter-rug-project-summary.png" alt="Generate starter Rug project summary" class="ss-small">
</div>

Atomist will then create the project your GitHub organization.

<div class="ss-container">
  <img src="../images/new-handlers-project-created.png" alt="New handlers project created message" class="ss-medium">
</div>

Atomist will also create a Slack channel in your team Slack for the
repository.  The repository and channel will be connected, so when you
join the new channel, you will see the initial commit made by the
project generator.

<div class="ss-container">
  <img src="../images/handlers-slack-channel-created.png" alt="Handlers Slack channel initialized" class="ss-medium">
</div>

!!! caution ""
    If you are working through these steps in
    the [Atomist Community Slack][community], the new repository will
    be created under your personal GitHub account and the Atomist Bot
    will *not* create a Slack channel for the repository.

[community]: https://join.atomist.com/

Clone your new Rug project locally, just like you would and GitHub
project.  The project will have contents like the following.

<div class="ss-container">
  <img src="../images/rug-project-tree.png" alt="Starter Rug Project Directory Tree" class="ss-small">
</div>

Rugs are under the `.atomist` directory.  The `manifest.yml` file
contains metadata about the Rug project including the archive name,
group, version, and Rug API version dependency.  There are different
subdirectories for editors, handlers, and tests.  This starter Rug
project has a sample editor, command handler, event handler, and tests
for each.  It's a good idea at this point to edit the manifest file,
changing the group value to be the name of your GitHub organization.

## Install the Rug CLI

When developing Rugs, the Rug CLI enables you to compile, test, and
publish your Rugs locally.  So before you start writing Rugs, you
should [install the Rug CLI][cli-install].

[cli-install]: /user-guide/interfaces/cli/install.md (Rug CLI Install)

Now it's time to write your new handler.

## Write your handler

Rather than editing the sample event handler provided in the starter
Rug project, let's avoid any copy/edit errors by using an editor to
add your event handler.  Since you've already run Rugs in Slack and
just installed the Rug CLI, this time you will see what running an
editor in the Rug CLI looks like.  You will add an event handler
called "CloseIssueThanks" with the following command.

```console
$ rug edit atomist-rugs:rug-editors:AddTypeScriptEventHandler \
    handlerName=CloseIssueThanks \
    description="simple event handler that sends a thank you message" \
    pathExpression="/Issue()"
```

This editor will create files for your event handler and its
associated test.  The path expression you provide is the piece of
information that matches incoming events to event handlers.  In this
example, you are matching against all events related to GitHub Issues.

Rugs are most often written in [TypeScript][ts], which is an superset
of JavaScript that introduces strong typing and transpiles into
JavaScript.  To fully benefit from the TypeScript development process,
you should install [Node.js][node], which also installs the `npm`
utility.  Once `npm` is available on your system, you can install
TypeScript tools and the [yarn][] package manager with the following
command.

```console
$ npm install -g yarn typescript tslint
```

Once you have those tools installed, change into the `.atomist`
directory of your Rug project and install the project's TypeScript
dependencies using yarn.

```console
$ cd .atomist
$ yarn install
```

<div class="ss-container">
  <img src="../images/yarn-install.png" alt="Install TypeScript Dependencies with yarn" class="ss-small">
</div>

[ts]: https://www.typescriptlang.org/ (TypeScript)
[node]: https://nodejs.org/ (Node.js)
[yarn]: https://yarnpkg.com/en/ (Yarn Package Manager)

!!! tip "TypeScript Development"
    If you do not have a TypeScript development environment set up, we
    recommend using [Visual Studio Code][vs-code].

[vs-code]: https://code.visualstudio.com/ (Visual Studio Code)

With your tooling and dependencies installed, you can begin developing
your Rug event handler.  Following good test-driven development (TDD)
practices, you will first update your tests to check for the proper
behavior.  You can write unit tests as you typically would when
developing TypeScript or JavaScript, for example using [Mocha][mocha].
In addition, Rug development
supports [behavior-driven development (BDD)][bdd] testing
using [Gherkin][gherkin].  This example will focus on BDD testing.

[mocha]: https://mochajs.org/ (Mocha Testing Framework)
[bdd]: https://en.wikipedia.org/wiki/Behavior-driven_development (Behavior-Driven Development)
[gherkin]: https://cucumber.io/docs/reference (Gherkin Testing)

Open the sample feature file created by the editor you ran above in
your preferred editor.  It will be located at
`.atomist/tests/handlers/event/CloseIssueThanksTest.feature`.  Edit
the file to have the following contents and save it.

```gherkin
{!../../.atomist/tests/handlers/event/CloseIssueThanksTest.feature!}
```

Here you describe the general *feature* and provide two *scenarios*.
The first is a positive test: you should send a message when an issue
is closed.  The second is a negative test: you should not do anything
if the issue is not closed.

You now must implement the above "steps", i.e., the "Given", "When",
and "Then" in the above feature file.  These steps are implemented
using TypeScript in the
`.atomist/tests/handlers/event/CloseIssueThanksSteps.ts` file.  Open
that file in your editor and edit the file to have the following
contents.

```typescript
{!../../.atomist/tests/handlers/event/CloseIssueThanksSteps.ts!}
```

You can see an implementation of each of the steps referenced in the
feature file.  The text after each of the `#!gherkin Given`,
`#!gherkin When`, and `#!gherkin Then` steps is supplied as the first
argument to the corresponding step implementation in TypeScript.  The
second argument for each step is an anonymous function, or callback,
that implements the step.  The `#!typescript Given` function registers
your new event handler.  The `#!typescript When` steps send an issue
event.  The first one fires an event about a closed issue,
`#!typescript withState("closed")`, and the second one fires an event
about an open issue.  Both `#!typescript When` steps ensure the issue
has a number and assignee, since those pieces of information will be
needed by your handler.  Finally, the `#!typescript Then` steps test
the result of executing the handler.  In the first you assert that the
message returned is what is expected, and in the second you assert
that there were no messages sent.

Now let's run your tests.  You can run the tests directly using the
Rug CLI or with the standard `yarn test` command.  You'll use the Rug
CLI in this example and only run the tests for this handler by passing
the name (not full path) of the feature file as a command-line
argument.

<div class="ss-container">
  <img src="../images/rug-failing-tests.png" alt="TDD Rug failing tests" class="ss-large">
</div>

Excellent, both of the tests our failing!  Now it's time to implement
the feature and get those tests passing.  Open the event handler,
`.atomist/handlers/event/CloseIssueThanks.ts`, in your preferred
editor and change the contents to be the following.

```typescript
{!../../.atomist/handlers/event/CloseIssueThanks.ts!}
```

The editor you ran to add the new event handler to your project
provided all the boilerplate for the handler, so you just need to
focus on the event-handling logic in the `#!typescript handle` method.
Because of the third argument in the `#!typescript @EventHandler`
annotation, `#!typescript "/Issue()"`, this handler will only be fired
when events about issues occur.  Inside the `#!typescript handle`
method, you have added a conditional on the state of the matched issue
such that if the issue is not in a closed state, your handler will
return an empty plan, i.e., essentially a no-op.  If the issue is
closed, you construct a "thank you" message for each of the assignees
and each channel the repository is connected to and add them to the
plan.

With the code in place, let's try to run the tests again.

<div class="ss-container">
  <img src="../images/rug-passing-tests.png" alt="TDD Rug passing tests" class="ss-large">
</div>

Success!  Now it's time to publish your new handler, making it
available in chat for everyone on your team.

## Publish your handler

To make Atomist aware of your new handler, you need to publish the
handler project.  This is often done via continuous integration, but
for this tutorial you're going to see how it's done manually using the
Rug CLI.

### Configure the Rug CLI

To publish Rugs, you need to configure the Rug CLI with the
credentials it needs to push your Rug project archive to Atomist.  The
first step in configuring credentials for publishing is to log in to
Atomist using the `rug repositories login` command.  You will be
prompted for your GitHub user credentials.

```console
$ rug repositories login


The Rug CLI needs your GitHub login to identify you.

The command will create a GitHub Personal Access Token with scope "read:org"
which you can revoke any time on https://github.com/settings/tokens.  Your
password will not be displayed or stored. Your sensitive information will not
be sent to Atomist; only to api.github.com.

  → Username : .....
  → Password : .....

  Please provide a MFA code
  → MFA code : .....

Successfully logged in to GitHub and stored token in ~/.atomist/cli.yml
```

!!! important ""
    No passwords are stored, only a unique personal access token with
    "read:org" scope.

!!! note "Two-Factor Authentication"
    If your GitHub account is configured to use two-factor
    authentication, you will be prompted for the MFA code as shown
    above.

Once you are logged in, you can run the `rug repositories configure`
to save your publishing configuration to your Rug CLI configuration
file.

```console
$ rug repositories configure

→ Repositories
  <unique identifier of your team's repository>
    <your unique team's repository url here>
```

You're now all set to publish your handlers project.

### Publishing

You use the Rug CLI `publish` command to publish a Rug project archive
to Atomist.  You execute the `rug publish` command from the root of
the handlers project directory:

```console
$ rug publish
Resolving dependencies for yourorg:handlers:0.1.0 ← local completed
Invoking TypeScript Compiler on .ts files
  Created .atomist/handlers/CloseIssueThanksHandler.js.map
  Created .atomist/handlers/CloseIssueThanksHandler.js
Processing script sources completed
Loading yourorg:handlers:0.1.0 ← local into runtime completed
  Created META-INF/maven/yourorg/handlers/pom.xml
  Created .atomist/manifest.yml
  Created .atomist/metadata.json
Generating archive metadata completed
  Uploading yourorg/handlers/0.1.0/handlers-0.1.0.zip → slackteam (186 kb) succeeded
  Uploading yourorg/handlers/0.1.0/handlers-0.1.0.pom → slackteam (927 bytes) succeeded
  Uploading yourorg/handlers/0.1.0/handlers-0.1.0-metadata.json → slackteam (762 bytes) succeeded
  Downloading yourorg/handlers/maven-metadata.xml ← slackteam (382 bytes) succeeded
  Uploading yourorg/handlers/maven-metadata.xml → slackteam (334 bytes) succeeded
Publishing archive into remote repository completed

→ Archive
  ~/workspace/handlers/.atomist/target/handlers-0.1.0.zip (186 kb in 165 files)

→ URL
  https://atomist.jfrog.io/atomist/SLACKTEAM/yourorg/handlers/0.1.0/handlers-0.1.0.zip

Successfully published archive for yourorg:handlers:0.1.0
```

Your new handler will now be triggered when issue events occur in your
environment.  To test that everything has published correctly, you can
execute `rug search` and you should see your Rug archive listed in the
output.

```console
$ rug search
Searching https://api.atomist.com/catalog
Searching catalogs completed

→ Remote Archives (38 archives found)
yourorg:handlers [private] (0.1.0)
...
```

!!! warning ""
    Due to caching, it may take up to five minutes for your handler to
    become operational in your environment.

## Your handler in action

Now that you have published your `#!typescript CloseIssueThanks` event
handler, let's see what it looks like in chat.  Head back to the
`#sprocket` channel and you should see a button to `Close` the issue
you created earlier.

<div class="ss-container">
  <img src="../images/new-comment-notification-in-slack.png" alt="New comment notification in Slack" class="ss-medium">
</div>

Click the `Close` button, or you can close it using the GitHub web UI
if you prefer, and several things will happen.  First, the Atomist Bot
will indicate with a message that the issue has been edited:

<div class="ss-container">
  <img src="../images/close-issue-edited-response.png" alt="Issue edited response" class="ss-medium">
</div>

then the panel for the issue in Slack will be updated with a `Reopen`
button:

<div class="ss-container">
  <img src="../images/reopen-button-displayed.png" alt="Reopen issue displayed" class="ss-small">
</div>

and finally your new handler will be invoked and the "thanks" message
will be displayed!

<!-- TODO correct the screen shot once the handler is working -->
<div class="ss-container">
  <img src="../images/new-handler-message-displayed.png" alt="New handler thank-you message displayed" class="ss-medium">
</div>

There, you did it!  You just created your own custom development
automation using Atomist!
