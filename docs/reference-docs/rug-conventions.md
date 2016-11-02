## Rug Conventions

The Rug DSL is evolving quickly and here we capture the current set of
best practices.  As Rug evolves, we will provide editors so you can
keep your rug archives up to date with ease.

### Editors

Editors names should use [PascalCase][pascal].

[pascal]: https://en.wikipedia.org/wiki/PascalCase

### Tags

You should tag all your Rugs.  Tags are applied to a Rug by using the
`@tag` annotation before the entity is declared.  The `@tag`
annotation takes a single, double-quoted argument that is the tag to
apply.

Try to use common, existing tags so it is easier for people to find
your creation.  Think before creating a new tag.  Does a tag that
provides what you need already exist?  What should the icon be for my
tag?

Current tags include those for languages, frameworks, and
technologies.  Some example tags are:

```
@tag "clojure"
@tag "java"
@tag "python"
@tag "scala"
@tag "apache"
@tag "docker"
@tag "git"
@tag "github"
@tag "travis-ci"
@tag "spring"
@tag "spring-boot"
@tag "spring-cloud"
@tag "flask"
@tag "cherrypy"
@tag "compojure-api"
@tag "documentation"
```

### Parameters

To declare parameters for your Rug, you use the `param` keyword
providing the parameter name followed by a colon (:) and a [regular
expression][regex].

```
param parameter_name: regex
```

Some things to remember when creating parameters:

-   The parameter name should use [snake_case][snake].
-   Fully [annotate][annotations] your parameter.
-   Use the provided annotation regular expressions when possible.

[regex]: https://docs.oracle.com/javase/tutorial/essential/regex/
[snake]: https://en.wikipedia.org/wiki/Snake_case
[annotations]: http://docs.atomist.com/reference-docs/rug-editors/#annotations
