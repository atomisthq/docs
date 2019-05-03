When you want to look for or change a particular piece of code,
we have our algorithms for that when we're using our eyes.
For instance, "I want to find all files that import this class, so
I will look at the top of a file for lines that start with 'import' and
include the class's name or its package."

You could duplicate that with regular expressions, running over each file.
But regular expressions don't work well across lines, they're cryptic as all get out,
and their complexity scales exponentially with their intricacy.

Atomist lets you seek out and update code with a relatively intuitive parsing
language, that asks you to describe only the piece of code you want to see (not
the whole file), in a way that's more bearable than regular expressions at a medium scale.

The parseUtils collection of functions helps you work with a [Project](project.md) using microgrammars.

[microgrammar library](https://github.com/atomist/microgrammar)
[parseUtils API Doc](https://atomist.github.io/automation-client/modules/_lib_project_util_parseutils_.html)

## Writing a microgrammar

You'll want to `npm install @atomist/microgrammar` to get the latest library version.

Then, envision the code that you want, and replace the varying bits with `${variables}`.
For instance, if you wanted to know what functions from the `lodash` library your
TypeScript code uses, you might look for code like:

`_.${functionName}(`

You don't care about anything after the opening parenthesis. `lodash` is always referred to by the name `_`, by convention. And conventions are good enough, because your code inspection and transform don't have to work on all the code in the world. They only need to work on the code in your projects.

Once you have that string (it's called a "phrase" here), you will want to describe what
the contents of each variable might contain. `${functionName}` is definitely going to be a valid JavaScript function identifier. More than valid, it's going to be an ordinary one, nothing weird. We can describe it with a very simple regular expression. Do this in an object, and this object becomes a [`TermsDefinition`][apidoc-termsdefinition].

```typescript
{
    functionName: /[a-zA-Z0-9_]/,
}
```

Pass these two things in:

```typescript
    const lodashFunctionCallMicrogrammar = microgrammar({
        phrase: "_.${functionName}(",
        terms: {
            functionName: /[a-zA-Z0-9_]/,
        }
    });
```

Pointers:

   * If you don't provide a definition for a variable that you use in the phrase, it will match whatever exists before the next token. In this case, if we hadn't defined `functionName` as a term, it would have matched any text until the next opening parenthesis. (watch out: don't put an undefined variable like this at the end of your phrase. It needs to have something after it, or else be defined in the terms.)
   * If you put a space (or newline, etc) between any variables or any other words in the phrase, this is interpreted as "any amount of whitespace."
   * You can put `...` in your phrase to match any characters up to the next whatever-comes-next.
   * The term definitions can be string literals, regular expressions, or other microgrammars.

Handy microgrammars to compose:

   * `RestOfLine`
   * `JavaBlock`
   * optional(anotherMicrogrammar)
   * atLeastOne(anotherMicrogrammar)
   * zeroOrMore(anotherMicrogrammar)
   * firstOf(possibleMicrogrammar, anotherPossibleMicrogrammar, ...)

For more details on how to write a microgrammar, check out the [microgrammar library](https://github.com/atomist/microgrammar), especially the [string-based definition examples](https://github.com/atomist/microgrammar/blob/master/docs/stringDefs.md).

## Finding code that looks like this

Within your SDM, you can use [`parseUtils.findMatches`][apidoc-findmatches] to locate all of the
code that looks like your microgrammar in your entire project.

If you want to know what functions from lodash you use, you could do this:

```typescript
import { parseUtils } from "@atomist/automation-client";
import { microgrammar } from "@atomist/microgrammar";
import * as _ from "lodash";

    const lodashFunctionCallMicrogrammar = microgrammar<{ functionName: string }>({
        phrase: "_.${functionName}(",
        terms: {
            functionName: /[a-zA-Z0-9_]/,
        },
    });

    const matches = await parseUtils.findMatches(
        project,
        "**/*.ts", lodashFunctionCallMicrogrammar);

    const functionsCalledOnLodash = _.uniq(matches.map(m => m.functionName));
```

Notice that here, the `microgrammar` constructor function accepts a type parameter
that describes the terms on the microgrammar. If this type matches the structure of
the grammar, then those properties will exist on the returned match.

If you also want information on the file that each match is in, then check out
[`parseUtils.findFileMatches`][apidoc-findfilematches].

[apidoc-findfilematches]: https://atomist.github.io/automation-client/modules/_lib_project_util_parseutils_.html#findfilematches (API Doc for findFileMatches)
[apidoc-findmatches]: https://atomist.github.io/automation-client/modules/_lib_project_util_parseutils_.html#findmatches (API Doc for findMatches)
[apidoc-termsdefinition]: https://atomist.github.io/microgrammar/modules/_lib_grammar_.html#termsdefinition (API Doc for TermsDefinition)

## Changing code that looks like this

You can update the matched code in place. To do this, use a different function:
[`parseUtils.doWithMatches`][apidoc-dowithmatches]. This lets you pass in an action,
which can update the properties on the match. If you wanted to change some of the function calls on lodash, you could do this:

```typescript
import { parseUtils } from "@atomist/automation-client";
import { microgrammar } from "@atomist/microgrammar";
import * as _ from "lodash";

    const lodashFunctionCallMicrogrammar = microgrammar<{ functionName: string }>({
        phrase: "_.${functionName}(",
        terms: {
            functionName: /[a-zA-Z0-9_]/,
        },
    });

    await parseUtils.doWithMatches(project, "**/*.ts", lodashFunctionCallMicrogrammar,
        m => {
            if (m.functionName === "oldBoringFunction") {
                m.functionName = "newExcitingFunction";
            }
        });
```

This will change the code in every .ts file in the project that called `_.oldBoringFunction` to call `_.newExcitingFunction` instead. Put this kind of stuff in
your [code transforms](transform.md).

Note: if you want information about the file that the match is in, try [`parseUtil.doWithFileMatches`][apidoc-dowithfilematches].

[apidoc-dowithfilematches]: https://atomist.github.io/automation-client/modules/_lib_project_util_parseutils_.html#dowithfilematches (API Doc for doWithFileMatches)
[apidoc-dowithmatches]: https://atomist.github.io/automation-client/modules/_lib_project_util_parseutils_.html#dowithmatches (API doc for doWithMatches)

## See also

* the [Project API](project.md)
* do simpler manipulations of file content with [projectUtils](projectutils.md)
* dig into the abstract syntax tree (AST) of your programming language with [astUtils](astutils.md)
