Below is the complete list of options and commands for the Rug CLI.

## Global command-line options

`-?`, `--help`
:   Print help information

`-h`, `--help`
:   Print help information

`-o`, `--offline`
:   Use only downloaded archives

`-q`, `--quiet`
:   Do not display progress messages

`--requires=RUG_VERSION`
:   Overwrite the Rug version to RUG_VERSION (Use with Caution)

`-r`, `--resolver-report`
:   Print dependency tree

`-s FILE`, `--settings=FILE`
:   Use settings file FILE

`-t`, `--timer`
:   Print timing information

`-u`, `--update`
:   Update dependency resolution

`-V`, `--verbose`
:   Print verbose output

`-X`, `--error`
:   Print stacktraces

## Commands

### `default`

Set default archive

*Usage:*

```console
$ rug default [OPTION]... ACTION [ARCHIVE]
```

ACTION should be save or delete.  ARCHIVE should be a valid archive identifier of form GROUP:ARTIFACT or just GROUP.  At any time those defaults can be overriden by specifying GROUP:ARTIFACT and -a from the command line.

*Subcommands:* `save`, `delete`

*Command options:*

`-a AV`, `--archive-version=AV`
:   Set default archive version to AV

`-g`, `--global`
:   Set global or project default archive

### `describe`

Print details about an archive or Rug

*Usage:*

```console
$ rug describe [OPTION]... TYPE ARTIFACT
```

TYPE should be 'editor', 'generator', 'reviewer', 'command-handler', 'event-handler', 'response-handler' or 'archive' and ARTIFACT should be the full name of an artifact, e.g., "atomist:spring-service:Spring Microservice".  If the name of the artifact has spaces in it, you need to put quotes around it.  FORMAT can be 'json' or 'yaml' and is only valid when describing an archive.

*Command aliases:* `desc`

*Subcommands:* `editor`, `generator`, `reviewer`, `archive`, `command-handler`, `event-handler`, `response-handler`

*Command options:*

`-a AV`, `--archive-version=AV`
:   Use archive version AV

`-l`, `--local`
:   Use local working directory as archive

`-O FORMAT`, `--output=FORMAT`
:   Specify output FORMAT

### `edit`

Run an editor to modify an existing project

*Usage:*

```console
$ rug edit [OPTION]... EDITOR [PARAMETER]...
```

EDITOR is a Rug editor, e.g., "atomist:common-editors:AddReadme".  If the name of the editor has spaces in it, you need to put quotes around it.  To pass parameters to the editor you can specify multiple PARAMETERs in "form NAME=VALUE".

*Command aliases:* `ed`

*Command options:*

`-a AV`, `--archive-version=AV`
:   Use archive version AV

`-C DIR`, `--change-dir=DIR`
:   Run editor in directory DIR, default is '.'

`-d`, `--dry-run`
:   Do not persist changes, print diffs

`-I`, `--interactive`
:   Interactive mode for specifying parameter values

`-l`, `--local`
:   Use local working directory as archive

`-R`, `--repo`
:   Commit files to local git repository

### `exit`

Exit a shell session

*Usage:*

```console
$ rug exit [OPTION]...
```

*Command aliases:* `quit`, `q`

### `extension`

Manage command line extensions

*Usage:*

```console
$ rug extension SUBCOMMAND [OPTION]... [EXTENSION]
```

SUBCOMMAND is either install, uninstall or list.  EXTENSION should be a valid extension identifier of form GROUP:ARTIFACT.  If no version EV is provided with -a, the latest version of the extension is installed.

*Command aliases:* `ext`

*Subcommands:* `list`, `install`, `uninstall`

*Command options:*

`-a EV`, `--extension-version=EV`
:   Version EV of extension to install

### `generate`

Run a generator to create a new project

*Usage:*

```console
$ rug generate [OPTION]... GENERATOR PROJECT_NAME [PARAMETER]...
```

GENERATOR is a Rug generator, e.g., "atomist:spring-service:Spring Microservice".  If the name of the generator has spaces in it, you need to put quotes around it.  PROJECT_NAME specifies the required name of the generated project.  To pass parameters to the generator you can specify multiple PARAMETERs in form "NAME=VALUE".

*Command aliases:* `gen`

*Command options:*

`-a AV`, `--archive-version=AV`
:   Use archive version AV

`-C DIR`, `--change-dir=DIR`
:   Create project in directory DIR, default is '.'

`-F`, `--overwrite`
:   Force overwrite if target directory already exists

`-I`, `--interactive`
:   Interactive mode for specifying parameter values

