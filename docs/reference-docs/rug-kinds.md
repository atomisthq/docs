
# Rug Standard Types

## `java.field`
**Field in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)


### `addAnnotation`
    Annotate the element with the given annotation

arg0
arg1


### `blockingProblem`
    Report a severe, blocking problem

arg0
arg1


### `fail`
    Cause the operation to fail with a fatal error

arg0


### `hasAnnotation`
    Does the element have the given annotation?

arg0


### `majorProblem`
    Report a major problem

arg0
arg1


### `minorProblem`
    Report a minor problem

arg0
arg1


### `name`
    Return the name of the field



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0

## `packageJSON`
**package.json configuration file**
*Parent*: None


### `append`
    Append the given content to the file

arg0


### `blockingProblem`
    Report a severe, blocking problem

arg0
arg1


### `contains`
    Does the file content contain the given string?

arg0


### `containsMatch`
    Does the file content contain a match for the given regex

arg0


### `content`
    Return file content



### `fail`
    Cause the operation to fail with a fatal error

arg0


### `filename`
    Return file name, excluding path



### `findMatches`
    Return all matches for the given regexp in this file

arg0


### `firstMatch`
    Return the first match for the given regex, or the empty string if not found. Call containsMatch first to check presence.

arg0


### `isJava`
    Is this a Java file?



### `majorProblem`
    Report a major problem

arg0
arg1


### `minorProblem`
    Report a minor problem

arg0
arg1


### `name`
    Name of the file, excluding path



### `nameContains`
    Does the file name (not path) contain the given string?

arg0


### `packageName`
    Return package name

arg0


### `path`
    Return file path, with forward slashes



### `prepend`
    Prepend the given content to the file

arg0


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0


### `regexpReplace`
    Replace all occurrences of the given regexp in this file

arg0
arg1


### `replace`
    Replace all instances of the given literal string in this file

arg0
arg1


### `setContent`
    Set entire file content to new string

arg0


### `setName`
    Set the file name, not path, to the given value

arg0


### `setPackageName`
    Change the package name

arg0
arg1


### `setPath`
    Change the path to the given value. Path should use forward slashes to denote directories

arg0


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

arg0

## `line`
**Represents a line within a text file**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

arg0
arg1


### `content`
    Return this line's content



### `fail`
    Cause the operation to fail with a fatal error

arg0


### `majorProblem`
    Report a major problem

arg0
arg1


### `minorProblem`
    Report a minor problem

arg0
arg1


### `number`
    Line number



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0


### `update`
    Update this line's content

arg0

## `project`
**
Type for a project. Supports global operations.
Consider using file and other lower types by preference as project
operations can be inefficient.
    **
*Parent*: None


### `addFile`
    Add the given file to the project. Path can contain /s. Content is a literal string

arg0
arg1


### `blockingProblem`
    Report a severe, blocking problem

arg0
arg1


### `deleteDirectory`
    Does a directory with the given path exist?

arg0


### `deleteFile`
    Delete the given file from the project. Path can contain /s.

arg0


### `directoryExists`
    Does a directory with the given path exist?

arg0


### `fail`
    Cause the operation to fail with a fatal error

arg0


### `fileContains`
    Does a file with the given path exist and have the expected content?

arg0
arg1


### `fileCount`
    Return the number of files in this project



### `fileExists`
    Does a file with the given path exist?

arg0


### `fileHasContent`
    Does a file with the given path exist and have the expected content?

arg0
arg1


### `majorProblem`
    Report a major problem

arg0
arg1


### `merge`
    
        |Merge the given template to the given output path.
        |The template parameter is the name of the template within the backing Rug archive,
        |under /.atomist/templates
        |Path is the merged path within the output project.
      

arg0
arg1
arg2


### `mergeTemplates`
    
        |Merge templates from the specified directory in the backing archive,
        |under /.atomist/templates, to the given output path in the project being
        |edited
      

arg0
arg1
arg2


### `minorProblem`
    Report a minor problem

arg0
arg1


### `moveUnder`
    Move this file under the given path, preserving its present path under that

arg0


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0


### `regexpReplace`
    Replace all occurrences of the given regular expression in this project

arg0
arg1


### `replace`
    Replace all occurrences of the given string literal in this project. Use with care!

arg0
arg1


### `replaceInPath`
    Globally replace all occurrences of the given string literal in file paths in this project

arg0
arg1

## `java.source`
**Java source file**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

arg0
arg1


### `content`
    Return file content



### `fail`
    Cause the operation to fail with a fatal error

arg0


### `filename`
    Return file name, excluding path



### `majorProblem`
    Report a major problem

