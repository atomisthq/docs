Atomist acts as a bot in your Slack team, and can take these actions:

* Listen for messages and commands directed at the bot
* Send notifications in channels that the bot has been invited to
* Send notifications via direct message

When you authorize the Atomist Slack app, it requests the following permissions. For the bot to operate properly, all of these scopes need to be granted.

Slack Scope | How Atomist Uses It
-------------|----------
`bot` | Enables the bot to hear and respond to channel activity, such as certain bot commands and events.
`identify` | Used to confirm your identity so that the bot knows who to address.
`channels:read` |  Allows the bot to list channels in the team.
`channels:write` | Enables the bot to create channels and write messages to channels. For example, when you create a new project with Atomist, the bot can create a channel that will be associated with the repo.
`im:read` | Allows the bot to list direct message channels associated with the bot users. Sometimes Atomist communicates with users via direct message.
`team:read` | Lets Atomist know basic information about the Slack team, like its ID, name, domain.
`im:write` | Send direct messages to other users in the Slack team.


For more information, see the [Slack bot users][bot-users] documentation.

[bot-users]: https://api.slack.com/bot-users
