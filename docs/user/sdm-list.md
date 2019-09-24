Find out what software delivery machines (SDMs) are running in your workspace through the [dashboard](dashboard.md).

Click on the SDM symbol on the left nav.

<!-- TODO can everyone see this? -->

## SDMs

All SDMs that are registered to receive events for your workspace are listed here. SDMs with a globe symbol are global; they run in Atomist's service for each workspace, including yours.

If your SDM is running and registered with the Atomist service (whether on your laptop or in your infrastructure), you'll find it here.

Click on an SDM to see details of the commands and events it responds to.

## Events

For troubleshooting, you can see a low-level flow of raw events here.

## Web command line

This is a place to type commands. It works like typing "@atomist ..." in chat, but without as much feedback.
 Unlike chat, this interface supports tab-completion.

Try:

* `ls` lists contexts you can move into; you can descend into an organization and then repository.
* `cd` into an organization, and then `cd` into a repository. Now Atomist has context for your command.
* type a letter and push tab. This gives you a list of commands you can type.
* enter one of the listed commands plus `-h` to see the parameters you could pass.

For instance, you can use this command-line interface to restart all the goals on your last commit:

* `cd` into the owner/repo of your repository
* type `plan goals ` and push `tab` to see the SDMs that are available. Then complete the command with the name of the SDM that runs goals on this repository for you.
* To see that the goals started over, check the [Workspace Home](#workspace-home) page, and filter for your repository.

Currently this interface doesn't provide the output of the commands. Any messages sent by the command appear as notifications at the top the web application.