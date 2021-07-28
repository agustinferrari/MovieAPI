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
    this.invalidUser9 = JSON.parse('{' +
    '"email": 23,' +
    '"firstName": "Juana",' +
    '"lastName": "Sanchez",' +
    '"password": "password12345"' +
  '}');
    this.invalidUser10 = JSON.parse('{' +
    '"email": "juanasanchez@gmail.com",' +
    '"firstName": 4,' +
    '"lastName": "Sanchez",' +
    '"password": "password12345"' +
  '}');
    this.invalidUser11 = JSON.parse('{' +
    '"email": "juanasanchez@gmail.com",' +
    '"firstName": "Juana",' +
    '"lastName": 7,' +
    '"password": "password12345"' +
  '}');
    this.invalidUser12 = JSON.parse('{' +
    '"email": "juanasanchez@gmail.com",' +
    '"firstName": "Juana",' +
    '"lastName": "Sanchez",' +
    '"password": 355' +
  '}');
    this.invalidUser13 = JSON.parse('{' +
    '"email": "juanasanchez@gmail.com",' +
    '"firstName": "Juana",' +
    '"lastName": "Sanchez",' +
    '"password": {"date" : 355}' +
  '}');
    this.validUser = JSON.parse('{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana",' +
      '"lastName": "Sanchez",' +
      '"password": "password12345"' +
    '}');
    this.invalidUserArray = [this.invalidUser1, this.invalidUser2,
      this.invalidUser3, this.invalidUser4, this.invalidUser5,
      this.invalidUser6, this.invalidUser7, this.invalidUser8,
      this.invalidUser9, this.invalidUser10, this.invalidUser11,
      this.invalidUser12, this.invalidUser13];

    this.invalidLogin1 = JSON.parse('{' +
      '"password": "password12345"' +
    '}');
    this.invalidLogin2 = JSON.parse('{' +
    '"email": "juanasanchez@gmail.com"' +
    '}');
    this.invalidLogin3 = JSON.parse('{' +
    '"email": "juanasanchez@gmail.com",' +
    '"password": 23' +
    '}');
    this.invalidLogin4 = JSON.parse('{' +
    '"email": 45,' +
    '"password": "password12345"' +
    '}');
    this.invalidLogin5 = JSON.parse('{' +
    '"email": [],' +
    '"password": "password12345"' +
    '}');
    this.validLogin = JSON.parse('{' +
    '"email": "juanasanchez@gmail.com",' +
    '"password": "password12345"' +
    '}');
    this.invalidLoginArray = [this.invalidLogin1, this.invalidLogin2, this.invalidLogin3,
      this.invalidLogin4, this.invalidLogin5];

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

    this.validTokenArray = ['EY3Z762DpcUR9eiGe6RR', 'It8GNmSOj8g137BSRbEa', 'V5SNh4ehOPSFgqPpgeTC',
      '7qe3CgARk30401WdACqK', 'gLPZQjpI9dwRiWmod32r'];

    this.invalidTokenArray = ['E____62DpcUR9eiGe6RR', '', undefined,
      25, {token: 'gLPZQjpI9dwRiWmod32r'}, 'gLPZQjpI9d2r'];
  }
}

module.exports = {ValidatorTestData: ValidatorTestData};
