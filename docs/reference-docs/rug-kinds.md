
# Rug Standard Types

## Type: `java.field`
**Field in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)


### Operation: `addAnnotation`
    Annotate the element with the given annotation

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***pkg*** | `class java.lang.String` | *Package where the annotation is sourced* |
| ***annotation*** | `class java.lang.String` | *The annotation to add* |


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `hasAnnotation`
    Does the element have the given annotation?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***annotation*** | `class java.lang.String` | *The string name of the annotation to look for* |


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `name`
    Return the name of the field

***Parameters***

*None*


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |

## Type: `packageJSON`
**package.json configuration file**
*Parent*: None


### Operation: `append`
    Append the given content to the file

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to append* |


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `contains`
    Does the file content contain the given string?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***what*** | `class java.lang.String` | *The string to use when looking for it in the file* |


### Operation: `containsMatch`
    Does the file content contain a match for the given regex

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***regexp*** | `class java.lang.String` | *The regular expression to look for in the file's content* |


### Operation: `content`
    Return file content

***Parameters***

*None*


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `filename`
    Return file name, excluding path

***Parameters***

*None*


### Operation: `findMatches`
    Return all matches for the given regexp in this file

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***regexp*** | `class java.lang.String` | *The regular expression to search for* |


### Operation: `firstMatch`
    Return the first match for the given regex, or the empty string if not found. Call containsMatch first to check presence.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***regexp*** | `class java.lang.String` | *The regular expression to search for* |


### Operation: `isJava`
    Is this a Java file?

***Parameters***

*None*


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `name`
    Name of the file, excluding path

***Parameters***

*None*


### Operation: `nameContains`
    Does the file name (not path) contain the given string?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***what*** | `class java.lang.String` | *The string to use when looking for it in the file name or path* |


### Operation: `packageName`
    Return package name

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***ic*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `path`
    Return file path, with forward slashes

***Parameters***

*None*


### Operation: `prepend`
    Prepend the given content to the file

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to prepend to the file* |


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `regexpReplace`
    Replace all occurrences of the given regexp in this file

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***regexp*** | `class java.lang.String` | *The regular expression to search for* |
| ***replaceWith*** | `class java.lang.String` | *The string to replace matching expressions with* |


### Operation: `replace`
    Replace all instances of the given literal string in this file

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to search for* |
| ***replaceWith*** | `class java.lang.String` | *The string to replace the matches with* |


### Operation: `setContent`
    Set entire file content to new string

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newContent*** | `class java.lang.String` | *The content to set the file to* |


### Operation: `setName`
    Set the file name, not path, to the given value

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***name*** | `class java.lang.String` | *The name to set the file to* |


### Operation: `setPackageName`
    Change the package name

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newName*** | `class java.lang.String` | *The name to set the package to* |
| ***ic*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `setPath`
    Change the path to the given value. Path should use forward slashes to denote directories

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newPath*** | `class java.lang.String` | *The path to change the file to* |


### Operation: `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***root*** | `class java.lang.String` | *The root path to begin searching from* |

## Type: `line`
**Represents a line within a text file**
*Parent*: None


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `content`
    Return this line's content

***Parameters***

*None*


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `number`
    Line number

***Parameters***

*None*


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `update`
    Update this line's content

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***s2*** | `class java.lang.String` | *The content to update this line to* |

## Type: `project`
**
Type for a project. Supports global operations.
Consider using file and other lower types by preference as project
operations can be inefficient.
    **
*Parent*: None


### Operation: `addFile`
    Add the given file to the project. Path can contain /s. Content is a literal string

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |
| ***content*** | `class java.lang.String` | *The content to be placed in the new file* |


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `deleteDirectory`
    Deletes a directory with the given path

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |


### Operation: `deleteFile`
    Delete the given file from the project. Path can contain /s.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |


### Operation: `directoryExists`
    Does a directory with the given path exist?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `fileContains`
    Does a file with the given path exist and have the expected content?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |
| ***content*** | `class java.lang.String` | *The content to check* |


### Operation: `fileCount`
    Return the number of files in this project

***Parameters***

*None*


### Operation: `fileExists`
    Does a file with the given path exist?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |


### Operation: `fileHasContent`
    Does a file with the given path exist and have the expected content?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |
| ***content*** | `class java.lang.String` | *The content to check against the given file* |


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `merge`
    
        |Merge the given template to the given output path.
        |
      

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***template*** | `class java.lang.String` | *The name of the template within the backing Rug archive, under /.atomist / templates* |
| ***path*** | `class java.lang.String` | *The path that will be the merged path within the output project.* |
| ***ic*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | *The project identifier to use* |


### Operation: `mergeTemplates`
    
        |Merge templates from the specified directory in the backing archive,
        |under /.atomist/templates, to the given output path in the project being
        |edited
      

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***templatesPath*** | `class java.lang.String` | *Source template path where content will be used to merge into target project* |
| ***outputPath*** | `class java.lang.String` | *The destination path within the destintion project* |
| ***ic*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | *The project identifier to use* |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `moveUnder`
    Move this file under the given path, preserving its present path under that

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The root path to move the file to* |


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `regexpReplace`
    Replace all occurrences of the given regular expression in this project

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***regexp*** | `class java.lang.String` | *The regular expression to search for* |
| ***replacement*** | `class java.lang.String` | *The string to replace matches with* |


### Operation: `replace`
    Replace all occurrences of the given string literal in this project. Use with care!

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to look for* |
| ***replaceWith*** | `class java.lang.String` | *The string to replace matches with* |


### Operation: `replaceInPath`
    Globally replace all occurrences of the given string literal in file paths in this project

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to search for* |
| ***replacement*** | `class java.lang.String` | *The string to replace in the paths if found* |

## Type: `java.source`
**Java source file**
*Parent*: None


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `content`
    Return file content

***Parameters***

*None*


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `filename`
    Return file name, excluding path

***Parameters***

*None*


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `movePackage`
    Move the source file to the given package

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newPackage*** | `class java.lang.String` | *The package to move the source file to* |


### Operation: `path`
    Return file path, with forward slashes

***Parameters***

*None*


### Operation: `pkg`
    Return the package name

***Parameters***

*None*


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `typeCount`
    Count the types in this source file

***Parameters***

*None*


### Operation: `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***root*** | `class java.lang.String` | *The root path to begin searching from* |

## Type: `elm.module`
**Elm module**
*Parent*: None


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `content`
    Return file content

***Parameters***

*None*


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `filename`
    Return file name, excluding path

***Parameters***

*None*


### Operation: `imports`
    Does the module import the given module?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***moduleName*** | `class java.lang.String` | *The module name to check* |


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `name`
    Return the name of the module

***Parameters***

*None*


### Operation: `path`
    Return file path, with forward slashes

***Parameters***

*None*


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `setName`
    Change the name of the module

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newName*** | `class java.lang.String` | *The module name to change to* |


### Operation: `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***root*** | `class java.lang.String` | *The root path to begin searching from* |


### Operation: `updateImport`
    Update the given module import

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***oldModuleName*** | `class java.lang.String` | *The old module import name* |
| ***newName*** | `class java.lang.String` | *The module name to change to* |

## Type: `java.project`
**Java project**
*Parent*: None


### Operation: `addFile`
    Add the given file to the project. Path can contain /s. Content is a literal string

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |
| ***content*** | `class java.lang.String` | *The content to be placed in the new file* |


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `deleteDirectory`
    Deletes a directory with the given path

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |


### Operation: `deleteFile`
    Delete the given file from the project. Path can contain /s.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |


### Operation: `directoryExists`
    Does a directory with the given path exist?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `fileContains`
    Does a file with the given path exist and have the expected content?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |
| ***content*** | `class java.lang.String` | *The content to check* |


### Operation: `fileCount`
    Return the number of files in this project

***Parameters***

*None*


### Operation: `fileExists`
    Does a file with the given path exist?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |


### Operation: `fileHasContent`
    Does a file with the given path exist and have the expected content?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |
| ***content*** | `class java.lang.String` | *The content to check against the given file* |


### Operation: `isMaven`
    Is this a Maven project?

***Parameters***

*None*


### Operation: `isSpring`
    Is this a Spring project?

***Parameters***

