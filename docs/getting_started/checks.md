### Background

Atomist keeps track of the state of container images by continuously evaluating rules in your Image Policy. For example:

* Does the image have the required `LABEL`s?
* Was the image created by a trusted builder?
* Was the image created from a known git commit sha?
* Has the image been scanned for vulnerabilities?
* Does the image contain any vulnerabilities that are not already present in the currently running version?

Each workload can define a set of mandatory rules.  This allows Atomist to wait for a new image to have all the necessary rules satisifed and then signal to a workload that a new candidate version is ready.  This works well with a gitops workflow where new candidate images can be pulled into a workload once they are ready. Failing rules can be made available to developers via GitHub Checks to indicate why a change was rejected, and these same rules drive tools like kubernetes admission controllers, to ensure that only images that fully satisfy your policy are admitted to selected namespaces.  The combination of gitops controllers, admission controllers, and pluggable image policy, gives teams the ability to plug consistent validation into their cloud native delivery.

### Enable Vulnerability GitHub Check

Start by checking whether a candidate image has additional vulnerabilities when compared to other versions already in existing workloads.  If you're building an image from a pull request commit, this policy will also compare vulnerabilites against any image built from the HEAD commit of your default branch.  [Enable the policy][settings] by navigating to your [settings page][settings].

In the section called `New Image Vulnerabilites`, select the check box that controls whether a GitHub Check should fail when _new_ critical or high severitare found.

![enable-check-run](../img/getting-started/enable-check-run.png)



### Choose Admission Rules

Policies are made up of sets of rules. Atomist comes with some built-in rules, but GitHub Checks can also be used directly as rules in policies. This makes it easy to compose policies from GitHub Checks created by other processes, such as CI/CD systems, to ensure for example, that images have been properly tested, that commits have been signed and so on.

Now that we are checking images for new vulnerabilities, we can begin requiring that certain sets of rules pass before an image is ready to be admitted into an existing workload (for example, see the [section on kubernetes admission control](admission-control.md)).  We can select different rules for different environments.  For example, let's start with the requirement that a Kubernetes cluster named `demo` with a namespace `production` requires the GitHub Check configured above.

From the [policy view][settings], click the "Add first deployment policy" and and add the new GitHub Check we created above:

![add-first-policy](../img/getting-started/add-first-policy.png)

![configure-policy](../img/getting-started/configure-new-policy.png)

[settings]: https://dso.atomist.com/r/auth/policies
