class Validator {
  isValidUser(parsedObject) {
    const hasProperties = 'email' in parsedObject && 'firstName' in parsedObject &&
        'lastName' in parsedObject && 'password' in parsedObject;
    const hasValidProperties = hasProperties && this.validateEmail(parsedObject.email) &&
        parsedObject.firstName && parsedObject.lastName &&parsedObject.password;
    return hasValidProperties;
  }

  isValidLogin(parsedObject) {
    return 'email' in parsedObject && 'password' in parsedObject;
  }

  isValidAddFavorite(parsedObject) {
    const hasMainProperties = 'email' in parsedObject && 'movies' in parsedObject;
    const movies = parsedObject.movies;
    let hasValidMoviesAndProperties = hasMainProperties && movies.length > 0;
    for (let i = 0; hasValidMoviesAndProperties && i<movies.length; i++) {
      const movieIterator = movies[i];
      hasValidMoviesAndProperties = hasValidMoviesAndProperties && 'id' in movieIterator &&
        movieIterator.id === parseInt(movieIterator.id, 10) && movieIterator.id > 0;
    }
    return hasValidMoviesAndProperties;
  }

  validateEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }
}

module.exports = {Validator: Validator};
