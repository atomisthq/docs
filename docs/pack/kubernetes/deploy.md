Deployments of applications to [Kubernetes][kubernetes] clusters is
managed through an SDM goal.  An "application" is defined as the set
of Kubernetes resources associated with a single deployable unit,
typically comprised of a Kubernetes [deployment resource][deployment]
and optionally Kubernetes [service][], [ingress][], [secret][],
[service account][sa], [role][], and [role binding][rb] resources.
See the [Kubernetes documentation][kube-doc] for information on
Kubernetes resources and concepts.

[kubernetes]: https://kubernetes.io/ (Kubernetes)
[deployment]: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/ (Kubernetes Deployment)
[service]: https://kubernetes.io/docs/concepts/services-networking/service/ (Kubernetes Service)
[ingress]: https://kubernetes.io/docs/concepts/services-networking/ingress/ (Kubernetes Ingress)
[secret]: https://kubernetes.io/docs/concepts/configuration/secret/ (Kubernetes Secret)
[sa]: https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/ (Kubernetes Service Accounts)
[role]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole (Kubernetes Role)
[rb]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding (Kubernetes Role Binding)
[kube-doc]: https://kubernetes.io/docs/home/ (Kubernetes Documentation Home)

## Kubernetes deploy goal

The Atomist Kubernetes SDM extension pack provides a
`KubernetesDeploy` goal to ease the management of deploying
applications to Kubernetes clusters.  Let's start by creating the
simplest possible Kubernetes deploy goal.  Here's a simple SDM with a
simple Kubernetes deploy goal.

```typescript
import { configure } from "@atomist/sdm-core";
import { k8sSupport, KubernetesDeploy } from "@atomist/sdm-pack-k8s";

export const configuration = configure(async sdm => {
    // Add core Kubernetes extension pack functionality
    sdm.addExtensionPacks(k8sSupport());
    // Create Kubernetes deploy goal
    const k8sDeploy = new KubernetesDeploy();
    // Return goal set
    return {
        deploy: {
            goals: k8sDeploy,
        },
    };
});
```

In the above code snippet, we import the necessary pieces from the
`@atomist/sdm-core` and `@atomist/sdm-pack-k8s` packages.  We then
create the SDM configuration using the `configure` helper function.
We pass the `configure` function a function that takes the SDM as an
argument modifies the SDM to suit our needs.  It first adds the basic
functionality of the Kubernetes SDM extension pack.  Next, it creates
a generic Kubernetes deploy goal.  Finally, it returns our goal set,
`deploy`, that contains a single goal, the Kubernetes deploy goal we
created.

With that SDM running, any push to a repository connected to your
Atomist workspace will result in the SDM executing the Kubernetes
deploy goal using the defaults for all application-related properties.
By default, the Kubernetes deploy goal will create a Docker image name
from the repository owner and name, append the `latest` tag to it, and
create a Kubernetes deployment resource that executes the image in a
container in your currently configured Kubernetes cluster.  Unless
there is some other process that creates that Docker image and pushes
it to a public repository on [Docker Hub][docker-hub], that Kubernetes
deployment will fail to ever successfully spin up a pod with a
container running that image.

[docker-hub]: https://hub.docker.com/ (Docker Hub)

## Defining the application

To control what gets deployed, we need to provide more information to
the Kubernetes deploy goal about what you want deployed.  We can
configure what gets deployed by a Kubernetes deploy goal using the
`with` method on the goal.  In general, the `with` method provides a
_fulfillment_ for the Kubernetes deploy goal, i.e., details on if and
how the goal should be executed.  For the specific example below, we
use the fulfillment to modify details about the application being
deployed.

```typescript
import { configure } from "@atomist/sdm-core";
import { k8sSupport, KubernetesDeploy } from "@atomist/sdm-pack-k8s";

export const configuration = configure(async sdm => {
    sdm.addExtensionPacks(k8sSupport());
    // Create Kubernetes deploy goal
    const k8sDeploy = new KubernetesDeploy().with({
        // Configure application
        applicationData: async app => {
            app.ns = "default";
            app.image = "nginx:1.7.9";
            app.port = 8080;
            app.path = "/nginx";
            app.host = "api.example.org";
            return app;
        },
    });
    return {
        deploy: {
            goals: k8sDeploy,
        },
    };
});
```

In the above example, we create the Kubernetes deploy goal and call
the `with` method on it.  Using the `applicationData` property in the
object passed to `with`, we set the application namespace, Docker
image, service port, and ingress path and hostname.

