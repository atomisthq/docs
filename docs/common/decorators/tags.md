All Rugs should be annotated with one or more `#!typescript @Tags` 
[decorators][decorators] to optimize their discoverability. For 
example if you were to create an Rug that alters a README file
then the following `#!typescript @Tags` would be applicable:

```typescript
@Tags("readme", "documentation")
```

Tag values should consist of only lower case letters, numbers, and
dashes (`-`).

If possible, try to include at least one of the tags on your Rug maps to an image
for a nicer rendering.  The following tags currently have images:
`docker`,`github`, `travis-ci`, `apache`, `git`, `spring-boot`,
`spring`, `clojure`, `go`, `java`, `python`, `scala`, and
`documentation`.

[decorators]: https://www.typescriptlang.org/docs/handbook/decorators.html
