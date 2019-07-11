Atomist isn't designed to replace your CI service; rather, the goal of the SDM is to enhance all of your existing pipelines and policies through additional automation. To that end, let's take a look at some of the ways in which Atomist can sit alongside your existing tooling.

## Integrating source control

## Integrating CI tools

One of the tools you are most likely to integrate is Continuous Integration (CI). For example,
you can integrate Jenkins, Travis, or Circle CI with Atomist so that
these tools are responsible for build. This has potential advantages
in terms of scheduling and repeatability of environments.

Integrating a CI tool with Atomist is simple. Simply invoke Atomist
hooks to send events around build and artifact creation.

If integrating CI tools, we recommend the following:

- CI tools are great for building and generating artifacts. They are
  often abused as a PaaS for `bash`. If you find your CI usage has
  you programming in `bash` or YML, consider whether invoking such
  operations from Atomist event handlers might be a better model.
- Use Atomist generators to create your CI files, and Atomist
  editors to keep them in synch, minimizing inconsistency.

## Integrating with Static Analysis Tools

Any tool that runs on code, such as Checkstyle, can easily be
integrated.

If the tool doesn't have a Node API (which Checkstyle doesn't as it's written in Java), you can invoke it via Node `spawn`, as Node excels at working with child processes.
