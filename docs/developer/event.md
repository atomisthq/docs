In an SDM, there are several built-in events that you can take action on.
You can also make a custom event subscription.

Most of these work only in team mode; the local SDM only hears about push events.
Goal-related listeners do work in local mode.

To respond to these events, register a listener with a function to run in response.
Each listener function receives a [ListenerInvocation](invocation.md) containing general context
and specific information about that event.

This page shows you how to:

* write a listener function for many different events
* register that listener with your SDM

Generally, you'll configure listeners inside your [machine function](sdm.md#machinets).

## Repository Creation

*(team mode only)* This fires when a repository is first created in your version control manager.
The repository might not have code yet! If you want to respond to a repository with code in it,
register a [first push listener](#first-push).

This is a good time to add standard labels to the repository, give read-only access to your whole
organization, or announce its existence in chat.

Create a function that accepts a [`RepoCreationListenerInvocation`](https://atomist.github.io/sdm/interfaces/_lib_api_listener_repocreationlistener_.repocreationlistenerinvocation.html). In addition to the standard [`RepoContext`][apidoc-repocontext],
this invocation has a `repo` field with owner and name. (You could also use the standard `id` field.)
The `addressChannels` method won't do anything, as the repository is not yet linked to any chat channels.

[apidoc-repocontext]: https://atomist.github.io/sdm/interfaces/_lib_api_context_sdmcontext_.repocontext.html (APIDoc for RepoContext)

Pass this function to [`sdm.addRepoCreationListener`](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#addrepocreationlistener).

## First Push

*(team mode only)* This fires the first time code is pushed to a new repository.

This is a good time to look at the code in the repository, and send messages to chat
that offer to upgrade it or add a deployment spec. Note that sometimes the repository has not been
linked to a channel yet, so `addressChannels` won't have anywhere to go.

Create a function that accepts a [`PushListenerInvocation`][apidoc-pushlistenerinvocation]. In addition to the standard [`RepoContext`][apidoc-repocontext],
this invocation has [`push`][apidoc-push-fragment] and [`project`](project.md).

If you want to check whether there are any channels linked, you could look in `pushListenerInvocation.push.repo.channels`. If that is empty, there are no channels linked yet. You might consider implementing a [Channel Link listener](#channel-link) to send messages about a new repository.

[apidoc-push-fragment]: https://atomist.github.io/sdm/modules/_lib_typings_types_.pushfields.html#fragment (API doc for push)
[apidoc-pushlistenerinvocation]: https://atomist.github.io/sdm/interfaces/_lib_api_listener_pushlistener_.pushlistenerinvocation.html (API Doc for PushListenerInvocation)

Pass this function to [`sdm.addFirstPushListener`](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#addfirstpushlistener).

## Repo Onboarding

*(team mode only)* This fires when a repository formerly not watched by Atomist is brought into our purvey, like when we add a webhook to a new organization. You might want to do similar things to a FirstPushListener.

Create a function that accepts a [`ProjectListenerInvocation`][apidoc-projectli]. In addition to the standard [`RepoContext`][apidoc-repocontext] [`project`](project.md), giving you access to the code in the repository.

[apidoc-push-fragment]: https://atomist.github.io/sdm/modules/_lib_typings_types_.pushfields.html#fragment (API doc for push)
[apidoc-projectli]:https://atomist.github.io/sdm/interfaces/_lib_api_listener_projectlistener_.projectlistenerinvocation.html (API doc for ProjectListenerInvocation)

Pass this function to [`sdm.addRepoOnboardingListener`](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#addrepoonboardinglistener).

## Goal Events

These work in local mode as well as team mode, since they happen around [Goals](goal.md).

### Goals Set

Once per push, the goals are chosen. This subscription fires after that happens.

Create a function that accepts a [`GoalsSetListenerInvocation`](https://atomist.github.io/sdm/interfaces/_lib_api_listener_goalssetlistener_.goalssetlistenerinvocation.html). In addition to the standard [`RepoContext`][apidoc-repocontext],
this invocation has [`push`][apidoc-push-fragment] and fields about the goals that were set: `goalSet`, `goalSetId`, and `goalSetName`.

Pass this function to [`sdm.addGoalsSetListener`](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#addgoalssetlistener).

### Goal Execution

This fires for every goal, before and after execution in your SDM.
You can notify a person when a goal completes,
or send a message to a logging system, for instance.

Create a function that accepts a [`GoalExecutionListenerInvocation`](https://atomist.github.io/sdm/interfaces/_lib_api_listener_goalstatuslistener_.goalexecutionlistenerinvocation.html). In addition to the standard [`RepoContext`][apidoc-repocontext],
this invocation has [`goalEvent`][apidoc-sdmgoalevent] property. Check its `state` to see whether the goal is `in_process`, successful, or failed.

[apidoc-sdmgoalevent]: https://atomist.github.io/sdm/interfaces/_lib_api_goal_sdmgoalevent_.sdmgoalevent.html (API Doc for SDM Goal Event)

Pass this function to [`sdm.addGoalExecutionListener`](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#addgoalexecutionlistener).

### Goal Completion

*(team mode only)* This fires when a goal created by your SDM is completed, even if the goal
is implemented in another SDM.
In most cases, you probably want a [`goal execution listener`](#goal-execution) instead.

Create a function that accepts a [`GoalCompletionListenerInvocation`](https://atomist.github.io/sdm/interfaces/_lib_api_listener_goalcompletionlistener_.goalcompletionlistenerinvocation.html). In addition to the standard [`RepoContext`][apidoc-repocontext],
this invocation has [`completedGoal`] field, which is an [SdmGoalEvent][apidoc-sdmgoalevent]. Check its `state` to see whether the goal completed successfully.

Pass this function to [`sdm.addGoalCompletionListener`](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#addgoalcompletionlistener).

## Channels

A repository can be [linked](../user/lifecycle.md#linked-channels) to a chat channel.
Then, the `addressChannel` method in the invocation
object passed to listeners will post messages to all channels linked to the repository in the event.
There are also some events around chat channels that you can subscribe to in your SDM.

### Channel Link

*(team mode only)* This fires when a repository is linked to a chat channel.

Create a function that accepts a [`ChannelLinkListenerInvocation`](https://atomist.github.io/sdm/interfaces/_lib_api_listener_channellinklistenerinvocation_.channellinklistenerinvocation.html). In addition to the standard [`SdmContext`][apidoc-sdmcontext],
this invocation has [`project`](project.md) and `newlyLinkedChannelName`. There is also a handy
method to send messages: `addressNewlyLinkedChannel`.

Pass this function to [`sdm.addChannelLinkListener`](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#addchannellinklistener).

### User Joined Channel

*(team mode only)* When a user joins a channel that is linked to at least one repository,
your SDM can respond to it.

Create a function that accepts a [`UserJoiningChannelListenerInvocation`](https://atomist.github.io/sdm/interfaces/_lib_api_listener_userjoiningchannellistener_.userjoiningchannellistenerinvocation.html). In addition to an [`SdmContext`][apidoc-sdmcontext],
this invocation has `joinEvent`, which contains [data](https://github.com/atomist/sdm/blob/master/lib/graphql/subscription/OnUserJoiningChannel.graphql)
 about the user and channel,
 and `repos`, an array of identifiers for all the linked repositories.

[apidoc-sdmcontext]: https://atomist.github.io/sdm/interfaces/_lib_api_context_sdmcontext_.sdmcontext.html (API doc for SdmContext)

Pass this function to [`sdm.addUserJoiningChannelListener`](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#adduserjoiningchannellistener).

## Issues
Currently, these events fire for GitHub issues. They work with GitHub.com and GitHub Enterprise.

### New Issue

*(team mode only)* When a new issue is created, you might want to capitalize its title,
or complain if it doesn't have a description. You might want to add labels to it. This is a
good place to action some organizational policies.

Create a function that accepts a [`NewIssueListenerInvocation`](https://atomist.github.io/sdm/interfaces/_lib_api_listener_newissuelistener_.newissuelistenerinvocation.html). In addition to the standard [`RepoContext`][apidoc-repocontext],
this invocation has `issue`, with fields selected in [this GraphQL][issue-graphql].

[issue-graphql]: https://github.com/atomist/sdm/blob/master/lib/graphql/subscription/OnIssueAction.graphql (GraphQL for OnIssueAction)

Pass this function to [`sdm.addNewIssueListener`](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#addnewissuelistener).

### Issue Updated

*(team mode only)* When an issue changes, you might want to update some other system.

Create a function that accepts a [`UpdatedIssueListenerInvocation`](https://atomist.github.io/sdm/interfaces/_lib_api_listener_updatedissuelistener_.updatedissuelistenerinvocation.html). In addition to the standard [`RepoContext`][apidoc-repocontext],
this invocation has `issue`, with fields selected in [this GraphQL](https://github.com/atomist/sdm/blob/master/lib/graphql/subscription/OnIssueAction.graphql).

Pass this function to [`sdm.addUpdatedIssueListener`](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#addupdatedissuelistener).

### Issue Closed

*(team mode only)* When an issue closes, you might want to congratulate someone.

Create a function that accepts a [`ClosedIssueListenerInvocation`](https://atomist.github.io/sdm/interfaces/_lib_api_listener_closedissuelistener_.closedissuelistenerinvocation.html). In addition to the standard [`RepoContext`][apidoc-repocontext],
this invocation has `issue`, with fields selected in [this GraphQL](https://github.com/atomist/sdm/blob/master/lib/graphql/subscription/OnIssueAction.graphql).

Pass this function to [`sdm.addClosedIssueListener`](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#addclosedissuelistener).

## Fingerprint Difference

*(team mode only)* When a [fingerprint](fingerprint.md) is added to a push, and that fingerprint
differs in value from the same fingerprint before the push, this listener gets to respond.

Create a function that accepts a [`FingerprintDifferenceListenerInvocation`](https://atomist.github.io/sdm/interfaces/_lib_api_listener_fingerprintdifferencelistener_.fingerprintdifferencelistenerinvocation.html). In addition to the standard [`RepoContext`][apidoc-repocontext],
this invocation has `diffs`, an array of [FingerprintDifference](https://atomist.github.io/sdm/interfaces/_lib_api_listener_fingerprintdifferencelistener_.fingerprintdifference.html) objects containing the old and new value of each changed fingerprint.

Pass this function to [`sdm.addFingerprintDifferenceListener`](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#addfingerprintdifferencelistener).

## Startup

*(team mode only)* When your SDM has completed startup, these listeners are called.
This is handy for sending notifications to logging systems or to chat.

Create a function that accepts a [`StartupListenerInvocation`](https://atomist.github.io/sdm/modules/_lib_api_listener_startuplistener_.html#startuplistener).
This is different from most of the listener invocations. It is an [AdminCommunicationContext]
[apidoc-admincommunicationcontext], which has an `addressAdmin` method and the `sdm` itself as a property.

[apidoc-admincommunicationcontext]: https://atomist.github.io/sdm/interfaces/_lib_api_context_admincommunicationcontext_.admincommunicationcontext.html (API doc for AdminCommunicationContext)

Pass this function to [`sdm.addStartupListener`](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#addstartuplistener).

## Tag

*(team mode only)* When a tag is added to a repository, you have the opportunity to respond.

Create a function that accepts a [`TagListenerInvocation`](https://atomist.github.io/sdm/interfaces/_lib_api_listener_taglistener_.taglistenerinvocation.html). In addition to the standard [`RepoContext`][apidoc-repocontext],
this invocation has a [`tag`](https://atomist.github.io/sdm/modules/_lib_typings_types_.ontag.html#tag-1)

Pass this function to [`sdm.addTagListener`](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#addtaglistener).

## Triggered

This one is different: you can make a listener that is invoked at time intervals while your SDM is running.

Create a function that accepts a [`TriggeredListenerInvocation`](https://atomist.github.io/sdm/modules/_lib_api_listener_triggeredlistener_.html#triggeredlistener).
It is an [AdminCommunicationContext][apidoc-admincommunicationcontext], which has an `addressAdmin`
method and the `sdm` itself as a property.

Include this in a [`TriggeredListenerRegistration`](https://atomist.github.io/sdm/interfaces/_lib_api_registration_triggeredlistenerregistration_.triggeredlistenerregistration.html), along with a `trigger` which contains either a `cron` expression
or an `interval` in milliseconds.

Pass the registration to [`sdm.addTriggeredListener`](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachine_.softwaredeliverymachine.html#addtriggeredlistener).
