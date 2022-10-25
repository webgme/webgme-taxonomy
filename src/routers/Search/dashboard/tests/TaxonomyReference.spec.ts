/* eslint-env mocha */

import TaxonomyReference from '../src/TaxonomyReference';
import {Commit, Tag, SemanticVersion, Branch} from '../src/TaxonomyReference';
import assert from 'assert';

describe('TaxonomyReference', function() {
  it('should consider different projects unsupported', function() {
    const version = new Commit('someHash');
    const one = new TaxonomyReference('tax1', version);
    const another = new TaxonomyReference('tax2', version);
    assert(!one.supports(another));
  });

  it('should consider projects with matching versions supported', function() {
    const version = new Commit('someHash');
    const one = new TaxonomyReference('tax1', version);
    const another = new TaxonomyReference('tax1', version);
    assert(one.supports(another));
  });

  it('should consider projects with matching tags supported', function() {
    const tag = new Tag('someHash', 'v1.0.0');
    const one = new TaxonomyReference('tax1', tag);
    const another = new TaxonomyReference('tax1', tag);
    const otherTag = new Tag(undefined, 'v1.0.0');
    assert(one.supports(another));
  });

  describe('SemanticVersion', function() {
    it('should parse v1.0.2', function() {
      const version = SemanticVersion.parse('v1.0.2');
      assert.equal(version.major, 1);
      assert.equal(version.minor, 0);
      assert.equal(version.patch, 2);
    });

    it('should parse 1.0.2', function() {
      const version = SemanticVersion.parse('1.0.2');
      assert.equal(version.major, 1);
      assert.equal(version.minor, 0);
      assert.equal(version.patch, 2);
    });

    it('should parse 1.2', function() {
      const version = SemanticVersion.parse('1.2');
      assert.equal(version.major, 1);
      assert.equal(version.minor, 2);
      assert.equal(version.patch, 0);
    });

    it('should throw ParseError on 1.x.2', function() {
      assert.throws(() => SemanticVersion.parse('1.x.2'));
    });
  });

  describe('Tag', function() {
    it('should support all versions < X.Y.Z but not < X.0.0', function() {
      const tag = new Tag('someHash', 'v1.2.5');
      const compatVersions = [
        'v1.0.0',
        'v1.2.0',
        'v1.0.1',
        'v1.2.1',
        'v1.2.5',
      ];
      const incompatVersions = [
        'v0.1.0',
        'v2.0.0',
        'v1.2.6',
        'v1.3.0',
      ];
      compatVersions.forEach(vString => {
        const otherTag = new Tag('someHash', vString);
        assert(
          tag.supports(otherTag),
          `v1.2.5 should support ${vString}`
        );
      });

      incompatVersions.forEach(vString => {
        const otherTag = new Tag('someHash', vString);
        assert(
          !tag.supports(otherTag),
          `v1.2.5 should NOT support ${vString}`
        );
      });
    });

    it('should only use tag if semver compatible', function() {
      const tag = new Tag('someHash', 'v1.2.5');
      const tag2 = new Tag(undefined, 'v1.2.5');
      assert(tag.supports(tag2));
    });
  });

  describe('Commit', function() {
    it('should support Tag with same hash', function() {
      const commit = new Commit('someHash');
      const tag = new Tag('someHash', 'v1.2.5');
      assert(commit.supports(tag));
    });

    it('should support Branch with same hash', function() {
      const commit = new Commit('someHash');
      const branch = new Branch('someHash', 'someBranch');
      assert(commit.supports(branch));
    });
  });

  describe('Branch', function() {
    it('should support other branches with same name', function() {
      const branch = new Branch('someHash', 'someBranch');
      const branch2 = new Branch('otherHash', 'someBranch');
      assert(branch.supports(branch2));
    });

    it('should fall back on hash comparison for non-Branch comparison', function() {
      const branch = new Branch('someHash', 'someBranch');
      const tag = new Tag('someHash', 'v1.0');
      assert(branch.supports(tag));
    });
  });
});
