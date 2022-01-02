const http = require("http");

const server = new http.Server();

server.on("connection", socket => {
  console.log("Client arrived");

  socket.on("end", () => console.log("client left"));
})

server.setTimeout(2000, socket => socket.end());
server.listen(3333);

server.on("request", (req, res) => {
  req.setEncoding("utf-8");
  req.on("readable", () => {
    let data = req.read();
    data && res.end(data);
  })
})