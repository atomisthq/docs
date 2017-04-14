Rug path expressions, inspired by [XPath][xpath], provide a means to
navigate entities in Rug with high precision.  From selecting events
with highly-specific criteria to matching only certain `catch` blocks,
path expressions from a powerful and flexible way to select code and
events to operate on.

!!! tip "Path expressions everywhere"
	Path expressions are a core concept everywhere in Rug.  Their
    detailed semantics differ between project operations and handlers,
    but the fact that everything is addressable and navigable from any
    starting point is universally applicable.

[xpath]: https://www.w3.org/TR/xpath/

<!-- Everything is a tree, path expressions enable precise navigation
of trees of information. -->

## Surgical selections

When running a Rug against a `Project`, you can locate a file with a
known name with some code like the following line:

```typescript
project.findFile("mkdocs.yml").replace("<NAME>", project.name);
```

This approach provides a simple mechanism for finding a file within a
project if you know its path.  But what if you want to select a file
based on something other than its path?  What if you want to select
several files that all satisfy common criteria?  What if you want to
select just a part of a file?  To allow users to select elements with
such flexibility and specificity, Atomist provides a powerful tool
called *path expressions*.

### Query the file system

The above code selecting a file by path can be written as a path
expression.  First, we must import the `#!typescript
PathExpressionEngine`

```typescript
import { PathExpressionEngine } from "@atomist/rug/tree/PathExpression";
```

and fetch the `#!typescript PathExpressionEngine` from the
`#!typescript Project` context.

```typescript
let eng: PathExpressionEngine = project.context.pathExpressionEngine;
```

We then rewrite the `#!typescript findFile()` function call using the
`#!typescript PathExpressionEngine` method `#!typescript with()`,
supplying the appropriate path expression to select the file based on
name.

```typescript
eng.with<File>(project, "/*[@name='mkdocs.yml']", (f) => {
    f.replace("<NAME>", project.name);
})
```

The final argument of of the `#!typescript with()` method is a
function which receives as its argument all `#!typescript File`s that
satisfy the path expression, one at a time, and can then operate on
each match in turn.  Here we call the `#!typescript replace()` method
just as we did before.  For this simple case, using path expressions
may is a bit more involved, but it demonstrates the concepts well.

### Query the code

While querying a project for files using path expressions allows for
greater flexibility than the other means of navigating files in a
project, a more powerful way is to query the content of the target file
directly. This file is a YAML structure, we therefore use a
specific path expression engine that knows how to navigate this kind
of structure.

First the expected import statements:

```typescript
import * as yaml from "@atomist/rug/ast/yaml/Types";
import { YamlPathExpressionEngine } from "@atomist/rug/ast/yaml/YamlPathExpressionEngine";
```

Let's amend our previous example:

```typescript
let eng: PathExpressionEngine = new YamlPathExpressionEngine(project.context.pathExpressionEngine);

eng.with<yaml.YamlString>(project, "/*[@name='mkdocs.yml']/YamlFile()/*[@name='site_name']", (field) => {
    field.updateText(project.name);
})
```

First we create a specific YAML-aware path expression engine, this
will offer us appropriate methods to work on a YAML structure.  The
path expression we provide begins with the familiar file system query,
identifying a file named `mkdocs.yml`.  The next step in the path
expression, `YamlFile()` is something new.  The `YamlFile()` step
tells Rug to address the file(s) it has found using the preceding
criteria as not just a generic `#!typescript File`, but a more
specific `#!typescript YamlFile`.  The `#!typescript YamlFile` type
has the ability to enter into the YAML syntax tree, allowing you to
query and select individual elements of the YAML document.  Here,
`/*[@name='site_name']` tells Rug that we want fields named
`site_name` in the parsed YAML document.  Each such field in the YAML
document is passed to the function defined in the third argument to
`#!typescript with()`.  This function replaces the original value of
that field using the method `#!typescript
field.updateText(project.name())`, a method defined specifically on
the `yaml.YamlString` type.

## Trees Versus Graphs

While path expressions are core to Rug, there's an important
difference between path expressions against projects, which you
typically write in editors, and path expressions against the Atomist
Cortex (the overall model for your development team): *Project
structure is a tree, while the Cortex structure is a graph.*

### Project Trees

When you write a path expression against your projects, you are
naturally drilling _down_ into its structure. The structure is
naturally hierarchical. There will be no cycles and you'll eventually
end up with terminal nodes, that have no further relationships. There
is only a single path between the root node and any descendant. You
can assume in your code that all data in the tree will be available to
you as you continue to descend.

