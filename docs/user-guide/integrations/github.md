<img style="float:right; margin-top:0px; margin-right:0px; margin-bottom:10px; margin-left:10px;" src="../images/github-logo.png" height="100px" width="100px" alt="GitHub logo"/>

[GitHub.com][github] provides a central repository for source code and
also issue tracking.  The Atomist GitHub OAuth application must be
authorized into your GitHub organization.  After authorization,
Atomist will add the Atomist webhook to your organization so it can
begin to collect events.  When webhook data are posted to the Atomist
webhook endpoint, it is ingested into the system and appropriate
actions are taken.

So that Atomist may take action on behalf of a user when that user
asks it to do something, e.g., create a repository or comment on an
issue, the Atomist GitHub application must also be authorized for each
user account in the organization.  After authorization, Atomist will
create a personal access token with the needed scopes.

The Getting Started guide takes you through the process
of [authorizing Atomist][auth] in your GitHub organization and each
team member's GitHub user.

[github]: https://github.com/ (GitHub)
[auth]: /getting-started/github.md (Atomist and GitHub.com)
