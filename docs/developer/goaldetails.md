# Goal Details

When [creating a goal][], you'll supply a [Goal Details][apidoc-goaldetails] object.
Here you can mane some tweaks to your delivery flow.

[apidoc-goaldetails]: https://atomist.github.io/sdm/interfaces/_api_goal_goalwithfulfillment_.fulfillablegoaldetails.html (API Doc for FulfillableGoalDetails)

##

| Property | Description | Default |
|----------|-------------|---------|
| **displayName** | what this goal will be called in the UI | *required* |
| **uniqueName** | a unique name for this goal (within a push) | Generated based on the location in the code. It's better to supply one |
| approval | After the goal completes, should a person push a button before anything else succeeds? | false |
|  preApproval | Before this goal starts should a person push a button to say yes, go ahead with that? | false |
| retry | If this goal fails, should a "Restart" button appear? | false |
| isolate | If possible, run this goal in a Kubernetes job of its own? | false |
| descriptions | Override the descriptions of various goal statuses; see table below | See table below |
| preCondition | You can hold execution of this goal until some external condition is satisfied. See [WaitRules][apidoc-waitrules] | none |
| environment | historically used to distinguish goals destined for test/prod/etc; use uniqueName instead | irrelevant |

#### Description

You can override the displayed description of various goal statuses:

| Property | Default |
|----------|---------|
| canceled | Canceled: <displayName\> |
| completed | Completed: <displayName\> |
| failed | Failed: <displayName\> |
| inProcess | Working: <displayName\> |
| planned | Planned: <displayName\> |
| requested | Ready: <displayName\> |
| stopped | Stopped: <displayName\> |
| waitingForApproval | Approval required: <displayName\> |
| waitingForPreApproval | Start required: <displayName\> |

Continue with [creating a goal][]

[creating a goal]: goal.md#creating-a-goal

[apidoc-waitrules]: https://atomist.github.io/sdm/interfaces/_api_goal_common_creategoal_.waitrules.html (API Doc for WaitRules)
