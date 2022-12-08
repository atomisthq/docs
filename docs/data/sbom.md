| attribute | type | doc |
| :---- | :---- | :---- |
| :artifact/dependencies | ref | List of package dependencies for a package artifact. |
| :artifact/package | ref | Reference to an artifact representing a package (for example, a static binary file). |
| :package/advisory-url | string | Prefix URL to quickly join with advisories, e.g. adv:deb/ubuntu/curl?os_name=debian&os_version=3 |
| :package/author | string | The package author. |
| :package/description | string | Package description |
| :package/digests | tuple | Type-value mappings. |
| :package/homepage | string | URL to the package homepage |
| :package/licenses | string | License IDs, as per https://spdx.org/licenses/ |
| :package/name | string | The package name. |
| :package/namespace | string | The package namespace. |
| :package/qualifiers | tuple | Name-value pairs. |
| :package/scheme | string | The package scheme. |
| :package/size | long | Package size |
| :package/subpath | string | The package subpath. |
| :package/type | string | The package type. |
| :package/url | string | The identity string of a package, e.g. pkg:maven/atomist/common-clj@1.2.3 |
| :package/version | string | The package version. |
| :package.dependency/dependencies | ref | Dependencies of this dependency. |
| :package.dependency/files | ref | Package files. |
| :package.dependency/package | ref | The package being imported as a dependency in this instance. |
| :package.dependency/parent | ref | The dependency owner, e.g. a Docker image. |
| :package.dependency/scopes | string | A package dependency type (how it is used by another package, e.g. test, dev, etc). |
| :package.dependency.package/digests | tuple | Type-value mappings as seen by the transactor. |
| :package.file/digest | string | Blob digest of the file within the image. |
| :package.file/id | string | A package file ID. |
| :package.file/path | string | The path of the file within the image. |
| :project/dependencies | ref | Package dependencies and their type, as specified in the project's dependency management file. |
| :project/effective-dependencies | ref | Effective package dependencies, as specified in the project's dependency management file. |
| :project.dependency/package | ref | Reference to a direct dependency used in a project. |
| :project.dependency/scope | string | The type of a direct dependency (how it is used, e.g. test, dev, etc). |
| :sbom/indexing-count | long | Count of attempts to index an image |
| :sbom/last-updated | instant | SBOM last updated |
| :sbom/package-count | long | Total count of packages indexed on image |
| :sbom/state | ref | Attribute to indicate whether an artifact got indexed. |
| :sbom/version | string | SBOM version |