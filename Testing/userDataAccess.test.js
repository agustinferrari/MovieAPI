const fs = require('fs');
const {UserDataAccess} = require('./../DataAccess/UserDataAccess.js');
const pathToUsersFile = 'usersTest.txt';
let dataAccess;

const testData = '{' +
    '"email": "juanasanchez@gmail.com",' +
    '"firstName": "Juana",' +
    '"lastName": "Sanchez",' +
    '"password": "password12345"' +
 '}';

beforeEach(() => {
  usersFileInitialize();
});


function usersFileInitialize() {
  dataAccess = new UserDataAccess(pathToUsersFile);
  fs.writeFile(pathToUsersFile, testData, function(err, result) {
    if (err) {
      console.log('Error trying to write on ' +pathToUsersFile, err);
    }
  });
}

test('User already registered login', () =>{
  expect(dataAccess.login('juanasanchez@gmail.com', 'password12345')).toBeTruthy();
});
