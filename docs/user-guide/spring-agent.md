The Atomist Spring Agent sends runtime notifications to Atomist about your [Spring Boot][spring-boot] application instances so that this information can be surfaced in your Slack channels:

![Spring Agent](/images/spring-agent.png)

[spring-boot]: https://projects.spring.io/spring-boot/

## Prerequisites

To use the Atomist Spring Agent you will need to:

- Authorize the Atomist Bot on Slack and GitHub as described in [getting-started](/getting-started/index.md).
- Be working on a Maven-based Spring Boot application.

## Adding the Spring Agent

You can install the agent in a project using the Atomist bot or manually.

### Adding the Spring Agent using the Bot

The best way to add the agent is to navigate in Slack to a channel that is associated with the repository in GitHub that contains the Maven-based Spring Boot project you want to add the agent to. If you're not sure that the channel is associated with the correct repository you can check using the `@atomist repos` command.

Once you're sure you're in a channel attached to the repository that contains your Maven-based Spring Boot application you can ask Atomist to add the agent:

```shell
@atomist add spring agent
```

This will result in the bot creating a branch and PR on your repository that contains changes to the `pom.xml` and the `application.yml`.

If configured a build of the branch will be triggered with appropriate checks and then you'll be prompted to merge this branch into your project's `master` branch:

![Add Spring Agent](/images/add-spring-agent.png)

When you first enable the agent Atomist will add the `spring-boot-agent` dependency to your project's `pom.xml`:

```xml
<dependency>
    <groupId>com.atomist</groupId>
    <artifactId>spring-boot-agent</artifactId>
    <version>0.1.2</version>
</dependency>
```

If not already present then the `public-atomist-release` repository will also be added to the `repositories` block in your `pom.xml` so that the `spring-boot-agent` dependency can be resolved:

```xml
<repositories>
    <repository>
        <id>public-atomist-release</id>
        <name>Atomist Release</name>
        <url>https://atomist.jfrog.io/atomist/libs-release</url>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
</repositories>
```

Finally a few properties are added to the `src/main/resources/application.yml` file for your project to identify and describe the application appropriately when the runtime information is sent to your project's Slack channel:

```yml
atomist:
  enabled: true
  debug: true
  url: 'https://webhook.atomist.com/atomist/application/teams/T5P5H18V9'
  environment:
    domain: '${DOMAIN:development}'
    pod: '${HOSTNAME:${random.value}}'
```

You can customise these properties using the usual [Spring Boot mechanisms][spring-boot-props].

### Adding the Spring Agent Manually

You can add the agent to your application manually by adding the following to your `pom.xml`:

```xml
<dependency>
    <groupId>com.atomist</groupId>
    <artifactId>spring-boot-agent</artifactId>
    <version>0.1.2</version>
</dependency>
```

As the agent is not available from Maven Central adding the following Maven repository is requried too:

```xml
<repositories>
    <repository>
        <id>public-atomist-release</id>
        <name>Atomist Release</name>
        <url>https://atomist.jfrog.io/atomist/libs-release</url>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
</repositories>
```

Finally add the following default properties to configure the agent:

```yml
atomist:
  enabled: true
  debug: true
  url: 'https://webhook.atomist.com/atomist/application/teams/T5P5H18V9'
  environment:
    domain: '${DOMAIN:development}'
    pod: '${HOSTNAME:${random.value}}'
```

## Configuring the Spring Agent

The agent can be configured from the Spring Boot `application.yml` or 
`application.properties` using the following settings:

```yml
atomist:

  # enable or disable the agent
  enabled: true

  # enable trace output; this allows you to review the event messages the agent sends
  debug: true

  # configure the endpoint; {id} should be replaced by your Slack team id
  url: 'https://webhook.atomist.com/atomist/application/teams/T5P5H18V9' 

  environment: 
  
    # use the following keys to send some information about your environment to Atomist
    domain: '${DOMAIN:development}'
    pod: '${HOSTNAME:${random.value}}'
```

## Testing the Spring Agent

Once you have merged the new branch into your project's `master` you can clone the project locally to test the agent by running the application locally using the standard [Spring Boot Maven Plugin support][maven-plugin]:

[maven-plugin]: http://docs.spring.io/spring-boot/docs/current/maven-plugin/

```shell
> mvn spring-boot:run
```

If everything is configured correctly then you should then begin to see application instance lifecycle messages for your Spring Boot application in the corresponding channel for your project:

![Spring Application Lifecycle Messages](/images/agent-messages.png)

## What information is shared by the Spring Agent?

Once your application is running and the agent is added then in the `DEBUG` logging for your application you will see the information that the agent is sending to Atomist:

```
09:46:11.317 [eventTaskExecutor-1] DEBUG c.a.s.a.AgentEventSender - Atomist event about to be sent:
{
  "git" : {
    "sha" : "1818b54e396979fb422f24ede1d3373415a4282e",
    "branch" : "master",
    "url" : "git@github.com:democritus-team/demo1.git"
  },
  "pod" : "36a2d083d2eb9c5c16e66a79a3bb5ed1",
  "domain" : "development",
  "host" : "Bertrand.local",
  "id" : "application:8080-46799-Bertrand.local",
  "state" : "started",
  "ts" : 1499935571272
}

```

## Removing the Spring Agent

If you decide that you no longer want to have the agent in your project then all you need to do is remove the `spring-boot-agent` dependency from your project's `pom.xml` and then clean out the `atomist` properties from your `src/main/resources/application.yml` file.
