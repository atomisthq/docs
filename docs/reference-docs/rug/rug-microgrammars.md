## Rug Microgrammars

Micro-grammars are *"partial grammars designed to extract checker-specific features only"* (see [this post by Adrian Colyer](https://blog.acolyer.org/2016/05/31/how-to-build-static-checking-systems-using-orders-of-magnitude-less-code/) for an introduction to the concept of Micro-grammars).

When there is no existing [Rug Language Extension](extensions/index.md) and pain file manipulation is too clumsy and random, the micro-grammar support in Rug provides an effective way of declaring a way to safely select and extract a portion of a file so that it can be inspected and manipulated by your Rugs.

> For more on micro-grammars we strongly recommend you check out this [post by Adrian Colyer](https://blog.acolyer.org/2016/05/31/how-to-build-static-checking-systems-using-orders-of-magnitude-less-code/).

***Please Note:*** Currently Rug micro-grammar support only works inside TypeScript rugs.

### A Rug micro-grammar in Action

The following code shows a micro-grammar being declared in a Rug TypeScript editor:

```typescript
class MicrogrammarSampleEditor implements ProjectEditor {
  name: string = "Constructed"
  description: string = "Demonstrates using a microgrammar"

  edit(project: Project) {
    let mg = new Microgrammar('modelVersion', `<modelVersion>$mv1</modelVersion`,
                { mv1 : '§[a-zA-Z0-9_\\.]+§' } )

    let eng: PathExpressionEngine = project.context().pathExpressionEngine().addType(mg)

    eng.with<TextTreeNode>(project, "/*[@name='pom.xml']/modelVersion()/mv1()", n => {

      if (n.value() != "4.0.0") project.fail("" + n.value())

      let msg = `The node is ${n}`

      n.update('Foo bar')
    })
  }
}
```

This code breaks down as follows:

- ***Lines 6 and 7*** - This is where the micro-grammar is declared. The micro-grammar is called `modelVersion` and we are looking for anywhere in the file that matches `<modelVersion>$mv1</modelVersion`, the `$mv1` is the micro-grammar's marker for the content we want to extract when the micro-grammar matches. Finally on Line 7 we are declaring the regular expression that declares what the structure of the `mv1` content should be.
- ***Line 9*** - Adds this new micro-grammar to this [Rug's path expression][path-expressions] engine so that it can be applied.
- ***Line 11*** - Applies a [Rug path expression][path-expressions] to the project, specifying that we are interested in any file in the project whose name begins with `pom.xml`.
- ***Line 11*** - Applies a [Rug path expression][path-expressions] to the project, specifying that we are interested in any file in the project whose name begins with `pom.xml`. Then your new `modelVersion` micro-grammar is applied to those files and the contents of the micro-grammar's `mv1` is made available and assigned to the variable `n`.
- ***Line 12*** - Inspecting the value of `n` the project editor is triggered to `fail` its editing if the value of `n` is not `4.0.0`.
- ***Line 15*** - The value of `n` as extracted using the micro-grammar, is embedded into a string message.
- ***Line 17*** - Finally the value of `n` is set to something new by calling the `update` method.

This little example hopefully demonstrates some of the real power of Rug micro-grammars.

With a Rug mirco-grammar you can select, inspect and replace a set of values identified within a context in a file elegantly and meaningfully without the need for a full [Rug Language Extension](extensions/index.md).

[path-expressions]: rug-path-expressions.md
