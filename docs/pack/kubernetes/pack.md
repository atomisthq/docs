The Atomist Kubernetes SDM extension pack provides a function named
`k8sSupport` you can use to add it to your SDM using the standard SDM
`addExtensionPacks` method.  For example, you can create an SDM with
the Atomist Kubernetes SDM extension pack using the following code.

```typescript
import { configure } from "@atomist/sdm-core";
import { k8sSupport } from "@atomist/sdm-pack-k8s";
export const configuration = configure(async sdm => {
    sdm.addExtensionPacks(k8sSupport());
});
```

## Configuration

The `k8sSupport` function takes an optional argument that can be used
to customize the Kubernetes support in the SDM.

```typescript
import { configure } from "@atomist/sdm-core";
import { k8sSupport } from "@atomist/sdm-pack-k8s";
export const configuration = configure(async sdm => {
    sdm.addExtensionPacks(k8sSupport({
        addCommands: true;
        registerCluster: true;
        sync: {
            repo: {
                branch: "master";
                owner: "myorg";
                repo: "kube-specs";
            },
            intervalMinutes: 10;
            secretKey: "a suitably long encryption key";
        };
    }));
});
```

These options can also be provided via the SDM configuration at the
`sdm.k8s.options` path in the configuration object.

```typescript
import { configure } from "@atomist/sdm-core";
import { k8sSupport } from "@atomist/sdm-pack-k8s";
export const configuration = configure(async sdm => {
    sdm.configuration.sdm.k8s = {
        options: {
            addCommands: true;
            registerCluster: true;
            sync: {
                repo: {
                    branch: "master";
                    owner: "myorg";
                    repo: "kube-specs";
                },
                intervalMinutes: 10;
                secretKey: "a suitably long encryption key";
            };
        },
    };
    sdm.addExtensionPacks(k8sSupport());
});
```

Any options provided in the SDM configuration are merged with those
passed to `k8sSupport`, with the SDM configuration values taking
precedence over those passed to `k8sSupport`.

The shape of the Kubernetes pack options conforms to the interface
`SdmPackK8sOptions`.

```typescript
export interface SdmPackK8sOptions {
    addCommands?: boolean;
    registerCluster?: boolean;
    sync?: KubernetesSyncOptions;
}
```

Property | Type | Default | Description
---------|------|---------------|------------
`addComands` | _boolean_| `false`| Whether to add the undelete command
`registerCluster` | _boolean_ | `false` | Whether to register and converge a k8s cluster
`sync` | _KubernetesSyncOptions_ | `undefined` | Synchronize resources in Kubernetes cluster with a Git repository

More details about each top-level property can be found in the
following sections.

### `addCommands`

The `addCommands` property configures whether the SDM should register
a Kubernetes-related chat/web-app commands.  Currently there is only
one such command, which deletes an application's resources from a
Kubernetes cluster.  Typically you would enable the commands for each
SDM that manages resources within a cluster or namespace.  The intent,
i.e., string that triggers execution of the command, takes the form
`kube undeploy SDM_NAME`, where `SDM_NAME` is the name of the SDM
registering the command.  The default is to _not_ register commands.

### `registerCluster`

The `registerCluster` property configures whether the SDM should
register itself as a Kubernetes cluster provider in cortex.
Registering as a Kubernetes cluster provider allows other SDMs to
discover it when querying cortex for Kubernetes cluster providers.
The default is to _not_ register as a Kubernetes cluster provider.

### `sync`

The `sync` property configures the Atomist GitOps functionality within
the SDM.  See the section on [GitOps][sync] for more information on
what this means.  The value of the `sync` property conforms to the
`KubernetesSyncOptions` interface.

```typescript
export interface KubernetesSyncOptions {
    repo: SyncRepoRef | RemoteRepoRef;
    credentials?: ProjectOperationCredentials;
    intervalMinutes?: number;
    secretKey?: string;
}
```

Property | Type | Default | Description
---------|------|---------------|------------
`repo` | _SyncRepoRef \| RemoteRepoRef_ | `false`| Repository to synchronize with Kubernetes resources
`credentials` | _ProjectOperationCredentials_ | `false` | SCM repository credentials
`intervalMinutes` | _number_ | `undefined` | SDM Kubernetes synchonization interval in minutes
`secretKey` | _string_ | `undefined` | Key to use when encrypting Kubernetes secret values
`specFormat` | _"json" \| "yaml"_ | `"yaml"` | Format to use when creating Kubernetes specs

More details about each top-level property can be found in the
following sections.

[sync]: sync.md (Atomist GitOps)

#### `repo`

The `repo` property defines the repository to synchronize Kubernetes
resources with.  Changes made to this repository will trigger the SDM
to create/update/delete resources in the Kubernetes cluster.
Deployments made by this SDM will be persisted to the repository.  See
the section on [GitOps][sync] for more information.  The value of the
`repo` property can be either a `SyncRepoRef` or `RemoteRepoRef`.  If
a `SyncRepoRef` is provided, on startup cortex is queried to find the
details of the repo needed to create a `RemoteRepoRef`.  This
`RemoteRepoRef` is created and then used as the value of this property
for the lifetime of the SDM.  If a `RemoteRepoRef` is provided, it is
used as is.

