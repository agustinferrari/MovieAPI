const {TestData} = require('./testData.js');

class ValidatorTestData {
  constructor() {
    this.testData = new TestData();
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

    this.invalidUser1 = '{' +
      '"firstName": "Juana",' +
      '"lastName": "Sanchez",' +
      '"password": "password12345"' +
    '}';
    this.invalidUser2 = '{' +
      '"email": "juanasanchez@gmail.com",' +
      '"lastName": "Sanchez",' +
      '"password": "password12345"' +
    '}';
    this.invalidUser3 = '{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana",' +
      '"password": "password12345"' +
    '}';
    this.invalidUser4 = '{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana",' +
      '"lastName": "Sanchez",' +
    '}';
    this.invalidUser5 = '{' +
      '"email": "",' +
      '"firstName": "Juana",' +
      '"lastName": "Sanchez",' +
      '"password": "password12345"' +
    '}';
    this.invalidUser6 = '{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "",' +
      '"lastName": "Sanchez",' +
      '"password": "password12345"' +
    '}';
    this.invalidUser7 = '{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana",' +
      '"lastName": "",' +
      '"password": "password12345"' +
    '}';
    this.invalidUser8 = '{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana",' +
      '"lastName": "Sanchez",' +
      '"password": ""' +
    '}';
    this.validUser = '{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana",' +
      '"lastName": "Sanchez",' +
      '"password": "password12345"' +
    '}';
    this.invalidUserArray = [this.invalidUser1, this.invalidUser2,
      this.invalidUser3, this.invalidUser4, this.invalidUser5,
      this.invalidUser6, this.invalidUser7, this.invalidUser8,
      this.invalidJSON1];

    this.invalidLogin1 = '{' +
      '"password": "password12345"' +
    '}';
    this.invalidLogin2 = '{' +
    '"email": "juanasanchez@gmail.com",' +
    '}';
    this.validLogin = '{' +
    '"email": "juanasanchez@gmail.com",' +
    '"password": "password12345"' +
    '}';
    this.invalidLoginArray = [this.invalidLogin1, this.invalidLogin2, this.invalidJSON1];

    this.validAddFavorite = '{' +
    '"email": "juanasanchez@gmail.com",' +
    '"movies": [' +
    this.testData.movie1 +','+
    this.testData.movie2 + ','+
    this.testData.movie3+']' +
    '}';
    this.invalidAddFavorite1 = '{' +
    '"notemail": "juanasanchez@gmail.com",' +
    '"movies": [' +
    this.testData.movie1 +','+
    this.testData.movie2 + ','+
    this.testData.movie3+']' +
    '}';
    this.invalidAddFavorite2 = '{' +
    '"email": "juanasanchez@gmail.com",' +
    '"movies": []' +
    '}';
    this.invalidAddFavorite3 = '{' +
    '"email": "juanasanchez@gmail.com"}';

    this.invalidAddFavorite4 = '{' +
    '"email": "juanasanchez@gmail.com",' +
    '"movies": [{' +
    '"title": "Superman",'+
    '}]' +
    '}';
    this.invalidAddFavorite5 = '{' +
    '"email": "juanasanchez@gmail.com",' +
    '"movies": [{' +
    '"title": "Superman",'+
    '"id": "-45"'+
    '}]' +
    '}';
    this.invalidAddFavorite6 = '{' +
    '"email": "juanasanchez@gmail.com",' +
    '"movies": [{' +
    '"title": "Superman",'+
    '"id": "notNumber"'+
    '}]' +
    '}';
    this.invalidAddFavorite7 = '{' +
    '"email": "juanasanchez@gmail.com",' +
    '"movies": [{' +
    '"title": "Superman",'+
    '"id": ""'+
    '}]' +
    '}';
    this.invalidAddFavoriteArray = [this.invalidAddFavorite1, this.invalidAddFavorite2,
      this.invalidAddFavorite3, this.invalidAddFavorite4, this.invalidAddFavorite5,
      this.invalidAddFavorite6, this.invalidAddFavorite7, this.invalidJSON1];
  }
}

module.exports = {ValidatorTestData: ValidatorTestData};
