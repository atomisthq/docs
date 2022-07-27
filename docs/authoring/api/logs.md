## Send logs

`POST /executions/{execution-id}/logs`

Allows posting of logs in relation to a particular execution.

Authed via scoped JWT which matches the execution ID (provided in the `:token` field of the [`ExecutionTrigger`](types.md#executiontrigger)).

Request body is [`ExecutionLogs`](types.md#executionlogs).

Success response body will be empty.

Failure response body will be an [`Error`](types.md#error).

### Response codes

| Code | Description |
| :--- | :--- |
| 202 | The execution logs have been queued for processing. |
| 400 | Bad request. |
| 401 | Insufficient privileges. |
| 403 | Insufficient privileges. |
| 404 | Execution with given `execution-id` wasn't found. |
| 500 | Server error. |

### Example

Incoming [`ExecutionTrigger`s](types.md#executiontrigger) contain URLs and temporary tokens to `POST` logs back to Atomist. Skill authors may choose to wrap these API calls is convenience functions, but the API is just an HTTP POST. The url and token must be extracted from the payload at `[:urls :logs]` and `[:token]` respectively.

```bash
cat <<'EOF' > logs.edn
{:logs [{:timestamp "2022-01-01T00:00:00.000Z"
         :level :info
         :text "Some log text"}
        {:timestamp "2022-01-01T00:00:01.000Z"
         :level :debug
         :text "Some more log text"}]}
EOF

curl -X POST \
     -d "$(< logs.edn)" \
     -H "Authorization: Bearer ${TOKEN}" \
     -H "Content-Type: application/edn" \
     $URL
```
