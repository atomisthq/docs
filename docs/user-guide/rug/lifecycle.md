# A Day in the Life of a Rug Project

This page describes the nature, structure and lifecycle of a Rug
project.

If you haven't done so and you want to follow along, please [install
the Rug CLI][install].

[install]: http://docs.atomist.com/rug/cli/rug-cli-install/

## Inception

The easiest way to create a new Rug project is by using the
`NewRugArchiveProject` generator via the Bot or CLI. Here, we'll show
how to do it with the CLI.

```console
$ rug generate atomist-rugs:rug-archive:NewRugArchiveProject \
    my-rug-project \
    group_id=atomist-rugs \
    version=0.1.0 \
    description="My first Rug project"
Processing dependencies
  Downloading atomist-rugs/rug-archive/0.2.1/rug-archive-0.2.1.pom ← rugs (806 bytes) succeeded
  Downloading atomist-rugs/rug-archive/0.2.1/rug-archive-0.2.1.zip ← rugs (18 kb) succeeded
Resolving dependencies for atomist-rugs:rug-archive:0.2.1 completed
Loading atomist-rugs:rug-archive:0.2.1 into runtime completed
Running generator NewRugArchiveProject of atomist-rugs:rug-archive:0.2.1 completed

→ Project
  ~/develop/my-rug-project/ (5 kb in 7 files)

→ Changes
  ├─┬ .atomist
  | ├─┬ editors
  | | └── AddReadme.rug
  | ├── manifest.yml
  | ├─┬ templates
  | | └── readme.vm
  | └─┬ tests
  |   └── AddReadmeTest.ts
  ├── .atomist.yml
  ├── .gitignore
  └── README.md

Successfully generated new project my-rug-project
```

That command created a new directory named `my-rug-project` in the
current directory, `~/develop` in this case.

## Structure

The created Rug project has the following directory structure:

```console
$ tree -a my-rug-project
my-rug-project
├── .atomist
│   ├── editors
│   │   └── AddReadme.rug
│   ├── manifest.yml
│   ├── templates
│   │   └── readme.vm
│   └── tests
│       └── AddReadmeTest.ts
├── .atomist.yml
├── .gitignore
└── README.md

4 directories, 7 files
```

The editor `AddReadme.rug` and corresponding test `AddReadmeTest.ts` have
been generated when running the generate command.

Let's take a look at the `manifest.yml`:

```console
$ cd my-rug-project/.atomist
$ cat manifest.yml
group: atomist-rugs
artifact: my-rug-project
version: "0.1.0"
requires: "[0.8.0,1.0.0)"
dependencies:
extensions:
```

The `manifest.yml` specifies the unique coordinates of the Rug archive
as well as its version.  Dependencies and extensions can also be
declared

| Key | Description |
| --- | --- |
| `group` | The group of the Rug archive, should be the GitHub org |
| `artifact` | A unique identifier within the `group`, should be the GitHub repository name |
| `version` | Version of the Rug archive |
| `requires` | The rug-lib version this project is being developed with. Version range is allowed |
| `dependencies` | List of project dependencies in form group:artifact:version. Version ranges are allowed |
| `extensions` | List of binary dependencies, e.g., Rug Extension types. Version ranges are allowed |

## Running Tests

After making changes to your Rug code, you should run the tests.  The
generated Rug project already has some tests.

```console
$ rug test
Resolving dependencies for atomist-rugs:my-rug-project:0.1.0 ← local completed
Loading atomist-rugs:my-rug-project:0.1.0 ← local into runtime completed
Executing scenario AddReadme should add README.md...
  Testing assertion fileExists(IdentifierFunctionArg(readme,None))
  Testing assertion fileContains(IdentifierFunctionArg(readme,None),IdentifierFunctionArg(newName,None))
  Testing assertion fileContains(IdentifierFunctionArg(readme,None),IdentifierFunctionArg(newDescription,None))
Executing scenario AddReadme should reject invalid value name parameter...
Executing scenario AddReadme should reject missing parameter...
Running test scenarios in atomist-rugs:my-rug-project:0.1.0 ← local completed

Successfully executed 3 of 3 scenarios: Test SUCCESS
```

## Installing

To package the Rug project up and make it available to the Rug CLI to
run from any directory, you must install it:

