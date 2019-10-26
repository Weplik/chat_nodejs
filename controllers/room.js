const express = require('express');
const { param } = require('express-validator');
const roomService = require('../services/room');
const validateMiddleware = require('../middlewares/validate');

const router = express.Router();

router.get('/', roomService.getRooms);

router.get(
  '/:roomId/messages',
  [param('roomId').exists()],
  validateMiddleware,
  roomService.getMessagesByRoomId
);

module.exports = router;
