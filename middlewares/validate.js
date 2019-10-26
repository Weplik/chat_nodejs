const { validationResult } = require('express-validator');
const RequestError = require('../helpers/requestError');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(new RequestError(422, 'Invalid data', errors.array()));
  } else {
    next();
  }
};

module.exports = validate;
