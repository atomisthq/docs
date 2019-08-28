Get started on your laptop with [org-visualizer][]:
an open-source tool that lets you run analysis on repositories and then display visualizations of how different they are.
Analyze repositories on your computer, or ones from GitHub. Then define your own aspects to answer your own questions about
all that source code.

The org-visualizer is one example of an Atomist Software Delivery Machine (SDM). For the many other things you can do with one of these, check the [tutorials](developer/tutorials.md).

You'll need Node, npm, git, Postgres, and the Atomist CLI.

## Install the Atomist Command-Line Interface

!!! note "Note"
    You’ll need Git and Node.js (this comes with npm) installed.

```
$ npm install -g @atomist/cli
```

or on a Mac, if you prefer [Homebrew][brew]:

```
$ brew install atomist-cli
```

Now you have the `atomist` command installed, which can start up SDMs and trigger commands in them.

[brew]: https://brew.sh/ (Homebrew)

## Clone the org-visualizer

Clone the [org-visualizer][] project, or fork it and clone that.

[org-visualizer]: https://github.com/atomist/org-visualizer (Org Visualizer on GitHub)

## Set up the database

In local mode, the org-visualizer stores the data it collects about repositories in Postgres.

See [the org-visualizer README](https://github.com/atomist/org-visualizer/#database-setup) for instructions
on setting up a database.

### Start up the Software Delivery Machine

Change into the directory where org-visualizer ws cloned. Then run:

```
$ atomist start --local
```

Running `atomist start` will install (`npm install`) if you haven't already.
Then it will build the project and run it.

### Perform analysis on code repositories

Send your org-visualizer a command to start an analysis. The Atomist CLI transmits commands to it.
Do one of these from any command line:

* Find a local directory containing some repositories you want to investigate. Copy its location. Then run: `atomist analyze local repositories`

* Find a GitHub organization (or user) you'd like to investigate. Then run: `atomist analyze github organization`

Your org-visualizer will clone the repositories from GitHub (or just look at the local ones), evaluate their aspects,
and then save the results in Postgres.

### See the local web interface

Visit http://localhost:2866/ to experience the local org-visualizer interface. Investigate individual projects
or aspects across projects.

(If you were looking for something more professional, well, we built [the Atomist web app][web-app] for you.)

[web-app]: https://app.atomist.com (Atomist Web App)

## Next steps

Add your own aspects to your version of org-visualizer! Use this [tutorial](developer/aspects.md).
<!-- TODO: put a link to the aspect-creation tutorial here -->

Try the [Atomist app](https://app.atomist.com) to see up-to-date information about your organization's repositories.

Find many things you can do with an SDM in the
[Developer Guide][developer-guide].

[developer-guide]: developer/index.md (Atomist Developer Guide)
[setup]: user/index.md (Atomist Setup)
[create-project]: https://app.atomist.com/workspace/project/project (Project Creation)
