## Buttons Quick Start

Buttons are image links that when clicked trigger the execution of an
Atomist project generator or editor.  Clicking on existing Atomist
Buttons are the easiest way to get started with Atomist, all you do is
click a link!

You will need a [GitHub][gh] account to use buttons.  The first time
you click one of the Atomist Buttons you will be prompted to authorize
Atomist to interact with public repositories in your GitHub account.

[gh]: https://github.com/

![Authorize application](/images/button-authorize.png)

Review the request and click the "Authorize application" button at the
bottom of the page.

### Create New Projects Based on Atomist Generators

There is a continually growing, public collection of Atomist
generators that can be used to create new projects on GitHub.  Click
the link below to create a new public repository under your GitHub
account containing a working [Spring Boot][boot] REST microservice.

[boot]: https://projects.spring.io/spring-boot/

[<img src="https://images.atomist.com/button/create-project.png" width="267" alt="Get Started with Atomist"/>](https://api.atomist.com/v1/projects/generators/16271c54-e671-4be6-a30c-084aba8083ed)

After you click the button, and possibly authorize Atomist as
described above, you will be redirected to a form prompting you for
the information needed to create the project.

![Create Spring Boot Project Form](/images/button-spring-boot-form.png)

There are default values for all but the first parameter, "PROJECT
NAME".  Go ahead and type in a name for your project, e.g.,
`atomist-test`.  Once you have a valid value in the project name
field, you can click the "Create Project" button.

After a few moments you will be redirected to your newly created
project on GitHub.  You can then clone and interact with this project
just as you would with any other project on GitHub.
