Atomist Rugs are most often developed using [TypeScript][ts].  To
successfully complete the rest of the tutorials, you will need to have
several TypeScript-related tools installed locally on your system.

[ts]: https://www.typescriptlang.org/ (TypeScript)

## NPM

You will need the [Node.js package manager][npm], `npm`, installed on
your system to install the Rug TypeScript dependencies.  The easiest
way to install NPM is to install [Node.js][node], whose installation
includes NPM.  There are links to install Node.js right on its home
page.  You can install either the LTS or Current version.

[npm]: https://docs.npmjs.com/getting-started/what-is-npm (NPM)
[node]: https://nodejs.org/ (Node.js)

## TypeScript

Once you have NPM installed, you should install TypeScript
and [TSLint][tslint] with the following command.

```console
$ npm install --global tslint typescript
```

[tslint]: https://palantir.github.io/tslint/ (TSLint)

The `typescript` package will install the TypeScript compiler and
other tools.  TSLint, like linting programs for other languages,
provides and enforces a set of development best-practices to your
Rugs.

For a smooth development experience, we recommend you
use [Visual Studio Code][code] with the [TSLint plugin][plugin].

[code]: https://code.visualstudio.com/
[plugin]: https://marketplace.visualstudio.com/items?itemName=eg2.tslint
