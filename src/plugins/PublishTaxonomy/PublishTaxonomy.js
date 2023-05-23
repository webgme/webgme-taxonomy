/*globals define*/
/*eslint-env node, browser*/

define(["text!./metadata.json", "plugin/PluginBase"], function (
  pluginMetadata,
  PluginBase,
) {
  "use strict";

  pluginMetadata = JSON.parse(pluginMetadata);

  class PublishTaxonomy extends PluginBase {
    constructor() {
      super();
      this.pluginMetadata = pluginMetadata;
    }

    async main() {
      // TODO: check the minimum type of release
      // TODO: check the type of release
      // TODO: determine the next release number
    }
  }

  PublishTaxonomy.metadata = pluginMetadata;

  return PublishTaxonomy;
});
