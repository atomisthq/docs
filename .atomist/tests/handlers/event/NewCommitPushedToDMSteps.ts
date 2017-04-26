import { DirectedMessage } from "@atomist/rug/operations/Handlers";
import {
    EventHandlerScenarioWorld, Given, Then, When,
} from "@atomist/rug/test/handler/Core";

import * as stub from "@atomist/cortex/stub/Types";

const expected = "Alice has pushed https://github.com/atomist/rug/commit/1234";

Given("the NewCommitPushedToDM event handler is registered",
    (w: EventHandlerScenarioWorld) => {
        w.registerHandler("NewCommitPushedToDM");
    });

When("a new Commit is pushed", (w: EventHandlerScenarioWorld) => {
    const commit = new stub.Commit().withSha("1234");

    const author = new stub.GitHubId().withName("Alice").withLogin("alice");
    commit.withAuthor(author);

    const repo = new stub.Repo().withOwner("atomist").withName("rug");
    commit.withRepo(repo);

    w.sendEvent(commit);
});

Then("the event handler should respond with a message",
    (w: EventHandlerScenarioWorld) => {
        const message = (w.plan().messages[0] as DirectedMessage).body;
        return message === expected;
    });

Then("that message should be a DM", (w: EventHandlerScenarioWorld) => {
    const message = w.plan().messages[0] as DirectedMessage;
    return message.usernames[0] === "@bob";
});
