import { WebgmeContext } from "./types";

declare namespace DashboardConfiguration {
  type DashboardConfiguration = {
    name: any,
    storage: any,
    taxonomy: {
      id: any,
      name: any,
      children: any,
    },
    project?: WebgmeContext['projectVersion'],
    contentTypePath?: string,
  };

  export function from(core: GmeClasses.Core, contentType: Core.Node): Promise<DashboardConfiguration>;
  
  export class ContentTypeExporter {
    constructor(name: any, vocabularies: any);
    static from(core: any, contentTypeNode: any): Promise<ContentTypeExporter>;
  }
}

export default DashboardConfiguration;
