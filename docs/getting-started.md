Atomist for DevSecOps is available in early access now. 
Keep up to date with supported, current Docker base images and keep new vulnerabilities at bay.

[early-access]: https://atomist.com/devsecops (Request early access)

To get up and running quickly, simply sign up, select repositories, then get a summary of your 
Docker security and start improving it.

### Create an account

1. Go to [atomist.com](https://atomist.com) and click the **Try Atomist** button in the top menu

![Try Atomist button](img/getting-started/try-atomist.png)

2. Sign up using your GitHub ID. You will be asked to authorize login with your GitHub ID.

![Sign up](img/getting-started/sign-up.png)

### Configure Image Registry

Start scanning images in your registry by enabling a [Registry Integration](https://dso.atomist.com/r/auth/integrations).  
Specific instructions about each integration are included below.

| Integration | link to documentation |
| :----       | :-----  |
| DockerHub   | [configure namespace and personal access token](integration/dockerhub.md) |
| AWS ECR     | [use cloud formation template](integration/ecr.md) |
| Google GCR  | [uses gcloud](integration/gcr.md) |
| Google GAR  | [uses gcloud](integration/gar.md) |
| GitHub GHCR | [uses Atomist GitHub application](integration/ghcr.md) |

### Linking Images to GitHub

Many images already have metadata that link them back to a git sha.  For example, an image build process can add `org.opencontainer` metadata.  An example of using the docker cli is shown here.

```
docker build \
    --label "org.opencontainers.image.revision=$(git rev-parse HEAD)" \
    --label "org.opencontainers.image.source=https://github.com/my-org/my-repo" \
    --label "com.atomist.containers.image.dockerfile=docker/Dockerfile" \
    -f docker/Dockerfile \
    -t $IMAGE_NAME \
    .
```

We have provided a set of [examples](integration/linking-images.md) for how to ensure that images are built with links back to a git sha.  Atomist also has a GitHub app so that we can link git activity to container images.  Install the GitHub app in the org containing the repositories used to build the images that you will be pushing. [Connect to GitHub](https://dso.atomist.com/r/auth/repositories) using the "Connect Github" link shown below.

![Connect GitHub](img/getting-started/connect-github.png)

### Initial Setup Complete

Atomist is now tracking new container images.  This includes updates to bills of materials, indexing images by package, and tracking both new and existing vulnerabilities.  You can search your images by vulnerability or package using the [image overview page](https://dso.atomist.com/r/auth/overview/images).  This view also breaks down vulnerabilities by layer so that you can see which vulnerabilities are added by layers you own, and which are pulled in from public images that you use.

![Overview](img/getting-started/overview.png)

### Next Steps

Teams use Atomist to protect downstream workloads from new vulnerabilities.  It's also used to help teams track and remediate new vulnerabilities that impact existing workloads.  In the next sections, we'll look at how teams can use atomist to gain visibility into container workload systems like Kubernetes.

* Atomist watches for new advisories from [public sources](getting_started/sources.md), but you can also add your own internal advisories.  Checkout how to [get started with your own advisories](getting_started/private-advisories.md).
* TODO add [gitops](getting_started/pull-oriented.md)
* TODO add [admission control](getting_started/admission-control.md)
* TODO add [falco](getting_started/falco.md)
