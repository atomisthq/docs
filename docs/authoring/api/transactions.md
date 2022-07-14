## Send transactions

`POST /executions/{execution-id}/transactions`

Allows posting of transactions in relation to a particular execution.

Authed via scoped JWT using `aud` value which matches the execution ID (provided in the `token` field of the trigger.

Request body is `[ExecutionTransactionsPost](https://www.notion.so/Skill-contract-1-69e8673392f44774a840d394f2e1ecb3)`.

Success response body will be empty.

Failure response body will be an `[Error](https://www.notion.so/Skill-contract-1-69e8673392f44774a840d394f2e1ecb3)`.

### Response codes

| Code | Description |
| :--- | :---- |
| 202 | The transactions have been queued to be stored |
| 400 | Bad request |
| 404 | Execution with given `execution-id` wasn't found |
| 500 | Server error |

### Example

Incoming skill payloads contain URLs and temporary tokens to POST new facts back to Atomist.  Skill authors may choose to wrap these api calls is convenience functions, but the api is just an HTTP POST.  The url and token must be extracted from the payload at `payload.urls.transactions` and `payload.token` respectively.

```
cat <<'EOF' > transactions.edn
{:data
 [{:schema/entity-type :vonwig.testing/observation
   :vonwig.testing.observation/id "123466789"
   :vonwig.testing.observation/seen-by-subscriber: false
   :vonwig.testing.observation/webhook-value "data"}]}
EOF

curl -X POST \
     -d "$(< transactions.edn)" \
     -H "Authorization: Bearer ${TOKEN}" \
     -H "Content-Type: application/edn" \
     $URL
```
