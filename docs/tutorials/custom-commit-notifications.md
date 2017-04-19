Things happen all the time in your development workflow. Commits are pushed,
builds are started, they fail or succeed. Team members, or even users, open and
comment issues everyday.

All that flow of information can become overwhelming. With Atomist, you can
attach behavior to these events and automate all sorts of near real-time
responses.

These tutorials show you how to rely on Atomist to automate those scenarios.

!!! tip "All you need is Rug"
    These tutorials aim at showing you the code that you could write to
    automate event reactions. They assume you have a [Rug project][ugpj]. You
    can easily add [Rug event handler][rugev] to that project via the public 
    [AddTypeScriptEventHandler Rug editor][rugeditor] provided by Atomist.

[rugev]: /user-guide/rug/handlers.md
[ugpj]: /user-guide/rug/projects.md
[rugeditor]: https://github.com/atomist/rug-editors#addtypescripteventhandler

## Getting Notified from a User Commit

The first events you will ask Atomist to react to are commits pushed by a user.
To achieve this, you add a [Rug event handler][rugev] to your
[Rug project][ugpj] that, once you have [published][ugpub] it to your team, will
be evaluated and executed by Atomist on such events.

[ugpub]: /user-guide/rug/lifecycle.md#publishing

Below is such an event handler:

```typescript linenums="1"
{!../../.atomist/handlers/event/NewCommitPushedToGeneral.ts!}
```

An event handler tells Atomist what it is interested in via its
[path expression][ugpxe] on line 10. Notice in particular how the handler
filters only commit made by a given author on line 11 (here, Alice's commits). 
Finally, line 12 asks Atomist to also feed the handler with the commits
repository details.

[ugpxe]: /user-guide/rug/path-expressions.md

Once it gets called, the event handler builds a message to send to the 
`#general` channel of your team. 

## Message me on Commits

In the previous section, you wrote an event handler that sends a message to
the general channel of your team when Alice pushes her commits.

Let's see now you could ask Atomist to send a direct message instead.

```typescript linenums="1" hl_lines="22"
{!../../.atomist/handlers/event/NewCommitPushedToDM.ts!}
```

As you can see, the only change is on line 22 where you provide the name of 
the user to send the message to, here `@Bob`.

But wait, you can have it both ways and send a direct message and a 
channel message:

```typescript linenums="1" hl_lines="21 26 31 33"
{!../../.atomist/handlers/event/NewCommitPushedToDMAndGeneral.ts!}
```

Event handlers can dispatch multiple messages from a single event as shown 
on the highlithed lines in this example.

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