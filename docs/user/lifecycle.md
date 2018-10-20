Chat notifications about pushes, builds, pull requests, issues, and issue comments are
fewer and far more useful when they're correlated by Atomist. You get one message per push, and 
that message updates as new information comes in. Less spam in your channels! Even better, 
the messages have buttons that make them useful.

## Messages

### Push 

A code push is the most recognized event in the delivery process.
Atomist correlates all of this into a dynamic, updating push notification:

*  Commit summaries, grouped by author
*  GitHub statuses
*  Build results
*  SDM Goals, with approval buttons
*  Tags
*  Deployments
*  Buttons: Raise PR for branches, Restart Build when it failed

Here's a sample push notification with SDM goals:

<img alt="animated push notification" src="../img/push-notification.gif" height="385" width="315" >

### Pull Request

{!tbd.md!}

### Build

Build status is included on the push notification.
If a build fails, the person who made the commit gets a private message with a link to the log.

### Issue

{!tbd.md!}

### Issue Comment

{!tbd.md!}

## Linked Channels

{!tbd.md!}

## Configuring messages

{!tbd.md!}