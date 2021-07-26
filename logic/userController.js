const {UserDataAccess} = require('../dataAccess/userDataAccess.js');
const {MovieDataAccess} = require('../dataAccess/movieDataAccess.js');
const {HTTPRequestError} = require('../utils/customExceptions/httpRequestError.js');
const {InvalidTokenError} = require('../utils/customExceptions/invalidTokenError.js');
const {InvalidEmailError} = require('../utils/customExceptions/invalidEmailError.js');
const {InvalidPasswordError} = require('../utils/customExceptions/invalidPasswordError.js');
const bcrypt = require('bcrypt');
const unirest = require('unirest');


class UserController {
  constructor() {
    this.bcryptSaltRounds = 10;
    this.sessionArray = [];
    this.userDataAccess = new UserDataAccess('./users.txt', './favorites.txt');
    this.movieDataAccess = new MovieDataAccess('');
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
    return newToken;
  }

  async login(userEmail, userPassword) {
    if (this.userDataAccess.exists(userEmail)) {
      const hashedPassword = this.userDataAccess.getHashedPassword(userEmail);
      const passwordMatches = await bcrypt.compare(userPassword, hashedPassword);
      if (passwordMatches) {
        return this.addSession(userEmail);
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

  async register(user) {
    const userPassword = user.password;
    await bcrypt.hash(userPassword, this.bcryptSaltRounds).then(function(hash) {
      user.password = hash;
    });
    return this.userDataAccess.register(user);
  }

  addFavorites(email, movies, token) {
    if (this.tokenBelongsToUser(email, token)) {
      let result = true;
      for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        movie.addedAt = new Date().toISOString().slice(0, 10);
        result = result && this.userDataAccess.addFavorite(email, movie);
      }
      return result;
    } else {
      throw new InvalidTokenError(
          'Error: the received token is not registered or does not belong to the email received.',
      );
    }
  }

  getFavorites(userEmail, token) {
    if (this.tokenBelongsToUser(userEmail, token)) {
      const userFavorites = this.userDataAccess.getFavorites(userEmail);
      for (let i = 0; i < userFavorites.length; i++) {
        const favorite = userFavorites[i];
        const randomBetween0And99 = Math.floor(Math.random() * 100);
        favorite.suggestionForTodayScore = randomBetween0And99;
      }
      userFavorites.sort(
          (favA, favB) => (favA.suggestionForTodayScore < favB.suggestionForTodayScore) ? 1 : -1,
      );
      return userFavorites;
    } else {
      throw new InvalidTokenError(
          'Error: the received token is not registered or does not belong to the email received.',
      );
    }
  }

  async getMovies(token, keyword) {
    if (this.isTokenValid(token)) {
      if (keyword) {
        return this.movieDataAccess.makeKeywordRequest(keyword).then(
            function(moviesByKeyword) {
              for (let i = 0; i < moviesByKeyword.length; i++) {
                const favorite = moviesByKeyword[i];
                const randomBetween0And99 = Math.floor(Math.random() * 100);
                favorite.suggestionScore = randomBetween0And99;
              }
              moviesByKeyword.sort(
                  (movieA, movieB) => (movieA.suggestionScore < movieB.suggestionScore) ? 1 : -1,
              );
              return moviesByKeyword;
            },
            function(error) {
              throw error;
            });
      } else {
        return this.movieDataAccess.makePopularRequest().then(
            function(popularMovies) {
              for (let i = 0; i < popularMovies.length; i++) {
                const favorite = popularMovies[i];
                const randomBetween0And99 = Math.floor(Math.random() * 100);
                favorite.suggestionScore = randomBetween0And99;
              }
              popularMovies.sort(
                  (movieA, movieB) => (movieA.suggestionScore < movieB.suggestionScore) ? 1 : -1,
              );
              return popularMovies;
            },
            function(error) {
              throw error;
            });
      }
    } else {
      throw new InvalidTokenError('Error: the received token is not registered.');
    }
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

  isTokenValid(token) {
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
