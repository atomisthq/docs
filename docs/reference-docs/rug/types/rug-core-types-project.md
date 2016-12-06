
## Type: `project`
**
Type for a project. Supports global operations.
Consider using file and other lower types by preference as project
operations can be inefficient.
    **

### `project` Operations


#### Operation: `addDirectory`
    Create a directory

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***name*** | `class java.lang.String` | *The name of the directory being added* |
| ***parentPath*** | `class java.lang.String` | *The path under which the directory should be created* |


#### Operation: `addDirectoryAndIntermediates`
    Create a directory

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***directoryPath*** | `class java.lang.String` | *The path under which the directory and any missing intermediate directories will be created* |


#### Operation: `addFile`
    Add the given file to the project. Path can contain /s. Content is a literal string

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |
| ***content*** | `class java.lang.String` | *The content to be placed in the new file* |


#### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


#### Operation: `deleteDirectory`
    Deletes a directory with the given path

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |


#### Operation: `deleteFile`
    Delete the given file from the project. Path can contain /s.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |


#### Operation: `directoryExists`
    Does a directory with the given path exist?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |


#### Operation: `eval`
    Operate on this. Use when you want to operate on an object in an embedded language such as JavaScript or Clojure

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***arg0*** | `class java.lang.Object` | ** |


#### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


#### Operation: `fileContains`
    Does a file with the given path exist and have the expected content?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |
| ***content*** | `class java.lang.String` | *The content to check* |


#### Operation: `fileCount`
    Return the number of files in this project

***Parameters***

*None*


#### Operation: `fileExists`
    Does a file with the given path exist?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |


#### Operation: `fileHasContent`
    Does a file with the given path exist and have the expected content?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |
| ***content*** | `class java.lang.String` | *The content to check against the given file* |


#### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


#### Operation: `merge`

        |Merge the given template to the given output path.
        |


***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***template*** | `class java.lang.String` | *The name of the template within the backing Rug archive, under /.atomist / templates* |
| ***path*** | `class java.lang.String` | *The path that will be the merged path within the output project.* |
| ***ic*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | *The project identifier to use* |


#### Operation: `mergeTemplates`

        |Merge templates from the specified directory in the backing archive,
        |under /.atomist/templates, to the given output path in the project being
        |edited


***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***templatesPath*** | `class java.lang.String` | *Source template path where content will be used to merge into target project* |
| ***outputPath*** | `class java.lang.String` | *The destination path within the destination project* |
| ***ic*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | *The project identifier to use* |


#### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


#### Operation: `moveUnder`
    Move this file under the given path, preserving its present path under that

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The root path to move the file to* |


#### Operation: `name`
    Return the name of the project. If it's in GitHub, it will be the repo name.If it's on the local filesystem it will be the directory name

***Parameters***

*None*


#### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


#### Operation: `regexpReplace`
    Replace all occurrences of the given regular expression in this project

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***regexp*** | `class java.lang.String` | *The regular expression to search for* |
| ***replacement*** | `class java.lang.String` | *The string to replace matches with* |


#### Operation: `replace`
    Replace all occurrences of the given string literal in this project. Use with care!

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to look for* |
| ***replaceWith*** | `class java.lang.String` | *The string to replace matches with* |


#### Operation: `replaceInPath`
    Globally replace all occurrences of the given string literal in file paths in this project

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to search for* |
| ***replacement*** | `class java.lang.String` | *The string to replace in the paths if found* |
