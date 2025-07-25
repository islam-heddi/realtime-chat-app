import type { Request, Response } from "express";
import { User } from "../Model/Users.model";
export const updateProfile = async (req: Request, res: Response) => {
  const id = req.user;
  const { name, pictureUrl } = req.body;
  try {
    const user = await User.findById(id?.id);
    if (!user) return res.status(400).send("user not found");

    const result = await User.updateOne(
      { _id: id?.id },
      {
        name,
        profileImgUrl: pictureUrl,
      }
    );

    return res.status(201).send("updated successfully");
  } catch (error) {
    return res.status(500).send(`error: ${error}`);
  }
};
export const getProfile = async (req: Request, res: Response) => {
  const id = req.user;
  try {
    const user = await User.findById(id?.id);
    if (!user) return res.status(400).send("user not found");

    return res.status(200).send({
      name: user?.name,
      email: user?.email,
      profileImgUrl: user?.profileImgUrl,
    });
  } catch (error) {
    return res.status(500).send(`error: ${error}`);
  }
};
