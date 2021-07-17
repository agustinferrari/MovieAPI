const fs = require('fs');
const {UserDataAccess} = require('./../DataAccess/UserDataAccess.js');
const pathToUsersFile = 'usersTest.txt';
let dataAccess;

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

const testData = '['+ userJuanaJSON +','+ userPepeJSON +']';

beforeEach(() => {
  usersFileInitialize();
});

afterEach(() => {
  usersFileEmtpy();
});

function usersFileInitialize() {
  dataAccess = new UserDataAccess(pathToUsersFile);
  fs.writeFileSync(pathToUsersFile, testData, function(err, result) {
    if (err) {
      console.log('Error trying to write on ' + pathToUsersFile, err);
    }
  });
}

function usersFileEmtpy() {
  fs.writeFileSync(pathToUsersFile, '', function(err, result) {
    if (err) {
      console.log('Error trying to write on ' + pathToUsersFile, err);
    }
  });
}

test('User already registered login', () =>{
  expect(dataAccess.login('juanasanchez@gmail.com', 'password12345')).toBeTruthy();
});

test('User already registered login with different capitalization', () =>{
  expect(dataAccess.login('JUANASANCHEZ@GMAIL.COM', 'password12345')).toBeTruthy();
});

test('User not registered login', () =>{
  expect(dataAccess.login('jaime@gmail.com', 'superSecurePass')).toBeFalsy();
});

test('Empty email login', () =>{
  expect(dataAccess.login('', 'password12345')).toBeFalsy();
});

test('Empty password login', () =>{
  expect(dataAccess.login('juanasanchez@gmail.com', '')).toBeFalsy();
});

test('Check existence of unexistent user', () =>{
  expect(dataAccess.exists('albertojuan@gmail.com')).toBeFalsy();
});

test('Check existence of existent user', () =>{
  expect(dataAccess.exists('pepep@gmail.com')).toBeTruthy();
});

test('Check existence of existent user with different capitalization', () =>{
  expect(dataAccess.exists('pEPEp@gmail.coM')).toBeTruthy();
});


test('Register new user', () =>{
  const newUser = {
    email: 'alfp@yahoo.com',
    firstName: 'Alfredo',
    lastName: 'Perez',
    password: 'My1password231',
  };
  dataAccess.register(newUser);
  const newUserJSON = JSON.stringify(newUser);
  const expectedData = '['+ userJuanaJSON + userPepeJSON + newUserJSON +']';

  const actualData = fs.readFileSync(pathToUsersFile);
  expect(actualData).toEqual(expectedData);
});
