Now that you've familiarized yourself with what Atomist can do, let's build our first delivery flow.

In this flow we will listen to changes made to your README file. On a push to a repository, Atomist will detect if your README has changed, and print a message. In [Local Mode](/developer/local/), this will print to the terminal feed; in [Team Mode](/developer/team/), we will send the message to a chat channel.

## Prerequisites

Before starting, make sure that you have installed [the atomist CLI](/quick-start/) and created [a blank SDM](/developer/sdm/#creating-an-sdm-project). As well, since we'll be working in TypeScript, it's a good idea to [configure your editor](/developer/typescript/) to work with that toolchain. (Remember to run `npm install` in your SDM's folder.)

You also need a local repository that you don't mind making dummy commits and pushes to. We'll be working with [atomist-seeds/express-es6-rest-api](https://github.com/atomist-seeds/express-es6-rest-api). Fork this repository online; to clone it locally and have Atomist's git hooks already configured, run the following command:

```
$ atomist clone https://github.com/<YOUR_GITHUB_HANDLE>/express-es6-rest-api
```

This clones the project to the folder defined by the `ATOMIST_ROOT` environment variable (which defaults to `$HOME/atomist/projects`).

Finally, although you can configure Atomist to work with any chat system, in this tutorial, we'll be sending our message to Slack. Make sure you're an admin of a Slack workspace, and [add the Atomist app to it](https://docs.atomist.com/user/slack/)!

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
  {
    displayName: "display name"
  },
  async goalInvocation => {
      // do something
  });
```

The `displayName` appears as in the Atomist UI to identify your goal. Let's give it a better identifier:

```typescript
{
  displayName: "Print a message!"
}
```

The second argument to `goal` is the executing function. This takes a single argument, `goalInvocation`, which contains context about the originating event (in this case, a push). The type of this argument is a [`GoalInvocation`](https://atomist.github.io/sdm/interfaces/_lib_api_goal_goalinvocation_.goalinvocation.html), and while TypeScript already knows this, we should also explicitly define the type for the benefit of future humans reading the code:

```typescript
async (goalInvocation: GoalInvocation) => {
    // do something
});
```

The `GoalInvocation` type also needs to be imported from `@atomist/sdm`:

```typescript
import { goal, GoalInvocation } from "@atomist/sdm";
```

Since the only task our goal needs to execute is to provide a message, we can send one using `addressChannels`, which delivers messages to channels that are subscribed to this repository:

```typescript
async (goalInvocation: GoalInvocation) => {
    await goalInvocation.addressChannels("Way to update the README! 😍");
});
```

Our return type is [`ExecuteGoalResult`](https://atomist.github.io/sdm/interfaces/_lib_api_goal_executegoalresult_.executegoalresult.html), which in this case, just provides a status code of `0` indicating that everything is okay. Our final goal should look like this:

```typescript
import { goal, GoalInvocation } from "@atomist/sdm";

export const messageGoal = goal(
  {
    displayName: "Print a message!"
  },
  async (goalInvocation: GoalInvocation) => {
      await goalInvocation.addressChannels("Way to update the README! 😍");
  },
);
```

## Choosing a push to react to

Now that we've defined the outcome of our goal, it's time to associate it with a push event. While it's possible to respond to any push, we are only interested in responding to pushes which have commits which have modified our README. To handle that, we will create a [`PushTest`](/developer/push-test/), which is a sort of filter to determine whether or not a goal executes.

Within _message.ts_, import the `pushTest` function from `@atomist/sdm` package:

```typescript
import { goal, GoalInvocation, pushTest } from "@atomist/sdm";
```

Our `pushTest` function will take two arguments: a name (which is useful for identification with Atomist logs), and the function which performs the filtering logic. Let's set up another skeleton function which sets up our logic:

```typescript
export const modifiesReadme = pushTest(
  "modifiesReadme",
  async pushListenerInvocation => {
    return false;
  });
```

Once again, for the sake of humans, let's explicitly define the type for the `pushListenerInvocation` parameter (which is [`PushListenerInvocation`](https://atomist.github.io/sdm/interfaces/_lib_api_listener_pushlistener_.pushlistenerinvocation.html)):

```typescript
import { goal, GoalInvocation, PushListenerInvocation, pushTest } from "@atomist/sdm";

