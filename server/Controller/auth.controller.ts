import { hash, compare } from "bcrypt";
import { UserValidation } from "../utils/validations";
import type { Request, Response } from "express";
import { User } from "../Model/Users.model";
import jwt from "jsonwebtoken";

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await User.findOne({
      where: {
        email,
      },
    });
    if (!result) return res.status(400).send("email not found");
    const check = await compare(password, result.password as string);
    if (!check) return res.status(400).send("password does not match");
    const token = jwt.sign(
      { userId: result._id },
      process.env.SECRET_KEY as string,
      {
        expiresIn: 15 * 24 * 60 * 60 * 100,
      }
    );
    res.cookie("token", token, {
      maxAge: 15 * 24 * 60 * 60 * 100,
      secure: true,
    });

    return res.status(201).send("successfully logged in");
  } catch (error) {
    return res.status(500).send(`error: ${error}`);
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
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
