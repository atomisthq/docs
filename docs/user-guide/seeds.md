Seeds are a special type of Atomist project that is used to generate other projects. Changes you make to the seed's GitHub repo will be reflected in new projects that you generate using the seed.

## Getting Started

Before you can use seeds, you or someone in your team needs to create at least one. To check for seeds, run `@atomist generators seed` in any channel where the bot is present or dm the bot. 

If no seeds are available, you can create one by running `@atomist create seed`. 

## Using Seeds

Once your seed is created, customize it using your preferred tools and check into GitHub as usual.  When you have the master branch how you want it, generate a new project by running `@atomist create project`. 

The specific setup steps vary as determined by the seed project, so follow the bot prompts. When setup is complete, the bot links you to the newly created repo and Slack channel.


## Available Seeds

Atomist offers the seeds in the table below. You can also create your own. An organization can have more than one seed project, for example, to support multiple different basic service types. 


Entry | Description
------|------------
`spring-rest-seed` | Spring MVC REST Service 

To see all available seeds in your organization, run `@atomist generators seed`. 

## Naming

Seed names must end in "-seed". 

