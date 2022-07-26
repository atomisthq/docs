## Skill Management

### Enabling a skill

To enable a skill, you must know the `namespace` and `name` of the skill.  Construct and navigate to the url `https://go.atomist.com/catalog/skills/{namespace}/{name}?stability=unstable`. This will provide you with a form to configure the first set of parameters for your new skill configuration.

!!! Note
    We no longer support a gitops flow for skill enable/config.  However, we could write a skill to monitor a git repo and then converge skill configuration using our skill graphql apis (an `atomist/skill-configuration-skill`). Our previous model used git as the source of truth, and suffered from conflict resolution problems. Adding gitops on top of our current model is now straight forward.

When you navigate to the url above, you'll see a form customized for the skill you're enabling.
    
![untitled](images/enable-skill.png)

### Configuring a skill

You can find all of the configured skills in the [Manage Skills page](https://go.atomist.com/r/auth/manage/skills).  Use the edit buttons on the forms to make updates to the parameter values, or remove the skill configuration.

![untitled](images/manage-skills.png)

### Promoting a skill

Skill versions can be tagged as `stable`, `unstable`, or `testing`. New versions of skill will be marked `unstable` by default. Whenever a new version gets tagged to either of the promotion levels, workspaces that use the promotion level are being automatically updated to the new version of the skill.

To promote a skill to `testing` or `stable` use the following API call:

```bash
$ curl --location --request POST 'https://automation.atomist.com/graphql/team/<workspace id>' \
    --header 'Authorization: Bearer <api key>' \
    --header 'Content-Type: application/json' \
    --data-raw '{"query":"mutation setSkillMaturity { setSkillMaturity(namespace:\"<skill namespace>\", name: \"<skill name>\", version: \"<skill version>\", maturity: stable) { version }}"}'
```

### Selecting a promotion level

Workspace owners can select different promotion levels for skills in their workspace individually. 

Use the following API call to select the promotion level for a single skill:

```bash
$ curl --location --request POST 'https://automation.atomist.com/graphql/team/<workspace id>' \
    --header 'Authorization: Bearer <api key>' \
    --header 'Content-Type: application/json' \
    --data-raw '{"query":"mutation setUpgradePolicy { setUpgradePolicy(namespace:\"<skill namespace>\", name: \"<skill name>\", upgradePolicy: unstable) { version }}"}'
```

### Publishing a skill

Skills all start as private to the workspace that owns them.  They can be enabled and configured in only that workspace.  Users can share a skill with other workspaces by publishing it to the catalog. 

Only `stable` versions can be published.

```bash
$ curl --location --request POST 'https://automation.atomist.com/graphql/team/<workspace id>' \
    --header 'Authorization: Bearer <api key>' \
    --header 'Content-Type: application/json' \
    --data-raw '{"query":"mutation publishSkill {  publishSkill(namespace: \"<skill namespace>\", name: \"<skill name>\") { version }}"}'
```

