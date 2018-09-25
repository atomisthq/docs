# Setting Goals

The most important higher level SDM functionality relates to what
happens on a push to a repository. An SDM allows you to process a push
in any way you choose, but typically you want it to initiate a
delivery flow.

An SDM allows you to set [goals][] on push. Goals correspond to the
actions that make up a delivery flow, such as build and
deployment. Goals are not necessarily sequential--some may be executed
in parallel--but certain goals, such as deployment, have preconditions
(goals that must have previously completed successfully).

## Contributing goals

Goals are set using **rules**, which are typically expressed in a
simple internal DSL. For example, the following rules use `PushTest`
predicates such as `ToDefaultBranch` and `IsMaven` to determine what
goals to set for incoming pushes:

[goals]: goal.md (Atomist SDM Goals)

## Push Tests

Push test predicates are easy to write using the Atomist API. For example:

```typescript
export const IsMaven: PredicatePushTest = predicatePushTest(
    "Is Maven",
    async p => !!(await p.getFile("pom.xml")));
```

## Goal Sets

## Preconditions

