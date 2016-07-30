
# Rug Standard Types

## `java.field`
**Field in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)


### `addAnnotation`
    Annotate the element with the given annotation

**Parameters**



pkg : class java.lang.String : Package where the annotation is sourced

annotation : class java.lang.String : The annotation to add


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**



msg : class java.lang.String : The message to be displayed


### `hasAnnotation`
    Does the element have the given annotation?

**Parameters**



annotation : class java.lang.String : The string name of the annotation to look for


### `majorProblem`
    Report a major problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Return the name of the field

**Parameters**

*None*


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**



msg : class java.lang.String : The message to be displayed

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



msg : class java.lang.String : The message to be displayed

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

*None*


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**



msg : class java.lang.String : The message to be displayed


### `filename`
    Return file name, excluding path

**Parameters**

*None*


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

*None*


### `majorProblem`
    Report a major problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Name of the file, excluding path

**Parameters**

*None*


### `nameContains`
    Does the file name (not path) contain the given string?

**Parameters**



what : class java.lang.String : The string to use when looking for it in the file name or path


### `packageName`
    Return package name

**Parameters**



ic : interface com.atomist.rug.runtime.FunctionInvocationContext : 


### `path`
    Return file path, with forward slashes

**Parameters**

*None*


### `prepend`
    Prepend the given content to the file

**Parameters**



literal : class java.lang.String : The string to prepend to the file


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**



msg : class java.lang.String : The message to be displayed


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



newName : class java.lang.String : The name to set the package to

ic : interface com.atomist.rug.runtime.FunctionInvocationContext : 


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



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return this line's content

**Parameters**

*None*


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**



msg : class java.lang.String : The message to be displayed


### `majorProblem`
    Report a major problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `number`
    Line number

**Parameters**

*None*


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**



msg : class java.lang.String : The message to be displayed


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



msg : class java.lang.String : The message to be displayed

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



msg : class java.lang.String : The message to be displayed


### `fileContains`
    Does a file with the given path exist and have the expected content?

**Parameters**



path : class java.lang.String : The path to use

content : class java.lang.String : The content to check


### `fileCount`
    Return the number of files in this project

**Parameters**

*None*


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



msg : class java.lang.String : The message to be displayed

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



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `moveUnder`
    Move this file under the given path, preserving its present path under that

**Parameters**



path : class java.lang.String : The root path to move the file to


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**



msg : class java.lang.String : The message to be displayed


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



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return file content

**Parameters**

*None*


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**



msg : class java.lang.String : The message to be displayed


### `filename`
    Return file name, excluding path

**Parameters**

*None*


### `majorProblem`
    Report a major problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `movePackage`
    Move the source file to the given package

**Parameters**



newPackage : class java.lang.String : The package to move the source file to


### `path`
    Return file path, with forward slashes

**Parameters**

*None*


### `pkg`
    Return the package name

**Parameters**

*None*


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**



msg : class java.lang.String : The message to be displayed


### `typeCount`
    Count the types in this source file

**Parameters**

*None*


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



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return file content

**Parameters**

*None*


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**



msg : class java.lang.String : The message to be displayed


### `filename`
    Return file name, excluding path

**Parameters**

*None*


### `imports`
    Does the module import the given module?

**Parameters**



moduleName : class java.lang.String : The module name to check


### `majorProblem`
    Report a major problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Return the name of the module

**Parameters**

*None*


### `path`
    Return file path, with forward slashes

**Parameters**

*None*


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**



msg : class java.lang.String : The message to be displayed


### `setName`
    Change the name of the module

**Parameters**



newName : class java.lang.String : The module name to change to


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

**Parameters**



root : class java.lang.String : The root path to begin searching from


### `updateImport`
    Update the given module import

**Parameters**



oldModuleName : class java.lang.String : The old module import name

newName : class java.lang.String : The module name to change to

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



msg : class java.lang.String : The message to be displayed

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



msg : class java.lang.String : The message to be displayed


### `fileContains`
    Does a file with the given path exist and have the expected content?

**Parameters**



path : class java.lang.String : The path to use

content : class java.lang.String : The content to check


### `fileCount`
    Return the number of files in this project

**Parameters**

*None*


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

*None*


### `isSpring`
    Is this a Spring project?

**Parameters**

*None*


### `isSpringBoot`
    Is this a Spring Boot project?

**Parameters**

*None*


### `javaFileCount`
    Return the number of Java files in this module

**Parameters**

*None*


### `majorProblem`
    Report a major problem

**Parameters**



msg : class java.lang.String : The message to be displayed

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



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `moveUnder`
    Move this file under the given path, preserving its present path under that

**Parameters**



path : class java.lang.String : The root path to move the file to


### `packages`
    List the packages in this project

**Parameters**

*None*


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**



msg : class java.lang.String : The message to be displayed


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



pkg : class java.lang.String : The package of the annotation

annotationName : class java.lang.String : The annotation to add


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**



msg : class java.lang.String : The message to be displayed

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



msg : class java.lang.String : The message to be displayed


### `fileContains`
    Does a file with the given path exist and have the expected content?

**Parameters**



path : class java.lang.String : The path to use

content : class java.lang.String : The content to check


### `fileCount`
    Return the number of files in this project

