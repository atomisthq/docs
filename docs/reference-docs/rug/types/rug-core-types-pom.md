## Type: `Pom`

**POM XML file**

### `Pom` Operations

#### Operation: `addChildNode`

Add the specified content under the indicated xpath-selected node

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***xpath*** | `class java.lang.String` | *The XPath selector for the node to add the content under* |
| ***newNode*** | `class java.lang.String` | *The new node name to be added as a child* |
| ***nodeContent*** | `class java.lang.String` | *XML document to be added under the indicated node* |

#### Operation: `addOrReplaceBuildPlugin`

Adds or replaces a build plugin

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***groupId*** | `class java.lang.String` | *The value of the build plugin's groupId* |
| ***artifactId*** | `class java.lang.String` | *The value of the build plugin's artifactId* |
| ***pluginContent*** | `class java.lang.String` | *The XML content for the plugin* |

#### Operation: `addOrReplaceDependency`

Add or replace a dependency

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***groupId*** | `class java.lang.String` | *The value of the dependency's groupId* |
| ***artifactId*** | `class java.lang.String` | *The value of the dependency's artifactId* |

#### Operation: `addOrReplaceDependencyManagementDependency`

Adds or replaces a dependency management dependency

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***groupId*** | `class java.lang.String` | *The value of the dependency's groupId* |
| ***artifactId*** | `class java.lang.String` | *The value of the dependency's artifactId* |
| ***dependencyContent*** | `class java.lang.String` | *The XML content for the dependency* |

#### Operation: `addOrReplaceDependencyOfVersion`

Add or replace a dependency, providing version

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***groupId*** | `class java.lang.String` | *The value of the dependency's groupId* |
| ***artifactId*** | `class java.lang.String` | *The value of the dependency's artifactId* |
| ***newVersion*** | `class java.lang.String` | *The value of the dependency's version to be set* |

#### Operation: `addOrReplaceDependencyScope`

Add or replace a dependency's scope

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***groupId*** | `class java.lang.String` | *The value of the dependency's groupId* |
| ***artifactId*** | `class java.lang.String` | *The value of the dependency's artifactId* |
| ***newScope*** | `class java.lang.String` | *The new value of the dependency's scope to be set* |

#### Operation: `addOrReplaceDependencyVersion`

Add or replace a dependency's version

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***groupId*** | `class java.lang.String` | *The value of dependency's groupId* |
| ***artifactId*** | `class java.lang.String` | *The value of the dependency's artifactId* |
| ***newVersion*** | `class java.lang.String` | *The value of the dependency's version to be set* |

#### Operation: `addOrReplaceNode`

Adds or replaces a node

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***parentNodeXPath*** | `class java.lang.String` | *The XPath selector for the parent node* |
| ***xPathOfNodeToReplace*** | `class java.lang.String` | *The XPath selector for the node to replace* |
| ***newNode*** | `class java.lang.String` | *The name of the node being placed* |
| ***nodeContent*** | `class java.lang.String` | *The content of the node being placed* |

#### Operation: `addOrReplaceProperty`

Add or replace a property

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***propertyName*** | `class java.lang.String` | *The name of the property being set* |
| ***propertyValue*** | `class java.lang.String` | *The value of the property being set* |

#### Operation: `artifactId`

Return the content of the artifactId element

##### Parameters

*None*

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

#### Operation: `dependencyScope`

Return the value of a dependency's scope as specified by artifactId

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***groupId*** | `class java.lang.String` | *The groupId of the dependency you are looking to inspect* |
| ***artifactId*** | `class java.lang.String` | *The artifactId of the dependency you are looking to inspect* |

#### Operation: `dependencyVersion`

Return the value of a dependency's version as specified by artifactId

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***groupId*** | `class java.lang.String` | *The groupId of the dependency you are looking to inspect* |
| ***artifactId*** | `class java.lang.String` | *The artifactId of the dependency you are looking to inspect* |

#### Operation: `description`

Return the content of the description element

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

#### Operation: `getTextContentFor`

Get the text content for a specific xpath expression

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***xpath*** | `class java.lang.String` | *The XPath to use to retrieve the test content* |

#### Operation: `groupId`

Return the content of the groupId element

##### Parameters

*None*

#### Operation: `isBuildPluginPresent`

