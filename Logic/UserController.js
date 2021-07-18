class UserController {
  constructor() {
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
}

module.exports = {UserController: UserController};
