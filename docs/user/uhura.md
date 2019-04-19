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
[uhura-create](#create-a-new-repository)

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

## Commands

The following commands are available from this SDM:

|Intent|Description
|------|-----------|
|`enable atomist/uhura`|Enable uhura on a particular repository. Uhura will look at every push and set goals.|
|`disable atomist/uhura`|Disable uhura on a particular repository|
|`enable org atomist/uhura`|Enable uhura on every repository for an entire organization|
|`disable org atomist/uhura`|Disable uhura on every repository for an entire organization|
|`enable goal atomist/uhura`|Enable a particular goal in uhura| 
|`disable goal atomist/uhura`|Disable a particular goal in uhura|
|`configure deployment atomist/uhura`|Configure deployment goals to customer provided k8s clusters| 
|`provision workspace`|Configure your Atomist workspace to be able to host uhura based goals (for workspaces that were created before April 2019)| 
|`cancel goal sets atomist/uhura`|Cancel all pending or in progress uhura goal sets in your workspace| 
|`list goal sets atomist/uhura`|List all pending or in progress uhura goal sets in your workspace|

<!-- TODO: link to how to run a command -->

## Goals

These are the goals set and run by Uhura on pushes to your projects, when they are created by Uhura's [generator][uhura-create] or enabled with a command like `enable atomist/uhura`.

Uhura runs in Atomist's cloud by default. 

* _Initial Push_: when you first create a project using the Uhura based generator 
* _Subsequent Pushes_: all pushes to any repositories uhura is enabled on

|Goal|Description|Initial Push|Subsequent Pushes|Enabled by default|
|----|-----------|:----------:|:---------------:|:---------------:|
|Queue|Uhura only allows execution of 2 parallel goal sets per workspace; the Queue goal handles the necessary queuing|x|x| |
|Autofix|Runs formatting and linting tools as configured in your project|x|x|yes|
|Code inspection|Runs code linter and other review tools and raises issues for violations (`eslint`, `npm audit`)|x|x|no|
|Fingerprint|Calculates code and configuration fingperprints for Docker base images and NPM dependencies|x|x|no|
|Version|Calculates the next project version used for the goal set|x|x| |
|Build|Runs the `npm run build` script if it exists in the `package.json`|x|x| |
|Test|Runs the `npm run test` script if it exists in the `package.json`|x|x| |
|Docker build|Runs `docker build` and pushes the image to a workspace specific Docker registry; the docker registry is specific to your workspace and is not shared beyond the boundaries of the workspace|x|x| |
|Uhura test deploy|Test deploying Docker image to an Atomist provided k8s cluster and providing an public HTTP endpoint |only if custom deployment is *not* configured| | |
|Verify uhura test deploy|Verifying that the public test HTTP endpoint is accessible|only if custom deployment is *not* configured| | |
|Stop uhura test deploy|Shut down the test deployment after 10 minutes|only if custom deployment is *not* configured| | |
|Deploy to testing|Deploy the Docker image to a customer provided k8s cluster into the testing namespace|only if custom deployment is configured|x| |
|Deploy to production|Deploy the Docker image to a customer provided k8s cluster into the production namespace|only if custom deployment is configured|x| |

When Uhura is deploying to Atomist's Kubernetes instance, it can only deploy the initial push. 
For more, [configure it][configure-k8s] with your Kubernetes instance, or better yet, 
make Uhura yours.

Customize the Uhura SDM for your team with the [Developer Quick Start](../quick-start.md).

[github]: https://github.com/atomist/uhura