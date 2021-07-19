const fs = require('fs');
const pathToUsersFile = './UnitTest/usersTest.txt';
const pathToFavoritesFile = './UnitTest/favoritesTest.txt';

class TestData {
  constructor() {
    this.movie1 = '{"original_title": "Mikes New Car", "genre_ids": [ 16, 10751 ], "id": 13931}';
    this.movie2 = '{"original_title": "Cop Car", "genre_ids": [ 53 ], "id": 310133}';
    this.movie3 = '{"original_title": "Fast man", "genre_ids": [ 434 ], "id": 63423}';
    this.favoriteTestData = '[{"userId": "juanasanchez@gmail.com",'+
      '"favorites":['+ this.movie1 +','+ this.movie2 +']}]';
    this.userJuanaJSON = '{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana",' +
      '"lastName": "Sanchez",' +
      '"password": "password12345"' +
    '}';
    this.userPepeJSON = '{' +
      '"email": "pepep@gmail.com",' +
      '"firstName": "Pepe",' +
      '"lastName": "Gonzales",' +
      '"password": "424pass2343421"' +
    '}';
    this.userTestData = '['+ this.userJuanaJSON +','+ this.userPepeJSON +']';
  }

  testFilesInitialize() {
    fs.writeFileSync(pathToUsersFile, this.userTestData);
    fs.writeFileSync(pathToFavoritesFile, this.favoriteTestData);
  }

  testFilesEmtpy() {
    fs.writeFileSync(pathToUsersFile, '');
    fs.writeFileSync(pathToFavoritesFile, '');
  }
}

module.exports = {TestData: TestData};
