/*globals define*/

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
type NamedVersion = CommitVersion | BranchVersion | TagVersion;

export default class OpenTagForm extends PluginBase {
  static metadata: GmeCommon.Metadata;

  constructor() {
    super();
    this.pluginMetadata = pluginMetadata;
  }

  async main() {
    const baseUrl = window.location.href.replace(/\?.*$/, "");
    const versionString = await this.getVersionString();
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

  async getVersionString(): Promise<string> {
    return Object.entries(await this.getProjectVersion())
      .map(([name, value]) => name + "/" + encodeURIComponent(value))
      .pop() as string;
  }

  async getProjectVersion(): Promise<NamedVersion> {
    //@ts-ignore
    const tags = await this.project.getTags();
    const currentTag = Object.entries(tags).find(
      // @ts-ignore FIXME
      ([_tag, commit]) => commit === this.commitHash,
    );

    if (currentTag) {
      return { tag: currentTag[0] };
      // @ts-ignore FIXME
    } else if (this.branchName) {
      // @ts-ignore FIXME
      return { branch: this.branchName };
    } else {
      // @ts-ignore FIXME
      return { commit: this.commitHash };
    }
  }
}

OpenTagForm.metadata = pluginMetadata;
