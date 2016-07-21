## Getting Set Up with the Atomist Shell

Let's get rolling creating your own Atomist project templates and editors with the Atomist Shell. First up, make sure you've either grabbed the [binary of the shell or built your own local copy](/reference-docs/cli.md).

### Creating an initial Atomist Profile

Before you run anything make sure you also have [set up an initial .atomist-profile](/reference-docs/cli.md) in your home directory as well. At this point you only need the following information in that profile file:

```
template_root=/Users/russellmiles/atomist/template-source/
output_root=/Users/russellmiles/atomist/output/
```

You should set those paths to to where you want the shell to work from. More will go in that file a little later on as we explore the functionality of the shell.

### Running the Atomist Shell for the first time from Source

Assuming for now that you're working with the shell from source then the following command will get the shell running:

```
> mvn compile exec:javaDexec.mainClass="com.atomist.projectoperation.cli.Main"
```

If all is happy you should see the following:

```
Templates are 

Generators are 

Editors are 
	
Reviewers are 
Template root is '/Users/russellmiles/atomist/template-source/'
Output root is '/Users/russellmiles/atomist/output/'
Type 'help' for assistance
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

At this point you don't have any [Atomist Project Templates](/reference-docs/project-templates/project-templates-overview.md) or [Editors](/reference-docs/project-editors.md).

If you ever want to see this status again all you need to do is execute the `status` command.

## Executing a *Command*

From the `show` menu you can execute a command by entering its index number or by typing in the actual command name.

## Getting out of trouble: *Cancelling a Command with :q*

If you've kicked off a flow with a command and realise you no longer want to continue you can use the defactor standard `:q` command to get back to the `show` menu of commands.

## Grabbing a baseline Atomist Project Template to work with

Now you can grab an existing [Atomist Project Template] to get working with it from the shell. We'll use a canonical template that is already pre-baked by the Atomist team, the `spring-rest-service` template that is available in the `atomist-project-templates` [organisation on GitHub](https://github.com/atomist-project-templates/spring-rest-service).

Take a fork of that repository into your own GitHub organisation and then clone it to the directory you specified before in the `.atomist-profile` for `templates-root`.

If you have the shell running and you now enter the `show` command you might be forgiven to being slightly unimpressed when you see the following:

```
Templates are 
	spring-rest-service
Generators are 
	
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

The shell has automatically noticed your template, but it hasn't noticed any of the features the template contains. `Generators` will be able to create for you project starting points, and `Editors` will be able to work on existing projects, but at the moment we have neither.

In order for the shell to be able to access any `Generators` and `Editors` available in your template directory we need to ask it to `reload` and then you'll see:

```
reload
Executing command reload
Reloading /Users/russellmiles/atomist/template-source//spring-rest-service
Templates are 
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

> ***NOTE***: If you restart the shell this automatically executes load of generators and editors from known templates in the `template-root`.

## Next Steps

Now you have a template to hand you can use the Atomist Shell to [create new local projects based upon it...](creating-a-local-project-based-on-local-template.md)

