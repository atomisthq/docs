The Rug CLI is able to run Rugs locally against projects on your local
file system.

!!! caution ""
    The command-line example below are intended to illuminate the use
    of the Rug CLI.  The Rugs referenced and sample output do not
    necessarily reflect the current reality.

!!! tip ""
    The `rug CLI` downloads the Rugs and dependencies it needs on the
    fly. There is no specific `download` command.

## Search

To find available generators with the CLI, run the following command.

```console
$ rug search --operations --type generator
Resolving version range for com.atomist:rug:(0.12.9,0.13.1) completed
Resolving dependencies for com.atomist:rug:0.13.0-SNAPSHOT completed
  Searching https://api.atomist.com/catalog/operation/search
Searching catalogs completed

→ Remote Archives (18 archives found)
  atomist-rugs:flask-service [public] (0.1.2)
    Generators
    └── NewFlaskMicroserviceProject
  atomist-rugs:rug-project [public] (0.2.0)
    Generators
    ├── NewRugProject
    └── NewStarterRugProject
  atomist-rugs:spring-boot-rest-service [public] (0.7.1)
    Generators
    └── NewSpringBootRestService
...
```

When you use the `--operations` command-line argument, the output
lists the name of the Rug and its Rug archive.  Providing the `--type
RUG_TYPE` command-line option limits the results to Rugs of that type,
e.g., `generator` or `editor`.

## Describe

To get information about a Rug and list all its parameters, run the
`rug describe` command.

```console
$ rug describe archive atomist-rugs:spring-rest-service

$ rug describe editor atomist-rugs:spring-boot-rest-service:SpringBootThing \
    --artifact-version=1.0.0

$ rug describe generator atomist-rugs:spring-boot-rest-service:NewSpringBootThing
```

Providing `--artifact-version` is optional and defaults to `latest`
semantics.

## List

To list all locally available Rug archives, run the `rug list`
command:

```console
$ rug list -f 'version=[1.2,2.0)' -f 'group=*atomist*' -f 'artifact=*sp?ing*'
```

The local listing can be filtered by using `-f` filter expressions on
`group`, `artifact` and `version`. `group` and `artifact` support
wildcards of `*` and `?`.  `version` takes any version constraint.

## Edit

Run an editor as follows:

```console
$ rug edit atomist-rugs:common-editors:AddReadme --artifact-version=1.0.0 \
    parameter1=foo parameter2=bar

$ rug edit atomist-rugs:common-editors:AddReadme parameter1=foo parameter2=bar
```

Providing `--artifact-version` is optional and defaults to `latest`
semantics.  `--change-dir` or `-C` to tell the CLI to apply the editor
to a directory other than the current working directory.

## Generators

You can create new projects on your local machine using the CLI, for instance:

```console
$ cd ~/workspace
$ rug generate atomist-rugs:rug-project:NewStarterRugProject my-new-generator
```

The first argument is always the project name.  If the generator
requires additional parameters, just append the `parameter=value` to
the end of the command line.

```console
$ rug generate atomist-rugs:spring-boot-rest-service:NewSpringBootRestService" \
    --artifact-version=1.0.0 my-new-project parameter1=foo parameter2=bar

$ rug generate atomist-rugs:spring-boot-rest-service:NewSpringBootRestService" \
    my-new-project parameter1=foo parameter2=bar
```

Providing `--artifact-version` is optional and defaults to `latest`
semantics.  `--change-dir` or `-C` to tell the CLI to create the
project under a directory different than the current working
directory.
