[GitOps][gitops] is an approach to managing deployed resources using
[Git][git].  The details of the deployed resources are tracked in a
Git repository and changes to the deployed resources are commits in
the repository, often make through [pull requests (PRs)][pr], allowing
developers to suggest and review changes to deployed resources in the
same way they do for code.

[gitops]: https://www.weave.works/technologies/gitops/ (GitOps)
[git]: https://git-scm.com/ (Git)
[pr]: https://help.github.com/en/articles/about-pull-requests (Pull Requests)

## SDM GitOps

The SDM GitOps flow runs both ways: the SDM can persist changes it
makes to a Git repository and watch that Git repository for changes
you and/or your CI/CD system make to it, applying those changes
against the Kubernetes API endpoint for the cluster.

On startup, the contents of this repository will be synchronized with
the cluster, subsequent changes to this repository will be
synchronized to the cluster, and subsequent resource deployments will
update the contents of this repository.

To enable GitOps-style synchronization in your SDM, make sure your SDM
is using a recent version of `@atomist/sdm-pack-k8s`:

```
npm install --save @atomist/sdm-pack-k8s@latest
```

Second, make sure your SDM adds the Kubernetes SDM extension pack in
its configuration.

```typescript
import { configure } from "@atomist/sdm-core";
import { k8sSupport } from "@atomist/sdm-pack-k8s";
export const configuration = configure(async sdm => {
    sdm.addExtensionPacks(k8sSupport());
});
```

Finally, add the following section to your SDM client configuration:

```typescript
export const configuration = {
   …
   sdm: {
       …
       k8s: {
           options: {
               sync: {
                   repo: {
                       name: "REPO_NAME",
                       owner: "REPO_OWNER",
                       branch: "REPO_BRANCH"
                   }
               }
           }
       }
   }
};
```

replacing `REPO_NAME` with the repository name, `REPO_OWNER` with the
repository owner, i.e., user or organization, and `REPO_BRANCH` with
the Git branch containing the Kubernetes resource specs.  Once you
start the SDM, it will persist application deployments made by an SDM
to the configured Git repository and watch that repository for changes
to Kubernetes resource spec files and applying those changes against
the Kubernetes API.

## Spec files

The synchronization feature only looks for Kubernetes resource spec
files in the top-level directory of repository.  It supports both YAML
and JSON specs, looking for files ending in ".json", ".yaml", and
".yml".  It does not support YAML files with multiple YAML documents.
In other words, each file should only contain one resource spec.

When creating spec files for application resources it creates or
updates, it will create YAML files by default.  If you prefer that it
create JSON files, set the `specFormat` property of the sync options
to "json".

```typescript
export const configuration = {
   …
   sdm: {
       …
       k8s: {
           options: {
               sync: {
                   repo: {
                       name: "REPO_NAME",
                       owner: "REPO_OWNER",
                       branch: "REPO_BRANCH"
                   },
                   syncFormat: "json"
               }
           }
       }
   }
};
```

## Secrets

Kubernetes secret data values are Base64 encoded, which is not a
secure algorithm.  Thus, it is not wise to store them unaltered in a
code repository, whether public or private.  To allow storing of
secrets in your GitOps repository while keeping sensitive information
safe, the Kubernetes SDM extension pack supports encrypting secret
data values prior to committing secret resource specs to the
repository.  The data values are then decrypted before applying them
to the cluster.

To enable encryption of secret values, just add an encryption key to
your SDM k8s configuration options.

```typescript
export const configuration = {
   …
   sdm: {
       …
       k8s: {
           options: {
               sync: {
                   repo: {
                       name: "REPO_NAME",
                       owner: "REPO_OWNER",
                       branch: "REPO_BRANCH"
                   },
                   secretKey: "ENCRYPTION_KEY"
               }
           }
       }
   }
};
```

When the SDM persists the secrets it creates to the GitOps repository,
it will encrypt the data values using AES-256.  The secret key can be
any suitably long, suitably random string. When applying the changes
you or your CI system makes to the GitOps repository, it will use that
key to decrypt the data values before applying changes to secret
resources.

