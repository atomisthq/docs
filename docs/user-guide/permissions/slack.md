Atomist acts as a bot in your Slack team, and can take these actions:

*   Listen for messages and commands directed at the bot
*   Send notifications in channels that the bot has been invited to
*   Send notifications via direct message

When you authorize the Atomist Slack app, it requests the following
permissions.  For the bot to operate properly, all of these scopes
must be granted.

Slack Scope | How Atomist Uses It
-------------|----------
[bot][] | Enables the bot to hear and respond to channel activity, such as bot commands and events.
[channels:write][cw] | Enables the bot to create channels and write messages to channels.  For example, when you create a new project with Atomist, the bot can create a channel that will be associated with the project's repository.

[bot]: https://api.slack.com/scopes/bot (Slack bot Scope)
[cw]: https://api.slack.com/scopes/channels:write (Slack channels:write Scope)

For more information, see the [Slack bot users][bot-users] documentation.

[bot-users]: https://api.slack.com/bot-users
