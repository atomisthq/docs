While the [Atomist Skills Catalog][catalog] provides large number of useful
skills, many users will have the need to create their own custom skill from time
to time.

The simplest way to create your own skill is to use the [Docker Container Runner
skill][container-run-skill]. The Docker Container Runner skills allows you to
run any Docker image you want whenever activity occurs in GitHub, whenever there
is activity in chat, on a regular schedule, and even in response to custom
events you or your tools. For example, you can run a container skill that sends
a chat message whenever an issue in Jira is opened or that rebuilds your Docker
images whenever a new base image is pushed to Docker Hub. Enable the [Docker
Container Runner skill][container-run-skill] for your team or see the
[Container Skill documentation](container-skills.md) for more information.

You can also create skills using your favorite programming language. More
information on how to do that will be made available at a later time.

[catalog]: https://go.atomist.com/catalog "Atomist Skills Catalog"
[container-run-skill]: https://go.atomist.com/catalog/skills/atomist/container-run-skill "Docker Container Runner Skill"
