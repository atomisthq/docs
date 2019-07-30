An SDM is comprised of several components which help automate your tasks. Some of these components can be found as open source packages Atomist and its community have made available, but you may also need to build your own lifecycle. To do so, it's helpful to break down some of the key components that power an SDM.

## Events

To initiate an action, Atomist listens to [_events_](/developer/event/). Typically, these are actions that occur in your organization, such as an issue being opened, a repository being created, or code being pushed. These events can come from version control, an issue tracker, or CI. So long as a service can make an HTTP call to Atomist, external events are also actionable, such as those coming from deployments. However, actions can also be invoked via [_commands_](/developer/commands/). These can come from your chat integration, the Atomist web UI, or even a local terminal.

## Actions

The action to initiate depends on what you want to automate. This is the heart of the SDM. For example, you could run code analysis on your code to identify formatting issues, outdated packages, or incorrect open source licenses. You can also have the Atomist bot modify your repository (via a code transformation), or even just have the `master` branch deployed to your Kubernetes fleet.

## Goals

Actions can be categorized into [_goals_](/developer/goal/). For example, one goal might be to format your code, and another goal might be to deploy it. Goals should be considered as the smallest component of work that makes sense for the action you're trying to automate. That's because the strength of the SDM derives from the way in which goals are executed. Goals can be run as dependencies of each other, either in parallel or serial. As well, with [_push rules_](https://docs.atomist.com/developer/set-goals/#set-goals-on-push-with-push-rules) a goal can run only after certain conditions are met.

## Goal sets

Lastly, goals themselves can be grouped into [goal sets](/developer/set-goals/) to coordinate more than one action at a time. For example, goal sets run in parallel (by default), which allows you to speed up the execution of unrelated tasks. Goal sets can also run as dependencies of one another. This can be useful if, for example, you'd like to execute a `deploy` goal set only after a successful `build` goal set.
