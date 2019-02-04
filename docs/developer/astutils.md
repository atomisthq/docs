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

## finding and changing code instances in a project

Given a parser and a path expression, you can find all matching code using [`astUtils.matchIterator`][apidoc-matchiterator].

This uses the path expression discussed above to find all the method names called
in all the Java files:

```typescript
       const matchIterable = await astUtils.matchIterator(project, {
            parseWith: Java9FileParser,
            globPatterns: "**/*.java",
            pathExpression: `/compilationUnit//methodInvocation_lfno_primary/identifier/Identifier`,
        });

        const words: { [k: string]: number } = {};
        for await (const m of matchIterable) {
            console.log("Found a call to " + m.$value + "\nChanging it to foo!");
            // you can change it! 
            m.$value="foo";
        }
```

You get an AsyncIterable of [MatchResult][apidoc-matchresult]s. Use the `for await(...of...)` syntax to access each match result. Check the `$value`
property for the string that matched. Update the $value property to change that string
in the file, when you are writing a [code transform](transform.md).

If you want information about the file that the code is in, try [`astUtils.fileHitIterator`][api-filehititerator].

[api-filehititerator]: https://atomist.github.io/automation-client/modules/_lib_tree_ast_astutils_.html#filehititerator (API Doc for fileHitIterator)
[apidoc-matchresult]: https://atomist.github.io/automation-client/interfaces/_lib_tree_ast_filehits_.matchresult.html (API Doc for MatchResult)
[apidoc-matchiterator]: https://atomist.github.io/automation-client/modules/_lib_tree_ast_astutils_.html#matchiterator (API Doc for matchIterator)


## See also:
* the [Project API](project.md)
* do simpler manipulations of file content with [projectUtils](projectutils.md)
* get at the relevant parts of files with microgrammars and [parseUtils](parseutils.md)
