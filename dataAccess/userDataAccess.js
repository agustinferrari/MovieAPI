const fs = require('fs');

class UserDataAccess {
  constructor(pathToUserData, pathToFavoriteData) {
    this.pathToUserData = pathToUserData;
    this.pathToFavoriteData = pathToFavoriteData;
  }

  readUserData() {
    try {
      const userData = fs.readFileSync(this.pathToUserData);
      this.users = JSON.parse(userData);
      if (!Array.isArray(this.users)) {
        this.users = [];
      }
    } catch (error) {
      this.users = [];
    }
  }

  readUserFavoriteData() {
    this.readUserData();
    try {
      const favoriteData = fs.readFileSync(this.pathToFavoriteData);
      this.favorites = JSON.parse(favoriteData);
      if (!Array.isArray(this.favorites)) {
        this.favorites = [];
      }
    } catch (error) {
      this.favorites = [];
    }
  }

  getHashedPassword(emailToCheck) {
    this.readUserData();
    for (let i = 0; i < this.users.length; i++) {
      const userIterator = this.users[i];
      if (userIterator.email === emailToCheck.toLowerCase()) {
        return userIterator.password;
      }
    }
    return undefined;
  }

  exists(emailToCheck) {
    this.readUserData();
    for (let i = 0; i < this.users.length; i++) {
      const userIterator = this.users[i];
      if (userIterator.email === emailToCheck.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  register(userToRegister) {
    this.readUserData();
    if (!this.exists(userToRegister.email)) {
      this.users.push(userToRegister);
      const newUsersJSON = JSON.stringify(this.users);
      fs.writeFileSync(this.pathToUserData, newUsersJSON);
      return true;
    }
    return false;
  }

  addFavorite(userEmail, movie) {
    this.readUserFavoriteData();
    if (this.exists(userEmail)) {
      let userHasFavoriteArray = false;
      for (let i = 0; i < this.favorites.length && !userHasFavoriteArray; i++) {
        const userFavoriteIterator = this.favorites[i];
        if (userFavoriteIterator.userId === userEmail.toLowerCase()) {
          userHasFavoriteArray = true;
          this.addMovieToUserFavorites(userFavoriteIterator, movie);
        }
      }
      if (!userHasFavoriteArray) {
        this.createUserFavoriteArray(userEmail, movie);
      }
      return true;
    }
    return false;
  }

  addMovieToUserFavorites(userFavoriteArray, movie) {
    const userFavorites = userFavoriteArray.favorites;
    let favoriteAlreadyAdded = false;
    for (let j = 0; j < userFavorites.length && !favoriteAlreadyAdded; j++) {
      const movieIdIterator = userFavorites[j].id;
      if (movieIdIterator == movie.id) {
        favoriteAlreadyAdded = true;
      }
    }
    if (!favoriteAlreadyAdded) {
      userFavorites.push(movie);
      const newFavoritesJSON = JSON.stringify(this.favorites);
      fs.writeFileSync(this.pathToFavoriteData, newFavoritesJSON);
    }
  }

  createUserFavoriteArray(userEmail, movie) {
    const newFavoriteEntry = {
      userId: userEmail,
      favorites: [movie],
    };
    this.favorites.push(newFavoriteEntry);
    const newFavoritesJSON = JSON.stringify(this.favorites);
    fs.writeFileSync(this.pathToFavoriteData, newFavoritesJSON);
  }

  getFavorites(userEmail) {
    this.readUserFavoriteData();
    if (this.exists(userEmail)) {
      for (let i = 0; i < this.favorites.length; i++) {
        const userFavoriteIterator = this.favorites[i];
        if (userFavoriteIterator.userId === userEmail.toLowerCase()) {
          return userFavoriteIterator.favorites;
        }
      }
    }
    return [];
  }
}

module.exports = {UserDataAccess: UserDataAccess};
