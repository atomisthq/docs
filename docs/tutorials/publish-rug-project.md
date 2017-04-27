To make new or modified Rug scripts in your Rug project available
in your Slack team, you will need to publish the Rug project.

!!! missing "Prerequisites"
    Completing the [Getting Started Guide][getting-started]
    and the [Rug CLI setup][cli-setup],
    [Rug project creation][create-rug], and [TypeScript setup][ts]
    tutorials are prerequisites for this tutorial.

[getting-started]: /getting-started/index.md
[cli-setup]: setup-cli.md
[create-rug]: create-rug-project.md
[ts]: setup-typescript.md

## Install Dependencies

The Rug project contains [NPM][npm] module dependencies that need to
be installed before we publish.  Run the following commands from
within your Rug project directory.

```console
$ cd .atomist
$ yarn
```

The `yarn` command will install all the needed dependencies.

[npm]: https://www.npmjs.com/ (NPM Modules)

Since you may be in multiple Slack teams that have the Atomist Bot installed (for
example, the [atomist-community][atomc] public Slack team and your own Slack team), you will need
to tell the Rug CLI which team to publish this Rug project to.

You can find the team ID from within your Slack team. Send this
message in `#general` or any channel that the Atomist Bot has been
invited to.

[atomc]: https://atomist-community.slack.com

```
@atomist team
```

<div class="ss-container">
  <img src="../images/atomist-team.png" alt="List of project generators" class="ss-medium">
</div>

In this example, the Slack team ID is "T489LV5QF".

## Publish

Now that you know your Slack team ID, you can publish your Rug project
archive.  Pass the lower-cased version of your Slack team ID to the
`rug publish` command like this.

```console
$ rug publish --id=t489lv5qf
Resolving dependencies for atomist-contrib:atomist-tutorials (0.1.0·local) completed
Invoking compilers on project sources completed
Loading atomist-contrib:atomist-tutorials (0.1.0·local) completed
Generating archive metadata completed
Publishing archive into remote repository completed

→ Archive
  ~/github/jrday/atomist-tutorials/.atomist/target/atomist-tutorials-0.1.0.zip (360 kb in 338 files)

→ URL
  https://atomist.jfrog.io/atomist/T489LV5QF/atomist-contrib/atomist-tutorials/0.1.0/atomist-tutorials-0.1.0.zip

Successfully published archive for atomist-contrib:atomist-tutorials (0.1.0)
```

You have successfully published a Rug project archive!


