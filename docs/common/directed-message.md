A Directed Message is sent directly to on or more users or channels. No
automatic routing is performed by the Atomist Bot. It's possible to
add Directed Messages to a Plan returned by any handler type.

The simplest use of a Response Message just echos back some plain text to
the user that invoked the command:

```typescript
    handle(command: HandlerContext): CommandPlan {
        const bob = new UserAddress("@bob");
        return CommandPlan.ofMessage(new DirectedMessage("Hello world!", bob));
    }
```

It's possible to add more channels or usernames:

```typescript
handle(response: Response<any>): CommandPlan {
    const bob = new UserAddress("@bob");
    let msg  = new DirectedMessage("Hello everyone!", bob);
    msg.addAddress(new ChannelAddress("#general"));
    return CommandPlan.ofMessage(msg);
}
```

By default, the body of the message is assumed to be `"text/plain`, and will be
displayed verbatim. The message can also be JSON formatted according to
[Slack's message standards][slack-message]:

```typescript
    handle(command: HandlerContext): CommandPlan {
        const user = new UserAddress("@bob");
        const json = {
            "text": "I am a test message https://www.atomist.com",
            "attachments": [{
               "text": "And here’s an attachment!"
             }]
        }
        const msg = new DirectedMessage(JSON.stringify(json), user, MessageMimeTypes.SLACK_JSON);
        return CommandPlan.ofMessage(msg);
    }
```

[slack-message]: https://api.slack.com/docs/messages/builder