arg0
arg1


### `minorProblem`
    Report a minor problem

arg0
arg1


### `movePackage`
    Move the source file to the given package

arg0


### `path`
    Return file path, with forward slashes



### `pkg`
    Return the package name



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0


### `typeCount`
    Count the types in this source file



### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

arg0

## `elm.module`
**Elm module**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

arg0
arg1


### `content`
    Return file content



### `fail`
    Cause the operation to fail with a fatal error

arg0


### `filename`
    Return file name, excluding path



### `imports`
    Does the module import the given module?

arg0


### `majorProblem`
    Report a major problem

arg0
arg1


### `minorProblem`
    Report a minor problem

arg0
arg1


### `name`
    Return the name of the module



### `path`
    Return file path, with forward slashes



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0


### `setName`
    Change the name of the module

arg0


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

arg0


### `updateImport`
    Update the given module import

arg0
arg1

## `java.project`
**Java project**
*Parent*: None


### `addFile`
    Add the given file to the project. Path can contain /s. Content is a literal string

arg0
arg1


### `blockingProblem`
    Report a severe, blocking problem

arg0
arg1


### `deleteDirectory`
    Does a directory with the given path exist?

arg0


### `deleteFile`
    Delete the given file from the project. Path can contain /s.

arg0


### `directoryExists`
    Does a directory with the given path exist?

arg0


### `fail`
    Cause the operation to fail with a fatal error

arg0


### `fileContains`
    Does a file with the given path exist and have the expected content?

arg0
arg1


### `fileCount`
    Return the number of files in this project



### `fileExists`
    Does a file with the given path exist?

arg0


### `fileHasContent`
    Does a file with the given path exist and have the expected content?

arg0
arg1


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

arg0
arg1


### `merge`
    
        |Merge the given template to the given output path.
        |The template parameter is the name of the template within the backing Rug archive,
        |under /.atomist/templates
        |Path is the merged path within the output project.
      

arg0
arg1
arg2


### `mergeTemplates`
    
        |Merge templates from the specified directory in the backing archive,
        |under /.atomist/templates, to the given output path in the project being
        |edited
      

arg0
arg1
arg2


### `minorProblem`
    Report a minor problem

arg0
arg1


### `moveUnder`
    Move this file under the given path, preserving its present path under that

arg0


### `packages`
    List the packages in this project



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0


### `regexpReplace`
    Replace all occurrences of the given regular expression in this project

arg0
arg1


### `replace`
    Replace all occurrences of the given string literal in this project. Use with care!

arg0
arg1


### `replaceInPath`
    Globally replace all occurrences of the given string literal in file paths in this project

arg0
arg1

## `spring.bootProject`
**Spring Boot project**
*Parent*: None


### `addFile`
    Add the given file to the project. Path can contain /s. Content is a literal string

arg0
arg1


### `annotateBootApplication`
    Add the given annotation to the Spring Boot application class

arg0
arg1


### `blockingProblem`
    Report a severe, blocking problem

arg0
arg1


### `deleteDirectory`
    Does a directory with the given path exist?

arg0


### `deleteFile`
    Delete the given file from the project. Path can contain /s.

arg0


### `directoryExists`
    Does a directory with the given path exist?

arg0


### `fail`
    Cause the operation to fail with a fatal error

arg0


### `fileContains`
    Does a file with the given path exist and have the expected content?

arg0
arg1


### `fileCount`
    Return the number of files in this project



### `fileExists`
    Does a file with the given path exist?

arg0


### `fileHasContent`
    Does a file with the given path exist and have the expected content?

arg0
arg1


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

arg0
arg1


### `merge`
    
        |Merge the given template to the given output path.
        |The template parameter is the name of the template within the backing Rug archive,
        |under /.atomist/templates
        |Path is the merged path within the output project.
      

arg0
arg1
arg2


### `mergeTemplates`
    
        |Merge templates from the specified directory in the backing archive,
        |under /.atomist/templates, to the given output path in the project being
        |edited
      

arg0
arg1
arg2


### `minorProblem`
    Report a minor problem

arg0
arg1


### `moveUnder`
    Move this file under the given path, preserving its present path under that

arg0


### `packages`
    List the packages in this project



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0


### `regexpReplace`
    Replace all occurrences of the given regular expression in this project

arg0
arg1


### `replace`
    Replace all occurrences of the given string literal in this project. Use with care!

arg0
arg1


### `replaceInPath`
    Globally replace all occurrences of the given string literal in file paths in this project

arg0
arg1

## `java.parameter`
**Method parameter in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)


### `blockingProblem`
    Report a severe, blocking problem

