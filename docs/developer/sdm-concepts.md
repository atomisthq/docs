The Software Delivery Machine, or SDM, is your interface for using
Atomist to deliver your software your way, but better.  An SDM
automates all steps in the flow from project creation to production,
and many other actions, using the consistent model provided by the
Atomist *API for software*.

## Core Concepts

An SDM builds on other Atomist core functionality available from
global automations, such as Atomist [lifecycle messages][lifecycle] showing
commit, pull request, and other activity through actionable messages
in your chat client.

[lifecycle]: ../user/lifecycle.md (Atomist Lifecycle Messages in chat)

### GraphQL

The Atomist automation API provides you access to the events and data
from your development platforms using [GraphQL][graphql], a
widely-used query language and runtime for APIs.

You can use GraphQL with the Atomist automation API for:

1.  Queries that fetch data directly
2.  Subscriptions to register the types of events you want to receive
3.  Mutations to change data and make connections

[graphql]: http://graphql.org/ (GraphQL)

### WebSockets

An Atomist SDM must maintain
contact with the API server so that it can receive the events and
commands it's interested in as they occur.

SDMs access the Atomist automation API via
a [WebSocket][ws] connection.  WebSockets allow the API server to send
events and commands to the SDM without constant polling via HTTP
calls. The
WebSocket connection is initiated by the SDM when it
starts up, establishing a persistent two-way communication channel
between the SDM and API that is resilient to
interruptions in connectivity.

[ws]: https://en.wikipedia.org/wiki/WebSocket (WebSocket)

### Events

The heart of Atomist is its event handling. As your code flows from
commit through to deployment and beyond, Atomist receives events,
correlates the incoming data with its previous knowledge, and invokes
your event handlers with rich context. This enables your automations
to perform tasks such as:

* Scanning code for security or quality issues on every push
* Driving deployments and promotion between environments
* Performing custom actions on deployment, such as kicking off
    integration test suites.

The Atomist correlated event model also enables Atomist to provide you
with visibility throughout the commit to deployment flow, in Slack or
through the Atomist web interface.  See [Events][events] for more
information.

[events]: event.md (Atomist - Events)

Event handlers subscribe to events using [GraphQL][graphql]
subscriptions against the Atomist cortex. The following GraphQL
subscribes to completed builds, returning related data such as the
last commit and any linked Slack channels:

[graphql]: http://graphql.org (GraphQL)

```graphql
subscription OnBuildComplete {
  Build {
    buildId
    buildUrl
    compareUrl
    name
    status
    commit {
      sha
      message
      repo {
        name
        owner
        gitHubId
        allowRebaseMerge
        channels {
          name
          id
        }
      }
      statuses {
        context
        description
        state
        targetUrl
      }
    }
  }
}
```

When using TypeScript (our recommended language), an event handler can
subscribe to such events with the benefit of strong typing. For
example, this Atomist event handler can respond to the above GraphQL
subscription:

```typescript
@EventHandler("Set status on build complete",
    GraphQL.subscriptionFromFile("graphql/subscription/OnBuildComplete.graphql"))
export class SetStatusOnBuildComplete implements HandleEvent<OnBuildComplete.Subscription> {

    public async handle(event: EventFired<OnBuildComplete.Subscription>,
    	ctx: HandlerContext,
    	params: this): Promise<HandlerResult> {
```

This underlying GraphQL/event handler infrastructure is generic and
powerful. However, many things are better done at a higher level. This
project provides a framework above this infrastructure that makes
typical tasks far easier, while not preventing you from breaking out
into lower level functionality.

## SDM process lifecycle

The SDM lifecycle will be familiar to those developing
persistent applications.

1.  **Authentication** - When the SDM starts up, it
    connects to the Atomist API and authenticates using the API key
    you have provided in your configuration file.

2.  **Registration** - Once your identity has been established, the
    client registers its automations, i.e., the bot commands it
    provides and the events it wants to receive, with the Atomist
    workspaces specified in your configuration.  If Atomist
    does not recognize your workspace ID or the provided API key is
    not connected to any member of that workspace, registration will
    fail and the SDM will exit with an unsuccessful status.

