export default class TaxonomyReference {
  constructor(id, version) {
    this.id = id;
    this.version = version;
  }
  supports(otherVersion) {
    return this.id === otherVersion.id &&
      this.version.supports(otherVersion.version);
  }
  static from(taxonomy) {
    let version;
    if (taxonomy.tag) {
      version = new Tag(taxonomy.commit, taxonomy.tag);
    } else if (taxonomy.branch) {
      version = new Branch(taxonomy.commit, taxonomy.branch);
    } else if (taxonomy.commit) {
      version = new Commit(taxonomy.commit);
    } else {
      const taxVersion = JSON.stringify(taxonomy);
      throw new Error(`Could not find tag, branch, or commit in ${taxVersion}`);
    }
    return new TaxonomyReference(taxonomy.id, version);
  }
}
export class Commit {
  constructor(hash) {
    this.hash = hash;
  }
  supports(otherVersion) {
    return otherVersion.hash === this.hash;
  }
}
export class Tag extends Commit {
  constructor(hash, versionString) {
    super(hash);
    this.version = SemanticVersion.parse(versionString);
  }
  supports(otherTag) {
    if (otherTag instanceof Tag) {
      return this.version.major === otherTag.version.major &&
        this.version.gte(otherTag.version);
    } else {
      return super.supports(otherTag);
    }
  }
}
export class Branch extends Commit {
  constructor(hash, name) {
    super(hash);
    this.name = name;
  }
  supports(otherVersion) {
    if (otherVersion instanceof Branch) {
      return otherVersion.name === this.name;
    } else {
      return super.supports(otherVersion);
    }
  }
}
export class ParseError extends Error {
  constructor(input) {
    super(`Unable to parse: ${input}`);
  }
}
export class SemanticVersion {
  constructor(major, minor = 0, patch = 0) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }
  gte(other) {
    if (this.major < other.major) {
      return false;
    }
    if (this.minor < other.minor) {
      return false;
    }
    if (this.patch < other.patch) {
      return false;
    }
    return true;
  }
  toString() {
    return [this.major, this.minor, this.patch].join(".");
  }
  static parse(versionString) {
    versionString = versionString.replace(/^v?/, "");
    const [major, minor = 0, patch = 0] = versionString.split(/[._]/)
      .map((str) => {
        if (!/\d+/.test(str)) {
          throw new ParseError(versionString);
        }
        return parseInt(str);
      });
    return new SemanticVersion(major, minor, patch);
  }
}
//# sourceMappingURL=TaxonomyReference.js.map