arg0
arg1


### `fail`
    Cause the operation to fail with a fatal error

arg0


### `majorProblem`
    Report a major problem

arg0
arg1


### `minorProblem`
    Report a minor problem

arg0
arg1


### `name`
    Return the name of the parameter



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0

## `yml`
**YML file**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

arg0
arg1


### `content`
    Return file content



### `fail`
    Cause the operation to fail with a fatal error

arg0


### `filename`
    Return file name, excluding path



### `majorProblem`
    Report a major problem

arg0
arg1


### `minorProblem`
    Report a minor problem

arg0
arg1


### `path`
    Return file path, with forward slashes



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

arg0


### `valueOf`
    Return the value of the given key

arg0

## `docker`
**Docker file type**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

arg0
arg1


### `content`
    Return file content



### `fail`
    Cause the operation to fail with a fatal error

arg0


### `filename`
    Return file name, excluding path



### `majorProblem`
    Report a major problem

arg0
arg1


### `minorProblem`
    Report a minor problem

arg0
arg1


### `path`
    Return file path, with forward slashes



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

arg0


### `upgrade`
    Do something magical


## `xml`
**XML file**
*Parent*: None


### `blockingProblem`
    Report a severe, blocking problem

arg0
arg1


### `content`
    Return file content



### `fail`
    Cause the operation to fail with a fatal error

arg0


### `filename`
    Return file name, excluding path



### `majorProblem`
    Report a major problem

arg0
arg1


### `minorProblem`
    Report a minor problem

arg0
arg1


### `path`
    Return file path, with forward slashes



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0


### `setSimpleNode`
    Update the content of this simple node

arg0
arg1


### `simpleNode`
    Return the content of this simple node

arg0


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

arg0

## `file`
**
Type for a file within a project. Supports generic options such as find and replace.
    **
*Parent*: None


### `append`
    Append the given content to the file

arg0


### `blockingProblem`
    Report a severe, blocking problem

arg0
arg1


### `contains`
    Does the file content contain the given string?

arg0


### `containsMatch`
    Does the file content contain a match for the given regex

arg0


### `content`
    Return file content



### `fail`
    Cause the operation to fail with a fatal error

arg0


### `filename`
    Return file name, excluding path



### `findMatches`
    Return all matches for the given regexp in this file

arg0


### `firstMatch`
    Return the first match for the given regex, or the empty string if not found. Call containsMatch first to check presence.

arg0


### `isJava`
    Is this a Java file?



### `majorProblem`
    Report a major problem

arg0
arg1


### `minorProblem`
    Report a minor problem

arg0
arg1


### `name`
    Name of the file, excluding path



### `nameContains`
    Does the file name (not path) contain the given string?

arg0


### `path`
    Return file path, with forward slashes



### `prepend`
    Prepend the given content to the file

arg0


### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0


### `regexpReplace`
    Replace all occurrences of the given regexp in this file

arg0
arg1


### `replace`
    Replace all instances of the given literal string in this file

arg0
arg1


### `setContent`
    Set entire file content to new string

arg0


### `setName`
    Set the file name, not path, to the given value

arg0


### `setPath`
    Change the path to the given value. Path should use forward slashes to denote directories

arg0


### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

arg0

## `java.class`
**Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaSourceType)


### `addAnnotation`
    Annotate the element with the given annotation

arg0
arg1


### `addImport`
    Add an import to the containing Java source

arg0


### `blockingProblem`
    Report a severe, blocking problem

arg0
arg1


### `fail`
    Cause the operation to fail with a fatal error

arg0


### `hasAnnotation`
    Does the element have the given annotation?

arg0


### `majorProblem`
    Report a major problem

arg0
arg1


### `minorProblem`
    Report a minor problem

arg0
arg1


### `movePackage`
    Move the type to the given package

arg0


### `name`
    Return the name of the type



### `pkg`
    Return the package



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0


### `rename`
    Rename the type

arg0


### `renameByReplace`
    Rename the type by replacing a pattern in the name

arg0
arg1

## `java.method`
**Method in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)


### `addAnnotation`
    Annotate the element with the given annotation

arg0
arg1


### `blockingProblem`
    Report a severe, blocking problem

arg0
arg1


### `fail`
    Cause the operation to fail with a fatal error

arg0


### `hasAnnotation`
    Does the element have the given annotation?

arg0


### `javadoc`
    Return the Javadoc for the method, or an empty string if there isn't any



### `majorProblem`
    Report a major problem

arg0
arg1


### `minorProblem`
    Report a minor problem

arg0
arg1


### `name`
    Return the name of the method



### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

arg0

