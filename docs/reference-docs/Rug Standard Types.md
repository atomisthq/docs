
# Rug Standard Types


## `java.field`
**Field in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)

Methods:
### `addAnnotation`
    Annotate the element with the given annotation

### `blockingProblem`
    Report a severe, blocking problem

### `fail`
    Cause the operation to fail with a fatal error

### `hasAnnotation`
    Does the element have the given annotation?

### `majorProblem`
    Report a major problem

### `minorProblem`
    Report a minor problem

### `name`
    Return the name of the field

### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

## `packageJSON`
**package.json configuration file**
*Parent*: None

Methods:
### `append`
    Append the given content to the file

### `blockingProblem`
    Report a severe, blocking problem

### `contains`
    Does the file content contain the given string?

### `containsMatch`
    Does the file content contain a match for the given regex

### `content`
    Return file content

### `fail`
    Cause the operation to fail with a fatal error

### `filename`
    Return file name, excluding path

### `findMatches`
    Return all matches for the given regexp in this file

### `firstMatch`
    Return the first match for the given regex, or the empty string if not found. Call containsMatch first to check presence.

### `isJava`
    Is this a Java file?

### `majorProblem`
    Report a major problem

### `minorProblem`
    Report a minor problem

### `name`
    Name of the file, excluding path

### `nameContains`
    Does the file name (not path) contain the given string?

### `packageName`
    Return package name

### `path`
    Return file path, with forward slashes

### `prepend`
    Prepend the given content to the file

### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

### `regexpReplace`
    Replace all occurrences of the given regexp in this file

### `replace`
    Replace all instances of the given literal string in this file

### `setContent`
    Set entire file content to new string

### `setName`
    Set the file name, not path, to the given value

### `setPackageName`
    Change the package name

### `setPath`
    Change the path to the given value. Path should use forward slashes to denote directories

### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

## `line`
**Represents a line within a text file**
*Parent*: None

Methods:
### `blockingProblem`
    Report a severe, blocking problem

### `content`
    Return this line's content

### `fail`
    Cause the operation to fail with a fatal error

### `majorProblem`
    Report a major problem

### `minorProblem`
    Report a minor problem

### `number`
    Line number

### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

### `update`
    Update this line's content

## `project`
**
Type for a project. Supports global operations.
Consider using file and other lower types by preference as project
operations can be inefficient.
    **
*Parent*: None

Methods:
### `addFile`
    Add the given file to the project. Path can contain /s. Content is a literal string

### `blockingProblem`
    Report a severe, blocking problem

### `deleteFile`
    Delete the given file from the project. Path can contain /s.

### `fail`
    Cause the operation to fail with a fatal error

### `fileContains`
    Does a file with the given path exist and haave the expected content?

### `fileCount`
    Return the number of files in this project

### `fileExists`
    Does a file with the given path exist?

### `fileHasContent`
    Does a file with the given path exist and haave the expected content?

### `majorProblem`
    Report a major problem

### `merge`
    
        |Merge the given template to the given output path.
        |The template parameter is the name of the template within the backing Rug archive,
        |under /.atomist/templates
        |Path is the merged path within the output project.
      

### `mergeTemplates`
    
        |Merge templates from the specified directory in the backing archive,
        |under /.atomist/templates, to the given output path in the project being
        |edited
      

### `minorProblem`
    Report a minor problem

### `moveUnder`
    Move this file under the given path, preserving its present path under that

### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

### `regexpReplace`
    Replace all occurrences of the given regular expression in this project

### `replace`
    Replace all occurrences of the given string literal in this project. Use with care!

### `replaceInPath`
    Globally replace all occurrences of the given string literal in file paths in this project

## `java.source`
**Java source file**
*Parent*: None

Methods:
### `blockingProblem`
    Report a severe, blocking problem

### `content`
    Return file content

### `fail`
    Cause the operation to fail with a fatal error

### `filename`
    Return file name, excluding path

