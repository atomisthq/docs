
# SDM configuration

Configure your SDM with connection parameters for the Atomist API for software,
and for anything else that your particular delivery automations need.

Initialize your SDM configuration by running `atomist config` as 
instructed in [prerequisites][prereq].  The
configuration file, typically located under your home/user profile
directory at `.atomist/client.config.json`.  It is a standard JSON
file. To connect to the Atomist service, it will look something like:

```json
{
  "apiKey": "ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789",
  "workspaceIds": [
    "A0421WAYA",
  ]
}
```

The `apiKey` is your Atomist API key and `workspaceIds` are the
Atomist IDs of the workspaces where you want to run your team SDMs.
If you want to change the API key or add/remove workspaces, you can edit this file directly.

If you are managing several SDMs for different
teams, you can override your user-level configuration using the
project-level configuration in each project, typically located at
`src/atomist.config.ts`.  A typical project configuration file will
look like this:

```typescript
import { Configuration } from "@atomist/automation-client/configuration";

export const configuration: Configuration = {
    // configuration you want to override
};
```

The configuration values in the `atomist.config.ts` file will override
those from your user configuration.

[prereq]: prerequisites.md (Atomist SDM Prerequisites)
[config]: https://www.npmjs.com/package/config (config Node.js package)
[lifecycle]: #client-lifecycle (Atomist SDM Lifecycle)