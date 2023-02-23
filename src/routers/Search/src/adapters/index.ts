// TODO: load the different adapter types

import type { WebgmeContext } from "../../../../common/types";
import RouterUtils from "../../../../common/routers/Utils";
import { StorageNotFoundError } from "./common/ModelError";
import fs from "fs";
const SUPPORTED_ADAPTERS = Object.fromEntries(
  fs
    .readdirSync(__dirname)
    .filter((name) => !name.endsWith(".js") && name !== "common")
    .map((name) => [name.toLowerCase(), require(`./${name}`)])
);
import assert from "assert";

export default class Adapters {
  static async from(gmeContext: WebgmeContext, req: Request, config: any) {
    const { core, contentType } = gmeContext;
    const storageNode = (await core.loadChildren(contentType)).find((child) =>
      isTypeOf(core, child, "Storage")
    );

    if (!storageNode) {
      throw new StorageNotFoundError(gmeContext, contentType);
    }

    const adapterType = core.getAttribute(
      core.getMetaType(storageNode),
      "name"
    );
    const adapterName = adapterType?.toString().toLowerCase()
    const Adapter = (adapterName != null) ? SUPPORTED_ADAPTERS[adapterName] : null;
    assert(
      Adapter,
      new RouterUtils.UserError(
        `Unsupported storage adapter: ${adapterType}`,
        400
      )
    );
    return await Adapter.from(gmeContext, storageNode, req, config);
  }
}

function isTypeOf(core: WebgmeContext['core'], node: Core.Node, name: string) {
  let basenode: Core.Node | null = core.getMetaType(node);
  while (basenode) {
    if (core.getAttribute(basenode, "name") === name) {
      return true;
    }
    basenode = core.getBase(basenode);
  }

  return false;
}
