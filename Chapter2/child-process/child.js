process.on("message", (message, server) => {
  console.log("Parent message:", message);
  server.on("connection", (socket) => {
      socket.end("Child handled the connection");
  })
})

