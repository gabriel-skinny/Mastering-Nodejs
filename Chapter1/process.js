const { argv } = require("process");

const size = parseInt(argv[2]);
const n = argv[3] | 100;
const buffers = [];

for (let i = 0; i < n; i++) {
  buffers.push(Buffer.alloc(size));
  process.stdout.write(process.memoryUsage().heapTotal + "\n");
}