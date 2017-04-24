import { CommandHandler,
    Intent,
    MappedParameter,
    Parameter,
    ParseJson,
    ResponseHandler,
    Secrets,
    Tags} from "@atomist/rug/operations/Decorators";
import { Execute,
    HandleCommand,
    HandlerContext,
    HandleResponse,
    Instruction,
    MappedParameters,
    MessageMimeTypes,
    Plan,
    Respond ,
    Respondable,
    Response,
    ResponseMessage} from "@atomist/rug/operations/Handlers";
import * as mustache from "mustache";

const apiSearchUrl =
    `http://api.stackexchange.com/2.2/search/advanced?pagesize=3&order=desc&sort=relevance&site=stackoverflow&q=`;
const webSearchUrl = `http://stackoverflow.com/search?order=desc&sort=relevance&q=`;

@CommandHandler("SearchStackOverflow", "Query Stack Overflow")
@Tags("StackOverflow")
@Intent("search SO")
class SearchStackOverflow implements HandleCommand {

    @Parameter({description: "your search query", pattern: "^.*$"})
    public query: string;

    public handle(ctx: HandlerContext): Plan {
        const plan = new Plan();

        plan.add({
            instruction: {
                kind: "execute",
                name: "http",
                parameters: {
                    method: "get",
                    url: encodeURI(apiSearchUrl + this.query)
                }
            },
            onSuccess: {
                kind: "respond",
                name: "SendStackOverflowResults",
                parameters: this
            }
        });
        return plan;
    }
}
export const searchStackOverflow = new SearchStackOverflow();

@ResponseHandler("SendStackOverflowResults", "Shows answers to a query on Stack Overflow")
class StackOverflowResponder implements HandleResponse<any> {

    @Parameter({description: "your search query", pattern: "^.*$"})
    public query: string;

    public handle(@ParseJson response: Response<any>): Plan {
        return Plan.ofMessage(renderResults(response.body, encodeURI(this.query)));
    }
}
export let responder = new StackOverflowResponder();

function renderResults(result: any, query: string): ResponseMessage {

    if (result.items.length === 0) {
        return new ResponseMessage("No results found.", MessageMimeTypes.PLAIN_TEXT);
    }

    // mark the last item for rendering purpose by mustache
    result.items[result.items.length - 1].last = true;

    return new ResponseMessage(mustache.render(`{
  "attachments": [
{{#answers.items}}
    {
      "fallback": "{{{title}}}",
      "author_name": "{{{owner.display_name}}}",
      "author_link": "{{{owner.link}}}",
      "author_icon": "{{{owner.profile_image}}}",
      "title": "{{{title}}}",
      "title_link": "{{{link}}}",
      "thumb_url": "https://slack-imgs.com/?c=1&o1=wi75.he75&url=https%3A%2F%2Fcdn.sstatic.net%2FSites%2Fstackoverflow%2Fimg%2Fapple-touch-icon%402.png%3Fv%3D73d79a89bded",
      "footer": "{{#tags}}{{.}}  {{/tags}}",
      "ts": {{{last_activity_date}}}
    }{{^last}},{{/last}}
{{/answers.items}},
		{
			"title": "See more >",
			"title_link": "${webSearchUrl + query}"
		}
  ]
}`,
    {answers: result}), MessageMimeTypes.SLACK_JSON);
}
