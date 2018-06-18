Atomist provides the easiest and most flexible way to get from ideas
and customer requests to a solution deployed in
[Kubernetes][kubernetes].  Once deployed, Atomist provides feedback on
the health of running applications and uses standard Kubernetes
mechanism for zero-downtime deployments.

[kubernetes]: https://kubernetes.io/ (Kubernetes)

## Overview

Before getting started, it is helpful to provide some information
about how Atomist interacts with Kubernetes.  Atomist is able to
deploy and update applications to Kubernetes as well as report back on
the health of those applications, providing feedback in the Atomist
dashboard or Slack on deployments running containers across clusters
and namespaces in the concise, correlated manner users of Atomist
expect.

### Deploying and updating applications

The Atomist [k8-automation][] utility manages deploying and updating
applications.  It is able to create deployments to manage the runtime
of the application container, services to provide standard Kubernetes
discovery capabilities, and ingresses to provide the properly hosted
and secured external access to services.

The k8-automation utility runs inside each Kubernetes cluster you want
to deploy applications to, using a Kubernetes [service account][sa]
with only the permissions needed to create, read, update, and delete
namespaces, deployments, services, and ingresses.

[k8-automation]: https://github.com/atomist/k8-automation (Atomist k8-automation)
[sa]: https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/ (Kubernetes Service Accounts)

### Container status

The Atomist [k8vent][] utility watches pods in your Kubernetes cluster
and sends change events, e.g., container started and container
crashed, back to Atomist.

Like k8-automation, the k8vent utility runs inside each Kubernetes
cluster you want events from, using a Kubernetes [service account][sa]
with only the permissions needed to watch pod events.

[k8vent]: https://github.com/atomist/k8vent (Atomist k8vent)

### Role-Based Access Control (RBAC)

To perform their tasks, the Atomist utilities running within a
Kubernetes cluster need access to do so.  In modern, i.e., version 1.6
or greater, Kubernetes clusters, this access is provided using
[role-based access control (RBAC)][rbac].  Briefly, a service account
is created and bound to roles with the appropriate privileges.  The
pod is then configured to use the service account when accessing the
Kubernetes API using the in-cluster client.

Part of deploying the Atomist utilities to your Kubernetes cluster is
creating the needed RBAC resources.  To create RBAC resources, your
Kubernetes user needs admin privileges.  If your Kubernetes user does
not have admin privileges in the cluster or a namespace, someone whose
Kuberetes user has those privileges will need to deploy the Atomist
utilities.

If you see errors like the following when you try to deploy the
Atomist utilities to your Kubernetes cluster,

```
Error from server (Forbidden): error when creating "rbac.yaml": clusterroles.rbac.authorization.k8s.io "k8-automation-clusterrole" is forbidden: attempt to grant extra privileges: [...] user=&{YOUR_USER  [system:authenticated] map[]} ownerrules=[PolicyRule{Resources:["selfsubjectaccessreviews"], APIGroups:["authorization.k8s.io"], Verbs:["create"]} PolicyRule{NonResourceURLs:["/api" "/api/*" "/apis" "/apis/*" "/healthz" "/swagger-2.0.0.pb-v1" "/swagger.json" "/swaggerapi" "/swaggerapi/*" "/version"], Verbs:["get"]}] ruleResolutionErrors=[]
```

then your Kubernetes user does not have administrative privileges on
your cluster/namespace.  You will either need to ask someone who has
admin privileges on the cluster/namespace to create the RBAC resources
or try to escalate your privileges in the cluster/namespace.  In the
following commands, replace `USER` with your Kubernetes user name.
To attempt to provide your Kubernetes user with cluster admin
privileges, run:

```
kubectl create clusterrolebinding USER-cluster-admin-binding \
    --clusterrole=cluster-admin --user=USER
```

To attempt to provide your Kubernetes user with namespace admin
privileges, run:

```
kubectl create --namespace=NAMESPACE rolebinding USER-admin-binding \
    --clusterrole=admin --user=USER
```

Then run the command to deploy the Atomist utilities again.

!!! hint "GKE and RBAC"
    By default, the user you authenticate with a GKE cluster does not have
    sufficient permissions to install the Atomist Kubernetes utilities.
    To grant your user the necessary permissions, run the cluster-wide command
    above replacing `USER` in the commands above with
    `$(gcloud config get-value account)`:

    ```
    kubectl create clusterrolebinding \
        $(gcloud config get-value account)-cluster-admin-binding \
        --clusterrole=cluster-admin --user=$(gcloud config get-value account)
    ```

