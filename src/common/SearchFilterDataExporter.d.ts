import { GmeContentContext } from "./types";

declare namespace DashboardConfiguration {
  interface VocabularyTermSchema {
    id: string;
    name: string;
    type: string;
    children: VocabularyTermSchema;
  }

  interface ContentTypeConfiguration {
    nodePath: string;
    name: string;
    vocabularies: VocabularyTermSchema[];
    content: ContentTypeConfiguration;
  }

  type DashboardConfiguration = {
    name: any;
    content: ContentTypeConfiguration;
    project?: GmeContentContext["projectVersion"];
    contentTypePath?: string;
  };

  export function from(
    core: GmeClasses.Core,
    contentType: Core.Node,
  ): Promise<DashboardConfiguration>;
}

export default DashboardConfiguration;
