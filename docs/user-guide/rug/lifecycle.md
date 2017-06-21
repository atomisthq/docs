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
$ rug generate atomist:rug-rugs:NewStarterRugProject my-rug-project
Created default configuration file at /Users/dd/.atomist/cli.yml
Resolving dependencies for atomist:rug-rugs (latest·zip) completed
Reading archive structure of atomist:rug-rugs (0.31.0·zip) completed
Loading rugs of atomist:rug-rugs (0.31.0·zip) completed
Running generator NewStarterRugProject of atomist:rug-rugs (0.31.0·zip) completed

→ Project
  ~/develop/my-rug-project/ (28 kb in 22 files)

→ Changes
  ├─┬ .atomist
  | ├── .gitignore
  | ├─┬ build
  | | ├── cli.yml
  | | └── travis-build.bash
  | ├─┬ editors
  | | └── MyFirstEditor.ts
  | ├─┬ handlers/command
  | | └── MyFirstCommandHandler.ts
  | ├─┬ handlers/event
  | | └── MyFirstEventHandler.ts
  | ├─┬ mocha
  | | └── SimpleTest.ts
  | ├── package.json
  | ├─┬ tests/handlers/command
  | | ├── MyFirstCommandHandlerSteps.ts
  | | └── MyFirstCommandHandlerTest.feature
  | ├─┬ tests/handlers/event
  | | ├── MyFirstEventHandlerSteps.ts
  | | └── MyFirstEventHandlerTest.feature
  | ├─┬ tests/project
  | | ├── MyFirstEditorSteps.ts
  | | └── MyFirstEditorTest.feature
  | ├── tsconfig.json
  | └── tslint.json
  ├── .atomist.yml
  ├── .gitattributes
  ├── CHANGELOG.md
  ├── LICENSE
  └── README.md

Successfully generated new project my-rug-project
```

That command created a new directory named `my-rug-project` in the
current directory, `~/develop` in this case.  You can see from the
output above that the generator created a project with a `.atomist`
directory containing a sample editor, command handler, event handler,
and tests.

## Set up

Before doing anything else, you need to install the project's
dependencies.  You do this using [NPM][npm].

```console
$ cd my-rug-project/.atomist
$ npm install
```

The `npm install` command will download all the needed dependencies
under a `node_modules` directory and create a `package-lock.json` file
recording what it has done.

[npm]: https://www.npmjs.com/ (NPM - Node Package Manager)

## Running Tests

After making changes to your Rug code, you should run the tests.  The
generated Rug project already has some tests.  Run the following
command in the `.atomist` directory of the project.

FIXME

```console
$ npm test

> @atomist-contrib/my-rug-project@0.1.0 test /Users/dd/develop/my-rug-project/.atomist
> npm run mocha && rug test


> @atomist-contrib/my-rug-project@0.1.0 mocha /Users/dd/develop/my-rug-project/.atomist
> mocha --compilers ts:espower-typescript/guess 'mocha/**/*.ts'



  default test
    ✓ should be true


  1 passing (9ms)

Resolving dependencies for atomist-contrib:my-rug-project (0.1.0·local) completed
Compiling source files of atomist-contrib:my-rug-project (0.1.0·local) completed
Loading rugs of atomist-contrib:my-rug-project (0.1.0·local) completed
Running test feature MyFirstCommandHandler handlers responds to commands
  Running test scenario Executing a sample command handler
  Completed test scenario Executing a sample command handler passed
Completed test feature MyFirstCommandHandler handlers responds to commands passed
Running test feature MyFirstEventHandler handler handles events
  Running test scenario Executing a sample event handler
  Completed test scenario Executing a sample event handler passed
Completed test feature MyFirstEventHandler handler handles events passed
Running test feature Make sure the sample TypeScript Editor has some tests
  Running test scenario MyFirstEditor should edit a project correctly
  Completed test scenario MyFirstEditor should edit a project correctly passed
