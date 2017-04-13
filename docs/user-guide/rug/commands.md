Controlling communication and information flows is paramount to
effective teams. Open Source projects have long been relying on chat
to help them operate and coordinate contributors and project lifecycle.
Recent modern chat solutions, which can integrate deeply in your ecosystem, have
improved on those foundations and proven to be fantastic hubs for teams to
drive automation with simple chat commands.

Well-known scenarios drive a project's lifecycle, for instance cutting a new
release, or rolling back a broken deployment. However, like other Rugs, commands
can also drive into the code of the project at the tip of a bot's interaction.
In other words, not only can you use Rug commands to list open issues on a
project but the team can also query the project's code or even run other Rugs
against the project, all of this from the project's chat channel.

## Anatomy of a Command

Rug commands are the interface to add new skills to the [Atomist Bot][bot].
These commands are suitable for when you want to either query your project
or perform an action from where your team gathers to pilot the project.

[bot]: /user-guide/interfaces/bot.md

Depending on their goal, Rug command implementations are stored either along
side the project they target or in different projects altogether if they are
generic. In both cases however, Rug commands share the same approach as other
Rugs. For the purpose of this documentation, we will assume our command
implementations live in their own projects rather than in an existing project
as the documentation describes for Rug generators or editors.

Below is the basic structure of a generic Rug project. Rather than the usual
`.atomist/editors` directory, we have rather the `.atomist/handlers` directory
where our Rug command implementation will live.

```console
~/workspace/team-handlers
    ├── .atomist
    │   ├── .gitignore
    │   ├── handlers
    │   │   └── GetLatestSpringProjectTag.ts
    │   ├── manifest.yml
    │   ├── package.json
    │   ├── tests
    │   └── tsconfig.json
    ├── CHANGELOG.md
    ├── .gitignore
    ├── LICENSE
    └── README.md
```

The remaining of this Rug follows the usual [Rug project][projects] structure.

[projects]: projects.md

Rug commands are declared in Rug command handlers. Command handlers handle
commands coming from the Atomist Bot. The next section describes a basic Rug
command implementation.

## A Basic Command

Suppose we are interested in querying the [Spring][] project for the
latest tag of any of [its published projects][ghspring]. This would be a
typical example of simple Rug command that we could run from the Atomist Bot.

[spring]: http://spring.io/
[ghspring]: https://github.com/spring-projects/

Below is the command handler that declares the command and implements the
handling logic:

```typescript linenums="1"
import { HandleResponse, HandleCommand, Response, HandlerContext,
         Plan, ResponseMessage } from '@atomist/rug/operations/Handlers';
import { ResponseHandler, ParseJson, CommandHandler, Parameter, Tags,
         Intent } from '@atomist/rug/operations/Decorators';
import { Pattern } from '@atomist/rug/operations/RugOperation';
import { Project } from '@atomist/rug/model/Project';

@CommandHandler("GetLatestSpringProjectTag","Retrieve the latest Git tag for a Spring Project")
@Tags("spring")
@Intent("latest tag")
export class GetLatestSpringProjectTag implements HandleCommand {

    @Parameter({
        description: "The name of a Spring repository in GitHub",
        pattern: Pattern.any
    })
    repo: string;

    handle(command: HandlerContext): Plan {
        let plan = new Plan();

        const ghUrl = `https://api.github.com/repos/spring-projects/${this.repo}/tags`;

        plan.add({
            instruction: {
                name: "http",
                kind: "execute",
                parameters: {
                    method: "get",
                    url: ghUrl
                }
            },
            onSuccess: { kind: "respond", name: "FetchLatestTagInfo" },
            onError: { kind: "respond", name: "FetchedFailed" }
        });
        return plan;
    }
}
export let getLatestSpringProjectTag = new GetLatestSpringProjectTag();


@ResponseHandler("FetchLatestTagInfo", "Retrieves the latest tag information")
export class FetchLatestTagInfo implements HandleResponse<any>{

