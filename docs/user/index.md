Atomist is here to help you smooth your development flow.  Start with
our web console; see consolidated event notifications.  Add ChatOps
with Slack if you have it.  Spawn your own software delivery machine,
and integrate with other tools as you choose.

This page describes enrollment with Atomist as a service. When you
enroll in the Atomist service, you get built-in automations such as
Lifecycle Messages (Slack notifications on code push, PR, issue etc
with action buttons) and commands like "create issue". And your own
Software Delivery Machines will work on events and commands from your
whole organization.

You can also use a Software Delivery Machine (SDM) on your laptop,
individually, without enrolling in the service.  To get going with a
Local SDM, see the [quick start guide][quick-start].

This page describes how to create an Atomist _workspace_.  An Atomist
workspace connects your code, build, deployment, and runtime platforms
into a single, cohesive model of how your team provides value:
delivering great solutions.

[quick-start]: ../quick-start.md (Atomist Developer Quick Start)

## Prerequisites

You must have a Git source code management account, either GitHub.com,
GitHub Enterprise (GHE), or BitBucket.  If you want to use Atomist
with GHE or BitBucket, please <a class="contact"
href="mailto:support@atomist.com" title="Contact Atomist">contact
Atomist</a>.  The remainder of these instructions assume you have a
GitHub.com account.  If you do not already have a GitHub.com account,
you can [create one][github-create].

For the whole shebang, it helps to have a GitHub organization and a
[Slack][slack] workspace.  You can create these for free and have full
admin powers, if you want to experiment.

[github-create]: https://github.com/join (Join GitHub)
[slack]: https://slack.com/ (Slack)

## Hello Atomist

Follow the instructions in the sign up or trial invitation email you
received.

When you first sign up, you'll be asked to authenticate with GitHub.
Once you've authenticated, you'll create a new Atomist workspace.
Associate a GitHub organization with the Atomist
workspace to start getting events.  Atomist will ask your permission
to create the needed webhook(s).  For more information on how Atomist
integrates with GitHub, see the [GitHub integration][atomist-github]
documentation.

The Atomist web dashboard will show you events, e.g., new commits and
issue and pull request activity, from GitHub.

[www]: https://atomist.com/ (Atomist - How Teams Deliver Software)
[atomist-github]: github.md (Atomist and GitHub)

## Next steps

Now that you have an Atomist workspace, you can

-   Connect Atomist with your [Slack workspace][atomist-slack]
-   Connect Atomist with your [continuous integration][atomist-ci]
    solution
-   Connect Atomist with your [Kubernetes clusters][atomist-kube]
-   Configure the [built-in chat integration][configure-lifecycle]

You can also customize Atomist, molding it to _your_ team's delivery
model.  Make Atomist respond to your own events and commands by
creating your Software Delivery Machine.  See the [developer
documentation][dev] to learn how to create and run your own Software
Delivery machine!

[atomist-slack]: slack.md (Atomist and Slack)
[atomist-ci]: ci.md (Atomist and Continuous Integration)
[atomist-kube]: kubernetes.md (Atomist and Kubernetes)
[dev]: ../developer/sdm.md (Atomist Developer Guide)
[configure-lifecycle]: ../lifecycle.md (Atomist Lifecycle Messages)
