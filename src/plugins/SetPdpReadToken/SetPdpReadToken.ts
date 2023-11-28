/*globals define*/
/*eslint-env node, browser*/

import PluginBase from "plugin/PluginBase";
import pluginMetadata from "./metadata.json";
import withTokens from "../../routers/Search/adapters/PDP/tokens";
import gmeConfig from "../../../config/index";

export default class SetPdpReadToken extends PluginBase {
  static metadata: GmeCommon.Metadata;
  constructor() {
    super();
    this.pluginMetadata = pluginMetadata;
  }

  async main() {
    /// @ts-ignore FIXME
    const { token } = this.getCurrentConfig();

    await withTokens(
      gmeConfig,
      /// @ts-ignore FIXME
      (tokens) => tokens.update(this.projectId, token),
    );

    this.result.setSuccess(true);
  }
}

SetPdpReadToken.metadata = pluginMetadata;
