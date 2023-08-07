import type { WebgmeContext } from "./types";

declare const utils: {
  findTaxonomyNode(
    core: WebgmeContext["core"],
    node: Core.Node,
  ): Promise<Core.Node | null>;

  getVocabulariesFor(core: GmeClasses.Core, contentType: Core.Node): Promise<GmeCommon.DataObject[]>;
};

export default utils;
