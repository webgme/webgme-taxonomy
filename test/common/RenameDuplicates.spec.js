describe('RenameDuplicates', function() {
  const renameDuplicates = require("../../build/common/RenameDuplicates");
  const assert = require("assert");

  it.only('should rename duplicate names among parent-child', function() {
    const partialTax = {
      vocabularies: {
        TestVocab: {
          terms: {
            SomeName: {
              fields: {
                SomeName: {
                  content: {Text: {}}
                }
              }
           }
          }
          
        }
      },
    };

    renameDuplicates(partialTax);
    assert(!partialTax.vocabularies.TestVocab.terms.hasOwnProperty('SomeName'));
  });
});
