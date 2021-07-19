const {UserController} = require('./../logic/userController.js');
const {UserDataAccess} = require('../dataAccess/userDataAccess.js');
const {TestData} = require('./utils/testData.js');
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
  userController.addSession('juanasanchez@gmail.com');
  countSessionTest('juanasanchez@gmail.com', 1);
});

test('Add user duplicated session', () =>{
  userController.addSession('pepep@gmail.com');
  countSessionTest('pepep@gmail.com', 1);
});

function countSessionTest(email, expectedCount) {
  const sessionArray = userController.sessionArray;
  let userInSessionArrayCount = 0;
  for (let i = 0; i < sessionArray.length; i++) {
    const sessionIterator = sessionArray[i];
    if (sessionIterator.userId === email) {
      userInSessionArrayCount++;
      checkTokenValidity(sessionIterator.token);
    }
  }
  expect(userInSessionArrayCount).toBe(expectedCount);
}

describe('Login/Logout tests', () =>{
  let spy;

  beforeEach(() => {
    userController = new UserController();
    spy = jest.spyOn(userController.userDataAccess, 'login');
    spy.mockReturnValue(true);
    userController.login('pepep@gmail.com', '424pass2343421');
  });

  afterEach(() => {
    spy.mockRestore();
  });

  test('Login registered user', () =>{
    const user = {
      email: 'juanasanchez@gmail.com',
      password: 'password12345',
    };
    expect(userController.login(user.email, user.password)).toBeTruthy();
    countSessionTest(user.email, 1);
  });

  test('Login already logged in user', () =>{
    const user = {
      email: 'pepep@gmail.com',
      password: '424pass2343421',
    };
    expect(userController.login(user.email, user.password)).toBeTruthy();
    countSessionTest(user.email, 1);
  });

  test('Login unregistered user', () =>{
    const user = {
      email: 'mariogaspar@gmail.com',
      password: '343423cxtrp213',
    };
    spy.mockReturnValue(false);
    expect(userController.login(user.email, user.password)).toBeFalsy();
    countSessionTest(user.email, 0);
  });

  test('Logout token in session', () =>{
    const token = userController.sessionArray[0].token;
    const email = userController.sessionArray[0].userId;
    userController.logout(token);
    countSessionTest(email, 0);
  });

  test('Logout token without session', () =>{
    const token = userController.sessionArray[0].token + 1;
    const sessionCountBeforeLogout = userController.sessionArray.length;
    userController.logout(token);
    expect(userController.sessionArray.length).toBe(sessionCountBeforeLogout);
  });
});

describe('Register tests', () =>{
  let spy;

  beforeEach(() => {
    userController = new UserController();
    spy = jest.spyOn(userController.userDataAccess, 'register');
  });

  afterEach(() => {
    spy.mockRestore();
  });

  test('Register unregistered user', () => {
    const newUser = {
      email: 'alfp@yahoo.com',
      firstName: 'Alfredo',
      lastName: 'Perez',
      password: 'My1password231',
    };
    spy.mockReturnValue(true);
    expect(userController.register(newUser)).toBeTruthy();
  });

  test('Register registered user', () => {
    const newUser = {
      email: 'pepep@gmail.com',
      firstName: 'Pepe',
      lastName: 'Gonzales',
      password: '424pass2343421',
    };
    spy.mockReturnValue(false);
    expect(userController.register(newUser)).toBeFalsy();
  });
});

describe('Add favorite tests', () =>{
  let spy;
  let testData;

  beforeAll(() => {
    testData = new TestData();
  });

  beforeEach(() => {
    userController = new UserController();
    spy = jest.spyOn(userController.userDataAccess, 'addFavorite');
  });

  afterEach(() => {
    spy.mockRestore();
  });

  test('Add favorite movie to registered user', () => {
    const registerdUser = {
      email: 'pepep@gmail.com',
      firstName: 'Pepe',
      lastName: 'Gonzales',
      password: '424pass2343421',
    };
    const movieWithoutAddedAt = JSON.parse(testData.movieWithoutAddedAt);
    const movieWithAddedAt = movieWithoutAddedAt;
    movieWithAddedAt.addedAt = new Date().toISOString().slice(0, 10);
    spy.mockReturnValue(true);
    expect(userController.addFavorite(registerdUser, movieWithoutAddedAt)).toBeTruthy();
    const callParameters = spy.mock.calls[0][1];
    expect(callParameters).toBe(movieWithAddedAt);
  });

  test('Add favorite movie to unregistered user', () => {
    const registerdUser = {
      email: 'marioalberto@gmail.com',
      firstName: 'Mario',
      lastName: 'Alberto',
      password: '3434PassMarioAlb',
    };
    const movieWithoutAddedAt = JSON.parse(testData.movieWithoutAddedAt);
    const movieWithAddedAt = movieWithoutAddedAt;
    movieWithAddedAt.addedAt = new Date().toISOString().slice(0, 10);
    spy.mockReturnValue(false);
    expect(userController.addFavorite(registerdUser, movieWithoutAddedAt)).toBeFalsy();
    const callParameters = spy.mock.calls[0][1];
    expect(callParameters).toBe(movieWithAddedAt);
  });
});


