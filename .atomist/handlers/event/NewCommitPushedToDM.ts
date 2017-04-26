import { Commit } from "@atomist/cortex/Commit";
import { Repo } from "@atomist/cortex/Repo";
import { EventHandler, Tags } from "@atomist/rug/operations/Decorators";
import {
    DirectedMessage, EventPlan, HandleEvent, UserAddress,
} from "@atomist/rug/operations/Handlers";
import { Match } from "@atomist/rug/tree/PathExpression";

@EventHandler("NewCommitPushedToDM", "sends a DM on new commit pushed",
    `/Commit()
        [/author::GitHubId()[@login="alice"]]
        [/repo::Repo()]`)
@Tags("commit", "push")
export class NewCommitPushedToDM implements HandleEvent<Commit, Commit> {
    public handle(event: Match<Commit, Commit>): EventPlan {
        const commit: Commit = event.root();
        const repo = commit.repo;
        const url: string = `https://github.com/${repo.owner}/${repo.name}/commit/${commit.sha}`;

        const message = new DirectedMessage(
            `${commit.author.name} has pushed ${url}`,
            new UserAddress("@bob"));

        return EventPlan.ofMessage(message);
    }
}
export const newCommitPushedToDM = new NewCommitPushedToDM();
