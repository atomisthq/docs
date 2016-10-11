## Rug Predicates

When writing test assertions or when specifying that a Rug editor should not be applied with a precondition it is often useful, and more readable, to be able to specify and even reuse this logic by defining a Rug Predicate.

A Rug Predicate is an expression that returns a `Boolean` `true` or `false` value.

### Rug Predicates in Test Assertions

The most common place that you will see a predicate being used in is a Rug Test `then` block as shown below:

```
...

then
  fileCount = 1
  and fileContains "src/main/java/Cat.java" "class Cat"
```

 In this example `fileCount = 1` is an ***in-place Rug Predicate*** interpreted to examine the output from the editor-under-test to then return a `Boolean` `true` or `false` value for the assertion.

 <!-- Include predicates as they are used in Reviewer syntax -->

### Rug Predicates in Editors

Predicates can also be used as preconditions to protect an editor from being executed against a project it should not be applied to as shown below:

```
editor AddHystrix

precondition IsSpringBoot
precondition IsMaven

... rest of editor syntax ...



```

> This sample is taken from a real-world editor in the [spring-boot-common-editors project](). TBD add in URL.

In this case the `precondition` expressions are naming the predicates that should be applied. But where are those custom predicates coming from...


### Predicates in `.rug` Files for Reuse

In the `editor` `precondition` example shown above the actual predicates themselves are expressed in their own `.rug` files. If you want to reuse a predicate then it *must* be declared separated in its own file. TYpically this is a `.rug` file located in the `.atomist/editors` directory in the [Rug Archive](rug-archive.md).

Similar to how the first editor in a `.rug` file must have the same name as the file, the `.rug` file that contains a predicate must have the same name as the declared predicate.

So the following sample, taken from [spring-boot-common-editors]() (TBD add in link), is declared in a `.atomist/editors/IsMaven.rug` file:

```
predicate IsMaven
  with pom
```
