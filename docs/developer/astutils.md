Every programming language has a structure. The first part of compilation
breaks down the structure of the file into an abstract syntax tree (AST),
a data structure that represents the code in programming language concepts.

When you understand the structure of your programming language, you can use
this to find bits of code that you're looking for. With Atomist, you can also
update those bits of code without changing the rest of the file at all.

There are functions in [`astUtils`][apidoc-astutils] to help you access the AST.
For this, you'll need a parser for your language. Parsers for Java, TypeScript
(which can parse JavaScript), and Markdown are provided already. Creating a 
compatible parser
for another language is easy if an [ANTLR](https://github.com/antlr/antlr4) grammar already exists. More on that in 
our [@atomist/antlr](https://github.com/atomist/antlr) library.

The ASTs for most languages are deep and complicated. To access portions of the
tree in Atomist, you use [path expressions](pxe.md). They let you navigate into
the parts of the tree you care about, without worrying about stuff in the middle.

For instance, to find method invocations in Java, I can use the `Java9FileParser`, which is based on an existing [Java ANTLR grammar](https://github.com/antlr/grammars-v4/tree/master/java9). I can skip over everything between
the top-level `compilationUnit` and get at the name of the invoked method
with this path expression:

`/compilationUnit//methodInvocation_lfno_primary/identifier/Identifier`

(Caveat: this doesn't catch every method call. It's simplified for this example.)

See more details on path expression syntax in the [tree-path library docs](https://github.com/atomist/tree-path/blob/master/docs/PathExpressions.md).

[apidoc-astutils]: https://atomist.github.io/automation-client/modules/_lib_tree_ast_astutils_.html (API Doc for astUtils)

## finding code instances in a project

Given a parser and a path expression, you can find all matching code using [`astUtils.findMatches`][apidoc-findmatches].

This uses the path expression discussed above to find all the method names called
in all the Java files:

```typescript
    const matches = await astUtils.findMatches(project, Java9FileParser, "**/*.java",
        `/compilationUnit//methodInvocation_lfno_primary/identifier/Identifier`);
    
    const allMethodCallsEverywhere = matches.map(m => m.$value);
```

The matches returned are an array of [TreeNode][apidoc-treenode]. Check the `$value`
property for the string that matched. 

[apidoc-treenode]: https://atomist.github.io/tree-path/interfaces/_lib_treenode_.treenode.html (API Doc for TreeNode)

If you want information about the file that the code is in, try [`astUtils.findFileMatches`][api-findfilematches].

[api-findfilematches]: https://atomist.github.io/automation-client/modules/_lib_tree_ast_astutils_.html#findfilematches (API Doc for findFileMatches)
[apidoc-findmatches]: https://atomist.github.io/automation-client/modules/_lib_tree_ast_astutils_.html#findmatches (API Doc for findMatches)

## changing code in a project

If you want make updates in a [code transform](transform.md), then pass that 
updating action to [`astUtils.doWithAllMatches`][apidoc-dowithallmatches].
You can set the `$value` of a match to some new string.

For instance, this code will find only method calls to `oldBoringMethod` and
with change them to `newExcitingMethod`:

```typescript
    return project => astUtils.doWithAllMatches(project, Java9FileParser, "**/*.java",
        `/compilationUnit//methodInvocation_lfno_primary/identifier/Identifier[@value='oldBoringMethod']`,
        matchResult => {
            matchResult.$value = "newExcitingMethod";
        });
```

[apidoc-dowithallmatches]: https://atomist.github.io/automation-client/modules/_lib_tree_ast_astutils_.html#dowithallmatches (API Doc for doWithAllMatches)

## See also:
* the [Project API](project.md)
* do simpler manipulations of file content with [projectUtils](projectutils.md)
* get at the relevant parts of files with microgrammars and [parseUtils](parseutils.md)
