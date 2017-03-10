Now it's time to create your own project generator. Atomist generators take an existing, working project and convert them into the baseline for further projects, optionally editing parts of the baseline project where customization is needed.

!!! note ""
    Unlike other project creation approaches, such as templating, Atomist generators don't break your project as they only add files in the `.atomist` directory and leave your project's code as-is. For this reason _any working project can be an Atomist generator_.

For the simplest case to create a new generator of our own we will need to:

- Take an existing project and convert it to being a Rug archive with a default generator that simply copies over the baseline project's files into a new project.
- Publish your new generator so that it can be invoked by your team only.

### Make an Existing Project a Generator

First make sure you have already [installed the latest Rug CLI][cli-install]
for your platform. You'll need the [Rug CLI][rug-cli] to publish your new rug archive.

[rug-cli]: /user-guide/interfaces/cli/index.md
[cli-install]: /user-guide/interfaces/cli/install.md

As you are going to use the Bot to convert your existing project into being a generator you also need to make sure that your baseline project is already in GitHub in its own repository and the repository is connected to a channel in Slack that Atomist has been invited to.

!!! note ""
    We'll be converting an existing .NET project to becoming a generator but _any_ existing project can be converted using this approach.

Now navigate to the channel associated with the project you're going to convert to being a generator and execute:

```
@atomist editors convert
```

This will produce a list of editors that include the search term `convert` somewhere in their description.

<div class="ss-container">
  <img src="../images/convert-project-editors.png" alt="Convert Editors" class="ss-small">
</div>

The editor we want is `ConvertExistingProjectToGenerator`. Click on the `Edit Project` button next to that editor to start a new thread to apply this editor to the channel's associated project.

<div class="ss-container">
  <img src="../images/convert-project-thread-started.png" alt="Convert project to generator thread started" class="ss-small">
</div>

Respond to each of the editor's questions and the submit the editor:

<div class="ss-container">
  <img src="../images/ready-to-submit-editor-parameters.png" alt="Convert project parameters ready to be submitted" class="ss-small">
</div>

Click on `Edit project` to execute the edit and a new commit will be created on a new branch on the project that is being converted to being a generator:

<div class="ss-container">
  <img src="../images/editor-successfully-commits.png" alt="Successful commits reported for the editor" class="ss-small">
</div>

Click on the link for the new commit and you will see that there is a new PR raised for the branch:

<div class="ss-container">
  <img src="../images/convert-to-generator-pr-result.png" alt="PR associated with the result of the editor" class="ss-small">
</div>

Merge the new PR into your project:

<div class="ss-container">
  <img src="../images/merge-convert-pull-request.png" alt="Merge the editor's PR into your project" class="ss-small">
</div>

Now update your local copy of the project and you should see that the `.atomist` directory has been added. Atomist keeps all of its files in the `.atomist` directory so that there should be no conflicts with your project's files.

 Execute `rug test` in your project's directory to ensure that everything is working for your new Rug generator project:

```console
$ rug test
Resolving dependencies for yourorg:dotnetgettingstarted:0.1.0 ← local completed
Invoking TypeScript Compiler on ts script sources
  Created .atomist/editors/NewDotNetASPCoreProject.js
  Created .atomist/editors/NewDotNetASPCoreProject.js.map
Processing script sources completed
Loading yourorg:dotnetgettingstarted:0.1.0 ← local into runtime completed
Executing scenario NewDotNetASPCoreProject should create a new project based on this archive...
  Testing assertion fileExists(SimpleLiteral(.gitignore))
  Testing assertion fileExists(SimpleLiteral(Program.cs))
  Testing assertion fileExists(SimpleLiteral(README.md))
  Testing assertion fileExists(SimpleLiteral(Startup.cs))
  Testing assertion fileExists(SimpleLiteral(project.json))
Running test scenarios in yourorg:dotnetgettingstarted:0.1.0 ← local completed

Successfully executed 1 of 1 scenarios: Test SUCCESS
```

To see what's been added, use the Rug CLI by executing `rug shell -l` and then `describe archive` to see the contents of your new Rug archive:

