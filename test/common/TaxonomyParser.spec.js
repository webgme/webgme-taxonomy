describe('TaxonomyParser', function () {
    const parser = require('../../src/common/TaxonomyParser');
    const assert = require('assert');
    const _ = require('underscore');

    it('should record description', function() {
        const text = `
        someTag,someDescription,
        `;
        const [taxonomy] = parser.fromCSV(text);
        assert.equal(taxonomy.pointers.base, '@meta:Tag');
        assert.equal(taxonomy.attributes.name, 'someTag');
        assert.equal(taxonomy.attributes.description, 'someDescription');
    });

    it('should set description to "" if unset', function() {
        const text = `
        someTag,,
        `;
        const [taxonomy] = parser.fromCSV(text);
        assert.equal(taxonomy.pointers.base, '@meta:Tag');
        assert.equal(taxonomy.attributes.description, '');
    });

    it('should parse enums in tags', function() {
        const text = `
        someTag (tag),,
        ,enum (field),
        ,,a
        ,,b
        ,,c
        `;
        const [taxonomy] = parser.fromCSV(text);
        assert.equal(taxonomy.pointers.base, '@meta:Tag');
        assert.equal(taxonomy.children.length, 1);

        const [enumNode] = taxonomy.children;
        assert.equal(enumNode.pointers.base, '@meta:EnumField');

        enumNode.children.forEach(
            enumOpt => assert.equal(enumOpt.pointers.base, '@meta:EnumOption')
        );
    });

    it('should convert all nested tags to compounds', function() {
        const text = `
        someTag (tag),,
        ,compound,
        ,,field1 (int)
        ,,field2 (text)
        ,,field3 (bool)
        `;
        const [taxonomy] = parser.fromCSV(text);
        assert.equal(taxonomy.pointers.base, '@meta:Tag');
        assert.equal(taxonomy.children.length, 1);

        const [enumNode] = taxonomy.children;
        assert.equal(enumNode.pointers.base, '@meta:CompoundField');

        const expectedFields = ['IntegerField', 'TextField', 'BooleanField'];
        _.zip(enumNode.children, expectedFields).forEach(
            ([node, type]) => assert.equal(node.pointers.base, `@meta:${type}`)
        );
    });
});
