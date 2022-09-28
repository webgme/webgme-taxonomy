// TODO: load the different adapter types

const RouterUtils = require("../../../common/routers/Utils");
const fs = require("fs");
const SUPPORTED_ADAPTERS = Object.fromEntries(
  fs
    .readdirSync(__dirname)
    .filter((name) => !name.endsWith(".js"))
    .map((name) => [name.toLowerCase(), require(`./${name}`)])
);
const assert = require("assert");

class Adapters {
  static async from(core, contentTypeNode, config, req) {
    const storageNode = (await core.loadChildren(contentTypeNode)).find(
      (child) => isTypeOf(core, child, "Storage")
    );

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
    return await Adapter.from(core, storageNode, config, req);
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