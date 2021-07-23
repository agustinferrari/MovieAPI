const {ValidatorTestData} = require('./utils/validatorTestData.js');
const {Validator} = require('./../utils/validator.js');
const validatorTestData = new ValidatorTestData();
let validator;

beforeAll(() => {
  validator = new Validator();
});

describe('Is valid JSON Object tests', () =>{
  test('Valid JSON Object', () => {
    expect(validator.isValidObject(validatorTestData.validUser)).toBeTruthy();
  });

  test.each(validatorTestData.invalidJSONArray)('Invalid JSON Object', (invalidJSON) => {
    expect(validator.isValidObject(invalidJSON)).toBeFalsy();
  });
});

describe('Is valid user', () =>{
  test('Valid user', () => {
    expect(validator.isValidUser(validatorTestData.validUser)).toBeTruthy();
  });

  test.each(validatorTestData.invalidUserArray)('Invalid user', (invalidJSON) => {
    expect(validator.isValidUser(invalidJSON)).toBeFalsy();
  });
});
