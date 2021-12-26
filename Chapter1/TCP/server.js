const net = require("net");
const repl = require("repl");

const server = net.createServer((socket) => {
  repl.start({
    prompt: ">",
    input: socket,
    output: socket,
    terminal: true
  }).on("exit", () => {
    socket.end();
  })
})

server.on("connection", () => {
  process.stdout.write("Someone connected!!!");
})

server.listen(3333);
