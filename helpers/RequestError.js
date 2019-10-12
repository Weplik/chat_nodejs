function RequestError(httpCode, message) {
  Error.call(this);
  Error.captureStackTrace(this);
  this.name = 'RequestError';
  this.httpCode = httpCode;
  this.message = message;
}

// eslint-disable-next-line no-proto
RequestError.prototype.__proto__ = Error.prototype;

module.exports = RequestError;
