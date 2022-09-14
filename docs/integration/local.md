### Using a CLI to index images with Atomist

If you don't have credentials to a container registry, or are otherwise not ready to give them to us, images can be indexed by running a CLI which talks directly to your local Docker daemon, and uploads the Software Bill of Materials (SBOM) to the Atomist control plane for analysis.

This CLI is hosted in a container itself and can be invoked like this:

```shell
docker run \
   -v /var/run/docker.sock:/var/run/docker.sock \
   -ti atomist/docker-registry-broker:0.0.1 \
   index-image local \
   --workspace AQ1K5FIKA \
   --api-key team::6016307E4DF885EAE0579AACC71D3507BB38E1855903850CF5D0D91C5C8C6DC0 \
   --image docker.io/atomist/skill:alpine_3.15-node_16
```
which should output something like this:

```shell
 [info] Starting session with correlation-id 5c4f2a81-5370-4536-bc81-2af2ecbaf802
 [info] Starting atomist/docker-vulnerability-scanner-skill 'index_image' (bb5674d) atomist/skill:0.12.0-main.15 (522efce) nodejs:16.14.0
 [info] Indexing image docker.io/atomist/skill:alpine_3.15-node_16
 [info] Downloading image
 [info] Download completed
 [info] Indexing completed
 [info] Mapped packages to layers
 [info] Transacting 33 packages
 [info] Indexing completed successfully
 [info] Transacting image manifest for docker.io/atomist/skill:alpine_3.15-node_16 with digest sha256:9c3c9b88e031466f446471ee8a4233c60c326e785b849985776efbb890f0ec51
 [info] Successfully transacted entities in team AQ1K5FIKA
 [info] Transacting SBOM...
 [info] Successfully transacted entities in team AQ1K5FIKA
```

**N.B**: The image must be tagged (e.g. `docker build ... -t myimage:latest ...`) so that you can easily identify via the [web](https://dso.docker.com/r/auth/overview/images)

#### Configuration

```shell
$ docker run -ti atomist/docker-registry-broker:latest index-image local --help

Usage: index-image local OPTIONS
Options:
  -w, --workspace WORKSPACE_ID  Atomist workspace ID
  -a, --api-key API_KEY         Atomist API key
  -i, --image IMAGE             Container Image name
  -h, --help                    Show this message. Pass -h to sub-command to see their help
```


* `workspace`
    * Grab your workspace ID from https://dso.docker.com/r/auth/integrations
* `api-key`
    * Used to authenticate with the Atomist API and managed here https://dso.docker.com/r/auth/integrations
* `image`
    * The name of a tagged image locally available (via the Docker daemon)
