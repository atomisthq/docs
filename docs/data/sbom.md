### Attributes
| attribute | type | doc | entities |
| :---- | :---- | :---- | :----- |
| :package/advisory-url | string | Prefix URL to quickly join with advisories, e.g. adv:deb/ubuntu/curl?os_name=debian&os_version=3 | :package |
| :package/author | string | The package author. | :package |
| :package/description | string | Package description | :package |
| :package/digests | tuple | Type-value mappings. |  |
| :package/homepage | string | URL to the package homepage | :package |
| :package/licenses | string | License IDs, as per https://spdx.org/licenses/ | :package |
| :package/name | string | The package name. | :package |
| :package/namespace | string | The package namespace. | :package |
| :package/qualifiers | tuple | Name-value pairs. |  |
| :package/scheme | string | The package scheme. |  |
| :package/size | long | Package size | :package |
| :package/subpath | string | The package subpath. |  |
| :package/type | string | The package type. | :package |
| :package/url | string | The identity string of a package, e.g. pkg:maven/atomist/common-clj@1.2.3 | :package |
| :package/version | string | The package version. | :package |
| :package.dependency/scopes | string | A package dependency type (how it is used by another package, e.g. test, dev, etc). | :package/dependency |
| :package.dependency.package/digests | tuple | Type-value mappings as seen by the transactor. |  |
| :package.file/digest | string | Blob digest of the file within the image. | :package/file |
| :package.file/id | string | A package file ID. | :package/file |
| :package.file/path | string | The path of the file within the image. | :package/file |
| :project.dependency/scope | string | The type of a direct dependency (how it is used, e.g. test, dev, etc). | :project/dependency |
| :sbom/indexing-count | long | Count of attempts to index an image | :docker/image |
| :sbom/last-updated | instant | SBOM last updated | :docker/image |
| :sbom/package-count | long | Total count of packages indexed on image | :docker/image |
| :sbom/version | string | SBOM version | :docker/image |
### Relationships
| attribute | doc | from | to |
| :---- | :---- | :---- | :----- |
| :artifact/dependencies | List of package dependencies for a package artifact. | :docker/image | :package/dependency |
| :artifact/package | Reference to an artifact representing a package (for example, a static binary file). |  |  |
| :package.dependency/dependencies | Dependencies of this dependency. |  |  |
| :package.dependency/files | Package files. | :package/dependency | :package/file |
| :package.dependency/package | The package being imported as a dependency in this instance. | :package/dependency | :package |
| :package.dependency/parent | The dependency owner, e.g. a Docker image. | :package/dependency | :docker/image |
| :project/dependencies | Package dependencies and their type, as specified in the project's dependency management file. | :package | :project/dependency |
| :project/effective-dependencies | Effective package dependencies, as specified in the project's dependency management file. |  |  |
| :project.dependency/package | Reference to a direct dependency used in a project. | :project/dependency | :package |
| :sbom/state | Attribute to indicate whether an artifact got indexed. |  |  |