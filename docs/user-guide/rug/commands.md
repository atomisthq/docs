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

Rug commands are the interface to add new skills to the [Atomist bot][bot].
These commands are suitable for when you want to either query your project
or perform an action from where your team gathers to pilot the project.

[bot]: /user-guide/interfaces/bot.md

Depending on their goal, Rug commands are stored either along side the project
they target or in a different project altogether when they are generic. In both
cases however, Rug commands share the same approach as other Rugs. For the
purpose of this documentation, we will assume our commands live in their own
project rather than in an existing project like thie documentation describes for
Rug generators or editors.

Below is the basic structure of a generic Rug project. Rather than the usual
`.atomist/editors` directory, we have rather the `.atomist/handlers` directory
where our Rug command script will live.

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

Rug commands are one kind of Rug handlers. They handle commands coming from the 
Atomist bot. Let's see in the section a basic Rug command.

## A Basic Command

Suppose we are interested in querying the [Spring][] project for the 
latest tag of any of [its published projects][ghspring]. This would be a 
typical example of simple Rug command that we could run from the Atomist bot.

[spring]: http://spring.io/
[ghspring]: https://github.com/spring-projects/

Here is such a possible Rug command.

```typescript linenums="1"
import { HandleResponse, HandleCommand, Response, HandlerContext,
         Plan, Message } from '@atomist/rug/operations/Handlers';
import { ResponseHandler, ParseJson, CommandHandler, Parameter, Tags, 
         Intent } from '@atomist/rug/operations/Decorators';
import { Pattern } from '@atomist/rug/operations/RugOperation';
import { Project } from '@atomist/rug/model/Project';

@CommandHandler("GetLatestSpringProjectTag","Search for kitty snippets")
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

    handle(@ParseJson response: Response<any>): Message {
        let body = response.body(); 
        return new Message(`{
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
}`);
    }
}
export let showTag = new ShowTag();


@ResponseHandler("FetchedFailed", "Prints our a nice message in case of error")
export class FetchedFailed implements HandleResponse<any>{

    handle(response: Response<any>) : Message {
        let message = response.body();
        return new Message(`Failed fetching tag information: ${message}`);
    }
}
export let fetchedFailed = new FetchedFailed();
```

This is certainly longer than other Rugs seen so far but as it follows the 
same programming model principles, it look familiar.

The first lines group the Rug typing imports which, as usual, provide interfaces
and decorators to implement your Rug operations (lines 1&ndash;6). Here, the
main Rug operation is `#!typescript GetLatestSpringProjectTag`. The following
Rug operations, `#!typescript FetchLatestTagInfo`, `#!typescript ShowTag` and `#!typescript FetchedFailed` support the main one as we will see below. They are
not expected to be called directly.

We therefore declare our command through a TypeScript [decorators][] 
(line 8). The first argument of the `#!typescript @CommandHandler` decorator is the name of the command. This the public visible and discoverable name of the Rug. This name, along with the commands group and repository, form the fully-qualified name of the command. The second argument of the `#!typescript @CommandHandler` decorator is a short description of the editor. The following line uses the `#!typescript @Tags` decorator to apply some tags to our command so people can search for it more easily. Using the `#!typescript @Tags` decorator is optional but highly recommended.

[decorators]: https://www.typescriptlang.org/docs/handbook/decorators.html

A Rug command is associated to an intent an user sends when talking with the Atomist bot. This intent is described using the `#!typescript @Intent` decorator (line 10). Whenever an user sends the `@atomist latest tag` message to the Atomist bot, the Rug runtime applies the `#!typescript GetLatestSpringProjectTag` Rug command.

We then define the class which implements our command (line 11). A command 
implements the `#!typescript HandleCommand` interface. That interface requires the `#!typescript handle(command: HandlerContext): Plan` method to be defined (line 19). It is convention for the command and the class that implements it to have the same name.

