# End-user documentation sources and generator

This repository will contain the markdown sources for our
end-users.

When a push is made to this repository, the entire documentation
is built again via a [Travis](https://travis-ci.com/atomisthq/end-user-documentation)
job whoich pushes the generated HTML files to
https://github.com/atomisthq/atomisthq.github.io and served by
github at http://atomisthq.github.io.

The documentation is generated from markdown using
[mkdocs](http://www.mkdocs.org/).


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
```

You can now serve the documentation locally by running:

```
$ mkdocs serve
```

