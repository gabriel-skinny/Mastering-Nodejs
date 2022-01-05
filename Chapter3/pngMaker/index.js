const http = require("http");
const fs = require("fs");


http.createServer((req, res) => {
    let file;

    fs.readFile("./teste.png", (err, data) => {
        file = data;
    })

    console.log("EVENT")


    res.end(file);
}).listen(3333);