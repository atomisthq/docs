Atomist automates activities like project creation and code changes
that operate on code in GitHub repositories.  Atomist also makes it
easy to get relevant, actionable notifications of GitHub activity like
new commits or issues. To enable this, the Atomist GitHub integration
requests the following permissions:

GitHub Scope |	How Atomist Uses It
------|--------
`repo` | Enables Atomist to read and write code in your repositories, and get activity notifications for commits.
`read:org` | Read information about the GitHub organization, like teams and members of the organization.
`admin:repo_hook` | Allows Atomist to configure a webhook on a single repository and start receiving activity alerts.
`admin:org_hook` | Allows Atomist to configure an organization webhook so it may receive activity alerts for all repositories in an organization.

For more information, see [GitHub OAuth Scopes][gh-scopes] documentation.

[gh-scopes]: https://developer.github.com/v3/oauth/#scopes
