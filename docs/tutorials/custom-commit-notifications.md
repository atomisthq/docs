There is a constant flow of activity on any active project. Issues are opened and commented on,
commits are pushed, builds are started, they fail or succeed. Atomist notifies about all of
these activities in a Slack channel by default. You can also create your own custom automated
actions based on these activities.

!!! tip "Prerequisites"
    For this tutorial, you will need:

    * A [Rug project][ugpj] to work in. If you have not yet created a Rug project or would like to build the tutorial in a new Rug project, see [Creating a new Rug Project][createrug].
    * Rug CLI installed. See the Rug CLI [Installation][cli-install] and [Basics][cli-basics] sections of the user guide for instructions on setting up and configuring the Rug CLI on your system.

[rugev]: /user-guide/rug/handlers.md
[ugpj]: /user-guide/rug/projects.md
[rugeditor]: https://github.com/atomist/rug-editors#addtypescripteventhandler
[createrug]: /tutorials/create-rug-project.md
[cli-install]: /user-guide/interfaces/cli/install.md
[cli-basics]: /user-guide/interfaces/cli/basics.md

## Message Me on Commits

Imagine that you are the onboarding partner for a new developer in your
team and want to know about commits they push so that you can
provide input and help where needed as they ramp up.

Let's write a script that will notify in a direct message when commits are pushed by
your new teammate. To achieve this, you will add a [Rug event handler][rugev] to your
Rug project. Once you have created and [published][ugpub], it will
be triggered and run on push events.

[ugpub]: /user-guide/rug/lifecycle.md#publishing

Here is the TypeScript code for a handler that does this.

```typescript linenums="1" hl_lines="11 22"
{!../../.atomist/handlers/event/NewCommitPushedToDM.ts!}
```

An event handler gets triggered based on the event it is interested in. This
is done in Rug via its [path expression][ugpxe] on line 10. Notice in particular how the handler
filters only commits made by a given author on line 11 (here, Alice's commits).
Finally, line 12 asks Atomist to also feed the handler with the commits
repository details. Once it gets called, the handler builds a direct message to send to the Slack
user in line 22.

[ugpxe]: /user-guide/rug/path-expressions.md

## Customize the Handler

If you do not yet have a local clone or your Rug project repository, clone it now.

Next, add the code example above into a new file called `NewCommitPushedToDM.ts` in the
`.atomist/handlers/event` directory of the local repo for your Rug project
like so:

```console
atomist-tutorials $ curl \
'https://raw.githubusercontent.com/atomist/end-user-documentation/master/.atomist/handlers/event/NewCommitPushedToDM.ts' \
-o .atomist/handlers/event/NewCommitPushedToDM.ts
```

Fire up your favorite editor and change the code to match on the actual GitHub
user you want push notifications for (line 11), and your Slack user name (line 22).
For example, in my case, I want to see notifications for pushes by GitHub user
`fauxryan` sent to my Slack user `jrday`, so my edited version of `NewCommitPushedToDM.ts`
looks like this.

```typescript linenums="1" hl_lines="11 22"
{!../../.atomist/handlers/event/NewCommitPushedToDM_Modified.ts!}
```

## Publish the New Handler

With your local Rug CLI [installed, up-to-date][cli-install], and [configured][cli-basics] you are ready to publish
the updated Rug project with your new handler.

From within your Rug project directory:

```console
$ cd .atomist
$ npm install
/atomist-tutorials/.atomist
└─┬ @atomist/rugs@0.24.3
  ├── @atomist/cortex@0.31.0
  ├── @atomist/rug@0.25.1
  └── mustache@2.3.0

npm WARN .atomist No description
npm WARN .atomist No repository field.
npm WARN .atomist No license field.
```

Your specific output may vary. This step installs dependencies needed for your Rug project.

```console
$ rug publish
