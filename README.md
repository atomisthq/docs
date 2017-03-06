# End-user documentation sources and generator

[![Build Status](https://travis-ci.org/atomist/end-user-documentation.svg?branch=master)](https://travis-ci.org/atomist/end-user-documentation)
[![Slack Status](https://join.atomist.com/badge.svg)](https://join.atomist.com/)

This repository contains the markdown sources for the documentation
for Atomist.  You can find the current version of the Atomist
documentation at [http://docs.atomist.com/](http://docs.atomist.com/).

The documentation is generated from markdown using [mkdocs][].

[mkdocs]: http://www.mkdocs.org/

## Editing

Much of the documentation is hand-generated, so you can feel free to
edit.

The exception is the
auto-generated [reference documentation](docs/reference/).
the [Rug repository][rug].  At present, only the Rug extension
documents are auto-generated during the [rug][] build.  After the
running tests using `npm-release` profile, the generated documentation
will be under `target/.atomist/node_modules/@atomist/rug/typedoc`.
You can then copy these files to `docs/reference/rug/extensions`.

[rug]: https://github.com/atomist/rug

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

If the build is triggered by a tag of the form `M.N.P`, the site will
be pushed to the [Atomist GitHub Pages][pages] repository and served
by GitHub at http://atomisthq.github.io and https://docs.atomist.com .

[pages]: https://github.com/atomisthq/atomisthq.github.io

## Build and serve the documentation locally

Generally speaking, you probably do not need to do anything
with this repository aside from pushing markdown content.

However, if you want to make a change to the HTML template
or serve the doc locally before a push, you should follow the
next steps to gear up properly your environment.

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

Every time you want to work on this repository,
you shall activate that virtualenv in your terminal:

```
$ source ~/.venvs/userdocs/bin/activate
```

Now that the virtual environment is created, we can
install the dependencies into it:

```
$ pip install -r requirements.txt
$ ( cd rug_pygments && python setup.py install )
```

You can now serve the documentation locally by running:

```
$ mkdocs serve
```

If all goes well, you can browse the documentation at
http://127.0.0.1:8000 .

You can publish the docs manually from your local repository with the
following command:

```
$ rm docs/CNAME && mkdocs gh-deploy && git checkout docs/CNAME
```

## Conditions of use

This documentation build process is provided to the public purely for
the purpose of testing documentation changes before submitting pull
requests to the appropriate Atomist repository.

The documents produced by this build process may be published only on
http://docs.atomist.com. They may not be published in any other form
or on any other website without explicit permission.
