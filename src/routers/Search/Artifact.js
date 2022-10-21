class ArtifactBase {
  // abstract
  constructor(id, displayName, taxonomyTags, taxonomyVersion) {
    this.id = id;
    this.displayName = displayName;
    this.taxonomyTags = taxonomyTags;
    this.taxonomy = taxonomyVersion;
  }
}

class ArtifactSet extends ArtifactBase {
  constructor(id, displayName, taxonomyTags, taxonomyVersion, children) {
    super(id, displayName, taxonomyTags, taxonomyVersion);
    this.children = children;
  }
}

class Artifact extends ArtifactBase {
  constructor(parentId, id, displayName, taxonomyTags, taxonomyVersion, time) {
    super(id, displayName, taxonomyTags, taxonomyVersion);
    this.parentId = parentId;
    this.time = time;
  }
}

module.exports = { Artifact, ArtifactSet };
