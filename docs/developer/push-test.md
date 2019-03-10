A `PushTest` tests an aspect of a push at a point in time. Most push tests test the `Project` returned by the push:
that is, the state of the repository after the push. However push tests can also look at the push itself: for example,
considering the branch or commit message.

Push tests are a central part of the Atomist API, being combined in push rules to determine how to handle pushes
and drive delivery. Push tests are often reused, so it is good practice to extract them into constants. Many extension packs
export push test constants.

[API Doc](https://atomist.github.io/sdm/interfaces/_lib_api_mapping_pushtest_.pushtest.html)

Examples include:

* [Is this a Java project?](https://github.com/atomist/sdm-pack-checkstyle/blob/2399fe8bb44e84b96dad38acf3c20fa437a405a1/lib/support/checkstyleReviewer.ts#L90)
* [Was this a push to the default branch?](https://atomist.github.io/sdm/modules/_lib_api_mapping_support_commonpushtests_.html#todefaultbranch)
* [Did a specific file change?](https://atomist.github.io/sdm/modules/_lib_api_mapping_support_commonpushtests_.html#hasfile)
* Did an important change? [isMaterialChange](https://atomist.github.io/sdm/modules/_lib_api_helper_pushtest_materialchangetest_.html#ismaterialchange)

A push test maps from a [PushListenerInvocation][pli] to a `Promise<boolean>`. It decides whether this push is relevant
(true) or not relevant (false), returning a Promise so that it can invoke asynchronous operations.

To help your test make a decision, the `PushListenerInvocation` provides

* push: context around the push itself, such as the before and after commits, who made it, the repository name, and more.
* project: access to the code, through the `Project` interface
* the inherited [RepoContext](https://atomist.github.io/sdm/interfaces/_lib_api_context_sdmcontext_.repocontext.html) fields
common to all SDM events

[pli]: https://atomist.github.io/sdm/interfaces/_lib_api_listener_pushlistener_.pushlistenerinvocation.html (Push Listener Invocation)

## Creating push tests

When you only need the project, use the `predicatePushTest` function:

```typescript
import { predicatePushTest } from "@atomist/sdm";
export const IsMkdocsProject = predicatePushTest(
    "IsMkdocsProject",
    project => project.hasFile("mkdocs.yml"));
```

For maximum flexibility, construct a push test with a name and a mapping function. This provides access to both the push and project.
The previous example would look like this:

```typescript
import { pushTest } from "@atomist/sdm";
export const IsMkdocsProject = pushTest(
    "IsMkdocsProject",
    (pli: PushListenerInvocation): Promise<boolean> => {
        return pli.project.hasFile("mkdocs.yml");
    });
```

This allows us to check the push itself. For example:

```typescript
import { pushTest } from "@atomist/sdm";
export const ToDefaultBranch = pushTest(
    "ToDefaultBranch",
    async pu => pu.push.branch === pu.repo.defaultBranch);
```

## Testing push tests

As with the rest of the SDM API, we can write unit tests for push tests. This helps
ensure that the decisions made in our delivery flows are solid.

The following example uses Mocha and construct in memory projects and verify the behavior
of the above push tests.

```typescript
describe("IsMkdocsProject", () => {

    it("should not find MkDocs in empty repo", async () => {
        const project = InMemoryProject.of();
        // We need to cast as we want to ignore properties other than project of the invocation
        const r = await IsMkdocsProject.mapping({ project } as any as PushListenerInvocation);
        assert(!r);
    });

    it("should find Mkdocs in repo with mkdocs file", async () => {
        const project = InMemoryProject.of({ path: "mkdocs.yml", content: "here: yes" });
        const r = await IsMkdocsProject.mapping({ project } as any as PushListenerInvocation);
        assert(r);
    });
...
}
```
