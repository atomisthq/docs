import { EditProject } from "@atomist/rug/operations/ProjectEditor"
import { Editor, Tags, Parameter } from "@atomist/rug/operations/Decorators"
import { Project } from '@atomist/rug/model/Core'

@Editor("SimpleSampleEditor","A simple sample Rug TypeScript editor")
@Tags("simple")
class MySimpleEditor implements EditProject{

    @Parameter({description: "Text to be added to the README.md", pattern: "@any"})
    description: string = "Hello, Rug TypeScript World!"

    edit(project: Project) {
        project.addFile("README.md", this.description);
    }
}

export let simple = new MySimpleEditor()
