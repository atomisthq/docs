# SDM Guide

-   [Overview](developer/index.md)
-   About the SDM:
    -   [Overview](developer/sdm.md)
    -   [Architecture](developer/architecture.md)
    -   [SDM Concepts](developer/sdm-concepts.md)
    -   [SDM Components](developer/sdm-components.md)
    -   [Team Mode](developer/team.md)
    -   [Local Mode](developer/local.md)
    -   [Command Line Interface](developer/cli.md)
    -   [Security Model](developer/security.md)
    -   [SDM Configuration](developer/config.md)
    -   [Debugging an SDM](developer/sdm-debug.md)
    -   [Deploying your SDM](developer/sdm-deploy.md)
-   Using an SDM:
    -   [Introduction](user/index.md)
    -   [Atomist web interface](user/dashboard.md)
    -   [Source Control](user/github.md)
    -   [Slack](user/slack.md)
    -   [Built-in Chat Integrations](user/lifecycle.md)
    -   [Integrating into Existing Tools](user/admin/integrations/supported-integrations.md)
    -   Workspace Administration:
        -   [Settings](user/admin/settings.md)
        -   [Members](user/admin/members.md)
-   SDM Development:
    -   [Prerequisites](developer/prerequisites.md)
    -   [Setting up TypeScript in your IDE](developer/typescript.md)
    -   Events:
        -   [Event Listeners](developer/event.md)
        -   Code samples:
            -   [Example: Responding to repository creation](developer/respond-to-repo-creation.md)
            -   [Example: Responding to issue creation](developer/respond-to-issue-creation.md)
        -   [Custom Events](developer/custom-events.md)
    -   Goals:
        -   [Create Goals](developer/goal.md)
        -   [Setting Goals](developer/set-goals.md)
        -   [Goal Details](developer/goaldetails.md)
        -   [Doing More with Goals](developer/goals-more.md)
    -   [Invocations](developer/invocation.md)
    -   [Logging](developer/logging.md)
    -   [Automation API](developer/command-http.md)
    -   [Identifying a repository](developer/reporef.md)
    -   [Custom GraphQL Queries](developer/graphql.md)
    -   [Running External Commands](developer/spawn.md)
    -   [Repo Targeting Parameters](developer/repo-targeting-params.md)
    -   [HTTP Calls in an SDM](developer/http.md)
    -   [Writing Push Tests](developer/push-test.md)
    -   [Working with the AST](developer/astutils.md)
    -   [Signing Goals and Custom Events](developer/signature.md)        
    -   [Local mode quick start](developer/local-quick-start.md)
    -   [Troubleshooting](developer/troubleshoot.md)
-   What the SDM can do:
    -   [Commands](developer/commands.md)
    -   [Code Inspections](developer/inspect.md)
    -   Code Transforms:
        -   [Transforms](developer/transform.md)
        -   [Autofixes](developer/autofix.md)
        -   [Project](developer/project.md)
        -   [Path Expressions](developer/pxe.md)
        -   [Using microgrammars](developer/parseutils.md)
        -   [Modifying files](developer/projectutils.md)
    -   [Chat Messages](developer/slack.md)
    -   [Fingerprints](developer/fingerprint.md)
    -   [Project Generators](developer/create.md)
    -   [Delivery](developer/delivery.md)
    -   [Example: Putting it together](developer/putting-it-together.md)
-   API Reference:
    -   [Packages Overview](developer/packages-overview.md)
    -   [automation-client](https://atomist.github.io/automation-client/)
    -   [sdm](https://atomist.github.io/sdm/)
-   Tutorials:
    -   [Overview](developer/tutorials.md)
    -   [Setting Up a Project Generator](developer/setting-up-generator.md)
    -   [Writing your First Code Transform](developer/first-transform.md)
    -   [Defining an SDM](developer/defining-sdm.md)
    -   [Building your First Delivery](developer/first_delivery.md)
    -   [Creating Container Goals](developer/container-goals.md)
