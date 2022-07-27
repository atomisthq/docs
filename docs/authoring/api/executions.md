## Patch execution

`PATCH /executions/{execution-id}`

Allows changes to be made to a subset of execution data. If provided, the `:status` field will be completely replaced rather than merged. Altering the `[:status :state]` to `:queued` will be rejected immediately. Execution state will only be changed to `:queued` internally.

Authed via scoped JWT which matches the execution ID (provided in the `:token` field of the [`ExecutionTrigger`](types.md#executiontrigger)).

Request body is [`ExecutionPatch`](types.md#executionpatch).

Success response body will be empty.

Failure response body will be an [`Error`](types.md#error).

### Response codes

| Code | Description |
| :--- | :--- |
| 202 | The execution patch has been queued to be updated. |
| 400 | Bad request. |
| 401 | Insufficient privileges. |
| 403 | Insufficient privileges. |
| 404 | Execution with given `execution-id` wasn't found. |
| 500 | Server error. |

### Example

Incoming execution trigger payloads contain URLs and temporary tokens to `PATCH` execution changes back to Atomist. Skill authors may choose to wrap these API calls is convenience functions, but the API is just an HTTP POST. The url and token must be extracted from the payload at `[:urls :execution]` and `[:token]` respectively.

```bash
cat <<'EOF' > execution.edn
{:status {:state :completed
          :reason "Completed successfully"}}
EOF

curl -X PATCH \
     -d "$(< execution.edn)" \
     -H "Authorization: Bearer ${TOKEN}" \
     -H "Content-Type: application/edn" \
     $URL
```
