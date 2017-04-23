import { Commit } from '@atomist/cortex/Commit';
import { Repo } from '@atomist/cortex/Repo';
import { EventHandler, Tags } from '@atomist/rug/operations/Decorators';
import { ChannelAddress, DirectedMessage, HandleEvent,
         Plan } from '@atomist/rug/operations/Handlers';
import { Match } from '@atomist/rug/tree/PathExpression';


@EventHandler("NewCommitPushedToGeneral",
              "sends a message to the #general channel on new commit pushed",
              `/Commit()
                  [/author::GitHubId()[@name="Alice"]]
                  [/repo::Repo()]`)
@Tags("commit", "push")
export class NewCommitPushedToGeneral implements HandleEvent<Commit, Commit> {
    handle(event: Match<Commit, Commit>): Plan {
        const commit: Commit = event.root();
        const repo: Repo = commit.repo;
        const url = `https://github.com/${repo.owner}/${repo.name}/commit/${commit.sha}`;

        const message = new DirectedMessage(
            `${commit.author.name} has pushed ${url}`,
            new ChannelAddress("#general"));

        return Plan.ofMessage(message);
    }
}
export const newCommitPushedToGeneral = new NewCommitPushedToGeneral();
