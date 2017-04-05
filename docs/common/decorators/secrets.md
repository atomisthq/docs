Secrets are pieces of sensitive information stored securely by Atomist. Secrets
are used by [Rug Functions](/user-guide/rug/rug-functions.md) to provide access
to secured systems, such as the GitHub API.

Handlers that invoke Rug Functions that require secrets must use the
`#!typescript @Secrets` decorator to declare to the Rug runtime that those
secrets will be required during the execution of the handler's CommandPlan:

```typescript
...
@Secrets("github://user_token?scopes=repo")
class CloseIssueCommand implements HandleCommand {
    //...
}
```

The `#!typescript @Secrets` decorator takes a comma separate list of secret
paths. The decorator provides enough context to the Atomist Bot such that it
can initiate the secure collection of the require secret data, such as a GitHub
token collected via OAuth flow.

!!! success "Confidentiality"
    All sensitive data stored by Atomist are encrypted at rest in
    [Vault](https://www.vaultproject.io/docs/internals/security.html).

There are currently two types of secrets:

-   GitHub tokens: automatically collected by the Atomist Bot
    - `#!typescript "github://user_token?scopes=repo"` - `repo` scoped user token
    - `#!typescript "github://team_token?scopes=repo"` - `repo` scoped team token
-   Generic Secrets: manual collection
    - `#!typescript "secret://user?path=/some/secret"` - generic user secret
    - `#!typescript "secret://team?path=/some/secret"` - generic team secret

!!! warning "Generic Secrets"
    These are currently only available for very specific and mostly internal use
    cases as we currently have no secure public mechanism for collecting and storing
    them, though this is something we are hoping to support in the near future. They
    are mentioned here to avoid any confusion when seen in publically visible Handlers.
