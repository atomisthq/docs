To make new or modified Rug scripts in your Rug project available
in your team, you will need to publish the Rug project.

!!! tip ""
    Completing the [Getting Started][getting-started] steps, [Rug CLI setup][cli-setup], and having a
    [Rug project][create-rug] to publish are prerequisites for this tutorial.

[getting-started]: /getting-started
[cli-setup]: /tutorials/cli-quick-setup
[create-rug]: /tutorials/create-rug-project

### Install npm Dependencies for the Rug project

The Rug project contains npm module dependencies that need to be installed
before we publish. From within your Rug project directory:

```console
$ cd .atomist
$ npm install
/atomist-tutorials/.atomist
└─┬ @atomist/rugs@0.24.3
  ├── @atomist/cortex@0.31.0
  ├── @atomist/rug@0.25.1
  └── mustache@2.3.0

npm WARN .atomist No description
npm WARN .atomist No repository field.
npm WARN .atomist No license field.
```

Your output may vary, for example, if you have already installed npm module
dependencies in this Rug project.

### Identify Slack Team ID for Publishing

Since you may be in multiple Slack teams that have the Atomist Bot installed (for
example, atomist-community public Slack team and your own Slack team), you will need
to tell the Rug CLI which team to publish this Rug project to.

You can find the team ID from within your Slack team. Send this message in `#general` or
any channel that the Atomist Bot has been invited to.

```
@atomist team
```

<div class="ss-container">
  <img src="../images/atomist-team.png" alt="List of project generators" class="ss-medium">
</div>

The `sfz` Slack team ID is `T489LV5QF`. Look for your team Slack ID and pass it into
the `rug publish` command like this.

```console
$ rug publish -i <YOUR_TEAM_ID>
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
