<img style="float:right; margin-top:0px; margin-right:0px; margin-bottom:10px; margin-left:10px;" src="../images/travis-ci-logo.png" height="100px" width="100px" alt="Travis CI logo"/>

[Travis CI][travis] provides continuous integration services for
GitHub hosted repositories. Once you have [connected Atomist to Travis CI][config]
you will see build notification information in Slack alongside the project activity
that as caused the builds to happen:

<div class="ss-container">
<iframe id="ytplayer" width="560" height="315" src="https://www.youtube.com/embed/ZrxUS6NvF_U" frameborder="0" allowfullscreen loop="1"></iframe>
</div>

Atomist integrates with Travis CI using
webhooks configured in each source code repository's Travis CI
configuration.  For every Travis CI build, the standard webhook
payload is sent to the Atomist Travis CI webhook endpoint.  Atomist
ingests this information and takes the appropriate actions.

The Getting Started guide takes you through the process
of [configuring Travis CI][config] to send data to the Atomist webhook
endpoint.

[travis]: https://travis-ci.org/ (Travis CI)
[config]: /getting-started/travis-ci.md (Atomist and Travis CI)
