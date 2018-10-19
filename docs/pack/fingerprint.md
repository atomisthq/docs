
In _team mode only_, the SDM can take and react to **fingerprints**.

Fingerprints are data computed against a push. Think of them as
snapshots. Typically they reflect the state of the repository's source
code after the push; they can also take into account other
characteristics of the commit. Fingerprinting is valuable because:

1.  *It enables us to assess the impact of a particular commit,
    through providing a semantic diff*. For example, did the commit
    change dependencies? Did it change some particularly sensitive
    files that necessitate closer than usual review?
2.  *It enables us to understand the evolution of a code base over
    time.* Atomist persists fingerprints, so we can trace over time
    anything we fingerprint, and report against it. For example, what
    is happening to code quality metrics over time?

Atomist extension packs include some out of the box fingerprints, such as Maven and
`npm` dependency fingerprints. 

This page describes how to:
*   Create a custom fingerprint
*   Look at your fingerprints in GraphQL
*   Report on a fingerprint
*   React to changes in a fingerprint

## Create a fingerprint

But it's easy to write your
own. Fingerprint registrations are like other listener registrations,
specifying a name and `PushTest`. The following example is the
complete code for fingerprinting dependencies specified in a
`package-lock.json` file:

```typescript
export class PackageLockFingerprinter implements FingerprinterRegistration {

    public readonly name = "PackageLockFingerprinter";

    // optional; defaults to running on any push
    public readonly pushTest: PushTest = IsNode;

    public async action(cri: PushImpactListenerInvocation): Promise<FingerprinterResult> {
        const lockFile = await cri.project.getFile("package-lock.json");
        if (!lockFile) {
            return [];
        }
        try {
            const content = await lockFile.getContent();
            const json = JSON.parse(content);
            const deps = json.dependencies;
            const dstr = JSON.stringify(deps);
            return {
                name: "dependencies",
                abbreviation: "deps",
                version: "0.1",
                sha: computeShaOf(dstr),
                data: json,
            };
        } catch (err) {
            logger.warn("Unable to compute package-lock.json fingerprint: %s", err.message);
            return [];
        }
    }
}
```

Fingerprinters can be added to an SDM as follows:

```typescript
fingerprint.with(new PackageLockFingerprinter());
```

Fingerprinting will only occur if `fingerprint` is a  `Fingerprint` [goal][] and it is included when
[goals are set][set-goals].

When the fingerprint goal executes, it will send the fingerprint to Atomist, where it will be attached to the commit in the graph,
available to the API for Software.

[goal]: goal.md#Fingerprint (Goals: Fingerprint)
[set-goals]: set-goals.md (Setting Goals)

## Query a fingerprint

Verify that your fingerprint worked by finding it in GraphQL.

In the Atomist [dashboard][] (at [https://app.atomist.com]()), once you are logged in, click on the GraphQL icon. Here's a query:

``` graphql
query Fingerprint {
  Commit(sha: "efbf90778  your sha goes here  f1b1e7bc6") {
    fingerprints {
      name
      sha
    }
  }
}
```

After the SDM is running with the new fingerprint registered, and a push is made, then substitute the 40-character git SHA of the last pushed commit
for the string in the above query.

If it worked, the response should include something like this:

```json
  "data": {
    "Commit": [
      {
        "fingerprints": [
          {
            "name": "YourFingerprintName",
            "sha": "efbf90778cb6403ccef71ee5e89ef13f1b1e7bc6"
          }
        ]
      }
    ]
  },
```

Here, the `sha` field contains whatever you put in the `sha` field of your fingerprint result. The data of the fingerprint is not stored in the graph.

[dashboard]: ../user/dashboard.md (About the Atomist Dashboard)

## Report on fingerprints

{!tbd.md!}

## React to changes

{!tbd.md!}
