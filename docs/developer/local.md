When you run an SDM in local mode, it operates in the privacy of your laptop.
Everything is open source. This SDM can:

-  run goals in respond to a commit.
   - the SDM can run your tests in the background
   - deploy locally, and be sure that you're doing manual testing on committed code
   - apply autofixes directly in your repository
   - check code inspections and tell you when you've violated them
-  execute commands
   - generate new projects
   - perform transforms on one repository or on many repositories
   - do inspections on one or many repositories

## Directory structure


## Differences from team mode

-  No connection to the Atomist service
-  Push events come from git hooks on each commit
-  Repositories are cloned from the local filesystem
-  Messages go to the terminal running `atomist feed` (and for commands, also where you ran them)
-  Nothing happens in GitHub, only locally