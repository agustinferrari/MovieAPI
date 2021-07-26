const {UserController} = require('./../logic/userController.js');
const {UserDataAccess} = require('../dataAccess/userDataAccess.js');
const {HTTPRequestError} = require('../utils/customExceptions/httpRequestError');
const {InvalidTokenError} = require('../utils/customExceptions/invalidTokenError.js');
const {InvalidEmailError} = require('../utils/customExceptions/invalidEmailError.js');
const {InvalidPasswordError} = require('../utils/customExceptions/invalidPasswordError.js');
const {TestData} = require('./utils/testData.js');
const bcrypt = require('bcrypt');
jest.mock('bcrypt');
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
  let existsSpy;
  let getHashedPasswordMock;

  beforeEach(async () => {
    userController = new UserController();
    bcrypt.compare.mockReturnValue(true);
    existsSpy = jest.spyOn(userController.userDataAccess, 'exists');
    existsSpy.mockReturnValue(true);
    await userController.login('pepep@gmail.com', '424pass2343421');
    getHashedPasswordMock = jest.spyOn(userController.userDataAccess, 'getHashedPassword');
    getHashedPasswordMock.mockReturnValue('424pass2343421');
  });

  afterEach(() => {
    bcrypt.compare.mockRestore();
    existsSpy.mockRestore();
  });

  test('Login registered user', async () =>{
    const user = {
      email: 'juanasanchez@gmail.com',
      password: 'password12345',
    };
    existsSpy.mockReturnValue(true);
    bcrypt.compare.mockReturnValue(true);
    const newToken = await userController.login(user.email, user.password);
    checkTokenValidity(newToken);
    countSessionTest(user.email, 1);
  });

  test('Login already logged in user', async () =>{
    const user = {
      email: 'pepep@gmail.com',
      password: '424pass2343421',
    };
    existsSpy.mockReturnValue(true);
    bcrypt.compare.mockReturnValue(true);
    const newToken = await userController.login(user.email, user.password);
    checkTokenValidity(newToken);
    countSessionTest(user.email, 1);
  });

  test('Login unregistered user', async () =>{
    const user = {
      email: 'mariogaspar@gmail.com',
      password: '343423cxtrp213',
    };
    existsSpy.mockReturnValue(false);
    await expect(userController.login(user.email, user.password)).
        rejects.toThrow(InvalidEmailError);
    countSessionTest(user.email, 0);
  });

  test('Login registered user with wrong password', async () =>{
    const user = {
      email: 'pepep@gmail.com',
      password: 'wrongpassword123',
    };
    existsSpy.mockReturnValue(true);
    bcrypt.compare.mockReturnValue(false);
    await expect(userController.login(user.email, user.password)).
        rejects.toThrow(InvalidPasswordError);
    countSessionTest(user.email, 1);
  });

  test('Logout token in session', async () =>{
    const token = userController.sessionArray[0].token;
    const email = userController.sessionArray[0].userId;
    userController.logout(token);
    countSessionTest(email, 0);
  });

  test('Logout token without session', async () =>{
    const token = userController.sessionArray[0].token + 1;
    const sessionCountBeforeLogout = userController.sessionArray.length;
    userController.logout(token);
    expect(userController.sessionArray.length).toBe(sessionCountBeforeLogout);
  });
});

describe('Register tests', () =>{
  let registerSpy;

  beforeAll(async () => {
    bcrypt.compare.mockReturnValue(true);
    bcrypt.hash.mockImplementation(() => {
      return new Promise((resolve) => {
        return resolve('strsatastd39473-2054');
      });
    });
    existsSpy = jest.spyOn(userController.userDataAccess, 'exists');
    existsSpy.mockReturnValue(true);
  });

  beforeEach(() => {
    userController = new UserController();
    registerSpy = jest.spyOn(userController.userDataAccess, 'register');
  });

  afterEach(() => {
    registerSpy.mockRestore();
  });

  test('Register unregistered user', async () => {
    const plainTextPassword = 'My1password231';
    const newUser = {
      email: 'alfp@yahoo.com',
      firstName: 'Alfredo',
      lastName: 'Perez',
      password: plainTextPassword,
    };
    registerSpy.mockReturnValue(true);
    const registerResult = await userController.register(newUser);
    expect(registerResult).toBeTruthy();
    checkHashPassword(plainTextPassword, newUser);
  });

  test('Register already registered user', async () => {
    const plainTextPassword = '424pass2343421';
    const newUser = {
      email: 'pepep@gmail.com',
      firstName: 'Pepe',
      lastName: 'Gonzales',
      password: '424pass2343421',
    };
    registerSpy.mockReturnValue(false);
    const registerResult = await userController.register(newUser);
    expect(registerResult).toBeFalsy();
    checkHashPassword(plainTextPassword, newUser);
  });

  async function checkHashPassword(plainTextPassword, newUser) {
    const userParameters = registerSpy.mock.calls[0][0];
    const hashedPassword = userParameters.password;
    const isHashed = await bcrypt.compare(plainTextPassword, hashedPassword);
    expect(isHashed).toBeTruthy();
    expect(userParameters).toStrictEqual(newUser);
  }
});

describe('Add favorite tests', () =>{
  let spy;
  let testData;

  beforeAll(() => {
    testData = new TestData();
  });

  beforeEach(async () => {
    userController = new UserController();
    bcrypt.compare.mockReturnValue(true);
    existsSpy = jest.spyOn(userController.userDataAccess, 'exists');
    existsSpy.mockReturnValue(true);
    await userController.login('pepep@gmail.com', '424pass2343421');
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
    const moviesWithoutAddedAt = JSON.parse(testData.addFavoriteArray);
    const moviesWithAddedAt = JSON.parse(testData.addFavoriteArrayResponse);
    spy.mockReturnValue(true);
    const token = userController.sessionArray[0].token;
    expect(userController.addFavorites(registerdUser.email, moviesWithoutAddedAt, token))
        .toBeTruthy();
    const firstMovie = spy.mock.calls[0][1];
    expect(firstMovie).toStrictEqual(moviesWithAddedAt[0]);
    const secondMovie = spy.mock.calls[1][1];
    expect(secondMovie).toStrictEqual(moviesWithAddedAt[1]);
  });

  test('Add favorite movie to unregistered user', () => {
    const registerdUser = {
      email: 'marioalberto@gmail.com',
      firstName: 'Mario',
      lastName: 'Alberto',
      password: '3434PassMarioAlb',
    };
    const moviesWithoutAddedAt = JSON.parse(testData.addFavoriteArray);
    spy.mockReturnValue(false);
    const token = userController.sessionArray[0].token;
    expect(() => {
      userController.addFavorites(registerdUser.email, moviesWithoutAddedAt, token);
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

  beforeEach(async () => {
    userController = new UserController();
    bcrypt.compare.mockReturnValue(true);
    existsSpy = jest.spyOn(userController.userDataAccess, 'exists');
    existsSpy.mockReturnValue(true);
    await userController.login('pepep@gmail.com', '424pass2343421');
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
    expect(checkOrderedBySuggestionForToday(favorites)).toBeTruthy();
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

  function checkOrderedBySuggestionForToday(favoriteArray) {
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
  let keywordMoviesMock;
  let popularMoviesMock;
  let correctResponseKeyword;
  let errorResponse;


  beforeAll(() => {
    testData = new TestData();
    keywordMoviesMock =
     JSON.parse('['+ testData.movie1 +','+ testData.movie2 +','+ testData.movie3 + ',' +
      testData.movie1WithoutAddedAt +']');
    popularMoviesMock=
     JSON.parse('['+testData.movie4 +','+ testData.movie5 +','+ testData.movie6 + ',' +
     testData.movie2WithoutAddedAt +']');
    correctResponseKeyword = {
      status: 200,
      body:
       {
         results: keywordMoviesMock,
       },
    };
    correctResponsePopular = {
      status: 200,
      body:
       {
         results: popularMoviesMock,
       },
    };
    errorResponse = {
      status: 200,
      error: 'Error',
    };
  });

  beforeEach(async () => {
    userController = new UserController();
    bcrypt.compare.mockReturnValue(true);
    existsSpy = jest.spyOn(userController.userDataAccess, 'exists');
    existsSpy.mockReturnValue(true);
    await userController.login('pepep@gmail.com', '424pass2343421');
  });

  afterEach(()=>{
    unirest.get.mockRestore();
  });

  test('Get movies with keyword from authenticated user', async () => {
    unirest.get.mockResolvedValue(correctResponseKeyword);
    const validToken = userController.sessionArray[0].token;
    const moviesReceived = await userController.getMovies(validToken, 'super');
    expect(moviesReceived).toBe(keywordMoviesMock);
    expect(checkOrderedBySuggestion(moviesReceived)).toBeTruthy();
  });

  test('Get movies without keyword from non-authenticated user', async () => {
    const invalidToken = userController.sessionArray[0].token + 1;
    await expect(userController.getMovies(invalidToken, ''))
        .rejects.toThrow(InvalidTokenError);
  });

  test('Get movies without keyword from authenticated user', async () => {
    unirest.get.mockResolvedValue(correctResponsePopular);
    const validToken = userController.sessionArray[0].token;
    const moviesReceived = await userController.getMovies(validToken, '');
    expect(moviesReceived).toBe(popularMoviesMock);
    expect(checkOrderedBySuggestion(moviesReceived)).toBeTruthy();
  });

  test('Error at getting movies without keyword from authenticated user', async () => {
    unirest.get.mockResolvedValue(errorResponse);
    const invalidToken = userController.sessionArray[0].token;
    await expect(userController.getMovies(invalidToken, ''))
        .rejects.toThrow(HTTPRequestError);
  });

  test('Error at getting movies with keyword from authenticated user', async () => {
    unirest.get.mockResolvedValue(errorResponse);
    const invalidToken = userController.sessionArray[0].token;
    await expect(userController.getMovies(invalidToken, 'Mega'))
        .rejects.toThrow(HTTPRequestError);
  });

  function checkOrderedBySuggestion(favoriteArray) {
    let isOrderedBySuggestion = true;
    let lastSuggestion = 100;
    for (let i = 0; i < favoriteArray.length && isOrderedBySuggestion; i++) {
      const favoriteIterator = favoriteArray[i];
      if (favoriteIterator.suggestionScore > lastSuggestion) {
        isOrderedBySuggestion = false;
      }
      lastSuggestion= favoriteIterator.suggestionScore;
    }
    return isOrderedBySuggestion;
  }
});
