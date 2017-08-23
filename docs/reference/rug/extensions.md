Rug extensions represent different types of source code, events, and
systems which Rug can understand and interact with.  Each Rug
extension defines a set of operations you can use to get and
modify the system or language it represents.


A fundamental Rug extension is `Project`.  `Project` represents a
source code repository and allows you get information about the
repository, e.g., if a file exists, and to alter the repository, e.g.,
add or delete a file.

Rug ships with a number of extensions for basic concepts around
projects, file systems, and common languages, making it *much* simpler
to begin writing your Rugs.  More information on the various
extensions that ship with Rug and the methods they make available can
be found in the extension reference documentation
for [projects][project-typedoc] and [handlers][handler-typedoc].

[project-typedoc]: http://apidocs.atomist.com/typedoc/rug/
[handler-typedoc]: http://apidocs.atomist.com/typedoc/cortex/


Atomist makes several Rug extensions available to all its users.  Many
of the standard extensions provide understanding and operations to
alter common software development languages like Java, C#, Python,
Clojure, and Scala.  Other extensions provide connectivity to common
software development tools like CI platforms. You can also write your own Rug extensions.





