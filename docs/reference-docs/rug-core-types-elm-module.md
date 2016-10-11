## Type: `elm.module`
**Elm module**

### `elm.module` Operations


#### Operation: `addImport`
    Update the given module import

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newName*** | `class java.lang.String` | *The module name to import* |


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


#### Operation: `imports`
    Does the module import the given module?

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***moduleName*** | `class java.lang.String` | *The module name to check* |


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
    Return the name of the module

***Parameters***

*None*


#### Operation: `path`
    Return file path, with forward slashes

***Parameters***

*None*


#### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


#### Operation: `setName`
    Change the name of the module

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newName*** | `class java.lang.String` | *The module name to change to* |


#### Operation: `underPath`
    Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***root*** | `class java.lang.String` | *The root path to begin searching from* |


#### Operation: `updateImport`
    Update the given module import

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***oldModuleName*** | `class java.lang.String` | *The old module import name* |
| ***newName*** | `class java.lang.String` | *The module name to change to* |

---
[Head back to the Core Rug Types](rug-core-types.md)
