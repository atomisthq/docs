The Atomist SDM is event-driven, and can react to actions performed by members of your team. But what does this mean, exactly? The purpose of this guide is to list out some common scenarios we've seen in organizations and a high-level overview of the way which Atomist can help: the events it listens to and the SDM components you might use to automate your work.

## Seed repositories

Often, you will want every repository in an organization to use some set of pre-approved files. For example, perhaps every new project requires a specific software license. You can make use of Atomist's capability to generate new repositories from [a seed repository](/developer/create/). A seed repo can be thought of as a static template from which new repositories can be created. It's different from a regular Git fork in that the new repository is in its own network and with its own history.

### Events you can use

* [Repository creation](/developer/event/#repository-creation)

### Components you can use

* [`GeneratorRegistration`](https://atomist.github.io/sdm/modules/_lib_api_registration_generatorregistration_.html)

## Detecting files in a repository

You may wish for files in a repository to conform to a set of guidelines. For example, enforcing a specific version of a package, or making sure that every project has a contributing guide and a code of conduct. Atomist allows you to [inspect repositories](/developer/inspect/) to detect whether files meet conditions you define.

### Events you can use

* Code pushes

### Components you can use

* [`RepoTargetingParameters`](https://atomist.github.io/sdm/interfaces/_lib_api_helper_machine_repotargetingparameters_.repotargetingparameters.html)
* [`CodeInspection`](https://atomist.github.io/sdm/modules/_lib_api_registration_codeinspectionregistration_.html#codeinspection)

## Modifying files in a repository

Atomist can also modify files via its [code transform](/developer/transform/) functionality. This can be useful if files needs to be linted to be rewritten to adhere to a standard.

### Events you can use

* Code pushes
* Pull request creation

### Components you can use

* [`PushListenerInvocation`](https://atomist.github.io/sdm/interfaces/_lib_api_listener_pushlistener_.pushlistenerinvocation.html)
* [`CodeTransformRegistration`](https://atomist.github.io/sdm/interfaces/_lib_api_registration_codetransformregistration_.codetransformregistration.html)
