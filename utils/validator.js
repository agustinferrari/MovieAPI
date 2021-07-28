class Validator {
  isValidUser(parsedObject) {
    const requiredProperties = ['email', 'firstName', 'lastName', 'password'];
    let hasRequiredStringProperties = true;
    for (let i = 0; hasRequiredStringProperties && i<requiredProperties.length; i++) {
      hasRequiredStringProperties = hasRequiredStringProperties &&
      requiredProperties[i] in parsedObject &&
      typeof parsedObject[requiredProperties[i]] == 'string' &&
      parsedObject[requiredProperties[i]];
    }
    const hasValidProperties = hasRequiredStringProperties &&
    this.isValidEmail(parsedObject.email);
    return hasValidProperties;
  }

  isValidLogin(parsedObject) {
    const requiredProperties = ['email', 'password'];
    let hasRequiredStringProperties = true;
    for (let i = 0; hasRequiredStringProperties && i<requiredProperties.length; i++) {
      hasRequiredStringProperties = hasRequiredStringProperties &&
      requiredProperties[i] in parsedObject &&
      typeof parsedObject[requiredProperties[i]] == 'string' &&
      parsedObject[requiredProperties[i]];
    }
    const hasValidProperties = hasRequiredStringProperties &&
    this.isValidEmail(parsedObject.email);
    return hasValidProperties;
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

  isValidToken(token) {
    const regexAlphanumeric20Chars = /^[a-z0-9]{20}$/i;
    return regexAlphanumeric20Chars.test(token);
  }

  isValidEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }
}

module.exports = {Validator: Validator};
