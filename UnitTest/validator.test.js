const {TestData} = require('./utils/testData.js');
const {Validator} = require('./utils/validator.js');
let testData;
let validator;

beforeAll(() => {
  testData = new TestData();
  validator = new Validator();
});

describe('Is valid JSON Object tests', () =>{
  test('Valid JSON Object', () => {
    expect(Validator.isValidObject(testData.userJuanaJSON)).toBeTruthy();
  });
});
