// TODO: load the different adapter types

import type {
  AzureGmeConfig,
  GmeContentContext,
  GmeContext,
} from "../../../common/types";
import type { Request } from "express";
import { InvalidStorageError, StorageNotFoundError } from "./common/ModelError";
import type { Adapter, AdapterStatic } from "./common/types";
import { UnsupportedUriFormat } from "./common/StorageError";
import { UserError } from "../../../common/UserError";
import PDP from "./PDP/index";
import MongoDB from "./MongoDB/index";

export default class Adapters {
  static async from(
    gmeContext: GmeContentContext,
    req: Request,
    config: any,
  ): Promise<Adapter> {
    const { core, contentType } = gmeContext;
    const storageNode = (await core.loadChildren(contentType)).find((child) =>
      isTypeOf(core, child, "Storage")
    );

    if (!storageNode) {
      throw new StorageNotFoundError(gmeContext, contentType);
    }
    return Adapters.fromStorageNode(gmeContext, req, storageNode, config);
  }

  static async fromStorageNode(
    gmeContext: GmeContext,
    req: Request,
    storageNode: Core.Node,
    config: any,
  ): Promise<Adapter> {
    const { core } = gmeContext;
    const adapterType = core.getAttribute(
      core.getMetaType(storageNode),
      "name",
    );
    // FIXME: this needs to be finished up!
    const adapterName = adapterType?.toString().toLowerCase();
    let AdapterType;
    if (adapterName === "mongodb") {
      AdapterType = MongoDB;
    } else if (adapterName === "pdp") {
      AdapterType = PDP;
    } else {
      throw new UserError(
        `Unsupported storage adapter: ${adapterType}`,
        400,
      );
    }
    // TODO: add the content type
    // FIXME: what if the storage node isn't in a content type?
    const parent = core.getParent(storageNode);
    if (!parent) {
      throw new InvalidStorageError(gmeContext, storageNode);
    }
    const base = core.getBase(parent);
    if (core.getAttribute(base, "name") !== "Content Type") {
      throw new InvalidStorageError(gmeContext, storageNode);
    }

    const contentContext: GmeContentContext = {
      project: gmeContext.project,
      projectVersion: gmeContext.projectVersion,
      core: gmeContext.core,
      root: gmeContext.root,
      commitObject: gmeContext.commitObject,
      contentType: parent,
    };
    return await AdapterType.from(contentContext, storageNode, req, config);
  }

  static async fromUri(
    req: Request,
    uri: string,
    config: AzureGmeConfig,
  ): Promise<Adapter> {
    return getAdapterClassFromUri(uri).fromUri(config, req, uri);
  }

  static getUriPatterns(): string[] {
    return [
      PDP.getUriPatterns(),
      MongoDB.getUriPatterns(),
    ].flat();
  }

  static resolveUri(uri: string): [string, string] {
    return getAdapterClassFromUri(uri).resolveUri(uri);
  }
}

function getAdapterClassFromUri(uri: string): AdapterStatic<Adapter> {
  if (isUriFor(PDP, uri)) {
    return PDP;
  }

  if (isUriFor(MongoDB, uri)) {
    return MongoDB;
  }

  throw new UnsupportedUriFormat(uri);
}

function isUriFor<A extends Adapter>(
  adapter: AdapterStatic<A>,
  uri: string,
): boolean {
  return !!adapter.getUriPatterns().find((pattern) => {
    const regex = new RegExp(pattern);
    return regex.test(uri);
  });
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
