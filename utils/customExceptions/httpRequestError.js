class HTTPRequestError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = 'HTTPRequestError'; // (2)
  }
}

module.exports = {HTTPRequestError: HTTPRequestError};
