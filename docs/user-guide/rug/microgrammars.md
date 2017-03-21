microgrammars are *"partial grammars designed to extract checker-specific features only"*.

When there is no existing Rug [extension][extensions] and plain file manipulation is too clumsy and random, the microgrammar support in Rug provides an effective way of declaring a way to safely select and extract a portion of a file so that it can be inspected and manipulated by your Rugs.

[extensions]: extensions.md

!!! note ""
    For more on microgrammars we recommend you check out this [post by Adrian Colyer](https://blog.acolyer.org/2016/05/31/how-to-build-static-checking-systems-using-orders-of-magnitude-less-code/).

### A Rug microgrammar in action

The following code shows a microgrammar being declared in a Rug TypeScript editor:

```typescript linenums="1"
class MicrogrammarSampleEditor implements ProjectEditor {
  name: string = "MicrogrammarSampleEditor"
  description: string = "Demonstrates using a microgrammar"

  edit(project: Project) {
    let mg = new Microgrammar('modelVersion', `<modelVersion>$mv1</modelVersion`,
                { mv1 : '§[a-zA-Z0-9_\\.]+§' } )

    let eng: PathExpressionEngine = project.context().pathExpressionEngine().addType(mg)

    eng.with<TextTreeNode>(project, "/*[@name='pom.xml']/modelVersion()/mv1()", n => {

      if (n.value() != "4.0.0") project.fail("" + n.value())

      let msg = `The node is ${n}`

      n.update('4.0.1')
    })
  }
}
```

This code breaks down as follows:

- ***Lines 6 and 7*** - This is where the microgrammar is declared. The microgrammar is called `modelVersion` and we are looking for anywhere in the file that matches `<modelVersion>$mv1</modelVersion`. The `$mv1` is the microgrammar's marker for a submatcher, holding the content we want to extract when the microgrammar matches. Finally on Line 7 we are declaring the submatcher, associating it with a regular expression that declares what the structure of the `mv1` content should be. The § characters delineate a regular expression.
- ***Line 9*** - Adds this new microgrammar to this Rug's [path expression][path-expressions] engine so that it can be applied.
- ***Line 11*** - Applies a Rug [path expression][path-expressions] to the project, specifying that we are interested in any file in the project whose name begins with `pom.xml`. Then your new `modelVersion` microgrammar is applied to those files and the contents of the microgrammar's `mv1` is made available and assigned to the variable `n`.
- ***Line 13*** - Inspecting the value of `n` the project editor is triggered to `fail` its editing if the value of `n` is not `4.0.0`.
- ***Line 15*** - The value of `n` as extracted using the microgrammar, is embedded into a string message.
- ***Line 17*** - Finally the value of `n` is set to something new by calling the `update` method.

The result is: the modelVersion element's value is changed from 4.0.0 to 4.0.1 in the pom.xml file.

This little example hopefully demonstrates some of the real power of Rug microgrammars. You can copy a piece of the file you want to modify, pull the bits that matter to you out into submatchers, and then look at them or change them in the editor code. The parsing instruction looks like the content of the file, unlike regular expressions or any other parsing specification.

With a Rug microgrammar you can select, inspect and replace a set of values identified within a context in a file elegantly and meaningfully without the need for a full Rug [extension][extensions].

[path-expressions]: path-expressions.md
