The Drift Report is an overview of aspects of current code, configuration and process across all of your repositories. 
As people create new projects, it's not uncommon for those repository to define their own usage of aspects like dependency 
versions or application configuration; over time, the versions in every repository can "drift" from one other, as some projects 
update more frequently than others. The Drift Report is an easy way to spot and tame these differences so that every repository 
operates closer to the same dependency specifications.

You can use this interface to set explicit policies that establish target versions. 
This can be useful in establishing consistency, as well as ensuring a greater degree of security by ensuring your organization 
maintains current code and configuration.

Strictly speaking, a dependency does not only refer to a package library: it can refer to _any_ predefined project configuration you would like tracked, as we'll see below.

## Viewing drift states

Atomist will automatically analyze the aspects defined for every repository it has access to.

The visualizations in the Drift Report are represented in two ways, depending on what is being tracked:

* A report lists the overall differences in configurations; or
* A report assigns a Drift Level for the dependency as zero, low, medium, or high

The more that different versions of a configuration are found, the more the report is segmented. Similarly, the more that different dependencies are found, the higher its drift becomes. Ideally, you want to ensure that your drift is low, which ensures that the majority of your projects are consistent with each other and with policy.

Based on the repository language, different qualities are reported as having drift:

* For Node.js, different TypeScript versions and npm package dependencies are categorized
* For Java, the Maven and Lein dependencies are analyzed
* For Docker, all the Docker base images and ports in use are broken out
* For Git, repository branch count is grouped by segments from few to many

## Managing drift states

You can set specific dependency policies on your repositories to control their drift. If someone makes a commit that changes the dependency to something that doesn't match the policy, a notification is sent if ChatOps is enabled, and an pull request with the fix can be raised. For example, a policy can establish a version of `^3.0.0` for an npm package to ensure that the dependency stays within those bounds for every repository.

To set a drift policy, click **Manage** next to the drift report. The Manage Policy page consists of a table, where each row represents the different dependency identified. Each dependency contains information about the number of repositories using the package and its drift distribution. Click **Manage** for any given row to set a policy. A drop down lists all of the different versions of the dependency identified. You can select one of these options to define the base acceptable version of the dependency.

You have the option to test this policy out, then enable it. When you click **Choose Repo to Try**, Atomist lists every repository that are not compliant with the selected policy. You can choose a repository, then click **Run on Selected Repo** to establish its dependency version policy.

When you click **Enable**, Atomist will establish the dependency policy across _all_ of the repositories, and ensures that future changes to the dependency won't introduce greater drift.