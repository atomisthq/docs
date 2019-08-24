Aspects are a way to visualize technology usage across an organization. These concerns can be captured from anything available in a Git repository, whether that's data about committer activity for content from the files themselves. For example, you could create aspects that capture the following:

* The different software dependencies your repositories are using
* The different ports exposed in your Dockerfiles
* The dates your repositories were last updated

All of the different variants are presented in a [sunburst chart](https://en.wikipedia.org/wiki/Pie_chart#Ring_chart,_sunburst_chart,_and_multilevel_pie_chart), so that you can identify an aspect's drift amongst all of your repositories.

In this example, we’ll create an aspect that inspects [the `engines` field](https://docs.npmjs.com/files/package.json#engines) within a Node.js' package.json file. We'll capture the different versions of `node` and `npm` required in our organization's Node repositories.

![Node Engine Sunburst](../img/node_engine_sunburst.png)

## Prerequisites

It would be very helpful to [follow the README for the org-visualizer repository](https://github.com/atomist-blogs/org-visualizer). Specifically, you'll want to have Postgres running and create the appropriate tables which Atomist needs.

## Foundations of an aspect

At its core, an aspect is generally comprised of two tasks:

1. An analysis of a repository, either through its Git data or through [code inspection](/developer/inspect/)
2. A snapshot of the data for storing that data's state, handled through [fingerprints](/developer/fingerprint/)

All of the heavy lifting of iterating through an organization's repositories and generating the sunburst chart are handled for you, so if you know how to parse the data you're interested in collecting, you're already halfway towards building an aspect!

When it comes to [constructing an `Aspect`](https://atomist.github.io/sdm-pack-fingerprints/modules/_lib_machine_aspect_.html), there are three important functions to define:

* `extract`: this function defines the entry point for the aspect, and handles the bulk of the analyzing and snapshoting logic
* `toDisplayableFingerprintName`: this represents the name of the "inner" ring in our sunburst chart; in our case, it's the name of the engine
* `toDisplayableFingerprint`: this represents the name of the "outer" ring in our sunburst chart; in our case, it's the version of the engine

## Defining the data format and aspect type

Before writing our aspect, it's important to understand how we will store the information we've found. We know that every engine has a `name` and a `version`, so let's define an interface with named keys, like this:

```typescript
export interface EngineData {
  name: string;
  version: string;
}
```

Furthermore, in order to avoid collisions with other Atomist aspects, we will define our aspect's type. This is also used to create unique fingerprints:

```typescript
export const NodeEngineType = "nodeEngine";
```

## Creating a fingerprint

Next, we'll create a fingerprint of our data. Aspects (and Atomist) rely on fingerprints to compare and updates changes made to the source repository. All that [an `FP` interface](https://atomist.github.io/sdm-pack-fingerprints/interfaces/_lib_machine_aspect_.fp.html) needs is some kind of data to store, and a sha to identify it. For our use case, we already know that we need to preserve an engine's name and version, so we can hash this combination without much effort.

A function to fingerprint our data might look like this:

```typescript
export function createEngineFingerprint(
  name: string,
  version: string,
): FP<EngineData> {
  const data = { name, version };
  return {
    type: NodeEngineType,
    name,
    abbreviation: "engines",
    version: "0.0.1",
    data,
    sha: sha256(JSON.stringify(data)),
  };
}
```

Here, we're fortunate in that the `name` and `version` have been extracted out of package.json and passed into this method (we'll show how to do this next). If your aspect is not parsing file contents--for example, if it's dealing with Git activity--you can define your own data structure to represent that information, like this:

```typescript
const gitLastCommitCommand = "git log -1 --format=%cd --date=short"
const r = await exec(gitLastCommitCommand, { cwd: (p as LocalProject).baseDir });
const data = { lastCommitTime: new Date(r.stdout.trim()).getTime() };
```

## Extracting relevant data

Now comes the main portion of our aspect: pulling out the `engine` data from our package.json files. To do this, we'll need to:

* Define our method signature
* Fetch a package.json file
* Parse the `engine` data
* Fingerprint the `name` and `version` keys

The method signature for every extract method takes the same shape:

```typescript
const funcName: ExtractFingerprint<EngineData> = async p => { ... }
```

[The `ExtractFingerprint` method](https://atomist.github.io/sdm-pack-fingerprints/modules/_lib_machine_aspect_.html#extractfingerprint) takes in our project, and returns an array of fingerprints (or `undefined` if nothing is found).

There's no special sauce necessary, as Atomist provides methods for all sorts of file detection and parsing ([there's a tutorial on code transforms](/developer/first-transform/) has more information on this). First, let's grab that package.json file:

```typescript
const file = await p.getFile("package.json");
if (file) {
  // do something
} else {
  return undefined
}
```

If we have a package.json file, we'll grab its contents and then parse it:

```typescript
const jsonData = JSON.parse(await file.getContent());
const engines = _.merge(jsonData.engines || {});
```

After that, we'll pass the `name` and `version` keys to the `createEngineFingerprint` function we defined above:

```typescript
const fingerprints: FP[] = [];

for (const [name, version] of Object.entries(engines)) {
  fingerprints.push(createEngineFingerprint(name, version as string));
}

return fingerprints;
```

That's it! In more complex situations, you may want to introduce some additional error handling if your desired keys aren't found in a package.json file, or if they're malformed. In this case, not every package.json even _has_ an `engine` key, so we will just return an empty array.

A full example of the function might look like this:

``` typescript
export const extractNodeEngine: ExtractFingerprint<EngineData> = async p => {
  const file = await p.getFile("package.json");

  if (file) {
    const jsonData = JSON.parse(await file.getContent());
    const engines = _.merge(jsonData.engines || {});

    const fingerprints: FP[] = [];

    for (const [name, version] of Object.entries(engines)) {
      fingerprints.push(createEngineFingerprint(name, version as string));
    }

    return fingerprints;
  } else {
    return undefined;
  }
};
```

## Exporting the aspect

With the above work

```typescript
/**
 * Find the engines defined in a package.json file
 * @constructor
 */
export const NodeEngine: Aspect<EngineData> = {
  name: NodeEngineType,
  displayName: "Node Engine",
  baseOnly: true,
  extract: extractNodeEngine,
  toDisplayableFingerprintName: name => name,
  toDisplayableFingerprint: fpi => {
    return fpi.data.version;
  },
};
```
