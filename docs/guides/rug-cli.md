## Rug CLI Quick Start

The Rug CLI runs generators and editors against your local source
code. You can run published Rugs and your local Rugs, and see the
results in your project directory. This is essential when you're
developing your own generators and editors.

This quick start guide is more involved that those for Buttons and the
Bot, but don't fret! We are working diligently to make interacting
with the Rug CLI as simple and intuitive as possible.

### Installing the Rug CLI

You can install the Rug command-line interface using standard
packaging tools for your operating system.
See [Rug CLI Installation](../atomist/interfaces/cli/install.md) for
instructions.

### 'Git' Some Examples

To generate and edit code with Rug automation, you should become
familiar with Rug editors, generators, and reviewers.  The best way to
do that is to look at some examples.  Some simple examples of Rug
editors can be found in the [common-editors][common] repo.  You can
clone that repo with the following command.

[common]: https://github.com/atomist-rugs/common-editors

```shell
$ git clone https://github.com/atomist-rugs/common-editors.git
$ cd common-editors
$ ls -1F
CHANGELOG.md
CODE_OF_CONDUCT.md
LICENSE
README.md
src/
```

You cloned the repo, but where are the Rugs?  Rugs are always located
in the `.atomist` directory at the top level of the project, i.e., the
same directory that has the `.git` directory.

```shell
$ ls -1F .atomist/
build/
editors/
manifest.yml
target/
templates/
tests/
```

Here you can see the standard layout for a Rug directory.  It has a
`manifest.yml` describing the contents of the project.  Think of this
as the metadata for your Rugs, i.e., the name, version, dependencies,
etc.  The editors and generators are in the `editors` directory.  Any
templates are in the `templates` directory.  Testing is integral to
Rug, so we also use a `tests` directory to hold all our tests.  There
is also a `build` directory that contains the repository's CI scripts
and configurations.

Let's see what editors we have available.

```shell
$ awk '$1 == "editor" { print $2 }' .atomist/editors/*.rug
AddApacheSoftwareLicense20
AddChangeLog
AddReadme
AddScalaMavenGitIgnore
ClassRenamer
PackageMove
PomParameterizer
RemoveApacheSoftwareLicense20
RemoveChangeLog
RemoveCodeOfConduct
```

Feel free to look around in the `.atomist` directory to see what is
there, investigate the Rug syntax, and see what the tests look like.

### Test Rugs

It is a best practice to provide tests for your Rugs.  The first Rug
command we are going to try will run all of the tests available in the
common-editors repo.

