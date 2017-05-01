# Atomist 'end-user-documentation'

[![Build Status](https://travis-ci.org/atomist/end-user-documentation.svg?branch=master)](https://travis-ci.org/atomist/end-user-documentation)
[![Slack Status](https://join.atomist.com/badge.svg)](https://join.atomist.com/)

This repository contains the markdown sources for the documentation
for [Atomist][atomist].  You can find the current version of the
Atomist documentation at [http://docs.atomist.com/][docs].

[atomist]: https://www.atomist.com/
[docs]: http://docs.atomist.com/

The documentation is generated from markdown using [mkdocs][].

[mkdocs]: http://www.mkdocs.org/

## Editing

Much of the documentation is hand-generated, so you can feel free to
edit.  See [below][build-serve] for instructions on how to test your
changes locally.

[build-serve]: #build-and-serve-the-documentation-locally

The exception is the
auto-generated [reference documentation](docs/reference/).  The aim is
for all of the reference documentation to be auto-generated.  At
present, the [Rug][rug] and [Rug CLI][cli] reference documentation are
auto-generated during their builds.  The Rug reference docs are
automatically published to http://apidocs.atomist.com.  The Rug CLI
documentation must be copied into this repo at
`docs/reference/rug-cli/index.md`.

[rug]: https://github.com/atomist/rug
[cli]: https://github.com/atomist/rug-cli

## Content Reuse

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
admonition styles.

![Admonition Classes](images/admonition-classes.png)

Below are the default styles.

![Admonition Classes](images/admonition-classes-default.png)

[admonition]: https://pythonhosted.org/Markdown/extensions/admonition.html

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

When a push is made to this repository, the entire documentation is
built again via a [Travis][travis] job and published to
http://atomist.github.io/end-user-documentation/ .

[travis]: https://travis-ci.com/atomisthq/end-user-documentation

If the build is triggered by a tag of the form `M.N.P` and that same
version is found in the [`VERSION`][version] file, the site will be
pushed to the [Atomist GitHub Pages][pages] repository and served by
GitHub at http://atomisthq.github.io and https://docs.atomist.com .

[version]: VERSION
[pages]: https://github.com/atomisthq/atomisthq.github.io

You can publish the docs to the GitHub Pages branch of this repository
manually from your local repository with the following command:

```
$ rm docs/CNAME && mkdocs gh-deploy && git checkout docs/CNAME
```

## Build and serve the documentation locally

Before you push changes to this repository, you should test your
changes locally.

### Install dependencies

First [install Python](https://github.com/Homebrew/brew/blob/master/share/doc/homebrew/Homebrew-and-Python.md)

```
$ brew install python3
```
or

```
$ sudo apt-get install python3
$ curl -O https://bootstrap.pypa.io/get-pip.py
$ sudo python3.5 get-pip.py
```

Then create a virtual environment to host the dependencies:

```
$ pip3 install virtualenv
$ mkdir ~/.venvs
$ echo "export PIP_REQUIRE_VIRTUALENV=true" >> ~/.bashrc
$ source ~/.bashrc
$ virtualenv -p `which python3` ~/.venvs/userdocs
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

Finally, install [HTMLProofer][html-proofer].

```
$ bundle install
```

[html-proofer]: https://github.com/gjtorikian/html-proofer

### Testing and Serving

Every time you want to work on this repository, you need to activate
the Python virtualenv in your working terminal:

```
$ . ~/.venvs/userdocs/bin/activate
```

After making changes, you can test them by building the documentation
in strict mode and running HTMLProofer on the resulting site.

```
$ mkdocs build --strict && \
    bundle exec htmlproofer ./site --alt-ignore '/.*\/atomist-logo-horiz-reversed.svg$/'
```

To review your changes in a browser, you can serve the documentation
locally by running:

```
$ mkdocs serve
```

and browse the documentation at http://127.0.0.1:8000 .  To stop the
server, press `Ctrl-C` in the terminal.

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
http://docs.atomist.com. They may not be published in any other form
or on any other website without explicit permission.
