The most important SDM functionality relates to what
happens on a push to a repository. An SDM allows you to process a push
in any way you choose, but typically you want it to initiate a
delivery flow.

An SDM allows you to set **goals** on push. Goals are used for the
actions that make up a delivery flow, such as build and
deployment. They can also be observational in nature; for example,
listening to a build and exporting data about its result and duration
to a third party system.

The goals set on a push don't need to be the same every time. Unlike
the static pipelines you may be used to, with Atomist the delivery flow is not necessarily the same
for every change.

Goals aren't configured per repository. They are chosen dynamically, in response to any
push in any repository, based on the code and the context. What kind of project is it?
What branch was pushed? Is there a pull request? Which files changed?

Goals are not necessarily sequential--by default they execute
in parallel--but certain goals, such as deployment, have preconditions
(goals that must have previously completed successfully).

In Slack, a push notification with several goals looks like this:

![Push Notification With Goals](img/push-notification-with-goals.png)

This page shows how to

*  create goals
*  teach them what to do
*  require approval

The next page describes how to [set goals for each push][setting-goals].

[setting-goals]: set-goals.md (Setting Goals in an SDM)

## Create goals

Set up goals wherever you configure your SDM, probably in `lib/machine/machine.ts`. This example comes
from [an SDM for Java Spring Boot web services](https://github.com/atomist-seeds/spring-sdm/blob/master/lib/machine/machine.ts).

A [Goal][goal-apidoc] object supplies its name, descriptions for its various possible states, and an implementation.

[goal-apidoc]: https://atomist.github.io/sdm/classes/_lib_api_goal_goal_.goal.html "API docs for Goal"

There are several built-in goal implementations, or you can [create your own](#custom-goals). 

For instance, an Autofix goal has one autofix registered on it; it will add license headers to any 
code file that doesn't have one yet, and make a commit.

```typescript
    const autofix = new Autofix().with(AddLicenseFile);
```

After you've created some goals, [choose when to set them][setting-goals].

## Built-in Goals

A goal object has some identifying information, code to fulfill the goal, and optional preconditions (goals that need to complete before it can start). Some common goals have their own constructors.

### AutoInspect

Run an inspection on the code; if the code doesn't pass, you can fail the goals or require approval (a button push). To use it, you'll need to create one, set it on each push, and register inspections on it.

Instantiate an empty one:

```typescript
export const codeInspection = new AutoCodeInspection();
```

And set it when you want it to run on a push. Here's the shortest way to run this goal on every push:

```typescript
    sdm.addGoalContributions(goalContributors(
        onAnyPush().setGoals(goals("Inspections").plan(codeInspection))))
```

Now the fun part: register inspections on it. Check the [Inspections][inspection] page for more on how to write inspections.
Once you have an [AutoInspectRegistration][AutoInspectRegistration], register it on your goal:

```typescript
codeInspection.with(MyAutoInspectRegistration)
    .with(AnotherInspectRegistration);
```

You can register any number of inspections. You can call `with` on the goal at any point in SDM configuration.

If no inspections are registered, the goal will succeed. If any registration's `onInspectionResult` returns "fail", the goal will fail. If none return "fail" but one returns "require approval", the goal will go to Waiting for Approval state until someone clicks the Approve button in Slack or on the Atomist dashboard. 

[AutoInspectRegistration]: https://atomist.github.io/sdm/interfaces/_lib_api_registration_autoinspectregistration_.autoinspectregistration.html (AutoInspectRegistration API Doc)
[inspection]: inspect.md (Automatic Code Inspections)

### Autofix

This goal tells the SDM to check each push and create commits on top of it to correct fixable
violations in the code. For example, you can use this for automatic linting or to add license headers
where they have been omitted.

 Instantiate the goal:

``` typescript
const autofixGoal = new Autofix().with(AddApacheLicenseFileAutofix);
```

Add autofix registrations: see the [autofix documentation](autofix.md).

Then you add the goal to your goal set. For example, if you want to add the goal to each push:

``` typescript
sdm.addPushRules(onAnyPush().setGoals(autofix));
```

Each autofix registration can include a [push test](push-test.md) to select the projects it
can operate on.

### PushImpact

This allows you to run an arbitrary function in response to a push, with information
about the changes in the push.

For example, the following function lists changed files to any
Slack channels linked to a repo:

```typescript
export const listChangedFiles: PushImpactRegistration = {
    action(i: PushImpactListenerInvocation) {
        return i.addressChannels(`Files changed:\n${i.filesChanged.map(n => "- `" + n + "`").join("\n")}`);
    },
    name: "List files changed",
};
```

If you don't have a custom name or PushTest, you can use the following shorthand, supplying only the
`PushImpactListener` function:


```typescript
export const listChangedFiles = i => i.addressChannels(`Files changed:\n${i.filesChanged.map(n => "- `" + n + "`").join("\n")}`);

```

Create a`PushImpact` goal and add listeners as follows:

```typescript
const pushImpactGoal = new PushImpact().with(listChangedFiles)
```

> If your reaction is essentially a review--for example, it's associated
> with a known problem in a particular file location--use a
> `CodeInspectionRegistration` rather than a `PushImpactRegistration`.

### Build

This one has its [own section](build.md).

### Fingerprint

{!tbd.md!}

## Custom Goals

You can define your own goal to extend Atomist's out of the box capabilities. For example, you can:

- Delegate to a CLI by spawning a process and waiting for its result
- Call the API of a third party service
- Use a Node module or Atomist's API to implement your functionality right in TypeScript

To define your own goal, you must provide a name and description and a function for how to execute it.

Use the `createGoal` function from @atomist/sdm; pass it an object with a `displayName` and as many properties out of [GoalDefinition][goaldef-apidoc] as you choose.
Also pass a function to call when it's time to execute the goal. That function can return void or an [ExecuteGoalResult][egr-apidoc].

For example:

``` typescript
const releaseDocs = createGoal(
    { displayName: "Release Docs", preApprovalRequired: true }, 
    async (inv: GoalInvocation) => {
        // do what is needed
        return { code: 0, targetUrl: "https://where-i-put-them" };
    });
```

[goaldef-apidoc]: https://atomist.github.io/sdm/interfaces/_lib_api_goal_goal_.goaldefinition.html (GoalDefinition API Doc)
[egr-apidoc]: https://atomist.github.io/sdm/interfaces/_lib_api_goal_executegoalresult_.executegoalresult.html (ExecuteGoalResult API Doc)

### Requiring approval

{!tbd.md!}

### Waiting on a Precondition

Sometimes goals need other goals to have completed before they can start. This is handled in the push rule DSL.

Sometimes they wait on external conditions, such as another service having started. This is handled with *wait rules*.

{!tbd.md!}

