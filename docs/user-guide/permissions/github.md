Atomist automates activities like project creation and code changes that operate on code in GitHub repos. Atomist also makes it easy to get relevant, actionable notification of GitHub activity like new commits or issues. In order to do that, the Atomist GitHub integration requests the following permissions:

GitHub Scope |	How Atomist Uses It
------|--------
`repo` | Enables Atomist to read and write code in your repos, and get activity notifications for commits.
`read:org` | Read information about the GitHub org, like teams and members of the org.
`admin:repo_hook` | In order to receive activity alerts, Atomist can configure a webhook on the repos of your choice.
`admin:org_hook` | To receive activity alerts for all repos in an org, Atomist can configure an org-level webhook.

For more information, see [GitHub OAuth Scopes][gh-scopes] documentation.

[gh-scopes]: https://developer.github.com/v3/oauth/#scopes
