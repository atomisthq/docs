

## Enroll Slack Bot

The Atomist Bot can be installed from the [Slack App Directory](https://atomist.slack.com/apps/A0HM83NCC-atomist).  However, it is possible that some users 
on your slack team are restricted from being able to install new applications.  Slack supports an "Approved Apps" setting which controls this configuration:

![Approved Apps](images/ApprovedApps.png)

If your team requires approval of new apps, and you are not a Slack admin, you can usually make a request to the Slack Admin's to approve this application as part of 
authorization flow (Slack is really helpful here!).

Currrently the authorization process asks you to authorize two things:

1.  We request authorization to add a bot user named "@atomist" to your team.  Your team can `\invite` the Atomist bot to channels in order to access functionality that you have deployed using the Atomist platform.
    Bot users can not create channels.  Bot users can not join channels unless they are invited by a non-bot channel member.  Bot users can not see messages in channels of which they are not a member.  In other words, a bot might join your team
    when an authorization occurs, but it doesn't become a real part of your team until it is being invited to channels.
2.  We request a scope called "Modify public channels".  We request this scope because Atomist wants to help you setup channels to map information from external Systems in to Slack.  For example, when you create a project in a 
    new GitHub repo, Atomist can help you map events pertaining to that projct into a new Channel that only people working on that project decide to join.  
    Channel creation is _not_ done by a bot -- bots users are simply not allowed to create channels in Slack.  Creating new channels is an operation performed by the user who first authorizes Atomist.

If you're ready to get started with the Atomist bot, you can simply click here:

<a href="https://atm.st/2wiDlUe">
  <img src="https://platform.slack-edge.com/img/add_to_slack.png"></img>
</a>

## Authorize GitHub



org or single repository

## Integration

### Travis CI

### Jenkins

### CircleCI
 