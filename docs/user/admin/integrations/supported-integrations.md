Atomist isn't designed to replace your CI service; rather, the goal of the SDM is to enhance all of your existing pipelines and policies through additional automation. It does so by receives and reacting to events from many systems,
including version control, CI systems, Slack, and more.

Atomist comes with plugins that make use of the native integration technology for each platform or
tool.  For example, to integrate with GitHub and Travis CI, Atomist
uses webhooks; to integrate with Slack, it uses their event API.  For each platform Atomist integrates with, it
requests the minimal set of permissions required.

Below is a list of tools that Atomist natively supports, but if you use a system or tool Atomist doesn't have a pre-existing plugin for,  you can still build your own integrations by following [our developer guide](/developer/). You can use whatever tools and
libraries you want to communicate with your systems, and then register
these custom event types with Atomist so it can properly connect them
with other events.

## Chat Integrations

Send messages to channels and people, receive commands, query people for command parameters, update messages, and include buttons on messages.

* Slack
* MS Teams (experimental)

## Version Control Integrations

Atomist receives events for Pushes and Pull Requests (PRs). The built-in integrations
include action buttons to create and merge PRs and add labels, reviewers, and comments to PRs.

* GitHub
* GitHub Enterprise
* BitBucket
* BitBucket Cloud
* GitLab

## Issue Tracking Integrations

Atomist receives events for issue and issue comment creation and update.

* GitHub Issues

## CI Integrations

One of the tools you are most likely to integrate is Continuous Integration (CI). Atomist can receive build notifications from:

* Jenkins
* Travis CI
* TeamCity
* Circle CI
* any other build system, as a POST to our webhook

Integrating a custom CI tool with Atomist is simple. Simply invoke Atomist
hooks to send events around build and artifact creation.

If integrating CI tools, we recommend the following:

- CI tools are great for building and generating artifacts. They are
  often abused as a PaaS for `bash`. If you find your CI usage has
  you programming in `bash` or YML, consider whether invoking such
  operations from Atomist event handlers might be a better model.
- Use Atomist generators to create your CI files, and Atomist
  editors to keep them in synch, minimizing inconsistency.

## Running other programs from Atomist

In response to events, you can trigger actions on other systems from your Atomist automations.
Some of the ones we've already implemented include:

* [Checkstyle](/pack/checkstyle/)
* TSLint
* [Sonarqube](/pack/sonarqube/)

You can find a full list of the packages we support and maintain [in our GitHub org](https://github.com/atomist?utf8=%E2%9C%93&q=sdm-pack-&type=&language=).

If your tool doesn't have a Node API, that's no problem. As long as it's an executable, you can invoke it via Node's [`spawn`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) method, as Node excels at working with child processes.
