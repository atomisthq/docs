Below is the complete list of options and commands for the Rug CLI.

## Global command-line options

`--disable-verification`
:   Disable verification of extensions (Use with Caution)

`--disable-version-check`
:   Disable version compatibility check (Use with Caution)

`-?`, `--help`
:   Print usage help

`-h`, `--help`
:   Print usage help

`-n`, `--noisy`
:   Display more progress messages

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

### `clean`

Clean up project

*Usage:*

```console
$ rug clean [OPTION]...
```

Clean up all temporarily created files and directories from the project.

### `configure`

Change/manage configuration settings

*Usage:*

```console
$ rug configure [OPTION]... SUBCOMMAND [ARCHIVE]
```

SUBCOMMAND can either be 'default archive' or 'repositories'.  The 'repositories' command uses your GitHub authentication to configure all of your private Rug archive repositories and enables them for publication with the publish command.  Please execute the login command before configuring repositories.  The 'default archive' command sets a global or project specific Rug archive so that Rugs can be invoked without a fully qualified coordinate.  ARCHIVE should be a valid archive coordinate of form GROUP:ARTIFACT or just GROUP.  At any time those defaults can be overriden by specifying GROUP:ARTIFACT and -a from the command line.

*Command aliases:* `config`, `conf`

*Subcommands:* `default archive`, `repositories`

*Command options:*

`-a AV`, `--archive-version=AV`
:   Set default archive version to AV

`-D`, `--delete`
:   Remove default archive

`-g`, `--global`
:   Set global or project default archive

`-S`, `--save`
:   Set default archive

### `describe`

Print details about an archive or Rug

*Usage:*

```console
$ rug describe [OPTION]... TYPE ARTIFACT
```

TYPE should be 'editor', 'generator', 'command-handler', 'event-handler', 'response-handler', 'function', 'dependencies' or 'archive' and ARTIFACT should be the full name of an artifact, e.g., "atomist:spring-service:Spring Microservice".  If the name of the artifact has spaces in it, you need to put quotes around it.  FORMAT can be 'json' or 'yaml' and is only valid when describing an archive.

*Command aliases:* `desc`

*Subcommands:* `editor`, `generator`, `archive`, `command-handler`, `event-handler`, `response-handler`, `integration-test`, `function`, `dependencies`

*Command options:*

`-a AV`, `--archive-version=AV`
:   Use archive version AV

`-l`, `--local`
:   Use local working directory as archive

`-O`, `--operations`
:   List operations

`--output=FORMAT`
:   Specify output FORMAT

### `edit`

Run an editor to modify an existing project

*Usage:*

```console
$ rug edit [OPTION]... EDITOR [PARAMETER]...
```

EDITOR is a Rug editor, e.g., "atomist:common-editors:AddReadme".  If the name of the editor has spaces in it, you need to put quotes around it.  To pass parameters to the editor you can specify multiple PARAMETERs in  form of "NAME=VALUE".

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

SUBCOMMAND is either 'install', 'uninstall' or 'list'.  EXTENSION should be a valid extension identifier of form GROUP:ARTIFACT.  If no version EV is provided with -a, the latest version of the extension is installed.

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

`-F`, `--force`
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

Create and install an archive from the current project in the local repository.

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

### `login`

Login using GitHub authentication

*Usage:*

```console
$ rug login [OPTION]...
```

The Rug CLI uses your GitHub token to verify your membership in GitHub organizations and Slack teams that have the Atomist Bot enrolled.  Those teams have acccess to additional features, eg. team private Rug archives.  Once you used the 'login' command, you can run 'configure repositories' to configure access to your team's artifact repositories.

*Command aliases:* `lg`

*Command options:*

`--mfa-code=MFA_CODE`
:   GitHub MFA code (only required if MFA is enabled)

`--username=USERNAME`
:   GitHub username

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

Create a Rug archive from the current repo and publish it in a remote repository.  Use -i to specify what repository configuration should be used to publish.  ID should refer to a repository name in cli.yml

*Command options:*

`--archive-artifact=AA`
:   Override archive artifact with AA

`--archive-group=AG`
:   Override archive group with AG

`-a AV`, `--archive-version=AV`
:   Override archive version with AV

`-F`, `--force`
:   Force publish if working tree isn't clean

`-i ID`, `--id=ID`
:   ID identifying the repository to publish into

### `search`

Search online catalog of available archives

*Usage:*

```console
$ rug search [OPTION]... [SEARCH]
```

SEARCH could be any text used to search the catalog.  TAG can be any valid tag, eg. spring or elm.  TYPE can be either 'editor', 'generator', 'command_handler', 'event_handler' or 'response_handler'.

*Command options:*

`-K TYPE`, `--type=TYPE`
:   Specify a TYPE to filter search based on Rug type

`-O`, `--operations`
:   List operations

`-T TAG`, `--tag=TAG`
:   Specify a TAG to filter search

### `shell`

Start a shell for a specified Rug archive

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

TEST is the name of a test feature or feature file.  If no TEST is specified, all scenarios will run.

### `to path`

Display path expression to a point in a file within a project

*Usage:*

```console
$ rug to-path [OPTION]... PATH
```

PATH must be a valid path within the project at DIR or '.'.  

*Command options:*

`-C DIR`, `--change-dir=DIR`
:   Evaluate expression against project in directory DIR, default is '.'

`--column=COLUMN`
:   Column within file at LINE

`--kind=KIND`
:   Rug Extension kind, eg. 'ScalaFile' or 'Pom'

`--line=LINE`
:   Line within the file

