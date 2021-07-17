const fs = require('fs');

class UserDataAccess {
  constructor(pathToData) {
    this.pathToData = pathToData;
  }

  readData() {
    this.userData = fs.readFileSync(this.pathToData);
  }

  login(emailToCheck, passwordToCheck) {
    this.readData();
    const users = JSON.parse(this.userData);
    for (let i = 0; i < users.length; i++) {
      const userIterator = users[i];
      if (userIterator.email === emailToCheck && userIterator.password === passwordToCheck) {
        return true;
      }
    }
    return false;
  }

  exists(emailToCheck) {
    this.readData();
    const users = JSON.parse(this.userData);
    for (let i = 0; i < users.length; i++) {
      const userIterator = users[i];
      if (userIterator.email === emailToCheck.toLowerCase()) {
        return true;
      }
    }
    return false;
  }
}

module.exports = {UserDataAccess: UserDataAccess};
