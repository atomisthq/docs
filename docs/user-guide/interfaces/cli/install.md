You can install the Rug command-line interface (CLI) using the
standard developer packaging tools for your platform.  We currently
support installing the Rug CLI on GNU/Linux Deb and RPM distributions,
Mac OS X/macOS using [Homebrew][brew], and MS Windows
using [Chocolatey][choco].

[brew]: http://brew.sh/
[choco]: https://chocolatey.org/

### Install the Rug CLI on Mac OS X / macOS

The easiest way to get start on a Mac is to install the Rug CLI using
our [Homebrew][brew] [tap][] repository.

[tap]: https://github.com/Homebrew/homebrew/tree/master/share/doc/homebrew#readme

Once you have Homebrew installed, it is just two easy steps:

```console
$ brew tap atomist/tap
$ brew install rug-cli
```

If you'd like to stay on the latest, possible unstable and un-released, version of the CLI you can install HEAD from:

```console
$ brew upgrade --HEAD rug-cli --fetch-HEAD
```

### Install the RUG CLI on Linux

We support installing via packages on Debian and RPM-based GNU/Linux
distributions.

#### Debian/Ubuntu

To install on a Debian-based distributions, follow the next instructions:

1.  Grab the public GPG key for the repository:

    ```console
    $ wget -qO - 'https://atomist.jfrog.io/atomist/api/gpg/key/public' | sudo apt-key add -
    ```
2.  Add a new apt source entry:

    ```console
    $ echo "deb https://atomist.jfrog.io/atomist/debian $(lsb_release -c -s) main" | sudo tee /etc/apt/sources.list.d/atomist.list
    ```
3.  Update the metadata:

    ```console
    $ sudo apt-get update
    ```
4.  Install the CLI:

    ```console
    $ sudo apt-get install rug-cli
    ```

!!! tip "JDK 8 Requirement"
    Rug and the CLI require Java 8. Until Rug CLI 0.22, the package would try
    to automatically install the appropriate JDK but different people install Java
    differently on their machine. Therefore, starting with Rug CLI 0.22, the package
    only suggests to install the dependency and emits the following message when
    running the CLI without a proper Java 8 found:

    ```console
    $ rug
    JAVA_HOME not set and cannot find javac to deduce location, please set JAVA_HOME.
    ```

    In that case, you must ensure you set the `JAVA_HOME` variable for your system
    so that it points to a valid Java 8 JDK directory. On recent, Debian/Ubuntu
    distributions, you can simply run `sudo apt-get install openjdk-8-jdk`. On older
    distributions, either install Java 8 manually and set the according variable,
    or try the following instructions:

    ```console
    $ sudo add-apt-repository ppa:openjdk-r/ppa
    $ sudo apt-get update
    $ sudo apt-get install openjdk-8-jdk
    ```

#### RedHat/CentOS

To install on a RedHat-based distributions, follow the next instructions:

1.  Add a new yum repository:

    ```console
    $ cat <<EOF | sudo tee /etc/yum.repos.d/atomist.repo
    [Atomist]
    name=Atomist
    baseurl=https://atomist.jfrog.io/atomist/yum/
    enabled=1
    gpgcheck=0
    EOF
    ```

2.  Install the CLI:

    ```console
    $ sudo yum install rug-cli
    ```

The only required dependency is the JDK version 8 or later.

### Install the RUG CLI on Windows

We used [Nuget][nuget] and [Chocolatey][choco] to package and
distribute the CLI on Windows systems (actually wherever .NET and
Powershell run).

[nuget]: https://www.nuget.org/

The following steps have been tested on Windows 10, your mileage may vary.

