Creating new projects, especially if you're working with multiple microservices, and coordinating them across group discussion channels is a real challenge!

Microservices means lots of projects, continually changing as you come up with the right microservices for your own domain and context. Creating those projects really shouldn't be a hit on productivity and so Atomist has considered this a core feature from its very start.

Of course, Atomist comes with its own set of great project starter templates out-of-the-box. Just grab the bot and ask "list templates" and you'll see. But really the best templates for your world will come from you!

This is where custom templates come in.

You can start to create a project template of your own in three main ways:

* Forking and customising an existing Atomist Project Template
* Creating an Atomist Project Template from Scratch
* *Coming soon* *Super Forking* an existing project of your own into being the basis for a new Atomist Project Template

## Creating an Atomist Project Template from Scratch

Atomist comes with a template to create a new Atomist Project Template from scratch. You can see this `blank-template` Atomist Project Template if you ask the Bot to list templates:

TBD update with released template output!
---
@atomist list templates

available templates

type `@atomist create 1` to use the spring-rest-service template (Spring Boot REST microservice) 
it will take parameters `[description]`,`{group_id}`,`{name}`,`[artifact_id]`,`[version]`,`{package_name}

---

> ***NOTE:*** The output of your own list of templates may be different from the one above. However the `blank-template` should be in there as it's a publicly available Atomist-authored template.


---

To create your own blank template to work from all you need to do is follow the instructions to [create a new project based on an Atomist Project Template](create-new-project.md) (it's just in this case it will contain the starting point for an Atomist Project Template) then get to work on your newly created Atomist Project Template code.

## Where you might like to go next...

* [Creating a new project based on an Atomist Project Template](create-new-project.md)


