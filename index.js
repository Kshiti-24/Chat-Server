const express = require("express");
var http = require("http");
const app = express();
var server = http.createServer(app);
var io = require("socket.io")(server);

app.use(express.json());
var clients = [];

app.route("/").get((req, res) => {
  res.json("Hey there hellooo..................");
});

io.on("connection", (socket) => {
  console.log("Connected");
  console.log(socket.id, "has joined");
  socket.on("signin", (id) => {
    console.log(id);
    clients[id] = socket;
    console.log(clients);
  });
  socket.on("message", (msg) => {
    console.log(msg);
    let targetId = msg.targetId;
    if (clients[targetId]) clients[targetId].emit("message", msg);
  });
});

server.listen(PORT, () => {
  console.log("Server Started");
});
