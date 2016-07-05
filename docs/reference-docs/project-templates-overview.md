Atomist Project Templates are projects used by Atomist to create new projects. If you find yourself creating a type of microservice frequently, distilling that into an Atomist Project Template that you, your team and even the wider community can use will really speed up your software development.

> ***NOTE:*** Atomist Project Templates are even more helpful when it comes to working with microservices... Creating new microservices frequently is often a core skill in working with this architectural style and Atomist Project Templates get you focussed on the unique code that you really need to write in those new services without being distracted by re-coding the wheel every time.

## What can you expect to find in an Atomist Project Template?

Atomist Project Templates consist of a mix of static and dynamic content usually within a specific GitHub repository. Templates use [Velocity VLTL](http://velocity.apache.org/) as a templating language. JavaScript within a template may also be used to compute and expose additional parameters or create files directly.

Atomist templates can be invoked with or without a service contract (a definition of a microservice). Simple templates may ignore contracts, but templates that are service contract-aware must generate a valid application whether or not an actual service contract is supplied.

* ***NOTE:*** Templates are normally sourced from a single GitHub repo although underneath the hood the templating system is independent of GitHub.

## Lifecycle of an Atomist Project Template

Templates are normally defined in GitHub repositories but must be published to be available to your team.

## Templates and Contracts

Atomist templates can be invoked with or without a service contract (definition of a microservice). Simple templates may ignore contracts, but templates that are contract-aware must generate a valid application whether or not a contract is supplied.

## Template Identification

Templates are identified by group/artifact/version (GAV), following the widely adopted practice of Maven and other tools.

For example, the Atomist-supplied Spring Rest template is identified as follows:

```
group: atomist
artifact: spring-rest-service
version: 1.0.0
```

> ***NOTE:*** All Atomist-supplied templates are in the atomist group.

## Template Parameters

Templates declare parameters which are available during template evaluation.

* ***parameters:*** Parameters that you must supply for each use of the template. Validation information is provided in the form of regular expression. Parameters may have default values. Such parameters are gathered before template evaluation.
* ***computed parameters:*** Parameters computed from regular parameters before template evaluation. For example, when generating a Spring MVC project, the name and path of the @RestController class is a function of the base source path, package and name parameters. Computed parameters are computed by logic in a template class (implemented in Java or Scala) or in a JavaScript function defined in the template itself.

## Template Tags

Templates expose tags that allow their classification. For example, the spring-rest-service exposes java, spring, spring-boot and rest tags.

## Template Visibility (Public and Private)

Templates may be public or private. A public template is visible to all users and must have a unique name across all users. A private template is visible only to the group of the template creator. Visibility is specified when a template is published.

## Version Numbering

Templates follow semantic versioning. Atomist automatically manages the version numbers of templates. 

The first release will be version `1.0.0-SNAPSHOT`. Thereafter increments are automatic.

## Contents of an Atomist Project Template

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

## Contents of the `/meta` directory

Content in the `/meta` directory describes the template and adds processing scripts. it contains the required info.yml file describing the template, and optional JavaScript files that can perform additional processing.

### The `info.yml` file

The required info.yml file describes the template in terms of required properties and the template's parameters.

### Template Properties in the `info.yml` file

An Atomist Project Template has a number of properties it needs to describe the template effectively to the system. An example would be the following:

```
name: 
  rest-service

type:
  spring-boot

description: 
  Spring Boot REST microservice
```

This example is taken from the canonical example available from the [atomist-project-templates](https://github.com/orgs/atomist-project-templates/) [Spring Rest Microservice template](https://github.com/atomist-project-templates/spring-rest-service).

As a minimum the template `name` is required. Regardless of where the template is sourced from the name is taken from info.yml within the template.

The `type` is optional. If specified it must be a well-known type supported by the system, for which additional JVM code is executed when the template is instantiated and/or before the template is evaluated.

For example, to define additional parameters or use a specific library to create file content. Most needs can be met by JavaScript and VTL within the template so you can safely ignore this field except when creating Spring Boot templates.

The `description` field is optional and is used as a hint when prompting the Atomist user to select this template.

### Specifying Template Parameters

Parameters are specified in a block under the parameters section of the YML document. The block looks as follows:

```
parameters:

  - name: number1
    required: true
    description: A number of great significance.
    default-value: 42
    pattern: \d+
    valid-input-description: A positive number.
```

The following fields are available:

| Name        | Provision           | Notes  |
| ----------- |:-----------------:|:-------|
| name      | required | Name of the parameter |
| required     | optional (default is true)      |   Whether or not the parameter is required |
| description | required      | Description of the template for display when being used |
| valid-input-description | optional      | Description of valid input, such as a valid Java package name or valid Github repo name |
| valid-input-description | optional      | Description of valid input, such as a valid Java package name or valid Github repo name |
| default-value | optional      | Default value if an optional parameter isn't supplied |
| default-ref | optional      | Name of other field whose value to use if an optional parameter isn't supplied |

## You might also be interested in

* [Quick Start: Creating and publishing a new Atomist Project Template]()

