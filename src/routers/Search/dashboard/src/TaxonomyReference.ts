
export default class TaxonomyReference {
  id: string;
  version: Version;

  constructor(id: string, version: Version) {
    this.id = id;
    this.version = version;
  }

  supports(otherVersion: TaxonomyReference): boolean {
    return this.id === otherVersion.id && this.supports(otherVersion.version);
  }

  static from(taxonomyVersion: object): TaxonomyReference {
    let version;
    if (taxonomyVersion.tag) {
      version = new Tag(taxonomyVersion.tag);
    } else if (taxonomyVersion.branch) {
      version = new Branch(taxonomyVersion.branch);
    } else if (taxonomyVersion.commit) {
      version = new Branch(taxonomyVersion.commit);
    } else {
      const taxVersion = JSON.stringify(taxonomyVersion);
      throw new Error(`Could not find tag, branch, or commit in ${taxVersion}`);
    }

    return new TaxonomyReference(taxonomyVersion.id, version);
  }
}

interface Version {
  hash: string;

  supports(otherVersion: Version): boolean;
}

export class Tag {
  hash: string;
  version: SemanticVersion;

  constructor(hash: string, versionString: string) {
    this.hash = hash;
    this.version = SemanticVersion.parse(versionString);
  }

  supports(otherTag: Version): boolean {
    if (otherTag instanceof Tag) {
      return this.version.major === otherTag.version.major &&
        this.version.isGreaterThan(otherTag.version);
    } else {
      return this.hash === otherTag.hash;
    }
  }
}

export class Branch {
  name: string;
  hash: string;

  constructor(hash: string, name: string) {
    this.name = name;
    this.hash = hash;
  }

  supports(otherVersion: Version): boolean {
    if (otherVersion instanceof Branch) {
      return otherVersion.name === this.name;
    } else {
      return otherVersion.hash === this.hash;
    }
  }
}

export class Commit {
  hash: string;

  constructor(hash: string) {
    this.hash = hash;
  }

  supports(otherVersion: Version): boolean {
    return otherVersion.hash === this.hash;
  }
}

export class ParseError extends Error {
  constructor(input) {
    super(`Unable to parse: ${input}`);
  }
}

export class SemanticVersion {
  major: number;
  minor: number;
  patch: number;

  constructor(major: number, minor=0, patch=0) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }

  isGreaterThan(other: SemanticVersion) {
    if (this.major < other.major) return false;
    if (this.minor < other.minor) return false;
    if (this.patch < other.patch) return false;

    return true;
  }

  static parse(versionString: string): SemanticVersion {
    versionString = versionString.replace(/^v?/, '');
    const [major, minor=0, patch=0] = versionString.split('.')
      .map(str => {
        if (!/\d+/.test(str)) {
          throw new ParseError(versionString);
        }
        return parseInt(str);
      });

    return new SemanticVersion(major, minor, patch);
  }
}
