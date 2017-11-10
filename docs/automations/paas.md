# Running Automation Clients

The distributed architecture of the Atomist automation platform makes it
possible to run automation clients in many different environments, 
ranging from Platform-as-a-Service offerings like Heroku and Pivotal 
Cloud Foundry to running it on your laptop or in your own datacenter. 

Certainly we support running clients as Docker containers, allowing you
to operate them eg in Kubernetes clusters or Google Cloud Platform.

In the following sections, we'll discuss how to run clients in several
different environments.

## Running locally

The easiest way to start and run an automation client is to start it up
on your local development machine. 

If you bootstrapped your client project using one of our seeds and 
generators, you'll be able to simply start the client by running the 
following commands:

```
npm compile && \
    npm run start
```
Assuming you don't have any other process running on port `2866`, the 
client should start up with issues.

!!! note
    The automation client requires an open internet connection to 
    `https://automation.atomist.com` to successfully and register event
    subscriptions.

The ability to run the automation client locally is a really great asset
during development of your automations. It allows you to debug our 
handlers using local development tools like Visual Studio Code or
Google Chrome. This makes iterating on changes really fast. There is no
long deployment or build process involved.

## Cloud Foundry

To push your automation client to an instance of Pivotal Cloud Foundry,
you need an account on the instance you want to target and have the
[Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) 
installed.

Very detailed information about the deployment process are available in 
the [Cloud Foundry documentation](https://docs.cloudfoundry.org/devguide/deploy-apps/deploy-app.html).

A push to Cloud Foundry needs some additional meta data in your project.
First you need to create a [`manifest.yml`]() file in the root of your 
client:

```yaml
applications:
- name: lifecycle-automation
  command: node node_modules/.bin/atomist-client
  memory: 128M
  routes:
  - route: lifecycle.atomist.io
  buildpack: https://github.com/cloudfoundry/nodejs-buildpack
  env:
    SUPPRESS_NO_CONFIG_WARNING: true
    NODE_ENV: production
```

!!! note
    Technically a `manifest.yml` is not required but it makes things 
    simpler. 

Next please add an `"engines"` top-level entry to your `package.json`
file like the following:

```json
  "engines": {
    "node": "8.x.x",
    "npm": "5.x.x"
  }
```

Finally you can start the deployment with:

```
cf push
```
## Docker

Shipping your automation client as a Docker image allows you to package
up all required tools and dependencies. This is especially useful if you
plan on reusing existing scripts or command line tools in your automations.

To set up a Docker image build, we need a `Dockerfile`. Read the documentation
on [building Docker images](https://docs.docker.com/engine/reference/builder/)
for more details.

```
FROM node:9

# Create application directory
RUN mkdir -p /app
WORKDIR /app

# Install application dependencies
COPY package.json /app/
RUN npm install

# Bundle app source
COPY . /application

ENV SUPPRESS_NO_CONFIG_WARNING true
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV production

EXPOSE 2866

CMD [ "npm", "start" ]
```

Additionally it makes sense to create `.dockerignore` to exclude files
and directories that aren't needed at runtime. 

```
/node_modules
```

With our `Dockerfile` in place, the actual Docker build can now be 
started:

```
npm run compile && \
    docker build . -t lifecycle-automation:0.1.0
```

After successful build the image can be pushed to any Docker image 
registry with:

```
docker push lifecycle-automation:0.1.0
```
