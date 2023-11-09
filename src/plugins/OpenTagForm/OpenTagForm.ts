/*globals define*/
/*eslint-env node, browser*/
/// <amd-module />

import PluginBase from "plugin/PluginBase";
import pluginMetadata from "./metadata.json";

interface CommitVersion {
  commit: string;
}
interface BranchVersion {
  branch: string;
}
interface TagVersion {
  tag: string;
}
type NamedVersion  = CommitVersion | BranchVersion | TagVersion;

  export default class OpenTagForm extends PluginBase {
    branchName: string;
    commitHash: string;  // TODO: Remove these since they should be defined on PluginBase
    static metadata: GmeCommon.Metadata;

    constructor() {
      super();
      this.branchName = '';  // This isn't set in the upstream ctor anyway
      this.commitHash = '';
      this.pluginMetadata = pluginMetadata;
    }

    async main() {
      const baseUrl = window.location.href.replace(/\?.*$/, "");
      const versionString = await this.getVersionString();
      const url = baseUrl +
        "routers/TagCreator/" +
        encodeURIComponent(this.project.projectId) +
        "/" +
        versionString +
        "/" +
        encodeURIComponent(this.core.getPath(this.activeNode)) +
        "/static/index.html";

      window.open(url, "TagForm");
      this.result.setSuccess(true);
    }

    async getVersionString() {
      return Object.entries(await this.getProjectVersion())
        .map(([name, value]) => name + "/" + encodeURIComponent(value))
        .pop();
    }

    async getProjectVersion(): Promise<NamedVersion>{
      const tags = await this.project.getTags();
      const currentTag = Object.entries(tags).find(
        ([_tag, commit]) => commit === this.commitHash,
      );

      if (currentTag) {
        return {tag: currentTag[0]};
      } else if (this.branchName) {
        return {branch: this.branchName};
      }else{
        return {commit: this.commitHash};
      }
    }
  }

OpenTagForm.metadata = pluginMetadata;

