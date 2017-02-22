To help streamline your development flow, Atomist needs access to your
source code. Currently Atomist supports integrating
with [GitHub.com][github].

!!! note ""
    Atomist works with GitHub.com. GitHub Enterprise is not currently supported.

There are two kinds of authorization Atomist asks for to work with
GitHub:

-   **GitHub Account Authorization:** this authorization determines the
    GitHub user account or GitHub organization that Atomist will
    connect to your Slack team.  For example, if you want to receive
    notifications and take actions in your team's primary GitHub
    organization, you should select that organization when authorizing
    Atomist to GitHub.  If you want to use Atomist with your
    individual user account, then you should select your user when
    authorizing Atomist to GitHub.

    !!! hint "Depending on the third-party application access policy in a GitHub organization, you may need to be an Owner of the organization or have to request access to authorize Atomist."

-   **GitHub User Authorization:** this authorization is done so that
    commands and actions you ask the Atomist bot to perform on your
    behalf are carried out as your GitHub user.  For example, if you
    ask the Atomist bot to create a GitHub issue, it needs to be
    authorized to create the issue as you.  Every person in your Slack
    team who wants to ask the Atomist bot to perform actions against
    GitHub will need to authorize their GitHub user in this way.

[github]: https://github.com

### GitHub Account Authorization

This section will walk you through the GitHub account authorization
process.  You can perform these steps in any Slack channel that the
Atomist bot has been invited to, or you can directly message the
Atomist bot.  By default the Atomist bot is named `@atomist` and these
instructions assume that is its name in your Slack team.  If the
Atomist bot has a different user name in your Slack team, address
messages to that user.

First, ask the Atomist bot about your GitHub authorizations.

```
@atomist github
```

If this Slack team does not have a GitHub Account authorized, the
Atomist bot will show a message requesting you to authorize.

<div class="ss-container">
  <img src="../images/github-account-auth.png" alt="GitHub Account Auth Message" class="ss-medium">
</div>

You will see messages for both GitHub account authorization (the first message)  and
GitHub user authorization (the second message). First, let's do the account
authorization. Click on the "Authorize GitHub Account" link in the
message. You will be redirected to the GitHub authorization page in
your browser.

<div class="ss-container">
  <img src="../images/github-account-oauth.png" alt="GitHub Account OAuth" class="ss-medium">
</div>

Click the "Authorize application" button to authorize Atomist and you
will then be redirected back to your Slack team in the browser.

If you are not a member of any GitHub organizations, your GitHub user
account will be automatically selected, and you will not see any
organizations listed.  If you are a member of one or more GitHub
organizations, after authorizing Atomist, you will receive a direct
message in Slack from the Atomist bot asking whether to use your
GitHub user account or one of your organizations as the GitHub account
to associate with Atomist.

<div class="ss-container">
  <img src="../images/github-account-select.png" alt="Select GitHub Account" class="ss-medium">
</div>

Select the GitHub account (your user account or an organization) to
associate with Atomist by clicking its button.  Once selected,
the Atomist bot will show a confirmation message in Slack.

<div class="ss-container">
  <img src="../images/github-account-authorized.png" alt="GitHub Account Authorized Message" class="ss-large">
</div>

Congratulations, your GitHub account is now authorized.

### GitHub User Authorization

Now, let's associate your GitHub user with your Slack user.  To do
this, scroll back in the history or enter `@atomist github` to show
the GitHub authorization message again.

<div class="ss-container">
  <img src="../images/github-user-auth.png" alt="GitHub User Authorization Message" class="ss-medium">
</div>

Click on the "Authorize GitHub User" link in the message.  You will be
redirected to the GitHub authorization page in your browser.

<div class="ss-container">
  <img src="../images/github-user-oauth.png" alt="GitHub User OAuth" class="ss-medium">
</div>

Click the "Authorize application" button to authorize Atomist and you
will then be redirected back to your Slack team in the browser, where
you will see a confirmation message.

<div class="ss-container">
  <img src="../images/github-user-authorized.png" alt="GitHub User Authorized" class="ss-medium">
</div>

If you use a native client for Slack, you can close the Slack browser
window and go back to your preferred Slack client.  If you use your
web browser to access Slack, you will likely have several Slack tabs
or windows open at this point.  Feel free to close all but one.

Click Next in the lower-right corner of this page to continue the
Getting Started guide.
