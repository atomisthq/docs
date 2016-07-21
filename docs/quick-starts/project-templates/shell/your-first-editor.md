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

## Adding a *very* simple Atomist Project Editor

It's now time to add our first Atomist Project Editor to the `my-first-editor` template directory.
