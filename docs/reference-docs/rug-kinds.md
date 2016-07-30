
# Rug Standard Types

## `java.field`
**Field in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)


### `addAnnotation`
    Annotate the element with the given annotation

**Parameters**

package : class java.lang.String : Package where the annotation is sourced

arg1 : class java.lang.String : No Description


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**

arg0 : class java.lang.String : No Description


### `hasAnnotation`
    Does the element have the given annotation?

**Parameters**

arg0 : class java.lang.String : No Description


### `majorProblem`
    Report a major problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Return the name of the field

**Parameters**


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**

arg0 : class java.lang.String : No Description

## `packageJSON`
**package.json configuration file**
*Parent*: None


### `append`
    Append the given content to the file

**Parameters**

literal : class java.lang.String : The string to append


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `contains`
    Does the file content contain the given string?

**Parameters**

what : class java.lang.String : The string to use when looking for it in the file


### `containsMatch`
    Does the file content contain a match for the given regex

**Parameters**

regexp : class java.lang.String : The regular expression to look for in the file's content


### `content`
    Return file content

**Parameters**


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**

arg0 : class java.lang.String : No Description


### `filename`
    Return file name, excluding path

**Parameters**


### `findMatches`
    Return all matches for the given regexp in this file

**Parameters**

regexp : class java.lang.String : The regular expression to search for


### `firstMatch`
    Return the first match for the given regex, or the empty string if not found. Call containsMatch first to check presence.

**Parameters**

regexp : class java.lang.String : The regular expression to search for


### `isJava`
    Is this a Java file?

**Parameters**


### `majorProblem`
    Report a major problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Name of the file, excluding path

**Parameters**


### `nameContains`
    Does the file name (not path) contain the given string?

**Parameters**

what : class java.lang.String : The string to use when looking for it in the file name or path


### `packageName`
    Return package name

**Parameters**

arg0 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `path`
    Return file path, with forward slashes

**Parameters**


### `prepend`
    Prepend the given content to the file

**Parameters**

literal : class java.lang.String : The string to prepend to the file


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**

arg0 : class java.lang.String : No Description


### `regexpReplace`
    Replace all occurrences of the given regexp in this file

**Parameters**

regexp : class java.lang.String : The regular expression to search for

replaceWith : class java.lang.String : The string to replace matching expressions with


### `replace`
    Replace all instances of the given literal string in this file

**Parameters**

literal : class java.lang.String : The string to search for

replaceWith : class java.lang.String : The string to replace the matches with


### `setContent`
    Set entire file content to new string

**Parameters**

newContent : class java.lang.String : The content to set the file to


### `setName`
    Set the file name, not path, to the given value

**Parameters**

name : class java.lang.String : The name to set the file to


### `setPackageName`
    Change the package name

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `setPath`
    Change the path to the given value. Path should use forward slashes to denote directories

**Parameters**

newPath : class java.lang.String : The path to change the file to


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

**Parameters**

root : class java.lang.String : The root path to begin searching from

## `line`
**Represents a line within a text file**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return this line's content

**Parameters**


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**

arg0 : class java.lang.String : No Description


### `majorProblem`
    Report a major problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `number`
    Line number

**Parameters**


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**

arg0 : class java.lang.String : No Description


### `update`
    Update this line's content

**Parameters**

s2 : class java.lang.String : The content to update this line to

## `project`
**
Type for a project. Supports global operations.
Consider using file and other lower types by preference as project
operations can be inefficient.
    **
*Parent*: None


### `addFile`
    Add the given file to the project. Path can contain /s. Content is a literal string

**Parameters**

path : class java.lang.String : The path to use

content : class java.lang.String : The content to be placed in the new file


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `deleteDirectory`
    Deletes a directory with the given path

**Parameters**

path : class java.lang.String : The path to use


### `deleteFile`
    Delete the given file from the project. Path can contain /s.

**Parameters**

path : class java.lang.String : The path to use


