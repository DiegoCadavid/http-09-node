const { Server } = require("node:net");
const fs = require("node:fs/promises");
const server = new Server();

server.on("connection", (socket) => {
  const remoteInfo = {
    address: socket.remoteAddress,
    port: socket.remotePort,
    id: `${socket.remoteAddress}:${socket.remotePort}`,
  };

  socket.on("connect", () => {
    console.log(`Client ${remoteInfo.id} Connected!`);
  });

  socket.on("data", async (data) => {
    data.toString().startsWith("Get")
      ? socket.write(await fs.readFile(`.${data.toString().split(" ")[1]}`))
      : socket.write("Hello from server");

    socket.end();
  });

  socket.on("close", () => {
    console.log(`Client ${remoteInfo.id} disconnected`);
  });

  socket.on("error", (err) => {
    console.log(`Client ${remoteInfo.id} error`, err?.code || err);
  });
});

server.on("error", (err) => {
  console.log(`Server error`, err?.code || err);
});

server.on("listening", () => {
  console.log(`Server listening port ${server.address().port}`);
});

server.listen({ port: 3000, host: "localhost" });
