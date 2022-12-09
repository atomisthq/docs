### Attributes
| attribute | type | doc | entities |
| :---- | :---- | :---- | :----- |
| :vulnerability/aliases | string | Aliases for CVEs, like #Log4Shell |  |
| :vulnerability/cve-id | string | CVE ids if available and different to source-id CVE-2021-2313 | :vulnerability |
| :vulnerability/description | string | description text of the vulnerability | :vulnerability |
| :vulnerability/published-at | instant | timestamp of initial publication | :vulnerability |
| :vulnerability/source | string | e.g. github, nist, ubuntu, debian, alpine, npm | :vulnerability |
| :vulnerability/source-id | string | external id of the vulnerability like CVE-2021-2313 or GHSA-93q8-gq69-wqmw | :vulnerability |
| :vulnerability/state | ref | Attribute to indicate state of vulnerability |  |
| :vulnerability/summary | string | summary text of the vulnerability |  |
| :vulnerability/updated-at | instant | timestamp of last update | :vulnerability |
| :vulnerability/withdrawn-at | instant | timestamp when vulnerability was withdrawn |  |
| :vulnerability.advisory/id | string | id of advisory | :vulnerability/advisory |
| :vulnerability.advisory/name | string | same as :package/name log4j |  |
| :vulnerability.advisory/namespace | string | opt: same as :package/namespace e.g. org.apache.commons-logging |  |
| :vulnerability.advisory/qualifiers | tuple | Name value pairs - same as :package/qualifiers |  |
| :vulnerability.advisory/state | ref | Attribute to indicate state of advisory |  |
| :vulnerability.advisory/type | string | same as :package/type e.g. npm, maven |  |
| :vulnerability.advisory/url | string | url representing advisories for the same packages... e.g. adv://maven/org.clojure/clojure?os_name=alpine&os_version=1.2.3 | :vulnerability/advisory |
| :vulnerability.advisory.version/fixed-by | string | versions that first fixes this | :vulnerability.advisory/version |
| :vulnerability.advisory.version/id | string | id of this version | :vulnerability.advisory/version |
| :vulnerability.advisory.version/vulnerable-range | string | range of vulnerable versions | :vulnerability.advisory/version |
| :vulnerability.cwe/name | string | name of CWE like Out-of-bounds Read |  |
| :vulnerability.cwe/source-id | string | external id of CWE | :vulnerability/cwe |
| :vulnerability.cwe/summary | string | summary of CWE |  |
| :vulnerability.reference/id | string | id of reference | :vulnerability/reference |
| :vulnerability.reference/source | string | source of reference | :vulnerability/reference |
| :vulnerability.reference.score/type | string | type of recorded score, like cvss2 or cvss2_vector | :vulnerability.reference/score |
| :vulnerability.reference.score/value | string | value of recorded score | :vulnerability.reference/score |
| :vulnerability.report/critical | long | number of critical vulnerability advisories linked to this artifact | :vulnerability/report |
| :vulnerability.report/high | long | number of high severity vulnerability advisories linked to this artifact | :vulnerability/report |
| :vulnerability.report/last-updated | instant | timestamp when an updated advisory last impacted this artifact | :vulnerability/report |
| :vulnerability.report/low | long | number of low severity vulnerability advisories linked to this artifact | :vulnerability/report |
| :vulnerability.report/medium | long | number of medium severity vulnerability advisories linked to this artifact | :vulnerability/report |
| :vulnerability.report/state | ref | Attribute to indicate state of report |  |
| :vulnerability.report/total | long | total number of vulnerability advisories currently linked to this artifact | :vulnerability/report |
| :vulnerability.report/unspecified | long | number of vulnerability advisories, with an unspecificed severity, linked to this artifact | :vulnerability/report |
| :vulnerability.url/name | string | name/identifier of url like nist | :vulnerability/url |
| :vulnerability.url/tags | string | tags on the url like Vendor Advisory | :vulnerability/url |
| :vulnerability.url/value | string | actual url | :vulnerability/url |

### Relationships

| attribute | doc | from | to |
| :---- | :---- | :---- | :----- |
| :vulnerability/advisories | refs to :vulnerability/advisory | :vulnerability | :vulnerability/advisory |
| :vulnerability/cwes | refs to :vulnerability/cwe | :vulnerability | :vulnerability/cwe |
| :vulnerability/references | refs to :vulnerability/reference | :vulnerability | :vulnerability/reference |
| :vulnerability/urls | refs to :vulnerability/url | :vulnerability | :vulnerability/url |
| :vulnerability.advisory/versions | refs to :vulnerability.advisory/version | :vulnerability/advisory | :vulnerability.advisory/version |
| :vulnerability.cwe/url | ref to :vulnerability/url |  |  |
| :vulnerability.reference/scores | refs to scores as observed by the source | :vulnerability/reference | :vulnerability.reference/score |
| :vulnerability.report/package | Ref to the artifact having the vulnerabilities; eg. :docker/image | :vulnerability/report | :docker/image |