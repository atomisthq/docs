# Event Handlers

Event handlers are automations that trigger when events happen, such as pull requests, updated issues, failed builds and more.  You can create your own event handlers to make Atomist react however you want.

To create your own event handlers, you need an automation client of your own [LINK to quick start] and an event you want to listen for. The event handler below takes the action of notifying you in Slack when a new GitHub issue is created.

## Events

First you need to understand the events involved. You can [use GraphiQL to query for events](graphql.md#accessing-data-with-graphiql) to search for GitHub issues. This query shows the issue number and title for all your issues.

```
{
  Issue {
    number
    title
  }
}
```

Events can have relationships when it makes sense, even between different systems. Issues are related to their repo, and GitHub repos may also be associated with Slack channels [LINK to associating slack channel with repo?]. You can get all the information about these relationships in one query.

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

This query returns the data you want but it returns more data than you need. In this case you don't want all the issues, just the open ones. You can use a GraphQL argument to get exactly that, without making additional queries, and without having to filter the results.

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

There are a lot of interesting events and convenient relationships between them. [LINK to a catalog of event types somewhere, maybe the lifecycle schema if nothing else?] Exploring your builds, releases, Slack channels, comments and more using GraphQL may give you additional ideas for event handlers to build. For now, let's use this query to write our event handler. 

## Event handler structure

Here is a complete event handler that listens for new issues and notifies you. This puts together a lot of pieces that you have likely already seen.

```typescript
import {EventHandler} from "@atomist/automation-client/decorators";
import {EventFired, HandleEvent} from "@atomist/automation-client/HandleEvent";
import {HandlerContext} from "@atomist/automation-client/HandlerContext";
import {failure, HandlerResult, Success} from "@atomist/automation-client/HandlerResult";

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
            .then(() => Success)
            .catch(err => failure(err));
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

The @EventHandler decorator allows you to provide a description and a query to subscribe to. Notice the GraphQL that you built up in the previous section. You can [define the subscription GraphQL query inline or reference a file](graphql.md#subscriptions). It also implements HandleEvent which specifies the handle method. This is where your automation code goes. Every matching event triggers the code here. From here you have access to the event itself with EventFired and a [HandlerContext for interacting with Slack or querying more events](commands.md#what-do-you-get). While a command handler has @Parameters and @MappedParamters to specify the details on invocation, an event handler does not. Instead it acts on the data inside the event. It can have [@Secrets](commands.md#secrets) though to specify details you don't want in your code.

This example uses the HandlerContext to send a message about the new issue to any associated channels it has. Most of the work is done just by the subscription query that provides the data the event handler needs. The Issues interface exists merely for the convenience of having a typed EventFired, but there are ways to generate this type implicitly from the GraphQL schema. This event handler returns a [HandlerResult](commands.md#what-do-you-give-back) based on the success of the operation. (say something about what can be done with the result, are failures just logged?).

# Register and trigger the handler

Register this event handler by adding it to atomist.config.ts.

```typescript
export const configuration: Configuration = {
    events: [
        () => new IssueNotification(),
    ]
}
```

Restart your automation client and create a new GitHub issue to see the Slack notification. 

!!! hint 
You are not limited to notifications - you can do whatever you want in the handle method with your event data.

# Unit test

Event handlers run in the background based on incoming events, so it's critical to test so you can be sure that they do what you expect in various cases. Luckily, event handlers are very unit testable. 

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

To test your event handler, simply call the handle method with an event payload like it might see in the wild. Notice that instead of actually sending a message, the sample provides a FakeMessageClient (via the HandlerContext) where you assert about the way the message would be sent. A real test should exercise other test cases that are not necessarily the happy path.
