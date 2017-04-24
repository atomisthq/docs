A `#!typescript Respond` object (declared using `#!typescript {kind: "respond"}`) 
indicates the desire to handle the response to an Instruction using a
`#!typescript ResponseHandler` object. 

```typescript
{!../../.atomist/handlers/SuccessHandler.ts!}
```

Response handlers are declared with the `#!typescript ResponseHandler` decorator
and the class must implement the
`#!typescript handle(response: Response<T>): EventPlan | CommandPlan` method of the
`#!typescript HandleResponse<T>` interface. When the handler receives a JSON
payload, you can benefit from automatic JSON deserialization into an object by
decorating the response parameter with the `#!typescript @ParseJson` decorator,
for example `#!typescript handle(@ParseJson response: Response<T>): CommandPlan`.

Response Handlers must also return a plan, just like any handler. However, they
must return the appropriate type of plan for the execution chain in which they 
respond. So for an [Event Handler](/user-guide/rug/event-handlers.md) they must
return an `#!typescript EventPlan`, and for a [Command Handler](/user-guide/rug/command-handlers.md)
they must return a `#!typescript CommandPlan`.

{!hint-async.md!}
