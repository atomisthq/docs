
# Coding a Skill

## Skill Definition

All of the code in a skill is managed in a single git repository.  The root of a skill project should contain a skill.yaml file.

```yaml
skill:
  apiVersion: v2
  name: skill-sample-2
  namespace: vonwig
  displayName: "Sample Skill #2"
  description: Sample Skill written in JavaScript
  author: slimslenderslacks
  license: Apache-2.0
  iconUrl: https://raw.githubusercontent.com/vonwig/skill-sample-2/main/docs/images/icon.svg
  homepageUrl: https://github.com/vonwig/skill-sample-2
  longDescription: add a description
  parameters:
    - string:
        name: param1
        required: false
        displayName: Optional String Parameter
        description: Optional String Parameter
    - webhook:
        name: event
        displayName: Event Webhook
        description: Ingest data from the outside world
        required: false
        authorizationTypes:
          - httpBasic
```

- `skill.name` and `skill.namespace` - these must form a globally unique name.  All skills require a globally unique name because they can be shared across workspaces.  By convention, we recommend that you use the GitHub Org name as your namespace.  Once you’ve claimed a namespace, your Atomist workspace owns it and no one else can author skills in that namespace.

## Skill Parameters

### Configuration values

In the example above, we added two skill parameters.  When a team enables a skill on their workspace, they are creating a configuration of this skill.  These configurations can be edited in [go.atomist.com](http://go.atomist.com) *after* the skill has been enabled.  The parameter definitions give go.atomist.com the context needed to create config panels.

![Untitled](images/go-dot-params.png)

The first parameter in the above skill.yaml file defines a string parameter named `param1`

```yaml
- string:
    name: param1
    required: false
    displayName: Optional String Parameter
    description: Optional String Parameter
```

Atomist will make this parameter available each time a skill executes.  Skill authors use these parameters to allow skill users to parameterize both their runtimes, *and* their subscriptions.  This latter point is important but somewhat difficult to appreciate until we’ve discussed subscriptions more thoroughly.  For now, note that both the skill handlers, and the way that handlers *subscribe* to change can be parameterized.

All parameters support `required`, `displayName`, and `description` fields.

| Parameter Type | example | additional notes |
| --- | --- | --- |
| string | <pre>- string:</br>    name: param1</br>    defaultValue: hi</br>    pattern: ‘atomist.*’</pre> |  |
| stringArray |  <pre>- stringArray:<br>    name: param1</br>    defaultValue: ["hi"]</br>    minRequired: 1</br>    maxAllowed: 10</br>    pattern: ‘atomist.*’ |  |
| float |<pre>- float:</br>    name: param1</br>    defaultValue: 1.0</br>    minimum: 0</br>    maximum: 3.14</br>    placeHolder: ‘radians’</pre> |  |
| int | <pre>- int:</br>    name: param1</br>    defaultValue: 1.0</br>    minimum: 0</br>    maximum: 3.14</br>    placeHolder: ‘radians’ </pre> |  |
| singleChoice | <pre>- singleChoice:</br>    name: param1</br>    defaultValue: 0</br>    options:</br>    - description: en</br>    text: en</br>    value: 0 </pre>|  |
| multiChoice | <pre>- multiChoice:</br>    name: param1</br>    defaultValue: 0</br>    minRequired: 0</br>    maxAllowed: 3</br>    options:</br>    - description: en</br>    text: en</br>    value: 0</pre> |  |
| webhook | <pre>- webhook:</br>    name: param1</br>    minRequired: 0</br>    maxAllowed: 1</br>    authorizationTypes:</br>    - none</pre> | configuring this parameter also creates a webhook.  Supported authorizationTypes include none, atomistApiKey, and httpBasic |
| schedule | <pre>- schedule:</br>    name: param1</pre> | configuring a schedule parameter will cause the skill to be executed on that schedule.  This is essentially crontab for skills.  |
| repoFilter | <pre>- repoFilter:</br>    name: param1</pre> | It is common to want to filter events on github repositories. This parameter gives us a nice UI experience for limiting the scope of a skill to a select set of git repositories. |
| fileFilter | <pre>- fileFilter:</br>    name: param1</br>    minRequired: 1</br>    maxAllowed: 5</pre> | TODO - are we still supporting this one? |
| chatChannels | <pre>- fileFilter:</br>    name: param1</br>    minRequired: 1</br>    maxAllowed: 5</pre> | A notification skill can offer users a choice of which chat channel to use.  |

### Webhooks

We also use parameters to define external triggers like webhooks or schedules.  In the example above, we requested an optional webhook with basic auth.

```yaml
 - webhook:
     name: event
     displayName: Event Webhook
     description: Ingest data from the outside world
     required: false
     authorizationTypes:
       - httpBasic
```

In [go.atomist.com](http://go.atomist.com), users can configure this webhook and Atomist will automatically provide a url for users to deliver payloads directly to a skill.  In go.atomist.com, the webhook configuration will allow a skill user to change basic auth credentials and will provide the url to send payloads to the skill.

![Untitled](images/webhook.png)

## Schema and Subscriptions

Using skills, you can build up a knowledge graph, and then respond to changes in that graph.  We define the kinds of facts that we can ingest using schema definitions.  Subscriptions are also written in terms of these schema definitions.  Every fact that we ingest is a potential event for downstream automation.

### Schema

Skills don’t have to define their own schema.  Some skills only exist for their side effects, and others might use only out of the box schema, or schema that have been added by other skills in the same workspace.  In cases, where a skill will be used to write new data to the graph.  The author of the skill must provide a `datalog/schema/schema.edn` file in their repository.

Each named schema attribute must have a `:db/valueType` , a `:db/cardinality`, and a `:db/doc`.  The names of attributes must be globally unique.  

In the example below, we have introduced 3 new schema attributes.

1. `:vonwig.testing.observation/id` - an identifier for some observation
2. `:vonwig.testing.observation/webhook-value` - a payload from a webhook representing some observation
3. `:vonwig.testing.observation/seen-by-subscriber` - a boolean that a skill will flip when we demonstrate that we can respond to this observation

In real scenarios, we’ll often have “reference” attributes that can point at other other entities.  With skills, we’re almost always building knowledge “graphs” but we build them up using individual facts about something.  In this example, there are just 3 facts that we can learn about an entity that we’ll call a `:vonwig.testing/observation`.

```clojure
{:attributes
 {:vonwig.testing.observation/id                   {:db/valueType    :db.type/string
                                                    :db/cardinality  :db.cardinality/one
                                                    :db/doc          "should be a random guid"}
  :vonwig.testing.observation/webhook-value        {:db/valueType    :db.type/string
                                                    :db/cardinality  :db.cardinality/one
                                                    :db/doc          "some observation on a webhook"}
  :vonwig.testing.observation/seen-by-subscriber   {:db/valueType    :db.type/boolean
                                                    :db/cardinality  :db.cardinality/one
                                                    :db/doc          "confirm that subscription fires"}

  :vonwig.testing/observation                      {:db.entity/attrs [:vonwig.testing.observation/id]}}}
```

Entities are not closed.  We can always add new attributes to them.  Attributes are not “owned” by an entity.  Any attribute can be transacted on to any entity.

The final line in the above schema is special

```clojure
:vonwig.testing/observation                         {:db.entity/attrs [:vonwig.testing.observation/id]}
```

This creates some additional metadata in our system that says that some entities are named `:vonwig.testing/observation` and these entities can be uniquely identified by their `:vonwig.testing.observation/id` attribute, which *must* exist.

At present, users must deploy a first version of a skill for this schema to be available and ready to use.  This creates some difficulty when we’re testing our skill before deploying it.  Unfortunately, this is currently a known limitation to our authoring model and something we’ll need to improve.

### Subscriptions

These are arguably the most important part of any skill.  A subscription defines when a skill executes.

The subscription is defined using a [datalog query](https://docs.datomic.com/cloud/query/query-data-reference.html).  It breaks down into two parts.

1. If the skill fires, what data should be pulled?  This is the `:find` part.
2. When should the skill fire?  This is the `:where` part.

Here’s an example to go with our schema attributes from above.  This file would be located at `datalog/subscription/on_observation.edn` in our repository.  All subscriptions must be written in the directory `datalog/subscription` for our default layout.  The name of the file becomes the internal name of the subscription and must end in `.edn`.

```clojure
[:find (pull ?observation [:vonwig.testing.observation/webhook-value])
 :in $ before-db % ?ctx
 :where
 [attributes-tx ?ctx ?observation :vonwig.testing.observation/webhook-value ?webhook-value]
 [?observation :vonwig.testing.observation/id ?id]]
```

The `:where` part of the subscription is a series of expression that refine what we’re looking for.  Many of them will be triplets of the form [?entity :attribute ?value].  These are the constraints that allow a subscription to refine what it’s looking for.  Atomist has also provided out of the box rules like the `attributes-tx` rule in the above expression.  These rules can capture patterns of constraints and make them re-usable across different subscriptions.

- `attributes-tx` - this rule says that we should fire each time an attribute is updated on any entity.  In the example above, we are saying that we should watch for any new `:vonwig.testing.observation/webhook-value` attributes being transacted.
- `[?observation :vonwig.testing.observation/id ?id]` - this additional constraint looks only at entitites that have a `:vonwig.testing.observation/id` attribute

The `:find` expression defines what data should be pulled from the model.  It does not have to be single-rooted.  You can use multiple pull expressions to pull data from different roots in a graph.

At this point, we have would have four files in the project.

- skill.yaml
- datalog/schema/schema.edn
- datalog/subscription/on_observation.edn

This should be the first point where we can start testing.  However, we still need to create at least one dummy handler just to get a first version of our skill defined.

## Skill Docker Image (Dockerfile)

Each time a subscription fires or a webhook payload is delivered, Atomist will run a container and dispatch a payload to the container’s entrypoint.  The current contract is that the entrypoint must create an Http listener to receive the payload (this is the Google CloudRun contract).

A Dockerfile for a Node.js project would look something like the following example.

```docker
FROM node:alpine

LABEL com.docker.skill.api.version="container/v2"
WORKDIR /skill

COPY package.json package-lock.json ./
RUN npm ci
COPY index.js ./

ENTRYPOINT ["node", "index.js"]
```

However, the `index.js` file would have to start up an HTTP listener for this to work.

Here’s an example index.js file.  There are already many ways of connecting handlers in different languages (typescript, and clojure(script) are the ones we use most internally).  This example is just to demonstrate the basic structure of a Docker project that implements a handler.

```jsx
const api = require("@atomist/skill-entry-point")

api.start(async payload => {
  payload.logger.info(`correlation id: ${payload.correlation_id}`)
  return {state: "completed", reason: "did nothing successfully"}
});
```

This just logs the payload’s correlation-id and then because it’s unimplemented.  However, it would work.  Prepare your repository by following these steps.

1. Create a Dockerfile with the contents above
2. run `npm init` to create an npm project
3. run `npm install @atomist/skill-entry-point`
4. create an index.js file with the code above.
5. Commit these changes and then push a tag.  Our current automation requires that the tag be a valid semver and that the semver is semantically greater than any existing tags.  The tag is used purely to drive automatic skill registration.  It is the signal that kicks off a new deployment.

Your repo would now contain the following files

- skill.yaml
- datalog/schema/schema.edn
- datalog/subscription/on_observation.edn
- Dockerfile
- package.json and package-lock.json
- index.js

Here’s an example [repo with this configuration](https://github.com/vonwig/skill-sample-2)

If Atomist is set up to watch the github org, then it will see this semver tag, build your DockerImage, and create a new version of your skill.  For developer feedback, we use GitHub CheckRuns to show progress on the skill registration.

- [ ]  documenting skill enablement with the magic url is in a different document - need a url for enablement and configuration - magic url is `https://go.atomist.com/catalog/skills/{namespace}/{name}?stability=unstable`

In any case, skill registration should be automatic each time a developer pushes a tag.  But skill “enablement” and “configuration” remains an extra step.

## Transacting

Test the enabled skill by curling a payload to the webhook url defined by the skill. This will log a skill execution in the [go.atomist.com](http://go.atomist.com) console.

The webhook url will begin with `https://[webhook.atomist.com/atomist/resource](https://slimslenderslacks:password@webhook.atomist.com/atomist/resource/9c8aa94d-9c14-4d68-a2c6-000c57232995)`.  You can find the `$URL` in the configuration of the skill at [https://go.atomist.com/r/auth/manage/skills](https://go.atomist.com/r/auth/manage/skills). 

```bash
curl $URL -u $USER:$PASS -d '{\"a\": \"b\"}' -H 'Content-Type: application/json'
```

All skill execution logs are also available at https://go.atomist.com.  After executing the above command, go to the console to see a log of the skill execution.

There are many things you’ll want to do in a skill handler, but transacting data is one of the most fundamental.  When you add facts to the graph, other skills can react to them.  The example below is language specific.  Atomist provides an authenticated POST api for handlers to transact new facts.

```bash
const api = require("@atomist/skill-entry-point")
const {v4 : uuidv4} = require("uuid")

api.start(async payload => {
  payload.logger.info(`correlation id: ${payload["execution_id"]}`)
  if ("webhook" === payload.type) {
    return payload.transact(
      [{"schema/entity-type": new api.Keyword("vonwig.testing/observation"),
        "vonwig.testing.observation/id": uuidv4().toString(),
        "vonwig.testing.observation/seen-by-subscriber": false,
        "vonwig.testing.observation/webhook-value": payload.webhook.body}])
      .then(r => {return {state: "completed", reason: "created observation"}})
  } else {
    return {state: "failed", reason: "unrecognized"}
  }
});
```

With this handler, we are writing our first observation.  If you commit this change and push another semver tag then this new version will automatically start handling your skill’s traffic.

If you curl the endpoint again, you’ll actually see two executions.  The first execution is the webhook payload, but the second one is a subscription watching for the facts that are transacted *because* of that payload.  In practice, we tend to  be in different skills.  We call skills that watch external events and transact new facts “integration” skills.  This is just a convention.  The important point is that we can work on ingesting new data separately from the skills that listen for that data.  The skills that subscribe are often subscribing to a much bigger picture of the world that can be built from just one single integration skill.  

We build up knowledge graphs.

The graph is composed of facts.

New kinds of facts can be added by defining schema.

We react to changes in our knowledge graph using subscriptions.
