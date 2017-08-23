Fingerprints detect important changes to code and configuration. They ensure that critical, potentially breaking changes don’t slip by unnoticed and cause outages or other problems. You can see how this looks in Slack in the following video snippet:

<div class="ss-container">
<iframe id="ytplayer" width="560" height="315" src="https://www.youtube.com/embed/oEYqmKvDK_w" frameborder="0" loop="1" allowfullscreen></iframe>
</div>

Fingerprints are calculated by extracting specific, logically related fragments of code, normalizing and sorting them in a deterministic order, and then computing a SHA. Fingerprints are computed on the difference or impact between the commit and its parent commit. The fingerprints are calculated on each commit. If a change from previous version is detected, Atomist alerts you in Slack and in some cases sets the GitHub build status to blocked.

## Available Fingerprints

Atomist offers the fingerprints listed in the table below.

Entry | Description
------|------------
`build` | Build file (Travis and CircleCI)
`docker` | Dockerfile base image
`props` | Application property and YAML files used by Spring Boot
`rest` | Spring MVC REST endpoints
`plugins` | Maven plugins
`plugsMgt` | Maven plugin management
`deps` | Maven dependencies
`depsMgt` | Maven dependency management

## Appearance

Below is an example fingerprint rendering in Slack. It shows that both the build configuration and the configured plugins changed. Notice that the fingerprint has done its job here: the fingerprint detected a change to the build file that the commit message neglected to mention.

![Fingerprint](/images/fingerprint.png)

## Configuration

The fingerprint configuration file is located in the atomist-config repo:

`https://<your-repo>/atomist-config/blob/master/fingerprints.json`
