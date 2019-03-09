The Atomist command line is useful for starting SDMs and configuring your connection.

In [local mode][local], the `atomist` command line runs commands in your SDM.

## help

Run `atomist --help` to see a list of options. Since `atomist` can run multi-word commands,
only the first word of each is listed in the help. Drill down by asking for more specific help.

For instance, `atomist --help` yields (among other lines):

        atomist show                    ... 2 commands

To find out what you can show, use `atomist show --help`.

        Commands:
          atomist show sdms    Show connected sdms
          atomist show skills  Show skills

## atomist start

Run your SDM! In your SDM's project directory, `atomist start` will start it up. By default, it
starts in [team mode](team.md). Here are some important options:

*--local* Run in local mode

*--no-compile* By default, `atomist start` will compile the project. Use this option to skip that step.

*--change-dir &gt;dir&lt;* Run an SDM that's in another directory.

After you start an SDM, leave it running in that terminal. The logs print to the screen.

## atomist config

This will prompt you to set up the connection parameters for an SDM in team mode. See [Configuration](prerequisites.md#minimal-configuration) for more.


## Local Mode

These commands are relevant to running SDMs in local mode, along with `atomist start --local`.

### atomist feed

When an SDM runs in local mode, it cannot send messages to people in chat. Instead, it sends them to the *feed*.
The feed is an instance of the Atomist command line (run as `atomist feed`) that stays open listening for messages
from local-mode SDMs and printing them. When you run commands or make commits locally, the feed prints information.

In chat, messages from Atomist can have buttons. The buttons trigger more commands. In the terminal, the feed
gives you URLs instead. Open them (command-click if you're in iTerm2 on a Mac) to "push the button". When the button-links
open in a browser, the browser displays only an acknowledgement; the useful responses to the command show up in the feed again.

### Projects in the Atomist projects root

Local SDMs work with projects in the Atomist projects root (usually `$HOME/atomist/projects`). For an SDM to respond to commits,
these projects also need git hooks installed. Fetch a project with `atomist clone` to get it in the right place with the right
hooks. Or if you've already cloned a project, use `atomist add git hooks` to set up triggering.

#### atomist clone

`atomist clone <git url>`: clone a repository into the right place in the Atomist project root (~/atomist/projects/OWNER/REPO) and install git hooks that send commit events to an SDM running in local mode.

#### atomist add git hooks

In an existing cloned project, this adds git hooks to send commit events to an SDM running in local mode. The project still needs to in the right directory location.

If you already have git hooks, this will add to them. If you didn't have any, this creates the files
in `.git/hooks`.

#### atomist remove git hooks

Remove the git hooks that atomist added, if any.

#### atomist replay post-commit

This sends a notification to any running SDMs about the most recent commit, as if you had just committed it. This is useful if your
SDM was not running when that commit happened. It's also great for testing your SDM repeatedly.



[local]: local.md (Atomist SDM Local Mode)