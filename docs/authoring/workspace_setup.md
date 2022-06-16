## Workspace Setup

Changes to a skill repository will be automatically deployed as long as the workspace has been property configured.  There are 3 prerequisities.

1.  Configure the github integration for the github org containing your skill repositories.  New skill repos in this org will be automatically detected.
2.  Configure a registry integration to detect pushes for your new skill Docker images.
3.  Enable the `atomist/skill-registration-skill` in your workspace.  Click [here to enable](https://go.atomist.com/catalog/skills/atomist/skill-registration-skill?stability=stable).

### GitHub Integration

### Registry Integration

### Automatic Skill Registration

!!! todo
    Users need to automate their Docker builds

Once enabled, your configuration can be edited [here](https://go.atomist.com/r/auth/manage/skills?filter=skill-registration-skill)

!!! todo
    Insert screenshot