1.  Install Chocolatey on your host as per
    the [doc](https://chocolatey.org/install)

2.  Install the [jdk8](https://chocolatey.org/packages/jdk8)
    dependency using chocolatey as an Administrator:
    ```console
    (admin) C:\ > choco install jdk8
    ```

3.  Then, install the CLI using Chocolatey as an administrator:

    ```console
    (admin) C:\ > choco install rug-cli -s "'https://atomist.jfrog.io/atomist/api/nuget/nuget'"
    ```

    The CLI will be installed in
    `%programdata%\Chocolatey\lib\rug-cli` and available to your
    `%PATH%`. You can now run as a normal user:

    ```console
    (user) C:\ > rug --version
    rug 0.13.0
    atomist/rug-cli.git (git revision 2cde8f5: last commit 2016-12-01)
    ```

    Notice, you will find the `.atomist` directory for settings and
    artifacts in `%USERPROFILE%\.atomist`

You can keep your Rug CLI up to dat by regularly upgrading:

```console
(admin) C:\ > choco upgrade rug-cli -s "'https://atomist.jfrog.io/atomist/api/nuget/nuget'"
```

You can remove the Rug CLI if you no longer want it installed:

```console
(admin) C:\ > choco uninstall rug-cli
```

Files and directories in `%USERPROFILE%\.atomist` will not be
removed. You can safely delete that directory manually if you don't
intend to use the CLI any longer.

### Docker installation

If you cannot install using a system-wide approach, you can rely also on
downloading the CLI through a Docker image we provide.

```console
$ docker pull atomist-docker.jfrog.io/rug-cli
```

Running the image as will give you the Rug shell:

```console
$ docker run --rm -it atomist-docker.jfrog.io/rug-cli
Resolving dependencies for com.atomist:rug:0.12.0 completed
Initializing shell for com.atomist:rug:0.12.0 completed
Press 'Tab' to complete. Type 'help' and hit 'Return' for help, and 'exit' to quit.
rug →
```

If you want to run the CLI, the image expects you to call `rug` as its first
argument. For instance:

```console
$ docker run --rm -it atomist-docker.jfrog.io/rug-cli rug --version
rug 0.23.0
https://github.com/atomist/rug-cli.git (git revision e77cf5f; last commit 2017-02-14)
```

Notice how the CLI stores its settings **inside the container** under
`/home/atomist/.atomist/cli.yml`. All the dependencies will be downloaded into
the `/home/atomist/.atomist/repository` directory.

You can persist those on your host by providing the following argument to the
docker run command: `-v $HOME/.atomist:/home/atomist/.atomist`.

To use the CLI against a project on your host, you will also need to share your
project's directory with the container `/home/atomist/project` container's
working directory. For example, assuming you are currently in a Rug project:

```console
$ docker run --rm -it \
    --user $UID:`id -g` \
    -v $HOME/.atomist:/home/atomist/.atomist \
    -v $PWD:/home/atomist/project \
    atomist-docker.jfrog.io/rug-cli \
    rug
```

The constraint here is the limit imposed by the management of permissions
between your host's user and the user defined in the container.

In the container, the CLI is not run as `root` but as a regular user that
hopefully does not map any UID on your system. A possible workaround is
to switch to a different user at runtime, hence the rather ugly command line
above. Another approach is to switch to [user namespace][dockerun] on your host.

[dockerun]: https://success.docker.com/KBase/Introduction_to_User_Namespaces_in_Docker_Engine

### Manual installation

If you are not on a supported platform, or just prefer to install the
Rug CLI yourself, you can download the Rug CLI archive, unpack it, and
simply put it its `bin` directory in your `PATH`.

0.  Make sure you have Java 8 or later installed.  Run the following
    command in a terminal and make sure you get an output something
    like that shown.

    ```console
    $ java -version
    java version "1.8.0_66"
    Java(TM) SE Runtime Environment (build 1.8.0_66-b17)
    Java HotSpot(TM) 64-Bit Server VM (build 25.66-b17, mixed mode)
    ```

    If that command is unsuccessful, see [Installing Java][java]
    or [Installing OpenJDK][openjdk].

1.  Download either the `.tar.gz` or `.zip` archive from the
    [latest Rug CLI release][latest].

2.  Unpack the archive in an appropriate location.  Replace `VERSION`
    with the version you downloaded.

    ```console
    $ mkdir $HOME/opt
    $ cd $HOME/opt
    $ tar -x -z -f rug-cli-VERSION-bin.tar.gz
    $ ln -s rug-cli-VERSION rug-cli
    ```

    or

    ```console
    $ mkdir $HOME/opt
    $ cd $HOME/opt
    $ unzip rug-cli-VERSION-bin.zip
    $ ln -s rug-cli-VERSION rug-cli
    ```

    On MS Windows, download the `.zip` and double-click it to extract
    its contents.

3.  Add the Rug CLI `bin` directory to your `PATH`.

    ```console
    $ export PATH=$PATH:$HOME/opt/rug-cli/bin
    ```

    Add the above command to your shell startup script to ensure you
    always will have access to the Rug CLI.  On MS Windows,
    see [How to Edit Your System Path][winpath], adding the `bin`
    directory of the archive you unpacked in the previous step.

[java]: https://www.java.com/en/download/help/download_options.xml
[openjdk]: http://openjdk.java.net/install/
[latest]: https://github.com/atomist/rug-cli/releases/latest
[winpath]: http://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
