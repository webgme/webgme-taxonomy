describe('TaxonomyParser', function () {
    const parser = require('../../src/common/TaxonomyParser');
    const assert = require('assert');
    const _ = require('underscore');

    it('should record description', function() {
        const text = `
        someTag,someDescription,
        `;
        const [taxonomy] = parser.fromCSV(text);
        assert.equal(taxonomy.pointers.base, '@meta:Term');
        assert.equal(taxonomy.attributes.name, 'someTag');
        assert.equal(taxonomy.attributes.description, 'someDescription');
    });

    it('should set description to "" if unset', function() {
        const text = `
        someTag,,
        `;
        const [taxonomy] = parser.fromCSV(text);
        assert.equal(taxonomy.pointers.base, '@meta:Term');
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
        assert.equal(taxonomy.pointers.base, '@meta:Term');
        assert.equal(taxonomy.children.length, 1);

        const [enumNode] = taxonomy.children;
        assert.equal(enumNode.pointers.base, '@meta:EnumField');

        enumNode.children.forEach(
            enumOpt => assert.equal(enumOpt.pointers.base, '@meta:TextField')
        );
    });

    it('should allow enum values to have properties', function() {
        const text = `
        someTag (enum),,
        ,compound,
        ,,propName (int)
        ,stringValue,
        `;
        const [taxonomy] = parser.fromCSV(text);
        assert.equal(taxonomy.pointers.base, '@meta:EnumField');
        assert.equal(taxonomy.children.length, 2);

        const [compoundOpt, stringOpt] = taxonomy.children;
        assert.equal(compoundOpt.pointers.base, '@meta:CompoundField');
        assert.equal(compoundOpt.children.length, 1);

        assert.equal(stringOpt.pointers.base, '@meta:TextField');
    });
});
