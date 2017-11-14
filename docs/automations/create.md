# Create Projects

When it's time to something new, get a good start by seeding some solid code and 
automating spinup.

What does it take to get a new service or library rolling in your environment?

Atomist doesn't tell you how to work; it makes it easier for you to make the automation tools
that make your work faster and more consistent. Save everyone in your organization some headaches,
and start them coding up to your standards.

We call these automations generators. You can do things like:

| Thing to do | example |
| ----------- | ------- |
| Create a GitHub repository | [with `generate`](https://github.com/atomist/initializr-atomist/blob/55b587a4222349352f74d4b022e8e58a568d429e/src/commands/generator/initializr/RepoCreator.ts#L33) |
|  Base it on a seed repository, which exemplifies a good new project | [hard code its name if you like](https://github.com/atomist/automation-client-samples-ts/blob/7c1a7267ff0881935f4682784a9ce5e403b1b7ff/src/commands/generator/NewAutomation.ts#L39) |
|  Adjust that code for the new service | [with an editing function](https://github.com/atomist/automation-client-samples-ts/blob/7c1a7267ff0881935f4682784a9ce5e403b1b7ff/src/commands/generator/NewAutomation.ts#L47) |
|  Change code in other repositories, to set up logging or deployment | [with `editOne`](https://github.com/atomist/automation-client-samples-ts/blob/7c1a7267ff0881935f4682784a9ce5e403b1b7ff/src/commands/editor/AddContributing.ts#L38) |
|  Configure the new repository with collaborators or labels | [like this one](https://github.com/atomist/initializr-atomist/blob/55b587a4222349352f74d4b022e8e58a568d429e/src/commands/generator/initializr/RepoCreator.ts#L46) |
|  Activate a build on your CI | example pending |
|  Call out to your deployment system or other tools | [with http](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/simple/HelloHttp.ts)|

all in one automation.

Atomist gives you a convenient client to run this, and hooks up to Slack. If you want,
add a custom form, and serve project creation to your team or organization.

You can use [our generator](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/generator/NewAutomation.ts)
 to create a project based on our samples repository. Say `@atomist new automation` in Slack.
Then modify that same generator to make the projects you want to see!

<!--

Other links that might be useful: [this code](https://github.com/atomist/initializr-atomist/blob/master/src/web/initializerHandoff.ts)
makes a custom form somehow, in our spring initializr automation.
(I don't know exactly how)

Change code could link to [project editors](https://github.com/atomist/automation-client-ts/blob/master/docs/ProjectEditors.md)

-->