import { Commit } from '@atomist/cortex/Commit';
import { Repo } from '@atomist/cortex/Repo';
import { EventHandler, Tags } from '@atomist/rug/operations/Decorators';
import { ChannelAddress, DirectedMessage, HandleEvent, Plan,
         UserAddress } from '@atomist/rug/operations/Handlers';
import { Match } from '@atomist/rug/tree/PathExpression';


@EventHandler("NewCommitPushedToDMAndGeneral",
              "sends a DM and to the general channel on new commit pushed",
              `/Commit()
                  [/author::GitHubId()[@name="Alice"]]
                  [/repo::Repo()]`)
@Tags("commit", "push")
export class NewCommitPushedToDMAndGeneral implements HandleEvent<Commit, Commit> {
    handle(event: Match<Commit, Commit>): Plan {
        const commit: Commit = event.root();
        const repo: Repo = commit.repo;
        const url: string = `https://github.com/${repo.owner}/${repo.name}/commit/${commit.sha}`;

        const plan = new Plan();

        const message = new DirectedMessage(
            `${commit.author.name} has pushed ${url}`,
            new ChannelAddress("#general"));
        plan.add(message);

        const dm = new DirectedMessage(
            `${commit.author.name} has pushed ${url}`,
            new UserAddress("@Bob"));
        plan.add(dm);

        return plan;
    }
}
export const newCommitPushedToDMAndGeneral = new NewCommitPushedToDMAndGeneral();
