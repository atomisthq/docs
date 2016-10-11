
## Type: `java.source`
**Java source file**

### `java.source` Operations


#### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


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


#### Operation: `movePackage`
    Move the source file to the given package

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newPackage*** | `class java.lang.String` | *The package to move the source file to* |


#### Operation: `path`
    Return file path, with forward slashes

***Parameters***

*None*


#### Operation: `pkg`
    Return the package name

***Parameters***

*None*


#### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


#### Operation: `typeCount`
    Count the types in this source file

***Parameters***

*None*


#### Operation: `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***root*** | `class java.lang.String` | *The root path to begin searching from* |

---
[Head back to the Core Rug Types](rug-core-types.md)
