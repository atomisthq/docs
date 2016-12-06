## Rug Predicates

When writing test assertions or when specifying that a Rug editor
should not be applied with a precondition it is often useful, and more
readable, to be able to specify and even reuse this logic by defining
a Rug Predicate.

A Rug Predicate is an expression that returns a `Boolean` `true` or
`false` value.

### A Simple Rug Predicate based on a [Rug Type][types] being supported

The simplest form of predicate is one that uses Rug to ask if the
project supports the assertions of a
particular [Rug Type][types]. Every [Rug Type][types] is packaged with
a statement that declares whether it can be applied to a given project
(usually in the form of detecting if certain files are present or
not), and the following example piggy-backs on that:

[types]: types/index.md

```
predicate IsMaven
  with pom
```

In this case the predicate simple states that it will only return true
for projects that the [POM Rug Type](types/rug-core-types-pom.md)
supports.

### Flexible Rug Predicates based Javascript

If you need more power then a you can declare a Rug Predicate that
begins by selecting the project itself and then can execute Javascript
logic to indicate whether the predicate should pass:

```
@description "Only work on projects that do not have a .atomist directory already"
predicate IsNotRugArchive
  with project p
    when { ! p.directoryExists(".atomist") }
```

> ***NOTE:*** This sample is taken from the
> existing
> [Rug Archive project](https://github.com/atomist-project-templates/rug-archive).

### Rug Predicates in Rug Test Assertions

The most common place that you will see a predicate being used in is a
Rug Test `then` block as shown below:

```
...

then
  fileCount = 1
  and fileContains "src/main/java/Cat.java" "class Cat"
```

In this example `fileCount = 1` is an ***in-place Rug Predicate***
interpreted to examine the output from the editor-under-test to then
return a `Boolean` `true` or `false` value for the assertion.

 <!-- Include predicates as they are used in Reviewer syntax -->

### Rug Predicates as Preconditions in Editors

Predicates can also be used as preconditions to protect an editor from
being executed against a project it should not be applied to as shown
below:

```
editor AddHystrix

precondition IsSpringBoot
precondition IsMaven

... rest of editor syntax ...

```

> ***NOTE:*** This sample is taken from a real-world editor in
> the [spring-boot-editors project][boot-editors].

[boot-editors]: https://github.com/atomist-rugs/spring-boot-editors

In this case the `precondition` expressions are naming the predicates
that should be applied. But where are those custom predicates coming
from...


### Predicates in `.rug` Files for Reuse

In the `editor` `precondition` example shown above the actual
predicates themselves are expressed in their own `.rug` files. If you
want to reuse a predicate then it *must* be declared separated in its
own file. TYpically this is a `.rug` file located in the
`.atomist/editors` directory in
the [Rug Archive](/rug/rug-archive.md).

Similar to how the first editor in a `.rug` file must have the same
name as the file, the `.rug` file that contains a predicate must have
the same name as the declared predicate.

So the following sample, taken from [spring-boot-editors][is-maven],
is declared in a `.atomist/editors/IsMaven.rug` file:

```
predicate IsMaven
  with pom
```

[is-maven]: https://github.com/atomist-rugs/spring-boot-editors/blob/master/.atomist/editors/IsMaven.rug
