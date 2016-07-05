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

#### Specifying Template Parameters

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

#### Specifying template tags

Any number of tags may be specified in the tags section. This help you find templates. Tags are defined as follows:

|Name	|Provision	|Notes|
| ----------- |:-----------------:|:-------|
|name | required | Name of the tag |
| description| required | Description of the tag's meaning, such as Python 3 |
| parent | optional | Name of parent tag |

#### A full `info.yml` example

Template example

This sample file shows all possibilities:

```
name:
    test1

description:
   A template of profound illustrative power.

parameters:

  - name: number1
    required: true
    description: A number of great significance.
    default-value: 42
    pattern: \d+
    valid-input-description: A positive number.

tags:

 - name: spring
   description: Spring Framework

 - name: spring-boot
   description: Spring Boot
   parent: spring
```

#### Currently Supported Template Types

* spring-boot

Other types will be added in future. We may also make it easy to add additional types.

> ***Note:*** Generic templates are sufficient for most purposes.

### JavaScript files in `/meta`

Any JavaScript files found in the root of the `/meta` directory will be evaluated using Java Nashorn, in order to generate additional files.

A file named params.js will be evaluated if present to compute parameters and the filename is significant.

JavaScript content has access to a contract if one is available.

#### Computing Template Parameters in JavaScript

Computed parameters should be in a file called `/meta/params.js` that contains a `computed_parameters` function.

The function named `computed_parameters` takes a map of the existing parameters. It returns a map of any additional computed parameters. 

For example:

```javascript
function computed_parameters(m) {
  var name = m["name"];
  var reversed = name.split("").reverse().join("");
  return { reversed_name: reversed };
}
```

#### Generating Additional Template Files at Template Runtime in Javascript

A function named `generate`, if present, will be invoked to generate additional artifacts in memory, which will be written to the template's output.

```javascript
function generate(m) {
  return new GeneratedFile(m["name"] + ".txt", m["name"]);
}
```

You can also return an array of GeneratedFile objects such as:

```javascript
function generate(params) {
  var list = new ArrayList();
  // This is using the properties we passed in
  list.add(new GeneratedFile(params["filename"], params["content"]));
  list.add("Filename", "File contents");
  return list;
}
```

Often rather than creating content directly in JavaScript it is useful to invoke custom templates. There are two main reasons for this: 

* Complete control over the parameter map to pass to the template.
* Ability to evaluate a template conditionally as if a Velocity template exists under the `project` directory it will be evaluated regardless.

To make this easier, a `MergeHelper` object is passed to the generate function:

```
function generate(po, mh) {
   var list = new ArrayList();
   var sc = po["contract"];
   var package = po["package_name"];
   if (sc) {
        list.add(new GeneratedFile(package + "/models.py", mh.merge(po, "models_tpl.py")));
        ...
   }
   return list;
}

```

> ***NOTE:*** Template file paths must be relative to the template's base `/templates` directory.

### Working with Service Contracts in JavaScript

If, as part of the template execution, a service contract is available and is provided (for example when a project template is being executed to create a new microservice that will need to exhibit a particular contract) the contract will be exposed to all JavaScript methods via the parameter map:

```javascript
function generate(params, mergeHelper) {

  // Returns the JSON serialized form of an Atomist ServiceContract
  var jcs = params["js_contract"];
  // Evaluate the JSON
  var sc = eval("(" + jcs + ")");
  ...
```

It is now possible to work with the service contract operations and other details that are defined on the contract in order to generate files (as in this case) or to add parameters available to templates. 

A simple example of provided JSON format for the contract would be:

```javascript
{"name":"Jokes","annotations":[],"version":"1.0.0","canonical":false,"client_view":false,"refs":[],
"operations":[
{"path":"/","name":"random","parameters":[],"annotations":["GET"],"responses":[{"code":200,"return_type":"Joke","array":false}]}
],
"custom_types":[
{"discriminator":"object","@id":1,"canonical":false,"name":"Value","description":"","fields":[
{"primitive_type":"Integer","name":"id","description":"","required":true,"array":false},
{"primitive_type":"String","name":"joke","description":"","required":true,"array":false},
{"custom_type":{"discriminator":"object","@id":2,"canonical":false,"name":"categories","description":"Unknown type","fields":[]},"name":"categories","description":"","required":true,"array":true}]},{"discriminator":"object","@id":3,"canonical":false,"name":"Joke","description":"","fields":[{"primitive_type":"String","name":"type","description":"","required":true,"array":false},{"custom_type":{"discriminator":"object","@id":4,"canonical":false,"name":"Value","description":"","fields":[{"primitive_type":"Integer","name":"id","description":"","required":true,"array":false},{"primitive_type":"String","name":"joke","description":"","required":true,"array":false},{"custom_type":{"discriminator":"object","@id":5,"canonical":false,"name":"categories","description":"Unknown type","fields":[]},"name":"categories","description":"","required":true,"array":true}]},"name":"value","description":"","required":true,"array":false}]},{"discriminator":"object","@id":6,"canonical":false,"name":"categories","description":"Unknown type","fields":[]}]}
```

#### General Recommendations for your JavaScript

We recommend using the underscore library to make JavaScript more elegant. This library can be imported in any Atomist Project Template  JavaScript by invoking:

```javascript
load("http://underscorejs.org/underscore.js");
```

## Contents of the `/project` directory



## You might also be interested in

* [Quick Start: Creating and publishing a new Atomist Project Template]()

