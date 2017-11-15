Event handlers are automations that trigger when events happen, such
as pull requests, updated issues, failed builds and more.  You can
create your own event handlers to make Atomist react however you want.

To create an event handler, you
need [an automation client of your own][client] and an event you want
to react to.  The sample event handler below notifies you in Slack when
a new GitHub issue is created.

When writing an event handler, you need to understand the events
involved. You
can
[use GraphiQL to query for events][gql-access]
their properties, and their relationships.  For example, this query
shows the issue number and title for all your issues.

```
{
  Issue {
    number
    title
  }
}
```

Events can have relationships when it makes sense, even between
different systems. Issues are related to their repo, and GitHub repos
may also be associated with Slack channels. You can get all the
information about these relationships in one query.

```
{
  Issue {
    number
    title
    repo {
      owner
      name
      channels {
        name
      }
    }
  }
}
```

This query actually returns more data than is needed. In this case you
only want the open issues. You can use a GraphQL argument to get
exactly that, without making additional queries, and without having to
filter the results later in code.

```
{
  Issue(state: open) {
    number
    title
    repo {
      owner
      name
      channels {
        name
      }
    }
  }
}
```

There are a lot of interesting events and convenient relationships
between them.  Exploring your builds, releases, Slack channels,
comments and more using GraphQL may give you additional ideas for
event handlers to build.  For now, let's use this query to write our
event handler.

[client]: client.md (Atomist Automation Client)
[gql-access]: graphql.md#accessing-data-with-graphiql (Accessing Data with GraphiQL)

## Event handler structure

Here is a complete event handler that listens for new issues and
notifies you.

```typescript
import { EventHandler } from "@atomist/automation-client/decorators";
import { EventFired, HandleEvent } from "@atomist/automation-client/HandleEvent";
import { HandlerContext } from "@atomist/automation-client/HandlerContext";
import {
    failure,
    HandlerResult,
    success
} from "@atomist/automation-client/HandlerResult";

@EventHandler("Notify channel on new issue",
    `subscription IssueNotification
{
  Issue(state: open) {
    number
    title
    repo {
      owner
      name
      channels {
        name
      }
    }
  }
}`)
export class IssueNotification implements HandleEvent<Issues> {
    public handle(e: EventFired<Issues>, ctx: HandlerContext): Promise<HandlerResult> {
        const issue = e.data.Issue[0];
        return ctx.messageClient.addressChannels(
            `New issue: #${issue.number} '${issue.title}' in ${issue.repo.owner}.${issue.repo.name}`,
            issue.repo.channels.map(c => c.name)
        )
            .then(success, failure);
    }
}

export interface Issues {
    Issue: [{
        number: number;
        title: string;
        repo: {
            owner: string;
            name: string;
            channels: [{
                name: string;
            }]
        }
    }]
}
```

The `@EventHandler` decorator allows you to provide a description and
a query to subscribe to. Notice the GraphQL that you built up in the
previous section.  You
can [define the subscription GraphQL query][gql-subscriptions] inline
or reference a file. It also implements `HandleEvent` which specifies
the handle method.  This is where your automation code goes. Every
matching event triggers the code here.  From here you have access to
the event itself with `EventFired` and
a [`HandlerContext`][handler-args] for interacting with Slack or
querying more events.  While a command handler has `@Parameters` and
`@MappedParamters` to specify the details on invocation, an event
handler does not.  Instead it acts on the data inside the event.

This example uses the `HandlerContext` to send a message about the new
issue to any associated channels it has.  Most of the work is done
just by the subscription query that provides the data the event
handler needs.  The `Issues` interface exists merely for the
convenience of having a typed `EventFired`, but there are ways to
[generate this type implicitly from the GraphQL schema](graphql/#strongly-typed-graphql-queries).  This event
handler returns a [`HandlerResult`][handler-ret] based
on the success of the operation.

!!! hint
    You are not limited to notifications in the handle method; you can
    do whatever you want with your event data!

[gql-subscriptions]: graphql.md#subscriptions (GraphQL Subscriptions)
[handler-args]: commands.md#handler-arguments (Handler Arguments)
[handler-ret]: commands.md#handler-return (Handler Return)

## Unit test

Event handlers run in the background based on incoming events, so it's
crucial to test so you can be sure that they do what you expect in
various cases.  Event handlers are very unit testable by design.

Here is a test for the issue notification event handler:

```typescript
import { EventFired } from "@atomist/automation-client/HandleEvent";
import { HandlerContext } from "@atomist/automation-client/HandlerContext";
import { guid } from "@atomist/automation-client/internal/util/string";
import { MessageOptions } from "@atomist/automation-client/spi/message/MessageClient";
import { MessageClientSupport } from "@atomist/automation-client/spi/message/MessageClientSupport";
import { SlackMessage } from "@atomist/slack-messages/SlackMessages";
import "mocha";
import * as assert from "power-assert";
import { IssueNotification } from "../../../../src/tutorial/lessons/events/IssueNotification";