The `applicationData` property allows us to provide a callback
function that can modify the default `KubernetesApplication` data
structure, the data structure that defines what resources are
created/updated when the Kubernetes deploy goal executes.  The
callback function is called after the default `KubernetesApplication`
data structure has been created by the extension pack and prior to
deploying the application.

### Kubernetes application

The `KubernetesApplication` interface defines the information used to
construct resources when creating or updating an application in a
Kubernetes cluster.  The core properties are designed for a typical
microservice-type deployment of one container optionally providing a
service on a single port.

```typescript
import * as k8s from "@kubernetes/client-node";
import { DeepPartial } from "ts-essentials";
export interface KubernetesApplication {
    workspaceId: string;
    name: string;
    ns: string;
    image: string;
    imagePullSecret?: string;
    replicas?: number;
    port?: number;
    path?: string;
    host?: string;
    protocol?: "http" | "https";
    tlsSecret?: string;
    deploymentSpec?: DeepPartial<k8s.V1Deployment>;
    serviceSpec?: DeepPartial<k8s.V1Service>;
    ingressSpec?: DeepPartial<k8s.V1beta1Ingress>;
    secrets?: Array<DeepPartial<k8s.V1Secret>>;
    roleSpec?: DeepPartial<k8s.V1Role> | DeepPartial<k8s.V1ClusterRole>;
    serviceAccountSpec?: DeepPartial<k8s.V1ServiceAccount>;
    roleBindingSpec?: DeepPartial<k8s.V1RoleBinding> | DeepPartial<k8s.V1ClusterRoleBinding>;
}
```

If you need anything more complicated than microservice-type
deployment, you can use the various partial specs in the
`KubernetesApplication` structure to manage more elaborate
applications.  Note that when providing a spec, you need only include
the properties and values you want to customize.  The extension pack
will ensures that all necessary elements of the resource spec are
included when issuing requests to the Kubernetes API.

#### General properties

The `workspaceId` property contains the Atomist workspace ID.  It is
populated by the SDM and should not be modified.

The `name` property defines the name of resources to create.  In
Kubernetes, each resource has a unique name across all resources of
the same type in the same namespace.  The provided name will be used
for the deployment and, if created, service, ingress, service account,
role, and role binding.  It can be overridden for individual resources
using the various partial spec properties.

The `ns` property defines the [namespace][] to create resources in.
In Kubernetes, most resources are created in a specific namespace.

[namespace]: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/ (Kubernetes Namespace)

#### Deployment properties

The `image` property defines the full Docker image name and tag for
[deployment][] pod template container.  Its value is used at the image
for the first container in the deployment spec's pod template spec.

The `imagePullSecret` property defines the name of image pull secret
for container image.  If not provided no image pull secret is provided
in the deployment spec's pod template spec.  The named image pull
secret must exist, the Kubernetes deploy goal does not create it.

The `replicas` property is used to set the number of replicas in
deployment spec.  It may be overridden by the `deploymentSpec`
property.

The `secrets` property defines an array of [secret][] resources to
upsert prior to creating deployment.

The `deploymentSpec` property defines a partial deployment spec for
this application that is overlaid on top of the default deployment
spec template created by the framework.  It can be used to provide
custom resource specifications, liveness and readiness checks, etc.
The values in the `deploymentSpec` take precedence over defaults.

#### Service & ingress properties

The `port` property defines the port the [service][] listens on.  If not
provided, no service or ingress resources are created.

The `path` property defines the [ingress][] rule URL path.  If not
provided, no ingress resource is created.  Typically ingress paths
start with a forward slash (`/`) but do not end with one, unless the
path is just `/`.

The `host` property defines the ingress rule hostname.  If not
provided, none is used in the ingress rule.  This means the rule will
apply to the wildcard host and "localhost" is used when constructing
the service endpoint URL.

The `protocol` property defines the ingress protocol, "http" or
"https".  If tslSecret is provided, the default is "https", otherwise
the default is "http".

The `tslSecret` property defines the name of TLS secret for host used
in the ingress.

The `serviceSpec` property defines the partial service spec for this
application that is overlaid on top of the default service spec
template.  The values in the `serviceSpec` take precedence over
defaults.

The `ingressSpec` property defines the partial ingress spec for this
application that is overlaid on top of the default ingress spec
template.  The values in the `ingressSpec` take precedence over
defaults.

#### RBAC properties

The `roleSpec` property defines the partial [role][] to create for
binding to service account.  If provided, this partial spec is
overlaid onto the default role spec, which is just metadata with no
rules.  If this is not defined, this deployment will not create a role
and therefore not bind a role to a service account.

