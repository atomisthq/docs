## Succesful execution

The typical lifecycle of a successful execution is as follows:

* Some data is transacted into Atomist which causes an execution of a skill to be triggered.
* Atomist triggers an HTTP `POST` on the webhook URL for the execution. Execution is given a status of `:running`.
* Execution begins within the runtime when the `POST` is received. The body of this post is an [`ExecutionTrigger`](types.md#executiontrigger).
* Skill sends logs indicating that it has started in the form of an [`ExecutionLogs`](types.md#executionlogs) body. See [Logs](logs.md) for more information on sending logs.
* Skill does some work and submits facts back to Atomist in the form of an [`ExecutionTransactions`](types.md#executiontransactions) body. See [Transactions](transactions.md) for more information on sending transactions.
* Skill sends logs indicating that it has finished.
* Skill patches the execution to change the status to `:completed` with a suitable reason in the form of an [ExecutionPatch](types.md#executionpatch) body. See [Executions](executions.md) for more information on updating an execution's status.

## Failed execution

An example lifecycle for a failed execution might be:

* Some data is transacted into Atomist which causes an execution of a skill to be triggered.
* Atomist triggers an HTTP `POST` on the webhook URL for the execution. Execution is given a status of `:running`.
* Execution begins within the runtime when the `POST` is received. The body of this post is an [`ExecutionTrigger`](types.md#executiontrigger).
* Skill sends logs indicating that it has started in the form of an [`ExecutionLogs`](types.md#executionlogs) body. See [Logs](logs.md) for more information on sending logs.
* Skill does some work but fails.
* Skill sends logs about the failure.
* Skill patches the execution to change the status to `:failed` with a suitable reason in the form of an [ExecutionPatch](types.md#executionpatch) body. See [Executions](executions.md) for more information on updating an execution's status.
