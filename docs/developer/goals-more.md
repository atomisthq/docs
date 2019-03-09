

Here are some more things you can do with goals:

* [Perform a preparatory action](#prepare-the-checked-out-code) after checking out code and before executing the goal, with GoalProjectListeners
* [Reset goals](#reset-goals) on the latest commit, to have your SDM try again.

[apidoc-fulfillablegoal]: https://atomist.github.io/sdm/classes/_lib_api_goal_goalwithfulfillment_.fulfillablegoal.html (API doc for FulfillableGoal)
[built-in-goals]: goal.md#built-in-goals (Built-in Goals)
[apidoc-goal]: https://atomist.github.io/sdm/modules/_lib_api_goal_goalwithfulfillment_.html#goal (API doc for goal function)

## Prepare the checked out code

Any [built-in goal][built-in-goals], plus any goal created with the [`goal`][apidoc-goal] function, implements [`FulfillableGoal`][apidoc-fulfillablegoal]. These can have GoalProjectListeners.

Say you want to run tests as a separate goal. But you have to run a build
before the tests can run. By default, the goal will execute in a fresh
checkout of the repository (caveat: in [local mode](local.md), it may reuse a cached checkout).
Your test goal wants to run tests, it doesn't really want to run a build; it wants that to have run already.
Separately, you also want an integration-test goal and it also needs a build beforehand.

Encapsulate that "thing that needs to happen before the goal runs" in a GoalProjectListener.

### Create a GoalProjectListener

A [`GoalProjectListener`][apidoc-goalprojectlistener] function accepts a Project,
a [`GoalInvocation`][apidoc-goalinvocation], and a GoalProjectListenerEvent ("before" or "after").
The important part is the [Project](project.md); this is the checked-out repository that needs built
(or whatever preparation you are encapsulating).

```typescript
const BuildCheckedOutCode: GoalProjectListener = async (project, inv, event) => {
        if (!await project.hasDirectory("site")) {
            return { code: 0, message: "Looks OK, site directory already exists" };
        }
        // do the build or whatever is needful
    },
```

[apidoc-goalinvocation]: https://atomist.github.io/sdm/interfaces/_lib_api_goal_goalinvocation_.goalinvocation.html (API Doc for GoalInvocation)

### Create a GoalProjectListenerRegistration

A [`GoalProjectListenerRegistration`][apidoc-goalprojectlistenerregistration] object defines a name and when to run the GoalProjectListener.

The `name` field will appear in the description of the goal while it's running, inside [push events](../user/lifecycle.md#push). The `events` array determines whether this runs before or after a goal executes (default is both).

```typescript
const BuildCheckedOutCodeFirst: GoalProjectListenerRegistration = {
    name: "build the code",
    events: [GoalProjectListenerEvent.before],
    listener: BuildCheckedOutCode,
};
```

[apidoc-goalprojectlistenerregistration]: https://atomist.github.io/sdm/interfaces/_lib_api_goal_goalinvocation_.goalprojectlistenerregistration.html (API Doc for GoalProjectListenerRegistration)

### Register the GoalProjectListener on goals

Any `FulfillableGoal` can accept a GoalProjectListenerRegistration with its `withProjectListener` method.
Call this when you create the goal. For instance, here is a possible custom test goal:

```typescript
    const myTest = goal(
        { displayName: "Tests" },
        executeMyTests)
        .withProjectListener(BuildCheckedOutCodeFirst);
```

[apidoc-goalprojectlistener]: https://atomist.github.io/sdm/modules/_lib_api_goal_goalinvocation_.html#goalprojectlistener (API doc for GoalProjectListener)

## Reset goals

Your SDM can have a command to reset goals on the last commit. Add the `goalState` extension pack to your SDM:

```typescript
import { goalState } from "@atomist/sdm-core";

  sdm.addExtensionPacks(
        goalState(),
    );
```

Then send `@atomist reset goals <name of your SDM>`, where "name of your sdm" is the name property in package.json, minus any `@` characters.

You can add `branch=my-branch` and/or `sha=<40-character SHA>` to change which commit gets
a new set of goals.

