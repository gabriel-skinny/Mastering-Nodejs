const http = require("http");
const net = require("net");
const { URL } = require("url");
const proxy = new http.Server();

proxy.on("connect", (req, clientSocket, head) => {
    console.log(req.url)
    let reqData = new URL(`http://${req.url}`);
    let remoteSocket = net.connect(reqData.port, reqData.hostname, () => {
        clientSocket.write("HTTP/1.1 200 /r/n/r/n");
        remoteSocket.write(head);
        remoteSocket.pipe(clientSocket);
        clientSocket.pipe(remoteSocket);
    })
}).listen(3333, () => console.log("Connected on port 3333"));

let request = http.request({
    port: 3333,
    hostname: "localhost",
    method: "CONNECT",
    path: "www.example.com:30",
})
request.on("connect", (req, socket, head) => {
    console.log("REQUEST")
    socket.setEncoding("utf-8");
    socket.write(
        `GET / HTTP/1.1\r\nHost: www.example.org:80\r\nConnection:close\r\n\r\n`
    );

    socket.on("readble", () => {
        console.log(socket.read());
    })
    socket.on("end", () => {
        proxy.close();
    })
})

request.end();