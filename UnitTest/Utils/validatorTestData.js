class ValidatorTestData {
  constructor() {
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
    this.validUser = '{' +
      '"email": "juanasanchez@gmail.com",' +
      '"firstName": "Juana",' +
      '"lastName": "Sanchez",' +
      '"password": "password12345"' +
    '}';
    this.invalidUserArray = [this.invalidUser1, this.invalidUser2,
      this.invalidUser3, this.invalidUser4, this.invalidJSON1];

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
  }
}

module.exports = {ValidatorTestData: ValidatorTestData};
