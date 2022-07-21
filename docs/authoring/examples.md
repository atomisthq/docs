## Example Skill Repositories

| Sample Repo | Summary | Details |
| :---------- | :------- | :----  |
| [Sample Skill written in GO](https://github.com/atomist-skills/go-sample-skill) | uses GitHub integration to watch for pushes and transact facts about commit signatures | [jump to description](#sample-skill-written-in-go) |
| [Sample Skill written in JavaScript #1](https://github.com/atomist-skills/js-sample-skill) | uses GitHub integration to watch for pushes and transact facts about commit signatures | [jump to description](#sample-skill-written-in-js-1) |
| [Sample Skill written in TypeScript](https://github.com/atomist-skills/ts-sample-skill) | uses GitHub integration to watch for pushes and transact facts about commit signatures | [jump to description](#sample-skill-written-in-ts) |
| [Sample Skill written in JavaScript #2](https://github.com/vonwig/skill-sample-2) | creates a webhook and transacts a simple fact, which then triggers a subsciption (does not require any integrations to try) | [jump to description](#sample-skill-written-in-javascript) |
| [Sample Skill written in ClojureScript](https://github.com/vonwig/skill-sample-1) | watches for extracted SBOMs after a docker image push | [jump to description](#sample-skill-written-in-clojurescript) |

### Sample Skill written in GO

This skill uses the Go module [`https://github.com/atomist-skills/go-skill`](https://github.com/atomist-skills/go-skill) to implement handlers for two subscriptions. 

The first subscription [`on_push`](https://github.com/atomist-skills/go-sample-skill/blob/main/datalog/subscription/on_push.edn) listens for pushes to a GitHub repository and transact details about the commit signature back into Atomist. The [`commit_signature.edn`](https://github.com/atomist-skills/go-sample-skill/blob/main/datalog/schema/commit_signature.edn) Datalog schema defines some new facts to represent commit signatures in our data model and link a signature to our existing `:git/commit` entity.

A second subscription [`on_commit_signature`](https://github.com/atomist-skills/go-sample-skill/blob/main/datalog/subscription/on_commit_signature.edn) subscribes to the creation of the link between a `:git.commit/signature` and its `:git/commit` via `(attributes-tx ?ctx ?signature :git.commit.signature/commit ?commit)`. The corresponding event handler function only logs details about the commit.

See [README.md](https://github.com/atomist-skills/go-sample-skill/blob/main/README.md) for more details.

### Sample Skill written in JavaScript #1

This JavaScript skill uses the NPM package [`@atomist/skill`](https://github.com/atomist-skills/skill) to implement handlers for two subscriptions. The functionality is the same as the [go-sample-skill](#sample-skill-written-in-go).

See [README.md](https://github.com/atomist-skills/js-sample-skill/blob/main/README.md) for more details.

### Sample Skill written in TypeScript

This skill uses the NPM package [`@atomist/skill`](https://github.com/atomist-skills/skill) to implement handlers for two subscriptions. The functionality is the same as the [go-sample-skill](#sample-skill-written-in-go).

See [README.md](https://github.com/atomist-skills/ts-sample-skill/blob/main/README.md) for more details.

### Sample Skill written in JavaScript #2

### Sample Skill written in ClojureScript