```console
$ rug install
Resolving dependencies for atomist-rugs:my-rug-project:0.1.0 ← local completed
Loading atomist-rugs:my-rug-project:0.1.0 ← local into runtime completed
  Created META-INF/maven/atomist-rugs/my-rug-project/pom.xml
  Created .atomist/manifest.yml
  Created .atomist/metadata.json
Generating archive metadata completed
  Installed atomist-rugs/my-rug-project/0.1.0/my-rug-project-0.1.0.zip → /Users/dd/.atomist/repository
  Installed atomist-rugs/my-rug-project/0.1.0/my-rug-project-0.1.0.pom → /Users/dd/.atomist/repository
  Installed atomist-rugs/my-rug-project/0.1.0/my-rug-project-0.1.0-metadata.json → /Users/dd/.atomist/repository
Installing archive into local repository completed

→ Archive
  ~/develop/my-rug-project/.atomist/target/my-rug-project-0.1.0.zip (4 kb in 9 files)

→ Contents
  ├─┬ .atomist
  | ├─┬ editors
  | | └── AddReadme.rug
  | ├── manifest.yml
  | ├── metadata.json
  | ├─┬ templates
  | | └── readme.vm
  | └─┬ tests
  |   └── AddReadmeTest.ts
  ├── .atomist.yml
  ├── .gitignore
  ├─┬ META-INF/maven/atomist-rugs/my-rug-project
  | └── pom.xml
  └── README.md

Successfully installed archive for atomist-rugs:my-rug-project:0.1.0
```

The `install` command takes the project, packages it up for
distribution, and installs it under `~/.atomist/repository`.

The contents of the archive can be further tuned by adding entries to
`.gitignore` and `.atomist/ignore`, the packaging step considers the
contents of these files when creating the archive.

## Publishing

Publishing is the process of uploading an archive to a Maven
repository so it can only be used by others.  Before publishing a Rug
archive, you first need to configure a publishing repository in your
`~/.atomst/cli.yml`.  You must have write permission to this
repository, set the `publish` field to `true`, and you will typically
have to supply authentication information.  For example, if you have
the environment variables `MAVEN_BASE_URL`, `MAVEN_USER`, and
`MAVEN_TOKEN` set appropriate for your Maven repository, you would use
the following configuration in your `~/.atomist/cli.yml`:

```yaml
remote-repositories:
  rugs-release:
    publish: true
    url: "${MAVEN_BASE_URL}/rugs-release"
    authentication:
      username: "${MAVEN_USER}"
      password: "${MAVEN_TOKEN}"
```

Once you have your publishing repository configured, you simply run
`rug publish`.

```console
$ rug publish
Resolving dependencies for atomist-rugs:my-rug-project:0.1.0 ← local completed
Loading atomist-rugs:my-rug-project:0.1.0 ← local into runtime completed
  Created META-INF/maven/atomist-rugs/my-rug-project/pom.xml
  Created .atomist/manifest.yml
  Created .atomist/metadata.json
Generating archive metadata completed
  Uploading atomist-rugs/my-rug-project/0.1.0/my-rug-project-0.1.0.zip → rugs-release (4 kb) succeeded
  Uploading atomist-rugs/my-rug-project/0.1.0/my-rug-project-0.1.0.pom → rugs-release (639 bytes) succeeded
  Uploading atomist-rugs/my-rug-project/0.1.0/my-rug-project-0.1.0-metadata.json → rugs-release (1 kb) succeeded
  Downloading atomist-rugs/my-rug-project/maven-metadata.xml ← rugs-release (381 bytes) succeeded
  Uploading atomist-rugs/my-rug-project/maven-metadata.xml → rugs-release (333 bytes) succeeded
Publishing archive into remote repository completed

→ Archive
  ~/develop/my-rug-project/.atomist/target/my-rug-project-0.1.0.zip (4 kb in 9 files)

→ Contents
  ├─┬ .atomist
  | ├─┬ editors
  | | └── AddReadme.rug
  | ├── manifest.yml
  | ├── metadata.json
  | ├─┬ templates
  | | └── readme.vm
  | └─┬ tests
  |   └── AddReadmeTest.ts
  ├── .atomist.yml
  ├── .gitignore
  ├─┬ META-INF/maven/atomist-rugs/my-rug-project
  | └── pom.xml
  └── README.md

Successfully published archive for atomist-rugs:my-rug-project:0.1.0 to
  https://atomist.jfrog.io/atomist/rugs-release/atomist-rugs/my-rug-project/0.1.0/my-rug-project-0.1.0.zip
```

The `atomist-rugs:travis-editors:EnableTravisForRugArchiveTS` editor
configures testing, installing, and publishing archives as part of a
Travis CI build.  See the [build][] directory of the `travis-editors`
project for more detail.

[build]: https://github.com/atomist-rugs/travis-editors/tree/master/.atomist/build
