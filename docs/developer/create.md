Automated project creation saves time and ensures that you start new services,
libraries and other projects with good solid code that meets your standards
and includes the components you need, configured the way you like them.

In Atomist, you automate project creation using a generator, a type of [command][].
Generators typically copy their code from a known-good repository called a seed,
and then modify the code in certain ways, such as renaming classes so that it's
ready to use without lots of manual find and replace. Generators frequently also
configure supporting systems, for example, by creating a dedicated
Slack channel, setting up issue tracking, and so on.

To make your own generator, get an [SDM][sdm-project] of your own.

In team mode, the SDM hooks your generator up to chat and creates repositories
in your version control. You can also add a custom form to serve project creation
to your team or organization.  In local mode, the SDM creates a directory on your filesytem.

This page gives you enough information to

* create a generator from your own seed
* with your own transforms
* and custom parameters

[sdm-project]: sdm.md (Atomist SDM Project)
[command]: commands.md (Atomist SDM Commands)

## Seed

A _seed_ is a project that works as a starting point. It is real, functional code, not a
template. The simplest generator makes a copy of the seed in a new repository;
most generators transform the code first.

You can use any project you already have, or craft one carefully for new projects to start
from. This makes a canonical "best starting point" for your organization.

For examples, see all the repositories in our [atomist-seeds organization](https://github.com/atomist-seeds).

## Parameters

Generator commands work the same way as [command parameters](commands.md#command-parameters).

In addition, a generator command automatically gets some parameters that every generator needs:

| attribute    |  type  | description | default |
| -------------| ------ | ----------- | ------- |
| target.description | string | description for the new repository | "" |
| target.repo | string | new repository name | none |
| target.visibility | "public" or "private" | what kind of visibility a new repository gets | "private" |

[apidoc-generator-registration]: https://atomist.github.io/sdm/interfaces/_api_registration_generatorregistration_.generatorregistration.html (API Doc for GeneratorRegistration)

## Code sample

Check out [our guide on setting up a generator](/developer/setting-up-generator/) for a complete example.

## Common generators

To make a .Net generator, you could use this:

<!-- atomist:code-snippet:start=lib/sdm/dotnetCore.ts#dotnetGenerator -->
```typescript
/**
 * .NET Core generator registration
 */
const DotnetCoreGenerator: GeneratorRegistration = {
    name: "DotnetCoreGenerator",
    intent: "create dotnet-core project",
    description: "Creates a new .NET Core project",
    tags: ["dotnet"],
    autoSubmit: true,
    startingPoint: GitHubRepoRef.from({ owner: "atomist-seeds", repo: "dotnet-core-service", branch: "master" }),
    transform: [
        UpdateReadmeTitle,
        replaceSeedSlug("atomist-seeds", "dotnet-core-service"),
        DotnetCoreProjectFileCodeTransform,
    ],
};
```
<!-- atomist:docs-sdm:codeSnippetInline: Snippet 'dotnetGenerator' found in https://raw.githubusercontent.com/atomist/samples/master/lib/sdm/dotnetCore.ts -->
<div class="sample-code"><a href="https://github.com/atomist/samples/tree/master/lib/sdm/dotnetCore.ts#L69-L84" target="_blank">Source</a></div>
<!-- atomist:code-snippet:end -->
