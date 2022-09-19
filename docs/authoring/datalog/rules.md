## Datalog rules

### attributes-tx

Subscribe to updates for one named attribute. 

```
:where
  (attributes-tx ?ctx ?entity :my/attribute ?value)
```

This declares that the subscription should watch for updates to an attribute across all entities in the system.  It is common to begin datalog subscriptions with this expression and then to narrow the criteria with additional constraints.

```
:where
  (attributes-tx ?ctx ?entity :docker.image/digest _)
  [?entity :docker.image/repositories ?repository]
  [?repository :docker.repository/host "hub.docker.com"]
```

The subscription above watches for all `:docker.image/digest` updates that have been pushed to `hub.docker.com`. Note the use of `_` character in the first line. We don't need the value of the attribute here so we do not bind it to a variable at all.

It is common to combine these rules with an `or` clause.

```
:where
   (or-join [?ctx ?image]
     (and
       (attributes-tx ?ctx ?report :vulnerability.report/last-updated _)
       [?report :vulnerability.report/package ?image])
     (attributes-tx ?ctx ?image :sbom/state _))
```

In this example, we watch for changes to either `:sbom/state` or `:vulnerability.report/last-updated` attributes related to a docker image. Vulnerability reports change when we learn new things about an existing image (e.g from advisories).

### check-run-tx

This rule is used to watch for GitHub check runs being written.  It requires installation of the GitHub application to watch for these events.  Subscriptions that use this rule will be triggered by new check runs, or by updates to conclusions or statuses on existing check runs.

```
:where
  (check-run-tx ?ctx ?commit ?check-run)
```

The `?commit` and `?check-run` variables will be bound to the updated entities.  Subscription authors can add additional criteria using attributes on either of these entities.

```
:where
  (check-run-tx ?ctx ?commit ?check-run)
  [?check-run :github.checkrun/conclusion :github.checkrun.conclusion/success]
```

This would only fire when a checkrun has been updated and the checkrun has concluded with the value "success".

### config-tx and config-value-tx

A skill can watch for its own configuration being updated. The configuration of a skill is written to the data plane, just like any other kind of data. This allows us to subscribe to all config changes using the `config-tx` rule.

```
:where
  (config-tx ?ctx ?parameter)
```

The `?parameter` variable will be bound to all parameters in the updated configuration, whether they have changed or not.  Use this rules when you want to subscribe to the entire set of parameters, regardless of which has changed.

Use the `config-value-tx` if the subscription should fire for only specific config parameter changes (TODO - should this be a vector of parameter names to be more general?)

```
:where
  (config-value-tx ?ctx "my-parameter-name" ?parameter)
```

### push-tx

Watch for a new git branch ref, or tag push.  The rule will bind the `?commit` and `?ref` variables with entities that have been updated.

```
:where
  (push-tx ?ctx ?commit ?ref)
```

Use bound entity variables to further refine the subscription.  For example, subscribe only to branch ref updates in repositories that contain at least some "Go" code.

```
:where
  (push-tx ?ctx ?commit ?ref)
  [?commit :git.commit/repo ?repo]
  [?language :git.repo-language/repo ?repo]
  [(= "Go" ?language)]
  [?ref :git.ref/type :git.ref.type/branch]
```

### schedule-tx

Even cron schedules are defined by subscriptions. A `schedule-tx` rule allows a subscription to watch for a scheduled timer.  This is useful when a skill is polling an external system, and needs to run even when no other data changes have been detected.

```
:where
  (schedule-tx ?ctx "my-schedule" ?schedule-timezone)
```

Skills can have multiple schedule parameters defined in the skill.yaml file. The name of the parameter must be passed to this rule (e.g. "my-schedule").

### get-skill-config-value

Subscriptions can be parameterized by configuration parameters. This means we can create skills that defer some choices until configuration time.

One example would be to watch for new docker tags that match a regular expression that users configure in a parameter named `"tag-regular-expression"`.

```
:where
  (attributes-tx ?ctx ?entity :docker.tag/name ?tag-name)
  (get-skill-config-value ?ctx "tag-regular-expression" ".*" ?tag-matcher)
  [((fn [s1 s2] (clojure.string/re-matches (re-pattern s2) s1) ?tag-name ?tag-matcher)]
```

TODO - this is a bad example - do we have any predicates for matching?

### is-default-branch?

This rule composes with an already bound set of git ref entities. 

```
:where
  (push-tx ?ctx ?commit ?ref)
  (is-default-branch? ?ref)
```

The combined effect of these two rules is to watch only for pushes that update the "default" branch ref (e.g. the "main" branch).  

### is-in-docker-org?

TODO - private

### range-satisfied?

```
(range-satisfied? ?package-type ?package-version ?range-source ?version-range)
```

**Advanced** - this rule is used to check whether there's an intersection between a set of `?package-version` (e.g. from an sbom) and a public set of impacted `?version-range` data pulled in from another index.  Usage requires that the subscription author understand the `:package` model and the `:vulnerability.advisory` model.

### skill-config-value

TODO - private? use get-skill-config-value

## Repository selection

It is easy to subscribe to a very broad range of data changes.  To allow organisations to build sandboxes for new features, we have created out of the box git repo selectors.  These allow us to build subscriptions that can be applied everywhere but still limit their scope during testing.

Repository filters can be configured at the workspace level, or as parameters on individual skills. Any skill that uses the `push-tx` or `check-run-tx` rules automatically uses repository selection.  Other subscriptions can use these filters by adding `skill-repo-selected?` or `skill-repo-parameter-selected?`.

### skill-repo-selected? and skill-repo-parameter-selected?

Subscriptions can choose to be constrained by the workspace repo filter. Consider the case where a docker image linked to a git repo has been pushed.

```
:where
  (attributes-tx ?ctx ?image :docker.image/commit ?commit)
  [?commit :git.commit/repo ?repo]
```

This will fire for all images with git provenance. If we would like this skill only to fire for repositories selected by the workspace, then we can add the `skill-repo-selected?` rule.

```
:where
  (attributes-tx ?ctx ?image :docker.image/commit ?commit)
  [?commit :git.commit/repo ?repo]
  (skill-repo-selected? ?repo)
```

Individual skills can also add their own repo-filter parameter to give their users the opportunity to roll out the skill repository by repository.  Use the `skill-report-parameter-selected?` rule along with the name of the repo filter parameter.

```
:where
  (attributes-tx ?ctx ?image :docker.image/commit ?commit)
  [?commit :git.commit/repo ?repo]
  (skill-repo-parameter-selected? ?repo ["my-repo-filter-parameter-name"])
```

