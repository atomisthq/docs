<img style="float:right; margin-top:0px; margin-right:0px; margin-bottom:10px; margin-left:10px;" src="../images/jenkins-logo.png" height="100px" width="100px" alt"Jenkins logo"/>

[Jenkins][jenkins] is a continuous integration solution.  Atomist
integrates with Jenkins using the [Notification plugin][plugin].  Once
the plugin is installed, activated, and configured, Jenkins will send
the standard build data to the Atomist Jenkins webhook endpoint.
Atomist ingests this information and takes the appropriate actions.

The Getting Started guide takes you through the process
of [configuring Jenkins][config] to send data to the Atomist webhook
endpoint.

[jenkins]: https://jenkins.io/ (Jenkins)
[plugin]: https://plugins.jenkins.io/notification (Jenkins Notification Plugin)
[config]: /getting-started/ci.md#jenkins-setup (Atomist and Jenkins)
