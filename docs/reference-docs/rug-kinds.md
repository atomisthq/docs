
# Rug Standard Types

## `java.field`
**Field in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)


### `addAnnotation`
    Annotate the element with the given annotation

package : class java.lang.String : Package where the annotation is sourced
arg1 : class java.lang.String : No Description


### `blockingProblem`
    Report a severe, blocking problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `fail`
    Cause the operation to fail with a fatal error

arg0 : class java.lang.String : No Description


### `hasAnnotation`
    Does the element have the given annotation?

arg0 : class java.lang.String : No Description


### `majorProblem`
    Report a major problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Return the name of the field



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0 : class java.lang.String : No Description

## `packageJSON`
**package.json configuration file**
*Parent*: None


### `append`
    Append the given content to the file

arg0 : class java.lang.String : No Description


### `blockingProblem`
    Report a severe, blocking problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `contains`
    Does the file content contain the given string?

arg0 : class java.lang.String : No Description


### `containsMatch`
    Does the file content contain a match for the given regex

arg0 : class java.lang.String : No Description


### `content`
    Return file content



### `fail`
    Cause the operation to fail with a fatal error

arg0 : class java.lang.String : No Description


### `filename`
    Return file name, excluding path



### `findMatches`
    Return all matches for the given regexp in this file

arg0 : class java.lang.String : No Description


### `firstMatch`
    Return the first match for the given regex, or the empty string if not found. Call containsMatch first to check presence.

arg0 : class java.lang.String : No Description


### `isJava`
    Is this a Java file?



### `majorProblem`
    Report a major problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Name of the file, excluding path



### `nameContains`
    Does the file name (not path) contain the given string?

arg0 : class java.lang.String : No Description


### `packageName`
    Return package name

arg0 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `path`
    Return file path, with forward slashes



### `prepend`
    Prepend the given content to the file

arg0 : class java.lang.String : No Description


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0 : class java.lang.String : No Description


### `regexpReplace`
    Replace all occurrences of the given regexp in this file

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `replace`
    Replace all instances of the given literal string in this file

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `setContent`
    Set entire file content to new string

arg0 : class java.lang.String : No Description


### `setName`
    Set the file name, not path, to the given value

arg0 : class java.lang.String : No Description


### `setPackageName`
    Change the package name

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `setPath`
    Change the path to the given value. Path should use forward slashes to denote directories

arg0 : class java.lang.String : No Description


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

arg0 : class java.lang.String : No Description

## `line`
**Represents a line within a text file**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return this line's content



### `fail`
    Cause the operation to fail with a fatal error

arg0 : class java.lang.String : No Description


### `majorProblem`
    Report a major problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `number`
    Line number



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0 : class java.lang.String : No Description


### `update`
    Update this line's content

arg0 : class java.lang.String : No Description

## `project`
**
Type for a project. Supports global operations.
Consider using file and other lower types by preference as project
operations can be inefficient.
    **
*Parent*: None


### `addFile`
    Add the given file to the project. Path can contain /s. Content is a literal string

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `blockingProblem`
    Report a severe, blocking problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `deleteDirectory`
    Does a directory with the given path exist?

arg0 : class java.lang.String : No Description


### `deleteFile`
    Delete the given file from the project. Path can contain /s.

arg0 : class java.lang.String : No Description


### `directoryExists`
    Does a directory with the given path exist?

arg0 : class java.lang.String : No Description


### `fail`
    Cause the operation to fail with a fatal error

arg0 : class java.lang.String : No Description


### `fileContains`
    Does a file with the given path exist and have the expected content?

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `fileCount`
    Return the number of files in this project



### `fileExists`
    Does a file with the given path exist?

arg0 : class java.lang.String : No Description


### `fileHasContent`
    Does a file with the given path exist and have the expected content?

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `majorProblem`
    Report a major problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `merge`
    
        |Merge the given template to the given output path.
        |The template parameter is the name of the template within the backing Rug archive,
        |under /.atomist/templates
        |Path is the merged path within the output project.
      

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description
arg2 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `mergeTemplates`
    
        |Merge templates from the specified directory in the backing archive,
        |under /.atomist/templates, to the given output path in the project being
        |edited
      

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description
arg2 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `moveUnder`
    Move this file under the given path, preserving its present path under that

arg0 : class java.lang.String : No Description


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0 : class java.lang.String : No Description


### `regexpReplace`
    Replace all occurrences of the given regular expression in this project

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `replace`
    Replace all occurrences of the given string literal in this project. Use with care!

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `replaceInPath`
    Globally replace all occurrences of the given string literal in file paths in this project

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description

## `java.source`
**Java source file**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return file content



### `fail`
    Cause the operation to fail with a fatal error

arg0 : class java.lang.String : No Description


### `filename`
    Return file name, excluding path



### `majorProblem`
    Report a major problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `movePackage`
    Move the source file to the given package

arg0 : class java.lang.String : No Description


### `path`
    Return file path, with forward slashes



### `pkg`
    Return the package name



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0 : class java.lang.String : No Description


