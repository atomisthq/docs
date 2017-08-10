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

Atomist integrates with [Slack][slack] via the Atomist Bot, which
provides a chat-based interface to Atomist's capabilities.

[slack]: https://slack.com/ (Slack)

To invite the Atomist Bot into your Slack team, click on the "Add to Slack" button below.

<div class="ss-container">
  <a href="https://atm.st/2wiDlUe" onclick="trackOutboundLink('https://atm.st/2wiDlUe'); return false;" target="_blank">
                    <img alt="Add to Slack" height="50" width="174" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
  </a>
</div>

Clicking the button will send you to a web page where you will be
asked to sign into your Slack team if you are not already signed in.
Provide your Slack team domain and click Continue.

<div class="ss-container">
  <img src="../images/slack-team-sign-in.png" alt="Slack Team Sign-in" class="ss-small">
</div>

On the next page, provide your email address and password to complete
the Slack sign-in.  If you have trouble signing in, check
out [Slack help][slack-help].

[slack-help]: https://get.slack.help/hc/en-us/articles/212681477-Sign-in-to-Slack (Slack Sign-in Help)

<div class="ss-container">
  <img src="../images/slack-user-sign-in.png" alt="Slack Sign In" class="ss-small">
</div>

After successfully signing in, you will see the authorization page for
the Atomist app, including the Slack permissions requested.  Confirm
that the correct Slack team is selected and click "Authorize".

<div class="ss-container">
  <img src="../images/slack-auth.png" alt="Slack Authorization" class="ss-small">
</div>

For information on the permissions requested, see [Slack Permissions][slack-perm].

[slack-perm]: /user-guide/permissions/slack.md (Atomist Slack Permissions)

<!-- TODO verify this is still the case -->
Once you have successfully authorized the Atomist Bot in your Slack
team, you will be redirected to a confirmation page.  You can close
this page and go back to Slack to continue this guide.

<div class="ss-container">
  <img src="../images/bot-success.png" alt="Success" class="ss-small">
</div>

By default, the Atomist Bot will be named `@atomist` and will join the
`#general` channel in your Slack team.  You can invite the Atomist Bot
into any other channel in the same way you would invite any other
user: an `@` mention and invite, the `/invite @atomist` command, or
via the channel settings > "Invite team members to join ...".

<div class="ss-container">
  <img src="../images/slack-channel-invite.png" alt="Slack channel invite team members" class="ss-medium">
</div>

This video provides a brief introduction to the Atomist Bot's
capabilities and how to interact with it.

<div class="ss-container">
  <iframe id="ytplayer" type="text/html" width="560" height="320" src="https://www.youtube.com/embed/oGwPIxbdt7E?list=PL-HpeqSmYBmRKACTYZayfpOzJHOGED3-l&autoplay=1&loop=1&modestbranding=1" loop="1" frameborder="0" allowfullscreen></iframe>
</div>

For a complete list of the things the Atomist Bot can do, send the bot
a `help` message.

<div class="ss-container">
  <img src="../images/bot-help.png" alt="Success" class="ss-large">
</div>

Click the "Next" link in the bottom-right of this page to continue the
Getting Started guide.
