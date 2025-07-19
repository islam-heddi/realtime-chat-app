import { Server } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";

const setupSocket = (server: Server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  const userSocketMap = new Map();

  const disconnect = (socket: Socket) => {
    console.log(`User disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId as string;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    } else {
      console.log("User ID not provided in handshake query");
    }

    socket.on("disconnect", () => {
      disconnect(socket);
      userSocketMap.delete(userId);
    });
  });
};

export default setupSocket;
