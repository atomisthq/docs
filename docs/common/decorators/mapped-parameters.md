Mapped Parameters, declared using the `#!typescript @MappedParameter` decorator, 
behave much like ordinary Parameters declared by the  `#!typescript @Parameter` 
decorator, but are defined and provided by an external system, in most cases,
the Atomist Bot itself.

For example, the `"atomist://github/repository/owner"` Mapped Parameter will be
populated with the name of owner (user or organization) of the GitHub repository
associated with a particular chat channel.

A TypeScript helper class called `#!typescript MappedParameters` exists to 
aid discovery and use of Mapped Parameters. It lives in an NPM module at
`@atomist/rug/operations/Handlers.ts`:

```typescript
abstract class MappedParameters {
  static readonly GITHUB_REPO_OWNER: string = "atomist://github/repository/owner"
  static readonly GITHUB_REPOSITORY: string = "atomist://github/repository"
  static readonly SLACK_CHANNEL: string = "atomist://slack/channel"
  static readonly SLACK_TEAM: string = "atomist://slack/team"
  static readonly SLACK_USER: string = "atomist://slack/user"
  static readonly GITHUB_WEBHOOK_URL: string = "atomist://github_webhook_url"
}
```
