This page assumes you have [created some goals][create-goals]. It shows how to:
*  group goals
*  set dependencies between goals
*  choose which goals to execute on each push
*  prevent the SDM from setting goals on a push

[create-goals]: goal.md (Goals and how to create them)

## Grouping goals

You can group goals into sets. Here, two goals are grouped: code inspection (but no code inspections are registered) and the Autofix goal.

```typescript
    const BaseGoals = goals("checks")
        .plan(new AutoCodeInspection())
        .plan(autofix);
```

## Dependencies

You can specify ordering, if some goals should wait for others to succeed. Here, we don't want to start the build until after Autofixes have completed.
If the autofixes do anything, they'll make a new commit, and we don't bother building this one.

```typescript
    const BuildGoals = goals("build")
        .plan(new Build().with({ builder: mavenBuilder() }))
        .after(autofix);
```

## Set goals on push

Finally, you can tell the SDM which goals to run on each push. Here, we set the BaseGoals (inspection and autofix) on every push. Then if 
this is a Maven project (identified by having a pom.xml), we do the build as well.

```typescript
    sdm.withPushRules(
        onAnyPush().setGoals(BaseGoals),
        whenPushSatisfies(IsMaven).setGoals(BuildGoals),
    );
```

## Push Tests

Push test predicates are easy to write using the Atomist API. For example:

```typescript
export const IsMaven: PredicatePushTest = predicatePushTest(
    "Is Maven",
    async p => !!(await p.getFile("pom.xml")));
```

## Preconditions

{!tbd.md!}

## Stop setting goals

{!tbd.md!}
