const fs = require('fs');

class UserDataAccess {
  constructor(pathToUserData, pathToFavoriteData) {
    this.pathToUserData = pathToUserData;
    this.pathToFavoriteData = pathToFavoriteData;
  }

  readUserData() {
    const userData = fs.readFileSync(this.pathToUserData);
    this.users = JSON.parse(userData);
  }

  readUserFavoriteData() {
    this.readUserData();
    const favoriteData = fs.readFileSync(this.pathToFavoriteData);
    this.favorites = JSON.parse(favoriteData);
  }

  login(emailToCheck, passwordToCheck) {
    this.readUserData();
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
      let userHasFavoriteList = false;
      for (let i = 0; i < this.favorites.length && !userHasFavoriteList; i++) {
        const userFavoriteIterator = this.favorites[i];
        if (userFavoriteIterator.userId === userEmail.toLowerCase()) {
          userHasFavoriteList = true;
          this.addMovieToUserFavorites(userFavoriteIterator, movie);
        }
      }
      if (!userHasFavoriteList) {
        this.createUserFavoriteList(userEmail, movie);
      }
      return true;
    }
    return false;
  }

  addMovieToUserFavorites(userFavoriteList, movie) {
    const userFavorites = userFavoriteList.favorites;
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

  createUserFavoriteList(userEmail, movie) {
    const newFavoriteEntry = {
      userId: userEmail,
      favorites: [movie],
    };
    this.favorites.push(newFavoriteEntry);
    const newFavoritesJSON = JSON.stringify(this.favorites);
    fs.writeFileSync(this.pathToFavoriteData, newFavoritesJSON);
  }
}

module.exports = {UserDataAccess: UserDataAccess};
