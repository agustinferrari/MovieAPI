class InvalidPasswordError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidPasswordError';
  }
}

module.exports = {InvalidPasswordError: InvalidPasswordError};
