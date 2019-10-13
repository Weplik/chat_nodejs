const express = require('express');
const { param } = require('express-validator');
const roomService = require('../services/room');

const router = express.Router();

router.get('/', roomService.getRooms);

router.get('/:roomId/messages', [param('roomId').exists()], roomService.getMessagesByRoomId);

module.exports = router;
