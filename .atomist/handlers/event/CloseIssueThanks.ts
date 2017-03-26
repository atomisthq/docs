import { Issue } from "@atomist/cortex/stub/Issue";
import { EventHandler, Tags } from "@atomist/rug/operations/Decorators";
import {
    ChannelAddress,
    DirectedMessage,
    HandleEvent,
    Plan,
} from "@atomist/rug/operations/Handlers";
import { Match } from "@atomist/rug/tree/PathExpression";

/**
 * A simple event handler that sends a thank you message.
 */
@EventHandler(
    "CloseIssueThanks",
    "simple event handler that sends a thank you message",
    "/Issue()/repo::Repo()/channels::ChatChannel()",
)
@Tags("documentation")
export class CloseIssueThanks implements HandleEvent<Issue, Issue> {
    public handle(event: Match<Issue, Issue>): Plan {
        const root: Issue = event.root();
        const plan: Plan = new Plan();
        if (root.state !== "closed") {
            return plan;
        }
        const repo = root.repo;
        for (const assignee of root.assignees) {
            const thanks = `Thanks for closing ${repo.name}#${root.number} ${assignee.login}!`;
            for (const channel of repo.channels) {
                const message = new DirectedMessage(thanks, new ChannelAddress(channel.name));
                plan.add(message);
            }
        }
        return plan;
    }
}

export const closeIssueThanks = new CloseIssueThanks();