```shell
$ rug test
Processing dependencies
  Downloading com/atomist/rug/maven-metadata.xml ← rug-types (0kb) succeeded
  Downloading com/atomist/rug-cli-root/1.0.0/rug-cli-root-1.0.0.pom ← rug-types (0kb) succeeded
  Downloading com/atomist/rug/maven-metadata.xml ← rug-types (2kb) succeeded
  Downloading com/atomist/rug/0.8.0/rug-0.8.0.pom ← rug-types (13kb) succeeded
  ... (more downloads)
  Downloading com/atomist/rug-cli-root/1.0.0/rug-cli-root-1.0.0.jar ← rug-types (1kb) succeeded
  Downloading org/scala-lang/scala-reflect/2.11.8/scala-reflect-2.11.8.jar ← maven-central (4466kb) succeeded
Resolving dependencies for atomist-rugs:common-editors:0.7.0 ← local completed
Loading atomist-rugs:common-editors:0.7.0 ← local into runtime completed
Executing scenario AddApacheSoftwareLicense20 should add a new LICENSE file according to a provided template...
  Testing assertion fileExists(SimpleLiteral(LICENSE))
  Testing assertion fileContains(SimpleLiteral(LICENSE),SimpleLiteral(Version 2.0, January 2004))
Executing scenario AddChangeLog should add CHANGELOG.md...
  Testing assertion fileExists(IdentifierFunctionArg(changelog,None))
  Testing assertion fileContains(IdentifierFunctionArg(changelog,None),IdentifierFunctionArg(repo_slug,None))
Executing scenario AddChangeLog should overwrite CHANGELOG.md...
  Testing assertion fileExists(IdentifierFunctionArg(changelog,None))
  Testing assertion fileContains(IdentifierFunctionArg(changelog,None),IdentifierFunctionArg(repo_slug,None))
  Testing assertion ParsedJavaScriptFunction(JavaScriptBlock( !result.fileContains(changelog, "common-editor") ))
Executing scenario AddChangeLog should reject invalid repo_slug...
Executing scenario AddChangeLog should reject missing parameter...
Executing scenario AddScalaMavenGitIgnore should add a new .gitignore file according to a provided template...
  Testing assertion fileExists(SimpleLiteral(.gitignore))
  Testing assertion fileContains(SimpleLiteral(.gitignore),SimpleLiteral(# Created by Atomist))
Executing scenario AddScalaMavenGitIgnore should overwrite an existing .gitignore file according to a provided template...
  Testing assertion fileExists(SimpleLiteral(.gitignore))
  Testing assertion fileContains(SimpleLiteral(.gitignore),SimpleLiteral(# Created by Atomist))
Executing scenario AddScalaMavenGitIgnore should add a new .gitignore to a subdirectory...
  Testing assertion fileExists(SimpleLiteral(other/.gitignore))
  Testing assertion fileContains(SimpleLiteral(other/.gitignore),SimpleLiteral(# Created by Atomist))
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
Executing scenario RemoveApacheSoftwareLicense20 should remove Apache license...
  Testing assertion ParsedJavaScriptFunction(JavaScriptBlock( !result.fileExists("LICENSE") ))
Executing scenario RemoveApacheSoftwareLicense20 should not remove other license...
Executing scenario RemoveChangeLog should remove CHANGELOG...
  Testing assertion ParsedJavaScriptFunction(JavaScriptBlock( !result.fileExists("CHANGELOG.md") ))
Executing scenario RemoveApacheSoftwareLicense20 silently do nothing if no CHANGELOG present...
Executing scenario RemoveCodeOfConduct should remove CODE_OF_CONDUCT...
  Testing assertion ParsedJavaScriptFunction(JavaScriptBlock( !result.fileExists("CODE_OF_CONDUCT.md") ))
Executing scenario RemoveCodeOfConduct silently do nothing if no CODE_OF_CONDUCT present...
Running test scenarios in atomist-rugs:common-editors:0.7.0 ← local completed

Successfully executed 22 of 22 scenarios: Test SUCCESS
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

```shell
$ rug install
Resolving dependencies for atomist-rugs:common-editors:0.7.0 ← local completed
Loading atomist-rugs:common-editors:0.7.0 ← local into runtime completed
  Generated META-INF/maven/atomist-rugs/common-editors/pom.xml
  Generated .atomist/manifest.yml
  Generated .atomist/metadata.json
Generating archive metadata completed
  Installed atomist-rugs/common-editors/0.7.0/common-editors-0.7.0.zip → /Users/dd/.atomist/repository
  Installed atomist-rugs/common-editors/0.7.0/common-editors-0.7.0.pom → /Users/dd/.atomist/repository
  Installed atomist-rugs/common-editors/0.7.0/common-editors-0.7.0-metadata.json → /Users/dd/.atomist/repository
Installing archive into local repository completed

→ Archive
  ~/develop/atomist-rugs/common-editors/.atomist/target/common-editors-0.7.0.zip (39kb in 43 files)

