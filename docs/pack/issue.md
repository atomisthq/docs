This pack contains useful automations around GitHub Issues.

[GitHub][]

[API Doc][api-doc]

[github]: https://github.com/atomist/sdm-pack-issue (GitHub Repository)
[api-doc]: https://atomist.github.io/sdm-pack-issue/ (API Docs)

## Code Inspection Listener

When a code inspection fails, you might want it to create an issue on the repository.
This pack has a code inspection listener for this.

Call `singleIssuePerCategoryManaging` to get a listener, and register it on your
code inspection goal. For instance:

<!-- atomist-sdm:goals.ts -->
```typescript
    autoCodeInspection.with(RunTslint)
        .withListener(singleIssuePerCategoryManaging("tslint")
```

Here, the RunTsLint inspection will create ReviewComments with a category of "tslint". Then
the singleIssuePerCategory inspection listener will create, maintain, and close one issue per branch
on the repository, according to the latest results from that inspection. By default this listener
will assign the issue to the person who pushed the change that triggered inspection comments, and
will only create an issue for the master branch. You can pass arguments to change this; see the
[API docs][apidoc-sipcm] for details.

[apidoc-sipcm]: https://atomist.github.io/sdm-pack-issue/modules/_lib_review_issuemanagingreviewlisteners_.html#singleissuepercategorymanaging (API Doc for singleIssuePerCategoryManaging)

