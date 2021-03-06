const { Room, Message, User } = require('../models');
const RequestError = require('../helpers/requestError');

const getRooms = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;

  const { rows: rooms, count } = await Room.findAndCountAll({ limit, offset });

  return res.json({ rooms, count });
};

const getMessagesByRoomId = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;
  const { roomId } = req.params;

  const room = await Room.findByPk(roomId);

  if (!room) {
    throw new RequestError(404, 'Room not found');
  }

  const messages = await Message.findAll({
    where: { roomId },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username', 'firstname', 'lastname'],
      },
    ],
    attributes: {
      exclude: ['userId'],
    },
    limit,
    offset,
  });

  return res.json(messages);
};

module.exports = {
  getRooms,
  getMessagesByRoomId,
};