→ Contents
  ├─┬ .atomist
  | ├─┬ build
  | | ├── cli-build.yml
  | | ├── cli-dev.yml
  | | └── cli-release.yml
  | ├─┬ editors
  | | ├── AddApacheSoftwareLicense20.rug
  | | ├── AddChangeLog.rug
  | | ├── AddReadme.rug
  | | ├── AddScalaMavenGitIgnore.rug
  | | ├── ClassRenamer.rug
  | | ├── PackageMove.rug
  | | ├── PomParameterizer.rug
  | | ├── RemoveApacheSoftwareLicense20.rug
  | | ├── RemoveChangeLog.rug
  | | └── RemoveCodeOfConduct.rug
  | ├── manifest.yml
  | ├── metadata.json
  | ├─┬ templates
  | | ├── ApacheSoftwareLicenseV20.vm
  | | ├── CHANGELOG.md.mustache
  | | ├── gitignore.vm
  | | └── readme.vm
  | └─┬ tests
  |   ├── AddApacheSoftwareLicense20.rt
  |   ├── AddChangeLog.rt
  |   ├── AddGitIgnore.rt
  |   ├── AddReadme.rt
  |   ├── ClassRenamer.rt
  |   ├── PackageMove.rt
  |   ├── PomParameterizer.rt
  |   ├── RemoveApacheSoftwareLicense20.rt
  |   ├── RemoveChangeLog.rt
  |   └── RemoveCodeOfConduct.rt
  ├── .atomist.yml
  ├── .gitignore
  ├── CHANGELOG.md
  ├── CODE_OF_CONDUCT.md
  ├── LICENSE
  ├─┬ META-INF/maven/atomist-rugs/common-editors
  | └── pom.xml
  ├── README.md
  ├─┬ src/main/java/com/atomist/springrest
  | ├── SpringRestApplication.java
  | └── SpringRestConfiguration.java
  ├─┬ src/main/resources
  | ├── application.properties
  | └── logback.xml
  └─┬ src/test/java/com/atomist/springrest
    ├── SpringRestApplicationTests.java
    ├── SpringRestOutOfContainerIntegrationTests.java
    └── SpringRestWebIntegrationTests.java

Successfully installed archive for atomist-rugs:common-editors:0.7.0
```

This command packages up all of the Rugs in the `.atomist` directory
and installs them in your local repository, typically
`~/.atomist/repository`.

### List Editors

Remember above when we ran that arcane `awk` command to list the
editors?  There is a better way!  Now that we some editors installed
locally, we can list our local editors.

```shell
$ rug list
Resolving dependencies for com.atomist:rug:0.8.0 completed
Listing local archives completed

→ Local Archives
  atomist-rugs:common-editors (0.7.0)

For more information on specific archive version, run:
  rug describe archive ARCHIVE -a VERSION
```

Looks like the Rug Archive we installed is indeed installed.  That
last line of the output tells us how we can get more information.
Let's try that command.  Since we only have one version available, we
can omit the `-a` command-line option.  When it is not provided, the
latest version is used.

```shell
$ rug describe archive atomist-rugs:common-editors
Processing dependencies
  Downloading atomist-rugs/common-editors/maven-metadata.xml ← rugs (0kb) succeeded
Resolving dependencies for atomist-rugs:common-editors:latest completed
Loading atomist-rugs:common-editors:0.7.0 into runtime completed

atomist-rugs:common-editors:0.7.0

→ Origin
  atomist-rugs/common-editors.git#master (622ed10)
→ Archive
  ~/.atomist/repository/atomist-rugs/common-editors/0.7.0/common-editors-0.7.0.zip (39kb in 43 files)

→ Editors
  AddApacheSoftwareLicense20 (add the Apache Software License version 2.0 file)
  AddChangeLog (adds a new CHANGELOG)
  AddReadme (adds a project specific README)
  AddScalaMavenGitIgnore (adds a .gitignore suitable for Scala Maven projects)
  ClassRenamer (renames a Java class, replacing one literal pattern with another)
  PackageMove (renames a Java package)
  PomParameterizer (updates a Maven pom to a new group, artifact, version and description)
  RemoveApacheSoftwareLicense20 (removes an Apache Software License version 2.0 file if present)
  RemoveChangeLog (removes CHANGELOG file if present)
  RemoveCodeOfConduct (removes CODE_OF_CONDUCT file if present)

→ Requires
  [0.8.0,1.0.0)

To get more information on any of the Rugs listed above, run:
  rug describe editor|generator|executor|reviewer ARTIFACT
