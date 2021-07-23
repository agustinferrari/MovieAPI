const {UserDataAccess} = require('../dataAccess/userDataAccess.js');
const {HTTPRequestError} = require('../utils/customExceptions/httpRequestError.js');
const {InvalidTokenError} = require('../utils/customExceptions/invalidTokenError.js');
const {InvalidEmailError} = require('../utils/customExceptions/invalidEmailError.js');
const {InvalidPasswordError} = require('../utils/customExceptions/invalidPasswordError.js');
const unirest = require('unirest');


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

  login(userEmail, userPassword) {
    if (this.userDataAccess.exists(userEmail)) {
      if (this.userDataAccess.login(userEmail, userPassword)) {
        this.addSession(userEmail);
        return true;
      }
      throw new InvalidPasswordError('Error: the password received is incorrect.');
    }
    throw new InvalidEmailError('Error: the email received is not linked to any account.');
  }

  logout(tokenToDisable) {
    for (let i = 0; i < this.sessionArray.length; i++) {
      const sessionIterator = this.sessionArray[i];
      if (sessionIterator.token === tokenToDisable) {
        this.sessionArray.splice(i, 1);
      }
    }
  }

  register(user) {
    return this.userDataAccess.register(user);
  }

  addFavorite(user, movie, token) {
    if (this.tokenBelongsToUser(user.email, token)) {
      movie.addedAt = new Date().toISOString().slice(0, 10);
      return this.userDataAccess.addFavorite(user.email, movie);
    } else {
      throw new InvalidTokenError(
          'Error: the received token is invalid or does not belong to the email received.',
      );
    }
  }

  getFavorites(userEmail, token) {
    if (this.tokenBelongsToUser(userEmail, token)) {
      const userFavorites = this.userDataAccess.getFavorites(userEmail);
      for (let i = 0; i < userFavorites.length; i++) {
        const favorite = userFavorites[i];
        const randomSuggestion = this.getRandomBetween0And99();
        favorite.suggestionForTodayScore = randomSuggestion;
      }
      userFavorites.sort(
          (favA, favB) => (favA.suggestionForTodayScore < favB.suggestionForTodayScore) ? 1 : -1,
      );
      return userFavorites;
    } else {
      throw new InvalidTokenError(
          'Error: the received token is invalid or does not belong to the email received.',
      );
    }
  }

  async getMoviesByKeyword(token, keyword) {
    if (this.tokenIsValid(token)) {
      const apiKey = '';
      return new Promise((resolve, reject) => {
        unirest.get('https://api.themoviedb.org/3/search/movie?api_key='+apiKey+
                    '&language=en-US&query='+keyword+'&page=1&include_adult=false')
            .then(function(response) {
              if (response.error) {
                return reject(new HTTPRequestError(
                    'Error: Error while sending request to TheMovieDB.',
                ));
              }
              return resolve(response.body.results);
            });
      });
    } else {
      throw new InvalidTokenError('Error: the received token is invalid.');
    }
  }

  getRandomBetween0And99() {
    return Math.floor(Math.random() * 100);
  }

  tokenBelongsToUser(userEmail, token) {
    let tokenBelongsToUser = false;
    for (let i = 0; i < this.sessionArray.length && !tokenBelongsToUser; i++) {
      const sessionIterator = this.sessionArray[i];
      if (sessionIterator.token === token && sessionIterator.userId == userEmail) {
        tokenBelongsToUser = true;
      }
    }
    return tokenBelongsToUser;
  }

  tokenIsValid(token) {
    let tokenIsValid = false;
    for (let i = 0; i < this.sessionArray.length && !tokenIsValid; i++) {
      const sessionIterator = this.sessionArray[i];
      if (sessionIterator.token === token) {
        tokenIsValid = true;
      }
    }
    return tokenIsValid;
  }
}

module.exports = {UserController: UserController};
