const { validationResult } = require('express-validator');
const { Message, Room } = require('../models');
const RequestError = require('../helpers/RequestError');
const { socket } = require('../config/app');

const createMessage = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestError(422, 'Invalid data', errors.array());
  }

  const { body: msg, user: userId } = req;

  const room = await Room.findByPk(msg.roomId);

  if (!room) {
    throw new RequestError(404, 'Room not found');
  }

  const savedMsg = await Message.create({ ...msg, userId });

  socket.emit('newMessage', savedMsg);

  return res.status(201).json(savedMsg);
};

module.exports = {
  createMessage,
};
