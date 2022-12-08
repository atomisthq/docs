| attribute | type | doc |
| :---- | :---- | :---- |
| :atomist.ordered-list/long | long | Ordered list, long |
| :atomist.ordered-list/ordinal | long | Ordered list, ordinal. |
| :atomist.ordered-list/ref | ref | Ordered list, reference |
| :atomist.ordered-list/string | string | Ordered list, string |
| :atomist.skill/configurations | ref | All configurations for this skill. |
| :atomist.skill/id | string | Internal skill ID. |
| :atomist.skill/name | string | Name of the skill. |
| :atomist.skill/namespace | string | Namespace of the skill. |
| :atomist.skill/state | keyword | State of the skill. Default 'enabled' if not set |
| :atomist.skill/subscriptions | ref | Subscriptions associated with this skill. |
| :atomist.skill/team-id | string | ID of the team owning the skill. |
| :atomist.skill/version | string | Version of the skill. |
| :atomist.skill.capability/name | string | Name of this capabilty configuration, e.g. DockerRegistry |
| :atomist.skill.capability/namespace | string | Capability configuration namespace. |
| :atomist.skill.configuration/capabilities | ref | Capabilities required by this skill, and provided by other skills. |
| :atomist.skill.configuration/id | string | Hash from skill ID and configuration name. |
| :atomist.skill.configuration/name | string | The name of the skill configuration. |
| :atomist.skill.configuration/parameters | ref | References to configuration parameters. |
| :atomist.skill.configuration/revision | string | If not provided, generated internally from a hash of all the contents. |
| :atomist.skill.configuration.capability/id | string | Hash from configuration ID, and capability namespace, name, and usage. |
| :atomist.skill.configuration.capability/name | string | Capability name. |
| :atomist.skill.configuration.capability/namespace | string | Capability namespace. |
| :atomist.skill.configuration.capability/providers | ref | Providers (skills) of capabilities that this skill requires. |
| :atomist.skill.configuration.capability/usage | string | How this skill uses a particular capability (e.g. this MavenRepository is for deployment). |
| :atomist.skill.configuration.capability.provider/configuration-name | string | Capability provider configuration name. |
| :atomist.skill.configuration.capability.provider/id | string | Hash from capability ID, namespace, and name of provider. |
| :atomist.skill.configuration.capability.provider/name | string | Capability provider name. |
| :atomist.skill.configuration.capability.provider/namespace | string | Provider namespace. |
| :atomist.skill.configuration.check/checked-at | instant | Time at which this check was performed. |
| :atomist.skill.configuration.check/conclusion | ref | The conclusion of the configuration check. |
| :atomist.skill.configuration.check/configuration | ref | The owning skill configuration. |
| :atomist.skill.configuration.check/name | string | The name of the configuration check. |
| :atomist.skill.configuration.check/status | ref | The status of the configuration check. |
| :atomist.skill.configuration.check/title | string | The Markdown title of the check. |
| :atomist.skill.configuration.parameter/id | string | Hash from configuration ID and parameter name. |
| :atomist.skill.configuration.parameter/name | string | Name of configuration parameter. |
| :atomist.skill.configuration.parameter/type | string | Type of the parameter. e.g. stringArray |
| :atomist.skill.configuration.parameter/value | string | Stringified EDN representation of value {:value somevalue}. |
| :atomist.skill.subscription/attributes | keyword | Attributes referenced by this subscription. |
| :atomist.skill.subscription/correlation-id | string | Correlation ID associated with triggering transaction. |
| :atomist.skill.subscription/id | string | Hash from skill ID and subscription name. |
| :atomist.skill.subscription/is-schedule? | boolean | Does this subscription contain schedule-rules? |
| :atomist.skill.subscription/limit | long | Datalog query result limit. |
| :atomist.skill.subscription/name | string | Name of the subscription. |
| :atomist.skill.subscription/public-tx? | boolean | Does this subscription a public-tx? |
| :atomist.skill.subscription/query-edn | string | The full query string for a subscription. |
| :atomist.tx/configuration-id | string | Reference to a skill configuration ID from which the transaction originates. |
| :atomist.tx/correlation-id | string | Correlation ID as passed to the transacting skill. |
| :atomist.tx/entities | ref | Reference to things created or asserted by this transaction. |
| :atomist.tx/execution-correlation-id | string | Execution correlation ID as passed to the transacting skill (if available). |
| :atomist.tx/original-correlation-id | string | ID assigned by incoming webhooks. |
| :atomist.tx/previous-execution-correlation-id | string | Execution correlation ID of a previous execution that may have transacted. |
| :atomist.tx/principle | tuple | Identity of the user performing the transaction (if available) [pid sub]. |
| :atomist.tx/skill-name | string | Name of transacting skill. |
| :atomist.tx/skill-namespace | string | Namespace of transacting skill. |
| :atomist.tx/subscription-name | string | Name of the subscription that fired. |
| :atomist.tx/subscription-tx | ref | Reference to the transaction that triggered the subscription that led to this transaction. |
| :atomist.tx/webhook-name | string | Name of the webhook that fired (if any). |