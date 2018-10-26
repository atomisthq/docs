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

{!tbd.md!}

## atomist feed

When an SDM runs in local mode, it cannot send messages to people in chat. Instead, it sends them to the *feed*. 
The feed is an instance of the Atomist command line (run as `atomist feed`) that stays open listening for messages
from local-mode SDMs and printing them. When you run commands or make commits locally, the feed prints information.

In chat, messages from Atomist can have buttons. The buttons trigger more commands. In the terminal, the feed 
gives you URLs instead. Open them (command-click if you're in iTerm2 on a Mac) to "push the button". When the button-links
open in a browser, the browser displays only an acknowledgement; the useful responses to the command show up in the feed again.

## 

[local]: local.md (Atomist SDM Local Mode)

{!tbd.md!}