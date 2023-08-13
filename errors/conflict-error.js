const { HTTP_STATUS_CONFLICT } = require('../constants/statusCodeConstants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}

module.exports = ConflictError;
