const fs = require('fs');
const {UserDataAccess} = require('../dataAccess/userDataAccess.js');
const {TestData} = require('./utils/testData.js');
const pathToUsersFile = './unitTest/usersTest.txt';
const pathToFavoritesFile = './unitTest/favoritesTest.txt';
let userDataAccess;
let testData;

beforeAll(() => {
  testData = new TestData();
  userDataAccess = new UserDataAccess();
  userDataAccess.pathToUserData =pathToUsersFile;
  userDataAccess.pathToFavoriteData =pathToFavoritesFile;
});

beforeEach(() => {
  testData.testFilesInitialize();
});

afterEach(() => {
  testData.testFilesEmtpy();
});

test('User already registered getHashedPassword', () =>{
  const hashedPassword = userDataAccess.getHashedPassword('juanasanchez@gmail.com');
  const expectedHashedPassword = 'password12345';
  expect(hashedPassword).toBe(expectedHashedPassword);
});

test('User already registered getHashedPassword with different capitalization', () =>{
  const hashedPassword = userDataAccess.getHashedPassword('JUANASANCHEZ@GMAIL.COM');
  const expectedHashedPassword = 'password12345';
  expect(hashedPassword).toBe(expectedHashedPassword);
});

test('User not registered getHashedPassword', () =>{
  const hashedPassword = userDataAccess.getHashedPassword('jaime@gmail.com');
  const expectedHashedPassword = 'superSecurePass';
  expect(hashedPassword).not.toBe(expectedHashedPassword);
});

test('Empty email getHashedPassword', () =>{
  const hashedPassword = userDataAccess.getHashedPassword('');
  const expectedHashedPassword = 'password12345';
  expect(hashedPassword).not.toBe(expectedHashedPassword);
});

test('Empty password getHashedPassword', () =>{
  const hashedPassword = userDataAccess.getHashedPassword('juanasanchez@gmail.com');
  const expectedHashedPassword = '';
  expect(hashedPassword).not.toBe(expectedHashedPassword);
});

test('Check existence of unexistent user', () =>{
  expect(userDataAccess.exists('albertojuan@gmail.com')).toBeFalsy();
});

test('Check existence of existent user', () =>{
  expect(userDataAccess.exists('pepep@gmail.com')).toBeTruthy();
});

test('Check existence of existent user with different capitalization', () =>{
  expect(userDataAccess.exists('pEPEp@gmail.coM')).toBeTruthy();
});


test('Register new user', () =>{
  const newUser = {
    email: 'alfp@yahoo.com',
    firstName: 'Alfredo',
    lastName: 'Perez',
    password: 'My1password231',
  };
  expect(userDataAccess.register(newUser)).toBeTruthy();
  const newUserJSON = JSON.stringify(newUser);
  const expectedData = '['+testData.userJuanaJSON+','+testData.userPepeJSON +','+ newUserJSON+']';
  checkUserTextfileIsCorrect(expectedData);
});

test('Register already registered user', () =>{
  const newUser = {
    email: 'pepep@gmail.com',
    firstName: 'Pepe',
    lastName: 'Gonzales',
    password: '424pass2343421',
  };
  expect(userDataAccess.register(newUser)).toBeFalsy();
  const expectedData = '['+ testData.userJuanaJSON +','+ testData.userPepeJSON +']';
  checkUserTextfileIsCorrect(expectedData);
});

test('Register with already used mail', () =>{
  const newUser = {
    email: 'pepep@gmail.com',
    firstName: 'Pepe',
    lastName: 'Diaz',
    password: '42fp023431',
  };
  expect(userDataAccess.register(newUser)).toBeFalsy();
  const expectedData = '['+ testData.userJuanaJSON +','+ testData.userPepeJSON +']';
  checkUserTextfileIsCorrect(expectedData);
});

function checkUserTextfileIsCorrect(expectedData) {
  const expectedUsers = JSON.parse(expectedData);
  const actualData = fs.readFileSync(pathToUsersFile);
  const actualUsers = JSON.parse(actualData);
  expect(actualUsers).toEqual(expectedUsers);
}

test('Add favorite movie to existent user without favorites', () =>{
  const movieObject1 = JSON.parse(testData.movie1);
  expect(userDataAccess.addFavorite('pepep@gmail.com', movieObject1)).toBeTruthy();
  const expectedData = '[{"userId": "juanasanchez@gmail.com",' +
  '"favorites":['+ testData.movie1 +','+ testData.movie2 +']},' +
  '{"userId": "pepep@gmail.com",' +
  '"favorites":['+ testData.movie1 +']}]';
  checkFavoriteTextfileIsCorrect(expectedData);
});