If you are running an older version of Kubernetes that does not
support RBAC, either upgrade your Kubernetes cluster or <a
class="contact" href="mailto:support@atomist.com" title="Contact
Atomist">contact us</a> for help in deploying the Atomist utilities.

[rbac]: https://kubernetes.io/docs/admin/authorization/rbac/ (Kubernetes - Using RBAC Authorization)

### Cluster vs. namespace

The Atomist utilities can run in two modes: cluster wide and namespace
scoped.  If your Kubernetes user has cluster-admin role access, which
is typically the case if you created the cluster, you can and probably
should deploy Atomist utilities in cluster-wide mode.  This allows
these utilities to manage and report on applications across all
namespaces in your cluster.  If you are limited to managing Kubernetes
resources in a single namespace and your user has admin role access to
that namespace, you should probably install in namespace-scoped mode.
If your Kubernetes user has neither cluster-admin or admin role
access, you will need to ask someone who does to install the Atomist
utilities in your cluster.

## Prerequisites

Before you connect Atomist and your Kubernetes cluster(s), you need a
few prerequisites.

### Atomist workspace

You must have an Atomist workspace.  If you do not already have one,
you can create one following the instructions in the [getting started
documentation][getting-started].

[getting-started]: index.md (Atomist - Getting Started)

### Kubernetes cluster

You must have a Kubernetes cluster and access to that cluster as a
user with either cluster-admin role privileges to run in cluster-wide
mode or admin role privileges within a namespace to run in
namespace-scoped mode.  If you do not have access to a Kubernetes
cluster, you can create one on your local system using [minikube][].

[minikube]: https://kubernetes.io/docs/getting-started-guides/minikube/ (Running Kubernetes Locally via Minikube)

## Installation

Several different methods for installing the Atomist Kubernetes
utilities are supported.  Choose the one that makes sense for your
situation.

Before you proceed, make sure you have installed and configured the
Atomist CLI.  You can do so with the following commands.

```
npm install -g @atomist/automation-client
atomist config
```

See the [developer documentation][dev-doc] for more details.

The commands below use values which are specific to your setup.  To
make copy-and-pasting easier, it is helpful to set some variables
before proceeding.  In the commands below, replace `WORKSPACE_ID` with
your Atomist workspace/team ID, `TOKEN` with your GitHub personal
access token having at least "read:org" scope, and `CLUSTER_ENV` with
a meaningful name for your cluster/namespace, e.g., "production" or
"internal".

```
workspace_id=WORKSPACE_ID
token=TOKEN
cluster_env=CLUSTER_ENV
```

If you are deploying in namespace-scoped mode, also set the following
variable, replacing `NAMESPACE` with the name of the _existing_
namespace to which you are deploying.

```
namespace=NAMESPACE
```

[dev-doc]: ../developer/prerequisites.md (Atomist Developer Prerequisites)

<!--

### Atomist CLI

If you have the `kubectl` command line utility installed and
configured to access your Kubernetes cluster with the needed
privileges, you can install the needed Atomist utilities with the
proper configuration using one the following command.

#### Cluster-wide mode

```
atomist kube
```

#### Namespace-scoped mode

Replace `NAMESPACE` with the namespace you want to deploy into and
have the Atomist utilities work in.

```
atomist kube --namespace=NAMESPACE
```

-->

### Kubernetes CLI

If you have the `kubectl` command line utility installed and
configured to access your Kubernetes cluster with the needed
privileges, you can install the needed Atomist utilities with the
proper configuration using the following commands.

#### Cluster-wide mode

##### k8-automation

To deploy k8-automation in cluster-wide mode with the ability to
manage applications in all namespaces, run the following command.

```
kubectl apply --filename=https://raw.githubusercontent.com/atomist/k8-automation/master/assets/kubectl/cluster-wide.yaml
kubectl create secret --namespace=k8-automation generic automation \
    --from-literal=config="{\"teamIds\":[\"$workspace_id\"],\"token\":\"$token\",\"environment\":\"$cluster_env\"}"
```

##### k8vent

To deploy k8vent in cluster-wide mode and have it report on changes to
all pod containers, run the following command, replacing `CLUSTER_ENV`
with an informative name for your Kubernetes cluster, e.g., "internal"
or "end-user".

