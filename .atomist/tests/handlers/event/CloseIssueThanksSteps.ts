import * as stubs from "@atomist/cortex/stub/Types";
import { DirectedMessage } from "@atomist/rug/operations/Handlers";
import {
    EventHandlerScenarioWorld,
    Given,
    HandlerScenarioWorld,
    Then,
    When,
} from "@atomist/rug/test/handler/Core";

Given("the CloseIssueThanks handler is registered", (world: HandlerScenarioWorld) => {
    const w = world as EventHandlerScenarioWorld;
    w.registerHandler("CloseIssueThanks");
});

const tChannel = new stubs.ChatChannel().withName("mark-i");
const tRepoName = "univac";
const tRepo = new stubs.Repo().withName(tRepoName).addChannels(tChannel);
const tLogin = "hopper";
const tGitHubUser = new stubs.GitHubId().withLogin(tLogin);
const tIssueNumber = 123;

When("a closed issue event arrives", (world: HandlerScenarioWorld) => {
    const w = world as EventHandlerScenarioWorld;
    const issue = new stubs.Issue().withNumber(tIssueNumber).withRepo(tRepo)
        .addAssignees(tGitHubUser).withState("closed");
    w.sendEvent(issue);
});

When("an open issue event arrives", (world: HandlerScenarioWorld) => {
    const w: EventHandlerScenarioWorld = world as EventHandlerScenarioWorld;
    const issue = new stubs.Issue().withNumber(tIssueNumber).withRepo(tRepo)
        .addAssignees(tGitHubUser).withState("open");
    w.sendEvent(issue);
});

Then("a message should be sent thanking the assignee", (world: HandlerScenarioWorld) => {
    const expected = `Thanks for closing ${tRepoName}#${tIssueNumber} ${tLogin}!`;
    const message = world.plan().messages[0] as DirectedMessage;
    return message.body === expected;
});

Then("no message should be sent", (world: HandlerScenarioWorld) => {
    return world.plan().messages.length === 0;
});
