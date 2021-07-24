const {TestData} = require('./testData.js');

class ValidatorTestData {
  constructor() {
    this.testData = new TestData();
    this.invalidUser1 = JSON.parse('{' +
      '"firstName": "Juana",' +
      '"lastName": "Sanchez",' +
      '"password": "password12345"' +
    '}');
    this.invalidUser2 = JSON.parse('{' +
      '"email": "juanasanchez@gmail.com",' +
      '"lastName": "Sanchez",' +
      '"password": "password12345"' +
    '}');
    this.invalidUser3 = JSON.parse('{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana",' +
      '"password": "password12345"' +
    '}');
    this.invalidUser4 = JSON.parse('{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana",' +
      '"lastName": "Sanchez"' +
    '}');
    this.invalidUser5 = JSON.parse('{' +
      '"email": "",' +
      '"firstName": "Juana",' +
      '"lastName": "Sanchez",' +
      '"password": "password12345"' +
    '}');
    this.invalidUser6 = JSON.parse('{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "",' +
      '"lastName": "Sanchez",' +
      '"password": "password12345"' +
    '}');
    this.invalidUser7 = JSON.parse('{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana",' +
      '"lastName": "",' +
      '"password": "password12345"' +
    '}');
    this.invalidUser8 = JSON.parse('{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana",' +
      '"lastName": "Sanchez",' +
      '"password": ""' +
    '}');
    this.validUser = JSON.parse('{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana",' +
      '"lastName": "Sanchez",' +
      '"password": "password12345"' +
    '}');
    this.invalidUserArray = [this.invalidUser1, this.invalidUser2,
      this.invalidUser3, this.invalidUser4, this.invalidUser5,
      this.invalidUser6, this.invalidUser7, this.invalidUser8];

    this.invalidLogin1 = JSON.parse('{' +
      '"password": "password12345"' +
    '}');
    this.invalidLogin2 = JSON.parse('{' +
    '"email": "juanasanchez@gmail.com"' +
    '}');
    this.validLogin = JSON.parse('{' +
    '"email": "juanasanchez@gmail.com",' +
    '"password": "password12345"' +
    '}');
    this.invalidLoginArray = [this.invalidLogin1, this.invalidLogin2];

    this.validAddFavorite = JSON.parse('{' +
    '"email": "juanasanchez@gmail.com",' +
    '"movies": [' +
    this.testData.movie1 +','+
    this.testData.movie2 + ','+
    this.testData.movie3+']' +
    '}');
    this.invalidAddFavorite1 = JSON.parse('{' +
    '"notemail": "juanasanchez@gmail.com",' +
    '"movies": [' +
    this.testData.movie1 +','+
    this.testData.movie2 + ','+
    this.testData.movie3+']' +
    '}');
    this.invalidAddFavorite2 = JSON.parse('{' +
    '"email": "juanasanchez@gmail.com",' +
    '"movies": []' +
    '}');
    this.invalidAddFavorite3 = JSON.parse('{' +
    '"email": "juanasanchez@gmail.com"}');

    this.invalidAddFavorite4 = JSON.parse('{' +
    '"email": "juanasanchez@gmail.com",' +
    '"movies": [{' +
    '"title": "Superman"'+
    '}]' +
    '}');
    this.invalidAddFavorite5 = JSON.parse('{' +
    '"email": "juanasanchez@gmail.com",' +
    '"movies": [{' +
    '"title": "Superman",'+
    '"id": "-45"'+
    '}]' +
    '}');
    this.invalidAddFavorite6 = JSON.parse('{' +
    '"email": "juanasanchez@gmail.com",' +
    '"movies": [{' +
    '"title": "Superman",'+
    '"id": "notNumber"'+
    '}]' +
    '}');
    this.invalidAddFavorite7 = JSON.parse('{' +
    '"email": "juanasanchez@gmail.com",' +
    '"movies": [{' +
    '"title": "Superman",'+
    '"id": ""'+
    '}]' +
    '}');
    this.invalidAddFavoriteArray = [this.invalidAddFavorite1, this.invalidAddFavorite2,
      this.invalidAddFavorite3, this.invalidAddFavorite4, this.invalidAddFavorite5,
      this.invalidAddFavorite6, this.invalidAddFavorite7];
  }
}

module.exports = {ValidatorTestData: ValidatorTestData};
