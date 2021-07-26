const unirest = require('unirest');
const {HTTPRequestError} = require('../utils/customExceptions/httpRequestError.js');

class MovieDataAccess {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  makeKeywordRequest(apiKey, keyword) {
    return new Promise((resolve, reject) => {
      unirest.get('https://api.themoviedb.org/3/search/movie?api_key='+apiKey+
                '&language=en-US&query='+keyword+'&page=1&include_adult=false')
          .then(function(response) {
            if (response.error) {
              return reject(new HTTPRequestError(
                  'Error: Error while sending request to TheMovieDB.',
              ));
            }
            const moviesByKeyword = response.body.results;
            return resolve(moviesByKeyword);
          });
    });
  }

  makePopularRequest(apiKey) {
    return new Promise((resolve, reject) => {
      unirest.get('https://api.themoviedb.org/3/movie/popular?'+
              'api_key='+apiKey+'&language=en-US&page=1')
          .then(function(response) {
            if (response.error) {
              return reject(new HTTPRequestError(
                  'Error: Error while sending request to TheMovieDB.',
              ));
            }
            const popularMovies = response.body.results;
            return resolve(popularMovies);
          });
    });
  }
}

module.exports = {MovieDataAccess: MovieDataAccess};
