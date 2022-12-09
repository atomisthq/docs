### Attributes
| attribute | type | doc | entities |
| :---- | :---- | :---- | :----- |
| :check/comment | string | human readable check message | :check |
| :check/conclusion | ref | status of the image check |  |
| :check/github-check-run-url | string | URL to a github checkrun that has been set as a prerequisite | :check |
| :check/name | string | check identifier | :check |
| :deployment.stream/appname | string | defaults to image repository name but can be set by deployer | :deployment/stream |
| :deployment.stream/name | string | environment name (defaults to "deployed" if not provided | :deployment/stream |
| :image.recorded/digest | string | digest of image currently deployed in this stream | :deployment/stream |
| :image.recorded/status | ref | status for the last image recorded to this stream |  |
| :image.recorded/tag | string | last tag picked up by this stream | :deployment/stream |
| :linking.image/revision | string | git revision used to build a Docker image |  |
| :linking.image/source | string | path to the Dockerfile used to build a Docker image |  |

### Relationships

| attribute | doc | from | to |
| :---- | :---- | :---- | :----- |
| :check/image | the docker image that the check was performed on | :check | :docker/image |
| :check/stream | the stream that requires this image check for deployment to be permitted | :check | :deployment/stream |
| :deployment.stream/image | references the image currently deployed in this stream | :deployment/stream | :docker/image |