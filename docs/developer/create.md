# Create Projects

Automated project creation saves time and ensures that you start new services, 
libraries and other projects with good solid code that meets your standards
and includes the components you need, configured the way you like them.

In Atomist, you automate project creation using a generator, a type of command. 
Generators typically copy their code from a known-good repository called a seed,
and then modify the code in certain ways, such as renaming classes so that it's
ready to use without lots of manual find and replace. Generators frequently also
configure supporting systems, for example, by creating a dedicated
Slack channel, setting up issue tracking, and so on.

The following table contains a list of actions that generators commonly perform 
with pointers to their implementations. 

| Action | Example Code |
| ------ | ------------ |
| Create a GitHub repository | [with `generate`](https://github.com/atomist/initializr-atomist/blob/55b587a4222349352f74d4b022e8e58a568d429e/src/commands/generator/initializr/RepoCreator.ts#L33) |
|  Base it on a seed repository | [hard code its name if you like](https://github.com/atomist/automation-client-samples-ts/blob/7c1a7267ff0881935f4682784a9ce5e403b1b7ff/src/commands/generator/NewAutomation.ts#L39) |
|  Adjust the code for the new service | [with an editing function](https://github.com/atomist/automation-client-samples-ts/blob/7c1a7267ff0881935f4682784a9ce5e403b1b7ff/src/commands/generator/NewAutomation.ts#L47) |
|  Change code in other repositories, to set up logging or deployment | [with `editOne`](https://github.com/atomist/automation-client-samples-ts/blob/7c1a7267ff0881935f4682784a9ce5e403b1b7ff/src/commands/editor/AddContributing.ts#L38) |
|  Configure the new repository with collaborators or labels | [like this one](https://github.com/atomist/initializr-atomist/blob/55b587a4222349352f74d4b022e8e58a568d429e/src/commands/generator/initializr/RepoCreator.ts#L46) |
|  Activate a build on your CI | _coming soon_ |
|  Call out to your deployment system or other tools | [with http](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/simple/HelloHttp.ts)|

Atomist gives you a convenient client to run your generator, and hooks up to Slack. You could
add a custom form to serve project creation to your team or organization.

One handy generator is the [new automation generator,](https://github.com/atomist/automation-client-samples-ts/blob/master/src/commands/generator/NewAutomation.ts)
which creates an automation project based on the Atomist samples repository. Run the automation and 
then say `@atomist new automation` in Slack to invoke it.

Then modify that same generator to make the projects you want to see!

<!--

Other links that might be useful: [this code](https://github.com/atomist/initializr-atomist/blob/master/src/web/initializerHandoff.ts)
makes a custom form somehow, in our spring initializr automation.
(I don't know exactly how)

Change code could link to [project editors](https://github.com/atomist/automation-client-ts/blob/master/docs/ProjectEditors.md)

-->
