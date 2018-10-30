
You can run Software Delivery Machines (SDMs) in many different environments, ranging from your laptop
or data center to Platform-as-a-Service offerings like Heroku and Pivotal Cloud Foundry.

Atomist also supports running SDMs as Docker containers. This allows you
to operate them in Kubernetes clusters or Google Container Engine, for example.

This document explains various ways to run SDMs.

## Running locally

The easiest way to run an SDM is to start it up on your local
development machine.

Running the SDM locally is extremely helpful
during development of your automations.

-   You can debug commands and event handlers using local development
    tools like Visual Studio Code and Google Chrome.
-   You can iterate rapidly because there is no deployment and only a
    minimal build process.

To connect to the Atomist API and respond to events in your team and commands in your team chat,
 start the SDM by running the following commands:

```
npm run compile && npm start
```

!!! note
    The SDM requires an open internet connection to
    `https://automation.atomist.com` to successfully register event
    subscriptions and commands.

To receive only your personal commits and commands that you initiate in your terminal, run in local mode:

```
npm run compile && npm start --local
```

## Production 

### Production mode

Set the environment variable 

```
NODE_ENV=production
```

This has two effects: 

* it tells NPM to install only runtime dependencies, not dev-dependencies.
* it changes the default config in the SDM to [production defaults][prod-default-config-apidoc] run in `durable` mode.

If you want the NPM effect, but not the Atomist configuration change, then set ATOMIST_ENV to "testing" or "development". This will override NODE_ENV for that purpose. 

[prod-default-config-apidoc: https://atomist.github.io/automation-client/modules/_lib_configuration_.html#productiondefaultconfiguration (APIdoc for ProductionDefaultConfig)

### Node

When running in a production environment, you typically want to avoid
NPM and run Node.js directly to ensure signals get delivered properly
and you can provide guidance to Node.js's memory management subsystem.
Here's an example startup command for production environments:

```
node $NODE_DEBUG_OPTION --trace-warnings --expose_gc --optimize_for_size \
    --always_compact --max_old_space_size=384 node_modules/.bin/atomist start
```

See `node --help` and `node --v8-options` for more detail on these
options.

## Cloud Foundry

To push your SDM to an instance of Pivotal Cloud
Foundry, you need an account on the instance you want to target and
you must have the [Cloud Foundry CLI][cf-cli] installed.

For detailed information about the deployment process, consult
the [Cloud Foundry documentation][cf-docs].

A push to Cloud Foundry needs some additional metadata in your
project.  First you need to create a [`manifest.yml`][cf-manifest]
file in the root of your SDM project:

```yaml
applications:
- name: my-sdm
  command: node node_modules/.bin/atm-start
  memory: 128M
  routes:
  - route: my-sdm.mycompany.net
  buildpack: https://github.com/cloudfoundry/nodejs-buildpack
  env:
    SUPPRESS_NO_CONFIG_WARNING: true
    NODE_ENV: production
```

!!! note
    Technically a `manifest.yml` is not required but it makes things
    simpler.

Next add an `"engines"` top-level entry to your `package.json`
file:

```json
"engines": {
  "node": "8.x.x",
  "npm": "5.x.x"
}
```

Finally, start the deployment with:

```
cf push
```

[cf-cli]: https://docs.cloudfoundry.org/cf-cli/install-go-cli.html (Cloud Foundry CLI)
[cf-docs]: https://docs.cloudfoundry.org/devguide/deploy-apps/deploy-app.html (Cloud Foundry Documentation)
[cf-manifest]: https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html (Cloud Foundry manifest.yml)

## Docker

Shipping your SDM as a Docker image allows you to package
up all required tools and dependencies. This is especially useful if you
plan on reusing existing scripts or command line tools in your automations.

To set up a Docker image build, you need a `Dockerfile`. Read the
documentation on [building Docker images][docker-build] for more
details.

Your SDM probably already has a Dockerfile in it, from the [Dockerfile in the seed][dockerfile-in-seed]. If not, copy that one in.

You should also have [.dockerignore][dockerignore-in-seed].

### Running in Docker locally

In Docker, the SDM will only run in team mode. Local mode does not work yet. [Vote here if you want it.][upvote-local-mode-in-docker]

With the `Dockerfile` in place, you can now start the Docker build. Change the name and version of the tag in this command:

```
npm run build && \
    docker build . -t your-sdm:0.1.0
```

Start by running the Docker container locally. This command lets it use the configuration set up when you ran `atomist config`:

```
docker run --rm --mount source=$HOME/.atomist,target=/root/.atomist,type=bind your-sdm
```

### Deploying with Docker

The Dockerfile supplied in the seeds runs the SDM in development mode. Change ATOMIST_ENV to [production][#production-mode] and rebuild the container
for production deployment, so that when your SDM goes down or restarts, events will be queued.

#### Deploying to Kubernetes

If you deploy to kubernetes, you'll need kubectl installed. Add this to your Dockerfile:

```
RUN curl -sL -o /usr/local/bin/kubectl https://storage.googleapis.com/kubernetes-release/release/v1.8.12/bin/linux/amd64/kubectl \
    && chmod +x /usr/local/bin/kubectl \
    && kubectl version --client
```

You may prefer a later release of kubectl. I won't keep this documentation up-to-date on that.


[docker-build]: https://docs.docker.com/engine/reference/builder/ (Dockerfile Reference)
[dockerfile-in-seed]: https://github.com/atomist-seeds/empty-sdm/blob/master/Dockerfile (Dockerfile from an SDM seed)
[dockerignore-in-seed]: https://github.com/atomist-seeds/empty-sdm/blob/master/.dockerignore (dockerignore from an SDM seed)
[upvote-local-mode-in-docker]: https://github.com/atomist/docs/issues/257 (Upvote this issue if you want local mode in Docker)