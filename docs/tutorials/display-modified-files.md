## Fetch and Display the Modified Files

Sending messages on events is critical for information flow but what if you
could perform actions on those events! On a commit, it should be handy to see
which files were modified without having to open a browser or pulling the
changes locally.

Atomist allows your event handler to perform operations such as calling an
HTTP endpoint through Instructions you add to the returned Plan. Let's see
how this could look like with the following event handler.

!!! note
    This example relies on the [GitHub REST API][ghrestapi] and expects
    anonymous access to that repository for the call to succeed.

[ghrestapi]: https://developer.github.com/v3/repos/commits/

```typescript linenums="1"
{!../../.atomist/handlers/event/ListCommitFilesChanged.ts!}
```

This handler is a bit longer than in previous section indeed. The reason is that
it does much more, and hopefully glancing at the code should make sense
already.

On line 32, you instruct Atomist to perform a HTTP GET request against
the provided URL to retrieve the commit information, such as the number of
files modified by that commit.

!!! warning
    Atomist has a [whitelist][] of services that can be accessed that way,
    please contact us if you need to call a service not in that list.

[whitelist]: https://github.com/atomist/rug-function-http/blob/master/src/com/atomist/rug/functions/rug_function_http/whitelist.clj

The call is performed as soon as possible by Atomist, which, in return, calls
the appropriate success or error handler based on the response from the HTTP
call.

Here, you indicate that errors should be simply returned as a generic error
message using the `GenericErrorHandler` provided by Atomist. However, succesful
calls will be handled by the `ReceivedCommitDetails` response handler defined
line 61.

!!! tip
    This response handler should live in the same TypeScript file as its event
    handler.


Your response handler prepares a [Slack-ready message][slack] with the changes
from that commit. Notice how the response from the HTTP call is automatically
parsed, line 63, for you and available via `response.body` as an object.

[slack]: https://api.slack.com/docs/message-formatting
