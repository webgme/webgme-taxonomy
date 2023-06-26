describe('taxonomyTag tests', function() {
    let assert = require('assert')
    let data = require('./tags.json')
    it('data object should contain taxonomyTag property', function() {
        assert.equal(data.hasOwnProperty('taxonomyTags'),true)
    });
    it('taxonomyTag property should contain an array datatype', function() {
        assert.equal(Array.isArray(data.taxonomyTags),true)
    });
    //check if there are items in the list to inspect. if so, run test
    if(Array.isArray(data.taxonomyTags) && data.taxonomyTags.length > 0){
        let result = true
        it('taxonomyTag property should contain an array of objects', function() {
            for (let i = 0; i < data.taxonomyTags.length; i++){
                if (typeof data.taxonomyTags[i] != "object"){
                    result = false
                    break
                }
            }
            assert.equal(result,true)
        });
    }
})