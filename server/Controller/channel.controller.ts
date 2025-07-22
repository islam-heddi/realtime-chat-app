import type { Request, Response } from "express";
import { Channel } from "../Model/Channel.model";
import { Chat } from "../Model/Chat.model";
import { User } from "../Model/Users.model";
import { read } from "fs";
export const createChannel = async (req: Request, res: Response) => {
  const id = req.user;
  const { name, description } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    if (!name) {
      return res.status(400).json({ error: "Channel name is required" });
    }

    const newChannel = await Channel.create({
      name,
      description: description || "",
      creatorId: id.id,
    });

    return res.status(201).json(newChannel);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};

export const getChannels = async (req: Request, res: Response) => {
  const search = req.query.search as string;
  try {
    const channels = await Channel.find({
      name: { $regex: search || "", $options: "i" },
    });
    return res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};

export const getMyChannels = async (req: Request, res: Response) => {
  const id = req.user;

  try {
    const result = await Channel.find({
      creatorId: id?.id,
    });

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};

export const getChannelMessages = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const chats = await Chat.find({ receiverId: id });

    const ChannelChats = await Promise.all(
      chats.map(async (value) => {
        const user = await User.findById(value.emiterId);

        return {
          ...value,
          emiterName: user?.name,
        };
      })
    );

    return res.status(200).send(ChannelChats);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};

export const sendMessageChannel = async (message: any) => {
  const { senderId, channelId, content } = message;
  try {
    if (!senderId || !channelId || !content) {
      throw new Error("Sender ID, Receiver ID, and content are required");
    }

    const user = await User.findOne({ senderId });

    const createChat = await Chat.create({
      senderId,
      receiverId: channelId,
      content,
      createdAt: new Date(),
    });

    return {
      emiterId: createChat.emiterId,
      content: createChat.content,
      receiverId: createChat.receiverId,
      senderName: user?.name,
      createdAt: createChat.createdAt,
    };
  } catch (error) {
    console.error("Error in addMessage:", error);
  }
};
