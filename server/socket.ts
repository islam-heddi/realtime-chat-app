import { Server } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";
import { addMessage } from "./Controller/chat.controller";
import { sendMessageChannel } from "./Controller/channel.controller";

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

  const sendMessage = async (message: any, socket: any) => {
    const senderSocketId = userSocketMap.get(message.senderId);
    const receiverSocketId = userSocketMap.get(message.receiverId);

    await addMessage(message.senderId, message.receiverId, message.content);
    socket.to(receiverSocketId).emit("recieveMessage", {
      senderId: message.senderId,
      content: message.content,
      receiverId: message.receiverId,
      createdAt: message.createdAt,
    });
    socket.to(senderSocketId).emit("recieveMessage", {
      senderId: message.senderId,
      content: message.content,
      receiverId: message.receiverId,
      createdAt: message.createdAt,
    });
    socket.emit("recieveMessage", {
      senderId: message.senderId,
      content: message.content,
      receiverId: message.receiverId,
      createdAt: message.createdAt,
    });
  };

  const sendMessageRoom = async (message: any, socket: any) => {
    const senderSocketId = userSocketMap.get(message.senderId);

    const createMessage = await sendMessageChannel({
      senderId: message.senderId,
      content: message.content,
      channelId: message.receiverId,
    });

    socket.broadcast.emit("recieve-message-channel", {
      isSeened: false,
      emiterId: message.senderId,
      emiterName: createMessage?.senderName,
      channelId: message.receiverId,
      createdAt: createMessage?.createdAt,
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

    socket.setMaxListeners(10);

    socket.on("sendMessage", (message: any) => sendMessage(message, socket));

    socket.on("send-message-channel", (message: any) =>
      sendMessageRoom(message, socket)
    );

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