describe("IssueNotification", () => {

    const payloadNewIssue = `{
	"data": {
		"Issue": [{
			"number": 123,
			"title": "another bug to fix",
			"repo": {
			    "owner": "negan",
			    "name": "saviors",
			    "channels": [
			        {
			            "name": "water-cooler-talk"
			        }
			    ]
			}
		}]
	}
}`;

    const handler = new IssueNotification();

    it("notifies channel", done => {
        class FakeMessageClient extends MessageClientSupport {
            protected doSend(msg: string | SlackMessage, userNames: string | string[],
                             channelNames: string | string[], options?: MessageOptions): Promise<any> {
                assert.deepEqual(msg, "New issue: #123 'another bug to fix' in negan.saviors");
                assert.deepEqual(channelNames, ["water-cooler-talk"]);
                return Promise.resolve();
            }
        }
        const ctx: HandlerContext = {
            teamId: "teamId1",
            correlationId: "correlationId1",
            invocationId: guid(),
            graphClient: undefined,
            messageClient: new FakeMessageClient(),
        };
        handler.handle(JSON.parse(payloadNewIssue) as EventFired<any>, ctx)
            .then(done, done);
    });

});
```

To test your event handler, simply call the `handle` method with an
event payload like it might see in the wild.  Notice that instead of
actually sending a message, the sample provides a `FakeMessageClient`
(via the `HandlerContext`) where you assert about the way the message
would be sent.  A real test should exercise other test cases that are
not necessarily the happy path.

## Examples

### Respond to new commits

When commits are pushed to GitHub, a Push event is triggered.

For instance, Atomist can run a linter with autofix, and commit the result back to the branch! We run
[this handler](https://github.com/atomist/automation-client-samples-ts-docker/blob/master/src/handlers/PushToTsLinting.ts)
in our teams.

This
[simple handler](https://github.com/atomist/automation-client-samples-ts/blob/master/src/events/NotifyOnPush.ts)
sends a message in Slack about a push.

### Comment on an issue

[This handler](https://github.com/atomist/automation-client-samples-ts/blob/master/src/events/CommentOnIssue.ts)
also watches for new or updated GitHub issues. It makes a comment on issues created by you, the runner of the automation
client.

### React to a failed build

One of Atomist's built-in automations sends a DM to the person whose commit
[failed a build.](https://github.com/atomist/lifecycle-automation/blob/master/src/handlers/event/build/NotifyPusherOnBuild.ts)

## Troubleshooting

After unit testing your logic, your best source of information is the log of your automation client. Add `console.log` calls to your handler as needed.

### My event didn't arrive
First, check that your registration completed successfully in the client logs at startup.

Run your query in GraphiQL to verify that your event arrived to Atomist. Try adding order-by-timestamp arguments to the
top of the query, to see the most recent events that came in.

```graphql
{
  Issue(orderBy: timestamp_desc, first: 10) {
    number
    timestamp
  }
}

```

### My handler didn't do what I expected
Ensure that the type of your incoming EventFired object matches the structure that you see in the query. Write unit tests that take events with the same structure and be sure to test corner cases. You can run the client locally in a debugger and trigger the events to see what is happening.
