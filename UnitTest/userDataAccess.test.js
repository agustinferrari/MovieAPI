const fs = require('fs');
const {UserDataAccess} = require('./../DataAccess/UserDataAccess.js');
const pathToUsersFile = './UnitTest/usersTest.txt';
const pathToFavoritesFile = './UnitTest/usersTest.txt';
let userDataAccess;

const movie1 = '{"original_title": "Mikes New Car", "genre_ids": [ 16, 10751 ], "id": 13931}';
const movie2 = '{"original_title": "Cop Car", "genre_ids": [ 53 ], "id": 310133}';

const movieTestData = '[{"user": "juanasanchez@gmail.com",'+
  '+"favorites":['+ movie1 +','+ movie2 +']}]';

const userJuanaJSON = '{' +
  '"email": "juanasanchez@gmail.com",' +
  '"firstName": "Juana",' +
  '"lastName": "Sanchez",' +
  '"password": "password12345"' +
 '}';
const userPepeJSON = '{' +
  '"email": "pepep@gmail.com",' +
  '"firstName": "Pepe",' +
  '"lastName": "Gonzales",' +
  '"password": "424pass2343421"' +
'}';

const userTestData = '['+ userJuanaJSON +','+ userPepeJSON +']';

beforeEach(() => {
  usersFileInitialize();
});

afterEach(() => {
  usersFileEmtpy();
});

function usersFileInitialize() {
  userDataAccess = new UserDataAccess(pathToUsersFile);
  favoriteDataAcess = new FavoriteDataAccess(pathToFavoritesFile);
  fs.writeFileSync(pathToUsersFile, userTestData);
  fs.writeFileSync(pathToFavoritesFile, userTestData);
}

function usersFileEmtpy() {
  fs.writeFileSync(pathToUsersFile, '');
}

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
  const expectedData = '['+ userJuanaJSON +','+ userPepeJSON +','+ newUserJSON +']';
  const expectedUsers = JSON.parse(expectedData);

  const actualData = fs.readFileSync(pathToUsersFile);
  const actualUsers = JSON.parse(actualData);
  expect(actualUsers).toEqual(expectedUsers);
});

test('Register already registered user', () =>{
  const newUser = {
    email: 'pepep@gmail.com',
    firstName: 'Pepe',
    lastName: 'Gonzales',
    password: '424pass2343421',
  };
  expect(userDataAccess.register(newUser)).toBeFalsy();
  const expectedData = '['+ userJuanaJSON +','+ userPepeJSON +']';
  const expectedUsers = JSON.parse(expectedData);

  const actualData = fs.readFileSync(pathToUsersFile);
  const actualUsers = JSON.parse(actualData);
  expect(actualUsers).toEqual(expectedUsers);
});

test('Register with already used mail', () =>{
  const newUser = {
    email: 'pepep@gmail.com',
    firstName: 'Pepe',
    lastName: 'Diaz',
    password: '42fp023431',
  };
  expect(userDataAccess.register(newUser)).toBeFalsy();
  const expectedData = '['+ userJuanaJSON +','+ userPepeJSON +']';
  const expectedUsers = JSON.parse(expectedData);

  const actualData = fs.readFileSync(pathToUsersFile);
  const actualUsers = JSON.parse(actualData);
  expect(actualUsers).toEqual(expectedUsers);
});

test('Add favorite movie to certain user', () =>{
  expect(favoriteDataAcess.add('pepep@gmail.com', movie)).toBeTruthy();
  const expectedData = '['+ userJuanaJSON +','+ userPepeJSON +']';
  const expectedUsers = JSON.parse(expectedData);

  const actualData = fs.readFileSync(pathToFavoritesFile);
  const actualUsers = JSON.parse(actualData);
  expect(actualUsers).toEqual(expectedUsers);
});
