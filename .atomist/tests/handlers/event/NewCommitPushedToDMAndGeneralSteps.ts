import { EventHandlerScenarioWorld, Given,
         Then, When } from "@atomist/rug/test/handler/Core";
import { DirectedMessage } from "@atomist/rug/operations/Handlers";
import { Commit } from "@atomist/cortex/stub/Commit";
import { Repo } from "@atomist/cortex/stub/Repo";
import { GitHubId } from "@atomist/cortex/stub/GitHubId";

const expected = "Alice has pushed https://github.com/atomist/rug/commit/1234";

Given("the NewCommitPushedToDMAndGeneral event handler is registered", (world: EventHandlerScenarioWorld) => {
    world.registerHandler("NewCommitPushedToDMAndGeneral");
});

When("a new Commit is pushed", (world: EventHandlerScenarioWorld) => {
    const commit: Commit = new Commit();
    commit.withSha("1234");

    const author: GitHubId = new GitHubId();
    author.withName("Alice");
    commit.withAuthor(author);

    const repo: Repo = new Repo();
    repo.withOwner("atomist");
    repo.withName("rug");
    commit.withRepo(repo);

    world.sendEvent(commit);
});

Then("the event handler should respond with two messages", (world: EventHandlerScenarioWorld) => {
    return world.plan().messages.length === 2;
});

Then("the first message should target the general channel", (world: EventHandlerScenarioWorld) => {
    const message = world.plan().messages[0] as DirectedMessage;
    return message.channelNames[0] === "#general";
});

Then("the second message should be a DM", (world: EventHandlerScenarioWorld) => {
    const message = world.plan().messages[1] as DirectedMessage;
    return message.usernames[0] === "@Bob";
});