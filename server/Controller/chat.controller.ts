import { Request, Response } from "express";
import { Chat } from "../Model/Chat.model";
import { User } from "../Model/Users.model";
export const addMessage = async (req: Request, res: Response) => {
  const id = req.user?.id;
  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const { receiverId, content } = req.body;

    const chat = await Chat.create({
      emiterId: id,
      receiverId,
      content,
      createdAt: new Date(),
    });
    res.status(201).json({ message: "Message added successfully", chat });
  } catch (error) {
    res.status(500).json({ error: "Failed to add message" });
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
    const messages = await Chat.find({ receiverId, emiterId: id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      messages: messages,
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
