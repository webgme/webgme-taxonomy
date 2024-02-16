describe("TaxonomyParser", function () {
  const parser = require("../../build/common/TaxonomyParser");
  const assert = require("assert");
  const _ = require("underscore");

  it("should record description", function () {
    const text = `
        someTag(term),someDescription,
        `;
    const [taxonomy] = parser.fromCSV(text);
    assert.equal(taxonomy.pointers.base, "@meta:Term");
    assert.equal(taxonomy.attributes.name, "someTag");
    assert.equal(taxonomy.attributes.description, "someDescription");
  });

  it("should support ReferenceFields", function () {
    const text = `
        someTag(term),
        ,someRef(ref),
        `;
    const [taxonomy] = parser.fromCSV(text);
    const field = taxonomy.children[0];
    assert.equal(field.pointers.base, "@meta:ReferenceField");
    assert.equal(field.attributes.name, "someRef");
  });

  it('should set description to "" if unset', function () {
    const text = `
        someTag (term),,
        `;
    const [taxonomy] = parser.fromCSV(text);
    assert.equal(taxonomy.pointers.base, "@meta:Term");
    assert.equal(taxonomy.attributes.description, "");
  });

  describe("enums", function () {
    it("should parse enums in tags", function () {
      const text = `
        someTag (tag),,
        ,enum (field),
        ,,a
        ,,b
        ,,c
        `;
      const [taxonomy] = parser.fromCSV(text);
      assert.equal(taxonomy.pointers.base, "@meta:Term");
      assert.equal(taxonomy.children.length, 1);

      const [enumNode] = taxonomy.children;
      assert.equal(enumNode.pointers.base, "@meta:EnumField");

      enumNode.children.forEach((enumOpt) =>
        assert.equal(enumOpt.pointers.base, "@meta:CompoundField")
      );
    });

    it("should allow enum values to have properties", function () {
      const text = `
        someTag (enum),,
        ,compound,
        ,,propName (int)
        ,secondOpt,
        `;
      const [taxonomy] = parser.fromCSV(text);
      assert.equal(taxonomy.pointers.base, "@meta:EnumField");
      assert.equal(taxonomy.children.length, 2);

      const [compoundOpt, stringOpt] = taxonomy.children;
      assert.equal(compoundOpt.pointers.base, "@meta:CompoundField");
      assert.equal(compoundOpt.children.length, 1);

      assert.equal(stringOpt.pointers.base, "@meta:CompoundField");
    });

    it("should parse top-level node as Vocabulary", function () {
      const text = `
          TestVocab,,,,,,,,,,
          ,Term,,,,,,,,,OR
          ,,EnumProperty(enum),,,,,,,Application used to access sensor data,
          ,,,Option1,,,,,,,
          ,,,Option2,,,,,,,
        `;

      const [top] = parser.fromCSV(text);
      assert.equal(top.pointers.base, "@meta:Vocabulary");
    });

    it("should make set children compound fields", function () {
      const text = `
          TestVocab,,,,,,,,,,
          ,Term,,,,,,,,,OR
          ,,SetProperty(set),,,,,,,Application used to access sensor data,
          ,,,Option1,,,,,,,
          ,,,Option2,,,,,,,
        `;

      const [top] = parser.fromCSV(text);
      const opts = top.children.shift().children.shift().children;
      assert.equal(opts.length, 2);
      opts.forEach((opt) =>
        assert.equal(opt.pointers.base, "@meta:CompoundField")
      );
    });

    it("should make enum children compound fields", function () {
      const text = `
          TestVocab,,,,,,,,,,
          ,Term,,,,,,,,,OR
          ,,SetProperty(set),,,,,,,Application used to access sensor data,
          ,,,Option1,,,,,,,
          ,,,Option2,,,,,,,
        `;

      const [top] = parser.fromCSV(text);
      const opts = top.children.shift().children.shift().children;
      assert.equal(opts.length, 2);
      opts.forEach((opt) =>
        assert.equal(opt.pointers.base, "@meta:CompoundField")
      );
    });

    it("should make unknown fields text fields", function () {
      const text = `
          TestVocab,,,,,,,,,,
          ,Term,,,,,,,,,OR
          ,,f1(field),,,,,,,Application used to access sensor data,
        `;

      const [top] = parser.fromCSV(text);
      const f1 = top.children.shift().children.shift();
      assert.equal(f1.pointers.base, "@meta:TextField");
    });

    it("should make unknown fields (w/ children) enum fields", function () {
      const text = `
          TestVocab,,,,,,,,,,
          ,Term,,,,,,,,,OR
          ,,f1(field),,,,,,,Application used to access sensor data,
          ,,,o1,,,,,,,
          ,,,o2,,,,,,,
        `;

      const [top] = parser.fromCSV(text);
      const f1 = top.children.shift().children.shift();
      assert.equal(f1.pointers.base, "@meta:EnumField");
    });

    it("should not flatten descendents in deeply nested enum", function () {
      const text = `
          TestVocab,,,,,,,,,,
          ,Term,,,,,,,,,OR
          ,,EnumProperty(enum),,,,,,,Application used to access sensor data,
          ,,,Option1,,,,,,,
          ,,,Option2,,,,,,,
          ,,,Option3(compound),,,,,,,
          ,,,,NestedOption1(compound),,,,,,
          ,,,,,InnermostProperty1(text),,,,,
          ,,,,,InnermostProperty2(text),,,,,
          ,,,,NestedOption2(compound),,,,,,
          ,,,,,InnermostProperty1(text),,,,,
          ,,,,,InnermostProperty2(text),,,,,
          ,,,,NestedOption3(compound),,,,,,
          ,,,,,InnermostProperty1(text),,,,,
          ,,,,,InnermostProperty2(text),,,,,
        `;

      const [taxonomy] = parser.fromCSV(text);
      term = taxonomy.children[0];

      assert.equal(term.children.length, 1);
      const enumOpts = term.children[0].children;
      assert.equal(enumOpts.length, 3);

      enumOpts[2].children.forEach((opt) => {
        assert.equal(opt.children.length, 2);
        opt.children.every((c) =>
          c.attributes.name.startsWith("InnermostProperty")
        );
      });
    });
  });
});
