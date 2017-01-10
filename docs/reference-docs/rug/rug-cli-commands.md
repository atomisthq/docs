## Rug CLI Commands and Syntax

This page documents syntax and functionality of the Rug CLI.

*Note:* All commands listed below are provided only as examples of the
syntax.  They may refer to Rugs and Rug archives that do not exist and
therefore may not work.

### Configuring

In order to use the CLI the following file named `cli.yml` needs to be
placed in `~/.atomist`.  The contents of the simplest possible
`cli.yml` are below.

```yaml
# Set up the path to the local repository
local-repository:
  path: "${user.home}/.atomist/repository"

# Set up remote repositories to query for Rug archives. Additionally one of the
# repositories can also be enabled for publication (publish: true).
remote-repositories:
  maven-central:
    publish: false
    url: "http://repo.maven.apache.org/maven2/"
  rug-types:
    publish: false
    url: "https://atomist.jfrog.io/atomist/libs-release"
  rugs:
    publish: false
    url: "https://atomist.jfrog.io/atomist/rugs-release"
```

The Rug CLI will create the above `cli.yml` if you do not already have
one.

### Commands

The CLI will assume the current working directory to be the root for execution.

#### Using the CLI as Rug users

##### Invoking Editors

Run an editor as follows:

```
$ rug edit atomist-rugs:common-editors:AddReadme --artifact-version 1.0.0 parameter1=foo parameter2=bar

$ rug edit atomist-rugs:common-editors:AddReadme parameter1=foo parameter2=bar
```

`artifact-version` is optional and defaults to `latest` semantics.
`--change-dir` or `-C` for giving a generator a target directory.

##### Invoking Generators

```
$ rug generate atomist-rugs:spring-boot-rest-service:NewSpringBootRestService" \
    --artifact-version 1.0.0 my-new-project parameter1=foo parameter2=bar

$ rug generate atomist-rugs:spring-boot-rest-service:NewSpringBootRestService" \
    my-new-project parameter1=foo parameter2=bar
```

`artifact-version` is optional and defaults to `latest` semantics.
`--change-dir` or `-C` for giving a generator a target directory.

##### Describing Rug Artifacts

To get information about a Rug and list all its parameters, run the
`rug describe` command.

```
$ rug describe archive atomist-rugs:spring-rest-service

$ rug describe editor atomist-rugs:spring-rest-service:SpringBootThing \
  --artifact-version 1.0.0

$ rug describe generator atomist-rugs:spring-rest-service:NewSpringBootThing \
  --artifact-version 1.0.0
```

##### Listing Local Archives

To list all locally available Rug archives, run the `rug list`
command:

```
$ rug list -f version="[1.2,2.0)" -f group=*atomist* -f artifact=*sp?ing*
```

The local listing can be filtered by using `-f` filter expressions on
`group`, `artifact` and `version`. `group` and `artifact` support
wildcards of `*` and `?`.  `version` takes any version constraint.

#### Using the CLI as Rug developer

All the following commands need to executed from within the Rug
project directory.

##### Running Tests

To run all tests:

```
$ rug test
```

To run a specific named test:

```
$ rug test "Whatever Test Secanrio"
```

To run all scenarios from a .rt file:

```
$ rug test MyRugTestFilename
```

##### Installing a Rug archive

Creating a Rug zip archive and installing it into the local repository
can be done with the following command:

```
$ rug install
```

This command packages the project into a zip archive, creates a Pom
and installs both into the local repository under, usually
`.atomist/repository`.

### Dependency Resolution

The Rug CLI will automatically resolve and download the dependencies
of the given Rug archive when `edit` or `generate` is invoked. The
archives along with their dependencies will be downloaded to a local
repository under `~/.atomist` via Aether and resolved from there.

Therefore running above commands is a two step process:

1.  Search and resolve (eventually download) the archive referenced in
    the command.  The result of a resolution is cached for 60
    minutes. You can force re-resolution with the `-r` command-line
    option.
2.  Start up `rug-lib` passing parameters over to run the editor or
    generator

### Advanced Topics

#### Turning on Verbose output for Debugging

If you want a more verbose output that includes any exceptions that
Rug command may have encountered, please add `-X` to your command.
For example:

```
$ rug test -X
```
