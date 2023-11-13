import type { GmeContext } from "../../common/types";

export default class ContextFacade {
  constructor(protected context: GmeContext) {}

  async getContentTypeNodes() {
    const { core, root } = this.context;
    const metanodes = core.getAllMetaNodes(root);
    const contentTypeMetanodes = Object.values(metanodes)
      .filter((node) => core.getAttribute(node, "name") === "Content Type");
    const children = await core.loadChildren(root);
    return children.filter((child) =>
      contentTypeMetanodes.some((mn) => core.isTypeOf(child, mn))
    );
  }

  async getProjectInfo() {
    const { project: { projectName }, core } = this.context;
    const contentTypeNodes = await this.getContentTypeNodes();
    return {
      name: projectName,
      contentTypes: contentTypeNodes.map((node) => ({
        name: core.getAttribute(node, "name"),
        path: core.getPath(node),
      })),
    };
  }
}
