The instructions below detail how to enable the Atomist Kubernetes
integration in your Kubernetes cluster(s).

## Prerequisites

Before you connect Atomist and your Kubernetes cluster(s), you need a
few prerequisites.

### Atomist workspace

You must have an Atomist workspace.  If you do not already have one,
you can create one following the instructions in the [getting started
documentation][getting-started].

[getting-started]: ../../getting-started.md (Atomist - Getting Started)

### Kubernetes cluster

You must have a Kubernetes cluster and access to that cluster as a
user with either cluster-admin role privileges to run in cluster-wide
mode or admin role privileges within a namespace to run in
namespace-scoped mode.  If you do not have access to a Kubernetes
cluster, you can create one on your local system using [minikube][].

[minikube]: https://kubernetes.io/docs/getting-started-guides/minikube/ (Running Kubernetes Locally via Minikube)

## Concepts

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

If you want the Atomist Kubernetes utilities to report on and manage
resources in several but not all namespaces, you can deploy the
Atomist utilities using namespace-scoped mode multiple times, one time
for each namespace you want reported on and managed.

!!! hint
    If possible, we recomment installing in cluster mode.

### Cluster environment

When sending information about pod activity back to Atomist,
[k8vent][] includes an "environment" tag so you can distinguish
activity from one k8vent instance from another.  The "environment" is
any unique name that identifies your Kubernetes cluster, if k8vent is
deployed in cluster mode, or cluster and namespace, if k8vent is
deploy in namespace mode, for you.  Typical environments are
"production", "end-user", "uat", "staging", etc.

The cluster environment you provide when installing the Atomist
Kubernetes utilities will be used when reporting on Kubernetes pod
container activity in development lifecycle messages.  For example,
the following image shows the containers that are running a specific
Docker image from a specific commit and build in various namespaces in
the Kubernetes cluster environment "gke-int-demo".

![Kubernetes Development Lifecycle Message](img/kubernetes-lifecycle.png)

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
Kubernetes user has those privileges will need to deploy the Atomist
utilities.

## Installation

