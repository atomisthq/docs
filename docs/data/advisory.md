| attribute | type | doc |
| :---- | :---- | :---- |
| :vulnerability/advisories | ref | refs to :vulnerability/advisory |
| :vulnerability/cve-id | string | CVE ids if available and different to source-id CVE-2021-2313 |
| :vulnerability/cwes | ref | refs to :vulnerability/cwe |
| :vulnerability/description | string | description text of the vulnerability |
| :vulnerability/published-at | instant | timestamp of initial publication |
| :vulnerability/references | ref | refs to :vulnerability/reference |
| :vulnerability/source | string | e.g. github, nist, ubuntu, debian, alpine, npm |
| :vulnerability/source-id | string | external id of the vulnerability like CVE-2021-2313 or GHSA-93q8-gq69-wqmw |
| :vulnerability/summary | string | summary text of the vulnerability |
| :vulnerability/updated-at | instant | timestamp of last update |
| :vulnerability/urls | ref | refs to :vulnerability/url |
| :vulnerability/withdrawn-at | instant | timestamp when vulnerability was withdrawn |
| :vulnerability.advisory/id | string | id of advisory |
| :vulnerability.advisory/name | string | same as :package/name log4j |
| :vulnerability.advisory/namespace | string | opt: same as :package/namespace e.g. org.apache.commons-logging |
| :vulnerability.advisory/qualifiers | tuple | Name value pairs - same as :package/qualifiers |
| :vulnerability.advisory/type | string | same as :package/type e.g. npm, maven |
| :vulnerability.advisory/url | string | url representing advisories for the same packages... e.g. adv://maven/org.clojure/clojure?os_name=alpine&os_version=1.2.3 |
| :vulnerability.advisory/versions | ref | refs to :vulnerability.advisory/version |
| :vulnerability.advisory.version/fixed-by | string | versions that first fixes this |
| :vulnerability.advisory.version/id | string | id of this version |
| :vulnerability.advisory.version/vulnerable-range | string | range of vulnerable versions |
| :vulnerability.cpe.part/application | enum | null |
| :vulnerability.cpe.part/operating-system | enum | null |
| :vulnerability.cve/created | instant | initial creation of cve record |
| :vulnerability.cve/cvss-score | string | [link to cvss score definition](https://en.wikipedia.org/wiki/Common_Vulnerability_Scoring_System) |
| :vulnerability.cve/description | string | vulnerability description (long) |
| :vulnerability.cve/effective-severity | ref | TODO - need a link for this definition |
| :vulnerability.cve/fix-available | boolean | whether it's possible to upgrade to a version without this vulnerability |
| :vulnerability.cve/last-updated | instant | last update to cve record |
| :vulnerability.cve/severity | ref | enum of vulnerabilty severity |
| :vulnerability.cve/source | string | source database for the vulnerability |
| :vulnerability.cve/source-id | string | unique identifier for cve |
| :vulnerability.cve/title | string | vulnerability title (short) |
| :vulnerability.cve/url | string | http url for the cve |
| :vulnerability.cve.severity/CRITICAL | enum | vulnerabiltiy may be exploitable by external parties, or provide attacker with privileged access |
| :vulnerability.cve.severity/HIGH | enum | difficult to exploit but can still lead to elevated privilege for the attacker |
| :vulnerability.cve.severity/LOW | enum | vulnerabilty is difficult to exploit or have little impact if exploited |
| :vulnerability.cve.severity/MEDIUM | enum | exploitation is difficult - requries some form of social engineering or local network access |
| :vulnerability.cve.severity/MINIMAL | enum | TODO - atlassian and redhat are no longer including this severity |
| :vulnerability.cve.severity/SEVERITY_UNSPECIFIED | enum | during triage, vulnerabilities may not have severities |
| :vulnerability.cwe/name | string | name of CWE like Out-of-bounds Read |
| :vulnerability.cwe/source-id | string | external id of CWE |
| :vulnerability.cwe/summary | string | summary of CWE |
| :vulnerability.cwe/url | ref | ref to :vulnerability/url |
| :vulnerability.reference/id | string | id of reference |
| :vulnerability.reference/scores | ref | refs to scores as observed by the source |
| :vulnerability.reference/source | string | source of reference |
| :vulnerability.reference.score/type | string | type of recorded score, like cvss2 or cvss2_vector |
| :vulnerability.reference.score/value | string | value of recorded score |
| :vulnerability.report/critical | long | number of critical vulnerability advisories linked to this artifact |
| :vulnerability.report/high | long | number of high severity vulnerability advisories linked to this artifact |
| :vulnerability.report/last-updated | instant | timestamp when an updated advisory last impacted this artifact |
| :vulnerability.report/low | long | number of low severity vulnerability advisories linked to this artifact |
| :vulnerability.report/medium | long | number of medium severity vulnerability advisories linked to this artifact |
| :vulnerability.report/package | ref | Ref to the artifact having the vulnerabilities; eg. :docker/image |
| :vulnerability.report/state | ref | Attribute to indicate if state of report |
| :vulnerability.report/total | long | total number of vulnerability advisories currently linked to this artifact |
| :vulnerability.report/unspecified | long | number of vulnerability advisories, with an unspecificed severity, linked to this artifact |
| :vulnerability.report.state/STALE | enum |  |
| :vulnerability.report.state/UP_TO_DATE | enum |  |
| :vulnerability.url/name | string | name/identifier of url like nist |
| :vulnerability.url/tags | string | tags on the url like Vendor Advisory |
| :vulnerability.url/value | string | actual url |