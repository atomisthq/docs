## Type: `line`
**Represents a line within a text file**

### `line` Operations


#### Operation: `blockingProblem`
    Report a severe, blocking problem

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `interface com.atomist.rug.runtime.FunctionInvocationContext` | ** |


#### Operation: `content`
    Return this line's content

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


#### Operation: `number`
    Line number

***Parameters***

*None*


#### Operation: `println`
    Cause the editor to print to the console. Useful for debugging if running editors locally.

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |


#### Operation: `update`
    Update this line's content

***Parameters***


| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***s2*** | `class java.lang.String` | *The content to update this line to* |
