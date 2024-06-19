import { Server } from "socket.io";
import http from "http";
import express from "express";

class SocketConnection {
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  static io: any;
  static userSocketMap: {
    [key: string]: string;
  } = {};
  constructor() {
    const app = express();
    this.server = http.createServer(app);
    this.server.listen(3000, () => {
      console.log("server running at http://localhost:3000");
    });
    SocketConnection.io = new Server(this.server, {
      cors: {
        origin: ["http://127.0.0.1:5500"],
        methods: ["GET", "POST"],
      },
    });
  }

  static getReceiverSocketId = (receiverId: string) => {
    return SocketConnection.userSocketMap[receiverId];
  };

  connection() {
    SocketConnection.io.on("connection", (socket: any) => {
      console.log("A user connected", socket.id);
      // getOnlineUsers
      const userId = socket.handshake.query.userId;
      if (userId !== undefined)
        SocketConnection.userSocketMap[userId] = socket.id;

      SocketConnection.io.emit(
        "getOnlineUsers",
        Object.keys(SocketConnection.userSocketMap)
      );

      socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete SocketConnection.userSocketMap[userId];
        SocketConnection.io.emit(
          "getOnlineUsers",
          Object.keys(SocketConnection.userSocketMap)
        );
      });
    });

    return this.server;
  }
}
export default SocketConnection;
