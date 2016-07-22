## Calling an Atomist Project Editor from another Editor

You can call an Atomist Project Editor declared in rug script from another project editor using the `run` declaration.

Take the [rug](/reference-docs/rug.md) script you created in the last step in this quick start series and add a new editor to it as shown below:

```
editor PackageMove

param old_package: @java_package
param new_package: @java_package

with JavaSource j when pkg = old_package
    do movePackage to new_package

editor PomParameterizer

@description "Artifact Id: Used by Maven"
param artifact_id: @artifact_id

with xml x when path = "pom.xml"
    do setSimpleNode "artifactId" artifact_id
```
Ask the shell to `reload` and you should see the following:

```
Templates are 
	my-first-editor
	spring-rest-service
Generators are 
	spring-rest-service: (Spring Boot REST microservice) description,group_id,name,artifact_id,version,package_name
Editors are 
	my-first-editor.PackageMove: (PackageMove) old_package,new_package
	my-first-editor.PomParameterizer: (PomParameterizer) artifact_id
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

Execute your new `PomParameterizer` editor, which at the moment simply takes your project's current `artifactId` and changes it to whatever you would like to change it to:

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
1
Executing command edit
Please choose a project. Please enter one of
	0 mynewservice
0
Please choose editor. Please enter one of
	0 my-first-editor.PackageMove
	1 my-first-editor.PomParameterizer
1
Please enter a value for artifact_id. Artifact Id: Used by Maven
jazzyartifact             
Editing project at mynewservice using my-first-editor.PomParameterizer
Edited project
Updated /Users/russellmiles/atomist/output/mynewservice: edited with my-first-editor.PomParameterizer
```

Now check out the contents of your `pom.xml` in your `mynewservice` project and you should see the change has successfully been applied!

## Calling Editors uising the `run` declaration

To chain these two editors together let's create a new editor, called `MoveAndChangeArtifactId`, that calls both:

```
editor MoveAndChangeArtifactId

run PackageMove
run PomParameterizer
```

So the full file should contain:

```
editor PackageMove

param old_package: @java_package
param new_package: @java_package

with JavaSource j when pkg = old_package
    do movePackage to new_package

editor PomParameterizer

@description "Artifact Id: Used by Maven"
param artifact_id: @artifact_id

with xml x when path = "pom.xml"
    do setSimpleNode "artifactId" artifact_id
	
editor MoveAndChangeArtifactId

run PackageMove
run PomParameterizer
```

> ***NOTE***: We could have simply called the `PackageMove` editor from the `PomParameterizer` editor in this case by adding teh `run` delaration at the end of the `PomParameterizer` editor script. It is often better and clearer however to create a separate editor that simply orchestrates a number of simple, single-purposed editors.

## Run your Editor that calls other Editors

Reload the shell with the `reload` command and you should see the following snippet:

```
Editors are 
	my-first-editor.PackageMove: (PackageMove) old_package,new_package
	my-first-editor.PomParameterizer: (PomParameterizer) artifact_id
	my-first-editor.MoveAndChangeArtifactId: (MoveAndChangeArtifactId) old_package,new_package,artifact_id
```

The `MoveAndChangeArtifactId` editor now exhibits all three of the parameters it needs to call the two editors it is composed of.

Finally let's execute the `MoveAndChangeArtifactId` editor to see it all in action:

```
edit
Executing command edit
Please choose a project. Please enter one of
	0 mynewservice
mynewservice
Please choose editor. Please enter one of
	0 my-first-editor.MoveAndChangeArtifactId
	1 my-first-editor.PackageMove
	2 my-first-editor.PomParameterizer
0
Please enter a value for artifact_id. Artifact Id: Used by Maven
myartifact
Please enter a value for new_package. 
com.myorg  
Please enter a value for old_package. 
com.atomist
Editing project at mynewservice using my-first-editor.MoveAndChangeArtifactId
Editor PackageMove did not modify anything: Ignoring
Edited project
Updated /Users/russellmiles/atomist/output/mynewservice: edited with my-first-editor.MoveAndChangeArtifactId
```

***Hang On!*** What happened there? What's with the line that states:

```
Editor PackageMove did not modify anything: Ignoring
```

Well in this case we actually got the `old_package` and `new_package` parameters the wrong way round. The editor is smart enough to know that it was not needed according to our settings but it still managed to run the other editor in the sequence.

One last thing, what if you'd like to always set a particular parameter on a editor that you are running using the `run` declaration to a specific value rather than prompt for it? You can do that simply by setting the appropriate parameter within the calling editor as shown in the final editor script below:

```
editor PackageMove

param old_package: @java_package
param new_package: @java_package

with JavaSource j when pkg = old_package
    do movePackage to new_package

editor PomParameterizer

@description "Artifact Id: Used by Maven"
param artifact_id: @artifact_id

with xml x when path = "pom.xml"
    do setSimpleNode "artifactId" artifact_id
	
editor MoveAndChangeArtifactId

artifactId = "microserviceformerreferredtoas"

run PackageMove
run PomParameterizer
```

Now you won't be prompted for the `artifactId` paremeter when running the `MoveAndChangeArtifactId`, and the parameter won't be listed when you `show` the currently available editors (after a `reload` of course):

```
Editors are 
	my-first-editor.PackageMove: (PackageMove) old_package,new_package
	my-first-editor.PomParameterizer: (PomParameterizer) artifact_id
	my-first-editor.MoveAndChangeArtifactId: (MoveAndChangeArtifactId) old_package,new_package
```

## You might also be interested in...

* [Introduction to Atomist Project Editors](/reference-docs/project-editors.md)
* [Authoring Editors and Reviewers with the Atomist DSL](/reference-docs/rug.md)