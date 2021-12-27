const fs = require("fs");
const http = require("http");

let response = null;
let filePointer = 0;
let tweetFile = "tweets.txt";

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-type': 'text/event-stream',
    'Cache-control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  })

  response = res;

  res.write(':' + Array(2049).join('')+'\n');
  res.write('retry:2000\n');

  res.socket.on("close", () => {
    response = null;
  })
})

server.listen(3333, () => console.log("Listen to port: 3333"));

let sendNext = function(fd) {
  let buffer = Buffer.alloc(140);
  const offset = 0;
  const bufferLength = 140;
  const startReadPosition = filePointer * 140;

  fs.read(fd, buffer, offset, bufferLength, startReadPosition, (err,num) => {
    if (!err && num > 0 && response) {
      ++filePointer;
      response.write(`data:${buffer.toString('utf-8', 0, num)}\n\n`);

      return process.nextTick(() => {
        sendNext(fd);
      })
    }
  })
}

function start() {
  fs.open(tweetFile, 'r', (err, fd) => {
    if (err) {
      return setTimeout(start, 1000);
    }

    fs.watch(tweetFile, (event, filename) => {
      if (event == 'change') {
        console.log("change happened on file:", filename);
        sendNext(fd);
      }
    })
  })
}

start();