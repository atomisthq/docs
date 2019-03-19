In team mode, you can invoke your commands through our Automation API.

## Authentication

You'll need an API Key, which you can generate in the Atomist web application's [API key page](https://app.atomist.com/apiKeys). Pass it in a header: `Authorization: Bearer $APIKEY`

## URL

Send a POST to `https://automation.atomist.com/command?invoke=true` with a JSON body describing the [command request][].

For example:

```bash
curl -H "Authorization: Bearer $APIKEY" -H 'Content-Type:application/json' \
     -X POST https://automation.atomist.com/command?invoke=true \
     -d @command.json
```

where

* `$APIKEY` is the API Key you created in the web application.
* `command.json` is a file containing JSON as described below.

## Request Body
[command request]: #request-body

The command request looks like this:

```json
{
	"api_version": "1",
	"command": "my-command-name",
	"source": {
		"user_agent": "web"
	},
	"team": {
		"id": "my-team-ID",
		"name": "my-team-name"
	},
	"automation": {
		"name": "name-of-my-sdm"
	},
	"parameters": [
		{ "name": "parameter_name_1", "value": "parameter value 1"}
	],
    "secrets": [
        { "uri": "secret_path1", "value": "secret-value1" },
        { "uri": "secret_path2", "value": "secret-value2" }
    ],
    "mapped_parameters": [
        { "name": "mapped_parameter_name1", "value": "Mapped parameter value 1" },
        { "name": "mapped_parameter_name2", "value": "Mapped parameter value 2" }
    ]
}
```

where:

* `MyCommandName` is the name you gave your command registration.
* `my-team-id` and `my-team-name` are available on the Workspace Settings page in the [web application](https://app.atomist.com).
* `name-of-my-sdm` is the `name` field in your SDM's `package.json`
* `parameters` should contain name/value objects for every required parameter defined for your command, and may contain optional parameters.
* `secrets` is OPTIONAL. You only need it if your command requests some.
* `mapped_parameters` is OPTIONAL. You only need it if your command requests some.

For example, the registration for this example command could look like this in an SDM's `machine.ts`:

```typescript
sdm.addCommand<{ parameter_name_1: string }>({
    name: "MyCommandName",
    intent: "type this in chat to invoke the command",
    parameters: {
        parameter_name_1: { required: true },
    },
    listener: async cli => {
        await cli.addressChannels("Hello " + cli.parameters.parameter_name_1);
        return {
            code: 0,
        };
    },
});
```

## Response Body

If your POST is successful, the body of the response contains an ID and a URL which you can poll for results.

```json
{
  "invocation": {
    "id": "b4579e90-64f1-402d-8827-bf12436e254a",
    "url": "https://automation.atomist.com/command/4dc8db42-f04d-40e4-8a70-55ae9cf7819d/invocation/b4579e90-64f1-402d-8827-bf12436e254a"
  }
}
```

If the POST is not successful, the body should contain validation errors.

## Retrieving the result

Do a GET request to the URL in the command invocation's result to find out what happened.

For example:

```bash
curl https://automation.atomist.com/command/8b284afb-32ff-46ea-9f38-fed39b0c977b/invocation/20fe341c-3521-4fb4-9a1f-679f8795a0c0
```

retrieves something like:

```json
{
  "command_request": {
    "api_version": "1",
    "command": "MyCommandName",
    "source": {
      "user_agent": "web"
    },
    "team": {
      "id": "my-team-id",
      "name": "my-team-name"
    },
    "automation": {
      "name": "name-of-my-sdm"
    },
    "parameters": [
      {
        "name": "parameter_name_1",
        "value": "parameter value 1"
      }
    ],
    "secrets": [],
    "correlation_id": "b4579e90-64f1-402d-8827-bf12436e254a"
  },
  "phase": "SUCCESS",
  "command_response": {
    "destinations": [
      {
        "user_agent": "web"
      }
    ],
    "command": "MyCommandName",
    "source": {
      "user_agent": "web"
    },
    "content_type": "text/plain",
    "correlation_id": "b4579e90-64f1-402d-8827-bf12436e254a",
    "team": {
      "id": "my-team-id",
      "name": "my-team-name"
    },
    "api_version": "1",
    "body": "Hello parameter value 1",
    "post_mode": "ttl"
  }
}
```

In the message body, the `command_response.body` field contains the text of the
last message sent in the command to via the `addressChannels` method on the command
invocation. If `addressChannels` is called with a chat message object, then that
object is returned in the `command_response.body` as stringified JSON.

For example, the implementation of this sample command is:

```typescript
async cli => {
        await cli.addressChannels("Hello " + cli.parameters.parameter_name_1);
        return {
            code: 0,
        };
    }
```

We passed "parameter value 1" as the value of `parameter_name_1`, so we got a
`command_response.body` of "Hello parameter value 1".

Return to [commands](commands.md)