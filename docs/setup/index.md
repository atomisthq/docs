

## Enroll Slack Bot

The Atomist Bot can be installed from the [Slack App Directory][slack-app-directory].  Slack's default configuration allows team members to add new Slack applications.
However, Slack admins may decide to configure restrictions on which new applications can be installed.  This "Approved Apps" setting is shown on the [Permissions management page][manage-permissions].

![Approved Apps](images/ApprovedApps.png)

If your team requires approval for new apps, and you are not a Slack admin, Slack will ask you whether you'd like to request that the Atomist application be approved (Slack is really helpful here!).

Currrently the authorization process asks you to authorize two things:

1.  Our application adds a bot user named "@atomist" to your team.  Your team can `\invite` the Atomist bot to channels in order to access functionality that you have deployed using the Atomist platform.
    Bot users can not create channels.  Bot users can not join channels unless they are invited by a non-bot channel member.  Bot users can not see messages in channels of which they are not a member.  In other words, a bot might join your team
    when an authorization occurs, but it doesn't become a real part of your team until it is being invited to channels.
2.  We request a scope called "Modify public channels".  We request this scope because Atomist wants to help you setup channels to map information from external Systems in to Slack.  For example, when you create a project in a 
    new GitHub repo, Atomist can help you map events pertaining to that projct into a new Channel that only people working on that project decide to join.  
    Channel creation is _not_ done by a bot -- bots users are simply not allowed to create channels in Slack.  Creating new channels is an operation performed by the user who first authorizes Atomist.

<div align="center">
  <a href="https://atm.st/2wiDlUe">
    <img src="https://platform.slack-edge.com/img/add_to_slack.png" aign="middle"></img>
  </a>
</div>

[slack-app-directory]: https://atomist.slack.com/apps/A0HM83NCC-atomist
[manage-permissions]: https://atomist.slack.com/apps/manage/permissions

## Authorize GitHub

org or single repository

## Slack Team IDs

At various points throughout this guide, it is useful to know your
Slack team ID, which the Atomist bot is happy to tell you.  Once you
have added Atomist to your Slack team, invite the Atomist bot to a
channel and send the `team` message to it.

```
you> /invite @atomist
you> @atomist team
atomist> The Slack id for team your-slack-team is T1L0V3JTP
         16 of 24 users in this team have authorized themselves
```

The above response tells you the Slack team ID is `T1L0V3JTP`.

## Continuous Integration

Atomist natively supports several different continuous integration
(CI) platforms, listening for CI events, correlating them with the
commits that triggered the build, and showing contextualized
notifications in a Slack channel linked to the repository.  Enabling
this capability is as easy as adding the appropriate Atomist CI
webhook URL to your CI configuration.

In the examples below, replace `TEAM_ID` with your Slack team ID.

### CircleCI

To send events from [CircleCI][circleci] to Atomist, add the following
snippet to your `.circleci/config.yml` configuration file.

```yaml
notify:
  webhooks:
    - url: https://webhook.atomist.com/atomist/circle/teams/TEAM_ID
```

[circleci]: https://circleci.com/ (CircleCI)

### Jenkins

You can send events from [Jenkins][jenkins] to Atomist using
the [notification plugin][not-plugin], configuring it to send its
payload to
`https://webhook.atomist.com/atomist/jenkins/teams/TEAM_ID`.

If you configure your build using a [`Jenkinsfile`][jenkinsfile], add
these functions to your `Jenkinsfile`.  Don't forget to replace
`TEAM_ID` with your Slack team ID.

```groovy
import groovy.json.JsonOutput

def getSCMInformation() {
    def gitUrl = sh(returnStdout: true, script: 'git config --get remote.origin.url').trim()
    def gitSha = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
    def gitBranch = sh(returnStdout: true, script: 'git name-rev --always --name-only HEAD').trim().replace('remotes/origin/', '')
    return [ url: gitUrl, branch: gitBranch, commit: gitSha ]
}

def notifyAtomist(buildStatus, buildPhase="FINALIZED",
                  endpoint="https://webhook.atomist.com/atomist/jenkins/teams/TEAM_ID") {

    def payload = JsonOutput.toJson([
        name: env.JOB_NAME,
        duration: currentBuild.duration,
        build: [
            number: env.BUILD_NUMBER,
            phase: buildPhase,
            status: buildStatus,
            full_url: env.BUILD_URL,
            scm: getSCMInformation()
        ]
    ])
    sh "curl --silent -XPOST -H 'Content-Type: application/json' -d '${payload}' ${endpoint}"
}
```

Then call `notifyAtomist` when the build starts, e.g., in the first
stage, and ends, i.e., in the `post` block, sending the appropriate
status and phase.

-   Start: `notifyAtomist("STARTED", "STARTED")`
-   Succesful: `notifyAtomist("SUCCESS")`
-   Unstable: `notifyAtomist("UNSTABLE")`
-   Failure: `notifyAtomist("FAILURE")`

[jenkins]: https://jenkins.io/ (Jenkins)
[not-plugin]: https://wiki.jenkins-ci.org/display/JENKINS/Notification+Plugin (Jenkins Notification Plugin)
[jenkinsfile]: https://jenkins.io/doc/book/pipeline/jenkinsfile/ (Jenkinsfile)

### Travis CI

To send events from [Travis CI][travisci] to Atomist, add the
following snippet to your `.travis.yml` configuration file.

```yaml
notifications:
  webhooks:
    urls:
      - https://webhook.atomist.com/atomist/travis/teams/TEAM_ID
    on_success: always
    on_failure: always
    on_start: always
    on_cancel: always
    on_error: always
```

[travisci]: https://travis-ci.org (Travis CI)
