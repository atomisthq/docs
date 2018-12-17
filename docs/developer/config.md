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

The configuration values in your `index.ts` file will override
those from your user configuration.

You can list environment variables in your configuration. The SDM will substitute environment 
variable values in expressions when you write them like `${ENV_VAR}`.
For example:

```json
{
  ...
  "sdm": {
    "docker": {
      "host": "registry.hub.docker.com",
      "password": "${DOCKER_PASSWORD}"
    }
  }
}
```


For the full list of configuration sources, see the [API doc][configuration-apidoc].

The full list of configuration values are [here](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachineoptions_.softwaredeliverymachineconfiguration.html). 

<!-- TODO: Adding own config values. See `atomist-sdm` index.ts. -->

[prereq]: prerequisites.md (Atomist SDM Prerequisites)
[lifecycle]: #client-lifecycle (Atomist SDM Lifecycle)
[configuration-apidoc]: https://atomist.github.io/automation-client/modules/_lib_configuration_.html#loadconfiguration (API doc for loadConfiguration)
