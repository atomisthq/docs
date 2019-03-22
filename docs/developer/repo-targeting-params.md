# Repo Targeting Parameters

Many commands operate on one or more repositories. For instance, all
[transform](transform.md) commands run on a repository or more than one repository.

If you run one of these commands in the context of a single repository -- for example, in a chat channel with one [linked repository](../user/lifecycle.md#linked-channels) -- then that repository
will be used. In any other context (such as a direct message to the Atomist bot),
you'll need to supply `targets.owner` and `targets.repo` or `targets.repos`.

By default, the command will start with the tip of the default branch. You can override this using the `targets.sha` or `targets.branch` parameter, as described below.

### Examples

To override default parameters in a chat command, add `--<parameter name>=<parameter value>`.

Run a transform in a channel [linked](../user/lifecycle.md#linked-channels) to one repository; base it on a different branch.

```text
@atomist update atomist dependencies --targets.branch=myBranch
```

Run a transform on all repositories in the MyCompany organization whose names end with "-sdm":

```text
@atomist update atomist dependencies --targets.owner=MyCompany --targets.repos=".*-sdm"
```

### Parameters

These commands' parameters mix in [RepoTargetingParameters](https://atomist.github.io/sdm/interfaces/_lib_api_helper_machine_repotargetingparameters_.repotargetingparameters.html), so these parameters are common to all of them:

| Parameter | Description | Default |
|-----------|-------------|---------|
| targets.owner | The organization or user | Defaults if Atomist can guess it by the context, otherwise required |
| targets.repo | Repository name | Defaults if Atomist can guess it by the context, otherwise you must provide either this or `targets.repos` |
| targets.repos | Regex to match against repository name | If provided, the command will run on all repositories whose names match. |
| targets.sha | commit SHA | Defaults to the tip of `branch` or the default branch |
| targets.branch | git branch | Defaults to the repository's default branch (usually master) |

!!! note
    If you see an error like

        If not executing in a mapped channel, must identify a repo via: `targets.owner` and `targets.repo`, or a repo name regex via `targets.repos`

    and you did supply `targets.repos`, then it's possible it did not find any matching repositories.

