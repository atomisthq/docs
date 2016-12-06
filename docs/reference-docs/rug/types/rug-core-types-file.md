
## Type: `file`
**
Type for a file within a project. Supports generic options such as find and replace.
    **

### `file` Operations


#### Operation: `append`
    Append the given content to the file

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to append* |


#### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


#### Operation: `contains`
    Does the file content contain the given string?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***what*** | `class java.lang.String` | *The string to use when looking for it in the file* |


#### Operation: `containsMatch`
    Does the file content contain a match for the given regex

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***regexp*** | `class java.lang.String` | *The regular expression to look for in the file's content* |


#### Operation: `content`
    Return file content

***Parameters***

*None*


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


#### Operation: `filename`
    Return file name, excluding path

***Parameters***

*None*


#### Operation: `findMatches`
    Return all matches for the given regexp in this file

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***regexp*** | `class java.lang.String` | *The regular expression to search for* |


#### Operation: `firstMatch`
    Return the first match for the given regex, or the empty string if not found. Call containsMatch first to check presence.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***regexp*** | `class java.lang.String` | *The regular expression to search for* |


#### Operation: `isJava`
    Is this a Java file?

***Parameters***

*None*


#### Operation: `lineCount`
    Return the number of lines in the file

***Parameters***

*None*


#### Operation: `majorProblem`
    Report a major problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


#### Operation: `minorProblem`
    Report a minor problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


#### Operation: `name`
    Name of the file, excluding path

***Parameters***

*None*


#### Operation: `nameContains`
    Does the file name (not path) contain the given string?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***what*** | `class java.lang.String` | *The string to use when looking for it in the file name or path* |


#### Operation: `path`
    Return file path, with forward slashes

***Parameters***

*None*


#### Operation: `prepend`
    Prepend the given content to the file

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to prepend to the file* |


#### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


#### Operation: `regexpReplace`
    Replace all occurrences of the given regexp in this file

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***regexp*** | `class java.lang.String` | *The regular expression to search for* |
| ***replaceWith*** | `class java.lang.String` | *The string to replace matching expressions with* |


#### Operation: `replace`
    Replace all instances of the given literal string in this file

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***literal*** | `class java.lang.String` | *The string to search for* |
| ***replaceWith*** | `class java.lang.String` | *The string to replace the matches with* |


#### Operation: `setContent`
    Set entire file content to new string

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newContent*** | `class java.lang.String` | *The content to set the file to* |


#### Operation: `setName`
    Set the file name, not path, to the given value

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***name*** | `class java.lang.String` | *The name to set the file to* |


#### Operation: `setPath`
    Change the path to the given value. Path should use forward slashes to denote directories

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newPath*** | `class java.lang.String` | *The path to change the file to* |


#### Operation: `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***root*** | `class java.lang.String` | *The root path to begin searching from* |