*None*


### Operation: `isSpringBoot`
    Is this a Spring Boot project?

***Parameters***

*None*


### Operation: `javaFileCount`
    Return the number of Java files in this module

***Parameters***

*None*


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `merge`
    
        |Merge the given template to the given output path.
        |
      

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***template*** | `class java.lang.String` | *The name of the template within the backing Rug archive, under /.atomist / templates* |
| ***path*** | `class java.lang.String` | *The path that will be the merged path within the output project.* |
| ***ic*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | *The project identifier to use* |


### Operation: `mergeTemplates`
    
        |Merge templates from the specified directory in the backing archive,
        |under /.atomist/templates, to the given output path in the project being
        |edited
      

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***templatesPath*** | `class java.lang.String` | *Source template path where content will be used to merge into target project* |
| ***outputPath*** | `class java.lang.String` | *The destination path within the destintion project* |
| ***ic*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | *The project identifier to use* |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `moveUnder`
    Move this file under the given path, preserving its present path under that

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The root path to move the file to* |


### Operation: `packages`
    List the packages in this project

***Parameters***

*None*


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `regexpReplace`
    Replace all occurrences of the given regular expression in this project

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***regexp*** | `class java.lang.String` | *The regular expression to search for* |
| ***replacement*** | `class java.lang.String` | *The string to replace matches with* |


### Operation: `replace`
    Replace all occurrences of the given string literal in this project. Use with care!

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to look for* |
| ***replaceWith*** | `class java.lang.String` | *The string to replace matches with* |


### Operation: `replaceInPath`
    Globally replace all occurrences of the given string literal in file paths in this project

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to search for* |
| ***replacement*** | `class java.lang.String` | *The string to replace in the paths if found* |

## Type: `grammar`
**User-defined grammar**
*Parent*: Some(class com.atomist.rug.kind.core.FileArtifactType)


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `set`
    Set the value of the given key

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***key*** | `class java.lang.String` | *The match key whose content you want* |
| ***value*** | `class java.lang.String` | *The new value* |


### Operation: `valueOf`
    Return the value of the given key

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***name*** | `class java.lang.String` | *The match key whose content you want* |

## Type: `spring.bootProject`
**Spring Boot project**
*Parent*: None


### Operation: `addFile`
    Add the given file to the project. Path can contain /s. Content is a literal string

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |
| ***content*** | `class java.lang.String` | *The content to be placed in the new file* |


### Operation: `annotateBootApplication`
    Add the given annotation to the Spring Boot application class

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***pkg*** | `class java.lang.String` | *The package of the annotation* |
| ***annotationName*** | `class java.lang.String` | *The annotation to add* |


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `deleteDirectory`
    Deletes a directory with the given path

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |


### Operation: `deleteFile`
    Delete the given file from the project. Path can contain /s.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |


### Operation: `directoryExists`
    Does a directory with the given path exist?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `fileContains`
    Does a file with the given path exist and have the expected content?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |
| ***content*** | `class java.lang.String` | *The content to check* |


### Operation: `fileCount`
    Return the number of files in this project

***Parameters***

*None*


### Operation: `fileExists`
    Does a file with the given path exist?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |


### Operation: `fileHasContent`
    Does a file with the given path exist and have the expected content?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The path to use* |
| ***content*** | `class java.lang.String` | *The content to check against the given file* |


### Operation: `isMaven`
    Is this a Maven project?

***Parameters***

*None*


### Operation: `isSpring`
    Is this a Spring project?

***Parameters***

*None*


### Operation: `isSpringBoot`
    Is this a Spring Boot project?

***Parameters***

*None*


### Operation: `javaFileCount`
    Return the number of Java files in this module

***Parameters***

*None*


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `merge`
    
        |Merge the given template to the given output path.
        |
      

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***template*** | `class java.lang.String` | *The name of the template within the backing Rug archive, under /.atomist / templates* |
| ***path*** | `class java.lang.String` | *The path that will be the merged path within the output project.* |
| ***ic*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | *The project identifier to use* |


