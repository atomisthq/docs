Autofixes keep your source code in the state you like it, without nagging people.
An Autofix checks every push, and if the code doesn't look like you want it to, changes it
and makes a commit.

The instructions in this page apply after:
*  You have an SDM that [sets goals][goals]
*  You have a [code transform command](transform.md).

This page shows how to:

* Turn a code transform into an autofix
* Skip some pushes

[goals](set-goals.md)

## Change a code transform into an autofix

Assume that we have the following code transform:

``` typescript
export const AddApacheLicenseFileTransform: CodeTransform<NoParameters> = async (p: Project) => {
    const httpClient = DefaultHttpClientFactory.create();
    const license = await httpClient.exchange("https://www.apache.org/licenses/LICENSE-2.0.txt");
    return p.addFile("LICENSE", license.body as string);
};
```

We can create an `AutofixRegistration`.

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

An `AutofixRegistration` references the code transform (or an array of code transforms).

Each autofix will make its own commit, and the `name` appears in the commit message:

``` text
Autofix: <name of the autofix>
```

See also: [AutofixRegistration API Docs](https://atomist.github.io/sdm/interfaces/_lib_api_registration_autofixregistration_.autofixregistration.html)

### Skip some pushes

The optional `PushTest` field limits when the Autofix will be applied. If the test returns false, Atomist will skip this Autofix. 
Here, we only want to add a license file to pushes that do not currently have one. We have the following `PushTest` that checks whether a project contains a license file.

``` typescript
hasFile("LICENSE")
```

`hasFile` returns true if a file is present in the code. The `not` function inverts the result, so the Autofix will only run when there is no `LICENSE` file present in the project after a push.

For more push tests, see [Push Tests][push-test].


[push-test]: push-test.md (Atomist Push Tests)

### Autofix Registration options

You can define a set of options on the registration:

* `ignoreFailure`: failures in the transform will cause other later autofixes to not be applied if set to `false`
* `considerOnlyChangedFiles`: the code transform will only be applied to files that have been changed in the push if set to `true`

<!-- TODO: are these required? What are the defaults? -->

## Add the autofix goal to your goalset

If you already have an Autofix goal, register your new autofix on it:

``` typescript
autofixGoal.with(AddApacheLicenseFileAutofix);
```

If not, get one. First you instantiate the goal itself and add the `AutofixRegistration` to it.

``` typescript
const autofixGoal = new Autofix().with(AddApacheLicenseFileAutofix);
```

Then you add the goal to your goal set. For example, if you want to add the goal to each push, you add the following piece of code.

``` typescript
sdm.addGoalContributions(goalContributors(onAnyPush().setGoals(autofix)));
```

## Commit behavior of autofixes

When autofixes are applied as a result of a push, the rest of the goal set will be cancelled, since they should run on the fixed code instead.

Each autofix will result in a separate commit, but all autofix commits will be pushed at the same time. This push will then trigger a
new goal set execution.
