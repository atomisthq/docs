This page shows you how to start building your own development
automations using Atomist on your laptop, no connectivity required.
Use this to explore and test your automations.

In [local mode](local.md) You can create your own software delivery
machine, use it, and then customize it, all in the privacy of your
machine. Later, you can connect your SDM to the Atomist service, and
then it will work with your team's version control and chat.

An Atomist SDM can run any delivery process, and many other things
besides--but for exploration we have to start somewhere.  Let's
pretend your team operates several web services, you write them in
Java using Spring Boot, and you like build them with maven.  Since
this SDM is for your personal use on your laptop, "deployment" means
starting the service up locally.

We are going to create a new SDM project, build it, run it, and then
use it: we will create a new Spring web service, make commits to it,
and see it deployed.

You'll need [Git][git], [Node.js][node] (this comes with `npm`), and
the [Java JDK][jdk] installed.  Run the listed commands in a terminal
on Mac or Linux, or in Bash on Windows (git-bash, cygwin, or turn on
bash support).

[git]: https://git-scm.com/downloads  (Install Git)
[node]: https://nodejs.org/ (Node.js)
[jdk]: http://jdk.java.net/ (Java JDK)
[local]: developer/local.md (SDM Local Mode)

## Quick start

1.  Install the Atomist command-line utility.  We will use this to
    create a new SDM project and to start it up.  Using
    [Homebrew][brew] on macOS:

        brew install atomist-cli

    On other platforms, install [Node.js][node] and then run:

        npm install -g @atomist/cli

   !!! Note
   If you already have an SDM in your organization, you can skip step 2,
   and instead clone the repository containing your SDM.

2.  Create a local software delivery machine (SDM). This is going to
    create a new project in the Atomist projects directory (which
    defaults to `$HOME/atomist/projects`).

        atomist create sdm

    Select the default machine, `blank`.  When prompted for the name
    of the target repository, enter `quick-sdm`.  When prompted for a
    target owner, enter your username (on GitHub or anywhere).

    The output of this command includes the newly created file directory.

3.  Change into the newly created SDM project.

        cd $HOME/atomist/projects/<your username>/quick-sdm

4.  Start your local SDM.

        npm install
        atomist start --local

    The above command will install the project dependencies using npm,
    compile the TypeScript, and start your SDM. The first time you run this, depending on your
    network connection, it may take a minute or more. After that, it
    will take a few seconds.

    Leave this terminal window open. Logs will print to this screen.

6.  In another terminal, check what your SDM can do. This will print a list of commands supported by your running quick-sdm.

        atomist show skills

    A blank SDM knows only one intent now: `describe sdm <your username>/quick-sdm`

    Try that out by supplying it as a command to atomist: `atomist describe sdm <your username>/quick-sdm`

    You'll see a slew of information about your SDM, including the events and commands it responds to.

5.  (optional) Start up the SDM feed so you can see what the
    SDM is doing.

        atomist feed

    Leave this terminal window open. Messages will print here.
    In team mode, these messages would go to chat; in local mode,
    they print to this feed.

From here, you can go a few different ways.
If you want to add or test commands, you are set up. Pop over to
[Creating a command](commands.md#create-a-command) for further instructions.

## Hooking up repositories to your SDM

While running, your SDM will listen for commits to repositories. It can then set and run [goals](goal.md)
on those commits. These repositories need to be set up to notify the SDM on commit.

There are three ways to set these up:

* Have Atomist clone the repository. `atomist clone <owner>/<repo>` will put the repository in the expected
[directory structure][] and set up the git hooks.
* If your repositories are already in the expected [directory structure][], then `atomist add git hooks` will set up the git hooks.
* Have your SDM create the repository. If your SDM has a [project generator](create.md), then running that command
(usually `atomist create ...`) will put the new project in the right location with the right hooks. If not, you can
[make a generator](setting-up-generator.md) of your own.

[directory-structure]: local.md#directory-structure (Directory Structure)

Now you can do things like [make an autofix](autofix.md) that will check your code on each commit.
Look for output in the [feed](cli.md#atomist-feed).

[brew]: https://brew.sh/ (Homebrew - The missing package manager for macOS)
[node]: https://nodejs.org/ (Node.js)

When you're ready to put your SDM to work for your whole team,
continue with [setup][].

[setup]: ../user/index.md (Atomist Setup)