### `typeCount`
    Count the types in this source file



### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

arg0 : class java.lang.String : No Description

## `elm.module`
**Elm module**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return file content



### `fail`
    Cause the operation to fail with a fatal error

arg0 : class java.lang.String : No Description


### `filename`
    Return file name, excluding path



### `imports`
    Does the module import the given module?

arg0 : class java.lang.String : No Description


### `majorProblem`
    Report a major problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Return the name of the module



### `path`
    Return file path, with forward slashes



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0 : class java.lang.String : No Description


### `setName`
    Change the name of the module

arg0 : class java.lang.String : No Description


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

arg0 : class java.lang.String : No Description


### `updateImport`
    Update the given module import

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description

## `java.project`
**Java project**
*Parent*: None


### `addFile`
    Add the given file to the project. Path can contain /s. Content is a literal string

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `blockingProblem`
    Report a severe, blocking problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `deleteDirectory`
    Does a directory with the given path exist?

arg0 : class java.lang.String : No Description


### `deleteFile`
    Delete the given file from the project. Path can contain /s.

arg0 : class java.lang.String : No Description


### `directoryExists`
    Does a directory with the given path exist?

arg0 : class java.lang.String : No Description


### `fail`
    Cause the operation to fail with a fatal error

arg0 : class java.lang.String : No Description


### `fileContains`
    Does a file with the given path exist and have the expected content?

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `fileCount`
    Return the number of files in this project



### `fileExists`
    Does a file with the given path exist?

arg0 : class java.lang.String : No Description


### `fileHasContent`
    Does a file with the given path exist and have the expected content?

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `isMaven`
    Is this a Maven project?



### `isSpring`
    Is this a Spring project?



### `isSpringBoot`
    Is this a Spring Boot project?



### `javaFileCount`
    Return the number of Java files in this module



### `majorProblem`
    Report a major problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `merge`
    
        |Merge the given template to the given output path.
        |The template parameter is the name of the template within the backing Rug archive,
        |under /.atomist/templates
        |Path is the merged path within the output project.
      

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description
arg2 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `mergeTemplates`
    
        |Merge templates from the specified directory in the backing archive,
        |under /.atomist/templates, to the given output path in the project being
        |edited
      

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description
arg2 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `moveUnder`
    Move this file under the given path, preserving its present path under that

arg0 : class java.lang.String : No Description


### `packages`
    List the packages in this project



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0 : class java.lang.String : No Description


### `regexpReplace`
    Replace all occurrences of the given regular expression in this project

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `replace`
    Replace all occurrences of the given string literal in this project. Use with care!

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `replaceInPath`
    Globally replace all occurrences of the given string literal in file paths in this project

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description

## `spring.bootProject`
**Spring Boot project**
*Parent*: None


### `addFile`
    Add the given file to the project. Path can contain /s. Content is a literal string

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `annotateBootApplication`
    Add the given annotation to the Spring Boot application class

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `blockingProblem`
    Report a severe, blocking problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `deleteDirectory`
    Does a directory with the given path exist?

arg0 : class java.lang.String : No Description


### `deleteFile`
    Delete the given file from the project. Path can contain /s.

arg0 : class java.lang.String : No Description


### `directoryExists`
    Does a directory with the given path exist?

arg0 : class java.lang.String : No Description


### `fail`
    Cause the operation to fail with a fatal error

arg0 : class java.lang.String : No Description


### `fileContains`
    Does a file with the given path exist and have the expected content?

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `fileCount`
    Return the number of files in this project



### `fileExists`
    Does a file with the given path exist?

arg0 : class java.lang.String : No Description


### `fileHasContent`
    Does a file with the given path exist and have the expected content?

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `isMaven`
    Is this a Maven project?



### `isSpring`
    Is this a Spring project?



### `isSpringBoot`
    Is this a Spring Boot project?



### `javaFileCount`
    Return the number of Java files in this module



### `majorProblem`
    Report a major problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `merge`
    
        |Merge the given template to the given output path.
        |The template parameter is the name of the template within the backing Rug archive,
        |under /.atomist/templates
        |Path is the merged path within the output project.
      

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description
arg2 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `mergeTemplates`
    
        |Merge templates from the specified directory in the backing archive,
        |under /.atomist/templates, to the given output path in the project being
        |edited
      

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description
arg2 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `moveUnder`
    Move this file under the given path, preserving its present path under that

arg0 : class java.lang.String : No Description


### `packages`
    List the packages in this project



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0 : class java.lang.String : No Description


### `regexpReplace`
    Replace all occurrences of the given regular expression in this project

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `replace`
    Replace all occurrences of the given string literal in this project. Use with care!

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `replaceInPath`
    Globally replace all occurrences of the given string literal in file paths in this project

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description

## `java.parameter`
**Method parameter in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)


### `blockingProblem`
    Report a severe, blocking problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `fail`
    Cause the operation to fail with a fatal error

arg0 : class java.lang.String : No Description