```

That list of editors looks familiar, we must be doing something right!
Again, the last line of the output tells us how we can get more
information.  Let's try it.

```shell
$ rug describe editor AddApacheSoftwareLicense20

No valid ARTIFACT provided, no default artifact defined and not in local mode.

Run the following command for usage help:
  rug describe --help.
```

Hmm, looks like something went wrong.  Fortunately the error tells us
we either need to define a default artifact or run in local mode.  How
do we run in local mode?  The above output tells us to run `rug
describe --help` for usage help.  Let's do it.

```shell
$ rug describe --help
Usage: rug describe [OPTION]... TYPE ARTIFACT
Print details about an archive or Rug.

Options:
  -?,-h,--help          Print help information
  -X,--error            Print verbose error messages
  -o,--offline          Use only downloaded archives
  -q,--quiet            Do not display progress messages
  -r,--resolver-report  Print dependency tree
  -s,--settings FILE    Use settings file FILE
  -t,--timer            Print timing information
  -u,--update           Update dependency resolution

Command Options:
  -a,--archive-version AV  Use archive version AV
  -l,--local               Use local working directory as archive

TYPE should be 'editor', 'generator', 'executor', 'reviewer' or
'archive' and ARTIFACT should be the full name of an artifact, e.g.,
"atomist:spring-service:Spring Microservice".  If the name of the
artifact has spaces in it, you need to put quotes around it.

Please report issues at https://github.com/atomist/rug-cli
```

The help output provides two pieces of information useful to us.
First, it says the `ARTIFACT` should be the full name of the artifact.
We only provided the editor name.  Perhaps we needed to prepend the
archive name.  Second, the `-l` or `--local` command-line option tells
the CLI to use the current directory as an archive.  In other words,
it tries to find an `.atomist` directory and use the Rugs in it.
Since we are in a directory that has the `.atomist` directory with the
editor we want to run, that seems promising.

```shell
$ rug describe -l editor AddApacheSoftwareLicense20
Resolving dependencies for atomist-rugs:common-editors:0.7.0 ← local completed
Loading atomist-rugs:common-editors:0.7.0 ← local into runtime completed

AddApacheSoftwareLicense20
atomist-rugs:common-editors:0.7.0
add the Apache Software License version 2.0 file

→ Tags
  apache (apache)
  license (license)
  documentation (documentation)
→ Parameters
  no parameters needed

To invoke the AddApacheSoftwareLicense20 editor, run:
  rug edit "atomist-rugs:common-editors:AddApacheSoftwareLicense20" -a 0.7.0 -l
```

Success!  The output from that command also tells us what the full
name of the editor is,
`atomist-rugs:common-editors:AddApacheSoftwareLicense20`.  We could
have guessed that.  Since we previously installed the editor, we could
have run the following command and gotten the same result.

```shell
$ rug describe editor atomist-rugs:common-editors:AddApacheSoftwareLicense20
```

The `describe editor` output includes several pieces of useful
information.  The description, "adds the Apache Software License
version 2.0 file", provides a slightly more verbose description than
the already descriptive editor name.  We can see that this editor has
three tags, `license`, `apache`, and `documentation`, and it takes no
parameters.

Adding the Apache license seems like a good thing to do.  The last
line of the output once again gives us the information we need: how to
run this editor.  Let's try it.

### Run an Editor

We will just run the command we were provided above.  We remove the
`-l` since, having installed the archive, we do not need to run it
from the local directory, we can run it from the installed archive.

```shell
$ rug edit atomist-rugs:common-editors:AddApacheSoftwareLicense20 -a 0.7.0
Resolving dependencies for atomist-rugs:common-editors:latest completed
Loading atomist-rugs:common-editors:0.7.0 into runtime completed
Running editor AddApacheSoftwareLicense20 of atomist-rugs:common-editors:0.7.0 completed

→ Project
  ~/develop/atomist-rugs/common-editors/ (282kb in 302 files)

→ Changes
  ├── LICENSE created 11kb
  └── .atomist.yml created 3kb

