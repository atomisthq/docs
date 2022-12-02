| attribute | type | doc |
| :---- | :---- | :---- |
| :check/comment | string | human readable check message |
| :check/conclusion | ref | status of the image check |
| :check/github-check-run-url | string | URL to a github checkrun that has been set as a prerequisite |
| :check/image | ref | the docker image that the check was performed on |
| :check/name | string | check identifier |
| :check/stream | ref | the stream that requires this image check for deployment to be permitted |
| :check.conclusion/checking | enum | image is being checked |
| :check.conclusion/hold | enum | image is not ready for deployment |
| :check.conclusion/ready | enum | check indicates that the image is ready for deployment |
| :deployment.stream/appname | string | defaults to image repository name but can be set by deployer |
| :deployment.stream/image | ref | references the image currently deployed in this stream |
| :deployment.stream/name | string | environment name (defaults to "deployed" if not provided |
| :image.recorded/digest | string | digest of image currently deployed in this stream |
| :image.recorded/status | ref | status for the last image recorded to this stream |
| :image.recorded/tag | string | last tag picked up by this stream |
| :image.recorded.status/missing | enum | last image recorded by deployer is not visible to any current integration |
| :image.recorded.status/missing-platform | enum | last tag recorded by deployer pointed at a manifest but platform was not specified |
| :image.recorded.status/private-registry | enum | last image recordede by deployer is in a private registry that is not integrated |
| :image.recorded.status/recorded | enum | deployer has recorded a new image (not yet verified) |
| :image.recorded.status/verified | enum | image recorded by deployer has been verified |
| :linking.image/revision | string | git revision used to build a Docker image |
| :linking.image/source | string | path to the Dockerfile used to build a Docker image |