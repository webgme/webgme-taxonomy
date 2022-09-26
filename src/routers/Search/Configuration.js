/*
 * Generate a configuration for the search dashboard which accounts for the storage backend, etc.
 */

class ContentType {
  constructor(name, storage) {
    this.name = name;
    this.storage = storage;
  }

  static async from(core, contentTypeNode) {
    // TODO: parse the content type
    const name = core.getAttribute(contentTypeNode, "name");
    const storageNode = (await core.loadChildren(contentTypeNode)).find(
      (node) => isTypeOf(node, "Storage")
    );
  }
}

class StorageAdapter {}

class PDPAdapter extends StorageAdapter {
  static async from(core, node) {
    // TODO: 
  }
}

//function isTypeOf(core, node, name) {
//}