Consider the following path expression against a project:

```
//JavaFile()//catchClause//catchType[@value='Exception']
```

It drills into the AST of Java files to find every catch clause that
catches type `Exception`. Note that we use `//` to find all
descendants with the given name, so we can ignore the number of
intermediate steps in the Java language grammar. (However,
the [ANTLR grammar for Java][antlr-java] is a useful reference. The
production names we use such as `catchClause` are directly taken from
it.)

[antlr-java]: https://github.com/antlr/grammars-v4/blob/master/java8/Java8.g4 (ANTLR Grammar for Java 8)

The tree abstraction works seamlessly and intuitively across project
directory structure (which is itself a tree) and the ASTs of
structured files within projects. Catching `Exception` is usually bad
practice in production code. However, there may be times when we're
quite happy to do it in tests. Assuming our projects follow a
conventional Java project layout, we can easily modify this path
expression to match only production code, by prepending a directory
path:

```
/src/main/java//JavaFile()//catchClause//catchType[@value='Exception']
```

This will only drill into files in the `src/main/java` directory.

### Cortex Graph

When writing _handlers_, we are working with the Atomist Cortex model
of your team's development data. This is a *graph* rather than a
tree. Some key differences:

-   It's not strictly hierarchical
-   There may be cycles
-   The notion of a "terminal node" is less clear
-   There can be more than one path between two nodes. (Note that when
    we drill into a project we switch from a graph to a tree. Once in
    tree mode we can rely on tree semantics all the way down.)

With the more general graph model, the concept of _materialization_
becomes important. Unlike when working with project trees, we can no
longer assume that all data will be available if we keep
navigating. (This is impossible as without a guarantee of terminal
nodes, a graph's relationships may never terminate.)

Thus, with the Cortex model, path expressions have two functions:

1.  Limit what nodes match, just as in project trees
1.  Specify how deep graph materialization should be be. *We can
    assume that any node referenced in the query will be available
    whenever we have a match, meaning that we don't have to check for
    null or undefined in our TypeScript or JavaScript code.*
2.  Because we aren't working with a strict hierarchy, and because
    there can be multiple paths between nodes, the `//` _self or
    descendants_ axis tends to be less useful. Similarly, the notion
    of descending via `/` is less intuitive and relevant.

Thus we often choose to build path expressions using *query by
example*. This is an established technique for searching for data via
examples of data that should match.

```typescript
import * as cortex from "@atomist/cortex/stub/Types";
import * as query from '@atomist/rugs/util/tree/QueryByExample';

...

@EventHandler("name", "description",
    query.forRoot(
		new cortex.Build()
        .withStatus("passed")
        .withRepo(
            new cortex.Repo().withOwner("atomist")
        )
)
```

We first import the Cortex stubs. These implement Cortex interfaces
such as `Build` and `Repo`, and are used for query by example and
testing. Then we can instantiate a graph of example objects by using
no-arg constructors and fluent builder methods such as `withStatus`.

Then you can use the functions in the `QueryByExample` module from the
`rugs` node module. In this case, the `forRoot` function will
interrogate the object graph to create predicates reflecting the
relationships and simple properties. The generated path expression
will look as follows:

```
/Build()[@status='passed']
	[/repo::Repo()[@owner='atomist']]
```

Thus the example above is equivalent to:

```typescript
@EventHandler("name", "description",
    `/Build()[@status='passed']
		[/repo::Repo()[@owner='atomist']]`)

```

Query by example has the advantage of excellent tool support. Your
favorite editor will provide suggestions for potential paths and

## Best Practice: Reuse of Path Expression Components

Path expressions are inherently composable, whether in editors,
reviewer or handlers.

Whether using a path expression string style or query by example, it's
good practice to reuse predicates for subgraphs. Take our previous
query:

```typescript
query.forRoot(
		new cortex.Build()
        .withStatus("passed")
        .withRepo(
            new cortex.Repo()
            	.withOwner("atomist")
        );
```

This can be rewritten as follows, simply using TypeScript constructs:

```typescript
query.forRoot(
		new cortex.Build()
        .withStatus("passed")
        .withRepo(atomistRepo);

const atomistRepo = new cortex.Repo().withOwner("atomist");
```

Obviously the benefit is greater when path expressions are complex.

We can also use functions, rather than constants, to parameterize
commonly used subgraphs.

Such reuse is a convenient way of capturing commonly needed structures
for materialization as well as narrowing matches, eliminating
duplication and ensuring we have one place to keep them up to date.