    handle(@ParseJson response: Response<any>): Plan {
        let tagUrl = response.body()[0].commit.url;
        let plan = new Plan();
        plan.add({
            instruction: {
                name: "http",
                kind: "execute",
                parameters: {
                    method: "get",
                    url: tagUrl
                }
            },
            onSuccess: { kind: "respond", name: "ShowTag" },
            onError: { kind: "respond", name: "FetchedFailed" }
        });
        return plan;
    }
}
export let fetchLatestTagInfo = new FetchLatestTagInfo();


@ResponseHandler("ShowTag", "Prints our the latest tag information")
export class ShowTag implements HandleResponse<any>{

    handle(@ParseJson response: Response<any>): Plan {
        let body = response.body;
        return Plan.ofMessage(new ResponseMessage(`{
    "attachments": [
        {
            "fallback": "",
            "title": "Latest tag",
            "title_link": "${body.html_url}",
            "fields": [
                {
                    "title": "Date",
                    "value": "${body.commit.committer.date}",
                    "short": true
                },
                {
                    "title": "Additions",
                    "value": "${body.stats.additions}",
                    "short": true
                },
                {
                    "title": "Deletions",
                    "value": "${body.stats.deletions}",
                    "short": true
                },
                {
                    "title": "Commit sha",
                    "value": "${body.sha}",
                    "short": false
                },
                {
                    "title": "Commit Message",
                    "value": "${body.commit.message}",
                    "short": false
				}
            ]
        }
    ]
}`));
    }
}
export let showTag = new ShowTag();


@ResponseHandler("FetchedFailed", "Prints our a nice message in case of error")
export class FetchedFailed implements HandleResponse<any>{

    handle(response: Response<any>) : Plan {
        let message = response.body;
        return Plan.ofMessage(new ResponseMessage(`Failed fetching tag information: ${message}`));
    }
}
export let fetchedFailed = new FetchedFailed();
```

This is longer than other Rugs seen so far but as it follows the same
programming model principles, it should look familiar.

The first lines group the Rug typing imports which, as usual, provide interfaces
and decorators to implement and declare your handlers (lines 1&ndash;6).
Here, the most important class is `#!typescript GetLatestSpringProjectTag`. The
following classes, `#!typescript FetchLatestTagInfo`, `#!typescript ShowTag` and
`#!typescript FetchedFailed` support the main one as we will see below. They are
not expected to be called directly.

We declare our command through a TypeScript [decorators][] (line 8). The first
argument of the `#!typescript @CommandHandler` decorator is the name of the
command, the second is its description. These make the handlers visible and
discoverable. The name, along with the command's group and repository, form the
fully-qualified name of the command handler. The following line uses the
`#!typescript @Tags` decorator to apply some tags to the command so others can
search for it more easily. Using the `#!typescript @Tags` decorator is optional
but highly recommended.

[decorators]: https://www.typescriptlang.org/docs/handbook/decorators.html

A Rug command handler can have associated intent users can send when talking
with the Atomist Bot. The intent is described using the `#!typescript @Intent`
decorator (line 10). Whenever a user sends the `@atomist latest tag` message to
the Atomist Bot, the Rug runtime runs the
`#!typescript GetLatestSpringProjectTag` command handler.

We then define the class which implements our command handler (line 11). A
command handler implements the `#!typescript HandleCommand` interface. This
interface requires the `#!typescript handle(command: HandlerContext): Plan`
method to be defined (line 19). It is a convention for the command handler and
the class that defines it to have the same name.

Rug command handlers can take parameters like other Rugs. These are declared
using the `#!typescript @Parameter` decorator (line 13). The decorated variable
names the parameter. If you assign a value to that variable, it becomes the
parameter's default value. The `#!typescript @Parameter` decorator adds
additional metadata via a single argument, a JavaScript object whose properties
are documented in the [conventions][rugconv]. Though the only mandatory property
is `#!typescript pattern`, in the case of command handlers, it is highly
recommended to also set `#!typescript description`, `#!typescript displayName`
and `#!typescript validInput` in order to help other users when invoking
commands via the Atomist Bot.

[rugconv]: conventions.md

