import { CommandRespondable, Execute } from "@atomist/rug/operations/Handlers";
import {
    CommandHandlerScenarioWorld, Given, Then, When,
} from "@atomist/rug/test/handler/Core";

const url = `http://api.stackexchange.com/2.2/search/advanced?pagesize=3&order=desc&` +
    `sort=relevance&site=stackoverflow&q=atomist`;

Given("nothing", (f) => { return; });

When("the SearchStackOverflow command handler is invoked", (world: CommandHandlerScenarioWorld) => {
    const handler = world.commandHandler("SearchStackOverflow");
    world.invokeHandler(handler, { query: "atomist" });
});

Then("a plan to request the StackOverflow API should be returned", (world: CommandHandlerScenarioWorld) => {
    const instruction = world.plan().instructions[0] as CommandRespondable<Execute>;
    const execute = instruction.instruction as Execute;
    const params = execute.parameters as any;
    return (execute.name === "http") && (params.url === url);
});
