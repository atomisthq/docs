Atomist Project Templates are projects used by Atomist to create new projects. If you find yourself creating a type of microservice frequently, distilling that into an Atomist Project Template that you, your team and even the wider community can use will really speed up your software development.

> ***NOTE:*** Atomist Project Templates are even more helpful when it comes to working with microservices... Creating new microservices frequently is often a core skill in working with this architectural style and Atomist Project Templates get you focussed on the unique code that you really need to write in those new services without being distracted by re-coding the wheel every time.

## What can you expect to find in an Atomist Project Template?

Atomist Project Templates consist of a mix of static and dynamic content usually within a specific GitHub repository. Templates use [Velocity VLTL](http://velocity.apache.org/) as a templating language. JavaScript within a template may also be used to compute and expose additional parameters or create files directly.

Atomist templates can be invoked with or without a service contract (a definition of a microservice). Simple templates may ignore contracts, but templates that are service contract-aware must generate a valid application whether or not an actual service contract is supplied.

* ***NOTE:*** Templates are normally sourced from a single GitHub repo although underneath the hood the templating system is independent of GitHub.

## Structure of an Atomist Project Template

An Atomist Project Template is configured as a project in GitHub in its own right, and it following a common structure that is shown in the following:

```
/
  /meta
  /project
  /templates
```

These directories contain:

* ***/project*** (required): Contains content that will be copied into generated projects. Filenames may contain variable references. The template language is Velocity. Filenames are templates if they end with _.vm. This extension will be removed on template expansion. For example, TestApplication.java_.vm will be evaluated, with the result being named TestApplication.java.
* ***/meta*** (required): Contains information used by the Atomist template system. Never copied into generated projects.
* ***/templates*** (optional): Velocity templates that will be processed explicitly by code. Never copied directly into your projects. Velocity templates under /templates normally end with the customary Velocity .vm extension.

Content in the root or in any folder other than these three will be ignored and will not be copied to generated projects. It is however also common, but not mandated, to have an appropriate `README.md` and `LICENSE` file for your template as well.

## Lifecycle of an Atomist Project Template



## Public and Private Templates

Atomist supports private and public templates. When a template is published it is declared to be private or public (with private being default).

The key differences between the two levels is best shown in the following figure.

TBD Figure of how private and public templates are exposed, possibly embelishing the existing project template lifecycle documentation.

