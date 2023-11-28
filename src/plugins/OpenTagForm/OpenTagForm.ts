/*globals define*/

import PluginBase from "plugin/PluginBase";
import { getVersionString } from "../../common/plugins/Utils";
import pluginMetadata from "./metadata.json";

export default class OpenTagForm extends PluginBase {
  static metadata: GmeCommon.Metadata;

  constructor() {
    super();
    this.pluginMetadata = pluginMetadata;
  }

  async main() {
    const baseUrl = window.location.href.replace(/\?.*$/, "");
    const versionString = await getVersionString(this.project, {
      /// @ts-ignore
      commitHash: this.commitHash,
      /// @ts-ignore
      branchName: this.branchName,
    });
    const url = baseUrl +
      "routers/TagCreator/" +
      //@ts-ignore
      encodeURIComponent(this.project.projectId) +
      "/" +
      versionString +
      "/" +
      //@ts-ignore
      encodeURIComponent(this.core.getPath(this.activeNode)) +
      "/static/index.html";

    window.open(url, "TagForm");
    //@ts-ignore
    this.result.setSuccess(true);
  }
}

OpenTagForm.metadata = pluginMetadata;
