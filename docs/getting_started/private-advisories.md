## Contributing Advisories

### Adding/updating Advisories

Users can create their own vulnerabilities and advisories by following the steps outlined below:

* Create a repository called `atomist-advisories` in an GitHub organzation/user that has the Atomist GitHub App installed making sure that the app has read access to the repository.
* In the default branch of `atomist-advisories` repository, add a new JSON file called `<source>/<source id>.json` where `source` should be the name of your company and `source-id` has to be a unique id for the advisory within `source`.  
* The content of the JSON file must strictly follow the schema defined in [Open Source Vulnerability (OSV) format](https://ossf.github.io/osv-schema/). Take a look at the [GitHub Advisory Database](https://github.com/github/advisory-database/tree/main/advisories/github-reviewed) for examples of advisories. 

### Deleting Advisories

Deleting an advisory from the database can be achieved by removing the corresponding JSON advisory file from the `atomist-advisories` repository. 

> 💡 Only additions, changes and removals of JSON advisory files in the repository's default branch are being processed and mirrored into the database.

