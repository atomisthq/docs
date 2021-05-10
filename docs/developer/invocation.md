# Invocations

Invocation objects provide information to your implementations of [goals](goal.md) and [event listeners](event.md).

These objects, passed to listener functions, contain properties useful for learning about
the project and for sending messages.

As with all good frameworks, we've tried to make the API
consistent. All listener invocations include at least the following
generally useful information:

```typescript
export interface SdmContext {

    /**
     * If available, provides a way to address the channel(s) related to this event.
     * This is usually, but not always, the channels linked to a repo
     * In local mode, this sends to `atomist feed`
     * In some cases, such as repo creation or a push to a repo where there is no linked channel,
     * addressChannels will go to dev/null without error.
     */
    addressChannels: AddressChannels;

    /**
     * Credentials for use with source control hosts such as GitHub
     * (team mode only)
     */
    credentials: ProjectOperationCredentials;

    /**
     * Context of the Atomist EventHandler invocation. Use to run GraphQL
     * queries, use the messageClient directly and find
     * the workspace and correlation id
     */
    context: HandlerContext;

}
```

Most events concern a specific repository, and hence most listener
invocations extend `RepoContext`:

```typescript
export interface RepoContext extends SdmContext {

    /**
     * The repo this relates to. Fields include `owner`, `repo`, `sha` and `branch`
     */
    id: RemoteRepoRef;

}
```

Many repo-specific listeners are given access to the repository
source, via the `Project` abstraction:

```typescript
export interface ProjectListenerInvocation extends RepoListenerInvocation {

    /**
     * The project to which this event relates. It will have been cloned
     * prior to this invocation. Modifications made during listener invocation will
     * not be committed back to the project (although they are acceptable if necessary, for
     * example to run particular commands against the project).
     * As well as working with
     * project files using the Project superinterface, we can use git-related
     * functionality fro the GitProject subinterface: For example to check
     * for previous shas.
     * We can also easily run shell commands against the project using its baseDir.
     */
    project: GitProject;

}

```

The [`Project` interface][project] provides an abstraction to
the present repository, with Atomist taking care of Git cloning and
(if necessary) writing back any changes via a push. It is abstracted
from the file system, making it possible to unit test with mocked
repository contents, using the `InMemoryProject` and `InMemoryFile`
classes.

[project]: https://atomist.github.io/automation-client/interfaces/_project_project_.project.html (Atomist Automation Client TypeScript - Project)

!!! Note
    The Project API and sophisticated parsing functionality available on
    top of it is a core Atomist capability. Many events can only be
    understood in the context of the impacted code, and many actions are
    achieved by modifying code.

Push listeners also have access to the details of the relevant push:

```typescript
export interface PushListenerInvocation extends ProjectListenerInvocation {

	 /**
     * Information about the push, including repo and commit
     */
    readonly push: OnPushToAnyBranch.Push;

}
```
