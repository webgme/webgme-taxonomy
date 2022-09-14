class ArtifactBase {
  // abstract
  constructor(id, displayName, taxonomyTags) {
    this.id = id;
    this.displayName = displayName;
    this.taxonomyTags = taxonomyTags;
  }
}

class ArtifactSet extends ArtifactBase {
  constructor(id, displayName, taxonomyTags, children) {
    super(id, displayName, taxonomyTags);
    this.children = children;
  }
}

class Artifact extends ArtifactBase {
  constructor(parentId, id, displayName, taxonomyTags, time) {
    super(id, displayName, taxonomyTags);
    this.parentId = parentId;
    this.time = time;
  }
}

module.exports = { Artifact, ArtifactSet };
