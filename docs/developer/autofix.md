Once you know how to write a [code transform command](transform.md), you can then have that transform run automatically whenever a push happens on your project.

This page shows how to:

* Change a code transform into a autofix
* Add the autofix goal to your goalset

## Change a code transform into an autofix

Assume that we have the following code transform:

``` typescript
export const AddApacheLicenseFileTransform: CodeTransform<NoParameters> = async (p: Project) => {
    const httpClient = DefaultHttpClientFactory.create();
    const license = await httpClient.exchange("https://www.apache.org/licenses/LICENSE-2.0.txt");
    return p.addFile("LICENSE", license.body as string);
};
```

Instead of a `CodeTransformRegistration` we now create an `AutofixRegistration`.

``` typescript
export const AddApacheLicenseFileAutofix: AutofixRegistration = {
    name: "add apache license file",
    transform: AddApacheLicenseFileTransform,
    pushTest: not(hasFile("LICENSE")),
    options: {
        ignoreFailure: false,
        considerOnlyChangedFiles: false,
    },
};
```

An `AutofixRegistration` references the code transform (or array of code transforms), but can also define a `PushTest` that determines whether the code transform needs to run as a result of a push. In this case we have the following `PushTest` that checks whether a project contains a license file.

``` typescript
hasFile("LICENSE")
```

The `AutofixRegistration` then uses the `not` function in order to invert the result of the test, so that the transform will only run when there is no `LICENSE` file present in the project.

You can also define a set of options on the registration:

* `ignoreFailure`: failures in the transform will cause other additional autofixes to not be applied if set to `false`
* `considerOnlyChangedFiles`: the code transform will only be applied to files that have been changed in the push if set to `true`

## Add the autofix goal to your goalset

Adding autofixes to your goal set is accomplished by adding the `Autofix` goal to your SDM goal contributors and adding the registrations to that goal. First you define the goal itself and add the `AutofixRegistration`s to it.

``` typescript
const autofixGoal = new Autofix().with(AddApacheLicenseFileAutofix);
```

Then you add the goal to your goal set. For example, if you want to add the goal to each push, you add the following piece of code.

``` typescript
sdm.addGoalContributions(goalContributors(onAnyPush().setGoals(autofix)));
```

When autofixes are applied as a result of a push, the rest of the goal set will be cancelled.

## Commit behavior of autofixes

Each autofix will result in a separate commit, but all autofix commits will be pushed at the same time. This push will then trigger a
new goal set execution.

The format of the commit message for autofixes is:

``` text
Autofix: <name of the autofix>
```