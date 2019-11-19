# Atomist documentation

[![Build Status](https://travis-ci.org/atomist/docs.svg?branch=master)](https://travis-ci.org/atomist/docs)

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

If you open this repository in VSCode, and you have Docker, and you have the VSCode extension for remote containers,
then VSCode will offer to open the folder in a container. Accept that, and you'll have a development environment
with the right tools installed.

In the terminal inside VSCode, you can type

`serve` and then access your local, hot-reloading version of these docs on localhost:8000.

`build` will build the site and test the links.

You may now skip the rest of this section. Continue with [including code snippets from other repos][code-snippets]

### Working outside Docker

You may need or prefer to install the tools on your computer instead.

#### Install dependencies

The project uses [MkDocs][mkdocs] to generate the static site
and [htmltest][htmltest] to validate the generated HTML.  Below
are instructions to install them in a non-obtrusive way.

[htmltest]: https://github.com/wjdp/htmltest

#### MkDocs

First [install Python 3][py-install] using [Homebrew][brew] on Mac OS X.

[py-install]: https://github.com/Homebrew/brew/blob/master/share/doc/homebrew/Homebrew-and-Python.md
[brew]: https://brew.sh/

```
$ brew install python3 htmltest
```

or on Debian-based GNU/Linux distributions

```
$ sudo apt-get install python3-pip htmltest
```

Then create a [virtual environment][venv] to host the dependencies:

[venv]: https://virtualenv.pypa.io/en/stable/

```
$ pip3 install virtualenv
$ mkdir ~/.venvs
$ echo "export PIP_REQUIRE_VIRTUALENV=true" >> ~/.bashrc
$ source ~/.bashrc
$ virtualenv ~/.venvs/docs
```

With the virtual environment created, activate it in the current
terminal:

```
$ . ~/.venvs/docs/bin/activate
```

and install the dependencies into it:

```
$ pip install -r requirements.txt
```

#### Testing and serving

Every time you want to work on this repository, you need to activate
the Python virtualenv in your working terminal:

```
$ . ~/.venvs/docs/bin/activate
```

After making changes, you can test them by building the documentation
in strict mode.

```
$ mkdocs build --strict
```

The run `htmltest`.

```
$ htmltest -c .htmltest.yml site
```

To review your changes in a browser, you can serve the documentation
locally by running:

```
$ mkdocs serve
```

and browse the documentation at http://127.0.0.1:8000 .  To stop the
server, press `Ctrl-C` in the terminal.

## Code snippets

[code-snippets]: #code-snippets

You can create code snippets in the [atomist/samples][samples]
repo.  Demarcate a code snippet using the following comment

```typescript
// atomist:code-snippet:start=SNIPPET_NAME
CODE HERE
// atomist:code-snippet:end
```

replacing `SNIPPET_NAME` with a unique name for the snippet.

You can then include that snippet in the docs using the following HTML
comment in the Markdown source.

```html
<!-- atomist:code-snippet:start=SNIPPET_NAME -->
<!-- atomist:code-snippet:end -->
```

Then, when either this docs repo or the samples repo is updated, the
snippets will be updated in this docs repo.

[samples]: https://github.com/atomist/samples

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
the [docs-sdm][] and published to the S3 bucket
[docs-sdm.atomist.com][docs-sdm-s3] under a path starting with the
full commit SHA.

If the publication to the docs-sdm bucket is approved, the site is
"published" to the docs.atomist.com S3 bucket, making it available at
[https://docs.atomist.com/][atomist-doc].

[docs-sdm]: https://github.com/atomist/docs-sdm
[docs-sdm-s3]: http://docs-sdm.atomist.com.s3-website-us-west-2.amazonaws.com/

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

### Shortcut

The `activate_and_serve.sh` script activates the virtual environment
and builds, proofs, and serves the docs with a single command.

```shell
./activate_and_serve.sh
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
