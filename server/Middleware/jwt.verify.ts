import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) return res.status(404).send("The token is undefined or null");
  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as JwtPayload;
    if (!decoded)
      return res.status(400).send("unable to decode or session expired");

    req.user = {
      id: decoded.userId,
    };

    return next();
  } catch (error: unknown) {
    return res.status(500).send(`error: ${error}`);
  }
};
