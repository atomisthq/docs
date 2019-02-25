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

## Caching

If you want to cache downloads or other data between goal executions, then configure `sdm.cache.enabled` to true, and set 
`sdm.cache.path` to point to a directory
that is accessible wherever your SDM is running (defaults to `/opt/data`). The SDM will automatically 
clear out old files from this directory if they are more than two hours old when the SDM starts up.

There is an example of how to put files in and out of this directory in our
[node pack](https://github.com/atomist/sdm-pack-node/blob/1d6bcd93d458a03513161393688cc6aa7f774b6a/lib/build/npmBuilder.ts#L161-L209). 
That example zips up the `node_modules` directory and stores it there for each commit.This lets goal executions be stateless, 
without downloading the world every time.


## Everything Else


For the full list of configuration sources, see the [API doc][configuration-apidoc].

The full list of configuration values are [here](https://atomist.github.io/sdm/interfaces/_lib_api_machine_softwaredeliverymachineoptions_.softwaredeliverymachineconfiguration.html). 


[prereq]: prerequisites.md (Atomist SDM Prerequisites)
[lifecycle]: #client-lifecycle (Atomist SDM Lifecycle)
[configuration-apidoc]: https://atomist.github.io/automation-client/modules/_lib_configuration_.html#loadconfiguration (API doc for loadConfiguration)