3.  **Listening** - After authentication and registration is completed
    successfully, the WebSocket connection is established and the
    client begins listening for incoming messages from the API: bot
    commands and events fired.

4.  **Shutdown** - When the client receives a shutdown signal,
    typically `SIGINT` delivered by the PaaS or `Ctrl-C`, it
    de-registers with the API and gracefully shuts down.

## SDM state

An SDM, once registered, will continue to receive all the events it
has subscribed to until shuts down or one of the following scenarios
occurs.

### Multiple identical SDMs register

If another client with the same name and version (typically obtained
from the `package.json` "name" and "version" properties) registers,
then all of the registered identical SDMs will receive the events
in a round-robin fashion.  Each event will only be sent to one of the
identical SDMs.  This allows you to horizontally scale.

### A different version registers

If another SDM having the same name but different version
registers, it will begin receiving all of the events for the client
and any previously registered versions cease receiving events.  Note
that no version comparisons are done: the _last registration wins_.

If the new client has registered with a policy of "ephemeral" and the
prior client was registered with a policy of "durable", then when the
new client shuts down, events again be sent to the "durable"
registration clients.

The reason for this logic is to allow for production, testing, and
local use to all coexist without taking the same action multiple
times.  For example, if you are running an SDM in production but want
to test something, you can run it locally, steal events for a bit,
kill the local process, and then traffic will return to the production
instance.

If you want the same events to be sent to multiple SDMs, just make
sure the SDMs have different names.

!!! note "Custom Ingestion"
    Any custom ingestion types can only be registered once within an
    Atomist workspace.  Therefore it is recommended to register these
    in a dedicated API client.

## SDM Framework concepts

#### Push Mappings

Let's now return to push mappings and goal setting. The `PushMapping`
interface is used to decide how to handle pushes. Normally it is used
via the DSL we've seen.

```typescript
export interface PushMapping<V> {

    /**
     * Name of the PushMapping. Must be unique
     */
    readonly name: string;

    /**
     * Compute a value for the given push. Return undefined
     * if we don't find a mapped value.
     * Return DoNotSetAnyGoals (null) to shortcut evaluation of the present set of rules,
     * terminating evaluation and guarantee the return of undefined if we've reached this point.
     * Only do so if you are sure
     * that this evaluation must be short circuited if it has reached this point.
     * If a previous rule has matched, it will still be used.
     * The value may be static
     * or computed on demand, depending on the implementation.
     * @param {PushListenerInvocation} p
     * @return {Promise<V | undefined | NeverMatch>}
     */
    valueForPush(p: PushListenerInvocation): Promise<V | undefined | NeverMatch>;
}
```

`PushMapping` is a central interface used in many places.

A `GoalSetter` is a `PushMapping` that returns `Goals`.

A `PushTest` is simply a `PushMapping` that returns `boolean`.

## Code Examples

Let's look at some examples.

### Issue Creation

When a new issue is created, you may want to notify people or perform an action.

#### Listener interfaces

