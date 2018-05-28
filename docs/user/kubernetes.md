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
and namespaces in the concise, correlated manner users of Atomist have
become accustomed to.

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

### Cluster vs. namespace

Both k8-automation and k8vent can run in two modes: cluster wide and
namespace scoped.  If your Kubernetes user has cluster-admin role
access, which is typically the case if you created the cluster, you
can and probably should deploy k8-automation and k8vent in
cluster-wide mode.  This allows these utilities to manage and report
on applications across all namespaces in your cluster.  If you are
limited to managing Kubernetes resources in a single namespace and
your user has admin role access to that namespace, you should probably
install in namespace-scoped mode.  If your Kubernetes user has neither
cluster-admin or admin role access, you will need to ask someone who
does to install the Atomist utilities in your cluster.  See the
Kubernetes [Role-Based Access Control (RBAC) documentation][rbac] for
more information on access privileges in Kubernetes.

[rbac]: https://kubernetes.io/docs/admin/authorization/rbac/ (Kubernetes - Using RBAC Authorization)

## Prerequisites

Before you connect Atomist and your Kubernetes cluster(s), you need a
few prerequisites.

### Atomist workspace

You must have an Atomist workspace.  If you do not already have one,
you can create one following the instructions in the [getting started
documentation][getting-started].

[getting-started]: index.md (Atomist - Getting Started)

### Kubernetes cluster

You must have a Kubernetes cluster where you are able to create
resources, i.e., use the `kubectl` command-line utility to create
deployments, services, etc.  If you do not have access to a Kubernetes
cluster, you can create one on your local system using [minikube][].

In addition, you must have access to a Kubernetes user with
cluster-admin role privileges to run in cluster-wide mode or admin
role privileges within a namespace to run in namespace-scoped mode.

!!! hint "GKE and RBAC"
    By default, the user you authenticate with a GKE cluster does not have
    sufficient permissions to install the Atomist Kubernetes utilities.
    To grant your user the necessary permissions, run the following
    command.

    ```
    $ kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin \
        --user $(gcloud config get-value account)
    ```

[minikube]: https://kubernetes.io/docs/getting-started-guides/minikube/ (Running Kubernetes Locally via Minikube)

## Installation

Several different methods for installing the Atomist Kubernetes
utilities are supported.  Choose the one that makes sense for your
situation.

!!! note
    In the commands below, replace `TEAM_ID` with your Atomist
    workspace/team ID and `TOKEN` with your GitHub personal access token
    having at least "read:org" scope.

Before you proceed, make sure you have installed and configured the
Atomist CLI.  You can do so with the following commands.

```
$ npm install -g @atomist/automation-client
$ atomist config
```

See the [getting started documentation][getting-started] for more
details.

[enroll]: enroll.md (Atomist - Getting Started)

### Atomist CLI

If you have the `kubectl` command line utility installed and
configured to access your Kubernetes cluster with the needed
privileges, you can install the needed Atomist utilities with the
proper configuration using the following command.  Replace `MODE` with
`cluster` for cluster-wide mode or `namespace` for namespace-scoped
mode.

```
$ atomist kube --mode=MODE
```

### Kubernetes CLI

If you have the `kubectl` command line utility installed and
configured to access your Kubernetes cluster with the needed
privileges, you can install the needed Atomist utilities with the
proper configuration using the following commands.

#### Cluster-wide mode

```
$ kubectl apply -f https://raw.githubusercontent.com/atomist/k8-automation/master/assets/kube/cluster/namespace.json
$ kubectl create secret --namespace=k8-automation generic automation \
    --from-literal=config='{"teamIds":["TEAM_ID"],"token":"TOKEN"}'
$ kubectl apply -f https://raw.githubusercontent.com/atomist/k8-automation/master/assets/kube/cluster/serviceaccount.json
$ kubectl apply -f https://raw.githubusercontent.com/atomist/k8-automation/master/assets/kube/cluster/role.json
$ kubectl apply -f https://raw.githubusercontent.com/atomist/k8-automation/master/assets/kube/cluster/rolebinding.json
$ kubectl apply -f https://raw.githubusercontent.com/atomist/k8-automation/master/assets/kube/cluster/deployment.json
```

#### Namespace-scoped mode

Replace `NAMESPACE` with the name of the namespace in which you have
admin role privileges.

```
$ kubectl create secret --namespace=NAMESPACE generic automation \
    --from-literal=config='{"teamIds":["TEAM_ID"],"token":"TOKEN"}'
$ kubectl apply -f https://raw.githubusercontent.com/atomist/k8-automation/master/assets/kube/namespace/serviceaccount.json
$ kubectl apply -f https://raw.githubusercontent.com/atomist/k8-automation/master/assets/kube/namespace/role.json
$ kubectl apply -f https://raw.githubusercontent.com/atomist/k8-automation/master/assets/kube/namespace/rolebinding.json
$ kubectl apply -f https://raw.githubusercontent.com/atomist/k8-automation/master/assets/kube/namespace/deployment.json
```

### Helm

If you manage resources in your Kubernetes cluster with Helm, you can
install the Atomist Kubernetes utilities with the following commands.

```console
$ helm upgrade --install --namespace=k8-automation k8-automation \
    --set=secret.token="TOKEN" --set=config.teamIds="{TEAM_ID}" \
    https://raw.githubusercontent.com/atomist/k8-automation/master/assets/helm/
```

!!! bug "Helm and Minikube"
    Due to a bug in the default minikube bootstrapper localkube,
    [kubernetes/helm#3135: Helm 2.7.0 creates RBAC resource
    fail][localkube-bug], if you want to manage RBAC resources using Helm
    in minikube, you must start minikube using the kubeadm bootstrapper.

    ```
    $ minikube start --bootstrapper kubeadm
    ```

    You can make kubeadm your default bootstrapper by running the
    following command.

    ```
    $ minikube config set bootstrapper kubeadm
    ```

[localkube-bug]: https://github.com/kubernetes/helm/issues/3135#issuecomment-344291890

### ksonnet

Coming soon.