### `directoryExists`
    Does a directory with the given path exist?

**Parameters**

path : class java.lang.String : The path to use


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**

arg0 : class java.lang.String : No Description


### `fileContains`
    Does a file with the given path exist and have the expected content?

**Parameters**

path : class java.lang.String : The path to use

content : class java.lang.String : The content to check


### `fileCount`
    Return the number of files in this project

**Parameters**


### `fileExists`
    Does a file with the given path exist?

**Parameters**

path : class java.lang.String : The path to use


### `fileHasContent`
    Does a file with the given path exist and have the expected content?

**Parameters**

path : class java.lang.String : The path to use

content : class java.lang.String : The content to check against the given file


### `majorProblem`
    Report a major problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `merge`
    
        |Merge the given template to the given output path.
        |
      

**Parameters**

template : class java.lang.String : The name of the template within the backing Rug archive, under /.atomist / templates

path : class java.lang.String : The path that will be the merged path within the output project.

ic : interface com.atomist.rug.runtime.FunctionInvocationContext : The project identifier to use


### `mergeTemplates`
    
        |Merge templates from the specified directory in the backing archive,
        |under /.atomist/templates, to the given output path in the project being
        |edited
      

**Parameters**

templatesPath : class java.lang.String : Source template path where content will be used to merge into target project

outputPath : class java.lang.String : The destination path within the destintion project

ic : interface com.atomist.rug.runtime.FunctionInvocationContext : The project identifier to use


### `minorProblem`
    Report a minor problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `moveUnder`
    Move this file under the given path, preserving its present path under that

**Parameters**

path : class java.lang.String : The root path to move the file to


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**

arg0 : class java.lang.String : No Description


### `regexpReplace`
    Replace all occurrences of the given regular expression in this project

**Parameters**

regexp : class java.lang.String : The regular expression to search for

replacement : class java.lang.String : The string to replace matches with


### `replace`
    Replace all occurrences of the given string literal in this project. Use with care!

**Parameters**

literal : class java.lang.String : The string to look for

replaceWith : class java.lang.String : The string to replace matches with


### `replaceInPath`
    Globally replace all occurrences of the given string literal in file paths in this project

**Parameters**

literal : class java.lang.String : The string to search for

replacement : class java.lang.String : The string to replace in the paths if found

## `java.source`
**Java source file**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return file content

**Parameters**


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**

arg0 : class java.lang.String : No Description


### `filename`
    Return file name, excluding path

**Parameters**


### `majorProblem`
    Report a major problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `movePackage`
    Move the source file to the given package

**Parameters**

arg0 : class java.lang.String : No Description


### `path`
    Return file path, with forward slashes

**Parameters**


### `pkg`
    Return the package name

**Parameters**


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**

arg0 : class java.lang.String : No Description


### `typeCount`
    Count the types in this source file

**Parameters**


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

**Parameters**

root : class java.lang.String : The root path to begin searching from

## `elm.module`
**Elm module**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return file content

**Parameters**


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**

arg0 : class java.lang.String : No Description


### `filename`
    Return file name, excluding path

**Parameters**


### `imports`
    Does the module import the given module?

**Parameters**

arg0 : class java.lang.String : No Description


### `majorProblem`
    Report a major problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Return the name of the module

**Parameters**


### `path`
    Return file path, with forward slashes

**Parameters**


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**

arg0 : class java.lang.String : No Description


### `setName`
    Change the name of the module

**Parameters**

arg0 : class java.lang.String : No Description


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

**Parameters**

root : class java.lang.String : The root path to begin searching from


### `updateImport`
    Update the given module import

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : class java.lang.String : No Description

## `java.project`
**Java project**
*Parent*: None


### `addFile`
    Add the given file to the project. Path can contain /s. Content is a literal string

**Parameters**

path : class java.lang.String : The path to use

content : class java.lang.String : The content to be placed in the new file


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `deleteDirectory`
    Deletes a directory with the given path

