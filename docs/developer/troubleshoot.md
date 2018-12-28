This page contains a collection of troubleshooting techniques.

## SDM registration

To answer questions like:

* Where is my SDM running?
* What version of my SDM is running?

You can gather information in multiple ways:

*  Check the [web interface](team.md#See-your-SDM-registration) 
*  run the command: "describe sdm your-sdms-name" (If you aren't sure of the name, try "describe sdm" and check the help message.)
*  run the command: "show skills"

## atomist feed

### Lifecycle listener is already running

If you type `atomist feed` and is says you have one already running, then something is listening on port 6660.
When I get this, I go look in my other terminal windows for a running feed, and use that one or Ctrl-C out of it.

If that doesn't work, I find out what process is on port 6660 and kill it. On Mac: `lsof -i :6660` to find the process, then
see its PID and pass that to `kill`.