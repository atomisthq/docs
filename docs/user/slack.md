# Slack

Atomist has a powerful Slack integration to help your team access the
power of ChatOps.

If you already have the Atomist bot in your Slack, skip to [Issuing commands](#issuing-commands).

## Enroll Slack bot

Click the "Add to Slack" button below to invite the Atomist bot into
your Slack workspace.

<div style="text-align:center;">
  <a href="https://atm.st/2wiDlUe" target="_blank">
    <img alt="Add to Slack" height="50" width="174" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
  </a>
</div>

Slack's default configuration allows all workspace members to add new
Slack applications.  However, your workspaces' admins may restrict the
applications that can can be added in your workspace.  The
[permissions management page][manage-permissions] has an "Approved
Apps" setting to control this.

[manage-permissions]: https://slack.com/apps/manage/permissions

![Slack Approved Apps](img/ApprovedApps.png)

If your workspace requires approval for new apps and you're not a
Slack administrator, Slack helps you request approval from your Slack
workspace' administrators to install the Atomist application.

Currently the authorization process asks you to authorize two things:

1.  The Atomist app adds a bot user named "@atomist" to your workspace.
    Members can `\invite` the Atomist bot to channels to access the
    full functionality of Atomist.  Bot users cannot create channels,
    cannot join channels unless they are invited by a non-bot channel
    member, and cannot see messages in channels where they are not a
    member.
2.  Atomist requests a scope called "Modify public channels".  This
    scope allows Atomist to help you setup channels.  For example,
    when you [create a project][create-project] in a new repository,
    Atomist can create a Slack channel to go with it.

!!! Note
    The Atomist app creates new channels on behalf of the user who
    first authorizes Atomist.

[create-project]: ../developer/create.md (Create Project with Atomist)

## Removing Atomist from Slack

You can remove the bot from all your channels instantly
by revoking access to the "Atomist" application.  We certainly hope it
doesn't come to this!

The [App Manage page][slack-app-settings] has a "Remove App" button at
the bottom of the page.  Please <a class="contact"
href="mailto:support@atomist.com" title="Contact Atomist">let us
know</a> if there's anything we can do to clarify how the bot works
within your Slack workspace.

[slack-app-settings]: https://slack.com/apps/A0HM83NCC-atomist?page=1

## Linking repositories & Slack channels

Now that you you have Slack connected with Atomist, you should "link"
your source code repositories with Slack channels so you can see and
control your project's activity from Slack.  All you need to do is
invite the Atomist bot to a Slack channel and then send it `repo`.

```
/invite @atomist
@atomist repo
```

The bot will open a thread and ask you what repository you want to
link to the channel.  If you added an organization webhook, you can
link any repository in your organization.  If you added webhooks to
individual repositories, you will only be able to link those
repositories.

<script>
	/**
	* Function that tracks a click on an outbound link in Analytics.
	*
  * We want to track clicks on 'Add to Slack'
	*/
	var trackOutboundLink = function(url) {
		ga('send', 'event', 'outbound', 'click', url, {
			'transport': 'beacon',
			'hitCallback': function(){document.location = url;}
		});
	}
</script>

## Issuing commands

The Atomist bot can do many things for you. There are some commands built-in, and others
added by automations, including your own.

Issue commands either by addressing the bot in any channel it has been invited to (for example, `@atomist help`) or
by sending a DM to atomist. When you're in a channel that is [linked](lifecycle.md#linked-channels) to a repository, and you run a command (such as `create issue`) that works on a repository, Atomist recognizes the context and runs the command on that repository.

### Finding commands

Get a short list of commands to try from `@atomist help`.

Get the full list of commands with `@atomist list skills`.

Get the details of a particular command with `@atomist describe skill <skill>` where "skill" is replaced
by the skill text: for instance, `@atomist describe skill create issue`.

### Parameters

When a command needs parameters, Atomist will prompt you for them. For instance, "create issue" requires an issue title and accepts an optional issue body.

You can also provide parameters in the command invocation. For example: `@atomist create issue title="Say hello please" body="I want it to say hello"`

If you provide all required parameters on the command line, most commands will immediately execute.
Others will give you an opportunity to change any of the parameters before submission.

Sometimes all parameters are optional, and the only way to override them is on the command line.
For instance: `@atomist reset goals branch=my-branch` will trigger goal-setting on your branch instead
of on the master branch.

To see all the parameters, use `@atomist describe skill <skill>`.
