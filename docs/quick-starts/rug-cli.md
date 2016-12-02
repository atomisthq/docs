## Rug CLI Quick Start

The Rug CLI is a great way to better understand how Atomist works.
Like Atomist Buttons and the Atomist Bot, the Rug CLI allows you to
run Generators and Editors, but that is just the beginning.  The Rug
CLI is a necessary tool when developing and testing your own Rugs.
This means this quick start guide is a bit more involved that those
for Buttons and the Bot, but don't fret!  We are working diligently to
make interacting with the Rug CLI and simple and intuitive as
possible.

### Installing the Rug CLI

You can install the Rug command-line interface using standard
packaging tools for your operating system.

*   [Mac OS X / macOS](/rug-cli/install-macos.md)
*   [GNU/Linux](/rug-cli/install-linux.md)
*   [MS Windows](https://github.com/atomist/rug-cli/issues/6) (work in progress)

### Configure the Rug CLI

Create a file named `~/.atomist/cli.yml` with the following contents:

```yaml
# Set up the path to the local repository
local-repository:
  path: "${HOME}/.atomist/repository"

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

### 'Git' Some Examples

If you are interested in using the Rug CLI, you should become familiar
with Rug Editors, Generators, and Reviewers.  The best way to do that
is to look at some examples.  Some simple examples of Rug Editors can
be found in the [common-editors][common] repo.  You can clone that
repo with the following command.

```sh
$ git clone https://github.com/atomist-rugs/common-editors.git
$ cd common-editors
$ ls -1
CODE_OF_CONDUCT.md
LICENSE
README.md
src/
travis-build.bash
```

You cloned the repo, but where are the Rugs?  Rugs are always located
in the `.atomist` directory at the top level of the project, i.e., the
same directory that has the `.git` directory.

```sh
$ ls -1F .atomist/
editors/
manifest.yml
templates/
tests/
```

Here you can see the standard layout for a Rug directory.  It has a
`manifest.yml` describing the contents of the archive.  Think of this
a the metadata for your Rugs, i.e., the name, version, dependencies,
etc.  The Editors and Generators are in the `editors` directory.  Any
templates are in the `templates` directory.  Testing is integral to
Rug, so we also use a `tests` directory to hold all our tests.

Let's see what Editors we have available.

```sh
$ awk '$1 == "editor" { print $2 }' .atomist/editors/*.rug
AddApacheSoftwareLicense20
AddReadme
AddScalaMavenGitIgnore
ClassRenamer
PackageMove
PomParameterizer
RemoveApacheSoftwareLicense20
```

Feel free to look around in the `.atomist` directory to see what is
there, investigate the Rug syntax, and see what the tests look like.

### Test Rugs

It is a best practice to provide tests for your Rugs.  The first Rug
command we are going to try will run all of the tests available in the
common-editors repo.

```sh
$ rug test
Downloading com/atomist/rug-cli-root/1.0.0/rug-cli-root-1.0.0.pom ← rug-types (0kb) succeeded
Downloading com/atomist/rug/maven-metadata.xml ← rug-types (2kb) succeeded
Downloading com/atomist/rug/0.4.0/rug-0.4.0.pom ← rug-types (13kb) succeeded
... (more downloads)
Downloading com/atomist/rug-cli-root/1.0.0/rug-cli-root-1.0.0.jar ← rug-types (1kb) succeeded
Downloading org/scala-lang/scala-reflect/2.11.8/scala-reflect-2.11.8.jar ← maven-central (4466kb) succeeded
Resolving dependencies for atomist-rugs:common-editors:0.1.0 ← local completed
Loading atomist-rugs:common-editors:0.1.0 ← local into runtime completed
Executing scenario AddApacheSoftwareLicense20 should add a new LICENSE file according to a provided template...
  Testing assertion fileExists(SimpleLiteral(LICENSE))
  Testing assertion fileContains(SimpleLiteral(LICENSE),SimpleLiteral(Version 2.0, January 2004))
Executing scenario AddScalaMavenGitIgnore should add a new .gitignore file according to a provided template...
  Testing assertion fileExists(SimpleLiteral(.gitignore))
  Testing assertion fileContains(SimpleLiteral(.gitignore),SimpleLiteral(# Created by Atomist))
Executing scenario AddScalaMavenGitIgnore should overwrite an existing .gitignore file according to a provided template...
  Testing assertion fileExists(SimpleLiteral(.gitignore))
  Testing assertion fileContains(SimpleLiteral(.gitignore),SimpleLiteral(# Created by Atomist))
Executing scenario AddReadme should add README.md...
  Testing assertion fileExists(IdentifierFunctionArg(readme,None))
  Testing assertion fileContains(IdentifierFunctionArg(readme,None),IdentifierFunctionArg(newName,None))
  Testing assertion fileContains(IdentifierFunctionArg(readme,None),IdentifierFunctionArg(newDescription,None))
Executing scenario AddReadme should reject invalid value name parameter...
Executing scenario AddReadme should reject missing parameter...
Executing scenario ClassRenamer should rename simple class...
  Testing assertion EqualsExpression(fileCount(),SimpleLiteral(1))
  Testing assertion fileContains(SimpleLiteral(src/main/java/Cat.java),SimpleLiteral(class Cat))
Executing scenario ClassRenamer should rename class and leave no references to old name...
  Testing assertion fileExists(SimpleLiteral(src/main/java/com/atomist/springrest/WeirdAndWonderful.java))
  Testing assertion ParsedJavaScriptFunction(JavaScriptBlock( !result.anyFileContains(".java", oldclass) ))
Executing scenario ClassRenamer should rename class but leave any additional characters on the class name...
  Testing assertion fileExists(SimpleLiteral(src/main/java/com/atomist/springrest/WeirdAndWonderfulConfiguration.java))
  Testing assertion fileExists(SimpleLiteral(src/main/java/com/atomist/springrest/WeirdAndWonderfulApplication.java))
  Testing assertion fileExists(SimpleLiteral(src/test/java/com/atomist/springrest/WeirdAndWonderfulApplicationTests.java))
  Testing assertion fileExists(SimpleLiteral(src/test/java/com/atomist/springrest/WeirdAndWonderfulOutOfContainerIntegrationTests.java))
  Testing assertion fileExists(SimpleLiteral(src/test/java/com/atomist/springrest/WeirdAndWonderfulWebIntegrationTests.java))
  Testing assertion ParsedJavaScriptFunction(JavaScriptBlock( !result.anyFileContains(".java", "SpringRest") ))
Executing scenario PackageMove should move base package and leave no references to old packages...
  Testing assertion fileExists(SimpleLiteral(src/main/java/com/foo/bar/SpringRestConfiguration.java))
  Testing assertion ParsedJavaScriptFunction(JavaScriptBlock( !result.anyFileContains(".java", oldpack) ))
Executing scenario PomParameterizer should establish a new project's valid pom.xml...
  Testing assertion fileExists(SimpleLiteral(pom.xml))
  Testing assertion fileContains(SimpleLiteral(pom.xml),SimpleLiteral(<artifactId>mynewproject</artifactId>))
  Testing assertion fileContains(SimpleLiteral(pom.xml),SimpleLiteral(<groupId>mygroup</groupId>))
  Testing assertion fileContains(SimpleLiteral(pom.xml),SimpleLiteral(<version>0.0.1-SNAPSHOT</version>))
  Testing assertion fileContains(SimpleLiteral(pom.xml),SimpleLiteral(<description>My project description</description>))
Executing scenario RemoveApacheSoftwareLicense20 should remove a LICENSE file...
  Testing assertion ParsedJavaScriptFunction(JavaScriptBlock( !result.fileExists("LICENSE") ))
Running test scenarios in atomist-rugs:common-editors:0.1.0 ← local completed

Successfully executed 12 of 12 scenarios: Test SUCCESS
```

The above command will download all the dependencies needed to run the
editors defined in the common-editors repo.  Depending on the speed of
your network connection, this may take some time.  Each dependency
only need be downloaded once, so subsequent executions of `rug` will
be faster.

As you can see from the last line of output, all of the test scenarios
passed.

### Install a Rug Archive

The next step is to create a Rug archive and install it locally so you
can use it on local projects.  This is accomplished with the `install`
command.

```sh
$ rug install
Resolving dependencies for atomist-rugs:common-editors:0.1.0 ← local completed
Loading atomist-rugs:common-editors:0.1.0 ← local into runtime completed
Installed atomist-rugs/common-editors/0.1.0/common-editors-0.1.0.zip → /Users/dd/.atomist/repository
Installed atomist-rugs/common-editors/0.1.0/common-editors-0.1.0.pom → /Users/dd/.atomist/repository
Installing archive into local repository completed

→ Archive
  ~/develop/atomist-rugs/common-editors/.atomist/target/common-editors-0.1.0.zip (27kb in 32 files)

→ Contents
  ├─ .atomist
  |  ├─ editors
  |  |  ├─ AddApacheSoftwareLicense20.rug
  |  |  ├─ AddReadme.rug
  |  |  ├─ AddScalaMavenGitIgnore.rug
  |  |  ├─ ClassRenamer.rug
  |  |  ├─ PackageMove.rug
  |  |  ├─ PomParameterizer.rug
  |  |  └─ RemoveApacheSoftwareLicense20.rug
  |  ├─ manifest.yml
  |  ├─ templates
  |  |  ├─ ApacheSoftwareLicenseV20.vm
  |  |  ├─ ExampleEditor.vm
  |  |  ├─ ExampleEditorTest.vm
  |  |  ├─ gitignore.vm
  |  |  └─ readme.vm
  |  └─ tests
  |     ├─ AddApacheSoftwareLicense20.rt
  |     ├─ AddGitIgnore.rt
  |     ├─ AddReadme.rt
  |     ├─ ClassRenamer.rt
  |     ├─ PackageMove.rt
  |     ├─ PomParameterizer.rt
  |     └─ RemoveApacheSoftwareLicense20.rt
  ├─ .gitignore
  ├─ CODE_OF_CONDUCT.md
  ├─ LICENSE
  ├─ META-INF/maven/atomist-rugs/common-editors
  |  └─ pom.xml
  ├─ README.md
  ├─ src/main/java/com/atomist/springrest
  |  ├─ SpringRestApplication.java
  |  └─ SpringRestConfiguration.java
  ├─ src/main/resources
  |  ├─ application.properties
  |  └─ logback.xml
  └─ src/test/java/com/atomist/springrest
     ├─ SpringRestApplicationTests.java
     ├─ SpringRestOutOfContainerIntegrationTests.java
     └─ SpringRestWebIntegrationTests.java

Successfully installed archive for atomist-rugs:common-editors:0.1.0
```

This command packages up all of the Rugs in the `.atomist` directory
and installs them in your local repository, typically
`~/.atomist/repository`.

### List Editors

Remember above when we ran that arcane `awk` command to list the
Editors?  There is a better way!  Now that we some Editors installed
locally, we can list our local Editors.

```sh
$ rug list
Resolving dependencies for com.atomist:rug:0.4.0 completed
Loading com.atomist:rug:0.4.0 into runtime completed
Listing local archives completed

→ Local Archives
  atomist-rugs:common-editors (0.1.0)

For more information on specific archive version, run:
  rug describe archive ARCHIVE -a VERSION
```

Looks like the Rug Archive we installed is indeed installed.  That
last line of the output tells us how we can get more information.
Let's try that command.  Since we only have one version available, we
can omit the `-a` command-line option.  When it is not provided, the
latest version is used.

```sh
$ rug describe archive atomist-rugs:common-editors
Resolving dependencies for atomist-rugs:common-editors:latest completed
Loading atomist-rugs:common-editors:0.1.0 into runtime completed

atomist-rugs:common-editors:0.1.0

→ Origin
  atomist-rugs/common-editors.git#master (5c8ec50)
→ Archive
  ~/.atomist/repository/atomist-rugs/common-editors/0.1.0/common-editors-0.1.0.zip (27kb in 32 files)

→ Editors
  AddApacheSoftwareLicense20 (adds the Apache Software License version 2.0 file)
  AddReadme (adds a project specific README)
  AddScalaMavenGitIgnore (adds a .gitignore suitable for Scala Maven projects)
  ClassRenamer (renames a Java class, replacing one literal pattern with another)
  PackageMove (renames a Java package)
  PomParameterizer (updates a Maven pom to a new group, artifact, version and description)
  RemoveApacheSoftwareLicense20 (removes an Apache Software License version 2.0 file if present)

→ Requires
  [0.4.0,1.0.0)

To get more information on any of the Rugs listed above, run:
  rug describe editor|generator|executor|reviewer ARTIFACT
```

That list of Editors looks familiar, we must be doing something right!
Again, the last line of the output tells us how we can get more
information.  Let's try it.

```sh
$ rug describe editor AddApacheSoftwareLicense20

No valid ARTIFACT provided, no default artifact defined and not in local mode.

Run the following command for usage help:
  rug describe --help.
```

Hmm, looks like something went wrong.  Fortunately the error tells we
either need to define a default artifact or run in local mode.  How do
we run in local mode?

```sh
$ rug describe --help
Usage: rug describe [OPTION]... TYPE ARTIFACT
Print details about an archive or Rug.

Options:
  -?,-h,--help          Print help information
  -X,--error            Print verbose error messages
  -o,--offline          Use only downloaded archives
  -q,--quiet            Don't display progress messages
  -r,--resolver-report  Print dependency tree
  -s,--settings FILE    Use settings file FILE
  -t,--timer            Print timing information

Command Options:
  -a,--archive-version AV  Use archive version AV
  -l,--local               Use local working directory as archive

TYPE should be 'editor', 'generator', 'executor', 'reviewer' or
'archive' and ARTIFACT should be the full name of an artifact, e.g.,
"atomist:spring-service:Spring Microservice".  If the name of the
artifact has spaces in it, you need to put quotes around it.

Please report issues at https://github.com/atomist/rug-cli
```

The `-l` command-line option looks promising.

```sh
$ rug describe -l editor AddApacheSoftwareLicense20
Resolving dependencies for atomist-rugs:common-editors:0.1.0 ← local completed
Loading atomist-rugs:common-editors:0.1.0 ← local into runtime completed

AddApacheSoftwareLicense20
atomist-rugs:common-editors:0.1.0
adds the Apache Software License version 2.0 file

→ Tags
  license (license)
  apache (apache)
  documentation (documentation)
→ Parameters
  no parameters needed

To invoke the AddApacheSoftwareLicense20 editor, run:
  rug edit "atomist-rugs:common-editors:AddApacheSoftwareLicense20" -a 0.1.0 -l
```

So it looks like if we run this Editor, it will add "the Apache
Software License version 2.0 file" to the project.  The last line of
the output once again gives us the information we need: how to run
this Editor.  Let's try it.

### Run an Editor

We will just run the command we were provided above.

```sh
$ rug edit "atomist-rugs:common-editors:AddApacheSoftwareLicense20" -a 0.1.0 -l
Resolving dependencies for atomist-rugs:common-editors:0.1.0 ← local completed
Loading atomist-rugs:common-editors:0.1.0 ← local into runtime completed
Running editor AddApacheSoftwareLicense20 of atomist-rugs:common-editors:0.1.0 ← local completed

→ Project
  ~/develop/atomist-rugs/common-editors/ (127kb in 34 files)

→ Changes
  ├─ LICENSE created 11kb
  └─ .provenance.txt created 213bytes

Successfully edited project common-editors
```

Looks like two files were edited in the local repository.

```sh
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.provenance.txt

nothing added to commit but untracked files present (use "git add" to track)
```

Hmm, git shows only one file has been modified.  Why?  Well, the
contents of the `LICENSE` file were set to be the Apache Software
License, but that is what the contents already were.  Git is smart.
What is that `provenance.txt` file?

```sh
$ cat .provenance.txt
####

# editor info
name: atomist-rugs.common-editors.AddApacheSoftwareLicense20
group: atomist-rugs
artifact: common-editors
version: 0.1.0

# backing git repo
repo: n/a
branch: n/a
sha: n/a

# parameter values

```

Looks like it is a record of what we have done, nice!

I suppose we should have guessed the editor would act on the local
directory, but we don't really want to edit the current project.
Let's create another project to edit.

```sh
$ cd ..
$ mkdir atomist-test
$ cd !$
$ git init
$ rug edit "atomist-rugs:common-editors:AddApacheSoftwareLicense20" -a 0.1.0 -l

Current directory is not a valid archive directory. Couldn't find .atomist folder.
```

While the local mode helped us when we wanted to run the Editor in the
`.atomist` directory, it is not helping us now that we are in a
different directory.  Let's try the other option, setting a default
artifact.

```sh
$ rug --help
Usage: rug [OPTION]... [COMMAND]...
Work with Rugs like editors or generators.

Options:
  -?,-h,--help  Print help information
  -q,--quiet    Don't display progress messages
  -v,--version  Print version information

Available commands:
  list       List locally installed archives
  describe   Print details about an archive or Rug
  generate   Run a generator to create a new project
  edit       Run an editor to modify an existing project
  test       Run test scenarios
  install    Create and install an archive into the local repository
  publish    Create and publish an archive into a remote repository
  default    Set default archive
  extension  Manage command line extensions

Run 'rug COMMAND --help' for more detailed information on COMMAND.

Please report issues at https://github.com/atomist/rug-cli
```

The `default` command looks promising.

```sh
$ rug default --help
Usage: rug default [OPTION]... [ARCHIVE]
Set default archive.

Options:
  -?,-h,--help          Print help information
  -X,--error            Print verbose error messages
  -o,--offline          Use only downloaded archives
  -q,--quiet            Don't display progress messages
  -r,--resolver-report  Print dependency tree
  -s,--settings FILE    Use settings file FILE
  -t,--timer            Print timing information

Command Options:
  -a,--archive-version AV  Set default archive version to AV
  -d,--delete              Delete global or project default archive
  -g,--global              Set global or project default archive

ARCHIVE should be a valid archive identifier of form GROUP:ARTIFACT or
just GROUP.  At any time those defaults can be overriden by specifying
GROUP:ARTIFACT and -a from the command line.

Please report issues at https://github.com/atomist/rug-cli
```

Seems simple enough.

```sh
$ rug default atomist-rugs:common-editors -a 0.1.0
Resolving dependencies for com.atomist:rug:0.4.0 completed
Loading com.atomist:rug:0.4.0 into runtime completed

→ Default (project)
  group: atomist-rugs
  artifact: common-editors
  version: 0.1.0

Successfully configured project default archive configuration
```

Now let's try again.

```sh
$ rug edit "atomist-rugs:common-editors:AddApacheSoftwareLicense20"
Resolving dependencies for atomist-rugs:common-editors:0.1.0 completed
Loading atomist-rugs:common-editors:0.1.0 into runtime completed
Running editor AddApacheSoftwareLicense20 of atomist-rugs:common-editors:0.1.0 completed

→ Project
  ~/develop/atomist-rugs/atomist-test/ (15kb in 2 files)

→ Changes
  ├─ LICENSE created 11kb
  └─ .provenance.txt created 248bytes

Successfully edited project atomist-test
$ git status
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.provenance.txt
	LICENSE

nothing added to commit but untracked files present (use "git add" to track)
```

That's more like it!  What if we decide we do not want the Apache
Software License?  There's an Editor for that!

```sh
$ rug edit "atomist-rugs:common-editors:RemoveApacheSoftwareLicense20"
Resolving dependencies for atomist-rugs:common-editors:0.1.0 completed
Loading atomist-rugs:common-editors:0.1.0 into runtime completed
Running editor RemoveApacheSoftwareLicense20 of atomist-rugs:common-editors:0.1.0 completed

→ Project
  ~/develop/atomist-rugs/atomist-test/ (26kb in 1 files)

→ Changes
  ├─ LICENSE deleted 15kb
  └─ .provenance.txt created 499bytes

Successfully edited project atomist-test
$ git status
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.provenance.txt

nothing added to commit but untracked files present (use "git add" to track)
```

### More Information

You made it!  That's it for our quick(-ish) introduction to the Rug
CLI.  Please join our [Atomist Community Slack][slack] to ask
questions, get help, and discuss all things Rug.

[slack]: https://join.atomist.com/

More detailed documentation can be found in the
[Rug CLI reference documentation](/reference-docs/rug-cli-commands.md).
