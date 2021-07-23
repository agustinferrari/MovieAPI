const fs = require('fs');
const pathToUsersFile = './unitTest/usersTest.txt';
const pathToFavoritesFile = './unitTest/favoritesTest.txt';

class TestData {
  constructor() {
    this.movie1 = '{"original_title": "Mikes New Car", "genre_ids": [ 16, 10751 ], "id": 13931,'+
    ' "addedAt" : "2021-07-19"}';
    this.movie2 = '{"original_title": "Cop Car", "genre_ids": [ 53 ], "id": 310133,'+
    ' "addedAt" : "2021-02-16"}';
    this.movie3 = '{"original_title": "Fast man", "genre_ids": [ 434 ], "id": 63423,'+
    ' "addedAt" : "2021-03-17"}';
    this.movie4 = '{"original_title": "Superman", "genre_ids": [ 24 ], "id": 789532,'+
    ' "addedAt" : "2021-02-29"}';
    this.movie5 = '{"original_title": "Spiderman", "genre_ids": [ 4555, 4321 ], "id": 32468,'+
    ' "addedAt" : "2021-01-14"}';
    this.movie6 = '{"original_title": "Batman", "genre_ids": [ 21 ], "id": 34211,'+
    ' "addedAt" : "2021-05-04"}';
    this.movieWithoutAddedAt = '{"original_title": "Fast man", "genre_ids": [ 434 ], "id": 63423}';
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
    this.invalidJSON1 = '{' +
      '"email" "juanasanchez@gmail.com",' +
      '"firstName" "Juana",' +
      '"lastName" "Sanchez",' +
      '"password" "password12345"' +
    '}';
    this.invalidJSON2 = '{' +
      '"email": "juanasanchez@gmail.com",' +
      '"fi}';
    this.invalidJSON3 = '{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana",' +
      '"lastName": "Sanchez",' +
      '"password": "password12345"';
    this.invalidJSON4 =
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana",' +
      '"lastName": "Sanchez",' +
      '"password": "password12345"';
    this.invalidJSON5 = '{' +
      '"email": "juanasanchez@gmail.com"' +
      '"firstName": "Juana"' +
      '"lastName": "Sanchez"' +
      '"password": "password12345"';
    this.invalidJSONArray = [this.invalidJSON1, this.invalidJSON2,
      this.invalidJSON3, this.invalidJSON4, this.invalidJSON5];
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
