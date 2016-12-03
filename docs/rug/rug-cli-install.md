## Rug CLI Installation

You can install the Rug command-line interface (CLI) using the
standard developer packaging tools for your platform.  We currently
support installing the Rug CLI on GNU/Linux Deb and RPM distributions,
Mac OS X/macOS using [Homebrew][brew], and MS Windows
using [Chocolatey][choco].

Once you have it installed, continue with the [Rug CLI Quick Start](http://docs.atomist.com/quick-starts/rug-cli/).

[brew]: http://brew.sh/
[choco]: https://chocolatey.org/

### Install the Rug CLI on Mac OS X / macOS

The easiest way to get start on a Mac is to install the Rug CLI using
our [Homebrew][brew] [tap][] repository.

[tap]: https://github.com/Homebrew/homebrew/tree/master/share/doc/homebrew#readme

Once you have Homebrew installed, it is just two easy steps:

```
$ brew tap atomist/tap
$ brew install rug-cli
```

### Install the RUG CLI on Linux

We support installing via packages on Debian- and RPM-based GNU/Linux
distributions.

#### Debian/Ubuntu

To install on a Debian-based distributions, follow the next instructions:

1.  Grab the public GPG key for the repository:

        $ wget -qO - 'https://atomist.jfrog.io/atomist/api/gpg/key/public' | sudo apt-key add -

2.  Add a new apt source entry:

        $ echo "deb https://atomist.jfrog.io/atomist/debian $(lsb_release -c -s) main" | sudo tee /etc/apt/sources.list.d/atomist.list

3.  Update the metadata:

        $ sudo apt-get update

4.  Install the CLI:

        $ sudo apt-get install rug-cli

The only required dependency is the OpenJDK version 8 or later.

#### RedHat/CentOS

To install on a RedHat-based distributions, follow the next instructions:

1.  Add a new yum repository:

        $ cat <<EOF | sudo tee /etc/yum.repos.d/atomist.repo
        [Atomist]
        name=Atomist
        baseurl=https://atomist.jfrog.io/atomist/yum/
        enabled=1
        gpgcheck=0
        EOF

2.  Install the CLI:

        $ sudo yum install rug-cli

The only required dependency is the JDK version 8 or later.

### Install the RUG CLI on Windows

We used [Nuget][nuget] and [Chocolatey][choco] to package and
distribute the CLI on Windows systems (actually wherever .NET and
Powershell run).

[nuget]: https://docs.nuget.org/

The following steps have been tested on Windows 10, your mileage may vary.

1.  Install Chocolatey on your host as per
    the [doc](https://chocolatey.org/install)

2.  Install the [jdk8](https://chocolatey.org/packages/jdk8)
    dependency using chocolatey as an Administrator:

        (admin) C:\ > choco install jdk8

3.  Then, install the CLI using Chocolatey as an administrator:

        (admin) C:\ > choco install rug-cli -s "'https://atomist.jfrog.io/atomist/api/nuget/nuget'"

    The CLI will be installed in
    `%programdata%\Chocolatey\lib\rug-cli` and available to your
    `%PATH%`. You can now run as a normal user:

        (user) C:\ > rug --version
        rug 0.13.0
        atomist/rug-cli.git (git revision 2cde8f5: last commit 2016-12-01)

    Notice, you will find the `.atomist` directory for settings and
    artifacts in `%USERPROFILE%\.atomist`

You can keep your Rug CLI up to dat by regularly upgrading:

```
(admin) C:\ > choco upgrade rug-cli -s "'https://atomist.jfrog.io/atomist/api/nuget/nuget'"
```

You can remove the Rug CLI if you no longer want it installed:

```
(admin) C:\ > choco uninstall rug-cli
```

Files and directories in `%USERPROFILE%\.atomist` will not be
removed. You can safely delete that directory manually if you don't
intend to use the CLI any longer.

### Manual installation

If you are not on a supported platform, or just prefer to install the
Rug CLI yourself, you can download the Rug CLI archive, unpack it, and
simply put it its `bin` directory in your `PATH`.

0.  Make sure you have Java 8 or later installed.  Run the following
    command in a terminal and make sure you get an output something
    like that shown.

        $ java -version
        java version "1.8.0_66"
        Java(TM) SE Runtime Environment (build 1.8.0_66-b17)
        Java HotSpot(TM) 64-Bit Server VM (build 25.66-b17, mixed mode)

    If that command is unsuccessful, see [Installing Java][java]
    or [Installing OpenJDK][openjdk].

1.  Download either the `.tar.gz` or `.zip` archive from the
    latest [Rug CLI release][releases].

2.  Unpack the archive in an appropriate location.  Replace `VERSION`
    with the version you downloaded.

        $ mkdir $HOME/opt
        $ cd $HOME/opt
        $ tar -x -z -f rug-cli-VERSION-bin.tar.gz
        $ ln -s rug-cli-VERSION rug-cli

    or

        $ mkdir $HOME/opt
        $ cd $HOME/opt
        $ unzip rug-cli-VERSION-bin.zip
        $ ln -s rug-cli-VERSION rug-cli

    On MS Windows, download the `.zip` and double-click it to extract
    its contents.

3.  Add the Rug CLI `bin` directory to your `PATH`.

        $ export PATH=$PATH:$HOME/opt/rug-cli/bin

    Add the above command to your shell startup script to ensure you
    always will have access to the Rug CLI.  On MS Windows,
    see [How to Edit Your System Path][winpath], adding the `bin`
    directory of the archive you unpacked in the previous step.

[java]: https://java.com/en/download/help/index_installing.xml?os=All+Platforms&j=8&n=20
[openjdk]: http://openjdk.java.net/install/
[releases]: https://github.com/atomist/rug-cli/releases
[winpath]: http://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
