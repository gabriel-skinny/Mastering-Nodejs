const stream = require("stream");

const transform = new stream.Transform();

transform._transform = function(num, enconding, cb) {
  transform.push(String.fromCharCode(new Number(num)) + '\n');
  cb();
};

process.stdin.pipe(transform).pipe(process.stdout);