**Parameters**

path : class java.lang.String : The path to use


### `deleteFile`
    Delete the given file from the project. Path can contain /s.

**Parameters**

path : class java.lang.String : The path to use


### `directoryExists`
    Does a directory with the given path exist?

**Parameters**

path : class java.lang.String : The path to use


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**

arg0 : class java.lang.String : No Description


### `fileContains`
    Does a file with the given path exist and have the expected content?

**Parameters**

path : class java.lang.String : The path to use

content : class java.lang.String : The content to check


### `fileCount`
    Return the number of files in this project

**Parameters**


### `fileExists`
    Does a file with the given path exist?

**Parameters**

path : class java.lang.String : The path to use


### `fileHasContent`
    Does a file with the given path exist and have the expected content?

**Parameters**

path : class java.lang.String : The path to use

content : class java.lang.String : The content to check against the given file


### `isMaven`
    Is this a Maven project?

**Parameters**


### `isSpring`
    Is this a Spring project?

**Parameters**


### `isSpringBoot`
    Is this a Spring Boot project?

**Parameters**


### `javaFileCount`
    Return the number of Java files in this module

**Parameters**


### `majorProblem`
    Report a major problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `merge`
    
        |Merge the given template to the given output path.
        |
      

**Parameters**

template : class java.lang.String : The name of the template within the backing Rug archive, under /.atomist / templates

path : class java.lang.String : The path that will be the merged path within the output project.

ic : interface com.atomist.rug.runtime.FunctionInvocationContext : The project identifier to use


### `mergeTemplates`
    
        |Merge templates from the specified directory in the backing archive,
        |under /.atomist/templates, to the given output path in the project being
        |edited
      

**Parameters**

templatesPath : class java.lang.String : Source template path where content will be used to merge into target project

outputPath : class java.lang.String : The destination path within the destintion project

ic : interface com.atomist.rug.runtime.FunctionInvocationContext : The project identifier to use


### `minorProblem`
    Report a minor problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `moveUnder`
    Move this file under the given path, preserving its present path under that

**Parameters**

path : class java.lang.String : The root path to move the file to


### `packages`
    List the packages in this project

**Parameters**


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**

arg0 : class java.lang.String : No Description


### `regexpReplace`
    Replace all occurrences of the given regular expression in this project

**Parameters**

regexp : class java.lang.String : The regular expression to search for

replacement : class java.lang.String : The string to replace matches with


### `replace`
    Replace all occurrences of the given string literal in this project. Use with care!

**Parameters**

literal : class java.lang.String : The string to look for

replaceWith : class java.lang.String : The string to replace matches with


### `replaceInPath`
    Globally replace all occurrences of the given string literal in file paths in this project

**Parameters**

literal : class java.lang.String : The string to search for

replacement : class java.lang.String : The string to replace in the paths if found

## `spring.bootProject`
**Spring Boot project**
*Parent*: None


### `addFile`
    Add the given file to the project. Path can contain /s. Content is a literal string

**Parameters**

path : class java.lang.String : The path to use

content : class java.lang.String : The content to be placed in the new file


### `annotateBootApplication`
    Add the given annotation to the Spring Boot application class

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : class java.lang.String : No Description


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `deleteDirectory`
    Deletes a directory with the given path

**Parameters**

path : class java.lang.String : The path to use


### `deleteFile`
    Delete the given file from the project. Path can contain /s.

**Parameters**

path : class java.lang.String : The path to use


### `directoryExists`
    Does a directory with the given path exist?

**Parameters**

path : class java.lang.String : The path to use


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**

arg0 : class java.lang.String : No Description


### `fileContains`
    Does a file with the given path exist and have the expected content?

**Parameters**

path : class java.lang.String : The path to use

content : class java.lang.String : The content to check


### `fileCount`
    Return the number of files in this project

**Parameters**


### `fileExists`
    Does a file with the given path exist?

**Parameters**

path : class java.lang.String : The path to use


