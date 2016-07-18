# Command Line Tooling for Project Operations

The Atomist command line is in early internal-use mode.

## Concepts

Each shell session is stateful, maintaining a context of:

* **Loaded project operations**. Project operations (generators, editors and reviewers) may be loaded from:
 * The local file system. You can `git clone` a remote repository.
* **Directory defaults**: 
 * *Template base directory*: Directory under which templates are located by relative path.
 * *Output base directory*: Directory to which output projects are created, and in which projects to be edited are expected to reside.

## Atomist Shell CLI Configuration

Place a file named `.atomist-profile` in the user home directory.

The contents should contain, as a minimum, the following paths to working directories:

```
template_root=/Users/russmiles/atomist/template-source/
output_root=/Users/russmiles/atomist/output/
```

> ***NOTE***: The CLI will not start up without a configuration file. Changes to configuration made during a session will not be written back to the configuration file. Please edit this file manually between sessions.

### *template_root*: The Template Working Directory

Templates will be loaded under this directory:

```
template_root=/Users/russmiles/atomist/template-source/
```

### *output_root*: Project Operations Output Directory

Output projects will be created under this directory:

```
output_root=/Users/russmiles/atomist/output/
```

### *Optional* A CSV list of templates that will be loaded on startup

If you include this in your configuration file the specified templates will be automatically scanned and made available when the CLI is launched:

```
autoload=spring-rest-service,angular2-qs,rugs
```

The names of the individual templates correspond to template directories under your `template_root`.

## Running the Atomist Shell CLI from Binary

Download the distribution zip and run from the `/bin` directory. You may need to make the binary executable.

## Building and Running the Atomist Shell CLI from Source

The Atomist Shell CLI project is built and run using `sbt`. First you need to ensure you have [`sbt` installed](http://www.scala-sbt.org/0.13/docs/Setup.html).

For example on OS/X you can do this with `brew install sbt`. The sbt build relies on a local Maven repository with access to Atomist Artifactory artifacts.

Once you have `sbt` enter the following from the command line to build and start the shell:

```
> sbt run
```

## Atomist Shell CLI Commands

 Type `help` during shell execution for a list of commands. Important commands include:
 
 * `reload`: Reload project operations from known sources. Invoke this command after making changes to generators or ediors.
 * `create <output path>`: Create a new project under the current output path. The shell will prompt for a template to use and for the parameters needed by that template.
 * `edit <existing project path>`: Edit an existing project using a registered editor.
 * `exit`: Exit the shell
 * `show`: Show the current state of the shell, including registered generators and editors.
 * `superfork`: Specify a GitHub repo containing a project that you wish to use as the basis for a template. Instead of a simple clone, the result will be a new directory under the current `template_root` containing a template that can create similar projects.
 
## Suggested Workflow with the Atomist Shell CLI

 1. `git clone` GitHub template repository, which can include a generator and multiple editors. Then work on the template locally.
 2. Use `create` and `edit` CLI commands to create and work on generated projects. It's a good idea to `git init` these projects for easy diffing.
 3. Use `reload` command when files change.
 4. Commit and push templates as necessary. 