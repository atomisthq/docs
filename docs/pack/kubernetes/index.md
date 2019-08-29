Atomist provides the easiest and most flexible way to get from ideas
and customer requests to a solution deployed in
[Kubernetes][kubernetes].  Once deployed, Atomist provides feedback on
the health of running applications and uses standard Kubernetes
mechanisms for zero-downtime deployments.

## Overview

Before getting started, it is helpful to provide some information
about how Atomist interacts with Kubernetes.  Atomist is able to
deploy and update applications and other resources to Kubernetes
clusters as well as report back on the health of those applications,
providing feedback in the Atomist web interface or Slack on
deployments running containers across clusters and namespaces in the
concise, correlated manner users of Atomist expect.

### Kubernetes extension pack

This functionality is driven via a [Software Delivery Machine
(SDM)][sdm] with the [Atomist Kubernetes SDM extension
pack][sdm-pack-k8s].  More information on what the Atomist Kubernetes
SDM extension pack can do and how to use it can be found in the
remaining pages of this section of the documentation.  Detailed
documentation of the Atomist Kubernetes extension pack can be found in
its [API documentation][api].

### Deploying applications

Kubernetes deployments are [goals][], just like any other SDM goal,
which can be scheduled as part of a goal set when code is pushed to a
Git repository.  For example, a push may trigger the creation of a new
Docker image and then the Kubernetes deploy goal can deploy that image
to a Kubernetes cluster.  Kubernetes deploy goals are able to create
[deployments][] to manage the runtime of the application container,
[services][] to provide standard Kubernetes discovery capabilities,
[ingresses][] to provide the properly hosted and secured external
access to services, and [role-based access control (RBAC)][rbac]
resources like roles and service accounts.

### GitOps

The Atomist Kubernetes integration supports full [GitOps][gitops]
functionality, allowing you to synchronize Kubernetes resources to and
from a Git repository.

### Monitoring applications

The Atomist [k8vent][] utility watches pods in your Kubernetes cluster
and sends change events, e.g., container started and container
crashed, back to Atomist.

## Kubernetes integration

For detailed information on how to configure and run the Atomist
Kubernetes integration in your environment, see the following
sections.

* [Kubernetes extension pack][k8s-pack]
* [Deploying applications][deploy]
* [GitOps][sync]
* [Installation][install]
* [Uhura SDM][uhura]

[api]: https://atomist.github.io/sdm-pack-k8s/ (Atomist Kubernetes Extension Pack API Documentation)
[deploy]: deploy.md (Kubernetes Deploy Goal)
[deployments]: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/ (Kubernetes Deployment)
[gitops]: sync.md (Atomist GitOps)
[goals]: ../../developer/goal.md (SDM Goals)
[ingresses]: https://kubernetes.io/docs/concepts/services-networking/ingress/ (Kubernetes Ingress)
[install]: install.md (Installing Atomist Utilities in Kubernetes)
[k8s-pack]: pack.md (Atomist Kubernetes SDM extension pack)
[k8vent]: https://github.com/atomist/k8vent (Atomist k8vent)
[kubernetes]: https://kubernetes.io/ (Kubernetes)
[rbac]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/ (Kubernetes RBAC)
[sdm]: ../../developer/sdm.md (Atomist Software Delivery Machine (SDM))
[sdm-pack-k8s]: https://github.com/atomist/sdm-pack-k8s (Atomist Kubernetes Extension Pack)
[services]: https://kubernetes.io/docs/concepts/services-networking/service/ (Kubernetes Service)
[sync]: sync.md (Atomist GitOps)
