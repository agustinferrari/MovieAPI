const {UserController} = require('./../logic/userController.js');
const {UserDataAccess} = require('../dataAccess/userDataAccess.js');
const pathToUsersFile = './unitTest/usersTest.txt';
const pathToFavoritesFile = './unitTest/favoritesTest.txt';
let userController;

beforeEach(() => {
  userController = new UserController();
  userController.userDataAccess = new UserDataAccess(pathToUsersFile, pathToFavoritesFile);
  userController.addSession('pepep@gmail.com');
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
  const {TestData} = require('./utils/TestData.js');
  let testData;

  beforeAll(() =>{
    testData = new TestData();
  });

  beforeEach(() => {
    testData.testFilesInitialize();
    userController = new UserController();
    userController.userDataAccess = new UserDataAccess(pathToUsersFile, pathToFavoritesFile);
    userController.login('pepep@gmail.com', '424pass2343421');
  });

  afterEach(() => {
    testData.testFilesEmtpy();
  });

  test('Login registered user', () =>{
    const user = {
      email: 'juanasanchez@gmail.com',
      password: 'password12345',
    };
    expect(userController.login(user.email, user.password)).toBeTruthy();
    checkLoginSessionTest(user, 1);
  });

  test('Login already logged in user', () =>{
    const user = {
      email: 'pepep@gmail.com',
      password: '424pass2343421',
    };
    expect(userController.login(user.email, user.password)).toBeTruthy();
    checkLoginSessionTest(user, 1);
  });

  test('Login unregistered user', () =>{
    const user = {
      email: 'mariogaspar@gmail.com',
      password: '343423cxtrp213',
    };
    expect(userController.login(user.email, user.password)).toBeFalsy();
    checkLoginSessionTest(user, 0);
  });

  function checkLoginSessionTest(user, expectedSessionArrayCount) {
    const sessionArray = userController.sessionArray;
    let userInSessionArrayCount = 0;
    for (let i = 0; i < sessionArray.length; i++) {
      const sessionIterator = sessionArray[i];
      if (sessionIterator.userId === user.email) {
        userInSessionArrayCount++;
        checkTokenValidity(sessionIterator.token);
      }
    }
    expect(userInSessionArrayCount).toBe(expectedSessionArrayCount);
  }
});


