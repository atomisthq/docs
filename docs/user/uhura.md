The Uhura SDM performs delivery automatically on enabled projects. It looks at the content
of the project and decides what to do.

Currently the Uhura SDM knows how to build Node projects with `build`, `test`, or `lint` scripts
defined in `package.json`. This SDM is designed to add more capabilities to deliver different stacks.

Atomist operates a version of the Uhura SDM that is available to all Atomist workspaces. It can deploy
applications on Kubernetes: our Kubernetes for demo purposes, and then your Kubernetes cluster when you configure it.

Uhura can:

* Demonstrate Atomist delivery, by creating a Node repository and then deploying it to our Kubernetes so that you can see what that looks like.
* Deliver your Node projects to your Kubernetes cluster, once you [configure it][configure-k8s]. These can be based on our sample starting points, or your existing projects that follow certain conventions.
* Be a starting point for your own SDM: [create and run an Uhura SDM of your own](../quick-start.md), and it will replace the globally available instance. Customize with the full power of TypeScript, and complete control over your SDM's environment.

For more information, check the Uhura project on [GitHub][].

## Configure Uhura to deploy to your Kubernetes cluster
[configure-k8s]: #configure-uhura-to-deploy-to-your-kubernetes-cluster

If you can deploy to Kubernetes from your computer, then you can configure the Uhura SDM to deploy your
applications there.

### Set up connections

* Install the latest version of the [Atomist CLI](../developer/cli.md) with `npm install -g @atomist/cli`.
* Run `atomist config` to connect to your Atomist workspace with an API Key
* Set up your own environment to deploy to kubernetes: `minikube start` if you're running Kubernetes locally, or set your context with `kubectl config`.

### Install Atomist deployment into your cluster

* Run `atomist kube --environment=my-kube-env` (where my-kube-env is a string of your choice)

This will install two applications into your cluster:

[`k8s-sdm`](https://github.com/atomist/k8s-sdm) is a software delivery machine that only does deployment
of your projects. It connects to Atomist for triggering, then performs the deployments into the cluster it runs in.

[`k8vent`](https://github.com/atomist/k8vent) listens to Kubernetes events and sends them to Atomist, which connects them to other events. With these, [push notifications](lifecycle.md) display services and containers running, relating commits to the environments where they are deployed.

### Tell Uhura to deploy here

Your next objective is to run a command to configure Uhura to deploy to the environment you just defined:

`configure deployment atomist uhura cluster=my-kube-env goal=testing`
`configure deployment atomist uhura cluster=my-kube-env goal=production`

where `my-kube-env` is the string you used above. You can use different clusters as testing and production targets, as long as you set them both up using the steps above.

How do you run a command? If you have integrated Atomist with [chat], you can send Atomist a direct message. Otherwise:

* log in to the [Atomist web app](https://app.atomist.com)
* go to the SDM page
* click on `Command Shell`
* in the little prompt that pops up, enter the command.
* see a response in the notification bar on the right.

### Try it

The next time you push code to a project that is enabled for Uhura, you'll see deploy goals for testing and production.
When these execute, they will deploy your project into your own cluster.

[github]: https://github.com/atomist/uhura