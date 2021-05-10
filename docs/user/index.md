# Introduction

This page describes enrollment with Atomist as a service.

Atomist is here to help you smooth your development flow. In our web console,
you can see consolidated event notifications. Add ChatOps with Slack or MS Teams
if you have it. Spawn your own software delivery machine, and integrate with
other tools as you choose.

When you enroll in the Atomist service, you get visualizations of aspects of
your repository, and they update every time you push code. You can also use
built-in automations such as Lifecycle Messages (chat notifications on code
push, PR, issue etc with action buttons) and chat commands like "create issue".
And your own Software Delivery Machines will work on events and commands from
your whole organization.

Atomist brings together code from version control and people in chat. You can
write your own functions to respond to people in chat (with buttons, dialogs,
and other niceties), and to events like repository creation or code push. Send
information to people who need it by chat message or DM, and update code by
commit or pull request. Automate as much of your process as you choose, and keep
people informed for the rest.

You can also use a Software Delivery Machine (SDM) on your laptop, individually,
without enrolling in the service.

This page describes how to create an Atomist _workspace_. An Atomist workspace
connects your code, build, deployment, and runtime platforms into a single,
cohesive model of how your team provides value: delivering great solutions.

## Prerequisites

You must have a Git source code management account, either GitHub.com, GitHub
Enterprise (GHE), or BitBucket. If you want to use Atomist with GHE or
BitBucket, please <a class="contact"
href="mailto:support@atomist.com" title="Contact Atomist">contact Atomist</a>.
The remainder of these instructions assume you have a GitHub.com account. If you
do not already have a GitHub.com account, you can [create one][github-create].

For the whole shebang, it helps to have a GitHub organization and a
[Slack][slack] workspace. You can create these for free and have full admin
powers, if you want to experiment.

[github-create]: https://github.com/join "Join GitHub"
[slack]: https://slack.com/ "Slack"

## Hello Atomist

When you first sign up, you'll be asked to authenticate with GitHub. Once you've
authenticated, you'll create a new Atomist workspace. Associate a GitHub
organization with the Atomist workspace to start the Drift Report analysis.

For more information on how Atomist integrates with GitHub, see the [GitHub
integration][atomist-github] documentation.

The Atomist web interface will also show you events, e.g., new commits and issue
and pull request activity, from GitHub.

[www]: https://atomist.com/ "Atomist - How Teams Deliver Software"
[atomist-github]: github.md "Atomist and GitHub"

## Next steps

Now that you have an Atomist workspace, you can

-   Connect Atomist with your [Slack workspace][atomist-slack]
-   Configure the [built-in chat integration][configure-lifecycle]

You can also customize Atomist, molding it to _your_ team's delivery model. Make
Atomist respond to your own events and commands by creating your Software
Delivery Machine. See the [developer documentation][dev] to learn how to create
and run your own Software Delivery machine!

[atomist-slack]: slack.md "Atomist and Slack"
[dev]: ../developer/sdm.md "Atomist Developer Guide"
[configure-lifecycle]: ../user/lifecycle.md "Atomist Lifecycle Messages"
