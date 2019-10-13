const express = require('express');
const userController = require('../controllers/user');
const roomController = require('../controllers/room');
const messageController = require('../controllers/message');
const authController = require('../controllers/auth');

const router = express.Router();

router.use('/user', userController);

router.use('/room', roomController);

router.use('/message', messageController);

router.use('/auth', authController);

module.exports = router;
