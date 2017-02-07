## Type: `CSharpFile`

**C# file**

### `CSharpFile` Operations

#### Operation: `addUsing`

Add a using if it isn't already present

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newUsing*** | `class java.lang.String` | *New using (just the package)* |

#### Operation: `append`

Append

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***arg0*** | `class java.lang.String` | ** |

#### Operation: `blockingProblem`

Report a severe, blocking problem

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `com.atomist.rug.runtime.rugdsl.FunctionInvocationContext<?>` | ** |

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

#### Operation: `majorProblem`

Report a major problem

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `com.atomist.rug.runtime.rugdsl.FunctionInvocationContext<?>` | ** |

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

#### Operation: `println`

Cause the editor to print to the console. Useful for debugging if running editors locally.

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |

#### Operation: `set`

Set the value of the given key

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***key*** | `class java.lang.String` | *The match key whose content you want* |
| ***value*** | `class java.lang.String` | *The new value* |

#### Operation: `update`

Update the whole value

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***arg0*** | `class java.lang.String` | ** |

#### Operation: `value`

Value

##### Parameters

*None*

#### Operation: `valueOf`

Return the value of the given key

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***name*** | `class java.lang.String` | *The match key whose content you want* |

