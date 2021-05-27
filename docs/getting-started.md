Our new DevSecOps tool is in early access now. You can request an [early access invite][early-access].

[early-access]: https://atomist.com/devsecops (Request early access)

It only takes a few minutes to complete this Getting Started. When finished, you will have a policy enabled and you will see what it found on your own repositories.

## Sign up

There is nothing to install. Just [sign up using GitHub](https://dso.atomist.com/ "Sign up") and off you go. You'll be asked to authorize Atomist to sign up.

![Sign up with GitHub](img/getting-started/sign-up.png)

After you have signed up, you will be guided through configuring and enabling your first policy.

## Step 1: Connect GitHub

You signed up with your GitHub ID to get started. Now you will install the [Atomist GitHub App][github-app] into your account which 

[github-app]: https://github.com/apps/atomist (Atomist GitHub App)

1.  Choose the
    [GitHub Notification Skill](https://go.atomist.com/catalog/skills/atomist/github-notifications-skill "Atomist GitHub Notification Skill").
2.  Click the **Get Started** button to configure the skill.
3.  Configure the [GitHub](integration/github.md "Atomist GitHub Integration")
    and [Slack](integration/slack.md "Atomist Slack Integration") integrations.
    These are both needed for the skill to send notification messages to Slack.
4.  Click **Enable Skill** to turn it on. Once complete, you'll see **Enabled**
    for GitHub Notifications on the **Manage > Skills** page.
5.  Link at least one repository to one Slack channel. Channel linking is done
    in the **Manage > Integrations > Slack** configuration. This
    repository-channel linking is how the skill knows which channel to send
    messages to for a specific repository's activity.
6.  Create a test issue in a GitHub repository, look in the linked Slack channel
    for the notification message. For example:

    

Now you will get Slack notifications for all pushed commits, pull requests, and
issues.

!!! Tip
    You control which channels will receive notifications, so you may
    want to start with just one repository linked to one Slack channel until you're
    ready to add more.

[catalog]: https://go.atomist.com/catalog "Atomist Catalog of Skills"

## Next: Discover More Skills

With the GitHub and Slack integrations configured, you're ready to explore more
skills.

[Discover more skills >>][catalog]
