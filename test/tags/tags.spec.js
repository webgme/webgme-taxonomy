describe('taxonomyTag tests', function () {
  let assert = require('assert')
  let data = require('./tags.json')
  it('data object should contain taxonomyTag property', function () {
    assert(data.hasOwnProperty('taxonomyTags'), true)
  })
  it('taxonomyTag property should contain an array datatype', function () {
    assert(Array.isArray(data.taxonomyTags), true)
  })

  it('taxonomyTag property should contain an array of objects', function () {
    let result = true
    for (let i = 0; i < data.taxonomyTags.length; i++) {
      if (
        typeof data.taxonomyTags[i] !== 'object' &&
        Object.keys(data.taxonomyTags[i]).length
      ) {
        result = false
        break
      }
    }
    assert(result, true)
  })
  it('taxonomyTag compoundTest tag should be valid (contain one object)', function () {
    const compoundTest = data.taxonomyTags[0].CompoundTest.iron_scan_MRI
    let result = false
    for (const prop in compoundTest) {
        if (typeof compoundTest[prop] === 'object') {
            result = true
            break
        }
    }
    assert(result, true)
  })
  it('taxonomyTag setTest tag should be valid (contain no objects)', function () {
    const setTest = data.taxonomyTags[1].SetTest['Risk factors?']
    let result = true
    for(const prop in setTest){
        if (typeof setTest[prop] === 'object'){
            result = false
            break
        }
    }
    assert(result, true)
  })
  it('taxonomyTag EnumTest tag value be valid', function () {
    assert(typeof data.taxonomyTags[2].EnumTest.EnumData.value, 'object')
  })
  it('taxonomyTag TextTest tag value be valid', function () {
    assert(typeof data.taxonomyTags[3].TextTest.TextData.value, 'string')
  })
  it('taxonomyTag BoolTest tag value be valid', function () {
    assert(typeof data.taxonomyTags[4].BoolTest.BoolData.value, 'boolean')
  })
  it('taxonomyTag FloatTest tag value be valid', function () {
    const val = data.taxonomyTags[5].FloatTest.FloatData.value
    console.log(val,Math.floor(val))
    assert(val !== Math.floor(val), true)
  })
  it('taxonomyTag IntTest tag value be valid', function () {
    const val = data.taxonomyTags[6].IntTest.IntData.value
    assert(val === Math.floor(val), true)
  })
})
