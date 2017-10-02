One of the differentiating characteristics of Atomist automations is that they're easily testable, following normal development best practice.

Atomist automations can be tested using normal `node` best practice. Our [automation samples project](https://github.com/atomist/automation-client-samples-ts) provides examples.

## Setting up Tests
You can use any `node` test framework you like, but we use [Mocha](https://mochajs.org) and love [power-assert](https://github.com/power-assert-js/power-assert).

See the [devDependencies section](https://github.com/atomist/automation-client-samples-ts/blob/master/package.json) of the samples' `package.json` file for the required dependencies. 

## Testing Command Handlers

tbd

## Testing Event Handlers

tbd

## Testing "Project Operations"
Many automations work with projects--that is, the contents of repositories--querying them and modifying them. It's possible to test against our `Project` and `File` abstraction using in memory or local file implementations.

Let's look at an example.

```
import "mocha";

import { InMemoryProject } from "@atomist/automation-client/project/mem/InMemoryProject";

import { RepoId, SimpleRepoId } from "@atomist/automation-client/operations/common/RepoId";
import * as assert from "power-assert";
import { setSpringBootVersionEditor } from "../../../../src/commands/editor/spring/setSpringBootVersionEditor";
import { tempProject } from "../../../util/tempProject";
import { springBootPom } from "../../reviewer/maven/Poms";

describe("setSpringBootVersionEditor", () => {

    it("doesn't edit empty project", done => {
        const p = InMemoryProject.of();
        setSpringBootVersionEditor("1.3.1")(null, p, null)
            .then(r => {
                assert(!r.edited);
                done();
            }).catch(done);
    });

    it("reports editing Spring Boot project", done => {
        const p = InMemoryProject.of({path: "pom.xml", content: springBootPom("1.3.0")});
        const repoId: RepoId = new SimpleRepoId("a", "b");
        setSpringBootVersionEditor("1.3.1")(repoId, p, null)
            .then(r => {
                assert(r.edited);
                done();
            }).catch(done);
    });

    it("actually edits Spring Boot project in memory", done => {
        const p = InMemoryProject.of({path: "pom.xml", content: springBootPom("1.3.0")});
        const repoId: RepoId = new SimpleRepoId("a", "b");
        setSpringBootVersionEditor("1.3.1")(repoId, p, null)
            .then(r => {
                assert(r.edited);
                assert(p.findFileSync("pom.xml").getContentSync().includes("1.3.1"));
                done();
            }).catch(done);
    });

```

Note the use of `InMemoryProject` to create projects that live in memory, populating them with string content at specified paths.

It's then possible to invoke an editor function and verify that when the Promise returns the state of the project is as expected. Note the use of the `done` argument that Mocha provides to ensure that the test terminates without a timeout.



