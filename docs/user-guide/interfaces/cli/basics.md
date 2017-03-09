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

# Set up Rug catalog endpoints for searching
catalogs:
- "https://api.atomist.com/catalog"
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

You can specify any number of Rug catalogs to search using the
`catalogs` key.  The value of the key should be a sequence where each
element is a URL to a Rug catalog.

## Dependency Resolution

The Rug CLI will automatically resolve and download all dependencies
it needs to perform the requested operation.  Dependencies
include [JAR][jar] files and Rug archives.  Dependencies will be
downloaded to the configured local repository, `~/.atomist/repository`
by default, via [Aether][aether] and resolved from there.

[jar]: https://docs.oracle.com/javase/8/docs/technotes/guides/jar/jarGuide.html
[aether]: https://eclipse.org/aether/

## Debugging

If you want a more verbose output that includes any exceptions that
Rug command may have encountered, please add `-X` to your command.
For example:

```console
$ rug test -X
```
