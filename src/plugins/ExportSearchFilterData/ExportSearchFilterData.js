/*globals define*/
/*eslint-env node, browser*/

define([
  "webgme-taxonomy/SearchFilterDataExporter",
  "text!./metadata.json",
  "plugin/PluginBase",
], function (DashboardConfiguration, pluginMetadata, PluginBase) {
  "use strict";

  pluginMetadata = JSON.parse(pluginMetadata);

  class ExportSearchFilterData extends PluginBase {
    constructor() {
      super();
      this.pluginMetadata = pluginMetadata;
    }

    async main() {
      const config = await DashboardConfiguration.from(
        this.core,
        this.activeNode
      );
      const name = this.core.getAttribute(this.activeNode, "name");
      this.addFile(`${name}.json`, JSON.stringify(config));
      this.result.setSuccess(true);
    }
  }

  ExportSearchFilterData.metadata = pluginMetadata;

  return ExportSearchFilterData;
});