test('Add favorite movie nonexistent user', () =>{
  const movieObject3 = JSON.parse(testData.movie3);
  expect(userDataAccess.addFavorite('mario@gmail.com', movieObject3)).toBeFalsy();
});

test('Add favorite movie to existent user with favorites', () =>{
  const movieObject3 = JSON.parse(testData.movie3);
  expect(userDataAccess.addFavorite('juanasanchez@gmail.com', movieObject3)).toBeTruthy();
  const expectedData = '[{"userId": "juanasanchez@gmail.com",' +
  '"favorites":['+ testData.movie1 +','+ testData.movie2 +','+ testData.movie3 +']}]';
  checkFavoriteTextfileIsCorrect(expectedData);
});

test('Add repeated favorite movie to existent user', () =>{
  const movieObject2 = JSON.parse(testData.movie2);
  expect(userDataAccess.addFavorite('juanasanchez@gmail.com', movieObject2)).toBeTruthy();
  const expectedData = '[{"userId": "juanasanchez@gmail.com",' +
  '"favorites":['+ testData.movie1 +','+ testData.movie2 +']}]';
  checkFavoriteTextfileIsCorrect(expectedData);
});

function checkFavoriteTextfileIsCorrect(expectedData) {
  const expectedFavorites = JSON.parse(expectedData);
  const actualData = fs.readFileSync(pathToFavoritesFile);
  const actualFavorites = JSON.parse(actualData);
  expect(actualFavorites).toEqual(expectedFavorites);
}

test('Get user favorites with at least one favorite movie', () =>{
  getFavoritesTest('juanasanchez@gmail.com', '[' + testData.movie1 +','+ testData.movie2 + ']');
});

test('Get user favorites with no favorite movies', () =>{
  getFavoritesTest('pepep@gmail.com', '[]');
});

test('Get favorites from unregistered user ', () =>{
  getFavoritesTest('mario@gmail.com', '[]');
});

describe('Read user data tests', () => {
  test('Read user data with correct data in textfile', () =>{
    userDataAccess.readUserData();
    const actualUserData = fs.readFileSync(pathToUsersFile);
    const userData = userDataAccess.users;
    expect(userData).toStrictEqual(JSON.parse(actualUserData));
  });

  test('Read user from empty textfile', () =>{
    testData.testFilesEmtpy();
    userDataAccess.readUserData();
    const userData = userDataAccess.users;
    expect(userData).toStrictEqual(JSON.parse('[]'));
  });

  test('Read user from incorrect json textfile', () =>{
    testData.testFilesIncorrectJSON();
    userDataAccess.readUserData();
    const userData = userDataAccess.users;
    expect(userData).toStrictEqual(JSON.parse('[]'));
  });

  test('Read user from textfile not with json object instead of array of objects', () =>{
    testData.testFilesIncorrectNotArray();
    userDataAccess.readUserData();
    const userData = userDataAccess.users;
    expect(userData).toStrictEqual(JSON.parse('[]'));
  });
});

describe('Read user and favorites data tests', () => {
  test('Read user favorite data with correct data in textfile', () =>{
    userDataAccess.readUserFavoriteData();
    const actualData = fs.readFileSync(pathToFavoritesFile);
    const favoritesData = userDataAccess.favorites;
    expect(favoritesData).toStrictEqual(JSON.parse(actualData));
  });

  test('Read user favorite from empty textfile', () =>{
    testData.testFilesEmtpy();
    userDataAccess.readUserFavoriteData();
    const favoritesData = userDataAccess.favorites;
    expect(favoritesData).toStrictEqual(JSON.parse('[]'));
  });

  test('Read user favorite from incorrect json textfile', () =>{
    testData.testFilesIncorrectJSON();
    userDataAccess.readUserFavoriteData();
    const favoritesData = userDataAccess.favorites;
    expect(favoritesData).toStrictEqual(JSON.parse('[]'));
  });

  test('Read user favorite from textfile not with json object instead of array of objects', () =>{
    testData.testFilesIncorrectNotArray();
    userDataAccess.readUserFavoriteData();
    const favoritesData = userDataAccess.favorites;
    expect(favoritesData).toStrictEqual(JSON.parse('[]'));
  });
});

function getFavoritesTest(userEmail, expectedData) {
  const favorites = userDataAccess.getFavorites(userEmail);
  const expectedFavorites = JSON.parse(expectedData);
  expect(favorites).toEqual(expectedFavorites);
}
