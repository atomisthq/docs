import { Given, When, Then,
         CommandHandlerScenarioWorld } from "@atomist/rug/test/handler/Core";
import { Execute, Respondable } from '@atomist/rug/operations/Handlers';

const url = `https://api.github.com/repos/atomist/rug/issues?sort=comments&state=open`;

Given("nothing", f => { });

When("the ListActiveIssues is invoked", (world: CommandHandlerScenarioWorld) => {
    const handler = world.commandHandler("ListActiveIssues");
    world.invokeHandler(handler, {
        repo: "rug",
        owner: "atomist"
    });
});

Then("you get a plan which will retrieve the list of open and active issues", (world: CommandHandlerScenarioWorld) => {
    const instruction = world.plan().instructions[0] as Respondable<Execute>;
    const execute = instruction.instruction as Execute;
    const params = execute.parameters as any;
    return (execute.name === "http") && (params.url === url);
});
