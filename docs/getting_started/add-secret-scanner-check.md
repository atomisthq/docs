## Adding code Secret Scanning GitHub check

### Overview

Prevent leaking API keys, access tokens, passwords and other sensitive data by keeping them out of your codebase. Secret Scanner detects and alerts you when secrets are committed in your code and configuration in a GitHub repository. It helps prevent secrets from being exposed by adding a failed GitHub Check when a secret is detected.

Secret Scanner automatically scans for access and API keys for Twitter, Facebook, Google, Stripe, Square, PayPal, AWS, Twilio, Mailchimp, Mailgun and Picatic API. Secret Scanner supports adding patterns to detect other secrets not detected by default. Add scanning support for other tools with a simple regular expression.

### Configuration

Enable the Secret Scanner [here](https://go.atomist.com/catalog/skills/atomist/github-secret-scanner-skill), selecting the repositories for which you would like a a created.

Add `github/github-secret-scanner-skill` to your Image Policy by following the instructions for [image checks](checks.md)

### Configuration via GraphQL

It's also possible to configure Secret Scanning via the GraphQL api.

Save the following GraphQL snippet to a file

```shell
cat <<'EOF' > secrets.graphql
mutation enableSecretScanner {
  saveSkillConfiguration(name: "github-secret-scanner-skill",
                         namespace: "atomist",
                         configuration: {
                           name: "default",
                           parameters: [{
                            repoFilter: {
                              name: "repos",
                              value: {}}}],
                           enabled: true}) {__typename}}
EOF
```

And use `curl` to send to the Atomist API.

Now execute the script below. You’ll need to set the TEAM and the API_KEY to your `workspace-id` and an `api-key`.

```shell
ATOMIST_API_KEY=<api-key>
ATOMIST_WORKSPACE_ID=<workspace-id>

curl -X POST \
     -d '{"query": "'"$(sed 's/"/\\"/g' < secrets.graphql)"'" }' \
     -H "Authorization: Bearer ${ATOMIST_API_KEY}" \
     -H "Content-Type: application/json" \
     https://automation.atomist.com/graphql/team/${ATOMIST_WORKSPACE_ID}
```

* `workspace-id`
    * Grab your workspace ID from https://dso.atomist.com/r/auth/policies
* `api-key`
    * Used to authenticate with the Atomist API and managed here https://dso.atomist.com/r/auth/integrations

#### Adding to Image Policy

To add this check to your Image Policy for an environment, it's just a case of adding the `github-secret-scanner-skill` GitHub check to the policy as configured at [Image Checks](checks.md). For example, if your policy previously looked like this:

```shell
cat <<'EOF' > rules.json
{"rules": ["demo/production:github/docker-vulnerability-policy"]}
EOF
```

requiring secret scanning in the `demo/production` policy would look like:

```shell
cat <<'EOF' > rules.json
{"rules": ["demo/production:github/docker-vulnerability-policy", 
           "demo/production:github/github-secret-scanner-skill"]}
EOF
```
