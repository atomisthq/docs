!!! note "Atomist discourages the use of templates"
    One of the guiding principles of Atomist is that editors and
    generators should originate from working projects and those
    projects should remain operational under their native tooling.
    Using templates undermines this principle.  Template are hard to
    test and it is easy to forget to keep them up to date.  We
    recommend transforming real project files over using templates
    hidden away under the `.atomist/templates` directory.

Rug Templates are files that contain parameterized content that can be
used by Rug [generators](generators.md)
and [editors](editors.md).  Templates are located in the
`.atomist/templates` directory.

Currently Rug supports using
both [Velocity](https://velocity.apache.org/)
and [Mustache](https://mustache.github.io/) styles of template.
Velocity templates must have a `.vm` extension.  Mustache templates
must have a `.mustache` extension.
