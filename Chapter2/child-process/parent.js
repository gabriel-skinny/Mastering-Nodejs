const childProcess = require("child_process");
let child = childProcess.fork(__dirname + "/child.js");
const server = require("net").createServer();

server.on("connection", (socket) => {
  socket.end("Parent handle connection");
})

server.listen(3333, () => {
  child.send("Parent givind child the server", server);
})