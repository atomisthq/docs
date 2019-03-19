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

## Example: finding and changing code instances in a project

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

## Example: finding and reporting on Java annotation parameters

You can find interesting bits of code in the AST and report on them in a code inspection.
The [`findMatches`][apidoc-findmatches] method returns the matches for your [path expression](pxe.md).

[apidoc-findmatches]: https://atomist.github.io/automation-client/modules/_lib_tree_ast_astutils_.html#findmatches (API Doc for findMatches)

```typescript
const matches = await astUtils.findMatches<AnnotationAstNode>(
            p,
            Java9FileParser,
            "src/main/java/**/*Application.java", 
            `//annotation[//identifier[@value='SpringBootApplication']]`,
        );
```

`findMatches` has a type parameter, and you can use it to specify what you expect in the structure of the matches returned.
To find that structure, you can make a test ([example here][example-test]) and use the debugger. In this case, the Java annotation can come back with a few different structures, depending on its parameters. The type that was useful for this example is:

```typescript
interface AnnotationAstNode {
    normalAnnotation?: {
        elementValuePairList: TreeNode & {
            elementValuePairs: Array<{
                identifier: { Identifier: string },
                elementValue: MatchResult,
            }>,
        },
    };
    singleElementAnnotation?: {
        elementValue: TreeNode,
    };
}
```

Here, any object structure is also a `TreeNode`, which has a `$value` property containing the string value of the entire
node underneath. These objects also have properties for their sub-nodes. In fact, they have two properties for each sub-node,
just in case there are more than one of that name; add an 's' to the AST node name to get an array of values. This is where
`elementValuePairs` comes from.

Declaring this type makes it easier to use the matches. Here is the full code inspection, which puts the annotation's parameters into a [`ReviewComment`][apidoc-reviewcomment] (code is [here][example-inspection]):

[apidoc-reviewcomment]: https://atomist.github.io/automation-client/interfaces/_lib_operations_review_reviewresult_.reviewcomment.html (APIdoc for ReviewComment)

```typescript
async (p: Project) => {

        const matches = await astUtils.findMatches<AnnotationAstNode>(
            p,
            Java9FileParser,
            "src/main/java/**/*Application.java", `//annotation[//identifier[@value='${params.annotationName}']]`,
        );

        // Create a review comment with the contents of the parameters, or else "no parameters"
        const comments: ReviewComment[] = matches.map(m => {
            let detail;
            if (m.normalAnnotation) {
                // there are multiple parameters; stick the whole list in there
                detail = m.normalAnnotation.elementValuePairList.$value || "";
            } else if (m.singleElementAnnotation) {
                // there is one parameter; it defaults to be called 'value'
                detail = "value = " + m.singleElementAnnotation.elementValue.$value;
            } else {
                detail = "no parameters";
            }
            const c: ReviewComment = {
                detail,
                severity: "info",
                category: params.annotationName,
            };
            return c;
        });

        return { repoId: p.id, comments };
    };
```

For the various ways to add this code inspection to your SDM, check the [inspection page](inspect.md). (The sample code [registers a command][example-registration]).


[example-test]: https://github.com/jessitron/undeprecate-sdm/blob/master/test/annotationParameters/inspection.test.ts (An example of testing a code inspection)
[example-inspection]: https://github.com/jessitron/undeprecate-sdm/blob/master/lib/annotationParameters/inspection.ts (An example of a code inspection)
[example-registration]: https://github.com/jessitron/undeprecate-sdm/blob/38208f5fccdc2dbf6f0a17681405c14b6c7979ef/lib/machine/machine.ts#L50 (An example of a code inspection command registration)

## See also:
* the [Project API](project.md)
* do simpler manipulations of file content with [projectUtils](projectutils.md)
* get at the relevant parts of files with microgrammars and [parseUtils](parseutils.md)
