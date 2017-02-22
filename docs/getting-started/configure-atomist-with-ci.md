Atomist can listen for CI events, correlate them with the commits that triggered the build, and show contextualized notifications in the Slack channel.

To enable this, we need to connect Atomist to your CI system. Atomist currently works with Travis CI and Jenkins. Use the either the [Travis CI](#travis-ci) or [Jenkins](#jenkins) section to help you configure Atomist to connect with you CI.

### Travis CI Setup

Travis uses your GitHub user access token. Once you have set up Travis for your GitHub account, you are ready to go. No additional authorization required. If you have not yet setup Travis and want to as part of getting started with Atomist, please see the [Travis getting started](https://docs.travis-ci.com/user/for-beginners) documentation.

You will need to enable your projects to be built using Travis, if they aren't already set up. See the [Travis documentation](https://docs.travis-ci.com/user/for-beginners) to set up Travis builds.

Next, configure your Travis builds to send notifications to Atomist. In the `.travis.yml` configuration file in the project repo, add the following webhook configuration.

```json
notifications:
  webhooks:
    urls:
      - http://webhook.atomist.com/travis
    on_success: always
    on_failure: always
    on_start: always
    on_cancel: always
    on_error: always
```

Atomist can automate configuring Travis builds ... because yoru specific builds will vary, we recommend create an editro ...

From Slack
* Need to configure projects by adding travis.yml to them
  - either ask for a repo with travis.yml
  - or run an editor to create one
* Create a simple commit, commit, watch notifications
* buttons in notification?

### Jenkins Setup

> **Note:** Atomist works with the [Notification plugin](https://plugins.jenkins.io/notification) for Jenkins, which is a pre-requisite. The Notification plugin is what will send events to Atomist, so that we can notify and take action based on build events.

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

We're going to walk through setting up a webhook. In the Job Notifications section of the project configuration, click the "Add Notification" button.

<div class="ss-container">
  <img src="../images/jenkins-add-notification.png" alt="Add Notification" class="ss-medium">
</div>

In the Notification configuration section, configure the endpoint URL as `https://webhook.atomist.com/jenkins` and check that the other parameters match the information shown below.

<div class="ss-container">
  <img src="../images/jenkins-webhook.png" alt="Configure Webhook" class="ss-medium">
</div>


* make a commit to trigger a build, see notifications (make sure its working)
* buttons in notification?

### **In Action:** CI Notifications

Now that CI is also configured, let's take a look at how Atomist handles CI events.

Make some change that will cause your CI to initiate a build. For example, if your CI is configured to build on commit to a branch, make a commit to that branch.

> screen shot example of editing sprockets/README.md

> commit it

> show bot notification message

### Next Step...

With Atomist now aware and working with your project's code and CI systems, it's about time we looked at how to [build your own software development automation...](build-your-own-development-automation.md)