The [Atomist CLI][cli] has commands you can use to encrypt and decrypt
the secret data values yourself.  To encrypt a string run the
following command:

```
atomist kube-encrypt --secret-key=KEY --literal=TEXT
```

replacing `KEY` with the same encryption key you provide in the SDM
configuration and `TEXT` with the Base64-encoded secret data value
you would like to encrypt.  In other words, the above command only
encrypts the string, it does _not_ Base64 encode it and then encrypt
it.

To encrypt the data properties in a secret spec, you can run the
following command:

```
atomist kube-encrypt --secret-key=KEY --file=PATH
```

replacing `KEY` with the same encryption key you provide in the SDM
configuration and `PATH` with the file system path to the Kubernetes
secret spec whose data properties you want to encrypt.  Again, the
above command only encrypts the values of the data property elements,
it does _not_ Base64 encode them and then encrypt them.

There is a corresponding `kube-descrypt` command in the Atomist CLI
should you need to check the secret data values in the repository
specs.

[cli]: ../../quick-start.md (Developer Quick Start)

## Reconciliation

By default, an SDM with GitOps synchronization enabled will only occur
when the SDM starts and in response to events in your Atomist
workspace, specifically pushes to the configured sync repository and
Kubernetes deploy goals.  To avoid drift between the resource specs in
the sync repository and the actual resources in the Kubernetes
cluster, you can periodically re-sync the cluster with the repository
by providing a positive number value to the `intervalMinutes` property
of the sync options.

```typescript
export const configuration = {
   …
   sdm: {
       …
       k8s: {
           options: {
               sync: {
                   repo: {
                       name: "REPO_NAME",
                       owner: "REPO_OWNER",
                       branch: "REPO_BRANCH"
                   },
                   intervalMinuts: 10
               }
           }
       }
   }
};
```

With the above configuration, the SDM will re-apply the resource specs
in the sync repository about every ten minutes.  Since Kubernetes
itself operates in the manner of a convergence engine, re-applying the
same resource spec repeatedly has no effect other that creating a
slight load on the Kubernetes master.  Note that applying the all the
resource specs in a sync repository can take some time, so do not set
the synchronization interval too be too short.

## RBAC considerations

When an SDM is running in a Kubernetes cluster, it typically will use
Kubernetes [role-based access controls (RBAC)][rbac] to securely
access the Kubernetes API and perform its operations.  When and SDM is
just executing Kubernetes deploy goals, there is a more or less finite
set of permissions, role rules in RBAC parlance, it requires to
successfully deploy an application.  In contrast, when performing
GitOps-style synchronization, it will attempt to create or update
every type of resource whose spec appears in the sync repository.
Therefore, synchronization operation will likely require additional
permissions.  If you plan on having the SDM apply resources you or
your CI system add to your GitOps repository, read/write access to
those resources will need to be added to the role bound to the SDM's
service account.  If you plan on having the SDM create RBAC resources,
it will also need all permissions it will be tasked with granting,
i.e., a pod cannot escalate its privileges by applying permissions it
does not already have.  Here is an example of a permissive role
suitable for most GitOps workloads:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: k8s-sdm
rules:
  - apiGroups: ["*"]
    resources: ["*"]
    verbs: ["*"]
  - nonResourceURLs: ["*"]
    verbs: ["*"]
```

If you have a large organization that maps in a complicated way to
your Kubernetes clusters and namespaces and are reluctant to give one
pod, i.e., the SDM pod, access to too many resources, you can always
run multiple SDMs, each having only the permissions it needs to
perform its tasks.  You can configure an SDM to only manage a single
namespace or some subset of namespaces.  You can use multiple GitOps
repositories, or multiple branches in the same repository, with
different SDMs watching each and only managing the resources defined
in its repository/branch.

[rbac]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/ (Kubernetes Role-Based Access Control)

## Reference

You can find more detailed information on the [GitOps-style
synchronization][sync-api] in the Atomist Kubernetes SDM extension
pack API documentation.

[sync-api]: https://atomist.github.io/sdm-pack-k8s/interfaces/_lib_config_.kubernetessyncoptions.html (Atomist GitOps Synchronization Options API Documentation)
