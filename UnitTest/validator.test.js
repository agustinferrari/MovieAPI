const {TestData} = require('./utils/testData.js');
const {Validator} = require('./../utils/validator.js');
const testData= new TestData();
let validator;

beforeAll(() => {
  validator = new Validator();
});

describe('Is valid JSON Object tests', () =>{
  test('Valid JSON Object', () => {
    expect(validator.isValidObject(testData.userJuanaJSON)).toBeTruthy();
  });

  test.each(testData.invalidJSONArray)('Invalid JSON Object', (invalidJSON) => {
    expect(validator.isValidObject(invalidJSON)).toBeFalsy();
  });
});
