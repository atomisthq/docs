## Workspace Setup

Changes to a skill repository will be automatically deployed as long as the workspace has been property configured.  There are 3 prerequisities.

1. Configure the GitHub integration for the GitHub organization containing your skill repositories
1. Configure a registry integration to detect pushes for your new skill Docker images
1. Enable the `atomist/skill-registration-skill` in your workspace.  Click [here to enable](https://go.atomist.com/catalog/skills/atomist/skill-registration-skill?stability=unstable)  

### GitHub Integration

### Registry Integration

### Automatic Skill Registration

Atomist recognizes new Docker images with image label `com.docker.skill.api.version="container/v2"` as skill Docker images and
starts the skill registration process. At the end of the registration process the skill can be enabled on go.atomist.com.

Skill Docker images need to be linked to the GitHub commit that produced the image. The link between a Docker image and its
GitHub commit is currently done via [image labels](../integration/linking-images.md). 
