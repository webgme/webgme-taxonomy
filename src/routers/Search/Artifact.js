class Artifact {
  constructor(parentId, id, displayName, taxonomyTags) {
    this.parentId = parentId;
    this.id = id;
    this.displayName = displayName;
    this.taxonomyTags = taxonomyTags;
  }
}

module.exports = Artifact;