### `majorProblem`
    Report a major problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Return the name of the parameter



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0 : class java.lang.String : No Description

## `yml`
**YML file**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return file content



### `fail`
    Cause the operation to fail with a fatal error

arg0 : class java.lang.String : No Description


### `filename`
    Return file name, excluding path



### `majorProblem`
    Report a major problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `path`
    Return file path, with forward slashes



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0 : class java.lang.String : No Description


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

arg0 : class java.lang.String : No Description


### `valueOf`
    Return the value of the given key

arg0 : class java.lang.String : No Description

## `docker`
**Docker file type**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return file content



### `fail`
    Cause the operation to fail with a fatal error

arg0 : class java.lang.String : No Description


### `filename`
    Return file name, excluding path



### `majorProblem`
    Report a major problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `path`
    Return file path, with forward slashes



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0 : class java.lang.String : No Description


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

arg0 : class java.lang.String : No Description


### `upgrade`
    Do something magical


## `xml`
**XML file**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `content`
    Return file content



### `fail`
    Cause the operation to fail with a fatal error

arg0 : class java.lang.String : No Description


### `filename`
    Return file name, excluding path



### `majorProblem`
    Report a major problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `path`
    Return file path, with forward slashes



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0 : class java.lang.String : No Description


### `setSimpleNode`
    Update the content of this simple node

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `simpleNode`
    Return the content of this simple node

arg0 : class java.lang.String : No Description


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

arg0 : class java.lang.String : No Description

## `file`
**
Type for a file within a project. Supports generic options such as find and replace.
    **
*Parent*: None


### `append`
    Append the given content to the file

arg0 : class java.lang.String : No Description


### `blockingProblem`
    Report a severe, blocking problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `contains`
    Does the file content contain the given string?

arg0 : class java.lang.String : No Description


### `containsMatch`
    Does the file content contain a match for the given regex

arg0 : class java.lang.String : No Description


### `content`
    Return file content



### `fail`
    Cause the operation to fail with a fatal error

arg0 : class java.lang.String : No Description


### `filename`
    Return file name, excluding path



### `findMatches`
    Return all matches for the given regexp in this file

arg0 : class java.lang.String : No Description


### `firstMatch`
    Return the first match for the given regex, or the empty string if not found. Call containsMatch first to check presence.

arg0 : class java.lang.String : No Description


### `isJava`
    Is this a Java file?



### `majorProblem`
    Report a major problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Name of the file, excluding path



### `nameContains`
    Does the file name (not path) contain the given string?

arg0 : class java.lang.String : No Description


### `path`
    Return file path, with forward slashes



### `prepend`
    Prepend the given content to the file

arg0 : class java.lang.String : No Description


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0 : class java.lang.String : No Description


### `regexpReplace`
    Replace all occurrences of the given regexp in this file

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `replace`
    Replace all instances of the given literal string in this file

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description


### `setContent`
    Set entire file content to new string

arg0 : class java.lang.String : No Description


### `setName`
    Set the file name, not path, to the given value

arg0 : class java.lang.String : No Description


### `setPath`
    Change the path to the given value. Path should use forward slashes to denote directories

arg0 : class java.lang.String : No Description


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

arg0 : class java.lang.String : No Description

## `java.class`
**Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaSourceType)


### `addAnnotation`
    Annotate the element with the given annotation

package : class java.lang.String : Package where the annotation is sourced
arg1 : class java.lang.String : No Description


### `addImport`
    Add an import to the containing Java source

arg0 : class java.lang.String : No Description


### `blockingProblem`
    Report a severe, blocking problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `fail`
    Cause the operation to fail with a fatal error

arg0 : class java.lang.String : No Description


### `hasAnnotation`
    Does the element have the given annotation?

arg0 : class java.lang.String : No Description


### `majorProblem`
    Report a major problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `movePackage`
    Move the type to the given package

arg0 : class java.lang.String : No Description


### `name`
    Return the name of the type



### `pkg`
    Return the package



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0 : class java.lang.String : No Description


### `rename`
    Rename the type

arg0 : class java.lang.String : No Description


### `renameByReplace`
    Rename the type by replacing a pattern in the name

arg0 : class java.lang.String : No Description
arg1 : class java.lang.String : No Description

## `java.method`
**Method in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)


### `addAnnotation`
    Annotate the element with the given annotation

package : class java.lang.String : Package where the annotation is sourced
arg1 : class java.lang.String : No Description


### `blockingProblem`
    Report a severe, blocking problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `fail`
    Cause the operation to fail with a fatal error

arg0 : class java.lang.String : No Description


### `hasAnnotation`
    Does the element have the given annotation?

arg0 : class java.lang.String : No Description


### `javadoc`
    Return the Javadoc for the method, or an empty string if there isn't any



### `majorProblem`
    Report a major problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `minorProblem`
    Report a minor problem

arg0 : class java.lang.String : No Description
arg1 : interface com.atomist.rug.runtime.FunctionInvocationContext : No Description


### `name`
    Return the name of the method



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0 : class java.lang.String : No Description

