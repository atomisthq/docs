!!! caution "The Rug DSL is deprecated"
    The primary supported language for developing Rugs is now TypeScript.

Rug is intentionally limited, aiming for readability and focus rather
than general-purpose effectiveness. However, it makes it easy to
escape to JavaScript at any time to perform more complex
tasks. Currently there are two places where you can escape into
JavaScript:

* JavaScript Expressions
* JavaScript Blocks

### Escaping into JavaScript Expressions

Anywhere an expression value is required, curly braces can be used to
enclose a JavaScript statement or statements. As in Scala, the last
statement in the expression will be used as the value of the
expression. In the following example, the value of the JavaScript
statement is passed to the `setContent` method on the `file` type.

```
with File f when name = "thing.txt"
  do setContent { f.content() + "\nAppend stuff" }
```

Where a return value isn't required--for example, when a JavaScript
block manipulates the currently scoped variable--the special `eval`
function can be used, as follows:

```rug
with File f when name = "thing.txt"
  do eval { f.setContent(f.content() + "\nAppend stuff") }
```

JavaScript expressions are also commonly used in predicates, like
this:

```rug
with File f when { f.name().toLowerCase().contains("xyz") }
  do eval { f.setContent(f.content() + "\nAppend stuff") }
```

A JavaScript expression block has a context that is automatically
propagated by Rug. This includes:

* All parameters to the Rug script. These can be accessed by name or via the `params` map.
* All computed parameters.
* The current context object, which is accessed via the alias declared in the `with` statement (`f` in the example above.)
* The parent of the current context, accessible via the `parent` method on the context object.

JavaScript execution is performed using Java Nashorn, with the Rug
runtime creating a synthetic function to enclose the block.

> All invocations on context objects must use
> parentheses or a reference error will occur.

In the case of multiple statements, a `return` statement should be
used for the last expression:

```javascript
do myFunction {
   var x = "y"
   var y = x
   return y;
}
```

Finally a JavaScript expression can be used to compute a Rug computed
value, like this:


```rug
editor Test

param name: ^.*$

lowerized = { name.toLowerCase() }
```
