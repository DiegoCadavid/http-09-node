const { Socket } = require("node:net");



const httpRequest = (address, path) => {
  return new Promise((resolve, reject) => {
    const socket = new Socket();
    socket.connect({ port: address.port}, () => console.log("Connected to server"));
    socket.write(`Get ${path}`);
    console.log("Sending request");
    
    socket.on("data", (data) => {
      return resolve(data.toString());
    });
    
    socket.on("error", (err) => {
      reject(err);
    });   
  })
  
}

const main = async () => {
  const data = await httpRequest({ port: 3000 }, "/index.html");
  console.log(data);
}

main();