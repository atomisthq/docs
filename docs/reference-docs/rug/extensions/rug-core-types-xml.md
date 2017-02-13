## Type: `Xml`

**XML file**

### `Xml` Operations

#### Operation: `addChildNode`

Add the specified content under the indicated xpath-selected node

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***xpath*** | `class java.lang.String` | *The XPath selector for the node to add the content under* |
| ***newNode*** | `class java.lang.String` | *The new node name to be added as a child* |
| ***nodeContent*** | `class java.lang.String` | *XML document to be added under the indicated node* |

#### Operation: `addOrReplaceNode`

Adds or replaces a node

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***parentNodeXPath*** | `class java.lang.String` | *The XPath selector for the parent node* |
| ***xPathOfNodeToReplace*** | `class java.lang.String` | *The XPath selector for the node to replace* |
| ***newNode*** | `class java.lang.String` | *The name of the node being placed* |
| ***nodeContent*** | `class java.lang.String` | *The content of the node being placed* |

#### Operation: `blockingProblem`

Report a severe, blocking problem

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***msg*** | `class java.lang.String` | *The message to be displayed* |
| ***arg1*** | `com.atomist.rug.runtime.rugdsl.FunctionInvocationContext<?>` | ** |

#### Operation: `contains`

Tests whether a node matching the given xpath expression is present

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***xpath*** | `class java.lang.String` | *The XPath to test against for the presence of a node* |

#### Operation: `content`

Return file content

##### Parameters

*None*

#### Operation: `deleteNode`

Deletes the specified node

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***xpath*** | `class java.lang.String` | *The XPath to the node to delete* |

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

#### Operation: `getTextContentFor`

Get the text content for a specific xpath expression

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***xpath*** | `class java.lang.String` | *The XPath to use to retrieve the test content* |

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

#### Operation: `setTextContentFor`

Set the text content for a specific xpath expression

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***xpath*** | `class java.lang.String` | *The XPath to use to set the test content* |
| ***newContent*** | `class java.lang.String` | *New text content for the XPath* |

#### Operation: `underPath`

Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***root*** | `class java.lang.String` | *The root path to begin searching from* |

