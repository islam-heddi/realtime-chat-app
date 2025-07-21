import type { Request, Response } from "express";
import { Channel } from "../Model/Channel.model";
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
