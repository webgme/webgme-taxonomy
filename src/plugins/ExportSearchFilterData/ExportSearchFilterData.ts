/*globals define*/
/*eslint-env node, browser*/

import PluginBase from "plugin/PluginBase";
import pluginMetadata from "./metadata.json";
import DashboardConfiguration from "../../common/SearchFilterDataExporter";
import { GmeCore } from "../../common/types";

export default class ExportSearchFilterData extends PluginBase {
  static metadata: GmeCommon.Metadata;
  constructor() {
    super();
    this.pluginMetadata = pluginMetadata;
  }

  async main() {
    const config = await DashboardConfiguration.from(
      this.core as GmeCore,
      this.activeNode,
    );
    const name = this.core.getAttribute(this.activeNode, "name");
    /// @ts-ignore FIXME
    this.addFile(`${name}.json`, JSON.stringify(config));
    this.result.setSuccess(true);
  }
}

ExportSearchFilterData.metadata = pluginMetadata;
