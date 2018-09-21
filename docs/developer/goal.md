The most important SDM functionality relates to what
happens on a push to a repository. An SDM allows you to process a push
in any way you choose, but typically you want it to initiate a
delivery flow.

# Goals

An SDM allows you to set **goals** on push. Goals correspond to the
actions that make up a delivery flow, such as build and
deployment. Goals are not necessarily sequential--some may be executed
in parallel--but certain goals, such as deployment, have preconditions
(goals that must have previously completed successfully).

In Slack, a push notification with several goals looks like this:

![Push Notification With Goals](img/push-notification-with-goals.png)

Set goals wherever you configure your SDM, probably in `lib/machine/machine.ts`. This example comes
from [a Spring SDM](https://github.com/atomist-seeds/spring-sdm/blob/master/lib/machine/machine.ts).

You can instantiate create goals and add implementations to them. Here, an Autofix goal has one autofix registered on it; it will add license headers to any 
code file that doesn't have one yet, and make a commit.

```
    const AutofixGoal = new Autofix().with(AddLicenseFile);
```

You can group goals into sets. Here, two goals are grouped: code inspection (but no code inspections are registered) and the Autofix goal.

```
    const BaseGoals = goals("checks")
        .plan(new AutoCodeInspection())
        .plan(AutofixGoal);
```

You can specify ordering, if some goals should wait for others to succeed. Here, we don't want to start the build until after Autofixes have completed.
If the autofixes do anything, they'll make a new commit, and we don't bother building this one.

```
    const BuildGoals = goals("build")
        .plan(new Build().with({ name: "Maven", builder: new MavenBuilder(sdm) }))
        .after(AutofixGoal);
```

Finally, you can tell the SDM which goal sets to run on . Here, we set the BaseGoals (inspection and autofix) on every push. Then if 
this is a Maven project (identified by having a pom.xml), we do the build as well.

```
    sdm.addGoalContributions(goalContributors(
        onAnyPush().setGoals(BaseGoals),
        whenPushSatisfies(IsMaven).setGoals(BuildGoals),
    ));
```


