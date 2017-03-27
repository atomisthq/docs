While the primary development language for Rugs is [TypeScript][ts],
any language that can be compiled into JavaScript can be used to
develop Rugs.  Rug code is transpiled into JavaScript and executed in
the [JVM][jvm] using [Nashorn][nashorn].

[ts]: https://www.typescriptlang.org/
[jvm]: https://en.wikipedia.org/wiki/Java_virtual_machine
[nashorn]: https://en.wikipedia.org/wiki/Nashorn_(JavaScript_engine)

Since Rugs are executed in Nashorn, there are some things to keep in
mind.

-   Single-threaded runtime
-   Do not use callbacks
-   Do not operate on the file system, use the `Project` object passed
    in
-   Some [Node][node] modules may not behave as you expect

[node]: https://nodejs.org/
