const express = require('express');
const { check } = require('express-validator');
const authService = require('../services/auth');

const router = express.Router();

router.post('/login', [check('username').exists(), check('password').exists()], authService.login);

router.post('/refresh-token', [check('token').exists()], authService.generateTokens);

module.exports = router;
