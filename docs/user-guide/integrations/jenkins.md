<img style="float:right; margin-top:0px; margin-right:0px; margin-bottom:10px; margin-left:10px;" src="../images/jenkins-logo.png" height="100px" width="100px" alt="Jenkins logo"/>

[Jenkins][jenkins] is a continuous integration solution. Once you have [connected Atomist to Jenkins][config]
you will see build notification information in Slack alongside the project activity
that as caused the builds to happen:

<div class="ss-container">
<iframe id="ytplayer" width="560" height="315" src="https://www.youtube.com/embed/ZrxUS6NvF_U" frameborder="0" allowfullscreen loop="1"></iframe>
</div>

Atomist integrates with Jenkins using the [Notification plugin][plugin].  Once
the plugin is installed, activated, and configured, Jenkins will send
the standard build data to the Atomist Jenkins webhook endpoint.
Atomist ingests this information and takes the appropriate actions.

The Getting Started guide takes you through the process
of [configuring Jenkins][config] to send data to the Atomist webhook
endpoint.

[jenkins]: https://jenkins.io/ (Jenkins)
[plugin]: https://plugins.jenkins.io/notification (Jenkins Notification Plugin)
[config]: /getting-started/jenkins.md (Atomist and Jenkins)
