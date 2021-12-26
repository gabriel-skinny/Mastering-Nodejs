const net = require("net");
const socket = net.connect("3333");

process.stdin.pipe(socket);
socket.pipe(process.stdout);

