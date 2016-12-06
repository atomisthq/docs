## Rug Generators

There is a special kind of Rug Editor that is used to bootstrap an
entirely new project. This is the Rug Generator.

### Generators from Editors

A Rug Generator is simply a Rug Editor annotated with the `@generator`
annotation add.

It works with, and transfers over the the new project that it is being
used to generator, the content of the repo it is located in, excluding
the `.atomist` directly.

A single repo can contain multiple project generator editors.

Typically Rug Generators do not contain logic of their own, but invoke
a number of other editors in order to manipulate the files brought
across from outside the `.atomist` directory.

For example, here is a complete [Spring Rest Service][spring]
generator:

[spring]: https://github.com/atomist-project-templates/spring-rest-service

```
@tag "java"
@tag "spring"
@tag "spring-boot"
@description "Creates a new Spring Rest project"
@generator "Spring Rest"
editor NewSpringProject

# Pattern to replace in old class name.
old_class = "SpringRest"

# Root package of the old file
old_package = "com.atomist.springrest"

# Now we invoke generic editors that do the actual work
UpdateReadme
PomParameterizer
PackageMove
ClassRenamer

```

This generator uses four other editors. The parameters from these
editors propagate to the calling context--typically an interaction
with a user--except for `old_class` and `old_package` which are
explicitly set.

This modular approach enables multiple project generator editors to
share common functionality.

Project generator editors can also be used as regular editors and be
invoked by other editors.
