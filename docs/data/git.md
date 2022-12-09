### Attributes
| attribute | type | doc | entities |
| :---- | :---- | :---- | :----- |
| :email.email/address | string | Email address. | :email/email |
| :git.commit/message | string | Git commit message. | :git/commit |
| :git.commit/not-file-paths | string | Files _not_ included in a commit. | :git/commit |
| :git.commit/sha | string | SHA revision of a Git commit. | :git/commit |
| :git.commit/timestamp | string | Timestamp of a Git commit. | :git/commit |
| :git.commit/url | string | HTTPS address of a Git commit. |  |
| :git.commit.file/indexed-count | long | Number of files indexed for a commit. | :git/commit |
| :git.file/path | string | The path of a file in a Git repository. | :git/file |
| :git.file/sha | string | The SHA digest of the contents of a file. | :git/file |
| :git.org/name | string | The name of a Git organization or namespace. | :git/org |
| :git.org/onboarding-repo-count | long | The number of integrated repositories for an organization or namespace. | :git/org |
| :git.org/onboarding-repos-skipped | long | The number of repositories not integrated for an organization or namespace. | :git/org |
| :git.org/onboarding-state | string | The state of integration for a repository: whether or not the repository onboarding has completed. | :git/org |
| :git.org/provider-base-url | string | The HTTPS address of the GitHub organization. | :git/org |
| :git.org/source-id | string | The ID of a Git organization. | :git/org |
| :git.org/url | string | The HTTPS address of the Git organization or namespace. | :git/org |
| :git.provider/url | string | The URL of a Git provider. | :github/checksuite<br/>:git/repo<br/>:git/org<br/>:git/ref<br/>:github/pullrequest<br/>:git/repo-language<br/>:git/user<br/>:github/label<br/>:github/comment<br/>:github/checkrun<br/>:github/issue<br/>:git/commit |
| :git.ref/name | string | Name of a Git branch or tag. | :git/ref |
| :git.ref/remote | boolean | Whether the branch or tag is remote to the repository, e.g. an incoming pull request from a fork. | :git/ref |
| :git.ref/type | enum | Whether a Git ref is a branch or a tag. |  |
| :git.ref/url | string | HTTPS address of a Git branch or tag. |  |
| :git.repo/default-branch | string | Name of the default branch of a Git repository. | :git/repo |
| :git.repo/name | string | Name of a Git repository. | :git/repo |
| :git.repo/source-id | string | ID string of a Git repository. | :git/repo |
| :git.repo/topics | string | Topics that a Git repository is associated with. |  |
| :git.repo/url | string | HTTPS address of a Git repository. | :git/repo |
| :git.repo-language/bytes | long | Size of programming language source code in a Git repository, for a specific language, in bytes. | :git/repo-language |
| :git.repo-language/name | string | Name of the primary programming language of a Git repository. | :git/repo-language |
| :git.user/avatar | string | HTTPS address of a Git user's avatar. | :git/user |
| :git.user/login | string | Account username of a Git user. | :git/user |
| :git.user/name | string | Display name of a Git user. | :git/user |
| :github.checkrun/conclusion | enum | The conclusion of the check run. |  |
| :github.checkrun/external-id | string | Reference of the check on the integrator's system. | :github/checkrun |
| :github.checkrun/name | string | The name of the check run. | :github/checkrun |
| :github.checkrun/requested-action-id | string | The request ID of the check run. | :github/checkrun |
| :github.checkrun/source-id | string | The ID of a GitHub check. | :github/checkrun |
| :github.checkrun/status | enum | The status of the check run. |  |
| :github.checksuite/action | enum | The action of the check suite. |  |
| :github.checksuite/app-id | long | The ID of the GitHub app that created the check suite. | :github/checksuite |
| :github.checksuite/app-slug | string | The slug name of the GitHub app that created the check suite. | :github/checksuite |
| :github.checksuite/conclusion | enum | The results of a check suite. |  |
| :github.checksuite/source-id | string | The ID of the check suite. | :github/checksuite |
| :github.checksuite/status | enum | The state of a check suite. |  |
| :github.comment/body | string | The Markdown body of an issue comment. | :github/comment |
| :github.comment/source-id | string | The ID of an issue comment. | :github/comment |
| :github.comment/type | string | The type of issue comment. | :github/comment |
| :github.comment/url | string | The HTTPS address of an issue comment. | :github/comment |
| :github.issue/action | string | The action of the issue. | :github/issue |
| :github.issue/body | string | The Markdown body of the issue. |  |
| :github.issue/number | long | The number of the issue. | :github/issue |
| :github.issue/source-id | string | The ID of the issue. | :github/issue |
| :github.issue/state | string | The current state of the issue. | :github/issue |
| :github.issue/title | string | The title of the issue. | :github/issue |
| :github.issue/url | string | The HTTPS address of the issue. | :github/issue |
| :github.label/color | string | The label color. | :github/label |
| :github.label/default | boolean | The default value of a label. | :github/label |
| :github.label/name | string | The name of a label. | :github/label |
| :github.label/source-id | string | The ID of a label. | :github/label |
| :github.label/url | string | The HTTPS address of a label. | :github/label |
| :github.org/installation-id | long | The ID of the GitHub app installation. | :git/org |
| :github.org/installation-token | string | An access token for the GitHub app installation. | :git/org |
| :github.org/type | string | The GitHub account type. | :git/org |
| :github.pullrequest/action | string | The action of the pull request. | :github/pullrequest |
| :github.pullrequest/body | string | The Markdown body of a pull request. | :github/pullrequest |
| :github.pullrequest/closed-at | string | When the pull request was closed, if applicable. | :github/pullrequest |
| :github.pullrequest/created-at | string | When the pull request was created. | :github/pullrequest |
| :github.pullrequest/merged | boolean | Whether or not the pull request is merged. | :github/pullrequest |
| :github.pullrequest/merged-at | string | When the pull request was merged, if applicable. | :github/pullrequest |
| :github.pullrequest/number | long | The pull request number. | :github/pullrequest |
| :github.pullrequest/source-id | string | The internal ID of a pull request. | :github/pullrequest |
| :github.pullrequest/state | string | The state of the pull request. | :github/pullrequest |
| :github.pullrequest/title | string | The title of a pull request. | :github/pullrequest |
| :github.pullrequest/updated-at | string | When the pull request was last updated. | :github/pullrequest |
| :github.pullrequest/url | string | The HTTPS address of the pull request. | :github/pullrequest |
| :github.pullrequest-comment/body | string | The Markdown body of a pull request comment. |  |
| :github.pullrequest-comment/source-id | string | ID of the comment. |  |
| :github.pullrequest-comment/url | string | HTTPS address of a pull request comment. |  |
| :github.pullrequest-review/body | string | The Markdown body content of the review. |  |
| :github.pullrequest-review/source-id | string | The ID of the pull request review. |  |
| :github.pullrequest-review/state | string | The current state of the pull request review. |  |
| :github.release/body | string | Markdown content body of a GitHub release post. |  |
| :github.release/draft | boolean | Draft state of a GitHub release. |  |
| :github.release/name | string | Name of a GitHub release. |  |
| :github.release/prerelease | boolean | Prerelease state of a GitHub release. |  |
| :github.release/source-id | string | ID of a GitHub release. |  |
| :sarif.physical-location/uri | string | identifies a source location | :sarif/physical-location |
| :sarif.physical-location.region/endLine | long | end line of physical source location |  |
| :sarif.physical-location.region/startLine | long | start line of physical source location | :sarif/physical-location |
| :sarif.result/kind | enum | [sarif kind](https://docs.oasis-open.org/sarif/sarif/v2.0/csprd02/sarif-v2.0-csprd02.html#_Toc10127838) |  |
| :sarif.result/level | enum | identifier for the sarif level [sarif levels](https://docs.oasis-open.org/sarif/sarif/v2.0/csprd02/sarif-v2.0-csprd02.html#_Toc10127839) |  |
| :sarif.result/rule-id | string | the rule that was evaluated to produce this analysis result | :sarif/result |
| :sarif.result.message/text | string | human readable text for analysis result | :sarif/result |
| :sarif.tool.driver/name | string | name of analysis tool - typeically defines a set of analysis rules | :sarif/run |
| :team.member/auth-provider-id | string | The ID of the auth provider that the team member is a part of. | :team/member |
| :team.member/name | string | The name of the team member. | :team/member |
| :team.member/subject | string | The subject of the team member. Subject as in a 'sub' claim of a JSON web token | :team/member |
| :user.team/skill-config-name | string | The config name of the skill that owns this team user | :chat/user<br/>:git/user |
| :user.team/skill-name | string | The name of the skill that owns this team user | :chat/user<br/>:git/user |
| :user.team/skill-namespace | string | The namespace of the skill that owns this team user | :chat/user<br/>:git/user |

### Relationships

| attribute | doc | from | to |
| :---- | :---- | :---- | :----- |
| :git.commit/author | Person who wrote a Git commit. | :git/commit | :git/user |
| :git.commit/committer | Person who pushed a Git commit. | :git/commit | :git/user |
| :git.commit/email | Email address of a Git commit author. | :git/commit | :email/email |
| :git.commit/file | Files included in a commit. | :git/commit | :git/file |
| :git.commit/parents | Parent commits of a Git commit. | :git/commit | :git/commit |
| :git.commit/repo | Repository of a Git commit. | :git/commit | :git/repo |
| :git.file/scan-results | link sarif scan results directly to a file | :git/file | :sarif/result |
| :git.ref/commit | Git commit that the ref points to. | :git/ref | :git/commit |
| :git.ref/repo | The Git repository that a branch or tag belongs to. | :git/ref | :git/repo |
| :git.repo/chat-channels | Name or address of a chat channel associated with a Git repository. | :git/repo | :chat/channel |
| :git.repo/org | Organization or namespace of a Git repository. | :git/repo | :git/org |
| :git.repo-language/repo | Reference to a Git repository that contains source code. | :git/repo-language | :git/repo |
| :git.user/emails | Email addresses of a Git user. | :git/user | :email/email |
| :github.checkrun/action | The action of the check run. |  |  |
| :github.checkrun/checksuite | Reference to the check suite of a check. | :github/checkrun | :github/checksuite |
| :github.checksuite/commit | The commit associated with the check suite. | :github/checksuite | :git/commit |
| :github.checksuite/repo | The repository associated with the check suite. | :github/checksuite | :git/repo |
| :github.comment/author | The user who wrote the comment. | :github/comment | :git/user |
| :github.comment/issue | The issue that the comment refers to. | :github/comment | :github/issue |
| :github.issue/assignees | Any users assigned to the issue. |  |  |
| :github.issue/closed-by | The user who closed the issue, if applicable. | :github/issue | :git/user |
| :github.issue/labels | Any labels applied to the issue. |  |  |
| :github.issue/opened-by | The user who opened the issue. | :github/issue | :git/user |
| :github.issue/repo | The repository of the issue. | :github/issue | :git/repo |
| :github.issue/resolved-by | The user who resolved the issue, if applicable. |  |  |
| :github.pullrequest/assignees | Any users assigned to the pull requests. |  |  |
| :github.pullrequest/author | The author of the pull request. | :github/pullrequest | :git/user |
| :github.pullrequest/base-commit | The base commit of the pull request. | :github/pullrequest | :git/commit |
| :github.pullrequest/commits | References to the commits in this pull request. | :github/pullrequest | :git/commit |
| :github.pullrequest/destination-branch | The target branch for the pull request. | :github/pullrequest | :git/ref |
| :github.pullrequest/head-commit | The head commit of the pull request. | :github/pullrequest | :git/commit |
| :github.pullrequest/labels | Any labels associated with the pull request. |  |  |
| :github.pullrequest/merge-commit | Reference to the merge commit, if the pull request has been merged. | :github/pullrequest | :git/commit |
| :github.pullrequest/merged-by | The person who merged the pull request. | :github/pullrequest | :git/user |
| :github.pullrequest/repo | The repository of the pull request. | :github/pullrequest | :git/repo |
| :github.pullrequest/requested-reviewers | References to any users who have been requested to review the pull request. |  |  |
| :github.pullrequest/reviews | Reviews for the pull request. |  |  |
| :github.pullrequest/source-branch | The source branch for the pull request. | :github/pullrequest | :git/ref |
| :github.pullrequest-review/comments | References to comments included in the review. |  |  |
| :github.pullrequest-review/commit | The SHA revision of the commit that the review was issued for. |  |  |
| :github.pullrequest-review/pull-request | Reference to the pull request that is being reviewed. |  |  |
| :github.pullrequest-review/reviewer | The user who issued the review. |  |  |
| :github.release/tag | The tag associated with a GitHub release. |  |  |
| :sarif.result/locations | sarif results point at specific source location locations | :sarif/result | :sarif/physical-location |
| :sarif.result/run | a static analysis result | :sarif/result | :sarif/run |
| :sarif.run/commit | references the git commit for this analysis run | :sarif/run | :git/commit |
| :user.team/member | The reference to the team/member that represents the authed human that owns the user we are linking from | :chat/user<br/>:git/user | :team/member |