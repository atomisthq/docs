## Develop Generators

### A Rug Generator is a Rug project

As said previously, generators are actual running projects with the addition of
the `.atomist` directory. Once that directory is added, we call those projects
Rug Generator projects.

There are two paths to bootstrap a generator. Either you have an existing
template project your team usually clones and manually updates or you want to
start from scratch.

#### Convert your template project into a Rug generator project

If you have an existing template project, you can convert it to a Rug
generator using a few editors in [Rug editors][rugeditors].

First, turn your project into a Rug project:

```console
$ cd ~/workspace/your/template/project
$ rug edit atomist-rugs:rug-editors:ConvertExistingProjectToRugArchive \
    archive_name=my-new-generator \
    group_id=my-rugs \
    version=0.13.0
```

Next, make it support TypeScript, which is the language used to develop Rugs:

```console
$ rug edit atomist-rugs:rug-editors:AddTypeScript
```

Finally, add a generator stub:

```console
$ rug edit atomist-rugs:rug-editors:AddTypeScriptGenerator \
    generator_name=MyNewGenerator \
    description="This is my newest generator."
```

#### Create a generator from scratch

You can start a new Rug generator project from nothing using the
[rug-project][rugproj] Rug editors. For instance:

```console
$ cd ~/workspace
$ rug generate atomist-rugs:rug-archive:NewStarterRugProject my-new-generator
```

This will provide you with a sane default to start from. Add now your own
project content and start editing the default generator.
