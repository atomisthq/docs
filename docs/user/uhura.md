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

[github]: https://github.com/atomist/uhura

## Create a new repository

Uhura defines a [project generator](../developer/create.md) for Node projects. This takes an existing repository as a starting point
for a new one, modifies the code, and creates a new repository for you to build on.

To try this out, go to the [web app][] and click the "New Project" plus icon on the left.

[web app]: https://app.atomist.com (Atomist web app)

The globally available Uhura instance offers three starting points, each in the [atomist-seeds](https://github.com/atomist-seeds) organization, each forked from a handy
public Node project.

## Configure Uhura to deploy to your Kubernetes cluster
[configure-k8s]: #configure-uhura-to-deploy-to-your-kubernetes-cluster

If you can deploy to Kubernetes from your computer, then you can configure Uhura to deploy your
applications there. Find [instructions here](../pack/kubernetes-with-uhura.md).

## Next Steps

Customize the Uhura SDM for your team: see the [Developer Quick Start](../quick-start.md)

[github]: https://github.com/atomist/uhura