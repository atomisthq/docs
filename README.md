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
edit.  We try to adhere to
the [Google Developer Documentation Style Guide][doc-style].
See [below][build-serve] for instructions on how to test your changes
locally.

*You are not required to test your changes locally in order to contribute.* Edit right on GitHub,
and let the build take care of it.

[doc-style]: https://developers.google.com/style/ (Google Developer Documentation Style Guide)

## Contribution criteria

Pull requests will be merged if they are better than the existing text. They don't need to be perfect.

Here's how I define better:

* Out-of-date information is the worst.
* Emptiness is better than inaccurate information.
* Placeholders are better than emptiness.
* Any (accurate) information is better than none.

Additional links and information is great.

We (jessitron) will move toward a consistent style and tone after merging.

## Content reuse

Sometimes it's desirable to have certain content repeated in a page or duplicated
across pages. This project uses a [markdown-include][markdown-include] plugin to
include content from files in the `docs/common` directory prior to conversion to
HTML. It uses the `{!filename!}` syntax, with all filenames relative to the
`docs/common` directory.

e.g. to include the content from `docs/common/handlers.md` into `user-guide/rug/commands.md`,
we simply add `{!handlers.md!}` to the desired location in `user-guide/rug/commands.md`.

[markdown-include]: https://github.com/cmacmackin/markdown-include

## Styles

We use the [Admonition][admonition] extension.  Here are the available
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

When a push is made to the master branch of this repository, the
entire documentation is built again via a [Travis][travis] job and
published to [GitHub Pages][gh].

[travis]: https://travis-ci.org/atomist/docs
[gh]: http://atomist.github.io/docs/

If the build is triggered by a tag of the form `M.N.P`, the site will
be pushed to the docs.atomist.com S3 bucket hosting
[https://docs.atomist.com/][atomist-doc].

[build-serve]: #build-and-serve-the-documentation-locally

## Build and serve the documentation locally

Before you push changes to this repository, you should test your
changes locally.

### Install dependencies

The project uses [MkDocs][mkdocs] to generate the static site
and [HTMLProofer][html-proofer] to validate the generated HTML.  Below
are instructions to install them in a non-obtrusive way.

[html-proofer]: https://github.com/gjtorikian/html-proofer

#### MkDocs

First [install Python 3][py-install] using [Homebrew][brew] on Mac OS X.

[py-install]: https://github.com/Homebrew/brew/blob/master/share/doc/homebrew/Homebrew-and-Python.md
[brew]: https://brew.sh/

```
$ brew install python3
```

or on GNU/Linux

```
$ sudo apt-get install python3.6
$ curl -O https://bootstrap.pypa.io/get-pip.py
$ sudo python3.6 get-pip.py
```

Then create a [virtual environment][venv] to host the dependencies:

[venv]: https://virtualenv.pypa.io/en/stable/

```
$ pip3 install virtualenv
$ mkdir ~/.venvs
$ echo "export PIP_REQUIRE_VIRTUALENV=true" >> ~/.bashrc
$ source ~/.bashrc
$ virtualenv -p python3.6 ~/.venvs/userdocs
```

With the virtual environment created, activate it in the current
terminal:

```
$ . ~/.venvs/userdocs/bin/activate
```

and install the dependencies into it:

```
$ pip install -r requirements.txt
```

#### HTMLProofer

The Atomist [docs-sdm](https://github.com/atomist/docs-sdm) will run Htmlproofer over
this repository to check the links. If you would like to test the links locally, you can
install htmlproofer as a global executable.

`sudo gem install html-proofer`

Then you can run: `./htmlproof.sh`

### Testing and serving

Every time you want to work on this repository, you need to activate
the Python virtualenv in your working terminal:

```
$ . ~/.venvs/userdocs/bin/activate
```

After making changes, you can test them by building the documentation
in strict mode and running HTMLProofer on the resulting site.

```
$ mkdocs build --strict && ./htmlproof.sh
```

To review your changes in a browser, you can serve the documentation
locally by running:

```
$ mkdocs serve
```

and browse the documentation at http://127.0.0.1:8000 .  To stop the
server, press `Ctrl-C` in the terminal.

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
