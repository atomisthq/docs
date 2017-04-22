import { Commit } from '@atomist/cortex/Commit';
import { Repo } from '@atomist/cortex/Repo';
import { EventHandler, Tags } from '@atomist/rug/operations/Decorators';
import { DirectedMessage, HandleEvent, Plan,
         UserAddress } from '@atomist/rug/operations/Handlers';
import { Match } from '@atomist/rug/tree/PathExpression';


@EventHandler("NewCommitPushedToDM", "sends a DM on new commit pushed",
              `/Commit()
                  [/author::GitHubId()[@name="fauxryan"]]
                  [/repo::Repo()]`)
@Tags("commit", "push")
export class NewCommitPushedToDM implements HandleEvent<Commit, Commit> {
    handle(event: Match<Commit, Commit>): Plan {
        const commit: Commit = event.root();
        const repo: Repo = commit.repo;
        const url: string = `https://github.com/${repo.owner}/${repo.name}/commit/${commit.sha}`;

        const message = new DirectedMessage(
            `${commit.author.name} has pushed ${url}`,
            new UserAddress("@jrday"));

        return Plan.ofMessage(message);
    }
}
export const newCommitPushedToDM = new NewCommitPushedToDM();
