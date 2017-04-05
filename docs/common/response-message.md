A Response Message is much like a `#!typescript DirectedMesssage`, except that 
the destination for the message is optional because the Atomist Bot chooses the
channel or user to respond to based on where the command was invoked in the chat
system. As such, it really only makes sense to return Response Messages in Plans
returned from Command Handlers.

The most simple use of a Response Message just echos back some plain text to
the user that invoked the command:

```typescript
    handle(command: HandlerContext): CommandPlan {
        return CommandPlan.ofMessage(new ResponseMessage("Hello world!"))
    }
```

In addition to the default recipient, we can add one or more
`#!typescript MessageAddress`to the message to send the same message to other
chat users or channels.

```typescript
handle(response: Response<any>): CommandPlan {
    let message  = new ResponseMessage("Hello other world!");
    message.addAddress(new UserAddress("@bob"))
    return CommandPlan.ofMessage(message);
}
```

By default, the body of the message is assumed to be `text/plain`, and will be
displayed verbatim. The message can also be JSON formatted
according to [Slack's message standards][slack-message]:

```typescript
    handle(command: HandlerContext): CommandPlan {
        const json = {
            "text": "I am a test message https://www.atomist.com",
            "attachments": [{
               "text": "And here’s an attachment!"
             }]
        }
        const msgg = new ResponseMessage(JSON.stringify(json) , MessageMimeTypes.SLACK_JSON)
        return CommandPlan.ofMessage(message)
    }
```

[slack-message]: https://api.slack.com/docs/messages/builder