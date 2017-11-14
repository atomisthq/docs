# Create Projects

When it's time to something new, get a good start by seeding some solid code and 
automating spinup.

What does it take to get a new service or library rolling in your environment?

Atomist doesn't tell you how to work; it makes it easier for you to make the automation tools
that make your work faster and more consistent. Save everyone in your organization some headaches,
and start them coding up to your standards.

We call these automations generators. You can do things like:

*  Create a GitHub repo
*  Base it on a seed repository, which exemplifies a good new project
*  Adjust that code for the new service
*  Change code in other repositories, to set up logging or deployment
*  Configure the new repository with collaborators or labels
*  Activate a build on your CI
*  Call out to your deployment system or other tools

all in one automation.

Atomist gives you a convenient client to run this, and hooks up to Slack. If you want,
add a custom form, and serve project creation to your team or organization.

You can use [our generator](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/generator/NewAutomation.ts)
 to create a project based on our samples repository. Say `@atomist new automation` in Slack.
Then modify that same generator to make the projects you want to see!

<!--

Other links that might be useful: [this code](https://github.com/atomist/initializr-atomist/blob/master/src/web/initializerHandoff.ts)
makes a custom form somehow, in our spring initializr automation.

Also in that project, [the generator](https://github.com/atomist/initializr-atomist/blob/master/src/commands/generator/initializr/RepoCreator.ts)
adds a GitHub collaborator.

Change code could link to [project editors](https://github.com/atomist/automation-client-ts/blob/master/docs/ProjectEditors.md)

"call out" could like to the [simple http command](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/simple/HelloHttp.ts)

-->