class Artifact {
  constructor(parentId, id, displayName, taxonomyTags, time) {
    this.parentId = parentId;
    this.id = id;
    this.displayName = displayName;
    this.taxonomyTags = taxonomyTags;
    this.time = time;
  }
}

module.exports = Artifact;
