Rug extensions represent different types of source code, events, and
systems which Rug can understand and interact with.  Each Rug
extension defines a set of operations you can use to get and
modify the system or language it represents.

Rug ships with a number of extensions for basic concepts around
projects, file systems, and common languages, making it *much* simpler
to begin writing your Rugs.  More information on the various
extensions that ship with Rug and the methods they make available can
be found in the [extension reference documentation][typedoc].  Here
are some of the useful extensions that ship with Rug:

-   [CSharpFile](http://apidocs.atomist.com/typedoc/interfaces/csharpfile.html) - C# files
-   [File](http://apidocs.atomist.com/typedoc/interfaces/file.html) - manipulate simple text files
-   [JavaProject](http://apidocs.atomist.com/typedoc/interfaces/javaproject.html) - Java projects
-   [JavaSource](http://apidocs.atomist.com/typedoc/interfaces/javasource.html) - Java source files
-   [JavaType](http://apidocs.atomist.com/typedoc/interfaces/javatype.html) - Java classes
-   [Line](http://apidocs.atomist.com/typedoc/interfaces/line.html) - manipulate specific lines in a project's files
-   [Pom](http://apidocs.atomist.com/typedoc/interfaces/pom.html) - projects containing Maven POM files
-   [Project](http://apidocs.atomist.com/typedoc/interfaces/project.html) - execute operations across a project
-   [Properties](http://apidocs.atomist.com/typedoc/interfaces/properties.html) - Java properties files
-   [PythonFile](http://apidocs.atomist.com/typedoc/interfaces/pythonfile.html) - Python source files
-   [PythonRequirementsTxt](http://apidocs.atomist.com/typedoc/interfaces/pythonrequirementstxt.html) - Python `requirements.txt` files
-   [ScalaFile](http://apidocs.atomist.com/typedoc/interfaces/scalafile.html) - Scala files
-   [SpringBootProject](http://apidocs.atomist.com/typedoc/interfaces/springbootproject.html) - Spring Boot projects
-   [Xml](http://apidocs.atomist.com/typedoc/interfaces/xml.html) - XML files
-   [YamlFile](http://apidocs.atomist.com/typedoc/interfaces/yamlfile.html) - YAML files

[typedoc]: http://apidocs.atomist.com/typedoc/

You can also write your own Rug extensions.
