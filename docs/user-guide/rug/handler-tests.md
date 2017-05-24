You can test handlers with the same Gherkin BDD approach as for project operations. The Rug testing framework makes it easy to invoke command handlers by name or publish events that event handlers should respond to, before examining any resulting `Plan` objects.

## Quick Overview

Before taking a deeper dive, let's look at an example of a TypeScript steps file to test an event handler:

```
import {Given,When,Then, HandlerScenarioWorld} from "@atomist/rug/test/handler/Core"

import * as cortex from "@atomist/rug/cortex/stub/Types"

Given("registered handler to test", world => {
	world.registerHandler("HandlerToTest")
})
When("we send a new commit", world => {
   let p = new cortex.Push().
   	addCommits(new cortex.Commit())
   world.sendEvent(p)
})
Then("we get a notification", world => {
    return world.plan().messages.length == 0
})
```
As with project operation testing, the steps will be defined in a `.feature` Gherkin file.

As with project operation testing, we begin by importing `Given` and other functions. However, in this case we do it from a different module: `@atomist/rug/test/handler/Core`.

In our steps, we must register one or more handlers. Use the `registerHandler` method to register both command handlers and event handlers.

In our `Then` steps, we typically examine the world to see if the appropriate steps were created.

## Using the Scenario World
Although many project operation tests don't need to use it, the scenario world is central to handler testing. Use it to register handlers you wish to test and verify created plans.

### Registering Handlers
Use the `registerHandler` as shown above. If a handler cannot be found in the current archive, the test scenario will fail.

Handlers in the current archive are _not_ registered by default. This is particularly important in the case of event handlers, as multiple event handlers might respond to same event(s), making it difficult to examine the resulting plan.

### Examining the Plan

`Plan` objects are simply data structures. So you can easily examine them. Often you want to check for the publication of messages, including their content and addressing. You can also check for instructions. A JavaScript assertion framework such as `chai` can help.

## Testing Command Handlers
To test command handlers, we register them by name and invoke them explicitly.

tbd

## Testing Event Handlers
Testing event handlers is more indirect. It's impossible to invoke an event handler directly, so we register handlers, publish one or more events to the world, then verify the created plans.

In some scenarios, we might want to establish that our handlers did _not_ respond to particular events.

The `sendEvent` method on the scenario world allows us to publish any graph node as an event, before testing whether the path expressions for any of our event handlers matches:

```
import * as cortex from "@atomist/rug/cortex/stub/Types"
...
Given("registered handler to test", world => {
	world.registerHandler("HandlerToTest")
})
When("we send a new commit", world => {
   let p = new cortex.Push().
   	addCommits(new cortex.Commit())
   world.sendEvent(p)
})
```

Typically we use the same Cortex stubs as we use for query by example to create the nodes to publish. We can also publish raw JSON, but that does not offer the same tool support.

