/*globals define*/
/*eslint-env node, browser*/

/**
 * This is a simple (client-side) plugin that opens the content type dashboard in a new tab.
 */

define(["text!./metadata.json", "plugin/PluginBase"], function (
  pluginMetadata,
  PluginBase
) {
  "use strict";

  pluginMetadata = JSON.parse(pluginMetadata);

  /**
   * Initializes a new instance of OpenContentTypeDashboard.
   * @class
   * @augments {PluginBase}
   * @classdesc This class represents the plugin OpenContentTypeDashboard.
   * @constructor
   */
  class OpenContentTypeDashboard extends PluginBase {
    constructor() {
      super();
      this.pluginMetadata = pluginMetadata;
    }

    async main() {
      const baseUrl = window.location.href.replace(/\?.*$/, "");
      console.log("project id:", this.project.projectId);
      const versionString = await this.getVersionString();
      const url =
        baseUrl +
        "routers/Dashboard/" +
        encodeURIComponent(this.project.projectId) +
        "/" +
        versionString +
        "/static/index.html";
      window.open(url, "ContentTypeDashboard");
      this.result.setSuccess(true);
    }

    async getVersionString() {
      return Object.entries(await this.getVersion())
        .map(([name, value]) => name + "/" + encodeURIComponent(value))
        .pop();
    }

    async getVersion() {
      const versionInfo = {};
      const tags = await this.project.getTags();
      const currentTag = Object.entries(tags).find(
        ([tag, commit]) => commit === this.commitHash
      );

      if (currentTag) {
        versionInfo.tag = currentTag[0];
      } else if (this.branchName) {
        versionInfo.branch = this.branchName;
      } else {
        versionInfo.commit = this.commitHash;
      }

      return versionInfo;
    }
  }

  OpenContentTypeDashboard.metadata = pluginMetadata;

  return OpenContentTypeDashboard;
});
