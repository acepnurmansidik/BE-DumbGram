// import this
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Get routes to the variabel
const authRouter = require("./app/auth/router");
const userRouter = require("./app/User/router");
const messageRouter = require("./app/Message/router");
const feedRouter = require("./app/Feed/router");

const app = express();
const API = "/api/v1";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // we must define cors because our client and server have diffe
  },
});

// import socket function and call with parameter io
require("./src/socket")(io);

//define the server port
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Add endpoint grouping and router
app.use(`${API}`, authRouter);
app.use(`${API}`, userRouter);
app.use(`${API}`, messageRouter);
app.use(`${API}`, feedRouter);
// add route here to serving static file
app.use("/uploads", express.static("uploads"));

server.listen(port, () => console.log(`Listening on port ${port}!`));
