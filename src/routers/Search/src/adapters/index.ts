// TODO: load the different adapter types

import type { WebgmeContext, WebgmeRequest } from "../../../../common/types";
import RouterUtils from "../../../../common/routers/Utils";
import { StorageNotFoundError } from "./common/ModelError";
import fs from "fs";
import type { Adapter, AdapterStatic } from "./common/types";

const SUPPORTED_ADAPTERS: { [type: string]: AdapterStatic } = Object
  .fromEntries(
    fs
      .readdirSync(__dirname, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && (entry.name !== "common"))
      .map(({ name }) => [name.toLowerCase(), require(`./${name}`).default]),
  );
import assert from "assert";

export default class Adapters {
  static async from(
    gmeContext: WebgmeContext,
    req: WebgmeRequest,
    config: any,
  ): Promise<Adapter> {
    const { core, contentType } = gmeContext;
    const storageNode = (await core.loadChildren(contentType)).find((child) =>
      isTypeOf(core, child, "Storage")
    );

    if (!storageNode) {
      throw new StorageNotFoundError(gmeContext, contentType);
    }
    return Adapters.fromStorageNode(req, gmeContext, storageNode, config);
  }

  static async fromStorageNode(
    req: WebgmeRequest,
    storageNode: Core.Node,
    config: any,
  ): Promise<Adapter> {
    const gmeContext = req.webgmeContext;
    const { core } = gmeContext;
    const adapterType = core.getAttribute(
      core.getMetaType(storageNode),
      "name",
    );
    const adapterName = adapterType?.toString().toLowerCase();
    const AdapterType = (adapterName != null)
      ? SUPPORTED_ADAPTERS[adapterName]
      : null;
    assert(
      AdapterType,
      new RouterUtils.UserError(
        `Unsupported storage adapter: ${adapterType}`,
        400,
      ),
    );
    return await AdapterType.from(gmeContext, storageNode, req, config);
  }
  static getUriPatterns(): string[] {
    return Object.values(SUPPORTED_ADAPTERS).flatMap((adapter) =>
      adapter.getUriPatterns()
    );
  }
}

function isTypeOf(core: WebgmeContext["core"], node: Core.Node, name: string) {
  let basenode: Core.Node | null = core.getMetaType(node);
  while (basenode) {
    if (core.getAttribute(basenode, "name") === name) {
      return true;
    }
    basenode = core.getBase(basenode);
  }

  return false;
}
