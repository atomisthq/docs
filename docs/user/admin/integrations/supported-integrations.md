# Integrating into Existing Tools

The goal of the SDM is to enhance all of your existing pipelines and policies
through additional automation. It does so by receiving and reacting to events
from many systems, including version control, CI systems, Slack, and more.

Atomist comes with plugins that make use of the native integration technology
for each platform or tool. For example, to integrate with GitHub and Travis CI,
Atomist uses webhooks; to integrate with Slack, it uses their event API. For
each platform Atomist integrates with, it requests the minimal set of
permissions required.

Below is a list of tools that Atomist natively supports, but if you use a system
or tool Atomist doesn't have a pre-existing plugin for, you can still build your
own integrations by following [our developer guide](/developer/). You can use
whatever tools and libraries you want to communicate with your systems, and then
register these custom event types with Atomist so it can properly connect them
with other events.

## Chat Integrations

Send messages to channels and people, receive commands, query people for command
parameters, update messages, and include buttons on messages.

-   Slack
-   MS Teams (experimental)

## Version Control Integrations

Atomist receives events for Pushes and Pull Requests (PRs). The built-in
integrations include action buttons to create and merge PRs and add labels,
reviewers, and comments to PRs.

-   GitHub
-   GitHub Enterprise
-   BitBucket
-   BitBucket Cloud
-   GitLab

## Issue Tracking Integrations

Atomist receives events for issue and issue comment creation and update.

-   GitHub Issues

## CI Integrations

One of the tools you are most likely to integrate is Continuous Integration
(CI). Atomist can receive build notifications from:

-   Jenkins
-   Travis CI
-   TeamCity
-   Circle CI
-   any other build system, as a POST to our webhook

You can integrate Atomist with a custom CI tool by invoking Atomist hooks to
send events around build and artifact creation.

!!! Note
    CI tools are great for building and generating artifacts, but they're
    often abused as a PaaS for `bash`. If you find your CI usage has you programming
    in `bash` or YML, consider whether invoking such operations from Atomist event
    handlers might be a better model.

You can also use Atomist generators to create pre-defined CI files, and Atomist
editors to keep them in synch, minimizing inconsistency across all your
repositories.

## Running other programs from Atomist

In response to events, you can trigger actions on other systems from your
Atomist automations. Using
[Node's support for running external programs](https://nodejs.org/api/child_process.html),
you can run any program you want.