`-l`, `--local`
:   Use local working directory as archive

`-R`, `--repo`
:   Initialize and commit files to a new git repository

### `help`

Print usage help

*Usage:*

```console
$ rug help
```

Prints this usage help.

*Command aliases:* `h`, `?`

### `install`

Create and install an archive into the local repository

*Usage:*

```console
$ rug install [OPTION]...
```

Create and install an archive from the current project in the local repository.  Ensure that there is a manifest.yml descriptor in the .atomist directory.

*Command options:*

`-a AV`, `--archive-version=AV`
:   Override archive version with AV

### `list`

List locally installed archives

*Usage:*

```console
$ rug list [OPTION]...
```

FILTER could be any of group, artifact or version.  VALUE should be a valid filter expression: for group and artifact ? and * are supported as wildcards;  the version filter can be any valid version or version range.

*Command aliases:* `ls`

*Command options:*

`-f FILTER=VALUE`, `--filter=FILTER=VALUE`
:   Specify filter of type FILTER with VALUE

### `path`

Evaluate a path expression against a project

*Usage:*

```console
$ rug path [OPTION]... [EXPRESSION]
```

EXPRESSION can be any valid Rug path expression.  Depending on your expression you might need to put it in quotes.  Use '--values' to display values of tree nodes; caution as this option might lead to a lot of data being printed.

*Command aliases:* `tree`

*Command options:*

`-C DIR`, `--change-dir=DIR`
:   Evaluate expression against project in directory DIR, default is '.'

`-v`, `--values`
:   Displays tree node values

### `publish`

Create and publish an archive into a remote repository

*Usage:*

```console
$ rug publish [OPTION]...
```

Create a Rug archive from the current repo and publish it in a remote repository.  Ensure that there is a manifest.yml descriptor in the .atomist directory.  Use -i to specify what repository configuration should be used to publish.  ID should refer to a repository name in cli.yml

*Command options:*

`--archive-artifact=AA`
:   Override archive artifact with AA

`--archive-group=AG`
:   Override archive group with AG

`-a AV`, `--archive-version=AV`
:   Override archive version with AV

`-i ID`, `--id=ID`
:   ID identifying the repository to publish into

### `repositories`

Login and configure team-scoped repositories

*Usage:*

```console
$ rug repositories SUBCOMMAND [OPTION]...
```

The Rug CLI uses your GitHub token to verify your membership in GitHub organizations and Slack teams that have the Atomist Bot enrolled.  Those teams have acccess to additional features, eg. team private Rug archives.  You can use the 'login' subcommand to login and then 'configure' to provision the list of repositories you have access to.

*Command aliases:* `repo`

*Subcommands:* `login`, `configure`

*Command options:*

`--mfa-code=MFA_CODE`
:   GitHub MFA code (only required if MFA is enabled)

`--username=USERNAME`
:   GitHub username

### `search`

Search online catalog of available archives

*Usage:*

```console
$ rug search [OPTION]... [SEARCH]
```

SEARCH could be any text used to search the catalog.  TAG can be any valid tag, eg. spring or elm.  TYPE can be either 'editor', 'generator', 'executor' or 'reviewer'.

*Command options:*

`--operations`
:   Show operations in search output

`-T TAG`, `--tag=TAG`
:   Specify a TAG to filter search

`--type=TYPE`
:   Specify a TYPE to filter search based on Rug type

### `shell`

Start a shell for the specified Rug archive

*Usage:*

```console
$ rug shell [OPTION]... ARCHIVE
```

ARCHIVE should be a full name of an Rug archive, e.g., "atomist:spring-service".

*Command aliases:* `repl`, `load`

*Command options:*

`-a AV`, `--archive-version=AV`
:   Use archive version AV

`-l`, `--local`
:   Use local working directory as archive

### `test`

Run test scenarios

*Usage:*

```console
$ rug test [OPTION]... [TEST]
```

TEST is the name of a test scenario.  If no TEST is specified, all scenarios will run.

### `to-path`

Display path expression to a point in a file within a project

*Usage:*

```console
$ rug to-path [OPTION]... PATH
```

PATH must be a valid path within the project at DIR or '.'.  

*Command aliases:* `to-tree`

*Command options:*

`-C DIR`, `--change-dir=DIR`
:   Evaluate expression against project in directory DIR, default is '.'

`--column=COLUMN`
:   Column within file at LINE

`--kind=KIND`
:   Rug Extension kind, eg. 'ScalaFile' or 'Pom'

`--line=LINE`
:   Line within the file

