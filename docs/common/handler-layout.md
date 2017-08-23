Below is the basic structure of any Rug project, except that our handlers live in
the `.atomist/handlers` directory:

```console
~/workspace/team-handlers
    ├── .atomist
    │   ├── .gitignore
    │   ├── handlers
    │   │   ├── command
    │   │   │   └── MergePR.ts
    │   │   └── event
    │   │   │   └── GitHubCommit.ts
    │   ├── package.json
    │   ├── tests
    │   └── tsconfig.json
    ├── CHANGELOG.md
    ├── .gitignore
    ├── LICENSE
    └── README.md
```

The remaining files and directors of this Rug follows the usual
[Rug project][projects] structure.

[projects]: /reference/rug/projects.md
