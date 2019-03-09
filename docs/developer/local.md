When you run an SDM in local mode, it operates in the privacy of your laptop.
Everything is open source. This SDM can:

-  *run goals in respond to a commit*
   - the SDM can run your tests in the background
   - deploy locally, and be sure that you're doing manual testing on committed code
   - apply autofixes directly in your repository
   - check code inspections and tell you when you've violated them
-  *execute commands*
   - generate new projects
   - perform transforms on one repository or on many repositories
   - do inspections on one or many repositories

In local mode, events come in from local commits (with git hooks) and from within the SDM.

![Atomist SDM in Local mode](img/sdm-local.png)

## Directory structure

In local mode, an SDM looks for projects on your filesystem. It looks in only one place: the Atomist projects root.
This defaults to `$HOME/atomist/projects`. Override this location by setting an `ATOMIST_ROOT` environment variable
(it'll still expect
a `projects` directory under it), or by providing `local.repositoryOwnerParentDirectory` in your SDM's [configuration](config.md).

Underneath the projects root directory are directories for each project owner (GitHub user or organization; BitBucket project). Underneath each owner directory are all the projects belonging to it. Each project is a directory and a git repository.

## atomist clone

When you run `atomist clone <clone url>`, atomist puts the cloned project under the projects directory, under its owner. It also installs
git hooks so that commits to that project will trigger push events.

## atomist feed

When your SDM is running in local mode in the background, it wants to send you messages. When it hears about a commit
to one of your projects, it sends messages about that. When you run a command with the `atomist` CLI, it sends messages
both to where you ran the command and to the feed.

Type `atomist feed` to start up a terminal-based message receiver.

Some of these messages contain action-links. These correspond to buttons on chat messages. In iTerm2 on Mac, I can Ctrl-click
on these to open them, which triggers my SDM to run the action. It also works to paste the link into the browser.
In the browser, you'll see the JSON response. Check your `atomist feed` window to see messages about the results of the action.

See also:

*  [troubleshooting](troubleshoot.md#atomist-feed)

## Differences from team mode

-  No connection to the Atomist service
-  Push events come from git hooks on each commit
-  Repositories are cloned from the local filesystem
-  Messages go to the terminal running `atomist feed` (and for commands, also where you ran them)
-  Nothing happens in GitHub, only locally
-  Some events are not available. See the list of [listeners](event.md) for the full list.
