Before we get to using the CLI, let's cover some information on
configuration and behavior.

## Configuring

The default Rug CLI configuration file is located at
`~/.atomist/cli.yml`.  You can override the default location using the
`--settings=PATH` command-line option.  As the configuration file
extension suggests, it is a [YAML][yaml] file.

[yaml]: http://yaml.org/

If you are using the default configuration file and one does not
exist, the CLI will create a default one for you with contents like
the following.

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

You can configure a repository directory on your local file system
using the `path` key under the `local-repository` key.  When
specifying your system home directory, use the portable `${user.home}`
rather than system-specific `$HOME` or `~`.

You can specify any number of remote repositories under the
`remote-repositories` key.  The value of the key should be a mapping
whose keys are unique identifiers for each entry and whose values
provide the `url` and optionally whether to `publish` rugs to the
repository.  If you are publishing Rugs to the repository, you will
likely need to supply `authentication` details for the repository.
The authentication details should be a mapping specifying the
`username` and `password`.  A complete configuration for publishing to
a repository would look something like:

```yaml
remote-repositories:
  rugs:
    url: "https://atomist.jfrog.io/atomist/rugs-release"
    publish: true
    authentication:
      username: "YOUR_USER_NAME"
      password: "YOUR_PASSWORD_OR_TOKEN"
```

## Dependency Resolution

The Rug CLI will automatically resolve and download all dependencies
it needs to perform the requested operation.  Dependencies
include [JAR][jar] files and Rug archives.  Dependencies will be
downloaded to the configured local repository, `~/.atomist/repository`
by default, via [Aether][aether] and resolved from there.

[jar]: https://docs.oracle.com/javase/8/docs/technotes/guides/jar/jarGuide.html
[aether]: https://eclipse.org/aether/

## Help

The Rug CLI provides standard help output when the `--help`, `-h`, or
`-?` command-line option is used.  All of these options provide the
same output in the same context.  You can use the help command-line
option on the `rug` command itself to receive general information
about the Rug CLI, its options, and its subcommands.

```console
$ rug --help
Usage: rug [OPTION]... [COMMAND]...
Work with Rugs like editors or generators.

Options:
  -?,-h,--help  Print help information
  -q,--quiet    Do not display progress messages
  -v,--version  Print version information

Available commands:
  search        Search online catalog of available archives
  list          List locally installed archives
  describe      Print details about an archive or Rug

  generate      Run a generator to create a new project
  edit          Run an editor to modify an existing project
  test          Run test scenarios
  install       Create and install an archive into the local repository
  publish       Create and publish an archive into a remote repository

  tree          Evaluate a tree expression against a project

  repositories  Login and configure team-scoped repositories
  default       Set default archive
  extension     Manage command line extensions

  shell         Start a shell for the specified Rug archive
  help          Print usage help

Run 'rug COMMAND --help' for more detailed information on COMMAND.

Please report issues at https://github.com/atomist/rug-cli
```

You can get help on any subcommand by supplying the help command-line
option after the subcommand.

```console
$ rug search --help
Usage: rug search [OPTION]... [SEARCH]
Search online catalog of available archives.

Options:
  -X,--error            Print stacktraces
  -?,-h,--help          Print help information
  -o,--offline          Use only downloaded archives
  -q,--quiet            Do not display progress messages
  -r,--resolver-report  Print dependency tree
  -s,--settings FILE    Use settings file FILE
  -t,--timer            Print timing information
  -u,--update           Update dependency resolution
  -V,--verbose          Print verbose output

Command Options:
  --operations     Show operations in search output
  -T,--tag TAG     Specify a TAG to filter search
  --type TYPE      Specify a TYPE to filter search based on Rug type

SEARCH could be any text used to search the catalog.  TAG can be any valid tag,
eg. spring or elm.  TYPE can be either 'editor', 'generator', 'executor' or
'reviewer'.

Please report issues at https://github.com/atomist/rug-cli
```

## Version

The Rug CLI supports the standard `--version` command-line option.  It
will print the canonical version information on the first line of
output.  The second line contains detailed information from Git.

```console
$ rug --version
rug 0.24.0
https://github.com/atomist/rug-cli.git (git revision f88e69c; last commit 2017-02-20)
```

## Debugging

If you want a more verbose output that includes any exceptions that
Rug command may have encountered, please add `-X` to your command.
For example:

```console
$ rug test -X
```
