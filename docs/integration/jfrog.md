### Connecting to a private Artifactory Container Registry

When your registry is not visible on the public internet, images can be indexed by running a monitoring agent inside the network.  

The agent will scan configured Artifactory container repositories at regular intervals, and send newly discovered images' metadata to the Atomist control plan.

In the example below, `http://hal9000:9092` is a private registry that is only visible on an internal network.

```
docker run -ti atomist/docker-registry-broker:latest \
  --workspace AQ1K5FIKA \
  --api-key team::6016307E4DF885EAE0579AACC71D3507BB38E1855903850CF5D0D91C5C8C6DC0 \
  --artifactory-url http://hal9000:8082 \
  --artifactory-repository atomist-docker-local \
  --username admin \
  --password password
```

**N.B**: add `--init` to your command to trap signals such as `ctrl-c` to stop the agent when in interactive mode

#### Configuration

* `workspace`
  * The Atomist workspace ID to store image metadata. Visit https://dso.atomist.com/r/auth/overview/images and grab the workspace ID from the URL. e.g. the workspace ID for https://dso.atomist.com/AQ1K5FIKA/overview/images is `AQ1K5FIKA`
* `api-key`
  * Used to authenticate with the Atomist API and managed here https://dso.atomist.com/r/auth/integrations
* `artifactory-url` 
  * is the base URL of your artifactory instance. This must not include any path or trailing slashes
* `artifactory-repository`
  * a comma separated list of Artifactory container repository names to monitor
* `username`
  *  Username used for HTTP/Basic authentication with Artifactory
* `password`
  * Password for `username`
 


