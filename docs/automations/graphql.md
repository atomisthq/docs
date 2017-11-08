# Working with GraphQL

[GraphQL](http://graphql.org) is a powerful query language that let's you query 
and mutate your own data in the Atomist automation platform.

Besides being a great query language, GraphQL provides great tool support based
on strongly typed schemas as well as type generation for TypeScript and many other
advantages. 

The following sections will describe how to use GraphQL to query your data, 
subscriptions to get notifications when new pieces of data get ingested and lastly 
how to mutate data.

## Accessing Data with GraphiQL

[GraphiQL](https://github.com/graphql/graphiql) is a GraphQL client that provides 
assistance for writing your queries, and see the shape of the resulting data. 
It also gives access to the documentation of the data model.

!!! note 
    If you're Mac OS user, it is easiest to install GraphiQL as stand-alone app
    from https://github.com/skevy/graphiql-app.

After installation we need to configure the endpoint and authentication in GraphiQL.

To setup authentication, click on _Edit HTTP Headers_ and select _+ Add Header_.
Now enter `Authorization` as _Header name_ and `Bearer <token>` as _Header value_.
Whereas `<token>` needs to be replaced by a GitHub personal access token with
`org:read` scope. 

!!! note
    GitHub personal access tokens can be created and managed over at: 
    https://github.com/settings/tokens

Next, enter `https://automation.atomist.com/graphql/team/<teamId>` as _GraphQL
Endpoint_ replacing `<teamId>` with your Slack team id. See the Setup section
on how to obtain your Slack team id.

Now you can start to create some queries and explore the possibilities of the
Atomist data model. Don't miss the schema documentation on the right hand side 
of GraphiQL.

## Queries 

You can execute queries from command and event handles when running an Atomist 
automation client. To execute queries the client provides two distinct methods 
on `GraphClient`. A `GraphClient` is available from the `HandlerContext`.

`executeQuery` can be used to run a GraphQL query from a `string` instance.
Alternatively, queries can be stored in `*.graphql` files and loaded from those
files for running queries. This is provided by the `executeQueryFromFile` method.

!!! note
    Externalizing queries makes is possible to generate types for the use within
    your TypeScript code. More on that in a later section.

In the following example we want to query for pushes and see all corresponding
continuous integration builds.

First we start by creating the query. Here we use a variable and a predicate to
match only failed builds. For this example we store assume the query is saved in
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

Now that the query is defined, it can be used with the `GraphClient` to execute 
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
file as first parameter. Second parameter in the above example is the value for
the query variable. Lastly we specify `__dirname` to pass over the full path of 
the current script which is needed to resolve the relative reference to the 
`.graphql` file.

## Subscriptions

As detailed in the section on event handlers, GraphQL subscriptions can be used
to _subscribe_ to events as they get ingested into the Atomist platform.

Subscriptions can't be executed with the `GraphClient`; instead then can only
be used from the `@EventHandler` decorator.

There are two approaches to declare the subscriptions on event handlers: either
via embedded strings or - more reusable - via referencing external files. In the
following we demonstrate the latter approach:

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

```typescript
import * as GraphQL from "@atomist/automation-client/graph/graphQL";

@EventHandler("Notify on broken builds",
    GraphQL.subscriptionFromFile("pushesWithFailedBuilds", __dirname))
export class FailedBuildHandler implements HandleEvent<any>
```
!!! note
    `GraphClient.executeQueryFromFile` and `GraphQL.subscriptionFromFile`
    take an optional `current` parameter. If omitted GraphQL files will be 
    attempted to be loaded from a `./graphql/` directory in the root of your
    automation client project. 

    When specifying the filename, the `.graphql` extension is optional.

## Mutations

Most of the data in the Atomist platform is being ingested via WebHooks. 
Nevertheless there are currently six GraphQL mutations available to handlers
in automation clients that can be very useful.

| Mutation | Description |
|----------|-------------|
| `createSlackChannel` | Create a new public channel in Slack |
| `addBotToSlackChannel` | Invite the @atomist bot user into the given channel |
| `inviteUserToSlackChannel` | Invite any user into the given channel |
| `linkSlackChannelToRepo` | Link a repository to a Slack channel |
| `setTeamPreference` | Set preference data on the team entity |
| `setUserPreference` | Set preference data on the user entity |

Similarly to queries, mutations can be loaded from files and executed with the
`GraphClient`. Here is an example showing how to create a new channel in Slack.
Let's start with the GraphQL file first:

```graphql
mutation CreateSlackChannel($name: String!) {
  createSlackChannel(name: $name) {
    id
  }
}
```

```typescript
ctx.graphClient.executeMutationFromFile("createSlackChannel", 
    { name: "random"}, __dirname)
    .then(...)
```

## Strongly-typed GraphQL Queries

One nice side-effect of using GraphQL as query layer is that we can generate
types for the use with TypeScript from the schema and our queries, subscriptions
and mutations.

To generate types for your externalized GraphQL operations, run `npm run gql:gen`.
This creates a file called `types.ts` in `src/typings/`.

Now we can change our earlier query to use those types:

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
Additionally the event handler example from earlier can now use types too:

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