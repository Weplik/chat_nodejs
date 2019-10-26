const express = require('express');
const { check } = require('express-validator');
const messageService = require('../services/message');
const authMiddleware = require('../middlewares/auth');
const validateMiddleware = require('../middlewares/validate');

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  [check('roomId').exists(), check('text').exists()],
  validateMiddleware,
  messageService.createMessage
);

module.exports = router;
