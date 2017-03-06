Right! You've seen some of the automation between issues, commits, builds that we provide out-of-the-box and now it's time to automate some of your own development workflow and actions. We're going to:

- Develop and publish a new Atomist `handler` to listen to and take some action when issues are closed.
- Convert an existing project of your own to be a new Atomist `generator` that can be used by the Bot to generate new projects.

## Develop and Publish a new Atomist `handler`

Atomist uses `handlers` to listen to changes in your projects and then to execute a plan of action. The handler will be triggered by a certain type of activity that Atomist can detect, in this example you will notify the team when an issue labeled 'bug' gets fixed.

### Create a Rug Handlers Project

The first thing you need is a project for your code. Although you can add Atomist Rug code to any existing project by simply adding a `.atomist` directory along with a few support files in this case we'll create and publish a new project for your first Atomist Rug development automation.

Ask the Bot to list out the project generator that you need by typing `@atomist generator rug` and select the `NewHandlersProject` generator:

<div class="ss-container">
  <img src="../images/new-rug-handlers-project-button.png" alt="NewHandlersProject generator" class="ss-small">
</div>

Click on the `Create project` button and enter the following information to create your new project:

<div class="ss-container">
  <img src="../images/create-handlers-project-flow.png" alt="Creating the handlers project" class="ss-small">
</div>

Once done you can click on `Generate project` in the project generation summary:

<div class="ss-container">
  <img src="../images/create-handlers-project-summary.png" alt="New handlers project summary" class="ss-small">
</div>

Then `@atomist` will create the new project in your GitHub organization:

<div class="ss-container">
  <img src="../images/new-handlers-project-created.png" alt="New handlers project created message" class="ss-small">
</div>

Also `@atomist` will have created a new `#handlers` channel in Slack that's tied to that project that shows some initial setup commits made by the project generator:

<div class="ss-container">
  <img src="../images/handlers-slack-channel-created.png" alt="Handlers slack channel initialised" class="ss-small">
</div>

Clone the new handlers project locally and, because we're using TypeScript, change directory into the `.atomist` directory of the local handlers project and enter `npm install` to get the TypeScript library dependencies installed:

