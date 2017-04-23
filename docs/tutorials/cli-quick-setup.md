This is the quick version of the Rug CLI setup on Mac OS X using Homebrew. If you use
a different operating system or run into issues, please see the full
[Rug CLI installation][cli-install] documentation.

[cli-install]: /user-guide/interfaces/cli/install/

### Install Rug CLI

```console
$ brew tap atomist/tap
$ brew install rug-cli
```

### Configure Rug CLI GitHub Access

If you have two-factor authentication configure on your GitHub account,
you will be prompted for your second factor code as `MFA code`.

```console
$ rug login
Resolving dependencies for atomist-rugs:atomist-tutorials (0.1.0·local) completed

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

### Configure Repositories

```console
$ rug configure repositories
Resolving dependencies for atomist-rugs:atomist-tutorials (0.1.0·local) completed
Configuring team-scoped repositories completed

→ Repositories
  global (public-rug-archives)
  └── https://atomist.jfrog.io/atomist/rugs-release
  t29e48p34 (atomist-community)
  └── https://atomist.jfrog.io/atomist/T29E48P34
  t489lv5qf (sfz)
  └── https://atomist.jfrog.io/atomist/T489LV5QF

Successfully configured team-scoped repositories
```

Now, your local CLI is configured and ready to publish Rug projects.
