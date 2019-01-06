[GraphQL](http://graphql.org) is a powerful query language that you use to query
and mutate your data in the Atomist automation platform.

Besides being a great query language, GraphQL provides great tool support based
on strongly-typed schemas, type generation for TypeScript, and many other
advantages.

The Atomist SDM includes many of the GraphQL queries that are most useful in 
automating software delivery. You can also create your own.

The following sections tell you how to use GraphQL to query your data,
how to use subscriptions to get notifications when new data is ingested, and
how to mutate data.

## Accessing data with Graph<i>i</i>QL

For development purposes it is often helpful to test GraphQL queries
using a user interface.  The [Atomist web application][atomist-app]
provides the [Graph<i>i</i>QL](https://github.com/graphql/graphiql)
GraphQL client, which allows you write and run queries, displaying the
shape of the resulting data.  Graph<i>i</i>QL also provides access to
the data model documentation.

[atomist-app]: https://app.atomist.com/ (Atomist Web Application)
[dashboard]: ../user/dashboard.md (Atomist web interface docs)

### Try This

Log in to the [Atomist app][atomist-app] and [click on the GraphQL link][dashboard]
to get to the interactive Graph<i>i</i>QL client.

Enter this query (substitute your version control login):

```graphql
query MyBranches {
  Branch(orderBy: [timestamp_desc]) {
    commit @required {
      author(login: "YOUR-GITHUB-LOGIN") @required {
        login
      }
    }
    name
    repo {
      name
    }
  }
}
```

This will show you all the branches where you are the last commit author,
most recent first. This is handy for finding in-progress work.

This query demonstrates several features of Atomist's GraphQL interface:

* Each node has a Query type, so you can access branch, commit, repo, build, etc. directly.
However, it is strongly
recommended to start with either something that aren't many of (like branches) or select by a unique identifier
(like `Commit(sha: "abcdef...") {...}`).
* You can order by almost any field or fields, using `orderBy`. Pass it an array of order criteria (you'll get a popup to select them from).
* Each node can be selected by almost any field, as in `author(login: "jessitron") {...}`
* If you add `@required` (this is a custom GraphQL directive) to a subfield, then you won't see
nodes that don't have that field, or where that field doesn't meet your selection criteria.

Check the schema browser in Graph<i>i</i>QL for all the different Query types, properties, and selection options.

Try adding `pullRequests` as a field, with `number` and `state` properties,
to find out which branches have open PRs.


## Queries

You can execute queries from command and event handlers when running
an Atomist API client using the `GraphClient.query()` function.  A
`GraphClient` is available from the `HandlerContext` included in listener invocations
 via its `graphClient` property.

The `query()` function takes a single argument: a `QueryOptions`
object.  The actual GraphQL query can be supplied as a string via the
`query` property of `QueryOptions`, as the path to a file containing
the query via the `path` property, or as the name of a query in the
project's GraphQL query files via the `name` property.  The `path`
property can be an absolute or relative path, the latter being
resolved against the path of the calling script.  The `name` should be
the name of a GraphQL query operation found within a file with a
`.graphql` extension in a `graphql/query` folder in the directory of
the calling script or one of its parents.

!!! note
    Externalizing queries in files makes it possible to generate types
    for use in your TypeScript code.  More on that later.

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

    const result = await invocation.context.graphClient.query({
        name: "PushesWithFailedBuilds",
        variables: { name: "demo-service" },
    })

}
```

The `query` method takes the name of the query as the `name` property
of its first parameter.  The name provided matches that in the GraphQL
file. The `variables` property in the above example is used to provide
the value for the query variable.

## Custom Event Handlers


## Subscriptions

As detailed in the section on event handlers, GraphQL subscriptions can be used
to _subscribe_ to events as they get ingested into the Atomist platform.

Subscriptions can't be executed with the `GraphClient`; instead they can only
be used from an event handler. Many of these are included in the SDM.

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

!!! note
    When specifying the filename, the `.graphql` extension is optional.

## Mutations

Most of the data in the Atomist platform is ingested via Webhooks and
is read-only.  There are however a small number of very useful GraphQL
mutations available.

| Mutation | Description |
|----------|-------------|
| `createSlackChannel` | Create a new public channel in Slack |
| `addBotToSlackChannel` | Invite the Atomist bot user into the given channel |
| `inviteUserToSlackChannel` | Invite any user into the given channel |
| `linkSlackChannelToRepo` | [Link a GitHub repository to a Slack channel][repo-link] |
| `setTeamPreference` | Set preference data on the team entity |
| `setUserPreference` | Set preference data on the user entity |

[repo-link]: ../user/slack.md (Link GitHub Repository to Slack Channel)

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
await invocation.context.graphClient.mutate({
    name: "CreateSlackChannel",
    variables: { name: "random" },
})
```

## Strongly-typed GraphQL queries

One nice side-effect of using GraphQL as the query layer is that you
can generate types for use with TypeScript from the schema and your
queries, subscriptions, and mutations.

To generate types for your externalized GraphQL operations, run `npm run gql:gen`.
This creates a file called `types.ts` in `src/typings/`.

Now you can change the earlier query to use those types:

```typescript
import * as graphql from "./typings/types";

//...

    const result = await invocation.context.graphClient.query<
        graphql.PushesWithFailedBuilds.Query,
        graphql.PushesWithFailedBuilds.Variables>({
            name: "PushesWithFailedBuilds",
            variables: { name: "demo-service" },
    });

    // ....
}
```

