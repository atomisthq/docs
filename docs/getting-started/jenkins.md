There are several ways to connect Atomist to [Jenkins][jenkins].  If
you are *not* using a `Jenkinsfile` to configure your build, the
easiest way to connect Atomist to Jenkins is using
the [Notification plugin][use-notification].  If you *are* using a
`Jenkinsfile` to configure either a Pipeline or Multibranch Pipeline
job, you can connect Atomist and Jenkins using the pipeline
configuration in the [`Jenkinsfile`][use-jenkinsfile].

[jenkins]: https://jenkins.io/ (Jenkins)
[use-notification]: #notification-plugin
[use-jenkinsfile]: #jenkinsfile

## Notification plugin

If you don't already have the [Notification plugin][notification]
installed, go to the Plugin Manager in the Jenkins administrative
interface, select it, and complete the installation.

[notification]: https://wiki.jenkins-ci.org/display/JENKINS/Notification+Plugin

<div class="ss-container">
  <img src="../images/jenkins-install-notification.png" alt="Install Notification Plugin" class="ss-medium">
</div>

To enable the plugin, be sure to restart Jenkins after installation.

<div class="ss-container">
  <img src="../images/jenkins-install-notification-status-reboot.png" alt="Notification Plugin Installation Status" class="ss-medium">
</div>

Now that the Notification plugin is installed and enabled, it's time
to configure the plugin to notify Atomist.  Select a project that you
would like Atomist to get events from then select "Configure" from the
left column.

<div class="ss-container">
  <img src="../images/jenkins-configure-project.png" alt="Configure Project" class="ss-small">
</div>

In the "Job Notifications" section of the project configuration, click
the "Add Endpoint" button.

<div class="ss-container">
  <img src="../images/jenkins-add-notification.png" alt="Add Notification" class="ss-medium">
</div>

On the "Job Notifications" configuration tab, add an endpoint, setting
the "Notifications Endpoints" URL to
`https://webhook.atomist.com/atomist/jenkins` and leave the other
values at their defaults: Format: JSON, Protocol: HTTP, Event: All
Events, Timeout: 30000, and Log: 0.

<!-- TODO fix URL in image
<div class="ss-container">
  <img src="../images/jenkins-webhook.png" alt="Configure Webhook" class="ss-medium">
</div>
-->

Now, Jenkins is set up to send build notifications to Atomist.  Go
back to the [Connect Atomist to CI][ci] page to see what Atomist does
with these notifications.

[ci]: ci.md (Atomist and CI)

## Jenkinsfile

If your Jenkins build is configured using a [`Jenkinsfile`][jf], you
can connect Atomist and Jenkins by adding a bit of "pipeline code" to
the same `Jenkinsfile`.  The rest of these instructions assume your
Jenkins instance already has the Pipeline plugins installed and it is
properly configured for your project.  If you do not have the Pipeline
plugins installed and configured, use
the [Notification plugin][use-notification] to connect Atomist and
Jenkins.  The instructions below will work for properly
configured [Pipeline][pipeline]
and [Multibranch Pipeline][multibranch] jobs.

[jf]: https://jenkins.io/doc/book/pipeline/jenkinsfile/ (Jenkinsfile)
[pipeline]: https://jenkins.io/doc/book/pipeline/ (Jenkins Pipeline Jobs)
[multibranch]: https://jenkins.io/doc/book/pipeline/multibranch/ (Multibranch Pipeline Jobs)

Before we configure Jenkins to send build events to Atomist, we add a
couple functions to our `Jenkinsfile`.  First, we add a function that
gathers information from Git.

```groovy
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
```

The `#!groovy getSCMInformation()` function shells out to run the
`git` command to collect the Git remote URL, commit SHA, and branch
name, and then returns that information.

The second function shells out to use [cURL][curl] to post a JSON
payload to the Atomist webhook URL.

[curl]: https://curl.haxx.se/ (cURL)

```groovy
import groovy.json.JsonOutput

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

    sh "curl --silent -XPOST -H 'Content-Type: application/json' -d '${payload}' ${endpoint}"
}
```

Note that the `#!groovy notifyAtomist()` function calls the `#!groovy
getSCMInformation()` function.  The rest of the JSON payload is
constructed from the build environment provided by Jenkins as
environment variables.

With those functions defined, we can now configure our Pipeline or
Multibranch Pipeline job.  First, we call the `#!groovy
notifyAtomist()` function from within our build step.

```groovy
pipeline {
    // ...
    stages {
        // ...
        stage('Build') {
            steps {
                // notifiy Atomist the buid starts now
                notifyAtomist("UNSTABLE", "STARTED")
                // ...
            }
            // ...
        }
    }
    // ...
}
```

It is best to call the `#!groovy notifyAtomist()` function as early in
the build process as possible.  The commented ellipses, `// ...`,
indicate that we are only showing the portions of the `Jenkinsfile`
relevant to adding the single function call.

We also add calls to the `#!groovy notifyAtomist()` function in
the [`post`][jf-post] section of the `pipeline` configuration to
notify Atomist when the build completes.

[jf-post]: https://jenkins.io/doc/book/pipeline/syntax/#post

```groovy
pipeline {
    // ...
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

If your configuration already contains a `post` section, simply add
the calls to `#!groovy notifyAtomist()` to the `success`, `unstable`,
and `failure` subsections.

Once Jenkins picks up those changes, CI events will start flowing to
Atomist.
