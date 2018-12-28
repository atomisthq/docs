Logging inside an SDM comes in two varieties.


The important logs are the progress logs of goal executions. These are transmitted to a logging service, so that 
the goals can link to them.

Then there are logs for the SDM itself, where it outputs information about its operation. These go to stdout.

## Goal Progress Logs

To write to these within a goal execution, call `invocation.progressLog.write("stuff")`. You can also [send output from
an external command](spawn.md#send-command-output-to-the-log).

In [local mode](local.md), goal progress logs all go to a single file in `$HOME/.atomist/log`. When a goal fails, 
that file's path is printed to the [feed](cli.md#atomist-feed).

In [team mode](team.md), goal progress logs are sent to Atomist's log service. Each goal, as reported in chat
or on the web interface, links to its progress log. To see it, you must be logged in to the Atomist web interface.

When goal output is short, it is also sent to the SDM logs.

### Custom Progress Logs

To send goal progress logs somewhere else, implement [`ProgressLogFactory`](https://atomist.github.io/sdm/modules/_lib_spi_log_progresslog_.html#progresslogfactorys)
and then set `logFactory` in SDM Configuration. In `index.ts`:

```typescript
const configuration: Configuration & Partial<SoftwareDeliveryMachineOptions> = {
    //...
    sdm: {
        logFactory: new MySpecialProgressLogFactory();
    }
    // ...
}
```

## SDM Logs

To log to the operational SDM logs, import `logger` from automation-client. 
This wraps the [winston](https://github.com/winstonjs/winston) library. 

```typescript

import { logger } from "@atomist/automation-client";

logger.info("This is nice");
```

### Configuring SDM Logs

You can set the log level in the `configuration` object in index.ts:

```typescript
   logging: {
       level: "info", // "warn" | "error" | "debug"
   }
```

You can enable logging to a file at a different level; see [API Docs](https://atomist.github.io/automation-client/interfaces/_lib_configuration_.configuration.html#logging).

### Custom log transports

If you want to send operational SDM logs to a place of your choosing, you can add a custom log transport.

There is an example in Atomist's own SDM. To add logzio support,
 it registers a postProcessor, which gets called after the SDM configuration is loaded: [code](https://github.com/atomist/atomist-sdm/blob/master/index.ts#L40),
This can modify the configuration: [code](https://github.com/atomist/spring-sdm/blob/47086a50426bd459a75ab3a28e0b5d49a0237602/src/atomist.config.ts#L25).
In that postProcessor, a new custom logging transport is added: [code](https://github.com/atomist/automation-client-ext-logzio/blob/8eb116aa6954344811f05938a81f0a25b4d8b8c5/lib/logzio.ts#L231).
That postProcessor also adds a listener to SDM operational events.

## Logging in tests

If you want to turn on logging in a mocha test, put `before(() => configureLogging(MinimalLogging));` within the the outermost `describe`.