When you run automations in Atomist, they run on your network, and connect to our service
through a websocket for triggering, chat integration, and querying data in the graph of your events.

The Atomist service receives and stores high-level data about repositories, commits, pull requests, issues, builds, and any custom events you send. Your code is accessed only in your [software delivery machine (SDM)](sdm.md).

## Where do SDMs run?

Your software delivery happens in an SDM running inside your network. You have control of where your
SDM runs and what it does, in code.

The SDM needs access to your source control manager; it will clone the code to decide what delivery 
[goals](goal.md) to set for each push.
<!-- todo: change 'version control' to 'source control' everywhere? -->

The SDM needs external network access to the Atomist service; it opens a websocket and registers. This
registration includes an authorization key, which can be generated in the Atomist web application.
The registration includes a list of commands that this SDM responds to; the Atomist bot makes those available
in chat. The registration includes GraphQL subscriptions for events, like pushes and repository creation,
which your SDM can use to trigger a delivery flow and other automations.

Note that when you run an SDM in [local mode](../developer/local.md), no Atomist authorization applies,
as your SDM does not connect to Atomist. 

## Authentication

The authentication and authorization points are:

*  can you access the Atomist web application?
*  do you have administrative access in the Atomist web application?
*  is an SDM authorized to connect?
*  does a connected SDM have access to act as the person who invoked the command, or only as the person who 
ran this SDM?

Currently, access to the Atomist web application uses GitHub as an authorization provider. 
The Atomist administrator (who initially enrolls an organization in the Atomist service) can invite
other team members to the Atomist workspace, which gives them access to the web application.

Once you have access to the web application, you can create an API key, and then use that to run your SDM.

<!-- TODO what gives them admin access? -->
<!-- TODO can anyone in the workspace run an SDM? who can make a key that will get real tokens? -->


{!tbd.md!}

## Individual GitHub authorization for commands

Certain commands and buttons, like creating a pull request or pushing "Close" on a GitHub Issue notification,
can be performed on GitHub _as the user invoking the command_. This requires their authentication on GitHub.
The Atomist bot will prompt them for this authorization. It will request the minimum authorization for this
command; later if the same user invokes something else, they may need to extend this authorization. These tokens are stored by Atomist in a secure secret store. 

These individual GitHub tokens are used by automations and SDMs to carry out actions
as the user who requested the action. These are not handed to every SDM that connects, however; if you
run an SDM locally, in team mode, your SDM will carry out its work on GitHub as you.
The individual tokens are used by the [built-in chat automations](../user/lifecycle.md).

## Data

High-level historical event data for your organization is stored by Atomist. It can be accessed by people in your
Atomist workspace using the GraphQL interface in the Atomist web application, and by SDMs running custom
GraphQL queries.
