import { Commit } from '@atomist/cortex/Commit';
import { Repo } from '@atomist/cortex/Repo';
import { EventHandler, ParseJson, ResponseHandler,
         Tags } from '@atomist/rug/operations/Decorators';
import { ChannelAddress, DirectedMessage, HandleEvent, HandleResponse,
         MessageMimeTypes, Plan, Response, ResponseMessage,
         UserAddress } from '@atomist/rug/operations/Handlers';
import { Match } from '@atomist/rug/tree/PathExpression';
import { GenericErrorHandler } from '@atomist/rugs/operations/CommonHandlers';

@EventHandler("ListCommitFilesChanged", "lists modified files in a commit",
              `/Commit()
                  [/author::GitHubId()[@name="Alice"]]
                  [/repo::Repo()]`)
@Tags("commit", "push")
export class ListCommitFilesChanged implements HandleEvent<Commit, Commit> {
    handle(event: Match<Commit, Commit>): Plan {
        const commit: Commit = event.root();
        const plan = new Plan();
        const repo: Repo = commit.repo;

        const url = `https://github.com/${repo.owner}/${repo.name}/commit/${commit.sha}`;
        const api = `https://api.github.com/repos/${repo.owner}/${repo.name}/commits/${commit.sha}`;

        plan.add(new DirectedMessage(
            `${commit.author.name} has pushed ${url}`,
            new ChannelAddress("#general")));

        plan.add({
            instruction: {
                kind: "execute",
                name: "http",
                parameters: {
                    url: api,
                    method: "get",
                    config: {
                        headers: { "Content-Type": "application/json" },
                    }
                }
            },
            onSuccess: {
                kind: "respond",
                name: "ReceivedCommitDetails",
                parameters: {},
            },
            onError: {
                kind: "respond",
                name: "GenericErrorHandler",
                parameters: {
                    msg: `Failed to fetch commit information: ${url}`,
                    corrid: "",
                }
            }
        });

        return plan;
    }
}
export const listCommitFilesChanged = new ListCommitFilesChanged();

@ResponseHandler("ReceivedCommitDetails", "receiving commit details")
class ReceivedCommitDetails implements HandleResponse<any> {
    handle(@ParseJson response: Response<any>): Plan {
        const plan = new Plan();
        const commitUrl: string = response.body.html_url as string;
        const sha: string = response.body.sha as string;
        const files: any[] = response.body.files as any[];

        const slack: any = {
            attachments: [
                {
                    fallback: "Some files were changed in a commit",
                    color: "#36a64f",
                    text: "Here are the modified files by this commit:",
                    fields: [],
                },
            ],
        };

        slack.attachments.title = `Commit ${sha}`;
        slack.attachments.title_link = commitUrl;

        files.map((file: any) => {
            slack.attachments.fields.push({
                title: `${file.filename}`,
                value: `${file.status}`,
                short: false,
            });
        });

        return Plan.ofMessage(
            new ResponseMessage(
                JSON.stringify(slack),
                MessageMimeTypes.SLACK_JSON,
            ),
        );
    }
}
export const receivedCommitDetails = new ReceivedCommitDetails();
