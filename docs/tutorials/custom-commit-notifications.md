There is a constant flow of activity on any active project. Issues are opened and commented on,
commits are pushed, builds are started, they fail or succeed. Atomist notifies about all of
these activities in a Slack channel by default. You can also create your own custom automated
actions based on these activities.

!!! tip ""
    Completing the [Getting Started][getting-started] steps, [Rug CLI setup][cli-setup], and having a
    [Rug project][create-rug] to publish are prerequisites for this tutorial.

[getting-started]: /getting-started
[cli-setup]: /tutorials/cli-quick-setup
[create-rug]: /tutorials/create-rug-project
[rugev]: /user-guide/rug/handlers.md

## Message Me on Commits

Imagine that you are the onboarding partner for a new developer in your
team and want to know about commits they push so that you can
provide input and help where needed as they ramp up.

Let's write a script that will notify in a direct message when commits are pushed by
your new teammate. To achieve this, you will add a [Rug event handler][rugev] to your
Rug project. Once you have created and [published][publish], it will
be triggered and run on push events.

[publish]: /tutorials/publish-rug-project

Here is the TypeScript code for a handler that does this.

```typescript linenums="1" hl_lines="11 22"
{!../../.atomist/handlers/event/NewCommitPushedToDM.ts!}
```

An event handler gets triggered based on the event it is interested in. This
is done in Rug via its [path expression][ugpxe] on line 10. Notice in particular how the handler
filters only commits made by a given author on line 11 (here, `alice`'s commits).
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

## Publish

Now, publish your updated Rug project with the new handler.

```console
$ rug publish
```

See [Publish a Rug Project][publish] if you need more information on this step.

## Test Notification

!!! caution ""
    Commit must be pushed in a GitHub repository in the organization associated
    with the Atomist Bot in your Slack team. You and the person whose commits you
    want to be notified of must have authorized your GitHub accounts with the
    Atomist Bot with your GitHub. To confirm, message the Bot with `@atomist github`.
    See [Getting Started - Connect Atomist to GitHub][connect-gh] for
    instructions.

[connect-gh]: /getting-started/github/

The handler is now published. You can test the scenario by having your new
teammate push a commit.

<div class="ss-container">
  <img src="../images/commit-change.png" alt="Commit change" class="ss-medium">
</div>

A direct message notification is sent to you in Slack, similar to this.

<div class="ss-container">
  <img src="../images/custom-commit-dm.png" alt="Custom Commit DM" class="ss-large">
</div>

If you do not receive a notification:

* Confirm that the other person's GitHub login and your Slack user name are
correct in your modification of `NewCommitPushedToDM.ts`
* Ensure the GitHub setup noted at the top of this section has been done
* Ask us for help in [atomist-community][atomist-community] Slack team `#support` channel

[atomist-community]: https://join.atomist.com/
