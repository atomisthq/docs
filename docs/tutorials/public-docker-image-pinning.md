# Tutorial Steps

## Policy:  Public Docker Image Pinning

Achieves repeatable docker builds by switching Dockerfile `FROM` instructions to reference images by manifest (instead
of by tag).  Watches for updates to Tags and offers Pull Requests to developers when a new base image is available.

### Step 1:  Enable policy for public images stored on Docker Hub

This policy watches GitHub pushes for Dockerfiles with `FROM` instructions that reference *public* Docker Image Tags.
The policy will raise a PR to convert any Tag to a Docker digest.  It will then continue to raise PRs whenever that Tag
moves, even if the Dockerfile author switches the Dockerfile to a different Tag.

1. Start by enabling the [Docker Base Image
   Policy](https://go.atomist.com/catalog/skills/atomist/docker-base-image-policy).

Click the Green button "Use this skill" on the [Skill Page](https://go.atomist.com/catalog/skills/atomist/docker-base-image-policy).

![img/public-docker-image-pinning/1.png](img/public-docker-image-pinning/1.png)

2.  Enable the Skill.  This will take the user through the GitHub App integration, and selection of a Docker Registry.

To see a PR that pins to an image digest in a public Docker Hub repo, we won't need to configure an
integration to a private registry.  However, we will need to come back to this when we start tracking updates to tags in
private registries.  For now, you can use the "skip" button to move past this step.

![img/public-docker-image-pinning/2.png](img/public-docker-image-pinning/2.png)


3.  The Docker Base Image Policy configuration screen requires that you first configure the policy.  There are some
    options to customize how `FROM` line tags are managed.  Leave the default settings and simply scroll to the bottom
    of this screen and click the "Enable Skill" button. 

![img/public-docker-image-pinning/4.png](img/public-docker-image-pinning/4.png)

4.  Your policy is now watching the set of Repos that you have selected in the Atomist GitHub app.  To see this in
    action, create a new Repo with a simple Dockerfile.   For example, create an empty Repo in your test org
    called `pinning-test` by running:

```bash
$ export ORG=<replace with you org name>
$ mkdir pinning-test && cd pinning-test && git init
$ cat << END > Dockerfile
FROM ubuntu:devel
ARG REVISION
ARG SOURCE
LABEL org.opencontainers.image.revision=\$REVISION
LABEL org.opencontainers.image.source=\$SOURCE
CMD ["echo", "hello world"]
END
$ git add Dockerfile
$ git commit -m "initial commit"
$ git remote add origin git@github.com:$ORG/pinning-test.git
$ git push -u origin master
```

The Atomist GitHub application will detect this push, and the policy will then create a Pull Request to pin your FROM line.

![img/public-docker-image-pinning/5.png](img/public-docker-image-pinning/5.png)

You'll also see that the policy ran in the "log" tab of your workspace.

![img/public-docker-image-pinning/11.png](img/public-docker-image-pinning/11.png)

Drill in to the Pull Request and note that Atomist has "pinned" the `FROM` clause to the current digest:

![img/public-docker-image-pinning/6.png](img/public-docker-image-pinning/6.png)

If you build using this version of the Dockerfile, you'll always get the same base image.  If the `devel` tag moves,
this repo will receive another pull request (ubuntu is a public docker registry).  This subsequent pull request makes
developers aware that the base image has been updated.  In a subsequent step, we'll also talk about how we detect which
vulnerabilities will be removed by merging this Pull Request.

As mentioned above, this scenario demonstrates tracking images in public registries.  It's a good starting point to walk
through some additional policies:

* What if your `FROM` instruction references an image in a private registry?
* What if you're using multi-stage Dockerfiles (multiple `FROM` clauses)?
* If given a Docker Image digest, can we track it back to the Dockerfile that produced it?  What about creating GitHub
* CheckRuns with Image scan vulnerability data.  Or tracking when an update to a base layer would remove a
* vulnerability?

The next step will be tackling private registries, and getting Image vulnerabilty data pulled back into the Developer
workflow.

### Step 2:  Integrating your private registry

Start by following the instructions to enable the [Docker Hub
integration](https://docs.atomist.services/integration/dockerhub/), including the webhook configuration.

On the next `docker push` to this Repo, Atomist will create a GitHub check to indicate that the Docker Image was
successfully pushed, and linked back to a GitHub Commit.

Try this out in your new `pinning-test` repository (remember to update the `namespace`).  Execute a `docker build` and
`push` from the command line.

```bash
$ docker login --username <docker id>
$ docker build -t <replace with dockerhub namespace>/pinning-test:latest \
--build-arg REVISION=$(git rev-parse HEAD) \
--build-arg SOURCE="Dockerfile" .
$ docker push <replace with dockerhub namespace>/pinning-test:latest
```

Atomist is also now correlating GitHub Pushes and Docker Images pushes. You'll also see additional activity in the log
view as webhook events flow in.

![img/public-docker-image-pinning/13.png](img/public-docker-image-pinning/13.png)

In the background, we have also started to link Docker Images to the version of the Dockerfile that produced them.  This
allows us to enable vulnerability checks that flow back into GitHub Checks. This is the first big pay off as image
scanning data begins to flow back into the developer's view.

### Questions

What did you find most difficult?

What were you expecting to see?

Did the PR make sense?

Do you think your developers would like to see this in their repos?  If not, why not?

