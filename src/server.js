// Run "node server.js" in this directory to start the server on port 5000.
// This currently runs the server locally on the host machine, and other machines
// on the same local network can connect.  

const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");

//const updater = require("./lib/server/updater");

const PORT = 5000;

let app = express();
let server = http.createServer(app);

let publicPath = path.join(__dirname, "public");
//app.use("/lib/client", express.static(path.join(__dirname, "lib/client")));
//updater(server, publicPath);

app.use(express.static(publicPath));
let io = socketIo(server);
io.on("connection", (socket) => {
  let name = null;
  socket.on("join", (data) => {
    name = data.name;
    io.emit("message", { text: name + " has joined." });
    console.log("Server Debugging: " + name + " has joined.");
  });

  socket.on("disconnect", () => {
    if (!name) return;
    io.emit("message", { text: name + " has left." });
    console.log("Server Debugging: " + name + " has left.");
  });

  socket.on("message", (message) => {
    if (!name) return;
    io.emit("message", { name, text: message.text });
    console.log("Server Debugging: " + name + ": " + message.text);
  });
});

const main = async () => {
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
  });
};
main();
