### Attributes
| attribute | type | doc | entities |
| :---- | :---- | :---- | :----- |
| :docker.image/blob-digest | string | Cumulative hash of all the blobs in this image | :docker/image |
| :docker.image/created-at | instant | image creation time | :docker/image |
| :docker.image/created-by-digest | string | Cumulative hash of all the created-by instructions in this image | :docker/image |
| :docker.image/diff-chain-id | string | Cumulative hash of all the diff-ids in this image | :docker/image |
| :docker.image/digest | string | the digest of this image | :docker/image |
| :docker.image/file-not-found | string | message describing why the Dockerfile for this image was not found |  |
| :docker.image/link-state | enum | reference to the strategy used to discover provenance for this image |  |
| :docker.image/ports | tuple | ports exposed by this image | :docker/image |
| :docker.image/sha | string | git/sha of the commit used to build this docker image | :docker/image |
| :docker.image/tags | string | deprecated: use tag entities instead | :deployment/stream<br/>:docker/image |
| :docker.image.blob/diff-id | string | diff-id from image config (rootfs) | :docker.image/blob |
| :docker.image.blob/digest | string | blob digest | :docker.image/blob |
| :docker.image.blob/size | long | size (bytes) of a layer blob | :docker.image/blob |
| :docker.image.environment.variable/name | string | Environmane variable name | :docker.image.environment/variable |
| :docker.image.environment.variable/value | string | Environment variable value | :docker.image.environment/variable |
| :docker.image.label/name | string | name of a docker image label | :docker.image/label |
| :docker.image.label/value | string | value of a docker image label | :docker.image/label |
| :docker.image.layer/blob-digest | string | Cumulative hash of all the blobs in this image (so far) - uses chain-id as per oci | :docker.image/layer |
| :docker.image.layer/chain-id | string | cumulative hash of diff-ids so far using chainid as per oci | :docker.image/layer |
| :docker.image.layer/created-at | instant | When was this command run / layer created) | :docker.image/layer |
| :docker.image.layer/created-by | string | Command that created this layer | :docker.image/layer |
| :docker.image.layer/image-digest | string | Digest of parent image | :docker.image/layer |
| :docker.image.layer/ordinal | long | image layer ordering | :docker.image/layer |
| :docker.manifest-list/created-at | instant | manifest list creation time | :docker/manifest-list |
| :docker.manifest-list/digest | string | manifest list digest | :docker/manifest-list |
| :docker.manifest-list/tags | string | TODO deprecate manifest list tags | :docker/manifest-list |
| :docker.platform/architecture | string | hardware architecture (e.g. amd64, arm64, etc.) | :deployment/stream<br/>:docker/platform |
| :docker.platform/features | string | TODO - we don't seem to use these attributes anywhere |  |
| :docker.platform/os | string | operating sytem (e.g. linux, darwin, etc.) | :deployment/stream<br/>:docker/platform |
| :docker.platform/variant | string | some platforms have variants (e.g. v8 for the arm64 architecture) | :docker/platform |
| :docker.platform.os/features | string | TODO - we don't seem to use these anywhere |  |
| :docker.platform.os/version | string | version of operating system |  |
| :docker.registry/secret | string | some registry integrations store a credential for access - always used in a read-only context | :docker/registry |
| :docker.registry/server-url | string | registry url | :docker/registry |
| :docker.registry/type | enum | references the registry type |  |
| :docker.registry/username | string | registry username (used by registry integrations) | :docker/registry |
| :docker.registry.ecr/arn | string | Amazon resource name. |  |
| :docker.registry.ecr/external-id | string | External ID for third-party access to AWS resources. |  |
| :docker.registry.ecr/region | string | Geographic region. |  |
| :docker.registry.gar/service-account | string |  |  |
| :docker.registry.gcr/service-account | string |  | :docker/registry |
| :docker.repository/badge | string | Badge of repository as returned by https://hub.docker.com/v2/orgs/:org/ | :docker/repository |
| :docker.repository/description | string | short description of repository |  |
| :docker.repository/host | string | hostname for docker repository | :docker/repository |
| :docker.repository/last-checked-at | instant | When did we last check this repository for new tags? | :docker/repository |
| :docker.repository/platforms | string | platforms supported by this repository | :docker/repository |
| :docker.repository/preferred-tags | string | manually curated set of tags (only present on a set of maintained public repositories) |  |
| :docker.repository/pull-count | long | number of times an object has been pulled from this registry |  |
| :docker.repository/repository | string | repository name | :docker/repository |
| :docker.repository/star-count | long | number of stars for this repository (only set on repositories that support stars) |  |
| :docker.repository/supported-tags | string | List of currently supported tags for DOI | :docker/repository |
| :docker.repository/type | enum | reference to repository type |  |
| :docker.tag/digest | string | Digest of latest image/manifest-list | :docker/tag |
| :docker.tag/last-checked-at | instant | When did we last check for this tag? | :docker/tag |
| :docker.tag/name | string | docker tag name (e.g. 'latest') | :docker/tag |
| :docker.tag/updated-at | instant | last tag update time | :docker/tag |
| :ingestion/statuses | string | Used by batch processes to store state between runs | :docker/image |
| :oci.annotation/name | string | Name of the annotation | :oci/annotation |
| :oci.annotation/value | string | Value of this annotation | :oci/annotation |

### Relationships

| attribute | doc | from | to |
| :---- | :---- | :---- | :----- |
| :docker.image/commit | commit entity used to build this docker image | :docker/image | :git/commit |
| :docker.image/environment-variables | references the environment variables declared for this image | :docker/image | :docker.image.environment/variable |
| :docker.image/file | Reference to a Dockerfile used to build this image | :docker/image | :git/file |
| :docker.image/from | Parent image of this image | :docker/image | :docker/image |
| :docker.image/labels | references the labels defined for this image | :docker/image | :docker.image/label |
| :docker.image/layers | references the layers of this image | :docker/image | :docker.image/layer |
| :docker.image/repositories | references to repositories that this image has been pushed to | :docker/image | :docker/repository |
| :docker.image/repository | deprecated: use docker.image/repositories instead | :deployment/stream<br/>:docker/image | :docker/repository |
| :docker.image.blob/created-by | ref to :docker.file/line (if we have the file as indexed by file-indexer) | :docker.image/blob | :docker.file/line |
| :docker.image.layer/blob | reference to the layer blob | :docker.image/layer | :docker.image/blob |
| :docker.manifest-list/images | image manifests referenced by this manifest list | :docker/manifest-list | :docker/image |
| :docker.manifest-list/repositories | references to repositories that this manifest list has been pushed to | :docker/manifest-list | :docker/repository |
| :docker.manifest-list/repository | deprecated - use repositories instead | :docker/manifest-list | :docker/repository |
| :docker.platform/image | refers to the docker image built for this platform | :docker/platform | :docker/image |
| :docker.repository/latest-scanned | references the most recent image or manifest-list that has been scanned | :docker/repository | :docker/image<br/>:docker/manifest-list |
| :docker.repository/latest-tag | references the most recent docker/tag | :docker/repository | :docker/tag |
| :docker.tag/image | Reference to current image for this tag (if any) | :docker/tag | :docker/image |
| :docker.tag/latest-scanned | Reference to most recent image or manifest-list that has been scanned | :docker/tag | :docker/image<br/>:docker/manifest-list |
| :docker.tag/manifest-list | Reference to current manifest list for this tag (if any) | :docker/tag | :docker/manifest-list |
| :docker.tag/repository | Reference to the repository containing this tag | :docker/tag | :docker/repository |
| :oci/annotations | Put this on any OCI entity | :docker/image | :oci/annotation |