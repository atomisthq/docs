## Creating a new Local Project from an Atomist Project Template using the Shell

Using a local template is as simple as executing the `create` shell command:

```
Executing command create
Please enter a value for package_name. Root package for project classes
com.atomist
Please enter a value for name. Name for the new project
mynewservice
Please enter a value for group_id. Name of your development group
com.atomist
Please enter a value for description. The microservice short description
My fantastic new microservice
Please enter a value for artifact_id. Artifact id (optional)
mynewservice
Please enter a value for version. Version (optional)
Press enter for default of 0.0.1
Creating new project using spring-rest-service and writing to mynewservice
Project written to '/Users/russellmiles/atomist/output/mynewservice': generated with spring-rest-service
...
```

> ***NOTE***: If you have more than one template in the `templates_root` directory then you'll be prompted as to which template generator to use when you execute the `create` command.

### Next?

Now you have a brand new project to work in it's time to explore [constructing and executing an Atomist Editor that can work on an existing project...](your-first-editor.md)