### `fileHasContent`
    Does a file with the given path exist and have the expected content?

**Parameters**

path : class java.lang.String : The path to use

content : class java.lang.String : The content to check against the given file


### `isMaven`
    Is this a Maven project?

**Parameters**


### `isSpring`
    Is this a Spring project?

**Parameters**


### `isSpringBoot`
    Is this a Spring Boot project?

**Parameters**


### `javaFileCount`
    Return the number of Java files in this module

**Parameters**


### `majorProblem`
    Report a major problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `merge`
    
        |Merge the given template to the given output path.
        |
      

**Parameters**

template : class java.lang.String : The name of the template within the backing Rug archive, under /.atomist / templates

path : class java.lang.String : The path that will be the merged path within the output project.

ic : interface com.atomist.rug.runtime.FunctionInvocationContext : The project identifier to use


### `mergeTemplates`
    
        |Merge templates from the specified directory in the backing archive,
        |under /.atomist/templates, to the given output path in the project being
        |edited
      

**Parameters**

templatesPath : class java.lang.String : Source template path where content will be used to merge into target project

outputPath : class java.lang.String : The destination path within the destintion project

ic : interface com.atomist.rug.runtime.FunctionInvocationContext : The project identifier to use


### `minorProblem`
    Report a minor problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `moveUnder`
    Move this file under the given path, preserving its present path under that

**Parameters**

path : class java.lang.String : The root path to move the file to


### `packages`
    List the packages in this project

**Parameters**


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**

arg0 : class java.lang.String : No Description


### `regexpReplace`
    Replace all occurrences of the given regular expression in this project

**Parameters**

regexp : class java.lang.String : The regular expression to search for

replacement : class java.lang.String : The string to replace matches with


### `replace`
    Replace all occurrences of the given string literal in this project. Use with care!

**Parameters**

literal : class java.lang.String : The string to look for

replaceWith : class java.lang.String : The string to replace matches with


### `replaceInPath`
    Globally replace all occurrences of the given string literal in file paths in this project

**Parameters**

literal : class java.lang.String : The string to search for

replacement : class java.lang.String : The string to replace in the paths if found

## `java.parameter`
**Method parameter in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**

arg0 : class java.lang.String : No Description


### `majorProblem`
    Report a major problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Return the name of the parameter

**Parameters**


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**

arg0 : class java.lang.String : No Description

## `yml`
**YML file**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return file content

**Parameters**


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**

arg0 : class java.lang.String : No Description


### `filename`
    Return file name, excluding path

**Parameters**


### `majorProblem`
    Report a major problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `path`
    Return file path, with forward slashes

**Parameters**


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**

arg0 : class java.lang.String : No Description


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

**Parameters**

root : class java.lang.String : The root path to begin searching from


### `valueOf`
    Return the value of the given key

**Parameters**

arg0 : class java.lang.String : No Description

## `docker`
**Docker file type**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return file content

**Parameters**


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**

arg0 : class java.lang.String : No Description


### `filename`
    Return file name, excluding path

**Parameters**


### `majorProblem`
    Report a major problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `path`
    Return file path, with forward slashes

**Parameters**


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**

arg0 : class java.lang.String : No Description


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

**Parameters**

root : class java.lang.String : The root path to begin searching from


### `upgrade`
    Do something magical

**Parameters**

## `xml`
**XML file**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return file content

**Parameters**


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**

arg0 : class java.lang.String : No Description


### `filename`
    Return file name, excluding path

**Parameters**


### `majorProblem`
    Report a major problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `path`
    Return file path, with forward slashes

**Parameters**


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**

arg0 : class java.lang.String : No Description


### `setSimpleNode`
    Update the content of this simple node

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : class java.lang.String : No Description


### `simpleNode`
    Return the content of this simple node

**Parameters**

arg0 : class java.lang.String : No Description


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

**Parameters**

root : class java.lang.String : The root path to begin searching from