const modifiesReadme = pushTest(
  "modifiesReadme",
  async (pushListenerInvocation: PushListenerInvocation) => {
    return false;
  });
```

For our latest push, we want to get a list of the files that have changed. Luckily, there's an asynchronous function we can import called `filesChangedSince` which will perform this logic for us. It also takes two arguments: the project that the push is associated with, and the push itself. Let's import this method from the `@atomist/sdm` package:

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

For completeness, we may want to check for case-insensitivity when looking for `README.md`, but for this tutorial this `includes` match should be enough.

Our complete `pushTest` method looks like this:

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

As well, we're going to need to import a function called `whenPushSatisfies` from the `@atomist/sdm"` package, which, as the name might imply, will be responsible for calling our `modifiesReadme` filtering method:

```typescript
import {
    SoftwareDeliveryMachine,
    SoftwareDeliveryMachineConfiguration,
    whenPushSatisfies,
} from "@atomist/sdm";
```

Next, within the `machine` method, enter the following line:

```typescript
sdm.withPushRules(
    whenPushSatisfies(modifiesReadme).setGoals(messageGoal));
```

The method names provide clarity on the process:

* we configure the SDM to listen to push events (`withPushRules`)
* we test that the push in question passes our previous filter (`whenPushSatisfies`)
* if the push does pass the filter, we set the goals we want the SDM to achieve (`setGoals`)

That's all there is to it!

## Testing in Local Mode

The next step is to test that a README altering commit prints a message to the terminal!

Open a new terminal window and type:

```
$ atomist start --local
```

This starts Atomist in Local Mode. A whole slew of logging information will be printed, but you'll know the SDM is ready when the following line is shown:

```
Atomist automation client startup completed
```

Now, in another terminal, enter:

```
$ atomist feed
```

This command acts as a sort of `tail` for messages that the SDM sends. Any SDM activity that has to deal with events or the execution of goals shows up here.

In your `express-es6-rest-api` folder, make a commit that modifies the README. You should see your message printed:

```
# express-es6-rest-api 2019-04-23 12:31:59 atomist-seeds/express-es6-rest-api/master - c4f708d My commit message
  ︎▸ do a thing Working: do a thing
# express-es6-rest-api 2019-04-23 12:31:59 atomist-seeds/express-es6-rest-api/master - c4f708d My commit message
  ▸ Goals
  ⏦ do a thing
# express-es6-rest-api 2019-04-23 12:31:59 Way to update the README! 😍
```

Huzzah!

## Setting up Team Mode

Now that we know messages are being printed on commits in Local Mode, it's time to try the same behavior out for pushes on Atomist running in Team Mode. Follow [the instructions on this page](https://docs.atomist.com/developer/team/#what-is-necessary-to-enable-team-mode), which outlines everything that you need.

If you already went through the original walkthrough to set up Atomist, you should already have your workspace ID and API key configured. You can verify this by checking their presence in the `$HOME/.atomist/client.config.json` file.

Once that's set up, run `atomist start` to start the SDM in Team Mode.

## Sending messages to Slack in Team Mode

With [the Atomist app already added to your Slack workspace](https://docs.atomist.com/user/slack/), it's time to configure it to listen to pushes to your repository.

In Slack, type `@atomist repos` to get a list of repositories that the app is aware if. If you see your `express-es6-rest-api` repository already in that list, you're almost finished! Otherwise, click on the `Link Repository` button and follow the instructions to make the app aware of your repository.

When we wrote our original goal code, we used `goalInvocation.addressChannels` which, as the name implies, addresses all the channels that a repository is associated with. Our code needs no additional changes between Local Mode printing a message to the feed and Team Mode sending a message to a chat client.

With Atomist running in Team Mode, and the app configured in your Slack workspace, you're ready to test the flow out. Make a commit in your repository, and then run `git push` to get that change online.

The terminal window where Atomist is running should print out some logging messages. Meanwhile, the channel where the Atomist app is configured to sit should print out that commit, as well as the congratulatory message!

## What's next?

There are a lot of directions to go from here, but perhaps none better than taking a look at [all the different kinds of events](https://docs.atomist.com/developer/event/) that Atomist can listen to.

If you'd like to see the code for some other packs, check out [our list of open source extensions](https://docs.atomist.com/pack/) for additional inspiration!
