# SDM Configuration

Configure your SDM with connection parameters for the Atomist API for software,
and for anything else that your particular delivery automations need.

## How you can configure

There are a few ways you can configure Atomist SDMs. of the approaches below will work in any scenario, some approaches are
better for some use cases than others.  If you are developing an SDM
and running it locally on your workstation or laptop, [user
configuration](#user-configuration) is likely your best choice.  If
you are running an SDM on a server in a
testing or production environment, you will likely want to use the
[environment variable](#environment-variable) approach.
For the full list of configuration sources, see the [API docs][configuration-apidoc].

Regardless of the approach you take, the minimum information required
to successfully start an SDM is an [API key](prerequisites.md#atomist-api-key)
and a [workspace ID](prerequisites.md#atomist-workspace).  Depending on the SDM or
other client you are trying to run, you may need to provide more
configuration values.

### User configuration

If you have a user configuration file on your system, it will be read
and merged with any client-specific configuration whenever you start
an SDM.  In other words, it serves as a base
configuration for all SDMs you run on your system.

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

If you are in multiple Atomist
workspaces and want to run your SDMs in all of them, add all
of their workspace IDs to the `workspaceIds` array in the user
configuration file.

### Environment variable

When running an SDM on a server, especially when
running in a containerized environment, it is typically better to
provide the necessary configuration using environment variables.  When
an SDM starts up, it will attempt to parse a JSON-formatted
configuration object from the `ATOMIST_CONFIG` environment variable
and from the file provided by the `ATOMIST_CONFIG_PATH` environment
variable.

For example, to use the `ATOMIST_CONFIG` environment variable to
provide the same configuration as that shown above in the user
configuration section, you could run the following commands to set the
environment variable and start the client.

```
export ATOMIST_CONFIG='{"apiKey":"API_KEY","workspaceIds":["WORKSPACE_ID"]}'
atomist start
```

Similarly, if you created a file with the same contents as that show
above in the user configuration section at `/opt/sdm/sdm-config.json`,
then you tell the SDM to load that file by setting the
following environment variable prior to starting the SDM.

```
export ATOMIST_CONFIG_PATH=/opt/sdm/sdm-config.json
atomist start
```

If both environment variables are defined, their configuration values
are merged with values in the `ATOMIST_CONFIG` environment variable
taking precedence over those defined in the `ATOMIST_CONFIG_PATH`
file.  If the user configuration file also exists, its values are also
merged in with lower precedence than either environment variable.

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

## What you can configure

### Caching

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

The full list of configuration values are [here](https://atomist.github.io/sdm/interfaces/_api_machine_softwaredeliverymachineoptions_.softwaredeliverymachineconfiguration.html).

[prereq]: prerequisites.md (Atomist SDM Prerequisites)
[lifecycle]: #client-lifecycle (Atomist SDM Lifecycle)
[configuration-apidoc]: https://atomist.github.io/automation-client/modules/_configuration_.html#loadconfiguration (API doc for loadConfiguration)
