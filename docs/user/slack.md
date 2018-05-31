Atomist has a powerful Slack integration to help your team access the
power of ChatOps.

## Enroll Slack bot

Click the "Add to Slack" button below to invite the Atomist bot into
your Slack team.

<div style="text-align:center;">
  <a href="https://atm.st/2wiDlUe" onclick="trackOutboundLink('https://atm.st/2wiDlUe'); return false;" target="_blank">
    <img alt="Add to Slack" height="50" width="174" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
  </a>
</div>

Slack's default configuration allows all team members to add new Slack applications.
However, your team's admins may restrict the applications that can
can be added in your team.  The [permissions management page][manage-permissions] has
an "Approved Apps" setting to control this.

[manage-permissions]: https://slack.com/apps/manage/permissions

![Slack Approved Apps](img/ApprovedApps.png)

If your team requires approval for new apps and you're not a Slack
administrator, Slack helps you request approval from your Slack team's
administrators to install the Atomist application.

Currently the authorization process asks you to authorize two things:

1.  The Atomist app adds a bot user named "@atomist" to your team.
    Your team can `\invite` the Atomist bot to channels to access the
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
the bottom of the page.  Please [let us know][support-email] if
there's anything we can do to clarify how the bot works within your
Slack team.

[slack-app-settings]: https://slack.com/apps/A0HM83NCC-atomist?page=1
[support-email]: mailto:support@atomist.com

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
	* This function takes a valid URL string as an argument, and uses that URL string
	* as the event label. Setting the transport method to 'beacon' lets the hit be sent
	* using 'navigator.sendBeacon' in browser that support it.
	*/
	var trackOutboundLink = function(url) {
		ga('send', 'event', 'outbound', 'click', url, {
			'transport': 'beacon',
			'hitCallback': function(){document.location = url;}
		});
	}
</script>