## `file`
**
Type for a file within a project. Supports generic options such as find and replace.
    **
*Parent*: None


### `append`
    Append the given content to the file

**Parameters**

literal : class java.lang.String : The string to append


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `contains`
    Does the file content contain the given string?

**Parameters**

what : class java.lang.String : The string to use when looking for it in the file


### `containsMatch`
    Does the file content contain a match for the given regex

**Parameters**

regexp : class java.lang.String : The regular expression to look for in the file's content


### `content`
    Return file content

**Parameters**


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**

arg0 : class java.lang.String : No Description


### `filename`
    Return file name, excluding path

**Parameters**


### `findMatches`
    Return all matches for the given regexp in this file

**Parameters**

regexp : class java.lang.String : The regular expression to search for


### `firstMatch`
    Return the first match for the given regex, or the empty string if not found. Call containsMatch first to check presence.

**Parameters**

regexp : class java.lang.String : The regular expression to search for


### `isJava`
    Is this a Java file?

**Parameters**


### `majorProblem`
    Report a major problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Name of the file, excluding path

**Parameters**


### `nameContains`
    Does the file name (not path) contain the given string?

**Parameters**

what : class java.lang.String : The string to use when looking for it in the file name or path


### `path`
    Return file path, with forward slashes

**Parameters**


### `prepend`
    Prepend the given content to the file

**Parameters**

literal : class java.lang.String : The string to prepend to the file


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**

arg0 : class java.lang.String : No Description


### `regexpReplace`
    Replace all occurrences of the given regexp in this file

**Parameters**

regexp : class java.lang.String : The regular expression to search for

replaceWith : class java.lang.String : The string to replace matching expressions with


### `replace`
    Replace all instances of the given literal string in this file

**Parameters**

literal : class java.lang.String : The string to search for

replaceWith : class java.lang.String : The string to replace the matches with


### `setContent`
    Set entire file content to new string

**Parameters**

newContent : class java.lang.String : The content to set the file to


### `setName`
    Set the file name, not path, to the given value

**Parameters**

name : class java.lang.String : The name to set the file to


### `setPath`
    Change the path to the given value. Path should use forward slashes to denote directories

**Parameters**

newPath : class java.lang.String : The path to change the file to


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

**Parameters**

root : class java.lang.String : The root path to begin searching from

## `java.class`
**Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaSourceType)


### `addAnnotation`
    Annotate the element with the given annotation

**Parameters**

package : class java.lang.String : Package where the annotation is sourced

arg1 : class java.lang.String : No Description


### `addImport`
    Add an import to the containing Java source

**Parameters**

arg0 : class java.lang.String : No Description


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**

arg0 : class java.lang.String : No Description


### `hasAnnotation`
    Does the element have the given annotation?

**Parameters**

arg0 : class java.lang.String : No Description


### `majorProblem`
    Report a major problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `movePackage`
    Move the type to the given package

**Parameters**

arg0 : class java.lang.String : No Description


### `name`
    Return the name of the type

**Parameters**


### `pkg`
    Return the package

**Parameters**


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**

arg0 : class java.lang.String : No Description


### `rename`
    Rename the type

**Parameters**

arg0 : class java.lang.String : No Description


### `renameByReplace`
    Rename the type by replacing a pattern in the name

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : class java.lang.String : No Description

## `java.method`
**Method in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)


### `addAnnotation`
    Annotate the element with the given annotation

**Parameters**

package : class java.lang.String : Package where the annotation is sourced

arg1 : class java.lang.String : No Description


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**

arg0 : class java.lang.String : No Description


### `hasAnnotation`
    Does the element have the given annotation?

**Parameters**

arg0 : class java.lang.String : No Description


### `javadoc`
    Return the Javadoc for the method, or an empty string if there isn't any

**Parameters**


### `majorProblem`
    Report a major problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**

arg0 : class java.lang.String : No Description

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Return the name of the method

**Parameters**


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**

arg0 : class java.lang.String : No Description