The `serviceAccountSpec` property defines the partial [service
account][sa] spec to create and use in the deployment.  This partial
spec is overlaid onto the default service account spec.  If the
`serviceAccountSpec` is provided, the resulting service account spec
is upserted during deployment.  If a `roleSpec` is provided, the
resulting service account spec is upserted during deployment and a
role binding is created between the role and service account.  If
neither the `serviceAccountSpec` nor `roleSpec` are created, no
service account is managed by the deployment.  If this spec contains a
name, it is used in the role binding and deployment specs.

The `roleBindingSpec` spec defines the partial [role binding][rb] spec
for the role to service account.  This partial spec is overlaid onto
the default role binding spec, which contains metadata and the role
and service account names.  The role binding is only created if the
`roleSpec` is also provided.

!!! attention "RBAC and privilege escalation"
    Kubernetes RBAC does not allow privilege escalation.  This means any
    permission you wish to manage with an SDM must also be granted to that
    SDM.  See the [RBAC documentation][rbac-priv] for more information.

[rbac-priv]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#privilege-escalation-prevention-and-bootstrapping (Kubernetes RBAC - Privilege Escalation Prevention and Bootstrapping)

### Application data callback

When defining the `KubernetesApplication` properties, it is often
helpful to have information about the repository being deployed as an
application.  For example, you may want to know the name and owner of
the repository to help construct the name of the Docker image.  To
facilitate this, the `applicationData` callback function is passed
several other arguments that provide information about the repository,
deploy goal, and the specific event that triggered the deployment.
The full call signature of the `applicationData` callback function is:

```typescript
export type KubernetesApplicationDataCallback = (
        app: KubernetesApplication,
        project: GitProject,
        goal: KubernetesDeploy,
        event: SdmGoalEvent,
        ctx: HandlerContext,
    ) => Promise<KubernetesApplication>;
```

As seen in the earlier example, the first argument provided to the
callback function and the data structure it is expected to return
conforms to the `KubernetesApplication` interface described above.

The second argument to the callback function, the `GitProject`, is an
object representing the locally cloned Git repository checked out to
the commit of the push that triggered the goal execution.  You can use
this object to interrogate the existence and contents of files in the
repository and interrogate the state in Git.  You can use the
information to inform the returned `KubernetesApplication` object.
For example, you can locate the Dockerfile in the project and scan it
for needed environment variables.  More information about the
`GitProject` object can be found in the [automation-client API
documentation][ac-api-gp].

[ac-api-gp]: https://atomist.github.io/automation-client/interfaces/_lib_project_git_gitproject_.gitproject.html (Atomist Automation Client GitProject API Documentation)

The third argument to the callback function, the `KubernetesDeploy`,
is the Kubernetes deploy goal being executed.

The fourth argument to the callback function, the `SdmGoalEvent`, is
the SDM goal event associated with the goal execution.  It contains
details about the push, commits, repository, goal set, goal state,
etc.  You can, for example, use the SDM goal event to get the name and
owner of the repository and use that to create the name of the
application being deployed.  More information about the `SdmGoalEvent`
object can be found in the [SDM API documentation][sdm-api].

[sdm-api]: https://atomist.github.io/sdm/interfaces/_lib_api_goal_sdmgoalevent_.sdmgoalevent.html (Atomist SDM SdmGoalEvent API Documentation)

The fifth argument to the callback function, the `HandlerContext`, is
an Atomist API client handler context.  It contains details about the
invocation of the goal and the Atomist workspace.  It also provides a
GraphQL client that can be used to query cortex and a chat message
client repository that can be used to send chat messages.  More
information about the `HandlerContext` object can be found in the
[automation-client API documentation][ac-api-hc].

[ac-api-hc]: https://atomist.github.io/automation-client/interfaces/_lib_handlercontext_.handlercontext.html (Atomist Automation Client HandlerContext API Documentation)

Using this additional information, we can create an application
reflecting the state of the repository that triggered the deployment.

