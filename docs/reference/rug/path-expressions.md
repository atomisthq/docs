# Rug Tree Expression Version 0.1

## Introduction

Rug Tree Expressions are used to obtain tree nodes from structured
data, including:

-   Projects
-   Files (going into AST or other internal structure if understood)
-   Structured parameters, such as JSON or other file formats
-   The Atomist service model representing project data such as
    builds, commits and chat teams
-   Existing trees

All data sources are viewed as trees, and results are always tree
nodes.  All tree nodes have a *node type*, *name*, and *object type*.
Unlike XML elements, tree nodes also may have methods.  Rug tree
expressions add a rich set of *object types* from the underlying typed
model they traverse.  Types that are globally searchable
use [UpperCamelCase][ucc].  Private types, i.e., those only accessible
under a global type, use [lowerCamelCase][lcc].

[ucc]: http://wiki.c2.com/?UpperCamelCase
[lcc]: http://wiki.c2.com/?LowerCamelCase

The syntax is inspired by sources including [XPath 1.0][xpath] (the
primary influence) and [JSONPath][jsonpath] (which shows how the same
core ideas can be applied to non XML data structures).

[xpath]: https://en.wikipedia.org/wiki/XPath#Syntax_and_semantics_.28XPath_1.0.29
[jsonpath]: http://goessner.net/articles/JsonPath/index.html#e2)

A tree expression navigates a series of nodes and relationships in a
graph.  Each path element in a path element acts on results returned
by the previous path element.  Think of it as a "[flatMap][flatmap]"
operation on a collection in a functional language: it returns a new
collection.

[flatmap]: http://martinfowler.com/articles/collection-pipeline/flat-map.html

Beause of the close relationship to XPath, the remainder of this
document mirrors the organization of
the [XPath Version 1.0 specification][xpath-spec].
An [ANTLR grammar][antlr] for XPath 1.0 is available.

[xpath-spec]: https://www.w3.org/TR/xpath/
[antlr]: https://github.com/antlr/grammars-v4/blob/master/xpath/xpath.g4

## Location Paths

