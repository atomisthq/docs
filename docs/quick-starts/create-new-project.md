We recognised that creating new projects is an incredibly common task in microservice-based systems. As such Atomist uses templates to make creating new projects as quick as possible.

## Creating a new project based on an Atomist Project Template

First ask Atomist to create a new microservice for you:

---
> @atomist create microservice

---

> ***NOTE:*** You can cancel the project creation process at any time by simply telling the bot to `cancel`.

Next you should be promoted for what Atomist Project Template to use as a starting point:

---
> `<your username>`, I can help you create a new service. 
`<your username>`, which ​*template*​ shall I use? (`spring-rest-service`)

---

Specify the Atomist Project Template that you'd like to use to create your new project and then you will be asked a sequence of questions to populate the parameters necessary for that template.

When you've specified each of the parameters you will be prompted with a summary similar to the following:

---

I'm ready to `submit` the request.  You can tell me to `set param to value` if you want to change a parameter.
Do you want to change any of these values?

`<table of parameters with values will appear here>`

---

If you'd like to change a parameter, all you need to do is specify:

---

> set `<parameter>` to `<value>`

---

If you change a parameter then the summary will be re-displayed and you can check all is set correctly.

Once you're happy with the parameters to your new project, you can submit your project for creation:

---

> submit

---

## New Project, New Repo, New Slack Channel

Once you're submitted your new project creation, if all goes well you should see something like the following:

---

submitted create event
 
added a new channel named #`name of your new project>`

here's your crisp new repository
the url is https://github.com/`<your org>`/`<your new project name>`
I'm proud of it.

---

Atomist has created your new project, populated it with the contents of the initial Atomist Project Template, *and* created a Slack channel for you to discuss and collaborate on your new project.

## You might also be interested in...

* [Creating a new project based on an Atomist Project Template](create-new-project.md)