```typescript
import { configure } from "@atomist/sdm-core";
import { k8sSupport, KubernetesDeploy } from "@atomist/sdm-pack-k8s";

export const configuration = configure(async sdm => {
    sdm.addExtensionPacks(k8sSupport());
    const k8sDeploy = new KubernetesDeploy().with({
        applicationData: async (app, project, goal, event) => {
            app.ns = (event.push.branch === event.push.repo.defaultBranch) ? "production" : "testing";
            const version = JSON.parse(await (await project.getFile("package.json")).getContent()).version;
            const slug = `${event.repo.owner}/${event.repo.name}`;
            app.image = `docker.example.org/${slug}:${version}`;
            app.port = 8080;
            app.host = "api.example.org";
            app.path = `/${slug}(/|$)(.*)`;
            app.ingressSpec = {
                metadata: {
                    annotations: {
                        "nginx.ingress.kubernetes.io/rewrite-target": "/$2",
                    },
                },
            };
            app.serviceAccountSpec = { metadata: { name: "api" } };
            return app;
        },
    });
    return {
        deploy: {
            goals: k8sDeploy,
        },
    };
});
```

In the above example, if the push is to the repository's default
branch, we set the namespace to "production", otherwise it is set to
"testing".  We then parse the project's `package.json` file, assuming
this is an Node.js project managed with NPM, and extract the version.
We use the version along with the repository owner and name to
construct the Docker image.  We set the service port and ingress host
as before.  We again use the repository owner and name to construct
the ingress path.  We include capture groups in the ingress path, one
of which we reference later in the [ingress
annotation][ingress-rewrite] we add.  Lastly, we set the name of the
service account using the `serviceAccountSpec` property.  This service
account will be created if it does not exist and the
`serviceAccountName` property of the deployment pod template spec will
be set to its name.

[ingress-rewrite]: https://kubernetes.github.io/ingress-nginx/examples/rewrite/ (NGINX Ingress Controller - Rewrite Example)

### Application data sources

The `applicationData` callback function is not the only way to
customize the `KubernetesApplication` structure.  The extension pack
can also read files from the repository and SDM goal event data to
inform the structure of the application.  You can select which sources
of information are incorporated into the application using the
`dataSources` property when calling the Kubernetes deploy goal `with`
method.

```typescript
import { configure } from "@atomist/sdm-core";
import { k8sSupport, KubernetesDeploy } from "@atomist/sdm-pack-k8s";

export const configuration = configure(async sdm => {
    sdm.addExtensionPacks(k8sSupport());
    const k8sDeploy = new KubernetesDeploy().with({
        // Select data sources for application
        dataSources: [
            KubernetesDeployDataSources.DeploymentSpec,
            KubernetesDeployDataSources.Dockerfile,
        ],
    });
    // Return goal set
    return {
        deploy: {
            goals: k8sDeploy,
        },
    };
});
```

The data sources are read and applied to the `KubernetesApplication`
structure prior to calling the application data callback.  If you do
not set the value of the `dataSources` property, all sources are used.
To disable the reading of sources from the project, e.g., if you are
building projects whose contents you do not control, set the
`dataSources` property to an empty array.  Each available source is
defined as part of the `KubernetesDeployDataSources` enum and can be
referenced by importing `KubernetesDeployDataSources` as in the above
example.  The available data sources are described in the table below.

Source | Description
-------|------------
`DeploymentSpec` | Read partial deployment spec from `.atomist/kubernetes/deployment.EXT`
`Dockerfile` | Read first `EXPOSE` from the Dockerfile to get service port
`GoalEvent` | Parse `goalEvent.data` property as JSON and use the "@atomist/sdm-pack-k8s" property as a `KubernetesApplication` object
`IngressSpec` | Read partial ingress spec from `.atomist/kubernetes/ingress.EXT`
`RoleBindingSpec` | Read partial role-binding spec from `.atomist/kubernetes/role-binding.EXT`
`RoleSpec` | Read partial role spec from `.atomist/kubernetes/role.EXT`
`SdmConfiguration` | Load `sdm.configuration.sdm.k8s.app` from the SDM configuration as a `KubernetesApplication` object
`ServiceAccountSpec` | Read partial service-account spec from `.atomist/kubernetes/service-account.EXT`
`ServiceSpec` | Read partial service spec from `.atomist/kubernetes/service.EXT`

In the above table, the `EXT` for the partial specs can be "json",
"yaml", or "yml" and the files are searched for in that order.  If the
file does not exist in a repository, the source is ignored, i.e., it
is not an error.

## Kubernetes cluster

By default, each Kubernetes deploy goal will be fulfilled by the SDM
that creates the goal.  Typically this means the goal would be limited
to deploying applications in a single Kubernetes cluster.  If your
Kubernetes architecture has more than one cluster, e.g., a testing and
a production cluster, and you want to manage deployments to those
clusters with a single SDM, i.e., have a single goal set coordinate
the deployments and approvals for a new version of an application
moving from testing to production, you need a way to tell a Kubernetes
deploy goal which cluster to deploy to.  If the targeted Kubernetes
cluster is not the cluster your current SDM is running in, you will
also need an SDM in that cluster to actually create/update the
resources.

