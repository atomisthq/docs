<img style="float:right; margin-top:0px; margin-right:0px; margin-bottom:10px; margin-left:10px;" src="../images/github-logo.png" height="100px" width="100px" alt="GitHub logo"/>

[GitHub.com][github] provides a central repository for source code and
also issue tracking. Once you have [authorised Atomist][auth] to work with GitHub you can detect changes to your repositories, and issues, and surface those into Slack:

<div class="ss-container">
<iframe id="ytplayer" width="560" height="315" src="https://www.youtube.com/embed/ITek6-EPNWc" frameborder="0" loop="1" allowfullscreen></iframe>
</div>

You can comment on GitHub issues in Slack:

<div class="ss-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/QbKECIaNSIc" frameborder="0" loop="1" allowfullscreen></iframe>
</div>

You can even perform full Pull Request workflows where you merge and delete old branches:

<div class="ss-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/0Q4jNjkCv14" frameborder="0" loop="1" allowfullscreen></iframe>
</div>

To enable these features, you need to [authorize the Atomist GitHub OAuth application][auth] for your GitHub organization. Once authorized, Atomist will add the Atomist webhook to your organization so it can
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
