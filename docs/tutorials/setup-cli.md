This is the quick version of the Rug CLI setup on Mac OS X using Homebrew. If you use
a different operating system or run into issues, please see the full
[Rug CLI installation][cli-install] documentation.

[cli-install]: /user-guide/interfaces/cli/install.md

### Install Rug CLI

```console
$ brew tap atomist/tap
$ brew install rug-cli
```

### Configure Rug CLI GitHub Access

Use the `rug login` command to set up your Rug CLI configuration for
access to GitHub.  Provide your GitHub login and password
when prompted.

```console
$ rug login
Resolving dependencies for com.atomist:rug (0.26.1·jar) completed

The Rug CLI needs your GitHub login to identify you.

The command will create a GitHub Personal Access Token with scope 'read:org'
which you can revoke any time on https://github.com/settings/tokens.  Your
password will not be displayed or stored.  Your sensitive information will not
be sent to Atomist; only to api.github.com.

  → Username : jrday
  → Password : **************

  Please provide a MFA code
  → MFA code : ******

Successfully logged in to GitHub and stored token in ~/.atomist/cli.yml
```

The Rug CLI will authenticate against GitHub and create
a [personal access token][pat] with "read:org" scope and store it so
it can determine what GitHub orgs you are in when configuring your
repositories (see below).

!!! fail "Do not enter a personal access token"
    GitHub requires that you authenticate with your password, not a
    personal access token, when creating a personal access token so be
    sure to provide your GitHub username and *password*.

If you have two-factor authentication configure on your GitHub account,
you will be prompted for your second factor code as a `MFA code`.

!!! danger "Atomist does not store your GitHub credentials"
    As the command output says, Atomist does not store your GitHub
    credentials.  They are used to authenticate against the GitHub API
    to create a properly scoped [personal access token][pat].

[pat]: https://github.com/settings/tokens (GitHub Personal Access Tokens)

### Configure Repositories

Run the `rug configure repositories` command so the Rug CLI can use
your GitHub authentication to configure all of your private Rug
archive repositories and enable them for publication with the
`publish` command.

```console
$ rug configure repositories
Resolving dependencies for com.atomist:rug (0.26.1·jar) completed
Configuring team-scoped repositories completed

→ Repositories
  t489lv5qf (sfz)
  └── https://atomist.jfrog.io/atomist/T489LV5QF

Successfully configured team-scoped repositories
```

Well done! Your local CLI is configured and ready to publish Rug projects.

Next, let's learn how to [Create A New Rug Project][cnrp].

[cnrp]: /tutorials/create-rug-project (Create A New Rug Project Tutorial)
