## Contents of the `/project` directory

The contents of the /project directory is current processed using the [Velocity template engine](http://velocity.apache.org/).

> ***NOTE:*** Other templating approaches are on the roadmap.

### Static and Template Content

Static content will be copied in place to output, respecting directory structure.

Template content is distinguished by files having an ***_.vm*** suffix. Such files must be in VTL. They will be processed by Velocity, with the suffix being stripped before output. For example, `MyClass.java_.vm` will be merged to produce `MyClass.java` in the same directory.

Variables used are parameters or computed parameters specified in the template. They are identified to be used by Velocity's $ prefix:

```java
package $package_name;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class $application_class_name {

    public static void main(String[] args) {
        SpringApplication.run(${application_class_name}.class, args);
    }
}
```

#### Templated Filenames

Template parameters can also be used in file names. 

For example, `${base_source_path}:${package_path}:${application_class_name}.java_.vm` could be expanded to `src/main/java/com/mycompany/mypackage/MyApplication.java`.