```
kubectl apply --filename=https://raw.githubusercontent.com/atomist/k8vent/master/kube/kubectl/cluster-wide.yaml
kubectl create secret --namespace=k8vent generic k8vent --from-literal=environment="$cluster_env" \
    --from-literal=webhooks="https://webhook.atomist.com/atomist/kube/teams/$workspace_id"
```

#### Namespace-scoped mode

If you want the Atomist utilities manage and report on multiple, but
not all, namespaces, deploy them in namespace-scoped mode in each of
the namespaces you want it to manage/report on.

##### k8-automation

To deploy k8-automation in namespace-scoped mode such that it will
only deploy and update resources in a single Kubernetes cluster
namespace, run the following commands.

```
kubectl create secret --namespace="$namespace" generic automation \
    --from-literal=config="{\"teamIds\":[\"$workspace_id\"],\"token\":\"$token\",\"environment\":\"$cluster_env\",\"kubernetes\":{\"mode\":\"namespace\"}}"
kubectl apply --namespace="$namespace" \
    --filename=https://raw.githubusercontent.com/atomist/k8-automation/master/assets/kubectl/namespace-scoped.yaml
```

##### k8vent

To deploy k8vent in namespace-scoped mode such that it will only
report on pod containers in a single namespace, run the following
commands, replacing `CLUSTER_ENV` with an informative name for your
Kubernetes cluster namespace, e.g., "production" or "testing".

```
kubectl create secret --namespace="$namespace" generic k8vent \
    --from-literal=environment="$cluster_env" \
    --from-literal=webhooks="https://webhook.atomist.com/atomist/kube/teams/$workspace_id"
kubectl apply --namespace="$namespace" \
    --filename=https://raw.githubusercontent.com/atomist/k8vent/master/kube/kubectl/namespace-scoped.yaml
```

### Helm

If you manage resources in your Kubernetes cluster with [Helm][helm],
you can install the Atomist Kubernetes utilities using Helm.

!!! bug "Helm and Minikube"
    Due to a bug in the default minikube bootstrapper localkube,
    [kubernetes/helm#3135: Helm 2.7.0 creates RBAC resource
    fail][localkube-bug], if you want to manage RBAC resources using Helm
    in minikube, you must start minikube using the kubeadm bootstrapper.

    ```
    minikube start --bootstrapper kubeadm
    ```

    You can make kubeadm your default bootstrapper by running the
    following command.

    ```
    minikube config set bootstrapper kubeadm
    ```

[helm]: https://helm.sh/ (Helm Package Manager for Kubernetes)
[localkube-bug]: https://github.com/kubernetes/helm/issues/3135#issuecomment-344291890

#### Cluster-wide mode

To install all of the Atomist Kubernetes utilities in cluster-wide
mode, run the following `helm` command.

```
helm upgrade --install --namespace=atomist atomist-utilities \
    --repo=https://atomist.github.io/helm-charts atomist-utilities \
    --set=global.atomist.token="$token" \
    --set=global.atomist.teamIds="{$workspace_id}" \
    --set=global.atomist.environment="$cluster_env"
```

#### Namespace-scoped mode

To install all of the Atomist Kubernetes utilities in namespace-scoped
mode, run the following `helm` command for each namespace you want to
deploy them to.

```
helm upgrade --install --namespace="$namespace" "atomist-utilities-$namespace" \
    --repo=https://atomist.github.io/helm-charts atomist-utilities \
    --set=global.atomist.token="$token" \
    --set=global.atomist.teamIds="{$workspace_id}" \
    --set=global.atomist.environment="$cluster_env" \
    --set=global.atomist.mode=namespace
```

<!--

### ksonnet

Coming soon.

-->

## Updating

You can update to a new version of the Atomist Kubernetes utilities
using standard Kubernetes approaches.  If you are using Helm, you can
simply re-run the commands you ran to install the Atomist Kubernetes
utilities.  If you are using `kubectl` you can run the following
commands, replacing `NAMESPACE` and `M.N.P` as appropriate.

```
kubectl set image --namespace=NAMESPACE \
    deployment/k8vent k8vent=atomist/k8vent:M.N.P
kubectl set image --namespace=NAMESPACE \
    deployment/k8-automation k8-automation=atomist/k8-automation:M.N.P
```

You can always find the latest versions of
[k8-automation][k8-automation-latest] and [k8vent][k8vent-latest] on
their release pages.

[k8-automation-latest]: https://github.com/atomist/k8-automation/releases/latest (k8-automation Latest Release)
[k8vent-latest]: https://github.com/atomist/k8vent/releases/latest (k8vent Latest Release)
