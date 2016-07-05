## Extracting a Microservice from an Existing Java Interface

Atomist has the capability to take a Java interface in an existing repository, discern a necessary microservice contract from it and then to generate:

* A new microservice repository based on any [Service-Contract Aware Atomist Project Template](/reference-docs/project-templates-overview.md).
* A pull request on the original repository to convert the Java interface to a Spring Cloud Feign client.

Let's look at how that works.

### Start with a Java interface

To begin with ensure that you have an existing Java interface, and any required types for that interface, in your existing project repository and checked-in to the repository on GitHub. For example an interface such as the following would be a good starting point:

```java
interface PersonFinder {
    Person randomPerson();
}

class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public int getAge() {
        return age;
    }

    public String getName() {
        return name;
    }
}
```

You don't need to implemented the interface in your own repository just yet, unless you'd like to for mocking purposes in unit tests of course. Instead we're going to use Atomist's `extract microservice` functionality to enable this interface for us as a Spring Cloud Feign client.

### Ask Atomist to Extract a new Microservice

With everything checked in a pushed, you can now change to the channel associated with your existing repository and type:

---

@atomist extract microservice

---

The bot will then ask you to specify the Service-Contract-Aware Atomist Project Template to use to generate your new microservice project that will provide the implementation of the service contract implied from your Java interface.

---

`<your username>`, I can help you extract a new service.
 
`<your username>`, which ​*template*​ shall I use? (`flask-rest-service`, `spring-rest-service`)

---

In our case the `flask-rest-service` is a service-contract-aware and so you can enter specify that as being the Atomist Project Template to use.

You will then be prompted for a number of parameters associated with the template you're using before being presented with a summary page by the bot that looks like:

---

I'm ready to `submit` the request.  You can tell me to `set param to value` if you want to change a parameter.
Do you want to change any of these values?

`<a list of the parameters and their values as set so far>`

---

> ***NOTE:*** Check that the `repo` parameter is set to the correct name of the repository with your Java interface in it. Sometimes Slack shortens channel names from the original project name and so this can confuse the setting of this parameter.

Enter `submit` and, if all goes well, you should see a new slack channel for the new microservice that meets the specified contract is created, a pull request will be submitted that amends your original Java interface into being a Spring Cloud Feign client.

Git clone and run and you're away!

### You might also be interested in...

* [Overview of Atomist Project Templates](/reference-docs/project-templates-overview.md)