!!! note ""
    To develop your rugs in TypeScript you will need [`node.js` and `npm`](https://nodejs.org) installed locally.

```console
$ npm install
/.../handlers/.atomist
├─┬ @atomist/github@0.2.0
│ └── @atomist/rug@0.10.0
├── @atomist/rug@0.12.0
└─┬ @atomist/travis@0.6.1
  └── @atomist/rug@0.10.0
```

Now it's time to write your new handler.

### Writing Your Handler

The handlers project you just generated contains a number of pre-existing handlers that you can take inspiration from. For our purposes we only want one new handler and the closest example in the handlers project is `.atomist/handlers/IssueHandler.ts`.

The generated handlers project contains a whole host of sample handlers and executors, including all the default handlers that you've seen in action already. You need to keep those handlers in this project as when you publish this Rug archive you will effectively override the default handlers, and we don't want to lose that functionality we've already seen.

In a new `.atomist/handlers/CloseIssueThanks.ts` file enter the following handler code:

```typescript
import {Atomist} from '@atomist/rug/operations/Handler'
import {TreeNode} from '@atomist/rug/tree/PathExpression'
declare var atomist: Atomist

atomist.on<TreeNode, TreeNode>("/Issue()/belongsTo::Repo()/channel::ChatChannel()", m => {
   let issue = m.root() as any

   if (issue.state() != "closed") {
     return
   }

   atomist.messageBuilder()
    .say("Thanks for closing this issue on " +
         issue.belongsTo().name())
    .on(issue.belongsTo().channel().id()).send()
})
```

Now it's time to publish and test your new handler.

!!! note ""
    At the moment you can't test handlers locally and instead you need to publish and test your handler is invoked from it's results in Atomist.

### Publish Your Handler

To make Atomist aware of your new handler you need to publish the handler project. This is often done via continuous integration but for our purposes here you're going to see how it's done manually using the [Rug CLI][rug-cli].

[rug-cli]: /user-guide/interfaces/cli/index.md

#### Install and Configure the Rug CLI

Firstly make sure you've [installed the latest Rug CLI][cli-install]
for your platform.  To publish new Rugs you need to
configure the Rug CLI with the credentials it needs to push
your rugs to Atomists.  To see this problem you can try to run the
command `rug repositories configure` and you should see:

[cli-install]: /user-guide/interfaces/cli/install.md

```console
$ rug repositories configure

No token configured. Please run repositories login before running this command.

Run the following command for usage help:
  rug repositories configure --help
```

To configure the Rug CLI you need to execute the `rug repositories login` command providing your GitHub credentials:

```console
$ rug repositories login


The Rug CLI needs your GitHub login to identify you.

The command will create a GitHub Personal Access Token with scope 'read:org'
which you can revoke any time on https://github.com/settings/tokens.  Your
password will not be displayed or stored. Your sensitive information will not
be sent to Atomist; only to api.github.com.

  → Username : .....
  → Password : .....

  Please provide a MFA code
  → MFA code : .....

Successfully logged in to GitHub and stored token in ~/.atomist/cli.yml

```

!!! note ""
    No passwords are stored, only a unique personal access token with org/read scope. Also if you are using 2 Factor Authentication with GitHub you will be prompted for the `MFA code` as shown above.

Now when you execute `rug repositories configure` you should see the Rug CLI configured with your team's unique repository:

```console
$ rug repositories configure

→ Repositories
  <unique identifier of your team's repository>
    <your unique team's repository url here>
```

You're now all set to publish your handlers project.

#### Publishing

The Rug CLI has the `publish` command to publish a Rug archive from your local copy. Execute the `rug publish` command from inside your handlers project directory:

```console
$ rug publish
Resolving dependencies for :handlers:0.1.0 ← local completed
Invoking TypeScript Compiler on ts script sources
  Created .atomist/handlers/CloseIssueThanksHandler.js.map
  Created .atomist/handlers/CloseIssueThanksHandler.js
Processing script sources completed
Loading org:handlers:0.1.0 ← local into runtime completed
  Created META-INF/maven/yourorg/handlers/pom.xml
  Created .atomist/manifest.yml
  Created .atomist/metadata.json
Generating archive metadata completed
  Uploading yourorg/handlers/0.1.0/handlers-0.1.0.zip → t3v0s7ss2 (186 kb) succeeded
  Uploading yourorg/handlers/0.1.0/handlers-0.1.0.pom → t3v0s7ss2 (927 bytes) succeeded
  Uploading yourorg/handlers/0.1.0/handlers-0.1.0-metadata.json → t3v0s7ss2 (762 bytes) succeeded
  Downloading yourorg/handlers/maven-metadata.xml ← t3v0s7ss2 (382 bytes) succeeded
  Uploading yourorg/handlers/maven-metadata.xml → t3v0s7ss2 (334 bytes) succeeded
Publishing archive into remote repository completed

→ Archive
  ~/code/src/github.com/yourorg/handlers/.atomist/target/handlers-0.1.0.zip (186 kb in 165 files)

→ URL
  https://atomist.jfrog.io/atomist/T3V0S7SS2/yourorg/handlers/0.1.0/handlers-0.1.0.zip

Successfully published archive for yourorg:handlers:0.1.0
```

Your new handlers rugs are now ready for action in your Atomist environment. To test that everything has published correctly you can execute `rug search` and you should see your Rug archive listed just for you:

```console
$ rug search
Searching https://api.atomist.com/catalog
Searching catalogs completed

→ Remote Archives (38 archives found)
yourorg:handlers [private] (0.1.0)
...
```

### Your Handler in Action

Now you can give your new `CloseIssueThanksHandler` handler a spin! Head back to the `#sprocket` channel and you should see a button to `Close` the issue we created earlier:

<div class="ss-container">
  <img src="../images/close-button-on-issue.png" alt="Issue ready to be closed" class="ss-small">
</div>

Click on `Close` (you could also close the issue in GitHub if you prefer) and several things will happen. Firstly `@atomist` will indicate with a message that the issue has been edited...

<div class="ss-container">
  <img src="../images/close-issue-edited-response.png" alt="Issue edited response" class="ss-small">
</div>

... then the panel for the issue in Slack will be updated with a `Reopen` button ...

<div class="ss-container">
  <img src="../images/reopen-button-displayed.png" alt="Reopen issue displayed" class="ss-small">
</div>

... and finally your new handler will be invoked and the "thanks" message will be displayed!

<div class="ss-container">
  <img src="../images/new-handler-message-displayed.png" alt="New handler thank-you message displayed" class="ss-small">
</div>

There, you did it! You just created a new automation, and taught the Bot to listen for events and run that automation!

## Convert an Existing Project of Your Own to be a new Atomist `generator`

Now it's time to create your own project generator. Atomist generators take an existing, working project and convert them into the baseline for further projects, optionally editing parts of the baseline project where customisation is needed.

!!! note ""
    Unlike other project creation approaches, such as templating, Atomist generators don't break your project as they only add files in the `.atomist` directory and leave your project's code as-is. For this reason _any working project can be an Atomist generator_.

For the simplest case to create a new generator of our own we will need to:

- Take an existing project and convert it to being a Rug archive with a default generator that simply copies over the baseline project's files into a new project.
- Publish your new generator so that it can be invoked from your team only.

### Editing an Existing Project to make it a Generator

First make sure you have already [installed the latest Rug CLI][cli-install]
for your platform. You'll need the [Rug CLI][rug-cli] in order to publish your new rug archive.

[rug-cli]: /user-guide/interfaces/cli/index.md
[cli-install]: /user-guide/interfaces/cli/install.md

Also make sure you already have your baseline project set to be converted into being a project generator. This means you have the baseline project already in GitHub in its own repository and that repository is connected to a channel in Slack that Atomist has been invited to.

!!! note ""
    We'll be converting an existing .NET project to becoming a generator but _Any_ existing project can be converted using this approach.

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

Click on the new issue link and you will see that there is a new PR raised for the branch:

<div class="ss-container">
  <img src="../images/convert-to-generator-pr-result.png" alt="PR associated with the result of the editor" class="ss-small">
</div>

Merge the new PR into your project:

<div class="ss-container">
  <img src="../images/merge-convert-pull-request.png" alt="Merge the editor's PR into your project" class="ss-small">
</div>

Now update your local copy of the project and you should see that the `.atomist` directory has been added. Atomist keeps all of its files in the `.atomist` directory so that there should be no conflicts with your project's files.

 Execute `rug test` in your project's directory to ensure that everything is working for your new Rug generator project:

```
> rug test
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

```
rug → describe archive
Restoring yourorg:dotnetgettingstarted:0.1.0 ← local into runtime completed

yourorg:dotnetgettingstarted:0.1.0

→ Origin
  git@github.com:yourorg/dotnetgettingstarted.git#master (79e34ae)
→ Archive
  ~/code/src/github.com/yourorg/dotnetgettingstarted/ (761 kb in 126 files)

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

```
rug → generate NewDotNetASPCoreProject newdotnetservice -C ../
```

The `-C` changes the directory to above where you're running the shell for the output of the generator. Go now and check out the output and make sure it is still a working project. You should now be able to change directory to where you generated your new project and be able to test and run it as usual.

That's the new generator created, now it's time to publish it so you can list and execute it using `@atomist` from your team's slack.

### Publishing Your New Project Generator

Similar to how you published your handlers project previously, this time you're going to publish your new generator rug archive. Execute the `rug publish` command from inside your generator's project directory:

```
> rug publish
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
  ~/code/src/github.com/yourorg/dotnetgettingstarted/.atomist/target/dotnetgettingstarted-0.1.0.zip (155 kb in 128 files)

→ URL
  https://atomist.jfrog.io/atomist/T3V0S7SS2/yourorg/dotnetgettingstarted/0.1.0/dotnetgettingstarted-0.1.0.zip
```

With your new generator's rug archive published it's now time to switch over to your team's slack again. Before you can see your new generator you will need to ask `@atomist` to refresh the rugs it is aware of by executing `@atomist refresh rugs`:

<div class="ss-container">
  <img src="../images/refreshing-rugs.png" alt="Refreshing the Rugs that Atomist is aware of" class="ss-small">
</div>

Now you can list the generators using `@atomist generators` and you should see your new generator in the list for your team:

<div class="ss-container">
  <img src="../images/new-generator-project-in-slack.png" alt="Your new generator all set to go in your team's slack" class="ss-small">
</div>

You've now converted a working project of your own to a new project generator to be used within Atomist! Go ahead and click the `Generate project` button in your team's slack and you can create a whole new project quickly and easily.

## What Next

Congratulations, you've made it through the Atomist Getting Started
guide.  Now that you're up and running with Atomist, please be sure
to

-   Join the [Atomist Community Slack][slack]
-   Following our blog, [The Composition][composition]
-   Follow [@atomist][twitter] on Twitter

[slack]: https://join.atomist.com/
[composition]: https://the-composition.com/
[twitter]: https://twitter.com/atomist

If you want more detailed documentation on all aspects of Atomist,
just click Next at the bottom-right of this page to move into the
Atomist User Guide.
