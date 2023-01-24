// TODO: load the different adapter types

const RouterUtils = require("../../../common/routers/Utils");
const { StorageNotFoundError } = require("./common/ModelError");
const fs = require("fs");
const SUPPORTED_ADAPTERS = Object.fromEntries(
  fs
    .readdirSync(__dirname)
    .filter((name) => !name.endsWith(".js") && name !== "common")
    .map((name) => [name.toLowerCase(), require(`./${name}`)])
);
const assert = require("assert");

class Adapters {
  static async from(gmeContext, req, config) {
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
    const Adapter = SUPPORTED_ADAPTERS[adapterType.toLowerCase()];
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

function isTypeOf(core, node, name) {
  let basenode = core.getMetaType(node);
  while (basenode) {
    if (core.getAttribute(basenode, "name") === name) {
      return true;
    }
    basenode = core.getBase(basenode);
  }

  return false;
}

module.exports = Adapters;
