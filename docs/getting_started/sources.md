Vulnerabilities and advisories in the Atomist Vulnerability Database are being continuously sourced. We currently process, enrich, transform and ingest vulnerabilities and advisories from sources including:

|  | Name | URL |
| :----: | ---- | --- |
| `alpine` | Alpine secdb | https://secdb.alpinelinux.org/ | 
| `amazon` | Amazon Linux Security Center | https://alas.aws.amazon.com/ |
| `debian` | Debian Security Bug Tracker | https://security-tracker.debian.org/tracker/ |
| `nist` | National Vulnerability Database | https://nvd.nist.gov/ |
| `redhat` | RedHat Security Data | https://www.redhat.com/security/data/metrics/ |
| `ubuntu` | Ubuntu CVE Tracker | https://people.canonical.com/~ubuntu-security/cve/ |
| `suse` | SUSE Security CVRF | http://ftp.suse.com/pub/projects/security/cvrf/ |
| `github` | GitHub Advisory Database | https://github.com/advisories/ |
| `gitlab` | GitLab Advisory Database | https://gitlab.com/gitlab-org/advisories-community/ |
| `golang` | Golang VulnDB | https://github.com/golang/vulndb |
| `rustsec` | RustSec Advisory Database | https://github.com/rustsec/advisory-db |
| `pypa` | Python Packaging Advisory Database | https://github.com/pypa/advisory-database |

The ingestion process for vulnerabilities and advisories operates around the clock and on incremental diffs detected in the source systems making updates immediately available to users of the database. Our ingestion architecture is pluggable, allowing us to incorporate new advisory streams within a consistent model. We see the ingestion process and our database as significant competitive differentiators.

During ingestion, source advisory records are transformed into a common, proprietary data format. This transformation includes urls, references to CWEs, scoring data and most importantly vulnerable version ranges and fix versions. 

In order to support matching vulnerabilities and advisories to software packages - commonly identified by purls - we create our own internal `advisory-url`. The `advisory-url` can be created using package information from vendor advisories like Debian, Alpine and open source vulnerability databases like GitHub and GitLab. With the help of the `advisory-url`, we can identify potentially affected packages with a very fast index lookup.

Once packages are identified via the `advisory-url` search, the database uses a proprietary algorithm to check if a package version satisfies the vulnerable version range of an advisory. 

Additionally we normalize version ranges as provided in vendor advisories. This is important as we deal with a variety of versioning systems, e.g. [SemVer for NPM,](https://github.com/npm/node-semver#ranges) [Maven versioning](https://maven.apache.org/pom.html#Dependency_Version_Requirement_Specification) or [Debian](https://www.debian.org/doc/debian-policy/ch-controlfields.html#version) package versioning for Debian and Ubuntu based images.
