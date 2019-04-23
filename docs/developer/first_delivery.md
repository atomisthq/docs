Now that you've familiarized yourself with what Atomist can do, let's build our first delivery flow.

In this flow we will listen to changes made to your README file. On a push to a repository, Atomist will detect if your README has changed, and print a message. In [Local Mode](/developer/local/), this will print to the terminal feed; in [Team Mode](/developer/team/), we will send the message to a chat channel.

## Prerequisites

Before starting, make sure that you have installed [the atomist CLI](/quick-start/) and created [a blank SDM](/developer/sdm/#creating-an-sdm-project). As well, since we'll be working in TypeScript, it's a good idea to [configure your editor](/developer/typescript/) to work with that toolchain. (Remember to run `npm install` in your SDM's folder.)

You also need a local repository that you don't mind making dummy commits and pushes to. We'll be working with [atomist-seeds/express-es6-rest-api](https://github.com/atomist-seeds/express-es6-rest-api). Fork this repository online; to clone it locally and have Atomist's git hooks already configured, run the following command:

```
atomist clone https://github.com/<YOUR_GITHUB_HANDLE>/express-es6-rest-api
```

This clones the project to the folder defined by the `ATOMIST_ROOT` environment variable (which defaults to `$HOME/atomist/projects`).

## Defining your first goal

A [goal](https://docs.atomist.com/developer/goal/) is a function that we want to run during certain events or within specific projects. In this case, our goal is to print a message.

Open an editor that points to your local SDM's folder. All of the work in this tutorial will take place in the _lib/machine_ directory. There should be just one file in there: _machine.ts_. This defines the behavior of your SDM: identifying which goals to run, which events to react to, and so on.

For now, we are going to focus on having a new message print. Create a new file in this directory called _message.ts_. We'll start by importing the `goal` function from the `@atomist/sdm` package:

``` typescript
import { goal } from "@atomist/sdm";
```

The `goal` function takes two arguments: a [GoalDetails object](https://docs.atomist.com/developer/goaldetails/), which provides some metadata about our goal, and the executing function itself.

Let's start by defining a skeleton of what the `goal` function needs:

```typescript
export const messageGoal = goal(
  { displayName: "display name",
    uniqueName: "unique-name",
  },
  async goalInvocation => {
      // do what is needed
      return { code: 0 };
  });
```

The `displayName` appears as in the Atomist UI to identify your goal, while the `uniqueName` is used by Atomist's API to distinguish your goal from others. Let's give these better identifiers:

```typescript
{
  displayName: "Print a message!",
  uniqueName: "message-printer",
}
```

The second argument to `goal` is the executing function. This takes a single argument, `goalInvocation`, which contains context about the originating event (in this case, a push). The type of this argument is a [`GoalInvocation`](https://atomist.github.io/sdm/interfaces/_lib_api_goal_goalinvocation_.goalinvocation.html), and while TypeScript already knows this, we could also explicitly define the type for future humans to read:

```typescript
async (goalInvocation: GoalInvocation) => {
    // do what is needed
    return { code: 0 };
});
```

Including this type should also `import GoalInvocation` from `@atomist/sdm`:

```typescript
import { goal, GoalInvocation } from "@atomist/sdm";
```

Since the only task our goal needs to execute is to provide a message, we can send one using `addressChannels`, which delivers messages to channels that are subscribed to this repository:

```typescript
async (goalInvocation: GoalInvocation) => {
    goalInvocation.addressChannels("Way to update the README! 😍");
    return { code: 0 };
});
```

Our return type is [`ExecuteGoalResult`](https://atomist.github.io/sdm/interfaces/_lib_api_goal_executegoalresult_.executegoalresult.html), which in this case, just provides a status code of `0` indicating that everything is okay. Our final goal should look like this:

```typescript
import { goal, GoalInvocation } from "@atomist/sdm";

export const messageGoal = goal(
  { displayName: "do a thing",
    uniqueName: "this-special-thing",
  },
  async (goalInvocation: GoalInvocation) => {
      goalInvocation.addressChannels("Way to update the README! 😍");
      return { code: 0 };
  },
);
```

## Choosing a push to react to

Now that we've defined the outcome of our goal, it's time to associate it with a push event. While it's possible to respond to any push, we are only interested in responding to pushes which have commits which have modified our README. To handle that, we will create a [`PushTest`](/developer/push-test/), which is a sort of filter to determine whether or not a goal executes.

Within _message.ts_, import the `pushTest` function from `@atomist/sdm` package:

```typescript
import { goal, GoalInvocation, pushTest } from "@atomist/sdm";
```

Our `pushTest` function will take two arguments: a name, and a function which performs the filtering logic. Let's set up another skeleton function which sets up our logic:

```typescript
const modifiesReadme = pushTest(
  "modifiesReadme",
  async pushListenerInvocation => {
    return false;
  });
```

Once more, let's explicitly define the `pushListenerInvocation` type (which is [`PushListenerInvocation`](https://atomist.github.io/sdm/interfaces/_lib_api_listener_pushlistener_.pushlistenerinvocation.html)):

```typescript
import { goal, GoalInvocation, PushListenerInvocation, pushTest } from "@atomist/sdm";

const modifiesReadme = pushTest(
  "modifiesReadme",
  async (pushListenerInvocation: PushListenerInvocation) => {
    return false;
  });
```

For our latest push, we want to get a list of the files that have changed. Luckily, there's an asynchronous function we can import called `filesChangedSince` which will perform this logic for us. It also takes two arguments: the project that the push is associated with, and the push itself. Let's import this message from the `@atomist/sdm` package:

```typescript
import { filesChangedSince, goal, GoalInvocation, PushListenerInvocation, pushTest } from "@atomist/sdm";
```

The `pushListenerInvocation` contains all the information about a project and a push. Within our filtering function, we can call the `filesChangedSince` method and provide it with the necessary arguments:

```typescript
async (pushListenerInvocation: PushListenerInvocation) => {
  const changedFiles = await filesChangedSince(pushListenerInvocation.project, pushListenerInvocation.push);
  return changedFiles.includes("README.md");
});
```

For completeness, we may want to check for case-insensitivity when looking for `README.md`, but for this tutorial it should be enough.

Our complete `pushTest` method should look like this:

```typescript
import { filesChangedSince, goal, GoalInvocation, PushListenerInvocation, pushTest } from "@atomist/sdm";

const modifiesReadme = pushTest(
  "modifiesReadme",
  async (pushListenerInvocation: PushListenerInvocation) => {
    const changedFiles = await filesChangedSince(pushListenerInvocation.project, pushListenerInvocation.push);
    return changedFiles.includes("README.md");
  });
```

## Attaching to your SDM

We've set up a goal and defined when we want it to be invoked; it's time to associate it with our SDM!

The _lib/machine/machine.ts_ file is used to control the behavior of the SDM. Here, we can define which events we want to listen to and which goals to run for those events.

Let's start by importing the two functions that we defined earlier:

```typescript
import {
    messageGoal, modifiesReadme,
} from "./message";
```

Next, within the `machine` method, enter the following line:

```typescript
sdm.withPushRules(
    whenPushSatisfies(modifiesReadme).setGoals(messageGoal));
```

The method names provide clarity on the configuration:

* we configure the SDM to listen to push events (`withPushRules`)
* we test that the push in question passes our previous filter (`whenPushSatisfies`)
* if the push does pass the filter, we set the goals we want the SDM to achieve (`setGoals`)

That's all there is to it!

## Associating the SDM with your repository

Now that our SDM is set up the behave just as we want it to, it's time to test everything and make sure that our code is correct. Before doing that, though, it's important to go over the differences between [Local Mode](/developer/local/) and [Team Mode](/developer/team/). Local Mode runs in the privacy of your own machine. The SDM doesn't communicate with the online Atomist service, and it behaves just like a local instance of the SDM would. Crucially, since we're operating locally, push events are simulated as coming from _commits_.

To associate the local `atomist-seeds/express-es6-rest-api` repository with the SDM running Local Mode, you'll need to navigate to the folder and enter:

```
atomist enable local
```

This instructs the SDM to watch for events that this repository triggers.

## Testing in Local Mode

The next step is to test that a README altering commit prints a message to the terminal!

Open a new terminal window and type:

```
atomist start --local
```

This starts Atomist in Local Mode. A whole slew of logging information will be printed, but you'll know the SDM is ready when the following line is shown:

```
Atomist automation client startup completed
```

Now, in another terminal, enter:

```
atomist feed
```

This command acts as a sort of `tail` for messages that the SDM sends. Any SDM activity that has to deal with events or the execution of goals shows up here.

In your `atomist-seeds/express-es6-rest-api` folder, make a commit that modifies the README. You should see your message printed:

```
# express-es6-rest-api 2019-04-23 12:31:59 atomist-seeds/express-es6-rest-api/master - c4f708d My commit message
  ︎▸ do a thing Working: do a thing
# express-es6-rest-api 2019-04-23 12:31:59 atomist-seeds/express-es6-rest-api/master - c4f708d My commit message
  ▸ Goals
  ⏦ do a thing
# express-es6-rest-api 2019-04-23 12:31:59 Way to update the README! 😍
```

Huzzah!

## Sending messages to Slack in Team Mode

{!tbd.md!}

## Conclusion

https://docs.atomist.com/developer/event/

https://docs.atomist.com/pack/changelog/
