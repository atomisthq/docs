## Type: `Properties`

**Java properties file**

### `Properties` Operations

#### Operation: `blockingProblem`

Report a severe, blocking problem

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `com.atomist.rug.runtime.rugdsl.FunctionInvocationContext<?>` | ** |

#### Operation: `containsKey`

Return whether a property key exists in this file or not

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***key*** | `class java.lang.String` | *The key of the property being searched for* |

#### Operation: `containsValue`

Return whether a property value exists in this file or not

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***value*** | `class java.lang.String` | *The value being searched for* |

#### Operation: `content`

Return file content

##### Parameters

*None*

#### Operation: `eval`

Evaluate, i.e., compile and execute, JavaScript code.

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***arg0*** | `class java.lang.Object` | ** |

#### Operation: `fail`

Cause the operation to fail with a fatal error

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |

#### Operation: `filename`

Return file name, excluding path

##### Parameters

*None*

#### Operation: `getValue`

Return the content of this property

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***key*** | `class java.lang.String` | *The name of the simple node* |

#### Operation: `isWellFormed`

Is this file well-formed?

##### Parameters

*None*

#### Operation: `keys`

Return a list of the supported keys

##### Parameters

*None*

#### Operation: `lineCount`

Return the number of lines in the file

##### Parameters

*None*

#### Operation: `majorProblem`

Report a major problem

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `com.atomist.rug.runtime.rugdsl.FunctionInvocationContext<?>` | ** |

#### Operation: `makeExecutable`

Make the file executable

##### Parameters

*None*

#### Operation: `minorProblem`

Report a minor problem

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `com.atomist.rug.runtime.rugdsl.FunctionInvocationContext<?>` | ** |

#### Operation: `nodeTags`

Tags attached to the node

##### Parameters

*None*

#### Operation: `nodeType`

Tags attached to the node

##### Parameters

*None*

#### Operation: `path`

Return file path, with forward slashes

##### Parameters

*None*

#### Operation: `permissions`

Return the file's permissions

##### Parameters

*None*

#### Operation: `println`

Cause the editor to print to the console. Useful for debugging if running editors locally.

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |

#### Operation: `setProperty`

Set the value of the specified property, creating a property if not present

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***key*** | `class java.lang.String` | *The key of the property being set* |
| ***value*** | `class java.lang.String` | *The value of the property* |

#### Operation: `underPath`

Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***root*** | `class java.lang.String` | *The root path to begin searching from* |

