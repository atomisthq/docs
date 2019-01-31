Path Expressions are a way to comprehend code from other code.
They provide an XPath-like navigation into the [abstract syntax tree][w-ast] (AST),
returning nodes that can be inspected and updated.

When you update the value of a node, the code is updated _in place_. The idea is to duplicate
the changes we as humans would make to the code.

Path expressions are implemented in the [tree-path][gh-tree-path] library.
Check the [syntax documentation](https://github.com/atomist/tree-path/blob/master/docs/PathExpressions.md) there.

[gh-tree-path]: https://github.com/atomist/tree-path (GitHub repository for tree-path)
[w-ast]: https://en.wikipedia.org/wiki/Abstract_syntax_tree (Wikipedia AST)