1.  `NewIssueListener`: [NewIssueListener](https://github.com/atomist/sdm/blob/master/lib/api/listener/NewIssueListener.ts)

#### Examples

The following example notifies any user who raises an issue with
insufficient detail in the body, via a direct message in Slack, and
provides them with a helpful link to the issue. Note that we make use
of the person available via the `openedBy` field:

```typescript
export async function requestDescription(inv: NewIssueInvocation) {
    if (!inv.issue.body || inv.issue.body.length < 10) {
        await inv.context.messageClient.addressUsers(
            `Please add a description for new issue ${inv.issue.number}: _${inv.issue.title}_: ${inv.id.url}/issues/${inv.issue.number}`,
            inv.issue.openedBy.person.chatId.screenName);
    }
}
```

This is registed with a `SoftwareDeliveryMachine` instance as follows:

```typescript
sdm.addNewIssueListeners(requestDescription)
```

Using the `credentials` on the `NewIssueInvocation`, you can easily
use the GitHub API to modify the issue, for example correcting
spelling errors.

### Repo Creation

We frequently want to respond to the creation of a new repository: For
example, we may want to notify people, provision infrastructure, or
tag it with GitHub topics based on its contents.

#### Listener interfaces

There are two scenarios to consider:

1.  The creation of a new repository. `RepoCreationListener`:
    [RepoCreationListener](https://github.com/atomist/sdm/blob/master/lib/api/listener/RepoCreationListener.ts)
2.  The first push to a repository, which uses the more generic
    [ProjectListener](https://github.com/atomist/sdm/blob/master/lib/api/listener/PushListener.ts)

The second scenario is usually more important, as it is possible to
create a repository without any source code or a master branch, which
isn't enough to work with for common actions.

#### Example

The following example publishes a message to the `#general` channel in
Slack when a new repo has been created:

```typescript
export const PublishNewRepo: SdmListener = (i: ListenerInvocation) => {
    return i.context.messageClient.addressChannels(
        `A new repo was created: \`${i.id.owner}:${i.id.repo}\``, "general");
};

```

Tagging a repo with topics based on its content is a useful
action. `tagRepo` is a convenient function to construct a
`ProjectListener` for this. It tags as an argument a `Tagger`, which
looks at the project content and returns a `Tags` object. The
following example from `atomist.config.ts` tags Spring Boot repos,
using a `Tagger` from the `spring-automation` project, in addition to
suggesting the addition of a Cloud Foundry manifest, and publishing
the repo using the listener previously shown:

```typescript
sdm.addNewRepoWithCodeActions(
      tagRepo(springBootTagger),
      suggestAddingCloudFoundryManifest,
      PublishNewRepo)
```

## Project Generators

Another important concern is project creation. Consistent project
creation is important to governance and provides a way of sharing
knowledge across a team.

See the [Project Creation](create.md) page.

## Code Transforms

Another core concept is a **code transform**. This is a command
that transforms project content. Atomist infrastructure can help
persist such transformations through branch commits or pull requests,
with clean diffs.

See the [Code Transform](transform.md) page.

More elaborate transforms use helper APIs on top of the `Project` API
such as Atomist's
[microgrammar](https://github.com/atomist/microgrammar) API and
[ANTLR](https://github.com/atomist/antlr) integration.

### Dry Run Transforms

There's also an important capability called "dry run transform":
Performing a transform on a branch, and then either raising either a PR or
an issue, depending on build success or failure. This allows us to
safely apply transforms across many repositories. There's a simple wrapper
function to enable this:

!!! tip
    Dry run transforms are another example of how commands and events can work
    hand in hand with Atomist to provide a uniquely powerful solution.

## Arbitrary Commands

Both generators and transforms are special cases of Atomist **command
handlers**, which can be invoked via Slack or HTTP. You can write
[commands](commands.md) to ensure that anything that needs to be repeated gets done
the right way each time, and that the solution isn't hidden on
someone's machine.

## Pulling it All Together: The `SoftwareDeliveryMachine` class

Your ideal delivery blueprint spans delivery flow, generators, editors
and other commands. All we need is something to pull it together.

Your event listeners need to be invoked by Atomist handlers. The
`SoftwareDeliveryMachine` takes care of this, ensuring that the
correct handlers are emitted for use in `atomist.config.ts`, without
you needing to worry about the event handler registrations on
underlying GraphQL.

The `SoftwareDeliveryMachine` class offers a fluent builder approach
to adding command handlers, generators and editors.

### Example

For example:

```typescript
    const sdm = createSoftwareDeliveryMachine(
        {
            builder: K8sBuildOnSuccessStatus,
            deployers: [
                K8sStagingDeployOnSuccessStatus,
                K8sProductionDeployOnSuccessStatus,
            ],
            artifactStore,
        },
        whenPushSatisfies(PushToDefaultBranch, IsMaven, IsSpringBoot, HasK8Spec, PushToPublicRepo)
            .setGoals(HttpServiceGoals),
        whenPushSatisfies(not(PushFromAtomist), IsMaven, IsSpringBoot)
            .setGoals(LocalDeploymentGoals),
        whenPushSatisfies(IsMaven, MaterialChangeToJavaRepo)
            .setGoals(LibraryGoals),
        whenPushSatisfies(IsNode).setGoals(NpmGoals),
    );
    sdm.addNewRepoWithCodeActions(suggestAddingK8sSpec)
        .addSupportingCommands(() => addK8sSpec)
        .addSupportingEvents(() => NoticeK8sTestDeployCompletion,
            () => NoticeK8sProdDeployCompletion)
        .addEndpointVerificationListeners(
            lookFor200OnEndpointRootGet({
                retries: 15,
                maxTimeout: 5000,
                minTimeout: 3000,
            }),
        );
    sdm.addNewIssueListeners(requestDescription)
        .addEditors(() => tryToUpgradeSpringBootVersion)
        .addGenerators(() => springBootGenerator({
            seedOwner: "spring-team",
            seedRepo: "spring-rest-seed",
            groupId: "myco",
        }))
        .addNewRepoWithCodeActions(
            tagRepo(springBootTagger),
            suggestAddingCloudFoundryManifest,
            PublishNewRepo)
        .addProjectReviewers(logReview)
        .addPushReactions(listChangedFiles)
        .addFingerprinters(mavenFingerprinter)
        .addDeploymentListeners(PostToDeploymentsChannel)
        .addEndpointVerificationListeners(LookFor200OnEndpointRootGet)
        .addVerifiedDeploymentListeners(presentPromotionButton)
        .addSupersededListeners(
            inv => {
                logger.info("Will undeploy application %j", inv.id);
                return LocalMavenDeployer.deployer.undeploy(inv.id);
            })
        .addSupportingCommands(
            () => addCloudFoundryManifest,
            DescribeStagingAndProd,
            () => disposeProjectHandler,
        )
        .addSupportingEvents(OnDryRunBuildComplete);
```

The `SoftwareDeliveryMachine` instance will create the necessary
Atomist event handlers to export.

In `atomist.config.ts` you can bring them in simply as follows:

```typescript
commands: assembled.commandHandlers,
events: assembled.eventHandlers,
```

## Plugging in Third Party Tools

In addition to the core capabilities of the Atomist platform, an SDM
can integrate with third-party tools to execute goals and commands.

### Integrating CI tools

One of the tools you are most likely to integrate is Continuous Integration (CI). For example,
you can integrate Jenkins, Travis or Circle CI with Atomist so that
these tools are responsible for build. This has potential advantages
in terms of scheduling and repeatability of environments.

Integrating a CI tool with Atomist is simple. Simply invoke Atomist
hooks to send events around build and artifact creation.

If integrating CI tools, we recommend the following:

* CI tools are great for building and generating artifacts. They are
    often abused as a PaaS for `bash`. If you find your CI usage has
    you programming in `bash` or YML, consider whether invoking such
    operations from Atomist event handlers might be a better model.
* Use Atomist generators to create your CI files, and Atomist
    editors to keep them in synch, minimizing inconsistency.

<!--
### Integrating APM tools

-->

### Integrating with Static Analysis Tools

Any tool that runs on code, such as Checkstyle, can easily be
integrated.

If the tool doesn't have a Node API (which Checkstyle doesn't as it's written in Java), you can invoke it via Node `spawn`, as Node excels at working with child processes.

## Advanced Push Rules

### Computed Values

You can use computed `boolean` values or the results of synchronous or
asynchronous functions returning `boolean` in the DSL, making it
possible to bring in any state you wish. For example:

```typescript
whenPushSatisfies(IsMaven, HasSpringBootApplicationClass,
	deploymentsToday < 25)
    .itMeans("Not tired of deploying Spring apps yet")
    .setGoals(LocalDeploymentGoals),
```

### Decision Trees

You can write decision trees in push rules or other push
mappings. These can be nested to arbitrary depth, and can use computed
state. For example:

```typescript
let count = 0;
const pm: PushMapping<Goals> = given<Goals>(IsNode)
	// Compute a value we'll use later
    .init(() => count = 0)
    .itMeans("node")
    .then(
        given<Goals>(IsExpress).itMeans("express")
            .compute(() => count++)
            // Go into tree branch rule set
            .then(
                whenPushSatisfies(count > 0).itMeans("nope").setGoals(NoGoals),
				whenPushSatisfies(TruePushTest).itMeans("yes").setGoals(HttpServiceGoals),
            ),
    );
```
