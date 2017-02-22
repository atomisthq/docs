To get started helping streamline your development flow, Atomist needs access to GitHub. There are two kinds of authorization Atomist asks for to work with GitHub:

- **GitHub Account Authorization** – this determines the GitHub user account or GitHub organization that Atomist will connect to your Slack team. For example, if you want to receive notifications and take actions in your team's primary GitHub organization, you should authorize Atomist on that organization as the GitHub account. If you want to use Atomist with your individual user account, then you should authorize Atomist on your user account.

- **GitHub User Authorization** - this authorization is done so that commands and actions you run as a user in Slack are carried out as your GitHub user. Every person in your Slack team who takes any action via that bot that is carried out on GitHub will need to authorize their GitHub user with Atomist. For example, if you ask `@atomist` to create a GitHub issue, it needs to be authorized to create the issue as you.

### GitHub Account Authorization

You can perform these steps in any channel that `@atomist` has been invited to, or in a direct message with `@atomist`. Ask `@atomist` about your GitHub authorizations.

```
@atomist github
```

If this Slack team doesn't have a GitHub Account authorized, `@atomist` will show a message requesting you to authorize.

<div class="ss-container">
  <img src="../images/github-account-auth.png" alt="GitHub Account Auth Message" class="ss-medium">
</div>

You will see messages for both _GitHub Account Authorization_ and _GitHub User Authorization_. First, let's do the account authorization. Click on the "Authorize GitHub Account" link in the message. You will be redirected to the GitHub authorization page in your browser.

<div class="ss-container">
  <img src="../images/github-account-oauth.png" alt="GitHub Account OAuth" class="ss-medium">
</div>

Click the **"Authorize application"** button to authorize Atomist and you will then be redirected back to your Slack team in the browser.

!!! Note ""
    If you are not a member of any GitHub organizations, your GitHub user account will be automatically selected, and you will not see any organizations listed. If you are a member of one or more GitHub organizations, after authorizing Atomist, you will receive a direct message in Slack from `@atomist` asking whether to use your GitHub user account or one of the organizations you a member of as the GitHub Account to associate with Atomist.

<div class="ss-container">
  <img src="../images/github-account-select.png" alt="Select GitHub Account" class="ss-medium">
</div>

Select the GitHub Account (your user account or an organization) to associate with Atomist by clicking its button. Once selected, `@atomist` will show a confirmation message in Slack.

[ack message]

Okay, now your GitHub Account is authorized.

### GitHub User Authorization

Now, let's associate your GitHub User with your Slack user. To do this, scroll back in the history or enter `@atomist github` to show the message again.

<div class="ss-container">
  <img src="../images/github-user-auth.png" alt="GitHub User Authorization Message" class="ss-medium">
</div>

Click on the "Authorize GitHub User" link in the message. You will be redirected to the GitHub authorization page in your browser.

<div class="ss-container">
  <img src="../images/github-user-oauth.png" alt="GitHub User OAuth" class="ss-medium">
</div>

Click the **"Authorize application"** button to authorize Atomist and you will then be redirected back to your Slack team in the browser, where you will see a confirmation message.

<div class="ss-container">
  <img src="../images/authorized-message-on-your-behalf.png" alt="Atomist Authorized to do work on Your Behalf" class="ss-small">
</div>

### Next Step...

Whew! That's authorizations all done. :tada:
Now it's time do something more interesting by [putting Atomist to work...](putting-atomist-to-work.md)
