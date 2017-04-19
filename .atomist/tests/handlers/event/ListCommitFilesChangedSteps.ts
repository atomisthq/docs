import { EventHandlerScenarioWorld, Given,
         Then, When } from "@atomist/rug/test/handler/Core";
import { DirectedMessage, Execute, Instruction, Respondable } from "@atomist/rug/operations/Handlers";
import { Commit } from "@atomist/cortex/stub/Commit";
import { Repo } from "@atomist/cortex/stub/Repo";
import { GitHubId } from "@atomist/cortex/stub/GitHubId";

const expected = "Alice has pushed https://github.com/atomist/rug/commit/1234";
const api = "https://api.github.com/repos/atomist/rug/commits/1234";

Given("the ListCommitFilesChanged is registered", (world: EventHandlerScenarioWorld) => {
    world.registerHandler("ListCommitFilesChanged");
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

Then("the event handler should respond with a message", (world: EventHandlerScenarioWorld) => {
    const message = (world.plan().messages[0] as DirectedMessage).body;
    return message === expected;
});

Then("the event handler should also plan on listing files", (world: EventHandlerScenarioWorld) => {
    const instruction = world.plan().instructions[0] as Respondable<Execute>;
    const execute = instruction.instruction as Execute;
    const params = execute.parameters as any;
    return (execute.name === "http") && (params.url === api);
});
