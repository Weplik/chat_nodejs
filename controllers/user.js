const express = require('express');
const userService = require('../services/user');

const router = express.Router();

router.get('/', userService.getUsers);

module.exports = router;
