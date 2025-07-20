import { Server } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";
import { addMessage } from "./Controller/chat.controller";

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

  const sendMessage = async (message: any) => {
    const senderSocketId = userSocketMap.get(message.senderId);
    const receiverSocketId = userSocketMap.get(message.receiverId);
    /* if (receiverSocketId == null) {
      console.log(`Receiver ${message.receiverId} not connected`);
      return;
    }
    if (senderSocketId == null) {
      console.log(`sender ${message.senderId} not connected`);
      return;
    }*/
    await addMessage(message.senderId, message.receiverId, message.content);
    io.to(receiverSocketId).emit("recieveMessage", {
      senderId: message.senderId,
      content: message.content,
    });
    io.to(senderSocketId).emit("recieveMessage", {
      senderId: message.senderId,
      content: message.content,
    });
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId as string;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    } else {
      console.log("User ID not provided in handshake query");
    }

    socket.on("sendMessage", sendMessage);

    io.on("message", (message) => {
      console.log(`Message received from user ${userId}:`, message);
    });

    socket.on("disconnect", () => {
      disconnect(socket);
      userSocketMap.delete(userId);
    });
  });
};

export default setupSocket;