The `#!typescript handle` method takes a single argument, a
`#!typescript HandlerContext` instance. This gives you access to a
[path expression engine][pxe] to query your organization's projects. The method
must return either a `#!typescript Plan`.

[pxe]: path-expressions.md

Let's start by explaining `#!typescript ResponseMessage` as it is the simpler. 
A message represents a set of presentable content and/or actions displayed to 
the user in response to invoking the command. By default, the message will be 
routed to the caller, from the place where the user issued the command:

```typescript
handle(response: Response<any>): Plan {
    return Plan.ofMessage(new ResponseMessage("Hello there!"));
}
```

However, it is also possible to route to a different location by setting a
Slack channel identifier (we assume a Slack integration here):

```typescript
handle(response: Response<any>): Plan {
    let message: = new DirectedMessage("Hello from a different channel!", new ChannelAddress("#general"));
    return Plan.ofMessage(message);
}
```

A command handler can also return a `#!typescript Plan`. A plan describes the
actions to be taken by the Rug runtime on behalf of the handler. Plans are
composed of messages and/or instructions. The former are exactly as we describe
above where instructions have the following properties:

*   `#!typescript kind`: the kind of instruction, one of `#!typescript "generate" | "edit" | "review" | "execute" | "respond" | "command"`
*   `#!typescript name`: the name of the operation to apply
*   `#!typescript parameters`: an object mapping names to values that is passed by
the Rug runtime, to the Rug being called.

To make this a little more concrete, our only instruction is defined as:

```typescript
{
    name: "http",
    kind: "execute",
    parameters: {
        method: "get",
        url: tagUrl
    }
}
```

This instruction describes an HTTP request implemented by a Rug function called
`"http"`. At runtime, Rug will look for a Rug function with that name and will
call it, passing the given `#!typescript parameters` as arguments to it. Here,
we indicate the HTTP method is a `GET` as well as the URL to be requested.

For other kinds, the definition looks similar but, in effect, a plan allows you
to call any other Rug. This means, for example, that a command could perform a
project edit or review initiated by a conversation with the Atomist Bot.

!!! important "It's all asynchronous"
    It is important to appreciate that because command handlers describe a plan,
    the actions declared in that plan are executed asynchronously. In other
    words, plans are just data the Rug runtime knows how to interpret but your
    handler cannot invoke those rugs or functions directly. So it's not safe to
    make assumptions regarding when instructions in a plan will be run, although
    it is fair to say that the Atomist platform will do its best to apply them
    as soon as possible.

Plans can have as many interleaved instructions and messages as they want.

Finally, we can attach success (line 33) and error (line 34) handlers to each
instruction to process the instruction's result. Here, we indicate that we want
to process the response's content of our HTTP call when it succeeds and also
deal with errors if they occur (for instance when the HTTP call returned a
40x-class status code).

The `#!typescript onSuccess` and `#!typescript onError` properties of an
instruction can be a `#!typescript Plan`, `#!typescript Message` or a
`#!typescript Respond`. A `#!typescript Respond` indicates the desire to handle
the response using a `#!typescript ResponseHandler`. A `#!typescript Plan` or
`#!typescript Message` are handled by the Rug runtime just as if they were
returned directly from the command handler as described above.

Response handlers are declared with the `#!typescript ResponseHandler` decorator
and the class must implement the
`#!typescript handle(response: Response<T>): Plan` method of the
`#!typescript HandleResponse<T>` interface. When the handler receives a JSON
payload, you can benefit from an automatic deserialization into an object by
decorating the response parameter with the `#!typescript @ParseJson` decorator,
for example `#!typescript handle(@ParseJson response: Response<T>): Plan`.

A response handler returns a `#!typescript Message` or `#!typescript Plan` just
like a command handler. So we can see for instance that the
`#!typescript FetchLatestTagInfo` response handler (line 43) instructs the Rug
runtime to perform another HTTP call, calling the `#!typescript ShowTag`
response handler (line 57) to process its response. In other words, we
demonstrate how you can chain execution of Rugs using Plans. The
`#!typescript ShowTag` response handler (line 67) simply formats a final
`#!typescript Message` to be returned to the user.
