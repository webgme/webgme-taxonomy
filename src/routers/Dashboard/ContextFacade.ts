import type { GmeContext } from "../../common/types";
import { isTypeOf } from "../Search/adapters";
import { HostUri } from "../Search/adapters/PDP";

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

  async getHostUriToNodePath() {
    const { core } = this.context;
    const result: { [hostId: string]: string } = {};
    const contentTypeNodes = await this.getContentTypeNodes();

    for (const contentTypeNode of contentTypeNodes) {
      const path = core.getPath(contentTypeNode);
      const storageNode = (await core.loadChildren(contentTypeNode)).find((
        child,
      ) => isTypeOf(core, child, "Storage"));

      if (!storageNode) {
        console.warn(
          "Storage node missing for contentTypeNode at [" + path + "]",
        );
        continue;
      }

      const adapterType = core.getAttribute(
        core.getMetaType(storageNode),
        "name",
      );

      const adapterName = adapterType?.toString().toLowerCase();

      if (adapterName === "mongodb") {
        let uri = core.getAttribute(storageNode, "URI") as string;
        const collection = core.getAttribute(storageNode, "collection");
        if (!uri || !collection) {
          console.warn(
            "Storage node misses mongo attributes for content-type at [" +
              path + "]",
          );
          continue;
        }

        uri = uri.endsWith("/") ? uri : uri + "/";

        result[uri + collection] = path;
      } else if (adapterName === "pdp") {
        let url = core.getAttribute(storageNode, "URL") as string;
        const processType = core.getAttribute(storageNode, "processType");
        if (!url || !processType) {
          console.warn(
            "Storage node misses pdp attributes for content-type at [" + path +
              "]",
          );
          continue;
        }

        url = url.endsWith("/") ? url : url + "/";

        result[HostUri.hostUrlToHostUri(url + processType)] = path;
      } else {
        console.warn(
          "Storage node has unexpected adpter type [" + adapterName +
            "] for content-type at [" + path + "]",
        );
        continue;
      }
    }

    return result;
  }
}
