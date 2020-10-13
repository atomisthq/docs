A RepoRef identifies a repository.

Properties:

* *owner* the higher-level entity containing a repository. Organization, user, project - it goes by different names in different version control managers.
* *repo* the repository name
* *url* full location of this repository. Could be file:// or http(s)://
* *path?* if you only want to work with a directory within the repository,
put the relative path here.
* *sha?* commit SHA within that repository. Optional; default to the tip of the default branch
* *branch?* if you want to work from a branch other than the default, put its name here

Usually Atomist works with a RemoteRepoRef, which adds `cloneUrl` and `apiUrl` for
communicating to version control.

## Get a RepoRef

### GitHub

Use `[GitHubRepoRef][apidoc-ghrr].from({...})` to instantiate a RepoRef for either
GitHub.com or GitHub Enterprise.

Provide the usual RepoRef properties except:

* instead of *url*, provide *rawApiBase* to post to your GitHub Enterprise instance.

### BitBucket

On-prem and online BitBucket work differently.s

#### BitBucket Server

For on-prem BitBucket, use `new [BitBucketServerRepoRef][apidoc-bbsrr](...)`.

Pass it:

* *remoteBase* where is your BitBucket?
* *owner* the BitBucket user or project
* *repo* string
* *isProject?* true if the owner is a project; false if the owner is a user
* *sha?* string
* *path?* string

Set the branch on the returned object if you don't want the default one.

#### BitBucket Cloud

For BitBucket Cloud, use `new [BitBucketRepoRef][apidoc-bbrr](...)`.

### For Testing

You can usually use any of the concrete instances for local testing,
with dummy information.

[apidoc-ghrr]: https://atomist.github.io/automation-client/classes/_operations_common_githubreporef_.githubreporef.html (API Doc for GitHubRepoRef)
[apidoc-bbrr]: https://atomist.github.io/automation-client/classes/_operations_common_bitbucketreporef_.bitbucketreporef.html#constructor (API Doc for BitBucketRepoRef)
[apidoc-bbsrr]: https://atomist.github.io/automation-client/classes/_operations_common_bitbucketserverreporef_.bitbucketserverreporef.html (API Doc for BitBucketServerRepoRef)