### Operation: `mergeTemplates`
    
        |Merge templates from the specified directory in the backing archive,
        |under /.atomist/templates, to the given output path in the project being
        |edited
      

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***templatesPath*** | `class java.lang.String` | *Source template path where content will be used to merge into target project* |
| ***outputPath*** | `class java.lang.String` | *The destination path within the destintion project* |
| ***ic*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | *The project identifier to use* |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `moveUnder`
    Move this file under the given path, preserving its present path under that

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***path*** | `class java.lang.String` | *The root path to move the file to* |


### Operation: `packages`
    List the packages in this project

***Parameters***

*None*


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `regexpReplace`
    Replace all occurrences of the given regular expression in this project

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***regexp*** | `class java.lang.String` | *The regular expression to search for* |
| ***replacement*** | `class java.lang.String` | *The string to replace matches with* |


### Operation: `replace`
    Replace all occurrences of the given string literal in this project. Use with care!

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to look for* |
| ***replaceWith*** | `class java.lang.String` | *The string to replace matches with* |


### Operation: `replaceInPath`
    Globally replace all occurrences of the given string literal in file paths in this project

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to search for* |
| ***replacement*** | `class java.lang.String` | *The string to replace in the paths if found* |

## Type: `java.parameter`
**Method parameter in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `name`
    Return the name of the parameter

***Parameters***

*None*


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |

## Type: `yml`
**YML file**
*Parent*: None


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `content`
    Return file content

***Parameters***

*None*


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `filename`
    Return file name, excluding path

***Parameters***

*None*


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `path`
    Return file path, with forward slashes

***Parameters***

*None*


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***root*** | `class java.lang.String` | *The root path to begin searching from* |


### Operation: `valueOf`
    Return the value of the given key

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***name*** | `class java.lang.String` | *The YAML key whose content you want* |

## Type: `docker`
**Docker file type**
*Parent*: None


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `content`
    Return file content

***Parameters***

*None*


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `filename`
    Return file name, excluding path

***Parameters***

*None*


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `path`
    Return file path, with forward slashes

***Parameters***

*None*


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***root*** | `class java.lang.String` | *The root path to begin searching from* |


### Operation: `upgrade`
    Do something magical

***Parameters***

*None*

## Type: `properties`
**Properties file**
*Parent*: None


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `containsKey`
    Return whether a property key exists in this file or not

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***key*** | `class java.lang.String` | *The key of the property being searched for* |


### Operation: `containsValue`
    Return whether a property value exists in this file or not

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***value*** | `class java.lang.String` | *The value being searched for* |


### Operation: `content`
    Return file content

***Parameters***

*None*


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `filename`
    Return file name, excluding path

***Parameters***

*None*


### Operation: `getValue`
    Return the content of this property

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***key*** | `class java.lang.String` | *The name of the simple node* |


### Operation: `keys`
    Return a list of the supported keys

***Parameters***

*None*


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `path`
    Return file path, with forward slashes

***Parameters***

*None*


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `setProperty`
    Set the value of the specified property, creating a property if not present

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***key*** | `class java.lang.String` | *The key of the property being set* |
| ***value*** | `class java.lang.String` | *The value of the property* |


### Operation: `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***root*** | `class java.lang.String` | *The root path to begin searching from* |

## Type: `xml`
**XML file**
*Parent*: None


### Operation: `addChildNode`
    Add the specified content under the indicated xpath-selected node

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***xpath*** | `class java.lang.String` | *The XPath selector for the node to add the content under* |
| ***newNode*** | `class java.lang.String` | *The new node name to be added as a child* |
| ***nodeContent*** | `class java.lang.String` | *XML document to be added under the indicated node* |


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `content`
    Return file content

***Parameters***

*None*


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `filename`
    Return file name, excluding path

***Parameters***

*None*


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `path`
    Return file path, with forward slashes

***Parameters***

*None*


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `setSimpleNode`
    Update the content of this simple node

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***xpath*** | `class java.lang.String` | *The node to select* |
| ***newValue*** | `class java.lang.String` | *The new content for that node* |


### Operation: `simpleNode`
    Return the content of this simple node

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***xpath*** | `class java.lang.String` | *The name of the simple node* |


### Operation: `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***root*** | `class java.lang.String` | *The root path to begin searching from* |

