const fs = require('fs');
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
  

function usersFileInitialize(){
    dataAccess = new userDataAccess(pathToUsersFile);
    fs.writeFile(pathToUsersFile, testData);
}

test('User already registered login', () =>{
    expect(dataAccess.login('juanasanchez@gmail.com','password12345')).toBeTruthy();
});