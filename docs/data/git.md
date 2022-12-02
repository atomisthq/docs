| attribute | type | doc |
| :---- | :---- | :---- |
| :email.email/address | string | Email address. |
| :git.commit/author | ref | Person who wrote a Git commit. |
| :git.commit/committer | ref | Person who pushed a Git commit. |
| :git.commit/email | ref | Email address of a Git commit author. |
| :git.commit/file | ref | Files included in a commit. |
| :git.commit/message | string | Git commit message. |
| :git.commit/not-file-paths | string | Files _not_ included in a commit. |
| :git.commit/parents | ref | Parent commits of a Git commit. |
| :git.commit/repo | ref | Repository of a Git commit. |
| :git.commit/sha | string | SHA revision of a Git commit. |
| :git.commit/timestamp | string | Timestamp of a Git commit. |
| :git.commit/url | string | HTTPS address of a Git commit. |
| :git.commit.file/indexed-count | long | Number of files indexed for a commit. |
| :git.file/path | string | The path of a file in a Git repository. |
| :git.file/scan-results | ref | link sarif scan results directly to a file |
| :git.file/sha | string | The SHA digest of the contents of a file. |
| :git.org/name | string | The name of a Git organization or namespace. |
| :git.org/onboarding-repo-count | long | The number of integrated repositories for an organization or namespace. |
| :git.org/onboarding-repos-skipped | long | The number of repositories not integrated for an organization or namespace. |
| :git.org/onboarding-state | string | The state of integration for a repository: whether or not the repository onboarding has completed. |
| :git.org/provider-base-url | string | The HTTPS address of the GitHub organization. |
| :git.org/source-id | string | The ID of a Git organization. |
| :git.org/url | string | The HTTPS address of the Git organization or namespace. |
| :git.provider/url | string | The URL of a Git provider. |
| :git.ref/commit | ref | Git commit that the ref points to. |
| :git.ref/name | string | Name of a Git branch or tag. |
| :git.ref/remote | boolean | Whether the branch or tag is remote to the repository, e.g. an incoming pull request from a fork. |
| :git.ref/repo | ref | The Git repository that a branch or tag belongs to. |
| :git.ref/type | ref | Whether a Git ref is a branch or a tag. |
| :git.ref/url | string | HTTPS address of a Git branch or tag. |
| :git.ref.type/branch | enum | Branch ref type. |
| :git.ref.type/tag | enum | Tag ref type. |
| :git.repo/chat-channels | ref | Name or address of a chat channel associated with a Git repository. |
| :git.repo/default-branch | string | Name of the default branch of a Git repository. |
| :git.repo/name | string | Name of a Git repository. |
| :git.repo/org | ref | Organization or namespace of a Git repository. |
| :git.repo/source-id | string | ID string of a Git repository. |
| :git.repo/topics | string | Topics that a Git repository is associated with. |
| :git.repo/url | string | HTTPS address of a Git repository. |
| :git.repo-language/bytes | long | Size of programming language source code in a Git repository, for a specific language, in bytes. |
| :git.repo-language/name | string | Name of the primary programming language of a Git repository. |
| :git.repo-language/repo | ref | Reference to a Git repository that contains source code. |
| :git.user/avatar | string | HTTPS address of a Git user's avatar. |
| :git.user/emails | ref | Email addresses of a Git user. |
| :git.user/login | string | Account username of a Git user. |
| :git.user/name | string | Display name of a Git user. |
| :github.checkrun/action | ref | The action of the check run. |
| :github.checkrun/checksuite | ref | Reference to the check suite of a check. |
| :github.checkrun/conclusion | ref | The conclusion of the check run. |
| :github.checkrun/external-id | string | Reference of the check on the integrator's system. |
| :github.checkrun/name | string | The name of the check run. |
| :github.checkrun/requested-action-id | string | The request ID of the check run. |
| :github.checkrun/source-id | string | The ID of a GitHub check. |
| :github.checkrun/status | ref | The status of the check run. |
| :github.checkrun.action/completed | enum | The action of the check run is 'completed'. |
| :github.checkrun.action/created | enum | The action of the check run is 'created'. |
| :github.checkrun.action/requested | enum | The action of the check run is 'requested'. |
| :github.checkrun.action/requested_action | enum | The status of the check run is 'requested_action'. |
| :github.checkrun.action/rerequested | enum | The action of the check run is 'rerequested'. |
| :github.checkrun.conclusion/action_required | enum | Check run completed with a 'action_required' result. |
| :github.checkrun.conclusion/cancelled | enum | Check run completed with a 'cancelled' result. |
| :github.checkrun.conclusion/failure | enum | Check run completed with a 'failure' result. |
| :github.checkrun.conclusion/neutral | enum | Check run completed with a 'neutral' result. |
| :github.checkrun.conclusion/skipped | enum | Check run completed with a 'skipped' result. |
| :github.checkrun.conclusion/stale | enum | Check run completed with a 'stale' result. |
| :github.checkrun.conclusion/success | enum | Check run completed with a 'success' result. |
| :github.checkrun.conclusion/timed_out | enum | Check run completed with a 'timed_out' result. |
| :github.checkrun.status/completed | enum | The current status of the check run is 'completed'. |
| :github.checkrun.status/in_progress | enum | The current status of the check run is 'in_progress'. |
| :github.checkrun.status/pending | enum | The current status of the check run is 'pending'. |
| :github.checkrun.status/queued | enum | The current status of the check run is 'queued'. |
| :github.checkrun.status/requested | enum | The current status of the check run is 'requested'. |
| :github.checksuite/action | ref | The action of the check suite. |
| :github.checksuite/app-id | long | The ID of the GitHub app that created the check suite. |
| :github.checksuite/app-slug | string | The slug name of the GitHub app that created the check suite. |
| :github.checksuite/commit | ref | The commit associated with the check suite. |
| :github.checksuite/conclusion | ref | The results of a check suite. |
| :github.checksuite/repo | ref | The repository associated with the check suite. |
| :github.checksuite/source-id | string | The ID of the check suite. |
| :github.checksuite/status | ref | The state of a check suite. |
| :github.checksuite.action/completed | enum |  |
| :github.checksuite.action/created | enum |  |
| :github.checksuite.action/requested | enum |  |
| :github.checksuite.action/requested_action | enum |  |
| :github.checksuite.action/rerequested | enum |  |
| :github.checksuite.conclusion/action_required | enum |  |
| :github.checksuite.conclusion/cancelled | enum |  |
| :github.checksuite.conclusion/failure | enum |  |
| :github.checksuite.conclusion/neutral | enum |  |
| :github.checksuite.conclusion/skipped | enum |  |
| :github.checksuite.conclusion/stale | enum |  |
| :github.checksuite.conclusion/startup_failure | enum |  |
| :github.checksuite.conclusion/success | enum |  |
| :github.checksuite.conclusion/timed_out | enum |  |
| :github.checksuite.status/completed | enum |  |
| :github.checksuite.status/in_progress | enum |  |
| :github.checksuite.status/pending | enum |  |
| :github.checksuite.status/queued | enum |  |
| :github.checksuite.status/requested | enum |  |
| :github.comment/author | ref | The user who wrote the comment. |
| :github.comment/body | string | The Markdown body of an issue comment. |
| :github.comment/issue | ref | The issue that the comment refers to. |
| :github.comment/source-id | string | The ID of an issue comment. |
| :github.comment/type | string | The type of issue comment. |
| :github.comment/url | string | The HTTPS address of an issue comment. |
| :github.issue/action | string | The action of the issue. |
| :github.issue/assignees | ref | Any users assigned to the issue. |
| :github.issue/body | string | The Markdown body of the issue. |
| :github.issue/closed-by | ref | The user who closed the issue, if applicable. |
| :github.issue/labels | ref | Any labels applied to the issue. |
| :github.issue/number | long | The number of the issue. |
| :github.issue/opened-by | ref | The user who opened the issue. |
| :github.issue/repo | ref | The repository of the issue. |
| :github.issue/resolved-by | ref | The user who resolved the issue, if applicable. |
| :github.issue/source-id | string | The ID of the issue. |
| :github.issue/state | string | The current state of the issue. |
| :github.issue/title | string | The title of the issue. |
| :github.issue/url | string | The HTTPS address of the issue. |
| :github.label/color | string | The label color. |
| :github.label/default | boolean | The default value of a label. |
| :github.label/name | string | The name of a label. |
| :github.label/source-id | string | The ID of a label. |
| :github.label/url | string | The HTTPS address of a label. |
| :github.org/installation-id | long | The ID of the GitHub app installation. |
| :github.org/installation-token | string | An access token for the GitHub app installation. |
| :github.org/type | string | The GitHub account type. |
| :github.pullrequest/action | string | The action of the pull request. |
| :github.pullrequest/assignees | ref | Any users assigned to the pull requests. |
| :github.pullrequest/author | ref | The author of the pull request. |
| :github.pullrequest/base-commit | ref | The base commit of the pull request. |
| :github.pullrequest/body | string | The Markdown body of a pull request. |
| :github.pullrequest/closed-at | string | When the pull request was closed, if applicable. |
| :github.pullrequest/commits | ref | References to the commits in this pull request. |
| :github.pullrequest/created-at | string | When the pull request was created. |
| :github.pullrequest/destination-branch | ref | The target branch for the pull request. |
| :github.pullrequest/head-commit | ref | The head commit of the pull request. |
| :github.pullrequest/labels | ref | Any labels associated with the pull request. |
| :github.pullrequest/merge-commit | ref | Reference to the merge commit, if the pull request has been merged. |
| :github.pullrequest/merged | boolean | Whether or not the pull request is merged. |
| :github.pullrequest/merged-at | string | When the pull request was merged, if applicable. |
| :github.pullrequest/merged-by | ref | The person who merged the pull request. |
| :github.pullrequest/number | long | The pull request number. |
| :github.pullrequest/repo | ref | The repository of the pull request. |
| :github.pullrequest/requested-reviewers | ref | References to any users who have been requested to review the pull request. |
| :github.pullrequest/reviews | ref | Reviews for the pull request. |
| :github.pullrequest/source-branch | ref | The source branch for the pull request. |
| :github.pullrequest/source-id | string | The internal ID of a pull request. |
| :github.pullrequest/state | string | The state of the pull request. |
| :github.pullrequest/title | string | The title of a pull request. |
| :github.pullrequest/updated-at | string | When the pull request was last updated. |
| :github.pullrequest/url | string | The HTTPS address of the pull request. |
| :github.pullrequest-comment/body | string | The Markdown body of a pull request comment. |
| :github.pullrequest-comment/source-id | string | ID of the comment. |
| :github.pullrequest-comment/url | string | HTTPS address of a pull request comment. |
| :github.pullrequest-review/body | string | The Markdown body content of the review. |
| :github.pullrequest-review/comments | ref | References to comments included in the review. |
| :github.pullrequest-review/commit | ref | The SHA revision of the commit that the review was issued for. |
| :github.pullrequest-review/pull-request | ref | Reference to the pull request that is being reviewed. |
| :github.pullrequest-review/reviewer | ref | The user who issued the review. |
| :github.pullrequest-review/source-id | string | The ID of the pull request review. |
| :github.pullrequest-review/state | string | The current state of the pull request review. |
| :github.release/body | string | Markdown content body of a GitHub release post. |
| :github.release/draft | boolean | Draft state of a GitHub release. |
| :github.release/name | string | Name of a GitHub release. |
| :github.release/prerelease | boolean | Prerelease state of a GitHub release. |
| :github.release/source-id | string | ID of a GitHub release. |
| :github.release/tag | ref | The tag associated with a GitHub release. |
| :sarif.physical-location/uri | string | identifies a source location |
| :sarif.physical-location.region/endLine | long | end line of physical source location |
| :sarif.physical-location.region/startLine | long | start line of physical source location |
| :sarif.result/kind | ref | [sarif kind](https://docs.oasis-open.org/sarif/sarif/v2.0/csprd02/sarif-v2.0-csprd02.html#_Toc10127838) |
| :sarif.result/level | ref | identifier for the sarif level [sarif levels](https://docs.oasis-open.org/sarif/sarif/v2.0/csprd02/sarif-v2.0-csprd02.html#_Toc10127839) |
| :sarif.result/locations | ref | sarif results point at specific source location locations |
| :sarif.result/rule-id | string | the rule that was evaluated to produce this analysis result |
| :sarif.result/run | ref | a static analysis result |
| :sarif.result.kind/fail | enum |  |
| :sarif.result.kind/informational | enum |  |
| :sarif.result.kind/notApplicable | enum |  |
| :sarif.result.kind/open | enum |  |
| :sarif.result.kind/pass | enum |  |
| :sarif.result.kind/review | enum |  |
| :sarif.result.level/error | enum |  |
| :sarif.result.level/none | enum |  |
| :sarif.result.level/note | enum |  |
| :sarif.result.level/warning | enum |  |
| :sarif.result.message/text | string | human readable text for analysis result |
| :sarif.run/commit | ref | references the git commit for this analysis run |
| :sarif.tool.driver/name | string | name of analysis tool - typeically defines a set of analysis rules |
| :team.member/auth-provider-id | string | The ID of the auth provider that the team member is a part of. |
| :team.member/name | string | The name of the team member. |
| :team.member/subject | string | The subject of the team member. Subject as in a 'sub' claim of a JSON web token |
| :user.team/member | ref | The reference to the team/member that represents the authed human that owns the user we are linking from |
| :user.team/skill-config-name | string | The config name of the skill that owns this team user |
| :user.team/skill-name | string | The name of the skill that owns this team user |
| :user.team/skill-namespace | string | The namespace of the skill that owns this team user |