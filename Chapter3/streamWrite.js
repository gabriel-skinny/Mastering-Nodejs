const stream = require("stream");

let writable = new stream.Writable({
  highWaterMark: 2
});

writable._write = (chunk, enconding, callback) => {
  process.stdout.write(chunk);
  callback();
}

function writeData(iterations, writer, data, enconding, cb) {
  (function write() {
    if (!iterations--) {
      return cb();
    }
  
    if (!writer.write(data, enconding)) {
      console.log(`<wait> highWaterMark of ${writable.writableHighWaterMark} reached`);
      writer.once("drain", write);
    }
  })()
}

writeData(2, writable, Buffer.alloc(100, "A"), "utf-8", () => {
  console.log("Write finished");
})