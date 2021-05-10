# Example: Responding to issue creation

The following example notifies any user who raises an issue with
insufficient detail in the body, via a direct message in Slack, and
provides them with a helpful link to the issue. Note that we make use
of the person available via the `openedBy` field:

```typescript
export async function requestDescription(inv: NewIssueInvocation) {
    if ((!inv.issue.body || inv.issue.body.length < 10) && inv.issue.openedBy.person.chatId) {
        await inv.context.messageClient.addressUsers(
            `Please add a description for new issue ${inv.issue.number}: _${inv.issue.title}_: ${inv.id.url}/issues/${inv.issue.number}`,
            inv.issue.openedBy.person.chatId.screenName);
    }
}
```

This is registed with a `SoftwareDeliveryMachine` instance as follows:

```typescript
sdm.addNewIssueListeners(requestDescription)
```

Using the `credentials` on the `NewIssueInvocation`, you can
use the GitHub API to modify the issue, for example correcting
spelling errors.
