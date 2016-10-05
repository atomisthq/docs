## Introducing the Atomist Bot

The Atomist bot uses natural language processing so you do not need to remember precise syntax as with a command line. However, knowing the basic shape of commands will help you use the bot more effectively.

Currently the Bot integrated with and works within Slack.

> ***NOTE:*** Currently the atomist bot should be enrolled only once per Slack team.

### The Basics: Getting Out of Trouble

If you wish to abort a conversation flow, e.g. because you don't want to create a project with the given parameters, the following command can be used:

```
@atomist cancel
```

### Project Creation

Projects can be created in any Slack channel.

```
@atomist create new service called my-project

or 

@atomist create a new microservice

```

The bot may recognize some parameters--in this case, name--from the initial message. It will then ask you for any further required parameters, insisting on valid input as implied by the validation pattern specified in the parameter.

When the project is created, the bot will create a new Slack channel for the project. Further interactions related to the project should normally take place in this channel.

### Project Editing

* ***NOTE:*** There is no need to identify a project to the bot when sending messages within a project channel.



### Admin Operations

#### Use Private or Public repositories by default

```
@atomist use public repos

or

@atomist use private repos
```

#### Your User Information

GitHub user information:

```
@atomist show github user
```

Atomist user information:

```
@atomist whoami
```

#### Delete and Cleanup

If you have authorized Atomist for delete scope in GitHub, it's possible to delete the repo as follows:

```
@atomist delete

or

@atomist cleanup service
```

This will prompt as to whether the repo should be deleted (respond `yes` or `no`). 

*  ***NOTE:*** As mentioned before, Atomist will need to have permissions set in order to delete a repository, so if you get an error it will likely be because of that at this point. Instructions are coming to be able to add this permission to your Atomist bot.

At this point in time Atomist does not have the ability to delete a Slack channel so instead if it can it it will provide a link. Choose Delete channel on the lower right and select the appropriate value in the popup to delete the channel.

