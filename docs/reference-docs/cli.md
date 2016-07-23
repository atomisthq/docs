# Command Line Tooling for Project Operations

> ***NOTE***: The Atomist Shell is in early internal-use mode.

## Concepts

Each shell session is stateful, maintaining a context of:

* **Loaded project operations**. Project operations (generators, editors and reviewers) may be loaded from:
 * The local file system. You can `git clone` a remote repository.
* **Directory defaults**: 
 * *Template base directory*: Directory under which templates are located by relative path.
 * *Output base directory*: Directory to which output projects are created, and in which projects to be edited are expected to reside.

## Atomist Shell Configuration

Place a file named `.atomist-profile` in the user home directory.

The contents should contain, as a minimum, the following paths to working directories:

```
template_root=/Users/russmiles/atomist/template-source
output_root=/Users/russmiles/atomist/output
```

> ***NOTE***: The CLI will not start up without a configuration file. Changes to configuration made during a session will not be written back to the configuration file. Please edit this file manually between sessions.

The operations and projects displayed by the shell depend on the contents of the following two directories.
### `template_root`: The Archive Working Directory


```
template_root=/Users/russmiles/atomist/template-source
```
Any templates added via CLI commands will be added automatically. If you add a template via a `git clone` operation, use the `reload` command within the shell to load it.

### `output_root`: Project Operations Output Directory

Output projects will be created under this directory:

```
output_root=/Users/russmiles/atomist/output
```
> ***NOTE***: Project operations and projects to operate on will be displayed based on the contents of these two directories. So it's a good idea to limit the subfolders in each of them to the projects you are working on at any point in time.

## Running the Atomist Shell from Binary

TODO

## Building and Running the Atomist Shell from Source

The Atomist Shell CLI project is built and run using `maven`.

The build relies on a local Maven repository with access to Atomist Artifactory artifacts.

The following from the command line to build and start the shell:

```
> > mvn compile exec:javaDexec.mainClass="com.atomist.projectoperation.cli.Main"
```

## Atomist Shell Commands

 Type `help` during shell execution for a list of commands. Important commands include:
 
 * `reload`: Reload project operations from known sources. Invoke this command after making changes to generators or editors.
 * `create`: Create a new project under the current output path. The shell will prompt for a project generator to use (found under your `template_root`) and for the parameters needed by that template.
 * `edit`: Edit an existing local project using a known editor. A list of projects to edit will be displayed, based on the projects under your `output_root` directory.
 * `edit-remote`: Edit an existing GitHub project using known editor. The edit will appear as a pull request in the repo.
 * `exit`: Exit the shell
 * `show`: Show the current state of the shell, including known generators and editors.
 
## Getting out of trouble: *Cancelling a Command*

If you've kicked off a flow with a command and realise you no longer want to continue you can use the defactor standard `:q` command to get back to the `show` menu of commands.
 
## Suggested Workflow with the Atomist Shell

 1. `git clone` GitHub a template repository, which can include a generator and multiple editors, under the `template_root` directory specified in your configuration. Then work on the template locally.
 2. Use `create` and `edit` shell commands to create and work on generated projects. It's a good idea to `git init` these projects for easy diffing, even if you don't intend to push them.
 3. Use the shell's `reload` command when files change.
 4. Commit and push the template as necessary. 