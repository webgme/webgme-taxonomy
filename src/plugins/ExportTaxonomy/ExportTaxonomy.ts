/*globals define*/
/*eslint-env node, browser*/

import PluginBase from "plugin/PluginBase";
import pluginMetadata from "./metadata.json";
import exportTaxonomy from "../../common/TaxonomyExporter";
import { GmeCore } from "../../common/types";
import { toString } from "../../common/Utils";
import { isTypeNamed } from "../../common/GmeHelpers";

export default class ExportTaxonomy extends PluginBase {
  static metadata: GmeCommon.Metadata;

  constructor() {
    super();
    this.pluginMetadata = pluginMetadata;
  }

  async main() {
    const core = this.core as GmeCore;
    if (!isTypeNamed(core, this.activeNode, "Taxonomy")) {
      const metaType = core.getMetaType(this.activeNode);
      const typeName = toString(core.getAttribute(metaType, "name"));
      throw new Error(`Invalid node type "${typeName}". Expected Taxonomy.`);
    }

    const taxonomy = await exportTaxonomy(
      core,
      this.activeNode,
    );

    const filename = `${this.core.getAttribute(this.activeNode, "name")}.json`;
    /// @ts-ignore
    await this.addFile(filename, JSON.stringify(taxonomy));
    this.result.setSuccess(true);
  }
}

ExportTaxonomy.metadata = pluginMetadata;
