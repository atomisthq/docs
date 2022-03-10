### Connecting to a private Artifactory registry

When your registry is not visible on the public internet, track pushes by running a monitoring agent inside the network.  In the example below, `http://hal900:9092` is a private registry that is only visible on an internal network.

```
docker run -ti --init broken-test:latest \
  --workspace XXXXXXX \
  --api-key someapi-key \
  --artifactory-url http://hal9000:8082 \
  --artifactory-repository atomist-docker-local \
  --username admin \
  --password XXXXXXX
```

> if we use `--init`, do we have to document the version of docker that we rely on?  I think --init creates what we used to call a `dumb_init` to set up signal handlers.  But once this runs in daemon mode, perhaps we don't need this anyway.  Their internal container orchestration will become responsible for this container anyway.


