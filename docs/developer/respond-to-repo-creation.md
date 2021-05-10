# Example: Responding to repository creation

Suppose we want to notify a Slack channel whenever a new repository is created.
There are two scenarios to consider:

1.  The creation of a new repository. `RepoCreationListener`:
    [RepoCreationListener](https://github.com/atomist/sdm/blob/master/lib/api/listener/RepoCreationListener.ts)
2.  The first push to a repository, which uses the more generic
    [ProjectListener](https://github.com/atomist/sdm/blob/master/lib/api/listener/PushListener.ts)

The second scenario is usually more important, as it is possible to
create a repository without any source code or a master branch, which
isn't enough to work with for common actions.

The following example publishes a message to the `#general` channel in
Slack when a new repo has been created:

```typescript
export const PublishNewRepo: SdmListener = (i: ListenerInvocation) => {
    return i.context.messageClient.addressChannels(
        `A new repo was created: \`${i.id.owner}:${i.id.repo}\``, "general");
};

```

Tagging a repo with topics based on its content is a useful
action. `tagRepo` is a convenient function to construct a
`ProjectListener` for this. It tags as an argument a `Tagger`, which
looks at the project content and returns a `Tags` object. The
following example from `machine.ts` tags Spring Boot repos,
using a `Tagger` from the `spring-automation` project, in addition to
suggesting the addition of a Cloud Foundry manifest, and publishing
the repo using the listener previously shown:

```typescript
sdm.addNewRepoWithCodeActions(
      tagRepo(springBootTagger),
      suggestAddingCloudFoundryManifest,
      PublishNewRepo)
```