**Parameters**

*None*


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

*None*


### `isSpring`
    Is this a Spring project?

**Parameters**

*None*


### `isSpringBoot`
    Is this a Spring Boot project?

**Parameters**

*None*


### `javaFileCount`
    Return the number of Java files in this module

**Parameters**

*None*


### `majorProblem`
    Report a major problem

**Parameters**



msg : class java.lang.String : The message to be displayed

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



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `moveUnder`
    Move this file under the given path, preserving its present path under that

**Parameters**



path : class java.lang.String : The root path to move the file to


### `packages`
    List the packages in this project

**Parameters**

*None*


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**



msg : class java.lang.String : The message to be displayed


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



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**



msg : class java.lang.String : The message to be displayed


### `majorProblem`
    Report a major problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Return the name of the parameter

**Parameters**

*None*


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**



msg : class java.lang.String : The message to be displayed

## `yml`
**YML file**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return file content

**Parameters**

*None*


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**



msg : class java.lang.String : The message to be displayed


### `filename`
    Return file name, excluding path

**Parameters**

*None*


### `majorProblem`
    Report a major problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `path`
    Return file path, with forward slashes

**Parameters**

*None*


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**



msg : class java.lang.String : The message to be displayed


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

**Parameters**



root : class java.lang.String : The root path to begin searching from


### `valueOf`
    Return the value of the given key

**Parameters**



name : class java.lang.String : The YAML key whose content you want

## `docker`
**Docker file type**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return file content

**Parameters**

*None*


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**



msg : class java.lang.String : The message to be displayed


### `filename`
    Return file name, excluding path

**Parameters**

*None*


### `majorProblem`
    Report a major problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `path`
    Return file path, with forward slashes

**Parameters**

*None*


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**



msg : class java.lang.String : The message to be displayed


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

**Parameters**



root : class java.lang.String : The root path to begin searching from


### `upgrade`
    Do something magical

**Parameters**

*None*

## `xml`
**XML file**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return file content

**Parameters**

*None*


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**



msg : class java.lang.String : The message to be displayed


### `filename`
    Return file name, excluding path

**Parameters**

*None*


### `majorProblem`
    Report a major problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `path`
    Return file path, with forward slashes

**Parameters**

*None*


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**



msg : class java.lang.String : The message to be displayed


### `setSimpleNode`
    Update the content of this simple node

**Parameters**



xpath : class java.lang.String : The node to select

newValue : class java.lang.String : The new content for that node


### `simpleNode`
    Return the content of this simple node

**Parameters**



xpath : class java.lang.String : The name of the simple node


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



msg : class java.lang.String : The message to be displayed

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

*None*


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**



msg : class java.lang.String : The message to be displayed


### `filename`
    Return file name, excluding path

**Parameters**

*None*


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

*None*


### `majorProblem`
    Report a major problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Name of the file, excluding path

**Parameters**

*None*


### `nameContains`
    Does the file name (not path) contain the given string?

**Parameters**



what : class java.lang.String : The string to use when looking for it in the file name or path


### `path`
    Return file path, with forward slashes

**Parameters**

*None*


### `prepend`
    Prepend the given content to the file

**Parameters**



literal : class java.lang.String : The string to prepend to the file


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**



msg : class java.lang.String : The message to be displayed


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



pkg : class java.lang.String : Package where the annotation is sourced

annotation : class java.lang.String : The annotation to add


### `addImport`
    Add an import to the containing Java source

**Parameters**



fqn : class java.lang.String : The fully qualified name of the import


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**



msg : class java.lang.String : The message to be displayed


### `hasAnnotation`
    Does the element have the given annotation?

**Parameters**



annotation : class java.lang.String : The string name of the annotation to look for


### `majorProblem`
    Report a major problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `movePackage`
    Move the type to the given package

**Parameters**



newPackage : class java.lang.String : The package to move the type to


### `name`
    Return the name of the type

**Parameters**

*None*


### `pkg`
    Return the package

**Parameters**

*None*


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**



msg : class java.lang.String : The message to be displayed


### `rename`
    Rename the type

**Parameters**



newName : class java.lang.String : The new name of the type


### `renameByReplace`
    Rename the type by replacing a pattern in the name

**Parameters**



target : class java.lang.String : The name of the type to replace

replacement : class java.lang.String : The replacement pattern

## `java.method`
**Method in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)


### `addAnnotation`
    Annotate the element with the given annotation

**Parameters**



pkg : class java.lang.String : Package where the annotation is sourced

annotation : class java.lang.String : The annotation to add


### `blockingProblem`
    Report a severe, blocking problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `fail`
    Cause the operation to fail with a fatal error

**Parameters**



msg : class java.lang.String : The message to be displayed


### `hasAnnotation`
    Does the element have the given annotation?

**Parameters**



annotation : class java.lang.String : The string name of the annotation to look for


### `javadoc`
    Return the Javadoc for the method, or an empty string if there isn't any

**Parameters**

*None*


### `majorProblem`
    Report a major problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

**Parameters**



msg : class java.lang.String : The message to be displayed

arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Return the name of the method

**Parameters**

*None*


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

**Parameters**



msg : class java.lang.String : The message to be displayed

