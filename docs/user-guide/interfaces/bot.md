Presently, the best introduction to interacting with the Atomist Bot
is to watch this video.

<div class="ss-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/B_x43nPoDH4" frameborder="0" allowfullscreen></iframe>
</div>

## Search

The Atomist Bot can be used to search for Rugs.

To see the list of available generators to your team, ask the bot for
them:

```
@atomist generators
```

This will return a truncated list of generators.  You can refine your
search by appending filter words to the command. For instance, to
search for generators for Java and Spring:

```
@atomist generators java spring
```

Similarly, you can search for available editors using the `editors`
command

```
@atomist editors
```

and refine the search by appending search terms.

```
@atomist editors python
```

## Generators

The Atomist Bot can run generators for you, creating new projects for
you in GitHub.  To have the Atomist Bot create a project for you, you
must first search for and find the generator you want to run.  Once
you have found the generator you want to run, click the "Generate
project" button below the generator.  The bot will start a thread
discussion with you asking for this generator's parameters until you
complete the exchange.  Once generated, the bot will inform you of the
URL where to find your new project.
