## ExecutionTrigger

```clojure
{:execution-id string
 :skill SkillIdentifier
 :workspace-id string
 :type keyword
 :context object
 :urls ExecutionUrls
 :token string}
```

| Field | Description |
| :--- | :--- |
| `:execution-id` | `string` - The ID of the execution. |
| `:skill` | [`SkillIdentifier`](#skillidentifier) - The identifier of the skill which is being triggered. |
| `:workspace-id` | `string` - The ID of the workspace in which this execution has been triggered. |
| `:type` | `keyword` - The type of the execution. One of `:subscription`, `:webhook` or `:command`. |
| `:context` | [`ExecutionContext`](#executioncontext) - The context information for this execution. |
| `:urls` | [`ExecutionUrls`](#executionurls) - The URLs which can be used in relation to this execution. |
| `:token` | `string` - A token which is intended to be used for interaction with the API in relation to this execution. It is scoped to this particular execution so cannot be used for any other purpose. |

## SkillIdentifier

```clojure
{:namespace string
 :name string
 :version string}
```

| Field | Description |
| :--- | :--- |
| `:namespace` | `string` - The namespace of the skill which has been triggered. |
| `:name` | `string` - The name of the skill which has been triggered. |
| `:version` | `string` - The version of the skill which has been triggered. |

## ExecutionContext

An `ExecutionContext` will contain only one of the following fields dependending on the `:type` of the ExecutionTrigger.

| Field | Description |
| :--- | :--- |
| `:subscription` | [`SubscriptionContext`](#subscriptioncontext) - A context object describing an execution triggered by a subscription. |
| `:webhook` | [`WebhookContext`](#webhookcontext) - A context object describing an execution triggered by a webhook. |

## SubscriptionContext

```clojure
{:name string
 :configuration Configuration
 :result SubscriptionResult
 :metadata SubscriptionMetadata}
```

| Field | Description |
| :--- | :--- |
| `:name` | `string` - The name of the subscription has been triggered. |
| `:configuration` | [`Configuration`](#configuration) - The configuration of the skill which has been triggered. |
| `:result` | [`SubscriptionResult`](#subscriptionresult) - The result of the query which was run when the subscription triggered. |
| `:metadata` | [`SubscriptionMetadata`](#subscriptionmetadata) - Information about the event which caused the execution to be triggered. |

## SubscriptionResult

A `SubscriptionResult` will be in the form specified by the `pull` expression in the Datalog query of the subscription.

## SubscriptionMetadata

```clojure
{:after-basis-t int
 :tx int
 :schedule-name string?}
```

| Field | Description |
| :--- | :--- |
| `:after-basis-t` | `int` - The `t` value of the database at the time the subscription was triggered. |
| `:tx` | `int` - The ID of the transaction which triggered this execution. |
| `:schedule-name` | `string` (optional) - The name of the schedule which triggered the subscription. This field will only be present when the subscription was triggered by a schedule. |

## WebhookContext

```clojure
{:name string
 :configuration Configuration
 :request WebhookRequest}
```

| Field | Description |
| :--- | :--- |
| `:name` | `string` - The name of the webhook which caused this execution to be triggered. |
| `:configuration` | [`Configuration`](#configuration) - The configuration of the skill which has been triggered. |
| `:request` | [`WebhookRequest`](#webhookrequest) - Details of the request which triggered this execution. |

## WebhookRequest

```clojure
{:url string
 :body string?
 :headers {string string}?
 :tags [Tag]?}
```

| Field | Description |
| :--- | :--- |
| `:url` | `string` - The URL of the webhook which was triggered. |
| `:body` | `string` (optional) - The body of the webhook which was triggered. This will be the raw value which was received. |
| `:headers` | `{string string}` (optional) - The headers which were received by the server. Header names will be lowercased. |
| `:tags` | An array of [`Tag`](#tag) (optional) - Any tags which are associated with the webhook which was triggered. |

## Tag

```clojure
{:name string
 :value string}
```

| Field | Description |
| :--- | :--- |
| `:name` | `string` - The name of the tag. |
| `:value` | `string` - The value of the tag. |

## ExecutionUrls

```clojure
{:execution string
 :logs string
 :transactions string
 :query string}
```

| Field | Description |
| :--- | :--- |
| `:execution` | `string` - The URL which should be used to `PATCH` status updates to this execution. |
| `:logs` | `string` - The URL which should be used to `POST` logs for this execution. |
| `:transactions` | `string` - The URL which should be used to `POST` transactions for this execution. |
| `:query` | `string` - The URL which should be used to make Datalog queries. |

## Configuration

```clojure
{:name string
 :capabilities [Capability]?
 :parameters [Parameter]?}
```

| Field | Description |
| :--- | :--- |
| `:name` | `string` - The name of the configuration. |
| `:capabilities` | An array of [`Capability`](#capability) (optional) - ??? |
| `:parameters` | An array of [`Parameter`](#parameter) (optional) - Any parameters associated with this configuration. |

## Capability

```clojure
{:providers [Provider]
 :spec CapabilitySpec}
```

| Field | Description |
| :--- | :--- |
| `:providers` | An array of [`Provider`](#provider) - ??? |
| `:spec` | [`CapabilitySpec`](#capabilityspec) - ??? |

## Provider

```clojure
{:namespace string
 :name string
 :configuration-name string}
```

| Field | Description |
| :--- | :--- |
| `:namespace` | `string` - The namespace of the provider. |
| `:name` | `string` - The name of the provider. |
| `:configuration-name` | `string` - The configuration-name of the provider. |

## CapabilitySpec

```clojure
{:namespace string
 :name string}
```

| Field | Description |
| :--- | :--- |
| `:namespace` | `string` - The namespace of the capability. |
| `:name` | `string` - The name of the capability. |

## Parameter

```clojure
{:name string
 :value any}
```

| Field | Description |
| :--- | :--- |
| `:name` | `string` - The name of the parameter. |
| `:value` | `any` - The value of the parameter. |

## ExecutionPatch

```clojure
{:status ExecutionStatusPatch}
```

| Field | Description |
| :--- | :--- |
| `:status` | [`ExecutionStatusPatch`](#executionstatuspatch) - A new value for the `:status` of the execution. |

## ExecutionStatusPatch

```clojure
{:state keyword
 :reason string?}
```

| Field | Description |
| :--- | :--- |
| `:state` | `keyword` - The new `:state` for the execution. One of `:running`, `:completed`, `:failed` or `:retryable`. |
| `:reason` | `string` (optional) - A reason for the new state. |

## ExecutionTransactions

```clojure
{:transactions [Transaction]}
```

| Field | Description |
| :--- | :--- |
| `:transactions` | An array of [`Transaction`](#transaction) - The transactions to enqueue. |

## Transaction

```clojure
{:data [{keyword any}]
 :ordering-key string?}
```

| Field | Description |
| :--- | :--- |
| `:data` | An array of `{keyword any}` - The data for the transaction. |
| `:ordering-key` | `string` (optional) - If the transactions have dependencies on each other which mean they need to applied in a strict order you can specify an ordering-key which will ensure all transactions with the same ordering are applied in the order they are received at the server and in the order in which they appear in each request. |

## ExecutionLogs

```clojure
{:logs [Log]}
```

| Field | Description |
| :--- | :--- |
| `:logs` | An array of [`Log`](#log) - The logs to enqueue. |

## Log

```clojure
{:timestamp string
 :level keyword
 :text string}
```

| Field | Description |
| :--- | :--- |
| `:timestamp` | `string` - The timestamp of the log message in ISO-8601 instant format (e.g. `2022-01-01T00:00:00.000Z`). This format will accept up to nine-digits of precision for the nanoseconds. |
| `:level` | `keyword` - The level of the log message. One of `:debug`, `:info`, `:warn` or `:error`. |
| `:text` | `string` - The text of the log message. |

## Error

```clojure
{:message string}
```

| Field | Description |
| :--- | :--- |
| `:message` | `string` - The message of the error. |