Return whether a build plugin is present as specified by artifactId and groupId

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***groupId*** | `class java.lang.String` | *The groupId of the build plugin you are looking to test the presence of* |
| ***artifactId*** | `class java.lang.String` | *The artifactId of the build plugin you are looking to test the presence of* |

#### Operation: `isDependencyManagementDependencyPresent`

Return whether a dependency management dependency is present as specified by artifactId and groupId

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***groupId*** | `class java.lang.String` | *The groupId of the dependency management dependency you are looking to test the presence of* |
| ***artifactId*** | `class java.lang.String` | *The artifactId of the dependency management dependency you are looking to test the presence of* |

#### Operation: `isDependencyPresent`

Return whether a dependency is present as specified by artifactId and groupId

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***groupId*** | `class java.lang.String` | *The groupId of the dependency you are looking to test the presence of* |
| ***artifactId*** | `class java.lang.String` | *The artifactId of the dependency you are looking to test the presence of* |

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

Return the content of the name element

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

#### Operation: `packaging`

Return the content of the packaging element

##### Parameters

*None*

#### Operation: `parentArtifactId`

Return the content of the parent artifactId

##### Parameters

*None*

#### Operation: `parentGroupId`

Return the content of the parent groupId

##### Parameters

*None*

#### Operation: `parentVersion`

Return the content of the parent version

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

#### Operation: `property`

Return the value of a project property

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***projectPropertyName*** | `class java.lang.String` | *The project property you are looking to inspect* |

#### Operation: `removeDependency`

Removes a dependency

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***groupId*** | `class java.lang.String` | *The value of the dependency's groupId* |
| ***artifactId*** | `class java.lang.String` | *The value of the dependency's artifactId* |

#### Operation: `removeDependencyScope`

Remove a dependency's scope

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***groupId*** | `class java.lang.String` | *The value of the dependency's groupId* |
| ***artifactId*** | `class java.lang.String` | *The value of the dependency's artifactId* |

#### Operation: `removeDependencyVersion`

Remove a dependency's version

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***groupId*** | `class java.lang.String` | *The value of the dependency's groupId* |
| ***artifactId*** | `class java.lang.String` | *The value of the dependency's artifactId* |

#### Operation: `removeProperty`

Remove a property

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***propertyName*** | `class java.lang.String` | *The name of the project property being deleted* |

#### Operation: `replaceParent`

Set the content of the parent block

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newParentBlock*** | `class java.lang.String` | *The parent block that you are trying to set* |

#### Operation: `setArtifactId`

Set the content of the artifactId element

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newArtifactId*** | `class java.lang.String` | *The artifactId that you are trying to set* |

#### Operation: `setDescription`

Set the content of the description element

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newDescription*** | `class java.lang.String` | *The description that you are trying to set* |

#### Operation: `setGroupId`

Set the content of the groupId element

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newGroupId*** | `class java.lang.String` | *The groupId that you are trying to set* |

#### Operation: `setPackaging`

Set the content of the packaging element

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newPackaging*** | `class java.lang.String` | *The packaging that you are trying to set* |

#### Operation: `setParentArtifactId`

Set the content of the parent artifactId element

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newParentArtifactId*** | `class java.lang.String` | *The parent artifactId that you are trying to set* |

#### Operation: `setParentGroupId`

Set the content of the parent groupId element

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newParentGroupId*** | `class java.lang.String` | *The parent groupId that you are trying to set* |

#### Operation: `setParentVersion`

Set the content of the parent version element

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newParentVersion*** | `class java.lang.String` | *The parent version that you are trying to set* |

#### Operation: `setProjectName`

Add or replace project name

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newName*** | `class java.lang.String` | *The name being set* |

#### Operation: `setTextContentFor`

Set the text content for a specific xpath expression

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***xpath*** | `class java.lang.String` | *The XPath to use to set the test content* |
| ***newContent*** | `class java.lang.String` | *New text content for the XPath* |

#### Operation: `setVersion`

Set the content of the version element

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***newVersion*** | `class java.lang.String` | *The version that you are trying to set* |

#### Operation: `underPath`

Does this path begin with the given pattern? Pattern should contain slashes but not begin with a /

##### Parameters

| Name        | Type           | Description  |
| ------------|:---------------|:-------------|
| ***root*** | `class java.lang.String` | *The root path to begin searching from* |

#### Operation: `version`

Return the content of the version element

##### Parameters

*None*

