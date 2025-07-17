import type { Request, Response } from "express";
import { User } from "../Model/Users.model";
export const getUserInfo = async (req: Request, res: Response) => {
  const id = req.user;
  try {
    const user = await User.findById(id?.id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(`error: ${error}`);
  }
};
