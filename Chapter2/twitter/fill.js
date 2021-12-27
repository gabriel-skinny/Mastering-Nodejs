const fs = require("fs");
const crypto = require("crypto");

const tweetFile = "tweets.txt";
const writeStream = fs.createWriteStream(tweetFile, {flags: 'a'});

let createTweet = function() {
  return crypto.randomBytes(140).toString('hex');
}

let cleanBuffer = function(len) {
  let buf = Buffer.alloc(len);
  buf.fill('\n');

  return buf;
}

let check = function() {
  const tweet = createTweet();

  let buffer = cleanBuffer(140);
  buffer.write(tweet, 0, 140);
  

  writeStream.write(buffer);

  console.log("Tweet writed!!");


  setTimeout(check, 10000);
}

check();