```console
rug → describe archive
Restoring yourorg:dotnetgettingstarted:0.1.0 ← local into runtime completed

yourorg:dotnetgettingstarted:0.1.0

→ Origin
  git@github.com:yourorg/dotnetgettingstarted.git#master (79e34ae)
→ Archive
  ~/workspace/dotnetgettingstarted/ (761 kb in 126 files)

→ Generators
  NewDotNetASPCoreProject
    Sample TypeScript generator used by AddNewDotNetASPCoreProject

→ Requires
  [0.12.0,1.0.0)

To get more information on any of the Rugs listed above, run:
  describe editor|generator|executor|reviewer ARTIFACT
yourorg:dotnetgettingstarted:0.1.0 ← local
```

Congratulations, you now have a new generator. It's usually a good idea at this point to give things a test run and so run the generator in the `rug shell` using the `generate` command, for example:

```console
rug → generate NewDotNetASPCoreProject newdotnetservice -C ../
```

The `-C` changes the directory to above where you're running the shell for the output of the generator. Go now and check out the output and make sure it is still a working project. You should now be able to change directory to where you generated your new project and be able to test and run it as usual.

With the new generator created, now it's time to publish it so you can list and execute it using the Atomist Bot from your team's Slack.

### Publishing Your New Project Generator

Similar to how you published your handlers project previously, this time you're going to publish your new generator Rug archive. Execute the `rug publish` command from inside your generator's project directory:

```console
$ rug publish
Resolving dependencies for yourorg:dotnetgettingstarted:0.1.0 ← local completed
Invoking TypeScript Compiler on ts script sources
  Created .atomist/editors/NewDotNetASPCoreProject.js.map
  Created .atomist/editors/NewDotNetASPCoreProject.js
Processing script sources completed
Loading yourorg:dotnetgettingstarted:0.1.0 ← local into runtime completed
  Created META-INF/maven/yourorg/dotnetgettingstarted/pom.xml
  Created .atomist/manifest.yml
  Created .atomist/metadata.json
Generating archive metadata completed
  Uploading yourorg/dotnetgettingstarted/0.1.0/dotnetgettingstarted-0.1.0.zip → t3v0s7ss2 (155 kb) succeeded
  Uploading yourorg/dotnetgettingstarted/0.1.0/dotnetgettingstarted-0.1.0.pom → t3v0s7ss2 (659 bytes) succeeded
  Uploading yourorg/dotnetgettingstarted/0.1.0/dotnetgettingstarted-0.1.0-metadata.json → t3v0s7ss2 (897 bytes) succeeded
  Downloading yourorg/dotnetgettingstarted/maven-metadata.xml ← t3v0s7ss2 (394 bytes) succeeded
  Uploading yourorg/dotnetgettingstarted/maven-metadata.xml → t3v0s7ss2 (346 bytes) succeeded
Publishing archive into remote repository completed

→ Archive
  ~/workspace/dotnetgettingstarted/.atomist/target/dotnetgettingstarted-0.1.0.zip (155 kb in 128 files)

→ URL
  https://atomist.jfrog.io/atomist/T3V0S7SS2/yourorg/dotnetgettingstarted/0.1.0/dotnetgettingstarted-0.1.0.zip
```

With your new generator's rug archive published it's now time to switch over to your team's Slack again. Before you can see your new generator you will need to ask the Atomist Bot to refresh the rugs it is aware of by executing `@atomist refresh rugs`:

<div class="ss-container">
  <img src="../images/refreshing-rugs.png" alt="Refreshing the Rugs that Atomist is aware of" class="ss-small">
</div>

!!! note ""
    You don't always have to explicitly ask the Atomist Bot to refresh its rugs as it does this automatically every few minutes. Here you are manually triggering the refresh just to be sure that you can see your new generator.

Now you can list the generators using `@atomist generators <your search term>` and you should see your new generator in the list for your team:

<div class="ss-container">
  <img src="../images/new-generator-project-in-slack.png" alt="Your new generator all set to go in your team's Slack" class="ss-small">
</div>

You've now converted a working project of your own to a new project generator to be used within Atomist! Go ahead and click the `Generate project` button in your team's Slack and you can create a whole new project quickly and easily.
