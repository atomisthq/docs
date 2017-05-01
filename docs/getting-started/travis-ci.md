[Travis CI][travis] integrates tightly with [GitHub.com][github].
Atomist leverages the Travis CI/GitHub.com integration to perform all
operations it requires.  In other words, once you have set up Travis
CI with your GitHub account, you are ready to go; no additional
authorization is required.  If you have not yet setup Travis and want
to as part of getting started with Atomist, please see
the [Travis getting started][travis-start] documentation.

[travis]: https://travis-ci.org/ (Travis CI)
[github]: https://github.com/ (GitHub)
[travis-start]: https://docs.travis-ci.com/user/for-beginners (Travis Getting Started)

!!! note ""
    Atomist works with Travis-CI.org and Travis-CI.com. Travis
    Enterprise is not currently supported.

You will need to enable your projects to be built using Travis if they
aren't already set up. See the [Travis documentation][travis-doc] to
set up Travis builds.

[travis-doc]: https://docs.travis-ci.com/user/for-beginners (Travis CI Beginners Guide)

Next, configure all your Travis builds to send notifications to
Atomist.  In the `.travis.yml` configuration file in each project
repository, add the following webhook configuration.

```yaml
notifications:
  webhooks:
    urls:
      - https://webhook.atomist.com/travis
    on_success: always
    on_failure: always
    on_start: always
    on_cancel: always
    on_error: always
```

Once you commit and push those changes, Travis CI events will start
flowing to Atomist.  You should go to
the [getting started with the Atomist Bot][bot] page to see how build
events are integrated into messages with the other events in your
development flow.

[bot]: bot.md (Getting Started - Atomist Bot)
