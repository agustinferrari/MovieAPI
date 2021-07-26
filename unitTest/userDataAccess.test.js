const fs = require('fs');
const {UserDataAccess} = require('../dataAccess/userDataAccess.js');
const {TestData} = require('./utils/testData.js');
const pathToUsersFile = './unitTest/usersTest.txt';
const pathToFavoritesFile = './unitTest/favoritesTest.txt';
let userDataAccess;
let testData;

beforeAll(() => {
  testData = new TestData();
  userDataAccess = new UserDataAccess(pathToUsersFile, pathToFavoritesFile);
});

beforeEach(() => {
  testData.testFilesInitialize();
});

afterEach(() => {
  testData.testFilesEmtpy();
});

test('User already registered login', () =>{
  expect(userDataAccess.login('juanasanchez@gmail.com', 'password12345')).toBeTruthy();
});

test('User already registered login with different capitalization', () =>{
  expect(userDataAccess.login('JUANASANCHEZ@GMAIL.COM', 'password12345')).toBeTruthy();
});

test('User not registered login', () =>{
  expect(userDataAccess.login('jaime@gmail.com', 'superSecurePass')).toBeFalsy();
});

test('Empty email login', () =>{
  expect(userDataAccess.login('', 'password12345')).toBeFalsy();
});

test('Empty password login', () =>{
  expect(userDataAccess.login('juanasanchez@gmail.com', '')).toBeFalsy();
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

function getFavoritesTest(userEmail, expectedData) {
  const favorites = userDataAccess.getFavorites(userEmail);
  const expectedFavorites = JSON.parse(expectedData);
  expect(favorites).toEqual(expectedFavorites);
}
