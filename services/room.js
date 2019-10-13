const { validationResult } = require('express-validator');
const { Room, Message } = require('../models');
const RequestError = require('../helpers/RequestError');

const getRooms = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;

  const { rows: rooms, count } = await Room.findAndCountAll({ limit, offset });

  return res.json({ rooms, count });
};

const getMessagesByRoomId = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestError(422, 'Invalid query params', errors.array());
  }

  const { limit = 20, offset = 0 } = req.query;
  const { roomId } = req.params;

  const room = await Room.findByPk(roomId);

  if (!room) {
    throw new RequestError(404, 'Room not found');
  }

  const messages = await Message.findAll({ where: { room: roomId }, limit, offset });

  return res.json(messages);
};

module.exports = {
  getRooms,
  getMessagesByRoomId,
};
