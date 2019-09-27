
Atomist helps you work with GitHub in three ways:

1.  Atomist analyzes the code across your GitHub organization to surface
    aspects that reveal [drift](drift-report.md) and other concerns.
1.  Atomist surfaces your team's development activity, such as pushes,
    pull requests, or issues, in the Atomist web interface in chat.  This
    visibility is enabled via webhooks.
2.  Atomist allows you to take action in your repositories, creating
    issues, merging pull requests, even releasing services to
    production, from the Atomist web interface or in chat.  To release the
    full ChatOps power of Atomist, each user on your team will
    independently authorize Atomist -- this means that your users
    remain within the boundaries of the existing GitHub security
    model.  Atomist acts on _behalf_ of your users, not _instead_ of
    them.

## Enrollment

You need administrative privileges to your GitHub organization to add the Atomist GitHub app.
This starts the flow of events to Atomist.

Initiate GitHub integration, add organizations, and more in the Atomist app: [Settings](dashboard.md#settings) -> Integrations -> GitHub.

## GitHub User Authorization

After the Atomist GitHub app is installed, and [chat is enabled](slack.md), people can ask Atomist to do activities in GitHub on their
behalf. For instance, "@atomist create issue" will open an issue as the person who typed the command.
Pressing the thumbs-up button on a PR notification will add that reaction as the person who pushed the button in chat.

The first time a person asks Atomist to take an action like this, the Atomist bot will send them a DM to request permission.
 This links their GitHub login and chat screen name.