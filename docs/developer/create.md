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

## Generator Registration

To add a generator to your SDM, register it where you configure your SDM 
(usually [machine.ts](sdm.md#machinets)):

```typescript
sdm.addGeneratorCommand(MkdocsSiteGenerator);
```

The sample code on this page is about a generator for starting a new documentation site
 like this one.

That `MkdocsSiteGenerator` is a `[GeneratorRegistration][apidoc-generator-registration]`:

```typescript
export const MkdocsSiteGenerator: GeneratorRegistration = {
    name: "Mkdocs Site",
    intent: "create mkdocs site",
    startingPoint: GitHubRepoRef.from({
        owner: "atomist-seeds",
        repo: "mkdocs-site"
    }),
    transform: [updateTitle("README.md", "New Project")],
}
```

The important elements of a `GeneratorRegistration` are:

*  *name* of the generator. This can be any string.
*  *intent* a string or array of strings; type this to trigger the command.
*  *startingPoint* gives the generator a seed. 
Use a pointer to a repository in version control - see [RepoRef](reporef.md) for options.
*  *transform* is an array of zero or more [code transforms](transform.md) to apply.

## Parameters

Generator commands work the same way as [command parameters](commands.md#command-parameters).

In addition, a generator command automatically gets some parameters that every generator needs:


| attribute    |  type  | description | default |
| -------------| ------ | ----------- | ------- |
| target.description | string | description for the new repository | "" |
| target.repo | string | new repository name | none |
| target.visibility | "public" or "private" | what kind of visibility a new repository gets | "private" |

[apidoc-generator-registration]: https://atomist.github.io/sdm/interfaces/_lib_api_registration_generatorregistration_.generatorregistration.html (API Doc for GeneratorRegistration)
