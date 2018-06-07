Atomist natively supports several continuous integration
(CI) platforms, listening for CI events, correlating them with the
commits that triggered the build, and showing contextualized
notifications in a Slack channel linked to the repository.  To enable
this capability, just add the desired Atomist CI
webhook URL to your CI configuration.

!!! note
    In the examples below, replace `WORKSPACE_ID` with your workspace ID.

## CircleCI

To send events from [CircleCI][circleci] to Atomist, add the following
snippet to your `.circleci/config.yml` configuration file.

```yaml
notify:
  webhooks:
    - url: https://webhook.atomist.com/atomist/circle/teams/WORKSPACE_ID
```

[circleci]: https://circleci.com/ (CircleCI)

## Jenkins

You can send events from [Jenkins][jenkins] to Atomist using
the [notification plugin][not-plugin], configuring it to send its
payload to
`https://webhook.atomist.com/atomist/jenkins/teams/WORKSPACE_ID`,
replacing `WORKSPACE_ID` with your Atomist team/workspace ID.

If you configure your build using a [`Jenkinsfile`][jenkinsfile], add
the following function to your `Jenkinsfile`.

```groovy
import groovy.json.JsonOutput

/**
 * Notify the Atomist services about the status of a build based from a
 * git repository.
 */
def notifyAtomist(String teamIds, String buildStatus, String buildPhase="FINALIZED") {
    if (!teamIds) {
        echo 'No Atomist team IDs, not sending build notification'
        return
    }
    def payload = JsonOutput.toJson(
        [
            name: env.JOB_NAME,
            duration: currentBuild.duration,
            build: [
                number: env.BUILD_NUMBER,
                phase: buildPhase,
                status: buildStatus,
                full_url: env.BUILD_URL,
                scm: [
                    url: env.GIT_URL,
                    branch: env.COMMIT_BRANCH,
                    commit: env.COMMIT_SHA
                ]
            ]
        ]
    )
    teamIds.split(',').each { teamId ->
        String endpoint = "https://webhook.atomist.com/atomist/jenkins/teams/${teamId}"
        sh "curl --silent -X POST -H 'Content-Type: application/json' -d '${payload}' ${endpoint}"
    }
}
```

Ensure your build has an environment variable named `ATOMIST_TEAMS`
whose value is your Atomist workspace/team ID or, if you want to send
the event to more than one Atomist workspace, the value should be a
comma-separated list of your Atomist workspace/team IDs.

Then call `notifyAtomist` when the build starts (in the first
stage) and ends (in the `post` block), sending the appropriate
status and phase.

-   Start: `notifyAtomist(env.ATOMIST_TEAMS, "STARTED", "STARTED")`
-   Succesful: `notifyAtomist(env.ATOMIST_TEAMS, "SUCCESS")`
-   Unstable: `notifyAtomist(env.ATOMIST_TEAMS, "UNSTABLE")`
-   Failure: `notifyAtomist(env.ATOMIST_TEAMS, "FAILURE")`

Here is a simple example `Jenkinsfile` pipeline that sends the
appropriate webhook payloads at the appropriate time.

```groovy
/**
 * Simple Jenkins pipeline for Maven builds
 */
pipeline {
    agent any

    environment {
        MVN = 'mvn -B -V'
    }

    stages {
        stage('Notify') {
            steps {
                echo 'Sending build start...'
                notifyAtomist(env.ATOMIST_TEAMS, 'STARTED', 'STARTED')
            }
        }

        stage('Set version') {
            steps {
                echo 'Setting version...'
                sh "${env.MVN} versions:set -DnewVersion=${env.COMMIT_SHA} versions:commit"
            }
        }

        stage('Build, Test, and Package') {
            steps {
                echo 'Building, testing, and packaging...'
                sh "${env.MVN} clean package"
            }
        }
    }

    post {
        always {
            echo 'Post notification...'
            notifyAtomist(env.ATOMIST_TEAMS, currentBuild.currentResult)
        }
    }
}
```

[jenkins]: https://jenkins.io/ (Jenkins)
[not-plugin]: https://wiki.jenkins-ci.org/display/JENKINS/Notification+Plugin (Jenkins Notification Plugin)
[jenkinsfile]: https://jenkins.io/doc/book/pipeline/jenkinsfile/ (Jenkinsfile)

## Travis CI

To send events from [Travis CI][travisci] to Atomist, add the
following snippet to your `.travis.yml` configuration file.

```yaml
notifications:
  webhooks:
    urls:
      - https://webhook.atomist.com/atomist/travis/teams/WORKSPACE_ID
    on_success: always
    on_failure: always
    on_start: always
    on_cancel: always
    on_error: always
```

[travisci]: https://travis-ci.org (Travis CI)

## Other

If you use a different CI tool than those listed above, you can send
your build payload to Atomist using its generic build payload webhook
endpoint.  Atomist provides a helper Bash script you can call from
your CI solution to post webhook payloads to Atomist.  The
[script][webhook-script] can be found in the Atomist [utiliites][]
repository and can be invoked as follows:

```
bash atomist-post-webhook.bash build WORKSPACE_ID
```

If your CI platform is not supported by the above script or you prefer
to use your own script, below is an example of how to send the
necessary JSON payload using [curl][].

```
curl -s -f -X POST -H "Content-Type: application/json" \
    --data-binary "{\"branch\":\"BRANCH\",\"repository\":{\"owner_name\":\"REPO_OWNER\",\"name\":\"REPO_NAME\"},\"commit\":\"SHA\",\"status\":\"STATUS\",\"type\":\"TYPE\"}" \
    https://webhook.atomist.com/atomist/build/teams/WORKSPACE_ID
```

When using the above command, replace the `ALL_CAPS` strings as
follows:

String | Description
-------|------------
`BRANCH` | Branch of commit being built
`REPO_OWNER` | Owner, i.e., organization or user, of repository
`REPO_NAME` | Name of repository
`SHA` | Full commit SHA
`STATUS` | Build status: "started", "failed", "error", "passed", "canceled"
`TYPE` | Build trigger: "push", "pull_request", "tag", "cron", "manual"

There are other optional elements you can include in your webhook POST
payload.  Here is the complete list of build payload elements.

Property | JSON Type | Description
---------|------|------------
`branch` | string | Branch of commit _(required if build type is "push")_
`build_url` | string | Web URL for build report/log
`commit` | string | Full commit SHA _(required)_
`compare_url` | string | Commit comparison URL showing changes
`id` | string | Build ID, must be unique among all builds associated with a given repository
`name` | string | Name for build
`number` | number | Build number
`provider` | string | Name of CI provider
`pull_request_number` | number | Pull request number _(only valid and required if build type is "pull_request")_
`repository.owner_name` | string | Owner, i.e., organization or user, of repository _(required)_
`repository.name` | string | Name of repository _(required)_
`status` | string | Build status: "started", "failed", "error", "passed", "canceled" _(required)_
`tag` | string | Tag being build, only valid and required if build type is "tag"
`type` | string | Build trigger: "push", "pull_request", "tag", "cron", "manual" _(required)_

See the [build webhook documentation][build-webhook-docs] for more
details.

[webhook-script]: https://raw.githubusercontent.com/atomist/utilities/master/atomist-post-webhook.bash (Atomist Webhook Utility Script)
[utilities]: https://github.com/atomist/utilities (Atomist Utilities Repository)
[curl]: https://curl.haxx.se/ (curl)
[build-webhook-docs]: https://atomisthq.github.io/build.html (Atomist Build Webhook Documentation)
