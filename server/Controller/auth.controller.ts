import { hash } from "bcrypt";
import { UserValidation } from "../utils/validations";
import type { Request, Response } from "express";
import { User } from "../Model/Users.model";

const signIn = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

const signUp = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const data = UserValidation.parse({ email, password, name });
    const hashedPassword = await hash(password, 10);
    const newUser = await User.insertOne({
      email,
      password: hashedPassword,
      name,
    });
    return res.status(200).send(newUser);
  } catch (error: unknown) {
    return res.status(500).send(`error: ${error}`);
  }
};