Several different methods for installing the Atomist Kubernetes
utilities are supported.  Choose the one that makes sense for your
situation.  If you aren't sure how to proceed, try the [Atomist
CLI](#atomist-cli) approach as it is the easiest.

### Atomist CLI

To use the Atomist CLI to install the Atomist Kubernetes utilities,
you must have the [Atomist CLI installed and configured][dev-prereq].
You will also need the Kubernetes [`kubectl`][kubectl-install
command-line utility installed and configured to access your
Kubernetes cluster with the needed privileges.

Once you have the Atomist and Kubernetes CLIs installed and
configured, you can install the Atomist Kubernetes utilities one the
following commands.  Be sure to replace `CLUSTER_ENV` with a unique,
meaningful name for you Kubernetes cluster/namespace and, if deploying
in namespace-scoped mode, `NAMESPACE` with the _existing_ namespace
you want to deploy the utilities to.

[dev-prereq]: ../../developer/prerequisites.md (Atomist Developer Prerequisites)
[kubectl-install]: https://kubernetes.io/docs/tasks/tools/install-kubectl/ (Install and Set Up kubectl)

#### Cluster-wide mode

To install the Atomist Kubernetes utilities in cluster-wide mode, able
to report on and manage resources in all namespaces, run the following
command.

```
atomist kube --environment="CLUSTER_ENV"
```

#### Namespace-scoped mode

To install the Atomist Kubernetes utilities in namespace-scoped mode,
run the following command for each namespace you want to deploy them
to.  Make sure you use a unique `CLUSTER_ENV` for each namespace.

```
atomist kube --namespace="NAMESPACE" --environment="CLUSTER_ENV"
```

### Kubernetes CLI

If you have the `kubectl` command-line utility installed and
configured to access your Kubernetes cluster with the needed
privileges, you can install the needed Atomist utilities with the
proper configuration using the following commands.  Be sure to replace
`CLUSTER_ENV` with a unique, meaningful name for you Kubernetes
cluster/namespace, `WORKSPACE_ID` with your Atomist workspace ID, and
`API_KEY` with a valid Atomist API key.  See the [developer
prerequisites][dev-prereq] for more information on Atomist workspace
IDs and API keys.

#### Cluster-wide mode

##### k8vent

To deploy k8vent in cluster-wide mode and have it report on changes to
all pod containers, run the following command.

```
kubectl apply --filename=https://raw.githubusercontent.com/atomist/k8vent/master/kube/kubectl/cluster-wide.yaml
kubectl create secret --namespace=k8vent generic k8vent --from-literal=environment="CLUSTER_ENV" \
    --from-literal=webhooks="https://webhook.atomist.com/atomist/kube/teams/WORKSPACE_ID"
```

##### k8s-sdm

To deploy k8s-sdm in cluster-wide mode with the ability to
manage applications in all namespaces, run the following command.

```
kubectl apply --filename=https://raw.githubusercontent.com/atomist/k8s-sdm/master/assets/kubectl/cluster-wide.yaml
kubectl create secret --namespace=k8s-sdm generic k8s-sdm \
    --from-literal=client.config.json="{\"workspaceIds\":[\"WORKSPACE_ID\"],\"apiKey\":\"API_KEY\",\"name\":\"@atomist/k8s-sdm_CLUSTER_ENV\"}"
```

#### Namespace-scoped mode

In the commands below, replace `NAMESPACE` with the namespace you want
to deploy the utilities to.

##### k8vent

To deploy k8vent in namespace-scoped mode such that it will only
report on pod containers in a single namespace, run the following
commands.

```
kubectl create secret --namespace="NAMESPACE" generic k8vent \
    --from-literal=environment="CLUSTER_ENV" \
    --from-literal=webhooks="https://webhook.atomist.com/atomist/kube/teams/WORKSPACE_ID"
kubectl apply --namespace="NAMESPACE" \
    --filename=https://raw.githubusercontent.com/atomist/k8vent/master/kube/kubectl/namespace-scoped.yaml
```

##### k8s-sdm

To deploy k8s-sdm in namespace-scoped mode such that it will
only deploy and update resources in a single Kubernetes cluster
namespace, run the following commands.

```
kubectl create secret --namespace="NAMESPACE" generic k8s-sdm \
    --from-literal=client.config.json="{\"workspaceIds\":[\"WORKSPACE_ID\"],\"apiKey\":\"API_KEY\",\"name\":\"@atomist/k8s-sdm_CLUSTER_ENV\"}"
kubectl apply --namespace="NAMESPACE" \
    --filename=https://raw.githubusercontent.com/atomist/k8s-sdm/master/assets/kubectl/namespace-scoped.yaml
```

## Updating

You can update to a new version of the Atomist Kubernetes utilities
using standard Kubernetes approaches.  If you installed the Atomist
utilities using the Atomist CLI, re-run the same command you ran to
install them.  If you are using `kubectl` you can run the following
commands, replacing `NAMESPACE` and `M.N.P` as appropriate.

```
kubectl set image --namespace=NAMESPACE \
    deployment/k8vent k8vent=atomist/k8vent:M.N.P
kubectl set image --namespace=NAMESPACE \
    deployment/k8s-sdm k8s-sdm=atomist/k8s-sdm:M.N.P
```

You can always find the latest versions of [k8s-sdm][k8s-sdm-latest]
and [k8vent][k8vent-latest] on their release pages.

[k8s-sdm-latest]: https://github.com/atomist/k8s-sdm/releases/latest (k8s-sdm Latest Release)
[k8vent-latest]: https://github.com/atomist/k8vent/releases/latest (k8vent Latest Release)

## Troubleshooting

If you see errors like the following when you try to deploy the
Atomist utilities to your Kubernetes cluster,

```
Error from server (Forbidden): error when creating "rbac.yaml": clusterroles.rbac.authorization.k8s.io "k8s-sdm-clusterrole" is forbidden: attempt to grant extra privileges: [...] user=&{YOUR_USER  [system:authenticated] map[]} ownerrules=[PolicyRule{Resources:["selfsubjectaccessreviews"], APIGroups:["authorization.k8s.io"], Verbs:["create"]} PolicyRule{NonResourceURLs:["/api" "/api/*" "/apis" "/apis/*" "/healthz" "/swagger-2.0.0.pb-v1" "/swagger.json" "/swaggerapi" "/swaggerapi/*" "/version"], Verbs:["get"]}] ruleResolutionErrors=[]
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
        $(gcloud config get-value account | sed 's/@.*//')-cluster-admin-binding \
        --clusterrole=cluster-admin --user=$(gcloud config get-value account)
    ```

[rbac]: https://kubernetes.io/docs/admin/authorization/rbac/ (Kubernetes - Using RBAC Authorization)

If you see errors like the following when you try to deploy the
Atomist utilities to your Kubernetes cluster,

```
unable to decode "https://raw.githubusercontent.com/atomist/k8vent/master/kube/kubectl/cluster-wide.yaml": no kind "ClusterRole" is registered for version "rbac.authorization.k8s.io/v1beta1"
unable to decode "https://raw.githubusercontent.com/atomist/k8vent/master/kube/kubectl/cluster-wide.yaml": no kind "ClusterRoleBinding" is registered for version "rbac.authorization.k8s.io/v1beta1"
```

then either your `kubectl` CLI, Kubernetes cluster, or both are too
old and do not support RBAC.  Upgrade your `kubectl` CLI and
Kubernetes cluster or <a class="contact"
href="mailto:support@atomist.com" title="Contact Atomist">contact
us</a> for help in deploying the Atomist utilities.
