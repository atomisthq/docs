Software development does not occur solely on the developer's machine any
longer. It has become a collaborative task open to all members of the team
and interactions are constant.

The Atomist Bot you have enrolled to your team strives to be tailored to what
makes sense to your team. To do so, you can teach the bot new skills to
automate common tasks your team routinely performs. Those skills are 
implemented inside Rug command handlers and this tutorial will show you their 
powerful, and indeed fun, capabilities.

!!! tip "All you need is Rug"
    These tutorials assume you have a [Rug project][ugpj] which hosts your
    new [Rug command handlers][rugcmd]. You can easily add them using the 
    [AddTypeScriptCommandHandler Rug editor][rugeditor] provided by Atomist.

[ugpj]: /user-guide/rug/projects.md
[rugcmd]: /user-guide/rug/commands.md
[rugeditor]: https://github.com/atomist/rug-editors#addtypescriptcommandhandler

## Search StackOverflow using the Bot

StackOverflow is one of the most popular venue for developers to collaborate. It
is a rather common place to go to and using Atomist you can let
your team enjoy the service from the team's channel, whilst also interacting
with each other.

Let's see a command handler you could use to query StackOverflow:

```typescript linenums="1"
{!../../.atomist/handlers/command/SearchStackOverflow.ts!}
```

Once available in your team, you will be able to make the most of this new
skill as follows:

```
@atomist search SO
```

Upon which the Atomist Bot would prompt your to input your query before going
its merry way and querying StackOverflow. In return, it would display your the
first returned items in a nicely formatted Slack message.

How does this work though? You define your Rug command handler and associate
the intent `search SO`, line 14, which the bot will understand as *call this
handler now*.

This handler takes a single parameter called `query` holding the user-supplied
input. Since this does not have a default value, the Atomist Bot will always
ask for it.

Then, line 23, we define the plan which Atomist will execute as soon as possible
once the handler returns it. This plan instructs Atomist to call the
StackOverflow REST API and use the `SendStackOverflowResults` response handler
on success. That handler is defined on line 43 and simply renders the result
content from the StackOverflow API call so that it renders nicely in the
channel you made the query from.

!!! tip
    Please refer to the [Rug command handler user-guide][rugcmd] to dive into
    the machinery of those command handlers.

## See Recent Active Issues

In the morning, or when you start your day, you are likely interested in
knowning what happend while you were away. Why not add a new skill to your
team so each member can ask for the last two or three active issues via the
Atomist bot!

Here is such a command handler that implements this new skill:

```typescript linenums="1"
{!../../.atomist/handlers/command/ListActiveIssues.ts!}
```

The Atomist Bot will run that command handler on the following intent:

```
@atomist active issues
```

The Bot will happily query the list of issues but, as your project may
be private or to work around the low limits of un-authenticated API call to
the GitHub API, this command handler uses one of your GitHub tokens, line 11,
stored as a secret value by Atomist (line 36). This secret does not transit
on the wire and is only available at runtime when the command handler is
executed on the Atomist backend. You only need to declare it, line 11, so 
Atomist populates it when needed.

!!! tip "Atomist and permissions"
    You may want to review the [permissions][] expected by Atomist to operate
    properly. Here, Atomist expects a token that has the `repo` scope
    permission.

[permissions]: /user-guide/permissions/github.md

The command handler builds a plan instructing Atomist to query the GitHub API
on your behalf. The plan also indicates how to process the response from that
call (line 41).

The rendering of the returned issues is taken care by the 
`DisplayLastActiveIssues` response handler which relies on a Slack renderer
provdided by Atomist.
