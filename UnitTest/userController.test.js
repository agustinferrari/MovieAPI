const {UserController} = require('./../Logic/UserController.js');
const {TestData} = require('./Utils/TestData.js');
let userController;
let testData;

beforeAll(() => {
  testData = new TestData();
});

beforeEach(() => {
  testData.testFilesInitialize();
  userController = new UserController();
  userController.addSession('pepep@gmail.com');
});

afterEach(() => {
  testData.testFilesEmtpy();
});

test('Generate token is alphanumeric and 20 characters long', () =>{
  const token = userController.generateToken();
  checkTokenValidity(token);
});

function checkTokenValidity(token) {
  const regexAlphanumeric20Chars = /^[a-z0-9]{20}$/i;
  expect(regexAlphanumeric20Chars.test(token)).toBeTruthy();
}

test('Add registered user session', () =>{
  addSessionTest('juanasanchez@gmail.com');
});

test('Add user duplicated session', () =>{
  addSessionTest('pepep@gmail.com');
});

function addSessionTest(email) {
  userController.addSession(email);
  const sessionArray = userController.sessionArray;
  let userInSessionArrayCount = 0;
  for (let i = 0; i < sessionArray.length; i++) {
    const sessionIterator = sessionArray[i];
    if (sessionIterator.userId === email) {
      userInSessionArrayCount++;
      checkTokenValidity(sessionIterator.token);
    }
  }
  expect(userInSessionArrayCount).toBe(1);
}

describe('Testing using local data', () =>{
  test('Login registered user', () =>{
    const user = {
      email: 'pepep@gmail.com',
      password: '424pass2343421',
    };
    expect(userController.login(user)).toBeTruthy();
    const sessionArray = userController.sessionArray;
    let userInSessionArrayCount = 0;
    for (let i = 0; i < sessionArray.length; i++) {
      const sessionIterator = sessionArray[i];
      if (sessionIterator.userId === email) {
        userInSessionArrayCount++;
        checkTokenValidity(sessionIterator.token);
      }
    }
    expect(userInSessionArrayCount).toBe(1);
  });
});


