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

To make your own generator, get an [SDM][sdm-project] of your own.
Then take a look at [a
generator](https://github.com/atomist-blogs/spring5-kotlin/blob/master/src/commands/KotlinSpring5.ts)
that makes a Spring 5 project -- it [declares a starting
point](https://github.com/atomist-blogs/spring5-kotlin/blob/45cac17bf6ed4238188d3f79b78c6f7432da7ff7/src/commands/KotlinSpring5.ts#L54)
and [customizes that
code](https://github.com/atomist-blogs/spring5-kotlin/blob/45cac17bf6ed4238188d3f79b78c6f7432da7ff7/src/commands/KotlinSpring5.ts#L65).

The SDM hooks your generator up to Slack. You can also
add a custom form to serve project creation to your team or organization.

A generator is one kind of [command handler][command], so you can
make it do as much as you want.

<!--

Other links that might be useful: [this code](https://github.com/atomist/initializr-atomist/blob/master/src/web/initializerHandoff.ts)
makes a custom form somehow, in our spring initializr automation.
(I don't know exactly how)

Change code could link to [project editors](https://github.com/atomist/automation-client-ts/blob/master/docs/ProjectEditors.md)

-->

[sdm-project]: sdm-project.md (Atomist SDM Project)
[command]: commands.md (Atomist SDM Commands)
