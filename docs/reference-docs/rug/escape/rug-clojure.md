## Escaping into Clojure through Clojure Blocks

In addition to JavaScript, it is also possible to use Clojure for parts of your Rug Editors and Generators by implementing a Clojure Script block that is naturally demarcated with `()`. A Clojure Script block also requires a function to be defined that takes two parameters that are the `project` and additional `identifiers`:

```
editor Walter

param text: .*
param message: .*

((defn workOn [project, identifiers]
   (doseq [file (.files project)]
        (if (.isJava file)
            (.append file (.get (.get identifiers "text")))))))
```
