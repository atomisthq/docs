A PushTest measures a quality of a project at a point in time.
It can also check for qualities on a push.

[API Doc](https://atomist.github.io/sdm/interfaces/_lib_api_mapping_pushtest_.pushtest.html)

Examples include:

*  [Is this a Java project?](https://github.com/atomist/sdm-pack-checkstyle/blob/2399fe8bb44e84b96dad38acf3c20fa437a405a1/lib/support/checkstyleReviewer.ts#L90)
*  [Was this a push to the default branch?](https://atomist.github.io/sdm/modules/_lib_api_mapping_support_commonpushtests_.html#todefaultbranch)
*  [Did a specific file change?](https://atomist.github.io/sdm/modules/_lib_api_mapping_support_commonpushtests_.html#hasfile)

A push test maps from a [PushListenerInvocation][pli] to a Promise<boolean>. It decides whether this push is relevant
(true) or not relevant (false), returning a Promise so that it can invoke asynchronous operations.

To help your test make a decision, the PushListenerInvocation provides

* push: context around the push itself, such as the before and after commits, who made it, the repository name, and more.
* project: access to the code, through the Project interface
* the common [RepoContext](https://atomist.github.io/sdm/interfaces/_lib_api_context_sdmcontext_.repocontext.html) fields 

[pli]: https://atomist.github.io/sdm/interfaces/_lib_api_listener_pushlistener_.pushlistenerinvocation.html (Push Listener Invocation)

## Creating

Most flexibly, construct a push test with a name and a mapping function:

```typescript
import { pushTest } from "@atomist/sdm";

export const IsMkdocsProject = pushTest(
    "IsMkdocsProject",
    (pli: PushListenerInvocation): Promise<boolean> => {
        return pli.project.hasFile("mkdocs.yml");
    });
```

Or, when you only need the project, here's a constructor function for that simpler case:

```typescript
import { predicatePushTest } from "@atomist/sdm";
export const IsMkdocsProject = predicatePushTest(
    "IsMkdocsProject",
    project => project.hasFile("mkdocs.yml"));
```

## Testing

