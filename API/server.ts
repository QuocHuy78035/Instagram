import Server from "./src/app";
import express, { Application } from "express";
import SocketConnection from "./src/socket/socket";

const app: Application = express();
new Server(app);
const serverSocket = new SocketConnection().connection();
const PORT: number = Number(process.env.PORT) || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/v1`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
  });
  serverSocket.close(() => {
    console.log("Server socket closed");
  });
});
