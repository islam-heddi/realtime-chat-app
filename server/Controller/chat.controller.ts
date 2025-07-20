import { Request, Response } from "express";
import { Chat } from "../Model/Chat.model";
import { User } from "../Model/Users.model";
export const addMessage = async (
  senderId: string,
  receiverId: string,
  content: string
) => {
  try {
    if (!senderId || !receiverId || !content) {
      throw new Error("Sender ID, Receiver ID, and content are required");
    }

    const result = await Chat.create({
      emiterId: senderId,
      receiverId: receiverId,
      content: content,
      createdAt: new Date(),
    });

    return result;
  } catch (error) {
    console.error("Error in addMessage:", error);
    return error;
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const id = req.user?.id;
  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const { receiverId } = req.params;
    const existingUser = await User.findById(receiverId);
    if (!existingUser) {
      return res.status(404).json({ error: "Receiver not found" });
    }
    const messages = await Chat.find({
      receiverId,
      emiterId: id,
    }).sort({
      createdAt: -1,
    });

    const messag = await Chat.find({
      receiverId: id,
      emiterId: receiverId,
    }).sort({
      createdAt: -1,
    });

    const temp = messages.concat(messag).sort((a, b) => {
      return (
        (a.createdAt as NativeDate).getTime() -
        (b.createdAt as NativeDate).getTime()
      );
    });

    return res.status(200).json({
      messages: temp,
      receiver: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};
