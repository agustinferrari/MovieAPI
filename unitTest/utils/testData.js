const fs = require('fs');
const pathToUsersFile = './unitTest/usersTest.txt';
const pathToFavoritesFile = './unitTest/favoritesTest.txt';

class TestData {
  constructor() {
    this.movie1 = '{"original_title": "Mikes New Car", "genre_ids": [ 16, 10751 ], "id": 13931,'+
    ' "addedAt" : "'+new Date().toISOString().slice(0, 10)+'"}';
    this.movie2 = '{"original_title": "Cop Car", "genre_ids": [ 53 ], "id": 310133,'+
    ' "addedAt" : "'+new Date().toISOString().slice(0, 10)+'"}';
    this.movie3 = '{"original_title": "Fast man", "genre_ids": [ 434 ], "id": 63423,'+
    ' "addedAt" : "'+new Date().toISOString().slice(0, 10)+'"}';
    this.movie4 = '{"original_title": "Superman", "genre_ids": [ 24 ], "id": 789532,'+
    ' "addedAt" : "'+new Date().toISOString().slice(0, 10)+'"}';
    this.movie5 = '{"original_title": "Spiderman", "genre_ids": [ 4555, 4321 ], "id": 32468,'+
    ' "addedAt" : "'+new Date().toISOString().slice(0, 10)+'"}';
    this.movie6 = '{"original_title": "Batman", "genre_ids": [ 21 ], "id": 34211,'+
    ' "addedAt" : "'+new Date().toISOString().slice(0, 10)+'"}';
    this.movie1WithoutAddedAt = '{"original_title": "Fast man", "genre_ids": [ 434 ], "id": 63423}';
    this.movie2WithoutAddedAt = '{"original_title": "Cop Car", "genre_ids": [ 53 ], "id": 310133}';
    this.addFavoriteArray = '['+ this.movie1WithoutAddedAt + ',' + this.movie2WithoutAddedAt +']';
    this.addFavoriteArrayResponse = '['+ this.movie3 + ',' + this.movie2 +']';
    this.addFavoriteEntry ='{' +
    '"email": "juanasanchez@gmail.com",' +
    '"movies": '+ this.addFavoriteArray +
    '}';
    this.invalidAddFavoriteEntry ='{' +
    '"email": "juanasanchez@gmail.com"' +
    '}';
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
    this.invalidJSONUser = '{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana",';
    this.invalidUser = '{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana"}';
    this.loginJSON = '{' +
      '"email": "pepep@gmail.com",' +
      '"password": "424pass2343421"' +
    '}';
    this.invalidLoginJSON = '{' +
      '"email": "pepep@gmail.com",' +
      '"pass": "424pass2343421"' +
    '}';
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