##### `SyncRepoRef`

The `SyncRepoRef` interface provides a convenient way to specify the
information needed to create a proper `RemoteRepoRef`, which is what
is ultimately used when performing sync operations.

```typescript
export interface SyncRepoRef {
    owner: string;
    repo: string;
    branch?: string;
    providerId?: string;
}
```

###### `owner`

The `owner` property specifies the owner, i.e., user or organization,
of the sync repository.

###### `repo`

The `repo` property specifies the name of sync repository.

###### `branch`

The `branch` property specifies the repository [branch][] to use when
performing sync operations.  If branch is provided, it is used.  If it
is not provided, things get complicated.  If the repo exists in cortex
and it has the `defaultBranch` property set, then the `defaultBranch`
is used.  If the repository does not exist in cortex or its
`defaultBranch` property is not set, "master" is used.  Since the
repository `defaultBranch` property could be _not_ set initially but
get set at a later time, how the sync repository behaves can change
even if the configuration does not.  Therefore even though the
`branch` property is optional, set it if you want syncing to behave
deterministically.

[branch]: https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell (Git - Branches in a Nutshell)

###### `providerId`

The `providerId` property specifies the internal cortex ID of the
source code management (SCM) provider for the sync repository.
Typically this is not necessary and not set.  It is only necessary to
provide the provider ID if your Atomist workspace has multiple SCM
providers and the name and owner of the sync repository you want to
use matches different repositories in different SCM providers.  For
example, if you want to use "my/specs" as your sync repository, your
Atomist workspace is linked to both GitHub.com and a GHE instance, and
both of SCMs have a repo named "my/specs".  You can get a list of all
the SCM providers configured in your Atomist workspace using the
following GraphQL query in the [GraphQL Explorer][graphiql].

```graphql
query ScmProviders {
  SCMProvider {
    apiUrl
    providerId
    providerType
    url
  }
}
```

[graphiql]: https://app.atomist.com/explorer.html (Atomist GraphQL Explorer)

##### `RemoteRepoRef`

The `RemoteRepoRef` object is a core SDM object type that provides the
information the SDM requires to clone and modify a remote source code
repository, e.g., a GitHub.com repository.  It is not possible to
provide a `RemoteRepoRef` object from a static JSON configuration
object, as it is a proper object with methods.  If you want to provide
a `RemoteRepoRef` object directly as the sync repository, you can
instantiate one in the SDM code.  Below is an example showing the
creation of a GitHub.com `RemoteRepoRef`.

```typescript
import { GitHubRepoRef } from "@atomist/automation-client";
const repo = GitHubRepoRef.from({
    branch: "master",
    owner: "me",
    repo: "k8s-specs",
});
```

You should replace the values for `branch`, `owner`, and `repo` as
appropriate.

#### `credentials`

The `credentials` property provides the credentials to use when
cloning and pushing to the sync repository.  The shape of these
credentials depends on the SCM system.  These credentials are
typically not provided in the SDM configuration, rather they are are
obtained during startup by the SDM via a cortex query.  If they are
provided, the provided credentials are used rather than any returned
from cortex.

#### `intervalMinutes`

The `intervalMinutes` property specifies the interval between periodic
synchronization of the resource specs in the sync repository and the
Kubernetes cluster.  If the `intervalMinutes` property is set to a
positive number, the SDM will apply all specs in the sync repository
approximately every `intervalMinutes` minutes.  If not provided or set
to zero (0) or a negative number, the resource specs in the sync
repository will only be applied at startup, when the SDM
creates/updates/deletes an application, or when the resource specs are
changed by a commit to the sync repository.

#### `secretKey`

The `secretKey` property defines the key or passphrase used to encrypt
Kubernetes Secret resource values before storing them in the sync
repository and decrypt them when reading them from the sync
repository.  The secrets are encrypted using the AES-256 encryption
algorithm.  If it is not provided, secrets are not encrypted in the
sync repository, so hopefully they aren't too secret.

You can use the Atomist CLI `kube-encrypt` and `kube-decrypt`
subcommands to manually encrypt and decrypt values using the same
encryption strategy.

#### `specFormat`

The `specFormat` property defines the default format used when
creating Kubernetes specs in the sync repository.  The supported
formats are YAML and JSON.  If updating an existing file, the format
of the existing file will be used.  If not provided, "yaml" is the
default.

## Reference

The API documentation for the Atomist Kubernetes SDM extension pack
are available at [https://atomist.github.io/sdm-pack-k8s/][api-doc].

[api-doc]: https://atomist.github.io/sdm-pack-k8s/ (Atomist Kubernetes SDM Extension Pack API Documentation)
