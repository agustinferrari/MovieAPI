class HTTPRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HTTPRequestError';
  }
}

module.exports = {HTTPRequestError: HTTPRequestError};
