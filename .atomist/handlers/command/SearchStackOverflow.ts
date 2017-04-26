import {
    CommandHandler, Intent, Parameter, ParseJson,
    ResponseHandler, Tags,
} from "@atomist/rug/operations/Decorators";
import {
    CommandPlan, HandleCommand, HandlerContext, HandleResponse,
    MessageMimeTypes, Response, ResponseMessage,
} from "@atomist/rug/operations/Handlers";
import * as mustache from "mustache";

const apiSearchUrl =
    `http://api.stackexchange.com/2.2/search/advanced?pagesize=3&order=desc&sort=relevance&site=stackoverflow&q=`;
const webSearchUrl = `http://stackoverflow.com/search?order=desc&sort=relevance&q=`;

@CommandHandler("SearchStackOverflow", "Query Stack Overflow")
@Tags("stack-overflow")
@Intent("search SO")
class SearchStackOverflow implements HandleCommand {

    @Parameter({ description: "your search query", pattern: "^.*$" })
    public query: string;

    public handle(ctx: HandlerContext): CommandPlan {
        const plan = new CommandPlan();

        plan.add({
            instruction: {
                kind: "execute",
                name: "http",
                parameters: {
                    method: "get",
                    url: encodeURI(apiSearchUrl + this.query),
                },
            },
            onSuccess: {
                kind: "respond",
                name: "SendStackOverflowResults",
                parameters: this,
            },
        });
        return plan;
    }
}
export const searchStackOverflow = new SearchStackOverflow();

@ResponseHandler("SendStackOverflowResults",
    "Shows answers to a query on Stack Overflow")
class StackOverflowResponder implements HandleResponse<any> {

    @Parameter({ description: "your search query", pattern: "^.*$" })
    public query: string;

    public handle( @ParseJson response: Response<any>): CommandPlan {
        return CommandPlan.ofMessage(
            renderResults(response.body, encodeURI(this.query)),
        );
    }
}
export let responder = new StackOverflowResponder();

function renderResults(result: any, query: string): ResponseMessage {

    if (result.items.length === 0) {
        return new ResponseMessage("No results found.",
            MessageMimeTypes.PLAIN_TEXT);
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
        { answers: result }), MessageMimeTypes.SLACK_JSON);
}
