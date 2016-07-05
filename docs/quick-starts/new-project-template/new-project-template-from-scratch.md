## Create an Atomist Project Template from Scratch

Atomist comes with a template to create a new Atomist Project Template from scratch. You can see this `blank-template` Atomist Project Template if you ask the Bot to list templates:

---
@atomist list templates

available templates

type `@atomist create 1` to use the spring-rest-service template (Spring Boot REST microservice) 
it will take parameters `[description]`,`{group_id}`,`{name}`,`[artifact_id]`,`[version]`,`{package_name}

---

> ***NOTE:*** The output of your own list of templates may be different from the one above. However the `blank-template` should be in there as it's a publicly available Atomist-authored template.


---

To create your own blank template to work from all you need to do is follow the instructions to [create a new project based on an Atomist Project Template](new-project-template.md) (it's just in this case it will contain the starting point for an Atomist Project Template) then get to work on your newly created Atomist Project Template code.

# You might also be interested in...

* [Overview of Atomist Project Templates](/reference-docs/project-templates-overview.md)