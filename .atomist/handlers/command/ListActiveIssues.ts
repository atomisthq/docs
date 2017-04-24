import { CommandHandler,
    Intent,
    MappedParameter,
    Parameter,
    ParseJson,
    ResponseHandler,
    Secrets,
    Tags } from "@atomist/rug/operations/Decorators";
import { HandleCommand,
    HandlerContext,
    HandleResponse,
    MappedParameters,
    Plan,
    Response,
    ResponseMessage } from "@atomist/rug/operations/Handlers";
import { Pattern } from "@atomist/rug/operations/RugOperation";
import { renderIssues } from "@atomist/rugs/operations/messages/MessageRendering";

@CommandHandler("ListActiveIssues", "list the most recent active issues")
@Tags("issue")
@Secrets("github://user_token?scopes=repo")
@Intent("active issues")
export class ListActiveIssues implements HandleCommand {

    @MappedParameter(MappedParameters.GITHUB_REPOSITORY)
    public repo: string;

    @MappedParameter(MappedParameters.GITHUB_REPO_OWNER)
    public owner: string;

    public handle(command: HandlerContext): Plan {
        const plan = new Plan();

        const api = `https://api.github.com/repos/${this.owner}/${this.repo}/issues?sort=comments&state=open`;

        plan.add({
            instruction: {
                kind: "execute",
                name: "http",
                parameters: {
                    method: "get",
                    url: api,
                    config: {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `token #{github://user_token?scopes=repo}`,
                        }
                    }
                }
            },
            onSuccess: {
                kind: "respond",
                name: "DisplayLastActiveIssues",
            }
        });

        return plan;
    }
}
export const listActiveIssues = new ListActiveIssues();


@ResponseHandler("DisplayLastActiveIssues", "nicely renders a list if project issues")
class DisplayLastActiveIssues implements HandleResponse<any> {
    public handle(@ParseJson response: Response<any>): Plan {
        return new Plan().add(renderIssues(response.body));
    }
}
export const displayLastActiveIssues = new DisplayLastActiveIssues();
