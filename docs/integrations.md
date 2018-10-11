Atomist receives events from and performs operations on many systems,
including version control, CI systems, Slack, and more.

Atomist uses the native integration technology for each platform or
tool.  For example, to integrate with GitHub and Travis CI, Atomist
uses webhooks; to integrate with Slack it uses their native real-time
messaging (RTM) API.  For each platform Atomist integrates with, it
requests the minimal set of permissions required.

If you use a system or tool Atomist does not natively support, you can
implement your own integrations.  You can use whatever tools and
libraries you want to communicate with your systems, and then register
these custom event types with Atomist so it can properly connect them
with other events.

!!! 