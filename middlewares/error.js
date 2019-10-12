const error = (err, req, res, next) => {
  const httpCode = err.httpCode || 500;
  const message = err.message || 'Internal server error';

  return res.status(httpCode).json({ message });
};

module.exports = error;
