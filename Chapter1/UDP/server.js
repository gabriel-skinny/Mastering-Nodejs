const dgram = require("dgram");
const server = dgram.createSocket("udp4");

server.on("message", msg => {
  process.stdout.write(`Got message ${msg}`);
  process.exit();
}).bind(3333);