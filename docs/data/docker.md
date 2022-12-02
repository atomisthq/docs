| attribute | type | doc |
| :---- | :---- | :---- |
| :docker.file/count | long | Stamped on the commit once all parsing is complete |
| :docker.file/path | string | null |
| :docker.file/scan-results | ref | link sarif scan results directly to a Dockerfile |
| :docker.file.from/digest | string | image digest for a FROM instruction |
| :docker.file.from/repository | ref | docker repository for a FROM instruction |
| :docker.file.from/repository-tag | ref | Ref to docker/tag (could be a shell) |
| :docker.file.from/tag | string | image tag for a FROM instruction |
| :docker.file.line/args-array | string | Deprecated - use args-list |
| :docker.file.line/args-list | ref | Ordered list of ordinal/string pairs |
| :docker.file.line/args-map | tuple | TODO |
| :docker.file.line/args-string | string | all args passed to a Dockerfile instruction |
| :docker.file.line/file | ref | reference to the Dockerfile for an instruction |
| :docker.file.line/instruction | string | name of the instruction (e.g. FROM, RUN, COPY, etc.) |
| :docker.file.line/number | long | Dockerfile line number for start of each instruction |
| :docker.file.line/refers-to | ref | This is an AS pointer to original FROM line (if relevant) |
| :docker.file.line/start-number | long | TODO |
| :docker.file.line.arg/line | ref | reference to the Dockerfile instruction for an arg |
| :docker.image/blob-digest | string | Cumulative hash of all the blobs in this image |
| :docker.image/commit | ref | commit entity used to build this docker image |
| :docker.image/created-at | instant | image creation time |
| :docker.image/created-by-digest | string | Cumulative hash of all the created-by instructions in this image |
| :docker.image/diff-chain-id | string | Cumulative hash of all the diff-ids in this image |
| :docker.image/digest | string | the digest of this image |
| :docker.image/environment-variables | ref | references the environment variables declared for this image |
| :docker.image/file | ref | Reference to a Dockerfile used to build this image |
| :docker.image/file-not-found | string | message describing why the Dockerfile for this image was not found |
| :docker.image/from | ref | Parent image of this image |
| :docker.image/labels | ref | references the labels defined for this image |
| :docker.image/layers | ref | references the layers of this image |
| :docker.image/link-state | ref | reference to the strategy used to discover provenance for this image |
| :docker.image/ports | tuple | ports exposed by this image |
| :docker.image/repositories | ref | references to repositories that this image has been pushed to |
| :docker.image/repository | ref | deprecated: use docker.image/repositories instead |
| :docker.image/sha | string | git/sha of the commit used to build this docker image |
| :docker.image/tags | string | deprecated: use tag entities instead |
| :docker.image.blob/created-by | ref | ref to :docker.file/line (if we have the file as indexed by file-indexer) |
| :docker.image.blob/diff-id | string | diff-id from image config (rootfs) |
| :docker.image.blob/digest | string | blob digest |
| :docker.image.blob/size | long | size (bytes) of a layer blob |
| :docker.image.environment.variable/name | string | Environmane variable name |
| :docker.image.environment.variable/value | string | Environment variable value |
| :docker.image.label/name | string | name of a docker image label |
| :docker.image.label/value | string | value of a docker image label |
| :docker.image.layer/blob | ref | reference to the layer blob |
| :docker.image.layer/blob-digest | string | Cumulative hash of all the blobs in this image (so far) - uses chain-id as per oci |
| :docker.image.layer/chain-id | string | cumulative hash of diff-ids so far using chainid as per oci |
| :docker.image.layer/created-at | instant | When was this command run / layer created) |
| :docker.image.layer/created-by | string | Command that created this layer |
| :docker.image.layer/image-digest | string | Digest of parent image |
| :docker.image.layer/ordinal | long | image layer ordering |
| :docker.image.link-state/manual | enum | provenance discovered through manual intervention |
| :docker.image.link-state/match-label-commit | enum | provenance discovered because image build use one of the standard labels |
| :docker.image.link-state/match-tag-sha | enum | provenance discovered because image tag matches git sha |
| :docker.image.link-state/match-tag-tag | enum | provenance discovered because image tag matches git tag |
| :docker.image.link-state/no-match | enum | unable to discover image provenance |
| :docker.image.link-state/no-match-many-dockerfiles | enum | unable to complete provenance linking - ambiguous Dockerfile |
| :docker.manifest-list/created-at | instant | manifest list creation time |
| :docker.manifest-list/digest | string | manifest list digest |
| :docker.manifest-list/images | ref | image manifests referenced by this manifest list |
| :docker.manifest-list/repositories | ref | references to repositories that this manifest list has been pushed to |
| :docker.manifest-list/repository | ref | deprecated - use repositories instead |
| :docker.manifest-list/tags | string | TODO deprecate manifest list tags |
| :docker.platform/architecture | string | hardware architecture (e.g. amd64, arm64, etc.) |
| :docker.platform/features | string | TODO - we don't seem to use these attributes anywhere |
| :docker.platform/image | ref | refers to the docker image built for this platform |
| :docker.platform/os | string | operating sytem (e.g. linux, darwin, etc.) |
| :docker.platform/variant | string | some platforms have variants (e.g. v8 for the arm64 architecture) |
| :docker.platform.os/features | string | TODO - we don't seem to use these anywhere |
| :docker.platform.os/version | string | version of operating system |
| :docker.registry/secret | string | some registry integrations store a credential for access - always used in a read-only context |
| :docker.registry/server-url | string | registry url |
| :docker.registry/type | ref | references the registry type |
| :docker.registry/username | string | registry username (used by registry integrations) |
| :docker.registry.ecr/arn | string | null |
| :docker.registry.ecr/external-id | string | null |
| :docker.registry.ecr/region | string | null |
| :docker.registry.gar/service-account | string | null |
| :docker.registry.gcr/service-account | string | null |
| :docker.registry.type/DOCKER_HUB | enum | DockerHub registry |
| :docker.registry.type/DOCKER_HUB_INTERNAL | enum | null |
| :docker.registry.type/ECR | enum | null |
| :docker.registry.type/GAR | enum | null |
| :docker.registry.type/GCR | enum | null |
| :docker.registry.type/GHCR | enum | null |
| :docker.repository/badge | string | Badge of repository as returned by https://hub.docker.com/v2/orgs/:org/ |
| :docker.repository/description | string | short description of repository |
| :docker.repository/host | string | hostname for docker repository |
| :docker.repository/last-checked-at | instant | When did we last check this repository for new tags? |
| :docker.repository/latest-scanned | ref | references the most recent image or manifest-list that has been scanned |
| :docker.repository/latest-tag | ref | references the most recent docker/tag |
| :docker.repository/platforms | string | platforms supported by this repository |
| :docker.repository/preferred-tags | string | manually curated set of tags (only present on a set of maintained public repositories) |
| :docker.repository/pull-count | long | number of times an object has been pulled from this registry |
| :docker.repository/repository | string | repository name |
| :docker.repository/star-count | long | number of stars for this repository (only set on repositories that support stars) |
| :docker.repository/supported-tags | string | List of currently supported tags for DOI |
| :docker.repository/type | ref | reference to repository type |
| :docker.repository.type/ARTIFACTORY | enum | repository is managed by artifactory |
| :docker.repository.type/LOCAL | enum | repository is local |
| :docker.tag/digest | string | Digest of latest image/manifest-list |
| :docker.tag/image | ref | Reference to current image for this tag (if any) |
| :docker.tag/last-checked-at | instant | When did we last check for this tag? |
| :docker.tag/latest-scanned | ref | Reference to most recent image or manifest-list that has been scanned |
| :docker.tag/manifest-list | ref | Reference to current manifest list for this tag (if any) |
| :docker.tag/name | string | docker tag name (e.g. 'latest') |
| :docker.tag/repository | ref | Reference to the repository containing this tag |
| :docker.tag/updated-at | instant | last tag update time |
| :ingestion/statuses | string | Used by batch processes to store state between runs |
| :oci/annotations | ref | Put this on any OCI entity |
| :oci.annotation/name | string | Name of the annotation |
| :oci.annotation/value | string | Value of this annotation |