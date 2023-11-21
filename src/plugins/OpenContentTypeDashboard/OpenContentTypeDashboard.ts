/*globals define*/
/*eslint-env node, browser*/

/**
 * This is a simple (client-side) plugin that opens the content type dashboard in a new tab.
 */

import PluginBase from "plugin/PluginBase";
import { getVersionString } from "../../common/plugins/Utils";
import pluginMetadata from "./metadata.json";

export default class OpenContentTypeDashboard extends PluginBase {
  static metadata: GmeCommon.Metadata;

  constructor() {
    super();
    this.pluginMetadata = pluginMetadata;
  }

  async main() {
    const baseUrl = window.location.href.replace(/\?.*$/, "");
    console.log("project id:", this.project.projectId);
    const versionString = await getVersionString(this.project, {
      /// @ts-ignore
      commitHash: this.commitHash,
      /// @ts-ignore
      branchName: this.branchName,
    });
    const url = baseUrl +
      "routers/Dashboard/" +
      encodeURIComponent(this.project.projectId) +
      "/" +
      versionString +
      "/static/index.html";
    window.open(url, "ContentTypeDashboard");
    this.result.setSuccess(true);
  }
}

OpenContentTypeDashboard.metadata = pluginMetadata;
