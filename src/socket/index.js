const { chat, user } = require("../../models");
const config = require("../../config");
// import here
const jwt = require("jsonwebtoken");

const { Op } = require("sequelize");

// init variable here
const connectedUser = {};

const socketIo = (io) => {
  // create middlewares before connection event
  // to prevent client access socket server without token
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      next();
    } else {
      next(new Error("Not Authorized"));
    }
  });

  io.on("connection", async (socket) => {
    console.log("#############################");
    console.log("client connect: ", socket.id);

    // code here
    const params = socket.handshake.query.params;
    const userId = jwt.verify(socket.handshake.auth.token, config.jwtKey);
    connectedUser[userId] = socket.id;

    // GET chat list user sender
    socket.on("load user sender", async () => {
      try {
        const dataSender = await chat.findAll({
          where: {
            idSender: userId.id,
          },
          group: "idReceiver",
          attributes: ["id", "createdAt", "message"],
          include: [
            {
              model: user,
              as: "receiver",
              attributes: ["id", "username", "fullname", "image"],
            },
            {
              model: user,
              as: "sender",
              attributes: ["id", "username", "fullname", "image"],
            },
          ],
        });

        const dataReceiver = await chat.findAll({
          where: {
            idReceiver: userId.id,
          },
          group: "idSender",
          attributes: ["id", "createdAt", "message"],
          include: [
            {
              model: user,
              as: "receiver",
              attributes: ["id", "username", "fullname", "image"],
            },
            {
              model: user,
              as: "sender",
              attributes: ["id", "username", "fullname", "image"],
            },
          ],
        });

        const data = [{ dataSender, dataReceiver }];

        socket.emit("user sender", data);
      } catch (err) {
        console.log(err.message);
      }
    });

    // GET personal chat user
    socket.on("load messages", async (payload) => {
      const data = await chat.findAll({
        where: {
          idSender: {
            [Op.or]: [userId.id, payload],
          },
          idReceiver: {
            [Op.or]: [userId.id, payload],
          },
        },
        attributes: {
          exclude: ["updatedAt", "idSender", "idReceiver"],
        },
        include: [
          {
            model: user,
            as: "receiver",
            attributes: ["id", "username", "fullname", "image"],
          },
          {
            model: user,
            as: "sender",
            attributes: ["id", "username", "fullname", "image"],
          },
        ],
      });

      socket.emit("messages", data);
    });

    // POST message
    socket.on("send message", async (payload) => {
      try {
        console.log();
        await chat.create({
          ...payload,
          idSender: userId.id,
        });

        io.to(socket.id).emit("new message", idReceiver);

      } catch (err) {
        console.log(err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("client disconnected", socket.id);
      delete connectedUser[userId];
    });
  });
};

module.exports = socketIo;
