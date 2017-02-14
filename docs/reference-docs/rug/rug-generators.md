## Rug Generators

Rug generators are used to create new projects from an existing model
project.  Generators are created using the `generator` keyword.

When a generator creates a new project, it starts by copying all the
files in the project in which it resides, excluding the `.atomist`
directory, to the new project being created.

Typically Rug generators do not contain logic of their own, but invoke
a number of other editors in order to manipulate the files copied from
the generator project.

For example, here is a complete [Spring Rest Service][spring]
generator:

[spring]: https://github.com/atomist-rugs/spring-boot-rest-service

```rug
@tag "java"
@tag "spring"
@tag "spring-boot"
@description "Creates a new Spring Rest project"
generator NewSpringProject

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

This generator uses four editors. The parameters from these editors
propagate to the calling context--typically an interaction with a
user--except for `old_class` and `old_package` which are explicitly
set.

This modular approach enables multiple project generators to share
common functionality.
