# Atomist web interface

The Atomist web interface is located at [app.atomist.com](https://app.atomist.com). Here,
you can view and manage drift, see some notifications, run GraphQL queries against your data, and administer your
Atomist workspace.

Access the following pages from the symbols on the left navigation bar:

## Activity

![Activity icon](img/left-nav-activity.jpg)

This page shows a list of [Lifecycle Events](lifecycle.md). You can filter it by person or repository using the filter button. Click on a notification to see details, including useful buttons.

This page includes a list of Notifications on the right.

## GraphQL

Atomist constructs a graph of your organization's events, so that you can get the context you need to act on them. For instance, a push is linked to commits which link to people which link to chat users that you can DM. Issues are linked to commits that reference them.

![GraphQL Explorer icon](img/left-nav-graphql.jpg) Click this symbol to access the GraphQL explorer.

## Docs

![Documentation icon](img/left-nav-docs.jpg)

You're already here.

## Settings

![Settings icon](img/left-nav-settings.jpg)

[Administer](admin/settings.md) your Atomist workspace.
