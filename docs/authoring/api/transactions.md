## Send transactions

`POST /executions/{execution-id}/transactions`

Allows posting of transactions in relation to a particular execution.

Authed via scoped JWT which matches the execution ID (provided in the `:token` field of the [`ExecutionTrigger`](types.md#executiontrigger)).

Request body is [`ExecutionTransactions`](types.md#executiontransactions).

Success response body will be empty.

Failure response body will be an [`Error`](types.md#error).

### Response codes

| Code | Description |
| :--- | :--- |
| 202 | The execution transactions have been queued for processing. |
| 400 | Bad request. |
| 401 | Insufficient privileges. |
| 403 | Insufficient privileges. |
| 404 | Execution with given `execution-id` wasn't found. |
| 500 | Server error. |

### Example

Incoming [`ExecutionTrigger`s](types.md#executiontrigger) contain URLs and temporary tokens to `POST` new facts back to Atomist. Skill authors may choose to wrap these API calls is convenience functions, but the API is just an HTTP POST. The url and token must be extracted from the payload at `[:urls :transactions]` and `[:token]` respectively.

```bash
cat <<'EOF' > transactions.edn
{:transactions [{:data {:schema/entity-type :vonwig.testing/observation
                        :vonwig.testing.observation/id "123466789"
                        :vonwig.testing.observation/seen-by-subscriber: false
                        :vonwig.testing.observation/webhook-value "data"}}]}
EOF

curl -X POST \
     -d "$(< transactions.edn)" \
     -H "Authorization: Bearer ${TOKEN}" \
     -H "Content-Type: application/edn" \
     $URL
```
