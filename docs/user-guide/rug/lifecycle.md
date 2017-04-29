# A Day in the Life of a Rug Project

This page describes the nature, structure and lifecycle of a Rug
project.

If you haven't done so and you want to follow along, please [install
the Rug CLI][install].

[install]: /user-guide/interfaces/cli/install.md

## Inception

The easiest way to create a new Rug project is by using the
`NewStarterRugProject` generator via the Bot or CLI. Here, we'll show
how to do it with the CLI.

```console
$ rug generate atomist-rugs:rug-editors:NewStarterRugProject my-rug-project
Resolving dependencies for atomist-rugs:rug-editors (latest·zip) completed
Loading atomist-rugs:rug-editors (0.18.0·zip) completed
  TypeScript files added, run `cd .atomist && npm install`
Running generator NewStarterRugProject of atomist-rugs:rug-editors (0.18.0·zip) completed

→ Project
  ~/develop/my-rug-project (3 mb in 239 files)

→ Changes
  ├─┬ .atomist
  | ├── .gitignore
  | ├─┬ editors
  | | └── MyFirstEditor.ts
  | ├── manifest.yml
  | ├─┬ node_modules/@atomist/rug
  ...
  | ├── package.json
  | ├─┬ tests/project
  | | ├── MyFirstEditorTest.feature
  | | └── MyFirstEditorTest.ts
  | └── tsconfig.json
  ├── .atomist.yml
  ├── CHANGELOG.md
  ├── LICENSE
  └── README.md

Successfully generated new project my-rug-project
```

That command created a new directory named `my-rug-project` in the
current directory, `~/develop` in this case.

## Structure

The created Rug project has the following directory structure:

```console
$ tree -a my-rug-project
my-rug-project/
├── .atomist
│   ├── editors
│   │   └── MyFirstEditor.ts
│   ├── .gitignore
│   ├── manifest.yml
│   ├── package.json
│   ├── tests
│   │   └── project
│   │       ├── MyFirstEditorTest.feature
│   │       └── MyFirstEditorTest.ts
│   └── tsconfig.json
├── .atomist.yml
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── LICENSE
└── README.md
```

The editor `MyFirstEditor.ts` and corresponding test `MyFirstEditorTest.feature`
have been generated when running the generate command.

Let's take a look at the `manifest.yml`:

```console
$ cd my-rug-project/.atomist
$ cat manifest.yml
group: "atomist-rugs"
artifact: "my-rug-project"
version: "0.1.0"
requires: "[0.17.3,1.0.0)"
```

The `manifest.yml` specifies the unique coordinates of the Rug archive: its
group, name and version. Dependencies and extensions may also be declared:

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
Resolving dependencies for atomist-rugs:my-rug-project (0.1.0·local) completed
Invoking TypeScript Compiler on .ts files
  Created .atomist/tests/project/MyFirstEditorTest.js.map
  Created .atomist/tests/project/MyFirstEditorTest.js
  Created .atomist/editors/MyFirstEditor.js.map
  Created .atomist/editors/MyFirstEditor.js
Invoking compilers on project sources completed
Loading atomist-rugs:my-rug-project (0.1.0·local) completed
Running test feature Tests from MyFirstEditor.rt
  Running test scenario MyFirstEditor is added to your project by AddMyFirstEditor
  Completed test scenario MyFirstEditor is added to your project by AddMyFirstEditor passed
Completed test feature Tests from MyFirstEditor.rt passed
Running tests in atomist-rugs:my-rug-project (0.1.0·local) completed

Successfully executed 1 of 1 test: Test SUCCESS
```

## Installing

To package the Rug project up and make it available to the Rug CLI to
run from any directory, you must install it:

```console
$ rug install
Resolving dependencies for atomist-rugs:my-rug-project (0.1.0·local) completed
Invoking TypeScript Compiler on .ts files
  Created .atomist/tests/project/MyFirstEditorTest.js
  Created .atomist/tests/project/MyFirstEditorTest.js.map
  Created .atomist/editors/MyFirstEditor.js
  Created .atomist/editors/MyFirstEditor.js.map
Invoking compilers on project sources completed
Loading atomist-rugs:my-rug-project (0.1.0·local) completed
  Created META-INF/maven/atomist-rugs/my-rug-project/pom.xml
  Created .atomist/manifest.yml
  Created .atomist/metadata.json
Generating archive metadata completed
  Installed atomist-rugs/my-rug-project/0.1.0/my-rug-project-0.1.0.zip → ~/.atomist/repository
  Installed atomist-rugs/my-rug-project/0.1.0/my-rug-project-0.1.0.pom → ~/.atomist/repository
  Installed atomist-rugs/my-rug-project/0.1.0/my-rug-project-0.1.0-metadata.json → ~/.atomist/repository
Installing archive into local repository completed
→ Archive
  ~/develop/my-rug-project/.atomist/target/my-rug-project-0.1.0.zip (530 kb in 245 files)

Successfully installed archive for atomist-rugs:my-rug-project (0.1.0)

```

The `install` command takes the project, packages it up for
distribution, and installs it under `~/.atomist/repository`.

The contents of the archive can be further tuned by adding entries to
`.atomist/.gitignore`, the packaging step considers the contents of these files
when creating the archive.

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
Resolving dependencies for atomist-rugs:my-rug-project (0.1.0·local) completed
Invoking TypeScript Compiler on .ts files
  Created .atomist/tests/project/MyFirstEditorTest.js.map
  Created .atomist/tests/project/MyFirstEditorTest.js
  Created .atomist/editors/MyFirstEditor.js.map
  Created .atomist/editors/MyFirstEditor.js
Invoking compilers on project sources completed
Loading atomist-rugs:my-rug-project (0.1.0·local) completed
  Created META-INF/maven/atomist-rugs/my-rug-project/pom.xml
  Created .atomist/manifest.yml
  Created .atomist/metadata.json
Generating archive metadata completed
  Uploading atomist-rugs/my-rug-project/0.1.0/my-rug-project-0.1.0.zip → rugs-release (530 kb) succeeded
  Uploading atomist-rugs/my-rug-project/0.1.0/my-rug-project-0.1.0.pom → rugs-release (640 bytes) succeeded
  Uploading atomist-rugs/my-rug-project/0.1.0/my-rug-project-0.1.0-metadata.json → rugs-release (700 bytes) succeeded
  Downloading atomist-rugs/my-rug-project/maven-metadata.xml ← rugs-release (381 bytes) succeeded
  Uploading atomist-rugs/my-rug-project/maven-metadata.xml → rugs-release (333 bytes) succeeded

Publishing archive into remote repository completed

→ Archive
  ~/develop/my-rug-project/.atomist/target/my-rug-project-0.1.0.zip (530 kb in 245 files)

→ URL
  ${MAVEN_BASE_URL}/rugs-release/atomist-rugs/my-rug-project/0.1.0/my-rug-project-0.1.0.zip

Successfully published archive for atomist-rugs:my-rug-project (0.1.0)
```
