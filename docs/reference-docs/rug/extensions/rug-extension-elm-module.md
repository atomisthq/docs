## Type: `ElmModule`

**Elm module**

### `ElmModule` Operations

#### Operation: `addFunction`

Add a function with the given declaration

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***body*** | `class java.lang.String` | *Body for the function* |

#### Operation: `addImportStatement`

Update the given module import

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***importStatement*** | `class java.lang.String` | *The complete import statement* |

#### Operation: `blockingProblem`

Report a severe, blocking problem

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `com.atomist.rug.runtime.rugdsl.FunctionInvocationContext<?>` | ** |

#### Operation: `children`

Children

##### Parameters

*None*

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

#### Operation: `exposes`

Does the module expose this?

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***name*** | `class java.lang.String` | *A function or type that might be exposed* |

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

#### Operation: `imports`

Does the module import the given module?

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***moduleName*** | `class java.lang.String` | *The module name to check* |

#### Operation: `isWellFormed`

Is this file well-formed?

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

#### Operation: `name`

Return the name of the module

##### Parameters

*None*

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

#### Operation: `removeFunction`

Remove a function with the given name

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***name*** | `class java.lang.String` | *Name of the function to remove* |

#### Operation: `rename`

Change the name of the module

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newName*** | `class java.lang.String` | *The module name to change to* |

#### Operation: `replaceExposing`

Replace the exposing

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newExposing*** | `class java.lang.String` | *New content of exposing. Does not include exposing keyword. Will be either a CSV list or ..* |

#### Operation: `underPath`

Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***root*** | `class java.lang.String` | *The root path to begin searching from* |

#### Operation: `updateImport`

Update the given module import

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***oldModuleName*** | `class java.lang.String` | *The old module import name* |
| ***newName*** | `class java.lang.String` | *The module name to change to* |

