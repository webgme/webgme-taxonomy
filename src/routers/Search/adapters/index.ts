// TODO: load the different adapter types

import type {
  AzureGmeConfig,
  GmeContentContext,
  WebgmeRequest,
} from "../../../common/types";
import { UserError } from "../../../common/routers/Utils";
import { StorageNotFoundError } from "./common/ModelError";
import fs from "fs";
import type { Adapter, AdapterStatic } from "./common/types";
import assert from "assert";
import { UnsupportedUriFormat } from "./common/StorageError";

const SUPPORTED_ADAPTERS: { [type: string]: AdapterStatic } = Object
  .fromEntries(
    fs
      .readdirSync(__dirname, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && (entry.name !== "common"))
      .map(({ name }) => [name.toLowerCase(), require(`./${name}`).default]),
  );
const prefixRegex = /^[a-zA-Z]+:\/\//;
const AdaptersByPrefix = Object.values(SUPPORTED_ADAPTERS)
  .find((adapter) => {
    const pattern = adapter.getUriPatterns()
      .find((ptrn) => prefixRegex.test(ptrn));

    if (!pattern) {
      throw new Error(
        "Could not find prefix for adapter: " + JSON.stringify(adapter),
      );
    }

    return pattern.split("://").shift();
  });

export default class Adapters {
  static async from(
    gmeContext: GmeContentContext,
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
    return Adapters.fromStorageNode(req, storageNode, config);
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
      new UserError(
        `Unsupported storage adapter: ${adapterType}`,
        400,
      ),
    );
    return await AdapterType.from(gmeContext, storageNode, req, config);
  }

  static async fromUri(
    req: WebgmeRequest,
    uri: string,
    config: AzureGmeConfig,
  ): Promise<Adapter> {
    const AdapterType = Object.values(SUPPORTED_ADAPTERS)
      .find((adapter) =>
        adapter.getUriPatterns().find((pattern) => {
          const regex = new RegExp(pattern);
          return regex.test(uri);
        })
      );

    if (!AdapterType) {
      throw new UnsupportedUriFormat(uri);
    }

    return AdapterType.fromUri(config, req, uri);
  }

  static getUriPatterns(): string[] {
    return Object.values(SUPPORTED_ADAPTERS).flatMap((adapter) =>
      adapter.getUriPatterns()
    );
  }
}

function isTypeOf(
  core: GmeContentContext["core"],
  node: Core.Node,
  name: string,
) {
  let basenode: Core.Node | null = core.getMetaType(node);
  while (basenode) {
    if (core.getAttribute(basenode, "name") === name) {
      return true;
    }
    basenode = core.getBase(basenode);
  }

  return false;
}

export namespace Storage {
}
