import type { Request, Response, NextFunction } from "express";
import { UserValidation } from "../utils/validations";
import { User } from "../Model/Users.model";
export const checkDateValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name } = req.body;

  try {
    const data = UserValidation.parse({ email, password, name });
    const result = await User.find({
      email: data.email,
    });
    if (result.length > 0) return res.status(400).send("email already exists");
    else return next();
  } catch (error: unknown) {
    return res.status(500).send(`error: ${error}`);
  }
};
