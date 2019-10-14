const express = require('express');
const { check } = require('express-validator');
const authService = require('../services/auth');

const router = express.Router();

router.post('/sign-up', [check('username').exists(), check('password').exists(), check('firstname').exists(), check('lastname').exists()], authService.signUp);

router.post('/sign-in', [check('username').exists(), check('password').exists()], authService.signIn);

router.post('/refresh-token', [check('token').exists()], authService.generateTokens);

module.exports = router;
