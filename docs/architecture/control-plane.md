## Atomist Control Plane

The control plane composes delivery flows from individual functions.  Functions are invoked by the control plane either in response to changes observed in the outside world, or as a result of change triggered by an upstream function. 

### Pull oriented

Pull oriented control flows, such as gitops based flows, bring unique value to devsecops initiatives.  For example, consider the requirement that all images be scanned before being delivered to a test cluster. We can reframe this as test clusters that only pull images that have _already_ been scanned.  By doing so, we create an opportunity to improve our process for all cluster deliveries.

### Skill Functions

Functions attached to the Atomist control plane are called skills.  A Skill can register to receive a webhook, a schedule event, or it can subscribe to changes observed by the control plane. Internally, we tend to call skills that only recieve webhooks or schedules `integration` skills.  All other skills are activated by subscriptions, and we just refer to them as skills.

To summarize, _integration_ skills register themselves to receive webhooks, and can also register schedules so that they can poll external systems.  They can define their own schema, and record facts on the control plane.  A typical pattern for an integration is a webhook fire.  For example, docker registries can fire webhooks each time a new image had been pushed to a registry.

Typical skills register _subscriptions_.  These define rules for how the control plane triggers new work.  They can reconcile both internal and external state changes by scheduling functions that will then record new facts on the control plane. An example of a subscription is one that watches for unscanned images. 

> Aside:  One of the most familiar examples of a subscriptions is CI, which is often a build function that has subscribed to a git push.  Much of cloud native delivery today is being reframed as clusters that know how to pull updates from git (ie the Heroku model).

All skills are packaged as images so that the control plane can schedule the work using standard container orchestration, or "serverless" workloads.

![arch](./architecture-PubSub.drawio.png)

To make this less abstract, let's use the example of a kubernetes cluster that only pulls changes that have not introduced any new vulnerabilities.  In practice, this is equivalent to scanning and evaluating every image that flows into a cluster, whether it was built from source, or pulled from some public registry.  The benefit of control plane choreography is consistency. We can apply this policy uniformly across the entire workload, instead of updating many projects. In essence, we can just turn it on.

![arch1](./architecture-Practical.drawio.png)

Higher level flows are composed from independent functions using an abstraction that we call subscriptions.  These subscriptions are the most powerful aspect of the control plane.  They keep individual functions loosely coupled, and composable.  They allow operators to swap in and out new implementations, and to add whole new steps to the flow.  They provide consistency without any loss of developer autonomy, and they bring consistency and auditability to the delivery flow.

In the example above, the six functions involved in the flow have a distinct set of responsibilities, and can be developed by independent teams. This particular set of functions and subscriptions are part of any default Atomist workspace (out of the box).  However, similar flows can be developed and extended by configuring the control plane with custom functions and subscriptions.

* `GitHub Integration` watches for github activity (eg pushes, pull requests, issues, comments) and records the activity.
* `ECR Integration` watches for new Image pushes, extracts metadata from the image, and records details about the image.
* `Image Scanner` watches for unscanned Images.  It analyzes and records an SBOM describing the contents of each image layer.
* `Dockerfile` watches for updates to Dockerfiles.  It parses the Dockerfile and records details about the instructions, and base image usage.
* `Image CheckRun` watches for image scan results on images linked to git commits.  It maintains a closed loop with developers to keep them informed of the status of their change.
* `Kubernetes Spec Updater` watches for scanned images that have not violated our policy.  Updates the relevant deployment specs are triggered.  In this sense 

Some functions require configuration.  For example, the ECR integration skill requires that an operator run a Cloud Formation template, and then configure a function parameter with a custom AWS role.  In general, every function can register it's own parameters and these will be collected and made available to the function time.  This set of parameters, and all of the active subscriptions is what Atomist calls a "workspace".  The workspace is how operators configure the Atomist control plane to choreograph their flows.

### Composition 

As we mentioned above, the power of the control plane comes from how flows are composed.  Subsriptions provide a declarative mechanism to compose individual functions into flows. Our product focus has been on flows typical of cloud native container security. Some examples of flows that we ship with Atomist are listed here.

* consistent SBOM generation across all container workloads
* impact analysis for new security advisories
* indexing cluster workloads by CVE, and by package
* software supply chain analysis, and policy application

Each of these flows is driven by a set of subscriptions that Atomist has packaged on the default control plane.  To enable them, users simply configure their Atomist workspace, and behind the scenes, the control plane activates these subscriptions.

### Subscriptions

We use [datalog][datalog] to define our subscriptions.  Here, the [datomic database][datomic] has been a huge influence on our work.  In datomic's version of [datalog][datalog], we separate the definition of when something should happen from what data needs to be pulled into the runtime when it's triggered.  This is an amazing insight from the folks at [datomic].

An example subscription from the flow above is the one that looks for images that need to be scanned.

```clj
[:find
   (pull ?docker-image [*])
 :in $ $before-db % ?ctx
 :where
   (on-attribute ?ctx ?docker-image :docker.image/digest _)
   [?platform :docker.platform/image ?docker-image]
   [?platform :docker.platform/os "linux"]]
```

The subscriptions and the extensible schema are documented elsewhere. Two of the important things to understand are the difference between the `:where` and the `:find`.

* the `:where` is a datalog expression that tells the control plane what to watch for.  In this example, we are watching for anything that has inserted a new `:docker.image/digest` attribute on soemthing that has a `:docker.image/platform`  attribute equal to `linux`.  These `:docker.image/digest` and `:docker.image/platform` attributes have been added by the current set of enabled skills.
* the `:find` expression defines the data that should be extracted and sent down the function.  The example above simply says that "all" attributes of the image entity.  This `:find` expression can also pull related entities, and we can use multiple pull expressions to pull data from different parts of our graph.

[datalog]: https://docs.datomic.com/on-prem/query/query.html#why-datalog
[datomic]: https://www.datomic.com

It may also be helpful to think of the `:where` expressions as inputs to a continuous query engine.  Users can continue to extend the schema by defining new attributes for their functions to write on the control plane.  For example, the `:docker.image/digest` attribute is defined below.

```clj
{:db/valueType :db.type/string 
 :db/cardinality :db.cardinality/one}
```

Attributes of this kind are written to the control plane in several places.  For example, when new images are pushed to a registry, detected in a base layer, orin a Pod, or even when an image is referenced in a FROM line inside of a checked in Dockerfile. These are all cases where we the control plane will start scheduling work.

Our potential integration points are open ended because any new integration can add its own schema to the control plane.  The control plane can watch for updates to these attributes, and use the power of datalog to detect complex relationships between entities across different systems.  For example, watching for commit shas that have built images, which have new vulnerabilites becomes straight forward to express using datalog.  This gives us the ideal entry point to feed relevant information back to the developer of that commit.

> Every schema attribute is a potential signal.

### Subscriptions trigger functions

A subscription will trigger functions deployed as container images from either public or private registries.  The Atomist service currently schedules all container workloads on the GCP Cloudrun service.  This provides a turn-key experience for our out of the box delivery flows, and ensures that getting start is as easy as authorizing a registry integration (dockerhub, gcr, gar, or ecr).

We support running on kubernetes clusters, as well as non-containerized Node.js runtimes pulled directly from a git tag.  We recommend started with our out-of-the box flows.  If you need to extend any of these flows, we recommend building your own image and letting us run it on your behalf.  Registering a separate cluster to host your extensions is supported.


