const fs = require('fs');

class UserDataAccess {
  constructor(pathToData) {
    this.pathToData = pathToData;
  }

  readData() {
    const userData = fs.readFileSync(this.pathToData);
    this.users = JSON.parse(userData);
  }

  login(emailToCheck, passwordToCheck) {
    this.readData();
    for (let i = 0; i < this.users.length; i++) {
      const userIterator = this.users[i];
      if (userIterator.email === emailToCheck.toLowerCase() &&
            userIterator.password === passwordToCheck) {
        return true;
      }
    }
    return false;
  }

  exists(emailToCheck) {
    this.readData();
    for (let i = 0; i < this.users.length; i++) {
      const userIterator = this.users[i];
      if (userIterator.email === emailToCheck.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  register(userToRegister) {
    this.readData();
    if (!this.exists(userToRegister.email)) {
      this.users.push(userToRegister);
      const newUsersJSON = JSON.stringify(this.users);
      fs.writeFileSync(this.pathToData, newUsersJSON);
      return true;
    }
    return false;
  }
}

module.exports = {UserDataAccess: UserDataAccess};
