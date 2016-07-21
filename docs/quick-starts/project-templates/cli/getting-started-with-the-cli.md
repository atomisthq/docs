## Getting Set Up with the Atomist Shell CLI

Let's get rolling creating your own Atomist project templates and editors with the Atomist Shell CLI. First up, make sure you've either grabbed the [binary of the shell or built your own local copy](/reference-docs/cli.md).

### Creating an initial Atomist Profile

Before you run anything make sure you also have [set up an initial .atomist-profile](/reference-docs/cli.md) in your home directory as well. At this point you only need the following information in that profile file:

```
template_root=/Users/russellmiles/atomist/template-source/
output_root=/Users/russellmiles/atomist/output/
```

You should set those paths to to where you want the CLI to work from. More will go in that file a little later on as we explore the functionality of the CLI.

### Running the CLI for the first time from Source

Assuming for now that you're working with the CLI from source then the following command will get the CLI running:

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

## Getting out of trouble: *Cancelling a Command with :q*

If you've kicked off a flow with a command and realise you no longer want to continue you can use the defactor standard `:q` command to get back to the `show` menu of commands.

## Next?

A good next step is for you to create a template to work with. The best way to do that *if* you have some existing code in a repository you have access to is to do a `superfork` as you'll see in the [next quick start](superforking-a-new-template)...