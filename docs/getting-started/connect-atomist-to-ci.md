Atomist can listen for CI events, correlate them with the commits that triggered the build, and show contextualized notifications in the Slack channel.

To enable this, we need to connect Atomist to your CI system. Atomist currently works with Travis CI and Jenkins. Use either the [Travis CI](#travis-ci) or [Jenkins](#jenkins) section to help you configure Atomist to connect with your CI.

### Travis CI Setup

Travis uses your GitHub user access token. Once you have set up Travis for your GitHub account, you are ready to go. No additional authorization required. If you have not yet setup Travis and want to as part of getting started with Atomist, please see the [Travis getting started](https://docs.travis-ci.com/user/for-beginners) documentation.

!!! note ""
    Atomist works with Travis-CI.org and Travis-CI.com. Travis Enterprise is not currently supported.

You will need to enable your projects to be built using Travis if they aren't already set up. See the [Travis documentation](https://docs.travis-ci.com/user/for-beginners) to set up Travis builds.

Next, configure your Travis builds to send notifications to Atomist. In the `.travis.yml` configuration file in the project repo, add the following webhook configuration.

```yaml
notifications:
  webhooks:
    urls:
    - https://webhook.atomist.com/travis
    on_success: always
    on_failure: always
    on_start: always
    on_cancel: always
    on_error: always
```

That's all that you need to do. Now, Travis will send all notifications to Atomist. To test it out, see the [CI Notifications](#in-action-ci-notifications) section.

### Jenkins Setup

#### Using the Notification Plugin

If you don't already have the Notification plugin installed, go to the Plugin Manager in the Jenkins admin interface, select it and complete the installation.

<div class="ss-container">
  <img src="../images/jenkins-install-notification.png" alt="Install Notification Plugin" class="ss-medium">
</div>

To enable the plugin, be sure to restart Jenkins after installation.

<div class="ss-container">
  <img src="../images/jenkins-install-notification-status-reboot.png" alt="Notification Plugin Installation Status" class="ss-medium">
</div>

Now that the Notification plugin is installed and enabled, it's time to configure project Notifications settings. Select a project that you would like Atomist to get events from. Next, select "Configure".

<div class="ss-container">
  <img src="../images/jenkins-configure-project.png" alt="Configure Project" class="ss-small">
</div>

We're going to walk through setting up a webhook. In the Job Notifications section of the project configuration, click the "Add Endpoint" button.

<div class="ss-container">
  <img src="../images/jenkins-add-notification.png" alt="Add Notification" class="ss-medium">
</div>

In the Notification configuration section, configure the endpoint URL as `https://webhook.atomist.com/jenkins` and check that the other parameters match the information shown below.

<div class="ss-container">
  <img src="../images/jenkins-webhook.png" alt="Configure Webhook" class="ss-medium">
</div>

Now, Jenkins is set up to send all notifications to Atomist. To test it out, see the next section, [In Action: CI Notifications](#in-action-ci-notifications).

#### Using the Pipeline plugin

If you run a [Pipeline job][pipeline], your build is described in a 
[Jenkinsfile][jenkinfile]. The integration with Atomist is done within the 
Jenkinsfile using the [post][jenkinsfilepost] section. 

If you do not have the plugin installed, ask your Jenkins administrator to add
the [Pipeline project][pipeline] plugin.

[pipeline]: https://jenkins.io/doc/book/pipeline/

<div class="ss-container">
  <img src="../images/jenkins-pipeline-plugin.png" alt="Create Pipeline Plugin" class="ss-medium">
</div>

The plugin will expect to have permissions to access your project on GitHub,
you should therefore have the appropriate credentials declared in Jenkins for
these operations.

The plugin supports various credential providers such as username/password or 
private keys. Below is the description of using a username/password approach 
where the password is a GitHub personal access token.

Go to your [GitHub settings][ghpat] to generate a new token with only the 
`repo` scope:

<div class="ss-container">
  <img src="../images/github-jenkins-token.png" alt="GitHub personal access token for Jenkins" class="ss-medium">
</div>

Then, ask your Jenkins administrator to create credentials for your GitHub
username and token:

<div class="ss-container">
  <img src="../images/jenkins-credentials-system.png" alt="Jenkins credentials" class="ss-medium">
</div>

<div class="ss-container">
  <img src="../images/jenkins-creds-for-github.png" alt="Jenkins add new GitHub credentials" class="ss-medium">
</div>

Now, you can create a pipeline build job as usual:

<div class="ss-container">
  <img src="../images/jenkins-create-pipeline-job.png" alt="Create Pipeline Job" class="ss-medium">
</div>

Next, declare the pipeline job settings by selecting a 
`Pipeline script from SCM` using the `git` SCM provider. Input the `git` URL
of the project and the appropriate credentials. The plugin will warn you if 
something fails at this stage. You may select the branch you want to build and
you may tune the other settings as needed.

<div class="ss-container">
  <img src="../images/jenkins-pipeline-job-settings.png" alt="Create Pipeline Job" class="ss-medium">
</div>

A `Jenkinsfile` stub for notifying Atomist could look like this:

```groovy
import groovy.json.JsonOutput

/*
 * Retrieve current SCM information from local checkout 
 */
def getSCMInformation() {
    def gitRemoteUrl = sh(returnStdout: true, script: 'git config --get remote.origin.url').trim()
    def gitCommitSha = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
    def gitBranchName = sh(returnStdout: true, script: 'git name-rev --always --name-only HEAD').trim().replace('remotes/origin/', '')

    return [
        url: gitRemoteUrl, 
        branch: gitBranchName,
        commit: gitCommitSha
    ]
}

/*
 * Notify the Atomist services about the status of a build based from a 
 * git repository.
 */
def notifyAtomist(buildStatus, buildPhase="FINALIZED", 
                  endpoint="https://webhook.atomist.com/atomist/jenkins") {

    def payload = JsonOutput.toJson([
        name: env.JOB_NAME,
        duration: currentBuild.duration,
        build      : [
            number: env.BUILD_NUMBER,
            phase: buildPhase,
            status: buildStatus,
            full_url: env.BUILD_URL,
            scm: getSCMInformation()
        ]
    ])

    sh "curl --silent -XPOST -H 'Content-Type: application/json' -d \'${payload}\' ${endpoint}"
}

pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                // notifiy Atomist the buid starts now
                // could be at any state but should be done first
                notifyAtomist("UNSTABLE", "STARTED")

                // let's pretend something is being done
                sh "sleep 10"
            }
        }
    }
    post { 
        success { 
            notifyAtomist("SUCCESS")
        }
        unstable { 
            notifyAtomist("UNSTABLE")
        }
        failure { 
            notifyAtomist("FAILURE")
        }
    }
}
```

This pipeline should be considered a template for your own jobs. It provides
however, the basics of notifying Atomist properly.

* First, it defines two Groovy functions. 
  * One extracts the repository metadata from the local copy of the build: its 
    remote URL, the branch being built and the branch's HEAD commit
  * The other one, `#!groovy notifyAtomist`, performs the notification itself
    and associates another set of metadata related to the build itself: its id,
    duration, phase (`"STARTED"` or `"FINALIZED"`) and status 
    (`"UNSTABLE"`, `"SUCCESS"` or `"FAILURE"`).
* In the `pipeline` declaration itself, it triggers those notifications with
  the relevant phase and status so Atomist can learn from the build lifecycle.

!!! important
    Your pipeline will obviously looks a bit different, but it is necessary to
    send the appropriate payload structure, as JSON, to Atomist or the events
    will be rejected.

    If events do not get rejected but you do not see them flowing into Slack,
    please contact-us with an example of the payload your are sending.

Finally, you need to configure your Jenkins job so that it knows when to start
new builds. Two approaches exist out of the box, either your Jenkins server can
be accessed from GitHub and you can configure a GitHub webhook to push to your 
job on every git operation, or you can configure your Jenkins job so that it 
monitors your GitHib repository for changes on a regular basis.

For instance, to poll GitHub every minute for changes:

<div class="ss-container">
  <img src="../images/jenkins-pipeline-poll-scm.png" alt="Poll SCM every minute" class="ss-medium">
</div>

Be careful not to poll too often as each call counts towards your hourly GitHub
rate limit.

Now, Jenkins is set up to send all notifications to Atomist. To test it out, see the next section, [In Action: CI Notifications](#in-action-ci-notifications).

#### Using the Multibranch Pipeline plugin

If you run a [Multibranch Pipeline job][multibranch], your build is 
described in a [Jenkinsfile][jenkinfile]. The integration with Atomist is 
done within the Jenkinsfile using the [post][jenkinsfilepost] section. A
multibranch pipeline build job is interesting because it allows you to 
concurrently build all the branches of your project.

If you do not have the plugin installed, ask your Jenkins administrator to add
the [Multibranch Pipeline project][multibranch] plugin.

<div class="ss-container">
  <img src="../images/jenkins-multibranch-pipeline-plugin.png" alt="Create Multibranch Pipeline Plugin" class="ss-medium">
</div>

By default, the Multibranch pipeline plugin relies on anonymous calls to the 
GitHub API to scan existing repositories and their branches. However, the number
of anonymous calls that can be made from a given IP is 
[rather limited][ghratelimit], it is therefore best if you set the 
credentials for an account that will perform those queries.

The plugin supports various credential providers such as username/password or 
private keys. Below is the description of using a username/password approach 
where the password is a GitHub personal access token.

Go to your [GitHub settings][ghpat] to generate a new token with only the 
`repo` scope:

<div class="ss-container">
  <img src="../images/github-jenkins-token.png" alt="GitHub personal access token for Jenkins" class="ss-medium">
</div>

Then, ask your Jenkins administrator to create credentials for your GitHub
username and token:

<div class="ss-container">
  <img src="../images/jenkins-credentials-system.png" alt="Jenkins credentials" class="ss-medium">
</div>

<div class="ss-container">
  <img src="../images/jenkins-creds-for-github.png" alt="Jenkins add new GitHub credentials" class="ss-medium">
</div>

Now, you can create a multibranch pipeline build job as usual:

<div class="ss-container">
  <img src="../images/jenkins-create-multibranch-pipeline-job.png" alt="Create Multibranch Pipeline Job" class="ss-medium">
</div>

A multibranch pipeline project expects at least one source to monitor
and build from. This source is essentially your project on GitHub and it must
have a file named `Jenkinsfile` in the top-level directory. That file contains
the description of your build pipeline.

<div class="ss-container">
  <img src="../images/jenkins-multibranch-pipeline-source.png" alt="Configure Multibranch source" class="ss-medium">
</div>

Set the `Owner` to the GitHub organization holding your project. The plugin will
automatically scan for repositories in that organization. 

Select the new pair of credentials in the Multibranch build job so that it uses
that account to scan for repositories and branches in the project you will
be building.

Once a repository has been selected, attach the appropriate credentials used for
the checkout. You may leave the other settings at their default values or tune 
as you see fit.

At this stage you don't need to configure the build job further as it will
automatically run the [Jenkinsfile][jenkinfile] it finds in the top-level
directory of your project when it pulls it.

A `Jenkinsfile` stub for notifying Atomist could look like this:

```groovy
import groovy.json.JsonOutput

/*
 * Retrieve current SCM information from local checkout 
 */
def getSCMInformation() {
    def gitRemoteUrl = sh(returnStdout: true, script: 'git config --get remote.origin.url').trim()
    def gitCommitSha = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
    def gitBranchName = env.BRANCH_NAME

    return [
        url: gitRemoteUrl, 
        branch: gitBranchName,
        commit: gitCommitSha
    ]
}

/*
 * Notify the Atomist services about the status of a build based from a 
 * git repository.
 */
def notifyAtomist(buildStatus, buildPhase="FINALIZED", 
                  endpoint="https://webhook.atomist.com/atomist/jenkins") {

    def payload = JsonOutput.toJson([
        name: env.JOB_NAME,
        duration: currentBuild.duration,
        build      : [
            number: env.BUILD_NUMBER,
            phase: buildPhase,
            status: buildStatus,
            full_url: env.BUILD_URL,
            scm: getSCMInformation()
        ]
    ])

    sh "curl --silent -XPOST -H 'Content-Type: application/json' -d \'${payload}\' ${endpoint}"
}

pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                // notifiy Atomist the buid starts now
                // could be at any state but should be done first
                notifyAtomist("UNSTABLE", "STARTED")

                // let's pretend something is being done
                sh "sleep 10"
            }
        }
    }
    post { 
        success { 
            notifyAtomist("SUCCESS")
        }
        unstable { 
            notifyAtomist("UNSTABLE")
        }
        failure { 
            notifyAtomist("FAILURE")
        }
    }
}
```

This pipeline should be considered a template for your own jobs. It provides
however, the basics of notifying Atomist properly.

* First, it defines two Groovy functions. 
  * One extracts the repository metadata from the local copy of the build: its 
    remote URL, the branch being built and the branch's HEAD commit
  * The other one, `#!groovy notifyAtomist`, performs the notification itself
    and associates another set of metadata related to the build itself: its id,
    duration, phase (`"STARTED"` or `"FINALIZED"`) and status 
    (`"UNSTABLE"`, `"SUCCESS"` or `"FAILURE"`).
* In the `pipeline` declaration itself, it triggers those notifications with
  the relevant phase and status so Atomist can learn from the build lifecycle.

!!! important
    Your pipeline will obviously look a bit different, but it is necessary to
    send the appropriate payload structure, as JSON, to Atomist or the events
    will be rejected.

    If events do not get rejected but you do not see them flowing into Slack,
    please contact-us with an example of the payload your are sending.

Finally, you need to configure your Jenkins job so that it knows when to start
new builds. Two approaches exist out of the box, either your Jenkins server can 
be accessed  from GitHub and you can configure a GitHub webhook to push to your 
job on every git operations, or you can configure your Jenkins job so that it 
monitors your GitHib repository for changes on a regular basis.

For instance, to poll GitHub every minute for changes:

<div class="ss-container">
  <img src="../images/jenkins-multibranch-pipeline-scm-poll.png" alt="Poll SCM every minute" class="ss-medium">
</div>

Be careful not to poll too often as each call counts towards your hourly GitHub
rate limit.

Now, Jenkins is set up to send all notifications to Atomist. To test it out, see the next section, [In Action: CI Notifications](#in-action-ci-notifications).

[multibranch]: https://jenkins.io/doc/book/pipeline/multibranch/
[jenkinfile]: https://jenkins.io/doc/book/pipeline/jenkinsfile/
[jenkinsfilepost]: https://jenkins.io/doc/book/pipeline/syntax/#post
[ghratelimit]: https://developer.github.com/v3/#rate-limiting
[ghpat]: https://github.com/settings/tokens

### CI Notifications

Now that CI is also configured, let's take a look at how Atomist handles CI events.

Let's make a little change the `README.md` of our `sprockets` repo, then commit it.

<div class="ss-container">
  <img src="../images/sprockets-readme-edit.png" alt="Edit README" class="ss-small">
</div>

<div class="ss-container">
  <img src="../images/sprockets-readme-commit.png" alt="Commit README" class="ss-large">
</div>

This project is configured so that the commit triggers a Travis build. Atomist is now receiving CI notifications, and is notified of the build started.

<div class="ss-container">
  <img src="../images/sprockets-commit-notification.png" alt="Commit Notification" class="ss-small">
</div>
