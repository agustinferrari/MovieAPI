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
UserController.mockImplementation(
    () => ({
      getMovies: getMoviesMock,
      register: registerUserMock,
      login: loginMock,
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
});

describe('Get movies tests', () =>{
  const popularMovies =
  JSON.parse('['+testData.movie1 +','+ testData.movie2 +','+ testData.movie3+']');
  const keywordMovies =
  JSON.parse('['+testData.movie4 +','+ testData.movie5 +','+ testData.movie6+']');


  test('Get movies from authenticated user without keyword', async () => {
    getMoviesMock.mockResolvedValue(popularMovies);
    const response = await request.get('/getMovies').query({
      token: 's6ra092t080te2t12',
    });
    expect(response.body.message).toStrictEqual(popularMovies);
    expect(getMoviesMock.mock.calls[0][0]).toStrictEqual('s6ra092t080te2t12');
    expect(response.status).toBe(200);
  });

  test('Get movies from authenticated user with keyword', async () => {
    getMoviesMock.mockResolvedValue(keywordMovies);
    const response = await request.get('/getMovies').query({
      token: 's6ra092t080te2t12',
      keyword: 'Man',
    });
    expect(response.body.message).toStrictEqual(keywordMovies);
    expect(getMoviesMock.mock.calls[0][0]).toStrictEqual('s6ra092t080te2t12');
    expect(getMoviesMock.mock.calls[0][1]).toStrictEqual('Man');
    expect(response.status).toBe(200);
  });

  test('Get movies from non-authenticated user without keyword', async () => {
    getMoviesMock.mockImplementation(() => {
      throw new InvalidTokenError('Error: the received token is invalid.');
    });
    const response = await request.get('/getMovies').query({
      token: '89ts90ruylhn3keit0',
    });
    expect(response.status).toBe(401);
    expect(response.body).toBe('Error: the received token is invalid.');
  });

  test('Get movies without token', async () => {
    getMoviesMock.mockImplementation(() => {
      throw new InvalidTokenError('Error: the received token is invalid.');
    });
    const response = await request.get('/getMovies');
    expect(response.status).toBe(401);
    expect(response.body).toBe('Error: the received token is invalid.');
  });

  test('Get movies unexpected error', async () => {
    getMoviesMock.mockImplementation(() => {
      throw new UnexpectedError('Error description');
    });
    const response = await request.get('/getMovies').query({
      token: '89ts90ruylhn3keit0',
    });
    expect(response.status).toBe(500);
    expect(response.body).toBe('Error: Unexpected Error');
  });

  test('Get movies HTTPRequestError', async () => {
    getMoviesMock.mockImplementation(() => {
      throw new HTTPRequestError('Error: Error while sending request to TheMovieDB.');
    });
    const response = await request.get('/getMovies').query({
      token: '89ts90ruylhn3keit0',
    });
    expect(response.status).toBe(502);
    expect(response.body).toBe('Error: Error while sending request to TheMovieDB.');
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
    expect(response.status).toBe(200);
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
    expect(response.status).toBe(400);
  });

  test('Register invalid user', async () => {
    registerUserMock.mock.calls = [];
    const response = await request.post('/registerUser')
        .send(testData.invalidJSONUser)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(registerUserMock.mock.calls.length).toBe(0);
    expect(response.status).toBe(400);
  });

  test('Register invalid user', async () => {
    registerUserMock.mock.calls = [];
    const response = await request.post('/registerUser')
        .send(testData.invalidUser)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(registerUserMock.mock.calls.length).toBe(0);
    expect(response.status).toBe(400);
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
    expect(response.status).toBe(200);
    expect(response.body).toBe('r21sF34Ti55n4fN4S5uf6');
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
    expect(response.status).toBe(409);
    expect(response.body).toBe('Error: the email received is not linked to any account.');
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
    expect(response.status).toBe(409);
    expect(response.body).toBe('Error: the password received is incorrect.');
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
    expect(response.status).toBe(500);
    expect(response.body).toBe('Error: Unexpected Error');
  });

  test('Login with registered user but incorrect password', async () => {
    const response = await request.post('/login')
        .send(testData.invalidLoginJSON)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(loginMock.mock.calls.length).toBe(0);
    expect(response.status).toBe(400);
  });
});
