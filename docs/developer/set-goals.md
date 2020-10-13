This page assumes you have [created some goals][create-goals]. It shows how to:

* group goals
* set dependencies between goals
* choose which goals to execute on each push
* prevent the SDM from setting goals on a push

[create-goals]: goal.md (Goals and how to create them)

## Grouping goals

You can group goals into sets. Start creating a goal set with the [`goals`][apidoc-goalsbuilder] method; give it a name. Add goals to the set
with the `plan` method.

[apidoc-goalsbuilder]: https://atomist.github.io/sdm/modules/_api_goal_goals_.html#goals-1 (API Doc for goals builder)

```typescript
    const BaseGoals = goals("checks")
        .plan(codeInspection)
        .plan(autofix);
```

The `plan` method accepts one or more goals. The code below is equivalent to the code above:

```typescript
    const BaseGoals = goals("checks")
        .plan(codeInspection, autofix);
```

## Dependencies

By default, all goals execute in parallel. If some goals should wait for others to succeed, you can give them *preconditions* as you add them to a plan. To do this, call the `after` method immediately after `plan`.

The following example constructs a goal set called "build" with three goals: `autofix`, `codeInspection`, and `mavenBuild`.
The `mavenBuild` goal will execute only after `autofix` completes successfully.

```typescript
    const BuildGoals = goals("build")
        .plan(autofix, codeInspection)
        .plan(mavenBuild)
        .after(autofix);
```

Note that the `after` method affects only the goals in the last call to `plan`. Here, the `mavenBuild` goal gets
a precondition that the `autofix` goal must complete successfully.

The goals listed in `after` can be part of this goal set, but they don't have to be. They could be in another
goal set that is also added to the push. If the goal in `after` is not attached to a particular push at all, then the
precondition is ignored. See the next section for how to attach goal sets to a push.

## Set goals on push with "push rules"

Finally, you can tell the SDM which goals to run on each push. Here, we set the `BaseGoals` (inspection and autofix) on every push. Then if this is a Maven project (identified by having a `pom.xml`), we do the build as well.

```typescript
    sdm.withPushRules(
        onAnyPush().setGoals(BaseGoals),
        whenPushSatisfies(IsMaven).setGoals(BuildGoals),
    );
```

The rules are evaluated in order. The resulting goals are combined and de-duplicated to determine the goals
that will be set on the push.

The rules themselves are written in an internal DSL that aims to be human readable.

The `onAnyPush()` function will return true on all pushes.

The `whenPushSatisfies` function is used to combine other rules. For example, we could limit building to Java projects,
rather than all Maven projects, as follows:

```typescript
whenPushSatisfies(IsMaven, IsJava).setGoals(BuildGoals),
```

The DSL includes support for logical operations. For example, this will build all Maven projects except Kotlin projects:

```typescript
whenPushSatisfies(IsMaven, not(IsKotlin)).setGoals(BuildGoals),
```

Each argument to [`sdm.withPushRules`](https://atomist.github.io/sdm/interfaces/_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#withpushrules)
is a PushRule, contributing goals on a commit if a condition is met. That condition is a PushTest.

### Advanced Push Rules

#### Computed Values

You can use computed `boolean` values or the results of synchronous or
asynchronous functions returning `boolean` in the DSL, making it
possible to bring in any state you wish. For example:

```typescript
whenPushSatisfies(IsMaven, HasSpringBootApplicationClass,
	async (inv) => deploymentsToday < 25)
    .itMeans("Not tired of deploying Spring apps yet")
    .setGoals(LocalDeploymentGoals),
```

#### Decision Trees

You can write decision trees in push rules or other push
mappings. These can be nested to arbitrary depth, and can use computed
state. For example:

```typescript
let count = 0;
const pm: PushMapping<Goals> = given<Goals>(IsNode)
	// Compute a value we'll use later
    .init(() => count = 0)
    .itMeans("node")
    .then(
        given<Goals>(IsExpress).itMeans("express")
            .compute(() => count++)
            // Go into tree branch rule set
            .then(
                whenPushSatisfies(count > 0).itMeans("nope").setGoals(NoGoals),
				whenPushSatisfies(TruePushTest).itMeans("yes").setGoals(HttpServiceGoals),
            ),
    );
```

## PushTest

Push tests are functions that look at the content of a push and decide whether this goal applies.

See: [Documentation on Push Tests](push-test.md)

Here's a quick example of a push test:

```typescript
export const IsMaven: PredicatePushTest = predicatePushTest(
    "Is Maven",
    p => p.hasFile("pom.xml"));
```

To establish a PushTest for whether a project uses Maven as a build tool,
[this code](https://github.com/atomist/sdm-pack-spring/blob/3fcadc309231e45fa25a8ccde0cf25587ade6d71/lib/maven/pushtest/pushTests.ts#L33)
calls a constructor function
[predicatePushTest](https://atomist.github.io/sdm/modules/_api_mapping_pushtest_.html#predicatepushtest-1)
with a name for the PushTest and a function from a Project to a `Promise<Boolean>`.

The example [spring-sdm](https://github.com/atomist-seeds/spring-sdm/blob/1ab4ab06086e61f0e3395b1b7114a91a59d8939d/lib/machine/machine.ts#L84) uses this PushTest to create a PushRule, which sets build goals only on Maven projects:

```typescript
whenPushSatisfies(IsMaven).setGoals(buildGoals)
```

## Stop setting goals

Sometimes we want to stop setting goals after a particular rule evaluates to true.

For example, we can modify the earlier example to do nothing at all if the project has a `leaveMeAlone` file in the root directory:

```typescript
sdm.withPushRules(
    whenPushSatisfies(async pu => pu.project.hasFile("leaveMeAlone")).setGoals(goals("none").andLock()),
    onAnyPush().setGoals(BaseGoals),
    whenPushSatisfies(IsMaven).setGoals(BuildGoals),
);
```

The `andLock` method on the `Goals` class causes further goal evaluation to be ignored.
