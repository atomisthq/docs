
Atomist receives events from and performs operations on many systems,
including version control, CI systems, Slack, and more.

Atomist uses the native integration technology for each platform or
tool.  For example, to integrate with GitHub and Travis CI, Atomist
uses webhooks; to integrate with Slack it uses their event API.  For each platform Atomist integrates with, it
requests the minimal set of permissions required.

If you use a system or tool Atomist does not natively support, you can
implement your own integrations.  You can use whatever tools and
libraries you want to communicate with your systems, and then register
these custom event types with Atomist so it can properly connect them
with other events.

#### Chat Integrations

Send messages to channels and people, receive commands, query people for command parameters, update messages, and include buttons on messages.

* Slack
* MS Teams (experimental)

#### Version Control Integrations

Atomist receives events for Pushes and Pull Requests (PRs). The built-in integrations
include action buttons to create and merge PRs and add labels, reviewers, and comments to PRs.

* GitHub
* GitHub Enterprise
* BitBucket
* BitBucket Cloud
* GitLab

#### Issue Tracking Integrations

Atomist receives events for issue and issue comment creation and update.

* GitHub Issues

#### CI Integrations

Atomist can receive build notifications from:

* Jenkins
* Travis CI
* TeamCity
* Circle CI
* any other build system, as a POST to our webhook

### Running other programs from Atomist

In response to events, you can trigger actions on other systems from your Atomist automations.
Some of the ones already implemented include:

* Checkstyle
* TSLint
* Sonarqube
* anything you can run from a shell or command prompt