Completed test feature Make sure the sample TypeScript Editor has some tests passed
Running tests in atomist-contrib:my-rug-project (0.1.0·local) completed

Successfully executed 3 of 3 tests: Test SUCCESS
```

## Installing

To package the Rug project up and make it available to the Rug CLI to
run from any directory, you must install it:

```console
$ rug install
Resolving dependencies for atomist-contrib:my-rug-project (0.1.0·local) completed
Compiling source files of atomist-contrib:my-rug-project (0.1.0·local) completed
Loading rugs of atomist-contrib:my-rug-project (0.1.0·local) completed
Generating archive metadata completed
Installing archive into local repository completed

→ Archive
  ~/develop/my-rug-project/.atomist/target/my-rug-project-0.1.0.zip (8 mb in 4240 files)

Successfully installed archive for atomist-contrib:my-rug-project (0.1.0)
```

The `install` command takes the project, packages it up for
distribution, and installs it under `~/.atomist/repository`.

The contents of the archive can be further tuned by adding entries to
`.atomist/ignore`, the packaging step considers the contents of these
files when creating the archive.  Note that paths appearing in the
`.atomist/ignore` file are rooted at the project root, not under the
`.atomist` directory.

## Publishing

Publishing is the process of uploading an archive to a Maven
repository so it can be used by others.  Before publishing a Rug
archive, you first need to configure a publishing repository in your
`~/.atomst/cli.yml`.  This is typically done by using the Rug CLI
`login` and `configure repositories` commands.

```console
$ rug login
$ rug configure repositories
```

Once you have your publishing repository configured, you simply run
`rug publish --id=TEAMID`, replacing `TEAMID` with your Slack team
identifier or its common name, both of which can be found in the Rug
CLI configuration file, usually found at `~/.atomist/cli.yml`.  Here's
an example `cli.yml` file.

```yaml
local_repository:
  path: "${user.home}/.atomist/repository"
remote_repositories:
  central:
    publish: false
    url: "http://repo.maven.apache.org/maven2/"
  rugs:
    publish: false
    url: "https://atomist.jfrog.io/atomist/rugs"
  t0123abcd:
    authentication:
      password: "TOKEN"
      username: "t0123abcd"
    publish: true
    url: "https://atomist.jfrog.io/atomist/T0123ABCD"
    name: "slackers"
```

Under the `#!yaml remote_repositories` element you can see two
standard read-only repositories, i.e., `#!yaml publish: false`, and
then the team specific repository which has a Slack identifier `#!yaml
t0123abcd` and a common name of `#!yaml slackers`.

To publish your Rug archive to your team repository, run the following
command.

```console
$ rug publish --id=slackers
Resolving dependencies for atomist-contrib:my-rug-project (0.1.0·local) completed
Compiling source files of atomist-contrib:my-rug-project (0.1.0·local) completed
Loading rugs of atomist-contrib:my-rug-project (0.1.0·local) completed
Generating archive metadata completed
Publishing archive into remote repository
  Uploading atomist-contrib/my-rug-project/0.1.0/my-rug-project-0.1.0.zip → team (9 mb) succeeded
  Uploading atomist-contrib/my-rug-project/0.1.0/my-rug-project-0.1.0.pom → team (806 bytes) succeeded
  Uploading atomist-contrib/my-rug-project/0.1.0/my-rug-project-0.1.0-metadata.json → team (20 kb) succeeded
  Downloading atomist-contrib/my-rug-project/maven-metadata.xml ← team (1 kb) succeeded
  Uploading atomist-contrib/my-rug-project/maven-metadata.xml → team (1 kb) succeeded
Publishing archive into remote repository completed
→ Archive
  ~/build/atomist-contrib/my-rug-project/.atomist/target/my-rug-project-0.1.0.zip (9 mb in 4484 files)
→ URL
  https://atomist.jfrog.io/atomist/T0123ABCD/atomist-contrib/my-rug-project/0.1.0/my-rug-project-0.1.0.zip
Successfully published archive for atomist-contrib:my-rug-project (0.1.0)
```
