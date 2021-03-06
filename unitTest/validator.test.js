const {ValidatorTestData} = require('./utils/validatorTestData.js');
const {Validator} = require('./../utils/validator.js');
const validatorTestData = new ValidatorTestData();
let validator;

beforeAll(() => {
  validator = new Validator();
});

describe('Is valid user object', () =>{
  test('Valid user object', () => {
    expect(validator.isValidUser(validatorTestData.validUser)).toBeTruthy();
  });

  test.each(validatorTestData.invalidUserArray)('Invalid user object', (invalidJSON) => {
    expect(validator.isValidUser(invalidJSON)).toBeFalsy();
  });
});

describe('Is valid login object', () =>{
  test('Valid login object', () => {
    expect(validator.isValidLogin(validatorTestData.validLogin)).toBeTruthy();
  });

  test.each(validatorTestData.invalidLoginArray)('Invalid login object', (invalidJSON) => {
    expect(validator.isValidLogin(invalidJSON)).toBeFalsy();
  });
});

describe('Is valid add favorite object', () =>{
  test('Valid add favorite object', () => {
    expect(validator.isValidAddFavorite(validatorTestData.validAddFavorite)).toBeTruthy();
  });

  test.each(validatorTestData.invalidAddFavoriteArray)('Invalid add favorite object',
      (invalidJSON) => {
        expect(validator.isValidAddFavorite(invalidJSON)).toBeFalsy();
      });
});

describe('Is valid token test', () =>{
  test.each(validatorTestData.validTokenArray)('Valid tokens',
      (validToken) => {
        expect(validator.isValidToken(validToken)).toBeTruthy();
      });

  test.each(validatorTestData.invalidTokenArray)('Invalid tokens',
      (invalidToken) => {
        expect(validator.isValidToken(invalidToken)).toBeFalsy();
      });
});

