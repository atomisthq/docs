Forking an existing Atomist Project Template is a very common way to create a new project creation template for your own unique needs.

As explained in the [Overview on Atomist Project Templates](../reference-docs/project-templates-overview.md), at the moment a project template consists of a combination of javascript and Velocity Templates (more template approaches are on the roadmap) and so grabbing something reasonable as a starting point is usually a helpful idea.

Atomist public templates currently reside in the public [atomist-project-templates](https://github.com/atomist-project-templates) organisation on GitHub. Navigate there, select the template you'd like to use as a baseline and then simply click on the Fork button, forking the template to your own team's organisation.

Once you've forked your baseline template into your own organisation then clone it to a local directory and you're all set to make your changes.

> **NOTE:** It's usually a good idea to rename your new template repository at this point to really make it your own. You might even consider changing its description too.

### ...Customize, Commit & Push...

Editing Atomist Project Templates follows the usual Git workflow. Make some changes to your template, remembering to respect the _.vm extensions for files you want to be treated as velocity templates when the template is used.

Commit and Push your changes back to your GitHub origin repository and you're all set to make this template available to others in your team to use.

### Publishing your new Atomist Project Template to your Team

Head to the Atomist bot in your team in Slack and ask it to do the following in a channel that the bot has been invited to (by default, this is always at least the General channel and you could always ask the bot through its own direct channel as well):

---
@atomist list templates

---
At the moment you should get an output something like the following from the Atomist bot:

---
available templates

type `@atomist create 0` to use the spring-rest-service template (Spring Boot REST microservice) 
it will take parameters `[description]`,`{group_id}`,`{name}`,`[artifact_id]`,`[version]`,`{package_name}

---

All you have right now is the default `spring-rest-service` template. You won't see your new one yet.

To see your own new template in that list it's time to publish it:

---
@atomist publish my new template

---

> ***NOTE:*** It is an error to attempt to publish a template with public visibility with the same name as another public template. [More on public and private templates...](../../reference-docs/project-templates-overview.md)

The bot will then ask what template you'd like to publish, from which repository in your GitHub organisation:

---
Far out. I can help you publish a new version of your template.
 
`<your slack usernam>`, which repo in the `<your team>` org contains the template?

---

Specify the repository name of the template you'd like to publish and when you hit return you should get the following confirmation:

---
I'm ready to `submit` the request.  You can tell me to `set param to value` if you want to change a parameter.
Do you want to change any of these values?
branch

master

public

false

repo

`<your repository name>`

---

Enter submit and you should see something like the following from the bot:

---
Great! I published `<number of files in the template>` files.

---

Finally you'll be able to see your new template, readily available for your team, by listing the templates again:

---
@atomist list templates

---

With the successful response being something like:

---
available templates
type `@atomist create 0` to use the `<your template>` (`<your template description>`) 
it will take parameters `<the parameters your template takes>`

type `@atomist create 1` to use the spring-rest-service template (Spring Boot REST microservice) 
it will take parameters `[description]`,`{group_id}`,`{name}`,`[artifact_id]`,`[version]`,`{package_name}

---

# You might also be interested in

* [Overview of Atomist Project Templates](../../reference-docs/project-templates-overview.md)