Rug Tree Expressions are location paths consisting of one or more
sequential **Location Steps**.  A location path is one or
more [location steps](#location-steps) separated by forward slashes,
(`/`).

All location paths should be absolute, i.e., begin with a forward
slash (`/`).  The actual root context for location paths
differs depending on where the path location is being used:

Rug | Root Context | Context Object Type
----|--------------|--------------------
Editor/Reviewer | Project | File
Executor | Service | Service
Handler | object passed to Handler | object passed to handler type

This is analogous to the root context of an XPath location path being
the root of the document it is acting on.

The context object type is the implicit object type that the initial
location step has.  For example, in an Editor the root context is a
Project and the context object type of the path step under the root
context is File, allowing one to traverse the project's file system
hierarchy from the project root using directory and file names as in
`/src/main/java` or `/LICENSE`.

### Location Steps

A location step has three parts:

-   an **axis**, which specifies the tree relationship between the nodes
    selected by the location step and the context node,
-   a **node test**, which specifies the node object type and name of
    the nodes selected by the location step, and
-   zero or more **predicates**, which use arbitrary expressions to
    further refine the set of nodes selected by the location step.

The syntax for a location step is the axis name and node test
separated by a double colon, followed by zero or more expressions each
in square brackets. For example, in `child::comment[position()=1]`,
`child` is the name of the axis, `comment` is the node test and
`[position()=1]` is a predicate.

The node-set selected by the location step is the node-set that
results from generating an initial node-set from the axis and
node-test, and then filtering that node-set by each of the predicates
in turn.

The initial node-set consists of the nodes having the relationship to
the context node specified by the axis, and having the node object
type and name specified by the node test.  For example, a location
step `raisedBy::GitHubUserID()` selects the GitHub user ID that has a
raisedBy relationship with the context node: `raisedBy`, the axis,
specifies the relationship with the context node; `GitHubUserID()`
specifies that each node in the initial node-set must be an object of
type `GitHubUserID`.  The available axes are described
in [Axes](#axes). The available node tests are described
in [Node Tests](#node-tests). The meaning of some node tests is
dependent on the axis.

The initial node-set is filtered by the first predicate to generate a
new node-set; this new node-set is then filtered using the second
predicate, and so on. The final node-set is the node-set selected by
the location step. The axis affects how the expression in each
predicate is evaluated and so the semantics of a predicate is defined
with respect to an axis. See [Predicates](#predicates).

### Axes

Axes define the relationship between a location step and the previous
location step, i.e., its node context.  Axes available in all contexts
are:

-   the `child` axis contains the children of the context node,
    which are all nodes with a direct relationship in the graph
    to the context node

-   the `property` axis contains the properties of the context node;
    the axis will be empty unless the context node is an object

-   the `self` axis contains just the context node itself

-   the `descendant` axis contains the descendants of the context
    node; a descendant is a child or a child of a child and so on;
    thus the descendant axis never contains property or namespace
    nodes

Certain object types have relationships with other object types.  Some
examples are shown in the table below.  When the previous step
contains the type in the left column, the axis in the middle column
can be used prior to a node test for the type in the right column.
This is not an exhaustive list of relationships in the model graph.

Context Object Type | Axis | Node-set Object Type
----------|------------------|-------------------
Build     | on               |  Repo
Commit    | on               |  Repo
Issue     | belongsTo        |  Repo
Push      | hasBuild         |  Build
Push      | contains         |  Commit
Push      | after            |  Commit
ChatId    | memberOf         |  ChatChannel
Issue     | resolvedBy       |  Commit
Commit    | author           |  GitHubId
Person    | hasChatIdentiy   |  SlackId
Person    | hasGithubIdentiy |  GitHubId
SlackTeam | hasChannel       |  Channel
Repo      | channel          |  Channel
SlackId   | memberOf         |  SlackTeam

### Node Tests

Every axis has a principal node type, which is different than the
node's object type.  The node type is directly analogous to XPath node
types.  If an axis can contain objects, then the principal node type
is object; otherwise, it is the type of the nodes that the axis can
contain.  Thus,

-   For the property axis, the principal node type is property.
-   For other axes, the principal node type is object.

A node test that is a `stuff`, called a node name test, will select
all object nodes with the name "stuff" of the principal node type.
For example, `child::src` will select the object node named "src" that
is a child of the context node.  Node name tests can only contain
alphanumeric, underscore (`_`), dash (`-`), period (`.`), asterisk
(`*`), and question mark (`?`) characters.  The asterisk and question
mark have the same special meaning they have in shell globbing
patterns, asterisk matches zero of more characters and question mark
matches any single character.  To select nodes with names having other
characters, use the `@name` attribute in a predicate, e.g.,
`/*[@name='cømPℓ€×']`.

A node test `*` is true for any node of the principal node type. For
example, `child::*` will select all object children of the context
node, and `property::*` will select all properties of the context
node.

A node test of the form `Kind()` will select all object nodes with
the object type "Kind", *effectively switching the default node object
type for the current and subsequent location steps to "Kind"*.  For
example, `belongsTo::Issue()` will select all object nodes of object
type "Issue" belonging to the context node.  Note that not all object
types are related to all other types.  In this example, if the context
node is a GitHub repository, a relationship exists.  If the context
node is a Slack channel, there is no direct relationship to type
Issue.

### Predicates

A predicate filters a node-set with respect to an axis to produce a
new node-set. For each node in the node-set to be filtered, the
PredicateExpr is evaluated with that node as the context node, with
the number of nodes in the node-set as the context size, and with the
proximity position of the node in the node-set with respect to the
axis as the context position; if PredicateExpr evaluates to true for
that node, the node is included in the new node-set; otherwise, it is
not included.

A predicate expression is evaluated by evaluating the expression and
converting the result to a boolean. If the result is a number, the
result will be converted to true if the number is equal to the context
position and will be converted to false otherwise; if the result is
not a number, then the result will be converted as if by a call to the
boolean function. Thus a location path `para[3]` is equivalent to
`para[position()=3]`.

Predicates are optional.  If no predicate is provided, no filtering is
done.

### Abbreviated Syntax

Here are some examples of location paths using abbreviated syntax:

Syntax | Description
-------|------------
`src` | selects the `src` object children of the context node
`*[@name='cømPℓ€×']` | selects the `cømPℓ€×` object children of the context node
`*` | selects all object children of the context node
`Person()` | selects all node children of object type `Person` of the context node and switches the context object type to `Person`
`@name` | selects the name property of the context node
`@*` | selects all the property of the context node
`Issue()[1]` | selects the first child of object type `Issue` of the context node
`//foo` | selects all `foo` descendants of the context node
`//*.py` | selects all descendants of the context node whose name ends in `.py`
`File()/src/main/resources//*.md` | selects all the files ending in `.md` under the `/src/main/resources` directory; if you are using this in an editor where `File()` is implicit, you do not need the leading `File()`
`Repo()/@name` | selects the names of all repositories
`Issue()[@state="open"]/belongsTo::Repo()[@name="rug-cli"]` | selects all open issues in the repository named "rug-cli"


## Expressions

### Basics

Expressions are used in predicates.  Expressions can be:

-   a number
-   a string
-   a boolean
-   a function call
-   logically `and`ed and `or`ed
-   grouped together by parentheses

Rug tree expressions do not support variables and variable references.

### Function Calls

A FunctionCall expression is evaluated by using the FunctionName to
identify a function in the expression evaluation context function
library, evaluating each of the Arguments, converting each argument to
the type required by the function, and finally calling the function,
passing it the converted arguments. It is an error if the number of
arguments is wrong or if an argument cannot be converted to the
required type. The result of the FunctionCall expression is the result
returned by the function.

An argument is converted to type string as if by calling the string
function. An argument is converted to type number as if by calling the
number function. An argument is converted to type boolean as if by
calling the boolean function. An argument that is not of type node-set
cannot be converted to a node-set.

### Node-sets

A location path can be used as an expression. The expression returns
the set of nodes selected by the path.

The `|` operator computes the union of its operands, which must be
node-sets.

Predicates are used to filter expressions in the same way that they
are used in location paths. It is an error if the expression to be
filtered does not evaluate to a node-set. The Predicate filters the
node-set with respect to the child axis.

### Booleans

An object of type boolean can have one of two values, true and false.

An `or` expression is evaluated by evaluating each operand and
converting its value to a boolean as if by a call to the boolean
function. The result is true if either value is true and false
otherwise. The right operand is not evaluated if the left operand
evaluates to true.

An `and` expression is evaluated by evaluating each operand and
converting its value to a boolean as if by a call to the boolean
function. The result is true if both values are true and false
otherwise. The right operand is not evaluated if the left operand
evaluates to false.

Equality operators, `=`, `!=`, `<=`, `<`, `>=`, and `>`, are only
supported for string and number types.  `=` and `!=` are supported on
boolean types.  Rug tree expressions do not support comparing
node-sets to each other or other types.

### Numbers

A number represents a positive integer number.

### Strings

Strings consist of a sequence of zero or more Unicode characters.

### Lexical Structure

When tokenizing, the longest possible token is always returned.

For readability, whitespace may be used in expressions even though not
explicitly allowed by the grammar

## Core Function Library

This section describes functions that Rug tree expression
implementations must always include in the function library that is
used to evaluate expressions.

Each function in the function library is specified using a function
prototype, which gives the return type, the name of the function, and
the type of the arguments. If an argument type is followed by a
question mark, then the argument is optional; otherwise, the argument
is required.

### Node Set Functions

**Function:** *number* **last()**

The last function returns a number equal to the context size from the
expression evaluation context.

**Function:** *number* **position()**

The position function returns a number equal to the context position
from the expression evaluation context.

**Function:** *number* **count(*node-set*)**

The count function returns the number of nodes in the argument
node-set.

**Function:** *string* **name(*node-set?*)**

The name function returns a string representing the name of the node
in the argument node-set that is first in document order.

### String Functions

**Function:** _string_ **string(_object?_)**

The string function converts an object to a string as follows:

-   A node-set is converted to a string by returning the string-value
    of the node in the node-set that is first in document order. If
    the node-set is empty, an empty string is returned.

-   A number is converted to a string as follows

    -   NaN is converted to the string NaN

    -   positive zero is converted to the string 0

    -   negative zero is converted to the string 0

    -   positive infinity is converted to the string Infinity

    -   negative infinity is converted to the string -Infinity

    -   a number is represented in decimal form as a Number with no
        decimal point and no leading zeros, preceded by a minus sign
        (-) if the number is negative

-   The boolean false value is converted to the string false. The
    boolean true value is converted to the string true.

-   An object of a type other than the four basic types is converted
    to a string in a way that is dependent on that type.

If the argument is omitted, it defaults to a node-set with the context
node as its only member.

**Function:** _string_ **concat(_string, string, string*_)**

The concat function returns the concatenation of its arguments.

**Function:** _boolean_ **starts-with(_string, string_)**

The starts-with function returns true if the first argument string
starts with the second argument string, and otherwise returns false.

**Function:** _boolean_ **contains(_string, string_)**

The contains function returns true if the first argument string
contains the second argument string, and otherwise returns false.

**Function:** _string_ **substring-before(_string, string_)**

The substring-before function returns the substring of the first
argument string that precedes the first occurrence of the second
argument string in the first argument string, or the empty string if
the first argument string does not contain the second argument
string. For example, substring-before("1999/04/01","/") returns 1999.

**Function:** _string_ **substring-after(_string, string_)**

The substring-after function returns the substring of the first
argument string that follows the first occurrence of the second
argument string in the first argument string, or the empty string if
the first argument string does not contain the second argument
string. For example, substring-after("1999/04/01","/") returns 04/01,
and substring-after("1999/04/01","19") returns 99/04/01.

**Function:** _string_ **substring(_string, number, number?_)**

The substring function returns the substring of the first argument
starting at the position specified in the second argument with length
specified in the third argument. For example, substring("12345",1,3)
returns "234". If the third argument is not specified, it returns the
substring starting at the position specified in the second argument
and continuing to the end of the string. For example,
substring("12345",1) returns "2345".

More precisely, each character in the string is considered to have a
numeric position: the position of the first character is 0, the
position of the second character is 1 and so on.

**NOTE:** This differs from XPath and is in line with Java and
ECMAScript, in which the String.substring method treats the position
of the first character as 0.

**Function:** _number_ **string-length(_string?_)**

The string-length returns the number of characters in the string. If
the argument is omitted, it defaults to the context node converted to
a string, in other words the string-value of the context node.

**Function:** _string_ **trim-space(_string?_)**

The normalize-space function returns the argument string with
whitespace normalized by stripping leading and trailing whitespace.

### Boolean Functions

**Function:** _boolean_ **boolean(_object_)**

The boolean function converts its argument to a boolean as follows:

-   a number is true if and only if it is neither positive or negative
    zero nor NaN
-   a node-set is true if and only if it is non-empty
-   a string is true if and only if its length is non-zero
-   an object of a type other than the four basic types is converted
    to a boolean in a way that is dependent on that type

**Function:** _boolean_ **not(_boolean_)**

The not function returns true if its argument is false, and false
otherwise.

**Function:** _boolean_ **true()**

The true function returns true.

**Function:** _boolean_ **false()**

The false function returns false.

### Number Functions

Function: number number(object?)

The number function converts its argument to a number as follows:

-   a string that consists of optional whitespace followed by an
    optional minus sign followed by a Number followed by whitespace is
    converted to the IEEE 754 number that is nearest (according to the
    IEEE 754 round-to-nearest rule) to the mathematical value
    represented by the string; any other string is converted to NaN

-   boolean true is converted to 1; boolean false is converted to 0

-   a node-set is first converted to a string as if by a call to the
    string function and then converted in the same way as a string
    argument

-   an object of a type other than the four basic types is converted
    to a number in a way that is dependent on that type

If the argument is omitted, it defaults to a node-set with the context
node as its only member.

### Object Function

Certain object types will provide functions that can be called on them
that are type dependent.  Those functions that return values that can
be converted to boolean values can be used.  The implementation of
each object type should document functions valid to use in Rug tree
expressions.  These functions can be called in predicates and must be
preceded with a dot (`.`).

## Data Model

Rug tree expressions operate on objects as a tree. This section
describes how Rug tree expressions model objects as a tree. This model is
conceptual only and does not mandate any particular
implementation.

The tree contains nodes.  Each node has a node type and an object
type.  The object types are extensible, but there are only three node
types:

-   root nodes
-   object nodes
-   property nodes

For every type of node, there is a way of determining a string-value
for a node of that type. For some types of node, the string-value is
part of the node; for other types of node, the string-value is
computed from the string-value of descendant nodes.

There is an ordering of nodes, dependent on the type of node.  File
nodes are lexically ordered, Issue nodes are ordered by issue number,
etc.  The property nodes of an object occur before the children of
the object.  The relative order of property nodes is
implementation-dependent.  Reverse object order is the reverse of
object order.

Root nodes and object nodes have an ordered list of child nodes.
Since Rug tree expressions navigate a graph of relationships, it is
possible to visit a node on the graph multiple times and therefore
receives the same objects at multiple depths.

### Root Node

The root node is the root of the tree. A root node does not occur
except as the root of the tree.  The type of a root node is dependent
on the context in which the tree expression is evaluated.

### Object Nodes

There is an object node for every object in the graph.

The children of an object node are the object nodes with a direct
relationship to it.

### Property Nodes

Each object node has an associated set of property nodes; the
object is the parent of each of these property nodes; however, an
property node is not a child of its parent object.

Objects never share property nodes: if one object node is not the
same node as another object node, then none of the property nodes of
the one object node will be the same node as the property nodes of
another object node.

All object nodes will have an property named `name` that provides
the name of the object node.

### Namespace Nodes

Namespaces are not supported.

### Processing Instruction Nodes

Processing instruction nodes are not supported.

### Comment Nodes

Comment nodes are not supported.

### Text Nodes

Text nodes are not supported.

## Conformance

No conformance information.

----

## Appendix

### Differences with XPath

Below is a brief summary of differences between Rug tree expressions
and XPath aimed at getting those who know XPath a fast track to using
Rug tree expressions.

-   Rug tree expressions distinguish between a node type, which are
    analogous to XPath node types (e.g., root, element, and
    attribute), and the node's object type, which map to the types of
    objects in the model being traversed (e.g., Project, File, Issue,
    and Repo).

-   Rug tree expressions have a different set of axis specifiers,
    eschewing ancestor-related axes, simplifying self/descendant axes,
    and introducing relationship axes between nodes in the graph.

-   String indices start with zero (0).

-   Rug tree expressions do not support comparison of node sets.

-   Tree nodes have an expanded set of type-specific functions that
    can be called in predicates.

-   Namespaces are not supported.

-   Processing instructions are not relevant.

### Legacy Content

#### Exposure in TypeScript

TreeNode hierarchy

#### Possible Futures

XPath things we may add in future
