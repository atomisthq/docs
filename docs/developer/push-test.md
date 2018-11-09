A PushTest measures a quality of a project at a point in time.
It can also check for qualities on a push.

[API Doc](https://atomist.github.io/sdm/interfaces/_lib_api_mapping_pushtest_.pushtest.html)

Examples include:

*  Is this a Java project?
*  Was this a push to the default branch?
*  Did a specific file change?

A push test maps from a [PushListenerInvocation][pli] to a boolean. It can perform asynchronous
operations.

[pli]: https://atomist.github.io/sdm/interfaces/_lib_api_listener_pushlistener_.pushlistenerinvocation.html (Push Listener Invocation)

## Creating

Construct a push test as an object literal:

```typescript
{
    name: "EmptyProject",
    mapping: (pli: PushListenerInvocation): Promise<boolean> => {
        return pli.project.
    }
}
