## Constructing and executing an Atomist Editor that can work on an existing project with the Atomist Shell

Atomist Editors are written using our powerful 'Rug' domain specific language and are often packaged inside an Atomist Project Template's directory.

We'll package up a first, stand-alone editor and see how it can be loaded and executed with the shell. Create a new directory for your new single-editor template inside your `templates_root` directory you set up in [step 1 of these quick starts](getting-started-with-the-shell.md). Something like `my-standalone-editor` woould make a good directory name.

Now ask the shell to reload (or restart the shell) and you should see something like the following:

```
Templates are 
	my-first-editor
	spring-rest-service
Generators are 
	spring-rest-service: (Spring Boot REST microservice) description,group_id,name,artifact_id,version,package_name
Editors are 
	
Reviewers are 
Template root is '/Users/russellmiles/atomist/template-source/'
Output root is '/Users/russellmiles/atomist/output/'
GitHub Token is 'null'
Choose command. Please enter one of
	0 create
	1 edit
	2 edit-remote
	3 exit
	4 reload
	5 show
	6 superfork
	7 template-synch
```

Great, we now have a template called `my-first-editor`, but it can't actually do anything for us yet. It's contributing no generators or editors yet.

## Create an `editors` directory

First we need an `editors` directory inside the `my-first-editor` template directory so the directory structure would be:

```
|- my-first-template/
|-- editors/
``` 

All editors that come packaged with a template are expected to inhabit the `editors` directory.

If you now ask the shell to `reload` you still won't see any editors listed, but you've readied the ground to write your first one.

## Adding a *very* simple standalone Atomist Project Editor

It's now time to add our first Atomist Project Editor to the `my-first-editor` template directory.

Create a file in the `editors` directory called `movePackageEditor`. Then declare an actual editor in your script with the following [rug](/reference-docs/rud.md) declaration in that file:

```
editor PackageMove
```

Next instruct the editor that we need two parameters: `old_package` and `new_package`:

```
editor PackageMove

param old_package: @java_package
param new_package: @java_package


```

> ***NOTE***: `@java_package`is the identifier for one of a set of [pre-declared rug script parameters](/reference-docs/rug.md) automatically exposed to your [rug](/reference-docs/rug.md) script. In this case `@java_package` refers to a regular expression for identifying Java packages.

Finally tap into the `JavaSources` in your project and move any in the old package to the new package locally:

```
editor PackageMove

param old_package: @java_package
param new_package: @java_package

with JavaSource j when pkg = old_package
    do movePackage to new_package
```

## Running your new Editor with the Atomist Shell

Ensure you've refreshed your shell by either restarting it or executing the `reload` command. After reloading you should see your fine new `PackageMove` editor listed as available for you to execute, scoped by the `my-first-editor` template directory:

```
Templates are 
	my-first-editor
	spring-rest-service
Generators are 
	spring-rest-service: (Spring Boot REST microservice) description,group_id,name,artifact_id,version,package_name
Editors are 
	my-first-editor.PackageMove: (PackageMove) old_package,new_package
Reviewers are 
Template root is '/Users/russellmiles/atomist/template-source/'
Output root is '/Users/russellmiles/atomist/output/'
GitHub Token is 'null'
Choose command. Please enter one of
	0 create
	1 edit
	2 edit-remote
	3 exit
	4 reload
	5 show
	6 superfork
	7 template-synch
```

You can now run your editor against your existing `mynewservice` project that you generated in a [previous step in this quick start](creating-a-local-project-based-on-local-template.md).

Use the `edit` command in the shell to run your `PackageMove` editor locally against the `mynewservice` project:

```
Choose command. Please enter one of
	0 create
	1 edit
	2 edit-remote
	3 exit
	4 reload
	5 show
	6 superfork
	7 template-synch
edit
Executing command edit
Please choose a project. Please enter one of
	0 mynewservice
0
Please choose editor. Please enter one of
	0 my-first-editor.PackageMove
0
Please enter a value for new_package. 
com.myorg
Please enter a value for old_package. 
com.atomist
Editing project at mynewservice using my-first-editor.PackageMove
movePackage on src/main/java/com/atomist/MynewserviceApplication.java
movePackage on src/main/java/com/atomist/MynewserviceConfiguration.java
movePackage on src/main/java/com/atomist/PingController.java
movePackage on src/test/java/com/atomist/MynewserviceApplicationTests.java
movePackage on src/test/java/com/atomist/MynewserviceOutOfContainerIntegrationTests.java
movePackage on src/test/java/com/atomist/MynewserviceWebIntegrationTests.java
Edited project
Updated /Users/russellmiles/atomist/output/mynewservice: edited with my-first-editor.PackageMove
```

Take a look in your output `mynewservice` project and marvel in how your project has been edited according to your quick and simple `PackageMove` rug editor script!

## Next?

Take your Atomist Project Editor skills to the next level by adding another editor and then reusing your existing `PackageMove` editor...

## You might also be interested in...

* [Introduction to Atomist Project Editors](/reference-docs/project-editors.md)
* [Authoring Editors and Reviewers with the Atomist DSL](/reference-docs/rug.md)
