/*globals define*/
/*eslint-env node, browser*/

define([
  "text!./metadata.json",
  "plugin/PluginBase",
  "../../routers/Search/build/adapters/PDP/tokens",
], function (
  pluginMetadata,
  PluginBase,
  TokensModule,
) {
  "use strict";

  const withTokens = TokensModule.default;
  const gmeConfig = require.nodeRequire("../../../config");
  pluginMetadata = JSON.parse(pluginMetadata);

  class SetPdpReadToken extends PluginBase {
    constructor() {
      super();
      this.pluginMetadata = pluginMetadata;
    }

    async main() {
      const { token } = this.getCurrentConfig();

      await withTokens(
        gmeConfig,
        (tokens) => tokens.update(this.projectId, token),
      );

      this.result.setSuccess(true);
    }
  }

  SetPdpReadToken.metadata = pluginMetadata;

  return SetPdpReadToken;
});
