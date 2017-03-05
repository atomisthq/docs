The Rug CLI is able to run Rugs locally against projects on your local
file system.

## Search

To find available generators with the CLI, run the following command.

```console
$ rug search --operations --type generator
Resolving version range for com.atomist:rug:(0.12.9,0.13.1) completed
Resolving dependencies for com.atomist:rug:0.13.0-SNAPSHOT completed
  Searching https://api.atomist.com/catalog/operation/search
Searching catalogs completed

→ Remote Archives (18 archives found)
  atomist-rugs:flask-service [public] (0.1.2)
    Generators
    └── NewFlaskMicroserviceProject
  atomist-rugs:rug-project [public] (0.2.0)
    Generators
    ├── NewRugProject
    └── NewStarterRugProject
  atomist-rugs:spring-boot-rest-service [public] (0.7.1)
    Generators
    └── NewSpringBootRestService
...
```

The output informs you about the name of the Rug generator and which
Rug archive it lives in.

## Generators

You can create new projects on your local machine using the CLI, for instance:

```
$ cd ~/workspace
$ rug generate atomist-rugs:rug-project:NewStarterRugProject my-new-generator
```

The first argument is always the project name.

!!! tip
    Whenever you run a Rug Generator, the `rug CLI` downloads the archive on the
    fly before applying it. There is no specific `download` command.