### `majorProblem`
    Report a major problem

### `minorProblem`
    Report a minor problem

### `movePackage`
    Move the source file to the given package

### `path`
    Return file path, with forward slashes

### `pkg`
    Return the package name

### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

### `typeCount`
    Count the types in this source file

### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

## `elm.module`
**Elm module**
*Parent*: None

Methods:
### `blockingProblem`
    Report a severe, blocking problem

### `content`
    Return file content

### `fail`
    Cause the operation to fail with a fatal error

### `filename`
    Return file name, excluding path

### `imports`
    Does the module import the given module?

### `majorProblem`
    Report a major problem

### `minorProblem`
    Report a minor problem

### `name`
    Return the name of the module

### `path`
    Return file path, with forward slashes

### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

### `setName`
    Change the name of the module

### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

### `updateImport`
    Update the given module import

## `java.project`
**Java project**
*Parent*: None

Methods:
### `addFile`
    Add the given file to the project. Path can contain /s. Content is a literal string

### `blockingProblem`
    Report a severe, blocking problem

### `deleteFile`
    Delete the given file from the project. Path can contain /s.

### `fail`
    Cause the operation to fail with a fatal error

### `fileContains`
    Does a file with the given path exist and haave the expected content?

### `fileCount`
    Return the number of files in this project

### `fileExists`
    Does a file with the given path exist?

### `fileHasContent`
    Does a file with the given path exist and haave the expected content?

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

### `merge`
    
        |Merge the given template to the given output path.
        |The template parameter is the name of the template within the backing Rug archive,
        |under /.atomist/templates
        |Path is the merged path within the output project.
      

### `mergeTemplates`
    
        |Merge templates from the specified directory in the backing archive,
        |under /.atomist/templates, to the given output path in the project being
        |edited
      

### `minorProblem`
    Report a minor problem

### `moveUnder`
    Move this file under the given path, preserving its present path under that

### `packages`
    List the packages in this project

### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

### `regexpReplace`
    Replace all occurrences of the given regular expression in this project

### `replace`
    Replace all occurrences of the given string literal in this project. Use with care!

### `replaceInPath`
    Globally replace all occurrences of the given string literal in file paths in this project

## `spring.bootProject`
**Spring Boot project**
*Parent*: None

Methods:
### `addFile`
    Add the given file to the project. Path can contain /s. Content is a literal string

### `annotateBootApplication`
    Add the given annotation to the Spring Boot application class

### `blockingProblem`
    Report a severe, blocking problem

### `deleteFile`
    Delete the given file from the project. Path can contain /s.

### `fail`
    Cause the operation to fail with a fatal error

### `fileContains`
    Does a file with the given path exist and haave the expected content?

### `fileCount`
    Return the number of files in this project

### `fileExists`
    Does a file with the given path exist?

### `fileHasContent`
    Does a file with the given path exist and haave the expected content?

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

### `merge`
    
        |Merge the given template to the given output path.
        |The template parameter is the name of the template within the backing Rug archive,
        |under /.atomist/templates
        |Path is the merged path within the output project.
      

### `mergeTemplates`
    
        |Merge templates from the specified directory in the backing archive,
        |under /.atomist/templates, to the given output path in the project being
        |edited
      

### `minorProblem`
    Report a minor problem

### `moveUnder`
    Move this file under the given path, preserving its present path under that

### `packages`
    List the packages in this project

### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

### `regexpReplace`
    Replace all occurrences of the given regular expression in this project

### `replace`
    Replace all occurrences of the given string literal in this project. Use with care!

### `replaceInPath`
    Globally replace all occurrences of the given string literal in file paths in this project

## `java.parameter`
**Method parameter in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)

Methods:
### `blockingProblem`
    Report a severe, blocking problem

### `fail`
    Cause the operation to fail with a fatal error

### `majorProblem`
    Report a major problem

### `minorProblem`
    Report a minor problem

### `name`
    Return the name of the parameter

### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

## `yml`
**YML file**
*Parent*: None

Methods:
### `blockingProblem`
    Report a severe, blocking problem

### `content`
    Return file content

### `fail`
    Cause the operation to fail with a fatal error

### `filename`
    Return file name, excluding path

### `majorProblem`
    Report a major problem

### `minorProblem`
    Report a minor problem

### `path`
    Return file path, with forward slashes

### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

### `valueOf`
    Return the value of the given key

## `docker`
**Docker file type**
*Parent*: None

Methods:
### `blockingProblem`
    Report a severe, blocking problem

### `content`
    Return file content

### `fail`
    Cause the operation to fail with a fatal error

### `filename`
    Return file name, excluding path

### `majorProblem`
    Report a major problem

### `minorProblem`
    Report a minor problem

### `path`
    Return file path, with forward slashes

### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

### `upgrade`
    Do something magical

## `xml`
**XML file**
*Parent*: None

Methods:
### `blockingProblem`
    Report a severe, blocking problem

### `content`
    Return file content

### `fail`
    Cause the operation to fail with a fatal error

### `filename`
    Return file name, excluding path

### `majorProblem`
    Report a major problem

### `minorProblem`
    Report a minor problem

### `path`
    Return file path, with forward slashes

### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

### `setSimpleNode`
    Update the content of this simple node

### `simpleNode`
    Return the content of this simple node

### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

## `file`
**
Type for a file within a project. Supports generic options such as find and replace.
    **
*Parent*: None

Methods:
### `append`
    Append the given content to the file

### `blockingProblem`
    Report a severe, blocking problem

### `contains`
    Does the file content contain the given string?

### `containsMatch`
    Does the file content contain a match for the given regex

### `content`
    Return file content

### `fail`
    Cause the operation to fail with a fatal error

### `filename`
    Return file name, excluding path

### `findMatches`
    Return all matches for the given regexp in this file

### `firstMatch`
    Return the first match for the given regex, or the empty string if not found. Call containsMatch first to check presence.

### `isJava`
    Is this a Java file?

### `majorProblem`
    Report a major problem

### `minorProblem`
    Report a minor problem

### `name`
    Name of the file, excluding path

### `nameContains`
    Does the file name (not path) contain the given string?

### `path`
    Return file path, with forward slashes

### `prepend`
    Prepend the given content to the file

### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

### `regexpReplace`
    Replace all occurrences of the given regexp in this file

### `replace`
    Replace all instances of the given literal string in this file

### `setContent`
    Set entire file content to new string

### `setName`
    Set the file name, not path, to the given value

### `setPath`
    Change the path to the given value. Path should use forward slashes to denote directories

### `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

## `java.class`
**Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaSourceType)

Methods:
### `addAnnotation`
    Annotate the element with the given annotation

### `addImport`
    Add an import to the containing Java source

### `blockingProblem`
    Report a severe, blocking problem

### `fail`
    Cause the operation to fail with a fatal error

### `hasAnnotation`
    Does the element have the given annotation?

### `majorProblem`
    Report a major problem

### `minorProblem`
    Report a minor problem

### `movePackage`
    Move the type to the given package

### `name`
    Return the name of the type

### `pkg`
    Return the package

### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

### `rename`
    Rename the type

### `renameByReplace`
    Rename the type by replacing a pattern in the name

## `java.method`
**Method in a Java class**
*Parent*: Some(class com.atomist.rug.kind.java.JavaClassType)

Methods:
### `addAnnotation`
    Annotate the element with the given annotation

### `blockingProblem`
    Report a severe, blocking problem

### `fail`
    Cause the operation to fail with a fatal error

### `hasAnnotation`
    Does the element have the given annotation?

### `javadoc`
    Return the Javadoc for the method, or an empty string if there isn't any

### `majorProblem`
    Report a major problem

### `minorProblem`
    Report a minor problem

### `name`
    Return the name of the method

### `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

