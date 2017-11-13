To use Atomist, you'll need:

-   A [Slack][slack] team where you
    have [permissions to add an app][slack-app]
-   A [GitHub.com][github] user account that is a member of one or
    more GitHub organizations where you have permission
    to [authorize OAuth Apps][github-oauth]

[slack]: https://slack.com/ (Slack)
[slack-app]: https://get.slack.help/hc/en-us/articles/202035138-Adding-apps-to-your-team (Slack app)
[github]: https://github.com (GitHub)
[github-oauth]: https://help.github.com/articles/authorizing-oauth-apps/ (GitHub OAuth)

## Slack

Chat is one of the main interfaces for Atomist.  Currently we support
the [Slack][slack] chat platform.  You can use any Slack team you are
currently a member of with Atomist.  If you do not currently use
Slack, don't have [permissions to add an app][slack-app] to your
existing Slack team, or prefer to use a new Slack team with Atomist,
you can <a href="https://slack.com/create" alt="create Slack team"
title="Create a Slack team" target="_blank">create a new Slack
team</a> for free.

<div style="text-align:center">
  <a href="https://atm.st/2wiDlUe">
    <img alt="Add to Slack" height="50" width="174" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
  </a>
</div>

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

## GitHub

Atomist wants to get to know your code.  Currently Atomist integrates
with [GitHub.com][github] and [GitHub Enterprise][ghe].

If you already have a GitHub.com account, you can use it with
Atomist. You will need to be a member of one or more GitHub
organizations where you have permission
to [authorize OAuth Apps][github-oauth]. If you do not have a
GitHub.com account, you can [create a GitHub account][github-join] for
free. If you are not a member of a GitHub organization, you
can [create a public org for free][github-org].

<!-- Single repository? -->

If you use GitHub Enterprise, please [get in touch][contact] with us.

After you add Atomist to your Slack team, the Atomist Bot will prompt
you to authorize Atomist with GitHub.

[ghe]: https://enterprise.github.com/home (GitHub Enterprise)
[github-join]: https://github.com/join (Join GitHub.com)
[contact]: mailto:hi@atomist.com?subject=GitHub%20Enterprise (Atomist + GitHub Enterprise)
[github-org]: https://help.github.com/articles/creating-a-new-organization-from-scratch/ (GitHub org)

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

Then call `notifyAtomist` when the build starts and ends, sending the
appropriate status and phase.

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