Successfully edited project common-editors
```

Looks like two files were edited in the local repository.

```shell
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   .atomist.yml

no changes added to commit (use "git add" and/or "git commit -a")
```

Hmm, git shows only one file has been modified.  Why?  Well, the
contents of the `LICENSE` file were set to be the Apache Software
License, but that is what the contents already were.  Git is smart.
What is that `atomist.yml` file?

```shell
$ cat .atomist.yml
---
kind: "operation"
client: "rug-cli 0.20.0"
editor:
  name: "atomist-rugs.common-editors.AddApacheSoftwareLicense20"
  group: "atomist-rugs"
  artifact: "common-editors"
  version: "0.7.0"
  origin:
    repo: "atomist-rugs/common-editors.git"
    branch: "master"
    sha: "622ed10"

```

Looks like it is a record of what we have done, nice!

I suppose we should have guessed the editor would act on the local
directory, but we don't really want to edit the current project.
Let's create another project to edit.  We run the same command as
above, except we'll remove the archive version command-line option.
If you do not provide the `-a` option, the CLI will use the latest
installed version, 0.7.0 in our case.

```shell
$ cd ..
$ mkdir atomist-test
$ cd !$
$ git init
$ rug edit atomist-rugs:common-editors:AddApacheSoftwareLicense20
$ rug edit atomist-rugs:common-editors:AddApacheSoftwareLicense20
Resolving dependencies for atomist-rugs:common-editors:latest completed
Loading atomist-rugs:common-editors:0.7.0 into runtime completed
Running editor AddApacheSoftwareLicense20 of atomist-rugs:common-editors:0.7.0 completed

→ Project
  ~/develop/atomist-rugs/atomist-test/ (15 kb in 16 files)

→ Changes
  ├── LICENSE created 11 kb
  └── .atomist.yml created 287 bytes

Successfully edited project atomist-test
$ git status
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.atomist.yml
	LICENSE

nothing added to commit but untracked files present (use "git add" to track)
```

That's more like it!  What if we decide we do not want the Apache
Software License?  There's an editor for that!

```shell
$ rug edit atomist-rugs:common-editors:RemoveApacheSoftwareLicense20
Resolving dependencies for atomist-rugs:common-editors:latest completed
Loading atomist-rugs:common-editors:0.7.0 into runtime completed
Running editor RemoveApacheSoftwareLicense20 of atomist-rugs:common-editors:0.7.0 completed

→ Project
  ~/develop/atomist-rugs/atomist-test/ (26 kb in 15 files)

→ Changes
  ├── LICENSE deleted 15 kb
  └── .atomist.yml created 577 bytes

Successfully edited project atomist-test
$ git status
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.atomist.yml

nothing added to commit but untracked files present (use "git add" to track)
```

We see the `LICENSE` file is gone.  If we inspect the contents of the
`.atomist.yml` file, we see a complete record of what Rug has done.

```shell
$ cat .atomist.yml
---
kind: "operation"
client: "rug-cli 0.20.0"
editor:
  name: "atomist-rugs.common-editors.AddApacheSoftwareLicense20"
  group: "atomist-rugs"
  artifact: "common-editors"
  version: "0.7.0"
  origin:
    repo: "atomist-rugs/common-editors.git"
    branch: "master"
    sha: "622ed10"

---
kind: "operation"
client: "rug-cli 0.20.0"
editor:
  name: "atomist-rugs.common-editors.RemoveApacheSoftwareLicense20"
  group: "atomist-rugs"
  artifact: "common-editors"
  version: "0.7.0"
  origin:
    repo: "atomist-rugs/common-editors.git"
    branch: "master"
    sha: "622ed10"

```

### More Information

You made it!  That's it for our quick(-ish) introduction to the Rug
CLI.  Please join our [Atomist Community Slack][slack] to ask
questions, get help, and discuss all things Rug.

[slack]: https://join.atomist.com/

More detailed documentation can be found in the
[Rug CLI reference documentation](../reference/rug-cli/index.md).