## Type: `file`
**
Type for a file within a project. Supports generic options such as find and replace.
    **
*Parent*: None


### Operation: `append`
    Append the given content to the file

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to append* |


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `contains`
    Does the file content contain the given string?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***what*** | `class java.lang.String` | *The string to use when looking for it in the file* |


### Operation: `containsMatch`
    Does the file content contain a match for the given regex

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***regexp*** | `class java.lang.String` | *The regular expression to look for in the file's content* |


### Operation: `content`
    Return file content

***Parameters***

*None*


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `filename`
    Return file name, excluding path

***Parameters***

*None*


### Operation: `findMatches`
    Return all matches for the given regexp in this file

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***regexp*** | `class java.lang.String` | *The regular expression to search for* |


### Operation: `firstMatch`
    Return the first match for the given regex, or the empty string if not found. Call containsMatch first to check presence.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***regexp*** | `class java.lang.String` | *The regular expression to search for* |


### Operation: `isJava`
    Is this a Java file?

***Parameters***

*None*


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `name`
    Name of the file, excluding path

***Parameters***

*None*


### Operation: `nameContains`
    Does the file name (not path) contain the given string?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***what*** | `class java.lang.String` | *The string to use when looking for it in the file name or path* |


### Operation: `path`
    Return file path, with forward slashes

***Parameters***

*None*


### Operation: `prepend`
    Prepend the given content to the file

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to prepend to the file* |


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `regexpReplace`
    Replace all occurrences of the given regexp in this file

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***regexp*** | `class java.lang.String` | *The regular expression to search for* |
| ***replaceWith*** | `class java.lang.String` | *The string to replace matching expressions with* |


### Operation: `replace`
    Replace all instances of the given literal string in this file

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to search for* |
| ***replaceWith*** | `class java.lang.String` | *The string to replace the matches with* |


### Operation: `setContent`
    Set entire file content to new string

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newContent*** | `class java.lang.String` | *The content to set the file to* |


### Operation: `setName`
    Set the file name, not path, to the given value

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***name*** | `class java.lang.String` | *The name to set the file to* |


### Operation: `setPath`
    Change the path to the given value. Path should use forward slashes to denote directories

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newPath*** | `class java.lang.String` | *The path to change the file to* |


### Operation: `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***root*** | `class java.lang.String` | *The root path to begin searching from* |

## Type: `java.class`
**Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaSourceType)


### Operation: `addAnnotation`
    Annotate the element with the given annotation

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***pkg*** | `class java.lang.String` | *Package where the annotation is sourced* |
| ***annotation*** | `class java.lang.String` | *The annotation to add* |


### Operation: `addImport`
    Add an import to the containing Java source

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***fqn*** | `class java.lang.String` | *The fully qualified name of the import* |


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `hasAnnotation`
    Does the element have the given annotation?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***annotation*** | `class java.lang.String` | *The string name of the annotation to look for* |


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `movePackage`
    Move the type to the given package

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newPackage*** | `class java.lang.String` | *The package to move the type to* |


### Operation: `name`
    Return the name of the type

***Parameters***

*None*


### Operation: `pkg`
    Return the package

***Parameters***

*None*


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `rename`
    Rename the type

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newName*** | `class java.lang.String` | *The new name of the type* |


### Operation: `renameByReplace`
    Rename the type by replacing a pattern in the name

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***target*** | `class java.lang.String` | *The name of the type to replace* |
| ***replacement*** | `class java.lang.String` | *The replacement pattern* |

## Type: `java.method`
**Method in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)


### Operation: `addAnnotation`
    Annotate the element with the given annotation

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***pkg*** | `class java.lang.String` | *Package where the annotation is sourced* |
| ***annotation*** | `class java.lang.String` | *The annotation to add* |


### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `fail`
    Cause the operation to fail with a fatal error

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


### Operation: `hasAnnotation`
    Does the element have the given annotation?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***annotation*** | `class java.lang.String` | *The string name of the annotation to look for* |


### Operation: `javadoc`
    Return the Javadoc for the method, or an empty string if there isn't any

***Parameters***

*None*


### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


### Operation: `name`
    Return the name of the method

***Parameters***

*None*


### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |

