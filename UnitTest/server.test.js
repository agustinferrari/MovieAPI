const {HTTPRequestError} = require('../utils/customExceptions/httpRequestError');
const {InvalidTokenError} = require('../utils/customExceptions/invalidTokenError.js');
const {InvalidEmailError} = require('../utils/customExceptions/invalidEmailError.js');
const {InvalidPasswordError} = require('../utils/customExceptions/invalidPasswordError.js');
const {TestData} = require('./utils/testData.js');
const testData = new TestData();
const {UserController} = require('./../logic/userController.js');
jest.mock('./../logic/userController.js');
const getMoviesMock = jest.fn();
const registerUserMock = jest.fn();
const loginMock = jest.fn();
const logoutMock = jest.fn();
const addFavoritesMock = jest.fn();
const getFavoritesMock = jest.fn();
UserController.mockImplementation(
    () => ({
      getMovies: getMoviesMock,
      register: registerUserMock,
      login: loginMock,
      logout: logoutMock,
      addFavorites: addFavoritesMock,
      getFavorites: getFavoritesMock,
    }),
);

const app = require('./../server.js');
const supertest = require('supertest');
const request = supertest(app);

afterEach(()=>{
  getMoviesMock.mockRestore();
  getMoviesMock.mock.calls = [];
  registerUserMock.mockRestore();
  registerUserMock.mock.calls = [];
  loginMock.mockRestore();
  loginMock.mock.calls = [];
  logoutMock.mockRestore();
  logoutMock.mock.calls = [];
  addFavoritesMock.mockRestore();
  addFavoritesMock.mock.calls = [];
  getFavoritesMock.mockRestore();
  getFavoritesMock.mock.calls = [];
});

describe('Get movies tests', () =>{
  const popularMovies =
  JSON.parse('['+testData.movie1 +','+ testData.movie2 +','+ testData.movie3+']');
  const keywordMovies =
  JSON.parse('['+testData.movie4 +','+ testData.movie5 +','+ testData.movie6+']');


  test('Get movies from authenticated user without keyword', async () => {
    getMoviesMock.mockResolvedValue(popularMovies);
    const response = await request.get('/getMovies').query({
      token: 'EY3Z762DpcUR9eiGe6RR',
    });
    checkResponseBodyStatus(response, popularMovies, 200);
    expect(getMoviesMock.mock.calls[0][0]).toStrictEqual('EY3Z762DpcUR9eiGe6RR');
    expect(getMoviesMock.mock.calls[0][1]).toStrictEqual(undefined);
  });

  test('Get movies from authenticated user with keyword', async () => {
    getMoviesMock.mockResolvedValue(keywordMovies);
    const response = await request.get('/getMovies').query({
      token: 'It8GNmSOj8g137BSRbEa',
      keyword: 'Man',
    });
    checkResponseBodyStatus(response, keywordMovies, 200);
    expect(getMoviesMock.mock.calls[0][0]).toStrictEqual('It8GNmSOj8g137BSRbEa');
    expect(getMoviesMock.mock.calls[0][1]).toStrictEqual('Man');
  });


  test('Get movies from non-authenticated user without keyword', async () => {
    getMoviesMock.mockImplementation(() => {
      throw new InvalidTokenError('Error: the received token is not registered.');
    });
    const response = await request.get('/getMovies').query({
      token: 'It8GNmSOj8g137BSRbEa',
    });
    checkResponseBodyStatus(response, 'Error: the received token is not registered.', 401);
  });

  test('Get movies without token', async () => {
    getMoviesMock.mockImplementation(() => {
      throw new InvalidTokenError('Error: the received token is not registered.');
    });
    const response = await request.get('/getMovies');
    checkResponseBodyStatus(response, 'Error: the specified token is invalid.', 401);
  });

  test('Get movies unexpected error', async () => {
    getMoviesMock.mockImplementation(() => {
      throw new UnexpectedError('Error description');
    });
    const response = await request.get('/getMovies').query({
      token: 'EY3Z762DpcUR9eiGe6RR',
    });
    checkResponseBodyStatus(response, 'Error: Unexpected Error', 500);
  });

  test('Get movies HTTPRequestError', async () => {
    getMoviesMock.mockImplementation(() => {
      throw new HTTPRequestError('Error: Error while sending request to TheMovieDB.');
    });
    const response = await request.get('/getMovies').query({
      token: 'EY3Z762DpcUR9eiGe6RR',
    });
    checkResponseBodyStatus(response, 'Error: Error while sending request to TheMovieDB.', 502);
  });
});


describe('Register user tests', () =>{
  test('Register unregistered user', async () => {
    registerUserMock.mockImplementation(() => {
      return true;
    });
    const newUser = JSON.parse(testData.userJuanaJSON);
    const response = await request.post('/registerUser')
        .send(testData.userJuanaJSON)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(registerUserMock.mock.calls[0][0]).toStrictEqual(newUser);
    checkResponseBodyStatus(response, {}, 200);
  });

  test('Register registered user', async () => {
    registerUserMock.mockImplementation(() => {
      return false;
    });
    const newUser = JSON.parse(testData.userJuanaJSON);
    const response = await request.post('/registerUser')
        .send(testData.userJuanaJSON)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(registerUserMock.mock.calls[0][0]).toStrictEqual(newUser);
    checkResponseBodyStatus(response, {}, 400);
  });

  test('Register invalid user', async () => {
    registerUserMock.mock.calls = [];
    const response = await request.post('/registerUser')
        .send(testData.invalidJSONUser)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(registerUserMock.mock.calls.length).toBe(0);
    checkResponseBodyStatus(response, {}, 400);
  });

  test('Register invalid user', async () => {
    registerUserMock.mock.calls = [];
    const response = await request.post('/registerUser')
        .send(testData.invalidUser)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(registerUserMock.mock.calls.length).toBe(0);
    checkResponseBodyStatus(response, {}, 400);
  });
});


describe('Login tests', () =>{
  test('Login with registered user', async () => {
    loginMock.mockImplementation(() => {
      return 'r21sF34Ti55n4fN4S5uf6';
    });
    const loginEntry = JSON.parse(testData.loginJSON);
    const response = await request.post('/login')
        .send(testData.loginJSON)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(loginMock.mock.calls[0][0]).toStrictEqual(loginEntry.email);
    expect(loginMock.mock.calls[0][1]).toStrictEqual(loginEntry.password);
    checkResponseBodyStatus(response, 'r21sF34Ti55n4fN4S5uf6', 200);
  });

  test('Login with unregistered user', async () => {
    loginMock.mockImplementation(() => {
      throw new InvalidEmailError('Error: the email received is not linked to any account.');
    });
    const loginEntry = JSON.parse(testData.loginJSON);
    const response = await request.post('/login')
        .send(testData.loginJSON)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(loginMock.mock.calls[0][0]).toStrictEqual(loginEntry.email);
    expect(loginMock.mock.calls[0][1]).toStrictEqual(loginEntry.password);
    checkResponseBodyStatus(
        response,
        'Error: the email received is not linked to any account.',
        409,
    );
  });

  test('Login with registered user but incorrect password', async () => {
    loginMock.mockImplementation(() => {
      throw new InvalidPasswordError('Error: the password received is incorrect.');
    });
    const loginEntry = JSON.parse(testData.loginJSON);
    const response = await request.post('/login')
        .send(testData.loginJSON)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(loginMock.mock.calls[0][0]).toStrictEqual(loginEntry.email);
    expect(loginMock.mock.calls[0][1]).toStrictEqual(loginEntry.password);
    checkResponseBodyStatus(response, 'Error: the password received is incorrect.', 409);
  });

  test('Login with registered user but incorrect password', async () => {
    loginMock.mockImplementation(() => {
      throw new UnexpectedError('Error description');
    });
    const loginEntry = JSON.parse(testData.loginJSON);
    const response = await request.post('/login')
        .send(testData.loginJSON)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(loginMock.mock.calls[0][0]).toStrictEqual(loginEntry.email);
    expect(loginMock.mock.calls[0][1]).toStrictEqual(loginEntry.password);
    checkResponseBodyStatus(response, 'Error: Unexpected Error', 500);
  });

  test('Login with registered user but incorrect password', async () => {
    const response = await request.post('/login')
        .send(testData.invalidLoginJSON)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(loginMock.mock.calls.length).toBe(0);
    checkResponseBodyStatus(response, {}, 400);
  });
});


describe('Logout tests', () =>{
  test('Logout valid token', async () => {
    const response = await request.post('/logout')
        .query({
          token: 'It8GNmSOj8g137BSRbEa',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(logoutMock.mock.calls[0][0]).toStrictEqual('It8GNmSOj8g137BSRbEa');
    checkResponseBodyStatus(response, {}, 200);
  });

  test('Logout invalid token', async () => {
    const response = await request.post('/logout')
        .query({
          token: 'It8G37BSRbEa',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(logoutMock.mock.calls.length).toBe(0);
    checkResponseBodyStatus(response, 'Error: the specified token is invalid.', 401);
  });
});

describe('Add favorites tests', () =>{
  test('Add favorites to authenticated user', async () => {
    addFavoritesMock.mockImplementation(() => {
      return true;
    });
    const addFavoriteEntry = JSON.parse(testData.addFavoriteEntry);
    const response = await request.post('/addFavorites')
        .query({
          token: 'It8GNmSOj8g137BSRbEa',
        })
        .send(testData.addFavoriteEntry)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(addFavoritesMock.mock.calls[0][0]).toStrictEqual(addFavoriteEntry.email);
    expect(addFavoritesMock.mock.calls[0][1]).toStrictEqual(addFavoriteEntry.movies);
    expect(addFavoritesMock.mock.calls[0][2]).toStrictEqual('It8GNmSOj8g137BSRbEa');
    checkResponseBodyStatus(response, {}, 200);
  });

  test('Add favorites with unregistered email', async () => {
    addFavoritesMock.mockImplementation(() => {
      return false;
    });
    const addFavoriteEntry = JSON.parse(testData.addFavoriteEntry);
    const response = await request.post('/addFavorites')
        .query({
          token: 'It8GNmSOj8g137BSRbEa',
        })
        .send(testData.addFavoriteEntry)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(addFavoritesMock.mock.calls[0][0]).toStrictEqual(addFavoriteEntry.email);
    expect(addFavoritesMock.mock.calls[0][1]).toStrictEqual(addFavoriteEntry.movies);
    expect(addFavoritesMock.mock.calls[0][2]).toStrictEqual('It8GNmSOj8g137BSRbEa');
    checkResponseBodyStatus(
        response,
        'Error: the email entered does not match the token received',
        401,
    );
  });

  test('Add favorites without matching user-token pair', async () => {
    addFavoritesMock.mockImplementation(() => {
      throw new InvalidTokenError(
          'Error: the received token is not registered or does not belong to the email received.',
      );
    });
    const addFavoriteEntry = JSON.parse(testData.addFavoriteEntry);
    const response = await request.post('/addFavorites')
        .query({
          token: '3z92NmTFj8g137BS2312',
        })
        .send(testData.addFavoriteEntry)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(addFavoritesMock.mock.calls[0][0]).toStrictEqual(addFavoriteEntry.email);
    expect(addFavoritesMock.mock.calls[0][1]).toStrictEqual(addFavoriteEntry.movies);
    expect(addFavoritesMock.mock.calls[0][2]).toStrictEqual('3z92NmTFj8g137BS2312');
    checkResponseBodyStatus(
        response,
        'Error: the received token is not registered or does not belong to the email received.',
        401,
    );
  });

  test('Add favorites unexpected error', async () => {
    addFavoritesMock.mockImplementation(() => {
      throw new UnexpectedError('Error description');
    });
    const addFavoriteEntry = JSON.parse(testData.addFavoriteEntry);
    const response = await request.post('/addFavorites')
        .query({
          token: '3z92NmTFj8g137BS2312',
        })
        .send(testData.addFavoriteEntry)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(addFavoritesMock.mock.calls[0][0]).toStrictEqual(addFavoriteEntry.email);
    expect(addFavoritesMock.mock.calls[0][1]).toStrictEqual(addFavoriteEntry.movies);
    expect(addFavoritesMock.mock.calls[0][2]).toStrictEqual('3z92NmTFj8g137BS2312');
    checkResponseBodyStatus(response, 'Error: Unexpected Error', 500);
  });

  test('Add favorites with invalid add favorite entry', async () => {
    addFavoritesMock.mockImplementation(() => {
      throw new UnexpectedError('Error description');
    });
    const response = await request.post('/addFavorites')
        .query({
          token: '3z92NmTFj8g137BS2312',
        })
        .send(testData.invalidAddFavoriteEntry)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(addFavoritesMock.mock.calls.length).toBe(0);
    checkResponseBodyStatus(response, {}, 400);
  });

  test('Add favorites with invalid token', async () => {
    const response = await request.post('/addFavorites')
        .query({
          token: '3z92NmTFj',
        })
        .send(testData.addFavoriteEntry)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(addFavoritesMock.mock.calls.length).toBe(0);
    checkResponseBodyStatus(response, 'Error: the specified token is invalid.', 401);
  });
});


describe('Get favorites tests', () =>{
  test('Get favorites from user with favorites', async () => {
    getFavoritesMock.mockImplementation(() => {
      return testData.addFavoriteArrayResponse;
    });
    const response = await request.get('/getFavorites')
        .query({
          token: 'It8GNmSOj8g137BSRbEa',
          email: 'pepep@gmail.com',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(getFavoritesMock.mock.calls[0][0]).toStrictEqual('pepep@gmail.com');
    expect(getFavoritesMock.mock.calls[0][1]).toStrictEqual('It8GNmSOj8g137BSRbEa');
    checkResponseBodyStatus(response, testData.addFavoriteArrayResponse, 200);
  });

  test('Get favorites without matching user-token pair', async () => {
    getFavoritesMock.mockImplementation(() => {
      throw new InvalidTokenError(
          'Error: the received token is not registered or does not belong to the email received.',
      );
    });
    const response = await request.get('/getFavorites')
        .query({
          token: 'It8GNmSOj8g137BSRbEa',
          email: 'juan@gmail.com',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(getFavoritesMock.mock.calls[0][0]).toStrictEqual('juan@gmail.com');
    expect(getFavoritesMock.mock.calls[0][1]).toStrictEqual('It8GNmSOj8g137BSRbEa');
    checkResponseBodyStatus(
        response,
        'Error: the received token is not registered or does not belong to the email received.',
        401,
    );
  });

  test('Get favorites unexpected error', async () => {
    getFavoritesMock.mockImplementation(() => {
      throw new UnexpectedError('Error description');
    });
    const response = await request.get('/getFavorites')
        .query({
          token: 'It8GNmSOj8g137BSRbEa',
          email: 'juan@gmail.com',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(getFavoritesMock.mock.calls[0][0]).toStrictEqual('juan@gmail.com');
    expect(getFavoritesMock.mock.calls[0][1]).toStrictEqual('It8GNmSOj8g137BSRbEa');
    checkResponseBodyStatus(response, 'Error: Unexpected Error', 500);
  });

  test('Get favorites with invalid token', async () => {
    const response = await request.get('/getFavorites')
        .query({
          token: 'GNmSOj8',
          email: 'juan@gmail.com',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(getFavoritesMock.mock.calls.length).toBe(0);
    checkResponseBodyStatus(response, 'Error: the specified token is invalid.', 401);
  });
});

function checkResponseBodyStatus(response, expectedBody, expectedStatus) {
  expect(response.body).toStrictEqual(expectedBody);
  expect(response.status).toBe(expectedStatus);
}