Rug commands can take parameters like other Rug operations to tune their output. This customization is achieved through parameters that your command must declare in the class via the `#!typescript @Parameter` decorator (line 13). The decorated variable names your parameter. If you assign a value to that variable, it becomes the parameter's default value. The `#!typescript @Parameter` decorator adds additional metadata via a single argument, a JavaScript object which properties are documented in the [conventions][rugconv]. Though the only mandatory property is `#!typescript pattern`, in the case of Rug commands, it is highly recommended to also set `#!typescript description`, `#!typescript displayName` and `#!typescript validInput` in order to help the user when invoking the command via the Atomist bot.

[rugconv]: conventions.md

The `#!typescript handle` method takes a single argument, a
`#!typescript HandlerContext` object. That object gives you access to a [path expression engine][pxe] to query your project from the command. The method
must return either a `#!typescript Plan` or `#!typescript Message`.

[pxe]: path-expressions.md

Let's start by explaining `#!typescript Message` as it is the simpler. A message represents a set of presentable content and/or actions displayed to the user in responsing to invoking the command. To the bare minimum, a message is text content. By default, the message will be routed to the caller, from the place where the user issued the command. However, it is also possible to route to a different location. For instance:

```typescript
handle(response: Response<any>): Message {
    return new Message("Hello there!");
}
```

Next, the message is sent to a different place by setting a Slack channel identifier (we assume a Slack integration here):

```typescript
handle(response: Response<any>): Message {
    let message: Message = new Message("Hello from a different channel!");
    message.channelId = "C024BY98L";
    return message;
}
```

Rug command can also return a `#!typescript Plan`. A plan describes the actions to be taken by the Rug runtime on behalf of the command. Plans are composed of messages and/or instructions. The former are exactly as we describe above where instructions have the following properties:

* `#!typescript kind`: the kind of instruction, one of `#!typescript "generate" | "edit" | "review" | "execute" | "respond" | "command"`
* `#!typescript name`: the name of the operation to apply
* `#!typescript parameters`: an object mapping properties to values and passed, by the Rug runtime, to the operation being called

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

This instruction describes a HTTP call where the Rug function to call, by the Rug runtime, to perform that call is named `"http"`. At runtime, Rug will look for a Rug function named that way and will call it, passing the given `#!typescript parameters` to it. Here, we indicate the HTTP method is a `GET` as well as the URL to be addressed.

For other kinds, the definition looks similar but, in effect, a plan allows you to call any other Rug operations. This means, for example, that a command could perform a project's update or review at the tip of a conversation with the Atomist's bot.

!!! important "It's all asynchronous"
    It is important to appreciate that because Rug commands describe a plan, the actions declared in that plan are executed asynchronously from the call to your command handler method. In other words, plans are just data the Rug runtime knows how to interpret but your handler cannot invoke those actions directly. Do not make assumption regarding when instructions in a plan will be executed, although it is fair to say that the Atomist platform will do its best to apply them as soon as possible.

Plans can have as many interleaved instructions and messages as they need to.

Finally, we can attach completion (line 33) and error (line 34) handlers to each instruction to process the instruction's execution result. Here, we indicate we want to process the response's content of our HTTP call when it succeeds but also deal with errors when they occur, (for instance when the HTTP call returned a 40x-class status code).

The `#!typescript onSuccess` and `#!typescript onError` properties expect themselves an instruction definition. Here, we tell the Rug runtime to execute the response handlers defined below the Rug command.

Rug response handlers, are defined with the `#!typescript ResponseHandler` decorator and the class must implement the `#!typescript handle(response: Response<T>): Plan` method of the `#!typescript HandleResponse<T>` interface. When the handler receives a JSON payload, you can benefit form an automatic parsing, in that case, your method declaration must look like this: `#!typescript handle(@ParseJson response: Response<T>): Plan`. 

A response handler returns a `#!typescript Message` or `#!typescript Plan` much like a Rug command. Here we can see for instance that the `#!typescript FetchLatestTagInfo` response handler (line 43) instructs the Rug runtime to perform another HTTP call, calling the `#!typescript ShowTag` response handler (line 57) to process its response. In other words, here we demonstrate how you can chain plans. The `#!typescript ShowTag` response handler (line 67) simply formats a final `#!typescript Message` returned to the user.

