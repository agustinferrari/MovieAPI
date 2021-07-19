const {UserDataAccess} = require('../dataAccess/userDataAccess.js');

class UserController {
  constructor() {
    this.sessionArray = [];
    this.userDataAccess = new UserDataAccess('./users.txt', './favorites.txt');
  }

  generateToken() {
    const charArray = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
    const tokenArray = [];
    const tokenLength = 20;
    for (let i=0; i<tokenLength; i++) {
      const j = (Math.random() * (charArray.length-1)).toFixed(0);
      tokenArray[i] = charArray[j];
    }
    return tokenArray.join('');
  }

  addSession(userEmail) {
    const newToken = this.generateToken();
    let userAlreadyInSession = false;
    for (let i = 0; i < this.sessionArray.length; i++) {
      const sessionIterator = this.sessionArray[i];
      if (sessionIterator.userId === userEmail) {
        userAlreadyInSession = true;
        sessionIterator.token = newToken;
      }
    }

    if (!userAlreadyInSession) {
      const sessionEntry = {
        userId: userEmail,
        token: newToken,
      };
      this.sessionArray.push(sessionEntry);
    }
  }

  removeSession(userEmail) {
    for (let i = 0; i < this.sessionArray.length; i++) {
      const sessionIterator = this.sessionArray[i];
      if (sessionIterator.userId === userEmail) {
        this.sessionArray.splice(i, 1);
      }
    }
  }

  login(userEmail, userPassword) {
    if (this.userDataAccess.login(userEmail, userPassword)) {
      this.addSession(userEmail);
      return true;
    }
    return false;
  }
}

module.exports = {UserController: UserController};
