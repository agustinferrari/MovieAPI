class InvalidTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidTokenError';
  }
}

module.exports = {InvalidTokenError: InvalidTokenError};
