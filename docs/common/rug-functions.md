Rug Functions, as indicated by their name, are functions that can be invoked
from within Event or Command Handlers. They can be scheduled for invocation by
adding an instruction of kind `execute` to a plan:

```typescript linenums="1"
plan.add(
    {
        instruction: {
            kind: "execute",
            name: "http",
            parameters: {
                url: "https://api.github.com/repos/atomist/rug",
                method: "post",
                config: {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `token #{github://user_token?scopes=repo}`,
                    },
                    body: JSON.stringify(createRepoRequest)
                }
            }
        },
        onSuccess: new DirectMessage("Woot!", new ChannelAddress("#random")),
        onError: new DirectMessage("Un oh", new ChannelAddress("#random"))
    }
)
```

The plan above instructs the Rug Runtime to invoke the `http` Rug Function,
passing all the `parameters` to it, and sending appropriate messages to the
`#random` channel `onSuccess` or `onError`.

In order use a Rug Function from an Event or Command Handler, its archive's
coordinates must be present in the [`manifest.yml`](/user-guide/rug/archives.md).

!!! danger "Security"
    All Rug Function archives must be signed by Atomist and be explicitly
    whitelisted in the Atomist service. Otherwise, the execution of the invoking
    handler will be aborted.

[Secrets](#secrets) can also be passed to Rug Functions, but currently this is only supported
for Command Handlers.

The special `#{<secret path>}` notation used above is a way of injecting the value
of a secret (in this case, a GitHub token with `repo` scope) in to the parameters
to a function via string filtering. Rug Functions can also be [annotated][awsfn]
so that if the secrets required are known in advance, we don't need to use paramter
filtering.

[awsfn]: https://github.com/atomist/rug-functions-aws/blob/master/src/main/scala/com/atomist/rug/MirrorRepoToS3.scala#L40

The following Rug Function archives available:

-   [rug-function-http](https://github.com/atomist/rug-function-http) - perform arbitrary HTTP requests
-   [rug-functions-travis](https://github.com/atomist/rug-functions-travis) - encrypt secrets, start/stop builds
-   [rug-functions-aws](https://github.com/atomist/rug-functions-aws) - perform s3 operations and so on

!!! hint "Creating your own Rug functions"
    Right now there is no support for user-created Rug functions. Please get in
    touch by joining our [Slack team](https://join.atomist.com/) if you need one
    that doesn't already exist.

### Secrets

{!decorators/secrets.md!}
