The Spring Agent sends events from Spring Boot applications to Atomist so you can see application startup and graceful shutdown events in Slack.

![Spring Agent](/images/spring-agent.png)

## Prerequisites

Authorize Atomist Bot on Slack and GitHub as described in [getting-started](/getting-started/index.md). 

## Adding the Agent 

You can install the agent in a project using the Atomist bot or manually.

### Using the Atomist Bot

Add the Spring Agent to a project by running `@atomist add spring agent`. Ideally you would run this command from a Slack channel that is linked to GitHub repository via `@atomist repo <repo owner name> <repo name>`. 

### Manually

Add the Agent in your application by adding the following to your `pom.xml`:

```
		<dependency>
			<groupId>com.atomist</groupId>
			<artifactId>spring-boot-agent</artifactId>
			<version><latest version></version>
		</dependency>
```

As the agent is not available from Maven Central adding the following repo is requried, too:

```
		<repository>
			<id>public-atomist-release</id>
			<name>Atomist Release</name>
			<url>https://atomist.jfrog.io/atomist/libs-release</url>
		</repository>
```

## Configuration

Once added to your project, the agent can be configured from the Spring Boot `application.yml` or 
`application.properties`:

```
# enable or disable the agent
atomist.enabled=true
# enable trace output; this allows you to review the event messages the agent sends
atomist.debug=true
# configure the endpoint; {id} should be replaced by your Slack team id
atomist.url=https://webhook.atomist.com/atomist/application/teams/{id}

# use the following keys to send some information about your environment to Atomist
atomist.environment.domain=
atomist.environment.<any>= 
```

