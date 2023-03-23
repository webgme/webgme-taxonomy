import type { WebgmeContext } from "./types";

declare const utils: {
  findTaxonomyNode(core: WebgmeContext['core'], node: Core.Node): Promise<Core.Node | null>;
}

export default utils;
