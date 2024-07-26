import { Server } from "socket.io";
import http from "http";
import express from "express";
import userService from "../services/user.service";
import { socket } from "../configs/socket.config";

class SocketConnection {
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  static io: any;
  static userSocketMap: {
    [key: string]: string;
  } = {};
  constructor() {
    const app = express();
    this.server = http.createServer(app);
    this.server.listen(socket.port, () => {
      console.log(`server running at http://localhost:${socket.port}`);
    });
    SocketConnection.io = new Server(this.server, {
      cors: {
        origin: [socket.cors_url],
        methods: ["GET", "POST"],
      },
    });
  }

  static getReceiverSocketId = (receiverId: string): string => {
    return SocketConnection.userSocketMap[receiverId];
  };

  connection() {
    SocketConnection.io.on("connection", (socket: any) => {
      console.log("A user connected", socket.id);
      // getOnlineUsers
      const userId = socket.handshake.query.userId;
      if (userId !== undefined)
        SocketConnection.userSocketMap[userId] = socket.id;
      console.log(SocketConnection.userSocketMap);
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
        userService.updateLatestOnlineAt(userId);
      });
    });

    return this.server;
  }
}
export default SocketConnection;
