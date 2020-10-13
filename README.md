# Atomist documentation

This repository contains the markdown sources for the documentation
for [Atomist][atomist].  You can find the current version of the
Atomist documentation at [https://docs.atomist.com/][atomist-doc].

[atomist-doc]: https://docs.atomist.com/ (Atomist Documentation)

The documentation is generated from markdown using [MkDocs][mkdocs].

[mkdocs]: http://www.mkdocs.org/

## Editing

Much of the documentation is hand-generated, so you can feel free to
edit.

We use the [Google Developer Documentation Style Guide][doc-style] as
our guide and suggest the [Style guide highlights][style-highlights]
for a summary.

See [below][build-serve] for instructions on how to test your changes
locally.

*You are not required to test your changes locally in order to contribute.* Edit right on GitHub,
and let Atomist (our build automation) take care of it.

[doc-style]: https://developers.google.com/style/ (Google Developer Documentation Style Guide)
[style-highlights]: https://developers.google.com/style/highlights (Google Developer Documentation Style Guide Highlights)

## Contribution criteria

Pull requests will be merged if they are better than the existing
text. They don't need to be perfect.

Here's how I define better:

* Out-of-date information is the worst.
* Emptiness is better than inaccurate information.
* Any (accurate) information is better than none.

Additional links and information are great.

We will move toward a consistent style and tone after merging.

## Build and serve the documentation locally

[build-serve]: #build-and-serve-the-documentation-locally

Before you push changes to this repository, you may test your
changes locally.

### Instant Development environment

### Docker

You can build the docs with the following command.

```
$ docker run -it --rm -v "$PWD:/docs" squidfunk/mkdocs-material:5.3.3 build --strict
```

You can also run `htmltest`.

```
$ docker run -it --rm -v "$PWD:/test" wjdp/htmltest:v0.12.0 htmltest
```

You can serve the docs with the following command.

```
$ docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material:5.3.3
```

### VS Code

If you open this repository in VSCode, and you have Docker, and you
have the VSCode extension for remote containers, then VSCode will
offer to open the folder in a container. Accept that, and you'll have
a development environment with the right tools installed.

In the terminal inside VSCode, you can type

`serve` and then access your local, hot-reloading version of these docs on localhost:8000.

`build` will build the site and test the links.

You may now skip the rest of this section. Continue with [including code snippets from other repos][code-snippets]

## Styles

We use the [Admonition][admonition] extension to mkdocs.  Here are the available
admonition styles:

* summary tldr
* hint important tip
* check done success
* attention caution warning
* fail failure missing
* danger error
* bug
* default (i.e., none of the above)

Items on the same line create a visually equivalent admonition.

[admonition]: https://python-markdown.github.io/extensions/admonition/

<!-- to recreate the above image
!!! tldr "summary tldr"
    Test copy to check visual of **bold**, *italic*, `code style`, and [link style][ts]

!!! important "hint important tip"
    Test copy to check visual of **bold**, *italic*, `code style`, and [link style][ts]

!!! check "check done success"
    Test copy to check visual of **bold**, *italic*, `code style`, and [link style][ts]

!!! caution "attention caution warning"
    Test copy to check visual of **bold**, *italic*, `code style`, and [link style][ts]

!!! fail "fail failure missing"
    Test copy to check visual of **bold**, *italic*, `code style`, and [link style][ts]

!!! danger "danger error"
    Test copy to check visual of **bold**, *italic*, `code style`, and [link style][ts]

!!! bug "bug"
    Test copy to check visual of **bold**, *italic*, `code style`, and [link style][ts]

!!! default "default (anything other than the above)"
    Test copy to check visual of **bold**, *italic*, `code style`, and [link style][ts]

[ts]: https://www.typescriptlang.org/
-->

## Releasing

When a push is made to this repository, the documentation is built by
[atomist-web-sdm][] and published to
[https://docs.atomist.services/][docs-staging].

If the the staging deployment is approved, the site is "published" to
[https://docs.atomist.com/][atomist-doc].

[atomist-web-sdm]: https://github.com/atomist/atomist-web-sdm
[docs-staging]: https://docs.atomist.services/

### Updating dependencies

The `requirements.txt` file sets specific versions for the packages.
To update to new versions, you can use the following command:

```
$ ( cut -d = -f 1 requirements.txt > req.txt && \
      cat req.txt | xargs -n 1 pip install -U && \
      pip freeze -r req.txt > requirements.txt ) ; \
    rm req.txt
```

To update html-proofer and its dependencies:

```
$ bundle update
```

## Conditions of use

This documentation build process is provided to the public purely for
the purpose of testing documentation changes before submitting pull
requests to the appropriate Atomist repository.

The documents produced by this build process may be published only on
[https://docs.atomist.com/][atomist-doc].  They may not be published
in any other form or on any other website without explicit permission.

---

Created by [Atomist][atomist].
Need Help?  [Join our Slack workspace][slack].

[atomist]: https://atomist.com/ (Atomist - How Teams Deliver Software)
[slack]: https://join.atomist.com/ (Atomist Community Slack)
