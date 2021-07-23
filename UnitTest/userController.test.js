const {UserController} = require('./../logic/userController.js');
const {UserDataAccess} = require('../dataAccess/userDataAccess.js');
const {HTTPRequestError} = require('../utils/customExceptions/httpRequestError');
const {InvalidTokenError} = require('../utils/customExceptions/invalidTokenError.js');
const {InvalidEmailError} = require('../utils/customExceptions/invalidEmailError.js');
const {InvalidPasswordError} = require('../utils/customExceptions/invalidPasswordError.js');
const {TestData} = require('./utils/testData.js');
const unirest = require('unirest');
jest.mock('unirest');
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
  let loginSpy;
  let existsSpy;

  beforeEach(() => {
    userController = new UserController();
    loginSpy = jest.spyOn(userController.userDataAccess, 'login');
    existsSpy = jest.spyOn(userController.userDataAccess, 'exists');
    existsSpy.mockReturnValue(true);
    loginSpy.mockReturnValue(true);
    userController.login('pepep@gmail.com', '424pass2343421');
  });

  afterEach(() => {
    loginSpy.mockRestore();
    existsSpy.mockRestore();
  });

  test('Login registered user', () =>{
    const user = {
      email: 'juanasanchez@gmail.com',
      password: 'password12345',
    };
    existsSpy.mockReturnValue(true);
    expect(userController.login(user.email, user.password)).toBeTruthy();
    countSessionTest(user.email, 1);
  });

  test('Login already logged in user', () =>{
    const user = {
      email: 'pepep@gmail.com',
      password: '424pass2343421',
    };
    existsSpy.mockReturnValue(true);
    expect(userController.login(user.email, user.password)).toBeTruthy();
    countSessionTest(user.email, 1);
  });

  test('Login unregistered user', () =>{
    const user = {
      email: 'mariogaspar@gmail.com',
      password: '343423cxtrp213',
    };
    existsSpy.mockReturnValue(false);
    loginSpy.mockReturnValue(false);
    expect(() => {
      userController.login(user.email, user.password);
    }).toThrow(InvalidEmailError);
    countSessionTest(user.email, 0);
  });

  test('Login registered user with wrong password', () =>{
    const user = {
      email: 'pepep@gmail.com',
      password: 'wrongpassword123',
    };
    existsSpy.mockReturnValue(true);
    loginSpy.mockReturnValue(false);
    expect(() => {
      userController.login(user.email, user.password);
    }).toThrow(InvalidPasswordError);
    countSessionTest(user.email, 1);
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

  beforeAll(() => {
    const loginSpy = jest.spyOn(userController.userDataAccess, 'login');
    const existsSpy = jest.spyOn(userController.userDataAccess, 'exists');
    existsSpy.mockReturnValue(true);
    loginSpy.mockReturnValue(true);
    userController.login('pepep@gmail.com', '424pass2343421');
  });

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
    const loginSpy = jest.spyOn(userController.userDataAccess, 'login');
    const existsSpy = jest.spyOn(userController.userDataAccess, 'exists');
    existsSpy.mockReturnValue(true);
    loginSpy.mockReturnValue(true);
    userController.login('pepep@gmail.com', '424pass2343421');
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
    const token = userController.sessionArray[0].token;
    expect(userController.addFavorite(registerdUser, movieWithoutAddedAt, token)).toBeTruthy();
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
    const token = userController.sessionArray[0].token;
    expect(() => {
      userController.addFavorite(registerdUser, movieWithoutAddedAt, token);
    }).toThrow(InvalidTokenError);
    expect(spy.mock.calls.length).toBe(0);
  });
});


describe('Get user favorite tests', () =>{
  let spy;
  let testData;
  let favoritesMock;

  beforeAll(() => {
    testData = new TestData();
    favoritesMock = JSON.parse('['+testData.movie1 +','+ testData.movie2 +','+ testData.movie3+','+
    testData.movie4 +','+ testData.movie5 +','+ testData.movie6+']');
  });

  beforeEach(() => {
    userController = new UserController();
    const loginSpy = jest.spyOn(userController.userDataAccess, 'login');
    const existsSpy = jest.spyOn(userController.userDataAccess, 'exists');
    existsSpy.mockReturnValue(true);
    loginSpy.mockReturnValue(true);
    userController.login('pepep@gmail.com', '424pass2343421');
    spy = jest.spyOn(userController.userDataAccess, 'getFavorites');
  });

  afterEach(() => {
    spy.mockRestore();
  });

  test('Get favorites from user with favorites', () => {
    const userEmail = 'pepep@gmail.com';
    const token = userController.sessionArray[0].token;
    spy.mockReturnValue(favoritesMock);
    const favorites = userController.getFavorites(userEmail, token);
    expect(favorites).toHaveLength(6);
    expect(checkOrderedBySuggestion(favorites)).toBeTruthy();
  });

  test('Get favorites from user with wrong token', () => {
    const userEmail = 'juan@gmail.com';
    const token = userController.sessionArray[0].token;
    spy.mockReturnValue([]);
    expect(() => {
      userController.getFavorites(userEmail, token);
    }).toThrow(InvalidTokenError);
  });

  test('Get favorites from user without registered token', () => {
    const userEmail = 'juan@gmail.com';
    const token = 'not a token';
    spy.mockReturnValue([]);
    expect(() => {
      userController.getFavorites(userEmail, token);
    }).toThrow(InvalidTokenError);
  });

  test('Get favorites from user without favorites', () => {
    const userEmail = 'pepep@gmail.com';
    const token = userController.sessionArray[0].token;
    spy.mockReturnValue([]);
    const favorites = userController.getFavorites(userEmail, token);
    expect(favorites).toHaveLength(0);
  });

  function checkOrderedBySuggestion(favoriteArray) {
    let isOrderedBySuggestion = true;
    let lastSuggestion = 100;
    for (let i = 0; i < favoriteArray.length && isOrderedBySuggestion; i++) {
      const favoriteIterator = favoriteArray[i];
      if (favoriteIterator.suggestionForTodayScore > lastSuggestion) {
        isOrderedBySuggestion = false;
      }
      lastSuggestion= favoriteIterator.suggestionForTodayScore;
    }
    return isOrderedBySuggestion;
  }
});


describe('Get movies tests', () =>{
  let testData;
  let moviesMock;
  let correctResponse;
  let errorResponse;


  beforeAll(() => {
    testData = new TestData();
    moviesMock = JSON.parse('['+testData.movie1 +','+ testData.movie2 +','+ testData.movie3+']');
    correctResponse = {
      status: 200,
      body:
       {
         results: moviesMock,
       },
    };
    errorResponse = {
      status: 200,
      error: 'Error',
    };
  });

  beforeEach(() => {
    userController = new UserController();
    const loginSpy = jest.spyOn(userController.userDataAccess, 'login');
    const existsSpy = jest.spyOn(userController.userDataAccess, 'exists');
    existsSpy.mockReturnValue(true);
    loginSpy.mockReturnValue(true);
    userController.login('pepep@gmail.com', '424pass2343421');
  });

  afterEach(()=>{
    unirest.get.mockRestore();
  });

  test('Get movies with keyword from authenticated user', () => {
    unirest.get.mockResolvedValue(correctResponse);
    const validToken = userController.sessionArray[0].token;
    return favorites = userController.getMoviesByKeyword(validToken, 'super').then((data) => {
      expect(data).toBe(moviesMock);
    });
  });

  test('Get movies with keyword from non-authenticated user', async () => {
    const invalidToken = userController.sessionArray[0].token + 1;
    await expect(userController.getMoviesByKeyword(invalidToken, ''))
        .rejects.toThrow(InvalidTokenError);
  });

  test('Get movies without keyword from authenticated user', async () => {
    unirest.get.mockResolvedValue(errorResponse);
    const invalidToken = userController.sessionArray[0].token;
    await expect(userController.getMoviesByKeyword(invalidToken, ''))
        .rejects.toThrow(HTTPRequestError);
  });
});
