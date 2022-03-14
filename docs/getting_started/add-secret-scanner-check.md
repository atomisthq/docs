## Adding code Secret Scanning GitHub check

### Overview

Prevent leaking API keys, access tokens, passwords and other sensitive data by keeping them out of your codebase. Secret Scanner detects and alerts you when secrets are committed in your code and configuration in a GitHub repository. It helps prevent secrets from being exposed by adding a failed GitHub Check when a secret is detected.

Secret Scanner automatically scans for access and API keys for Twitter, Facebook, Google, Stripe, Square, PayPal, AWS, Twilio, Mailchimp, Mailgun and Picatic API. Secret Scanner supports adding patterns to detect other secrets not detected by default. Add scanning support for other tools with a simple regular expression.

### Configuration with curl

Save the following GraphQL snippet to a file

```shell

cat <<'EOF' | sed 's/"/\\"/g' > secrets.graphql
mutation enableSecretScanner {
  saveSkillConfiguration(name: "github-secret-scanner-skill",
                         namespace: "atomist",
                         configuration: {
                           name: "default",
                           parameters: [{
                            repoFilter: {
                              name: "repos",
                              value: {
                                
                              }
                            }
                          }],
                           enabled: true
                         }) {
    __typename
  }
}
EOF


```

And use curl to send to the Atomist API.

Now execute the script below. You’ll need to set the TEAM and the API_KEY to your `workspace-id` and an `api-key`.

```shell
ATOMIST_API_KEY=<api-key>
ATOMIST_WORKSPACE_ID=<workspace-id>

curl -X POST \
     -d '{"query": "'"$(< secrets.graphql)"'" }' \
     -H "Authorization: Bearer ${ATOMIST_API_KEY}" \
     -H "Content-Type: application/json" \
     https://automation.atomist.com/graphql/team/${ATOMIST_WORKSPACE_ID}
```

* `workspace-id`
    * The Atomist workspace ID to configure. Visit https://dso.atomist.com/r/auth/overview/images and grab the workspace ID from the URL. e.g. the workspace ID for https://dso.atomist.com/AQ1K5FIKA/overview/images is AQ1K5FIKA
* `api-key`
    * Used to authenticate with the Atomist API and managed here https://dso.atomist.com/r/auth/integrations


More fined grained configuration, for example adding your own secret patterns, excluding false positives, or constraining which repositories are scanned and be managed at: https://go.atomist.com/catalog/skills/atomist/github-secret-scanner-skill
