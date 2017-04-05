!!! hint "Fully qualified Rug names"
    The `name` of an instruction can either be a simple name, or a fully
    qualified name. A fully qualified name is prefixed by a Maven `groupId`
    and `artifactId`. For example `com.atomist:atomist-rugs:AddTypeScriptEditor`.
    This informs the Rug runtime that the required Rug depedency should be found
    in an external Rug archive, whose version can be found from the `manifest.yml`
    file in the same [Rug archive][archives].

[archives]: archives.md
