[GraphQL](http://graphql.org) is a powerful query language that you use to query
and mutate your data in the Atomist automation platform.

Besides being a great query language, GraphQL provides great tool support based
on strongly-typed schemas, type generation for TypeScript, and many other
advantages.

The following sections tell you how to use GraphQL to query your data,
how to use subscriptions to get notifications when new data is ingested, and
how to mutate data.

## Accessing data with GraphiQL

[GraphiQL](https://github.com/graphql/graphiql) is a GraphQL client
that helps you write queries and displays the shape of the resulting
data. It also provides access to the data model's documentation.

!!! note
    On macOS it's easiest to install GraphiQL as a stand-alone app
    from https://github.com/skevy/graphiql-app.

After installation you need to configure the endpoint and authentication in GraphiQL.

To setup authentication, click on _Edit HTTP Headers_ and select _+ Add Header_.
Enter `Authorization` as _Header name_ and `Bearer <token>` as _Header value_.
Replace `<token>` with a GitHub personal access token that has _org:read_ scope.

!!! note
    Create and manage GitHub personal access tokens at:
    https://github.com/settings/tokens

Next, enter `https://automation.atomist.com/graphql/team/<teamId>` as _GraphQL
Endpoint_ replacing `<teamId>` with your Slack team ID. See the Setup section
on how to obtain your Slack team ID.

Now you are ready to create queries and explore the possibilities of the
Atomist data model. Don't miss the schema documentation on the right hand side
of GraphiQL.

## Queries

You can execute queries from command and event handlers when running an Atomist
automation client. To execute queries, the client provides two distinct methods
on `GraphClient`. A `GraphClient` is available from the `HandlerContext`.

You can use `executeQuery` to run a GraphQL query from a `string` instance.
Alternatively, you can can use the `executeQueryFromFile` method to load and
run queries stored in `*.graphql` files.

!!! note
    Externalizing queries makes it possible to generate types for use in
    your TypeScript code. More on that later.

The following example shows you how to query for pushes and see all corresponding
continuous integration builds.

Start by creating the query. The sample query includes a variable and a predicate that
matches only failed builds. This example assumes the query is saved in
a file called `pushesWithFailedBuilds.graphql`.

```graphql
query PushesWithFailedBuilds ($name: String!) {
  Push {
    repo(name: $name) {
      name
      owner
    }
    builds(status: failed) {
      name
      status
      buildUrl
    }
  }
}
```

Once the query is defined, you can use it with the `GraphClient` to execute
a query.

```typescript
public handle(ctx: HandlerContext): Promise<HandlerResult> {

    ctx.graphClient.executeQueryFromFile("pushesWithFailedBuilds",
        { name: "demo-service" }, __dirname)
        .then(result => {
            // Do something with the query result
        }, failure);

    // ....
}
```
The `executeQueryFromFile` method takes the relative path to the external query
file as first parameter. The second parameter in the above example is the value for
the query variable. Lastly we specify `__dirname` to pass over the full path of
the current script which is needed to resolve the relative reference to the
`.graphql` file.

## Subscriptions

As detailed in the section on event handlers, GraphQL subscriptions can be used
to _subscribe_ to events as they get ingested into the Atomist platform.

Subscriptions can't be executed with the `GraphClient`; instead they can only
be used from the `@EventHandler` decorator.

There are two ways to declare subscriptions on event handlers: either
by embedded strings or by referencing external files, which is more reusable.

This example demonstrates subscribing using an external file:

```graphql
subscription PushesWithFailedBuilds {
  Push {
    repo {
      name
      owner
    }
    builds(status: failed) {
      name
      status
      buildUrl
    }
  }
}
```

A GraphQL subscription begins with the keyword `subscription` followed
by a name for the subscription, `PushesWithFailedBuilds` in this case.
After the opening brace, you specify the type of the top-level event
you are subscribing to, `Push` in this example.  Your subscription
then defines the structured data you want to receive for each such
event, navigating the data model's properties and relationships to
connect related data elements like pushes, repositories, and CI
builds.

To use the above GraphQL subscription in an event handler, use the
`subscriptionFromFile` method:

```typescript
import * as GraphQL from "@atomist/automation-client/graph/graphQL";

@EventHandler("Notify on broken builds",
    GraphQL.subscriptionFromFile("pushesWithFailedBuilds", __dirname))
export class FailedBuildHandler implements HandleEvent<any> { ... }
```
!!! note
    `GraphClient.executeQueryFromFile` and `GraphQL.subscriptionFromFile`
    take an optional `current` parameter. If omitted, Atomist tries to
    load GraphQL files from a `graphql` directory in the root of your
    automation client project.

    When specifying the filename, the `.graphql` extension is optional.

## Mutations

Most of the data in the Atomist platform is ingested via Webhooks and
is read-only.  There are however a small number of very useful GraphQL
mutations available to handlers in automation clients.

| Mutation | Description |
|----------|-------------|
| `createSlackChannel` | Create a new public channel in Slack |
| `addBotToSlackChannel` | Invite the Atomist bot user into the given channel |
| `inviteUserToSlackChannel` | Invite any user into the given channel |
| `linkSlackChannelToRepo` | [Link a GitHub repository to a Slack channel][repo-link] |
| `setTeamPreference` | Set preference data on the team entity |
| `setUserPreference` | Set preference data on the user entity |

[repo-link]: ../user/index.md#linking-slack-github (Link GitHub Repository to Slack Channel)

Like queries, mutations can be loaded from files and executed with the
`GraphClient`. Here is an example showing how to create a new channel in Slack.

Here's the GraphQL file containing the mutation:

```graphql
mutation CreateSlackChannel($name: String!) {
  createSlackChannel(name: $name) {
    id
  }
}
```

This invokes the mutation from the GraphQL file:

```typescript
ctx.graphClient.executeMutationFromFile("createSlackChannel",
    { name: "random"}, __dirname)
    .then(...)
```

## Strongly-typed GraphQL queries

One nice side-effect of using GraphQL as the query layer is that you can generate
types for use with TypeScript from the schema and your queries, subscriptions
and mutations.

To generate types for your externalized GraphQL operations, run `npm run gql:gen`.
This creates a file called `types.ts` in `src/typings/`.

Now you can change the earlier query to use those types:

```typescript
import * as graphql from "./typings/types";

public handle(ctx: HandlerContext): Promise<HandlerResult> {

    ctx.graphClient.executeQueryFromFile<
        graphql.PushesWithFailedBuilds.Query,
        graphql.PushesWithFailedBuilds.Variables>(
            "pushesWithFailedBuilds",
            { name: "demo-service" },
            __dirname)
        .then(result => {
            // Do something with the query result
        }, failure);

    // ....
}
```

The event handler example from earlier can also now use types:

```typescript
import * as GraphQL from "@atomist/automation-client/graph/graphQL";
import * as graphql from "./typings/types";

@EventHandler("Notify on broken builds",
    GraphQL.subscriptionFromFile("pushesWithFailedBuilds", __dirname))
export class FailedBuildHandler
    implements HandleEvent<graphql.PushesWithFailedBuilds.Subscription> {

    public handle(event: EventFired<graphql.PushesWithFailedBuilds.Subscription>) {

        // Now accessing properties is strongly typed
        const builds = event.data.Push[0].builds;

        // ...
    }
}
```