Atomist provides a fully-functional SDM, [k8s-sdm][], expressly for
the purpose of fulfilling Kubernetes deploy goals in a Kubernetes
cluster.  To manage deployments to multiple clusters, you run an
instance k8s-sdm, a [pre-built Docker image][k8s-sdm-docker] is
available, in each of your Kubernetes clusters.  Each instance of
k8s-sdm should register with the Atomist API with a unique name,
typically something like "@atomist/k8s-sdm_production".  The name of
each k8s-sdm registration provides a unique identifier for the cluster
in which it is running.  To configure a Kubernetes deploy goal to
create/update the application in a cluster, you provide the name of
the k8s-sdm registration as the value of the `name` property in the
object passed to the goal's `with` method.

```typescript
import { configure } from "@atomist/sdm-core";
import { k8sSupport, KubernetesDeploy } from "@atomist/sdm-pack-k8s";

export const configuration = configure(async sdm => {
    sdm.addExtensionPacks(k8sSupport());
    const k8sDeploy = new KubernetesDeploy().with({
        // Select cluster
        name: "@atomist/k8s-sdm_testing",
    });
    // Return goal set
    return {
        deploy: {
            goals: k8sDeploy,
        },
    };
});
```

In the above example, calling the Kubernetes API to create/update the
application resources will be performed by an SDM registered as
"@atomist/k8s-sdm_testing".  The configuration for that SDM would look
something like:

```json
{
  "apiKey": "ATOMIST_API_KEY",
  "cluster": {
    "enabled": true,
    "workers": 2
  },
  "name": "@atomist/k8s-sdm_testing",
  "workspaceIds": ["ATOMIST_WORKSPACE_ID"]
}
```

[k8s-sdm]: https://github.com/atomist/k8s-sdm (Atomist Kubernetes SDM)
[k8s-sdm-docker]: https://hub.docker.com/r/atomist/k8s-sdm (Atomist Kubernetes SDM Docker Image)

## Selecting fulfillments

Sometimes you may want to have different implementations of a
Kubernetes deploy goal for different repositories, branches, or
pushes.  The `pushTest` property of the argument to the goal's `with`
method defines a [push test][push-test] used to determine whether a
fulfillment of the Kubernetes deploy goal should be executed for a
given push of commits to a repository.  Using push tests, you can
create a single Kubernetes deploy goal with different implementations
depending on the characteristics of the push.  For example, you may
want different applications to be deployed to different Kubernetes
clusters.  In this case you could have a single Kubernetes deploy goal
with multiple `with` methods, each setting a different `name` property
and `pushTest`.

Modifying the above example to deploy to different clusters based on
whether the push was to the default branch would look something like
the example below after consolidating common configuration between the
two fulfillments.

<!-- atomist:code-snippet:start=k8sDeploy -->
<!-- atomist:code-snippet:end -->

[push-test]: ../../developer/set-goals.md#pushtest

## Reference

You can find detailed information about how to create Kubernetes
deploy goals in the [Atomist Kubernetes SDM extension pack API
documentation][api-doc].

* [`KubernetesDeploy` goal][kubedeploy]
* [`KubernetesDeployRegistration`][kubereg] (argument to the goal `with` method)
* [`KubernetesApplicationDataCallback`][kubecall]
* [`KubernetesApplication`][kubeapp]
* [`KubernetesDeployDataSources`][kubesrc]

[api-doc]: https://atomist.github.io/sdm-pack-k8s/ (Atomist Kubernetes SDM Extension Pack API Documentation)
[kubedeploy]: https://atomist.github.io/sdm-pack-k8s/classes/_lib_deploy_goal_.kubernetesdeploy.html (KubernetesDeploy Goal)
[kubereg]: https://atomist.github.io/sdm-pack-k8s/interfaces/_lib_deploy_goal_.kubernetesdeployregistration.html (KubernetesDeployRegistration Interface)
[kubecall]: https://atomist.github.io/sdm-pack-k8s/modules/_lib_deploy_goal_.html#kubernetesapplicationdatacallback (KubernetesApplicationDataCallback Type)
[kubeapp]: https://atomist.github.io/sdm-pack-k8s/interfaces/_lib_kubernetes_request_.kubernetesapplication.html (KubernetesApplication Interface)
[kubesrc]: https://atomist.github.io/sdm-pack-k8s/enums/_lib_deploy_goal_.kubernetesdeploydatasources.html (KubernetesDeployDataSources Enum)
